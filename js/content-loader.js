// ============================================================
// js/content-loader.js
// Carga contenido en el visor principal según el tipo de
// lección: video, multivideo, simulador, quiz, enlaces, etc.
// Gestiona la playlist lateral y el marcado de progreso.
// ============================================================
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { db } from './firebase.js';
import { APP_ID } from '../config/firebase.config.js';
import { resetNav } from './ui.js';

export let currentLeccionId = null;

// ── Helper: ícono por tipo ───────────────────────────────────
export function getIconForType(tipo) {
    switch (tipo) {
        case 'multivideo':      return 'ondemand_video';
        case 'video':           return 'play_circle';
        case 'multipresentacion':
        case 'presentacion':    return 'menu_book';
        case 'simulador':       return 'experiment';
        case 'ejercicio':       return 'edit_note';
        case 'quiz':            return 'quiz';
        case 'enlaces':         return 'folder_special';
        default:                return 'description';
    }
}

// ── Helper: URL de embed de YouTube ─────────────────────────
function getYoutubeEmbed(rawCode) {
    let finalUrl = "https://www.youtube.com/embed/";
    if (rawCode.includes('&t=')) {
        const parts   = rawCode.split('&t=');
        const seconds = parseInt(parts[1]) || 0;
        finalUrl += parts[0] + "?start=" + seconds + "&rel=0";
    } else {
        finalUrl += rawCode + "?rel=0";
    }
    return finalUrl;
}

// ── Guardar progreso en Firestore ────────────────────────────
export async function guardarProgresoNube(leccionId) {
    if (!window.currentUserUid) return;
    try {
        await setDoc(doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'progress', 'data'), { [leccionId]: true }, { merge: true });
    } catch (e) { /* sin conexión */ }
}

// ── Guardar evaluación cognitiva ─────────────────────────────
export async function guardarEval(nivel, evalData) {
    document.querySelectorAll('.eval-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('eval-' + nivel)?.classList.add('active');

    if (!currentLeccionId || !window.currentUserUid) return;
    evalData[currentLeccionId] = parseInt(nivel);
    try {
        await setDoc(doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'evaluations', 'data'), { [currentLeccionId]: parseInt(nivel) }, { merge: true });
        Swal.fire({ title: 'Feedback Científico', text: 'Tus datos de cognición han sido guardados.', icon: 'success', timer: 2000, showConfirmButton: false });
    } catch (e) { /* sin conexión */ }
}

// ── Guardar notas locales ────────────────────────────────────
export function guardarNotas() {
    if (!currentLeccionId) return;
    localStorage.setItem('notas_' + currentLeccionId, document.getElementById('area-notas').value);
    Swal.fire({ title: 'Apuntes Guardados', text: 'Tus notas se han sincronizado.', icon: 'success', timer: 1500, showConfirmButton: false, toast: true, position: 'top-end' });
}

// ── Cargador principal de contenido ─────────────────────────
export function loadContent(leccion, modulo, progressData, evalData) {
    const elementLi       = document.getElementById('menu-' + leccion.id);
    resetNav();
    currentLeccionId = leccion.id;

    const mainViewerArea   = document.getElementById('main-viewer-area');
    const contentHeader    = document.getElementById('content-header');
    const iframe           = document.getElementById('main-frame');
    const iframeWrapper    = document.querySelector('.iframe-wrapper');
    const rightSidebar     = document.getElementById('right-sidebar');
    const playlistSidebar  = document.getElementById('playlist-sidebar');
    const playlistContent  = document.getElementById('playlist-content');
    const enlacesContainer = document.getElementById('enlaces-container');
    const playOverlay      = document.getElementById('play-overlay');

    mainViewerArea.style.display  = 'flex';
    contentHeader.style.display   = 'flex';

    document.getElementById('display-title').innerText      = leccion.titulo;
    document.getElementById('bread-modulo').innerText       = modulo?.titulo ? modulo.titulo.split(':')[0] : 'Módulo';
    document.getElementById('bread-leccion').innerText      = leccion.titulo;
    
    // Construir detalles con los nuevos insights
    let detailsHtml = `<p style="color: var(--text-medium); margin-bottom: 15px;">${leccion.descripcion || "Explora el recurso analítico."}</p>`;
    
    if (modulo && modulo.conceptosClave) {
        detailsHtml += `
        <div style="margin-top: 20px; background: rgba(139, 92, 246, 0.05); padding: 15px; border-radius: 8px; border: 1px solid rgba(139, 92, 246, 0.2);">
            <h4 style="margin: 0 0 10px 0; color: var(--accent);"><span class="material-symbols-outlined" style="vertical-align: middle; font-size: 18px;">key</span> Conceptos Clave</h4>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${modulo.conceptosClave.map(c => `<span style="background: var(--bg-surface-hover); color: var(--text-high); padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; border: 1px solid var(--border-color);">${c}</span>`).join('')}
            </div>
        </div>`;
    }

    if (modulo && modulo.ecuaciones) {
        detailsHtml += `
        <div style="margin-top: 15px; background: var(--bg-surface-hover); padding: 15px; border-radius: 8px; border: 1px solid var(--border-color);">
            <h4 style="margin: 0 0 10px 0; color: var(--text-high);"><span class="material-symbols-outlined" style="vertical-align: middle; font-size: 18px; color: #10b981;">functions</span> Ecuaciones Principales</h4>
            <div style="color: var(--text-medium); font-size: 1rem;">
                ${modulo.ecuaciones.join('<br>')}
            </div>
        </div>`;
    }

    if (modulo && modulo.historia) {
        detailsHtml += `
        <div style="margin-top: 15px; background: rgba(59, 130, 246, 0.05); padding: 15px; border-radius: 8px; border: 1px solid rgba(59, 130, 246, 0.2);">
            <h4 style="margin: 0 0 10px 0; color: #3b82f6;"><span class="material-symbols-outlined" style="vertical-align: middle; font-size: 18px;">history_edu</span> Contexto Histórico: ${modulo.historia.experimentoClave}</h4>
            <p style="margin: 0; color: var(--text-medium); font-size: 0.85rem; line-height: 1.5;">${modulo.historia.hallazgo}</p>
        </div>`;
    }

    if (modulo && modulo.bibliografia) {
        detailsHtml += `
        <div style="margin-top: 15px;">
            <h4 style="margin: 0 0 5px 0; color: var(--text-high); font-size: 0.9rem;"><span class="material-symbols-outlined" style="vertical-align: middle; font-size: 16px;">menu_book</span> Bibliografía Recomendada</h4>
            <ul style="margin: 0; padding-left: 20px; color: var(--text-medium); font-size: 0.8rem;">
                ${modulo.bibliografia.map(b => `<li>${b}</li>`).join('')}
            </ul>
        </div>`;
    }

    const tabDescContainer = document.getElementById('tab-desc-text');
    tabDescContainer.innerHTML = detailsHtml;
    
    // Renderizar ecuaciones si KaTeX está disponible
    if (window.renderMathInElement) {
        window.renderMathInElement(tabDescContainer, { delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}], throwOnError: false });
    }

    const btnNotebook = document.getElementById('btn-notebook');
    if (leccion.llmLink) { btnNotebook.style.display = 'inline-flex'; btnNotebook.href = leccion.llmLink; }
    else { btnNotebook.style.display = 'none'; }

    document.querySelectorAll('.lesson-item').forEach(i => i.classList.remove('active'));
    if (elementLi) elementLi.classList.add('active');

    // Reset visual
    iframe.style.display          = 'block';
    enlacesContainer.style.display = 'none';
    rightSidebar.style.display    = 'none';
    playOverlay.style.display     = 'none';

    // ── Renderizar según tipo ────────────────────────────────

    if (leccion.tipo === 'enlaces') {
        // Directorio de enlaces
        iframe.style.display           = 'none';
        enlacesContainer.style.display = 'block';
        iframeWrapper.style.aspectRatio = 'auto';
        iframeWrapper.style.height     = '75vh';
        iframeWrapper.style.minHeight  = '500px';

        let html = '';
        if (leccion.secciones?.length > 0) {
            leccion.secciones.forEach(seccion => {
                html += `<div class="enlaces-section"><h4 class="enlaces-section-title"><span class="material-symbols-outlined text-accent icon-filled">folder_special</span> ${seccion.tituloSeccion}</h4><div class="enlaces-grid">`;
                seccion.links.forEach(link => {
                    let icon = 'link';
                    const u  = link.url.toLowerCase();
                    if (u.includes('youtube') || u.includes('video'))   icon = 'play_circle';
                    else if (u.includes('pdf'))                          icon = 'picture_as_pdf';
                    else if (u.includes('phet') || u.includes('educaplus')) icon = 'experiment';
                    else if (u.includes('wikipedia') || u.includes('openstax')) icon = 'language';
                    else if (u.includes('drive.google'))                 icon = 'cloud';
                    html += `<a href="${link.url}" target="_blank" class="enlace-card"><h5 class="enlace-title"><span class="material-symbols-outlined" style="font-size:20px;color:var(--accent);">${icon}</span> ${link.titulo}</h5><p class="enlace-desc">${link.descripcion}</p><span class="enlace-url">${link.url}</span></a>`;
                });
                html += '</div></div>';
            });
        } else {
            html = '<div style="padding:50px;text-align:center;color:var(--text-medium);"><span class="material-symbols-outlined" style="font-size:40px;opacity:0.5;">link_off</span><br>El profesor aún no ha cargado enlaces.</div>';
        }
        enlacesContainer.innerHTML = html;

    } else if (leccion.tipo === 'multivideo' || leccion.tipo === 'multipresentacion') {
        // Playlist lateral
        rightSidebar.style.display  = 'flex';
        playlistSidebar.style.display = 'block';
        playlistContent.innerHTML   = '';

        const recursos = leccion.recurso.split('|');
        recursos.forEach((rec, index) => {
            let thumbUrl = leccion.tipo === 'multivideo'
                ? `https://img.youtube.com/vi/${rec.split('&')[0]}/mqdefault.jpg`
                : `https://ui-avatars.com/api/?name=Part+${index + 1}&background=2563eb&color=fff&size=120`;

            const card = document.createElement('div');
            card.className = `thumbnail-card ${index === 0 ? 'active' : ''}`;
            card.innerHTML = `<img src="${thumbUrl}" class="thumb-img" alt="Thumbnail"><div class="thumb-info"><h4 class="thumb-title">Recurso ${index + 1}</h4><span style="font-size:0.7rem;color:var(--text-medium);">${leccion.tipo === 'multivideo' ? 'Video Magistral' : 'Diapositiva'}</span></div>`;
            card.onclick = () => {
                document.querySelectorAll('.thumbnail-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                iframe.src = leccion.tipo === 'multivideo' ? getYoutubeEmbed(rec) : rec;
            };
            playlistContent.appendChild(card);
        });

        if (leccion.tipo === 'multivideo') {
            iframe.src = getYoutubeEmbed(recursos[0]);
            iframeWrapper.style.aspectRatio = '16/9'; iframeWrapper.style.height = 'auto';
        } else {
            iframe.src = recursos[0];
            iframeWrapper.style.aspectRatio = 'auto'; iframeWrapper.style.height = '75vh'; iframeWrapper.style.minHeight = '500px';
        }

    } else {
        // Video simple, simulador, ejercicio, quiz
        if (leccion.tipo === 'video') {
            iframe.src = getYoutubeEmbed(leccion.recurso);
            iframeWrapper.style.aspectRatio = '16/9'; iframeWrapper.style.height = 'auto';
        } else if (leccion.tipo === 'quiz' && leccion.preguntas) {
            // Renderizado dinámico del Examen con el Nuevo Motor Cognitivo
            iframe.style.display = 'none';
            enlacesContainer.style.display = 'block';
            enlacesContainer.innerHTML = '<div id="dyn-quiz-container"></div>';
            
            setTimeout(() => {
                if(window.initDynamicQuiz) {
                    window.initDynamicQuiz('dyn-quiz-container', leccion);
                }
            }, 50);
        } else {
            iframe.src = leccion.recurso;
            iframeWrapper.style.aspectRatio = 'auto'; iframeWrapper.style.height = '75vh'; iframeWrapper.style.minHeight = '500px';
        }
    }

    // Enviar UID al iframe hijo (sincronización)
    iframe.onload = function () {
        if (window.currentUserUid) {
            this.contentWindow?.postMessage({ action: 'initSync', uid: window.currentUserUid, appId: APP_ID }, '*');
        }
    };

    // ── Marcar completado ────────────────────────────────────
    const autoComplete = leccion.tipo !== 'simulador' && leccion.tipo !== 'quiz';
    if (!progressData[leccion.id]) {
        if (autoComplete) {
            _marcarCompletado(leccion, elementLi, progressData);
        }
    }
    if (leccion.tipo === 'enlaces' && !progressData[leccion.id]) {
        _marcarCompletado(leccion, elementLi, progressData);
    }

    // Restaurar notas y eval
    document.getElementById('area-notas').value = localStorage.getItem('notas_' + currentLeccionId) || '';
    document.querySelectorAll('.eval-btn').forEach(btn => btn.classList.remove('active'));
    if (evalData[currentLeccionId]) {
        document.getElementById('eval-' + evalData[currentLeccionId])?.classList.add('active');
    }
}

function _marcarCompletado(leccion, elementLi, progressData) {
    progressData[leccion.id] = true;
    localStorage.setItem('cursoElectromagnetismoProgreso', JSON.stringify(progressData));
    if (elementLi) {
        elementLi.classList.add('completed');
        const icon = elementLi.querySelector('.icon-status');
        if (icon) { icon.innerText = 'check_circle'; icon.classList.add('icon-filled'); }
    }
    guardarProgresoNube(leccion.id);
}
