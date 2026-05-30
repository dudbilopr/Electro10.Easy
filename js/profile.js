// ============================================================
// js/profile.js
// Guardar y cargar el perfil del estudiante en Firestore.
// Gestión del avatar y modo de vista admin.
// ============================================================
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { db, auth } from './firebase.js';
import { APP_ID } from '../config/firebase.config.js';
import { actualizarAvatarUI } from './ui.js';

export async function guardarPerfil() {
    if (!window.currentUserUid) return;

    const name        = document.getElementById('prof-name').value;
    const inst        = document.getElementById('prof-school').value;
    const major       = document.getElementById('prof-major').value;
    const age         = document.getElementById('prof-age').value;
    const gender      = document.getElementById('prof-gender').value;
    const avatarStyle = document.getElementById('prof-avatar').value;
    const hours       = document.getElementById('prof-hours').value;
    const calc        = document.getElementById('prof-calc').value;
    const trig        = document.getElementById('prof-trig').value;
    const algebra     = document.getElementById('prof-algebra').value;
    const apikey      = document.getElementById('prof-apikey') ? document.getElementById('prof-apikey').value.trim() : '';

    try {
        let existingRole = 'student';
        try {
            const d = await getDoc(doc(db, 'artifacts', APP_ID, 'public', 'data', 'directory', window.currentUserUid));
            if (d.exists()) existingRole = d.data().role || 'student';
        } catch (e) { /* sin conexión */ }

        if (window.isMasterAdmin) existingRole = 'teacher';

        const profileData = {
            name, institution: inst, role: existingRole, email: auth.currentUser.email,
            major, age, gender, avatarStyle, apikey,
            studyHours: hours, mathCalc: calc, mathTrig: trig, mathAlgebra: algebra
        };

        await setDoc(doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'profile', 'data'), profileData, { merge: true });
        await setDoc(doc(db, 'artifacts', APP_ID, 'public', 'data', 'directory', window.currentUserUid), profileData, { merge: true });

        // Guardar API Key localmente para acceso rápido en ai-chat.js
        if(apikey) {
            localStorage.setItem('userApiKey', apikey);
            window.userApiKey = apikey;
        } else {
            localStorage.removeItem('userApiKey');
            window.userApiKey = null;
        }

        document.getElementById('student-name-hero').innerText = name || auth.currentUser.email.split('@')[0];
        actualizarAvatarUI(avatarStyle, window.currentUserUid, name || auth.currentUser.email);
        Swal.fire('¡Encuesta Completada!', 'Tus datos de presaberes y perfil han sido actualizados exitosamente.', 'success');
    } catch (e) {
        Swal.fire('Error', e.message, 'error');
    }
}

export async function cargarDatosPerfil() {
    if (!window.currentUserUid) return;
    try {
        const pSnap = await getDoc(doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'profile', 'data'));
        if (pSnap.exists()) {
            const data = pSnap.data();
            const set  = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
            set('prof-name',    data.name);
            set('prof-school',  data.institution);
            set('prof-major',   data.major);
            set('prof-age',     data.age);
            set('prof-hours',   data.studyHours);

            const selGender = document.getElementById('prof-gender');
            if (selGender) selGender.value = data.gender || 'No Especificado';
            const selAvatar = document.getElementById('prof-avatar');
            if (selAvatar) selAvatar.value = data.avatarStyle || 'initials';
            const selCalc = document.getElementById('prof-calc');
            if (selCalc) selCalc.value = data.mathCalc || 'Medio';
            const selTrig = document.getElementById('prof-trig');
            if (selTrig) selTrig.value = data.mathTrig || 'Medio';
            const selAlg = document.getElementById('prof-algebra');
            if (selAlg) selAlg.value = data.mathAlgebra || 'Medio';
            const inputKey = document.getElementById('prof-apikey');
            if (inputKey) inputKey.value = data.apikey || '';
            
            // Setear globalmente si existe
            if(data.apikey) {
                localStorage.setItem('userApiKey', data.apikey);
                window.userApiKey = data.apikey;
            }

            const roleDisplay = document.getElementById('prof-role-display');
            if (roleDisplay) {
                roleDisplay.value = window.isMasterAdmin
                    ? 'Administrador Maestro'
                    : (data.role === 'teacher' ? 'Docente/Admin' : 'Estudiante');
            }
            
            // Cargar configuración de ritmo
            if (data.pacingMode && data.pacingLength && window.renderTimeline) {
                window.renderTimeline(data.pacingMode, data.pacingLength);
            }

            // Verificar la última fecha de la encuesta
            const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
            const now = new Date().getTime();
            if (!data.lastSurveyDate || (now - data.lastSurveyDate > ONE_WEEK_MS)) {
                // Forzar u ofrecer la encuesta
                const modal = document.getElementById('study-survey-modal');
                if (modal && !window.isMasterAdmin && data.role !== 'teacher') {
                    modal.style.display = 'flex';
                }
            }

            // Cargar calificación del curso si existe
            if (window.cargarCalificacionCurso) {
                window.cargarCalificacionCurso();
            }

            const adminToggle = document.getElementById('admin-view-toggle-container');
            if (window.isMasterAdmin && adminToggle) {
                adminToggle.style.display = 'block';
                const adminMode = document.getElementById('admin-view-mode');
                if (adminMode) adminMode.value = window.simulatedRole || 'teacher';
            }
        }
    } catch (e) { /* sin conexión */ }
}

export function cambiarModoVistaAdmin() {
    window.simulatedRole = document.getElementById('admin-view-mode').value;
    Swal.fire('Modo Cambiado', `Navegando ahora como: ${window.simulatedRole === 'student' ? 'Estudiante' : 'Administrador'}.`, 'success')
        .then(() => {
            const navAdmin = document.getElementById('nav-admin');
            if (window.simulatedRole === 'student') {
                navAdmin.style.display = 'none';
                window.mostrarDashboardEstudiante();
            } else {
                navAdmin.style.display = 'flex';
            }
        });
}

// Guarda la configuración del ritmo flexible del usuario
export async function guardarRitmo(mode, length) {
    if (!window.currentUserUid) return;
    try {
        await setDoc(doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'profile', 'data'), {
            pacingMode: mode,
            pacingLength: length
        }, { merge: true });
    } catch (e) {
        console.error("Error al guardar el ritmo:", e);
    }
}

// Guarda la encuesta de metodología de estudio semanal
export async function guardarEncuestaSemanal() {
    if (!window.currentUserUid) return;
    
    const hours = document.getElementById('survey-hours').value;
    const method = document.getElementById('survey-methodology').value;
    const fatigue = document.getElementById('survey-fatigue').value;
    
    if (!hours || !method) {
        Swal.fire('Campos Incompletos', 'Por favor, ingresa las horas y la metodología principal.', 'warning');
        return;
    }

    try {
        const timestamp = new Date().getTime();
        const surveyData = {
            hours: parseInt(hours),
            methodology: method,
            fatigue: parseInt(fatigue),
            date: timestamp
        };

        // Guardar la encuesta en una subcolección (histórico)
        await setDoc(doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'surveys', timestamp.toString()), surveyData);
        
        // Actualizar la fecha de última encuesta en el perfil principal
        await setDoc(doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'profile', 'data'), {
            lastSurveyDate: timestamp
        }, { merge: true });

        // Cerrar modal
        document.getElementById('study-survey-modal').style.display = 'none';
        Swal.fire('¡Excelente!', 'Has registrado tu progreso semanal. Sigue así.', 'success');
        
    } catch (e) {
        Swal.fire('Error', 'No se pudo guardar la encuesta. Intenta nuevamente.', 'error');
        console.error(e);
    }
}

// ==========================================
// Funciones de Calificación (Ratings)
// ==========================================

export async function calificarRecurso(valor, lessonId = window.currentLeccionId) {
    if (!window.currentUserUid) return;
    if (!lessonId) {
        Swal.fire('Error', 'No se pudo identificar la lección actual.', 'error');
        return;
    }

    try {
        const ratingData = {
            rating: valor,
            timestamp: new Date().getTime(),
            userId: window.currentUserUid
        };

        // Guardar la calificación del usuario para este recurso
        await setDoc(doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'ratings', lessonId), ratingData);
        
        // Efecto visual
        pintarEstrellas(valor);
        Swal.fire({
            title: '¡Gracias por tu retroalimentación!',
            text: 'Tu calificación nos ayuda a mejorar Electro10.Easy',
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });

    } catch (e) {
        console.error("Error al guardar calificación:", e);
    }
}

export async function cargarCalificacionRecurso(lessonId) {
    if (!window.currentUserUid || !lessonId) return 0;
    try {
        const docRef = doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'ratings', lessonId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().rating;
        }
    } catch (e) {
        console.error("Error al cargar calificación:", e);
    }
    return 0;
}

export function pintarEstrellas(valor) {
    window.currentRatingValue = valor; // Guardar valor real
    const stars = document.querySelectorAll('#resource-stars .star');
    stars.forEach((star, index) => {
        if (index < valor) {
            star.style.color = '#fbbf24'; // Amarillo
            star.classList.add('icon-filled');
        } else {
            star.style.color = 'var(--text-medium)';
            star.classList.remove('icon-filled');
        }
    });
}

export function hoverStars(valor) {
    const stars = document.querySelectorAll('#resource-stars .star');
    stars.forEach((star, index) => {
        if (index < valor) {
            star.style.color = '#fcd34d'; // Amarillo claro
        } else {
            star.style.color = 'var(--text-medium)';
        }
    });
}

export function resetStarsHover() {
    pintarEstrellas(window.currentRatingValue || 0);
}

// ==========================================
// Funciones de Calificación General del Curso
// ==========================================

export async function calificarCurso(valor) {
    if (!window.currentUserUid) return;
    try {
        const ratingData = {
            rating: valor,
            timestamp: new Date().getTime(),
            userId: window.currentUserUid
        };

        // Guardar la calificación del usuario para el curso completo
        await setDoc(doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'ratings', 'curso_global'), ratingData);
        
        pintarCourseEstrellas(valor);
        Swal.fire({
            title: '¡Gracias!',
            text: 'Tu calificación global del curso ha sido guardada.',
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });

    } catch (e) {
        console.error("Error al guardar calificación del curso:", e);
    }
}

export async function cargarCalificacionCurso() {
    if (!window.currentUserUid) return;
    try {
        const docRef = doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'ratings', 'curso_global');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            pintarCourseEstrellas(docSnap.data().rating);
        } else {
            pintarCourseEstrellas(0);
        }
    } catch (e) {
        console.error("Error al cargar calificación del curso:", e);
    }
}

export function pintarCourseEstrellas(valor) {
    window.currentCourseRatingValue = valor; // Guardar valor real
    const stars = document.querySelectorAll('#course-stars .star');
    stars.forEach((star, index) => {
        if (index < valor) {
            star.style.color = '#fbbf24'; // Amarillo
            star.classList.add('icon-filled');
        } else {
            star.style.color = 'var(--text-medium)';
            star.classList.remove('icon-filled');
        }
    });
}

export function hoverCourseStars(valor) {
    const stars = document.querySelectorAll('#course-stars .star');
    stars.forEach((star, index) => {
        if (index < valor) {
            star.style.color = '#fcd34d'; // Amarillo claro
        } else {
            star.style.color = 'var(--text-medium)';
        }
    });
}

export function resetCourseStarsHover() {
    pintarCourseEstrellas(window.currentCourseRatingValue || 0);
}
