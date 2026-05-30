// ============================================================
// js/app.js — Orquestador Principal
// Importa todos los módulos, inicializa el estado compartido
// y registra las funciones en window para el HTML inline.
// ============================================================

// ── Importaciones ────────────────────────────────────────────
import { db }                                   from './firebase.js';
import { APP_ID }                               from '../config/firebase.config.js';
import { doc, setDoc, increment }               from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { auth }                                 from './firebase.js';
import { iniciarSesion, registrarUsuario, iniciarSesionConGoogle, cerrarSesion, inicializarAuthObserver } from './auth.js';
import { toggleSidebar, toggleTheme, toggleChat, abrirModalAuth, mostrarNotificaciones, cambiarTab, resetNav, mostrarDashboardEstudiante, mostrarCalendario, mostrarPerfil, mostrarLaboratorios, mostrarCerebro, cambiarTabCerebro, abrirPanelAdmin, actualizarAvatarUI, aplicarTemaGuardado, injectUIState, toggleFocusMode } from './ui.js';
import { inicializarEstructuraBase }            from './curriculum.js';
import { loadContent, guardarEval, guardarNotas, guardarProgresoNube, getIconForType } from './content-loader.js';
import { actualizarGraficosEstudiante }         from './charts.js';
import { guardarPerfil, cargarDatosPerfil, cambiarModoVistaAdmin, guardarRitmo, guardarEncuestaSemanal } from './profile.js';
import { cargarDirectorioAdminFirebase, verDetalleEstudiante, cambiarRolUsuario, guardarAjustesCalendario } from './admin.js';

// ── Estado Global Compartido ─────────────────────────────────
const progressData   = {};
const evalData       = {};
const timeData       = { value: 0 };  // Objeto para permitir mutación por referencia
const globalSettings = {
    currentWeek:    1,
    startDate:      '',
    endDate:        '',
    excludedWeeks:  [],
    moduleWeeksMap: []
};
let curriculoData = null;
let totalLessons  = 0;

window.currentUserUid  = null;
window.isMasterAdmin   = false;
window.simulatedRole   = 'teacher';

// ── Timer de tiempo activo ───────────────────────────────────
setInterval(async () => {
    if (!window.currentUserUid || window.isMasterAdmin) return;
    timeData.value++;
    try {
        await setDoc(doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'stats', 'data'), { totalTimeMinutes: increment(1) }, { merge: true });
    } catch (e) { /* sin conexión */ }
}, 60000);

// ── Listener de mensajes desde iframes hijo ──────────────────
window.addEventListener('message', async (event) => {
    const data = event.data;
    if (!data?.action) return;

    if (data.action === 'marcarCompletado') {
        const lessonId = data.lessonId || window._currentLeccionId;
        if (lessonId && !progressData[lessonId]) {
            progressData[lessonId] = true;
            localStorage.setItem('cursoElectromagnetismoProgreso', JSON.stringify(progressData));
            const li = document.getElementById('menu-' + lessonId);
            if (li) {
                li.classList.add('completed');
                const icon = li.querySelector('.icon-status');
                if (icon) { icon.innerText = 'check_circle'; icon.classList.add('icon-filled'); }
            }
            await guardarProgresoNube(lessonId);
            Swal.fire({ title: '¡Objetivo Alcanzado!', text: data.mensaje || 'Has completado esta actividad.', icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 4000 });
            actualizarGraficosEstudiante(Object.keys(progressData).length, totalLessons, progressData, evalData, timeData, curriculoData);
        }
    }
    if (data.action === 'enviarNotaCognitiva' && data.score) {
        guardarEval(data.score, evalData);
    }
});

// ── Actualización del Dashboard ──────────────────────────────
window.actualizarContenidoDashboard = () => {
    if (!curriculoData) return;
    let nextLesson = null, nextLi = null;
    outer:
    for (const mod of curriculoData.modulos) {
        for (const lec of mod.lecciones) {
            const items = lec.tipo === 'grupo' ? lec.sublecciones : [lec];
            for (const item of items) {
                if (!progressData[item.id]) {
                    nextLesson = item;
                    nextLi = document.getElementById('menu-' + item.id);
                    break outer;
                }
            }
        }
    }

    const c = document.getElementById('next-lesson-container');
    if (nextLesson && nextLi) {
        c.innerHTML = `
        <div class="task-item" onclick="document.getElementById('${nextLi.id}').click()" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);padding:20px;border-radius:12px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;gap:15px;align-items:center;min-width:0;">
                <div style="width:50px;height:50px;background:rgba(255,255,255,0.2);color:#fff;display:flex;align-items:center;justify-content:center;border-radius:12px;">
                    <span class="material-symbols-outlined icon-filled" style="font-size:24px;">${getIconForType(nextLesson.tipo)}</span>
                </div>
                <div class="truncate">
                    <h4 class="truncate" style="margin:0 0 5px 0;font-size:1.1rem;color:#fff;">${nextLesson.titulo}</h4>
                    <p style="margin:0;font-size:0.85rem;color:rgba(255,255,255,0.8);">Recomendación de Exploración</p>
                </div>
            </div>
            <span class="material-symbols-outlined" style="color:#fff;">explore</span>
        </div>`;
    } else {
        c.innerHTML = '<div style="background:rgba(16,185,129,0.2);color:#fff;padding:15px;border-radius:10px;"><span class="material-symbols-outlined" style="vertical-align:bottom;">workspace_premium</span> ¡Has completado todas las exploraciones disponibles!</div>';
    }
    actualizarGraficosEstudiante(Object.keys(progressData).length, totalLessons, progressData, evalData, timeData, curriculoData);
    generarDashboardGamificado(); // Actualiza consejos con base en tiempo/progreso
};

// ── Exposición en window (llamadas desde HTML) ───────────────
window.toggleSidebar             = toggleSidebar;
window.toggleTheme               = toggleTheme;
window.toggleChat                = toggleChat;
window.abrirModalAuth            = abrirModalAuth;
window.mostrarNotificaciones     = mostrarNotificaciones;
window.cambiarTab                = cambiarTab;
window.mostrarDashboardEstudiante = mostrarDashboardEstudiante;
window.mostrarCalendario         = () => { injectUIState({ progressData, curriculoData, totalLessons }); mostrarCalendario(); };
window.mostrarPerfil             = mostrarPerfil;
window.mostrarLaboratorios       = mostrarLaboratorios;
window.mostrarCerebro            = mostrarCerebro;
window.cambiarTabCerebro         = cambiarTabCerebro;
window.toggleFocusMode           = toggleFocusMode;
window.abrirPanelAdmin           = () => abrirPanelAdmin(globalSettings);
window.cerrarSesion              = cerrarSesion;
window.iniciarSesion             = iniciarSesion;
window.registrarUsuario          = registrarUsuario;
window.iniciarSesionConGoogle    = iniciarSesionConGoogle;
window.guardarEval               = (nivel) => guardarEval(nivel, evalData);
window.guardarNotas              = guardarNotas;
window.guardarProgresoNube       = guardarProgresoNube;
window.guardarPerfil             = guardarPerfil;
window.cargarDatosPerfil         = cargarDatosPerfil;
window.cambiarModoVistaAdmin     = cambiarModoVistaAdmin;
window.guardarRitmo              = guardarRitmo;
window.guardarEncuestaSemanal    = guardarEncuestaSemanal;
window.actualizarAvatarUI        = actualizarAvatarUI;
window.actualizarGraficosEstudiante = (c, t) => actualizarGraficosEstudiante(c, t, progressData, evalData, timeData, curriculoData);
window.cargarDirectorioAdminFirebase = () => cargarDirectorioAdminFirebase(curriculoData, totalLessons);
window.verDetalleEstudiante      = (uid, nombre) => verDetalleEstudiante(uid, nombre, curriculoData, totalLessons);
window.cambiarRolUsuario         = cambiarRolUsuario;
window.guardarAjustesCalendario  = () => guardarAjustesCalendario(globalSettings);
window.renderAdminCharts         = (t, s, sc) => renderAdminCharts(t, s, sc);

    // window.renderizarQuizDinamico y window.evaluarQuizDinamico han sido movidos al motor avanzado quiz-engine.js

window._loadContent = (leccion, modTitulo) => {
    // ── Lógica de Bloqueo por Presaberes ──
    const examId = 'm0_l1';
    const isAdmin = window.currentUserEmail === 'dudbilopr@gmail.com' || window.currentUserRole === 'admin';
    if (!isAdmin && leccion.id !== examId && (!evalData[examId] || evalData[examId] < 65)) {
        Swal.fire({
            title: 'Acceso Restringido',
            html: 'Debes completar el <b>Examen Diagnóstico de Presaberes</b> (Módulo 0) con al menos 65% para desbloquear el resto del curso.',
            icon: 'warning',
            confirmButtonText: 'Ir al Diagnóstico',
            confirmButtonColor: 'var(--accent)'
        }).then(() => {
            const presaberesLi = document.getElementById('menu-' + examId);
            if(presaberesLi) presaberesLi.click();
        });
        return;
    }

    window._currentLeccionId = leccion.id;
    loadContent(leccion, modTitulo, progressData, evalData);
};

// ── Lógica de Alto Impacto (Neuroeducación y Gamificación) ──
window.guardarApuntes = async () => {
    if (!window.currentUserUid) {
        return Swal.fire('Modo Visitante', 'Inicia sesión para guardar apuntes en la nube.', 'info');
    }
    const notas = document.getElementById('student-notes').value.trim();
    if (!notas) return Swal.fire('Oops', 'No puedes guardar un apunte vacío.', 'warning');
    
    try {
        await setDoc(doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'notes', 'data'), { content: notas }, { merge: true });
        Swal.fire('¡Apunte Guardado!', 'Tus conclusiones están seguras en Firestore.', 'success');
    } catch (e) {
        Swal.fire('Error', 'No se pudo guardar el apunte. Revisa tu conexión.', 'error');
    }
};

async function cargarApuntes() {
    if (!window.currentUserUid) return;
    try {
        const { getDoc } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");
        const docRef = doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'notes', 'data');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const notaInput = document.getElementById('student-notes');
            if (notaInput) notaInput.value = docSnap.data().content || '';
        }
    } catch (e) {}
}

function generarDashboardGamificado() {
    // Generar red de pares simulada/real (gamificación social)
    const basePares = 15 + Math.floor(Math.random() * 20); // 15-35 compañeros
    const elCount = document.getElementById('student-network-count');
    if (elCount) elCount.innerText = basePares;

    const avatarsContainer = document.getElementById('student-network-avatars');
    if (avatarsContainer) {
        let htmlAvatares = '';
        const avataresCount = Math.min(basePares, 5);
        for(let i=1; i<=avataresCount; i++) {
            const num = Math.floor(Math.random() * 100);
            htmlAvatares += `<img src="https://api.dicebear.com/7.x/adventurer/svg?seed=${num}" style="width:30px;height:30px;border-radius:50%;border:2px solid var(--bg-surface-hover);margin-left:-10px;">`;
        }
        if (basePares > 5) htmlAvatares += `<div style="width:30px;height:30px;border-radius:50%;background:var(--bg-main);border:2px solid var(--bg-surface-hover);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:bold;margin-left:-10px;">+${basePares-5}</div>`;
        avatarsContainer.innerHTML = htmlAvatares;
    }

    // Generar Consejo Neuroeducativo dinámico basado en tiempo de estudio
    const minutos = timeData.value;
    const elTip = document.getElementById('student-neuro-tip');
    if (elTip) {
        if (minutos < 15) {
            elTip.innerText = "Fase de Calentamiento Cognitivo: Tu cerebro está asimilando la estructura. Empieza por las lecturas introductorias antes de ir a simuladores.";
        } else if (minutos >= 15 && minutos < 45) {
            elTip.innerText = "¡Atención Máxima! Estás en la cresta de tu curva de Ebbinghaus. Resuelve cuestionarios o desafíos ahora.";
        } else if (minutos >= 45 && minutos < 60) {
            elTip.innerText = "Alerta de Fatiga Neuronal: Has superado los 45 min. Levántate, bebe agua (Pausa Pomodoro) para consolidar lo aprendido en la memoria a largo plazo.";
        } else {
            elTip.innerText = "Carga Cognitiva Elevada: Has estudiado mucho hoy. ¡Felicidades! Repasa tus apuntes visuales y desconecta para asegurar el aprendizaje subconsciente.";
        }
    }
}

// ── Inicialización principal ─────────────────────────────────
async function init() {
    aplicarTemaGuardado();

    // Cargar progreso desde localStorage (datos offline)
    const savedProgress = localStorage.getItem('cursoElectromagnetismoProgreso');
    if (savedProgress) Object.assign(progressData, JSON.parse(savedProgress));

    // Construir el menú del currículo
    const result = await inicializarEstructuraBase(progressData);
    curriculoData = result.curriculoData;
    totalLessons  = result.totalLessons;

    // Inyectar estado en el módulo UI
    injectUIState({ progressData, curriculoData, totalLessons });

    // Mostrar dashboard inicial
    mostrarDashboardEstudiante();
    generarDashboardGamificado(); // Primera carga visual

    // Iniciar observer de autenticación
    inicializarAuthObserver({
        progressData, evalData, timeData, globalSettings,
        onLogin:  () => { 
            injectUIState({ progressData, curriculoData, totalLessons }); 
            window.actualizarContenidoDashboard(); 
            cargarApuntes(); // Carga las notas de firebase
            generarDashboardGamificado(); // Vuelve a calcular consejos
        },
        onLogout: () => { mostrarDashboardEstudiante(); }
    });

    // Fondo Cósmico (Particles.js)
    if(window.particlesJS) {
        particlesJS('particles-js', {
            "particles": {
                "number": {"value": 50, "density": {"enable": true, "value_area": 800}},
                "color": {"value": "#0ea5e9"},
                "shape": {"type": "circle"},
                "opacity": {"value": 0.3, "random": false},
                "size": {"value": 2, "random": true},
                "line_linked": {"enable": true, "distance": 150, "color": "#0ea5e9", "opacity": 0.2, "width": 1},
                "move": {"enable": true, "speed": 1, "direction": "none", "random": true, "out_mode": "out"}
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {"onhover": {"enable": true, "mode": "grab"}, "onclick": {"enable": true, "mode": "push"}, "resize": true},
                "modes": {"grab": {"distance": 200, "line_linked": {"opacity": 0.6}}, "push": {"particles_nb": 3}}
            },
            "retina_detect": true
        });
    }
}

window.addEventListener('DOMContentLoaded', init);
