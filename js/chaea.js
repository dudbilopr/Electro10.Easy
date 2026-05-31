// chaea.js - Lógica interactiva para el cuestionario CHAEA

let chaeaRespuestas = new Array(80).fill(null);
let chaeaFlags = new Array(80).fill(false);
let chaeaCurrentIndex = 0;

const CHAEA_KEYS = {
    activo: [3, 5, 7, 9, 13, 20, 26, 27, 35, 37, 41, 43, 46, 48, 51, 61, 67, 74, 75, 77],
    reflexivo: [10, 16, 18, 19, 28, 31, 32, 34, 36, 39, 42, 44, 49, 55, 58, 63, 65, 69, 70, 79],
    teorico: [2, 4, 6, 11, 15, 17, 21, 23, 25, 29, 33, 45, 50, 54, 60, 64, 66, 71, 78, 80],
    pragmatico: [1, 8, 12, 14, 22, 24, 30, 38, 40, 47, 52, 53, 56, 57, 59, 62, 68, 72, 73, 76]
};

const BAREMOS = {
    activo: { baja: 6, moderada: 12, alta: 14, muy_alta: 20 },
    reflexivo: { baja: 10, moderada: 17, alta: 19, muy_alta: 20 },
    teorico: { baja: 6, moderada: 13, alta: 15, muy_alta: 20 },
    pragmatico: { baja: 8, moderada: 13, alta: 15, muy_alta: 20 }
};

window.iniciarChaea = function() {
    chaeaRespuestas = new Array(80).fill(null);
    chaeaFlags = new Array(80).fill(false);
    chaeaCurrentIndex = 0;
    
    document.getElementById('chaea-modal').style.display = 'flex';
    document.getElementById('chaea-results-view').style.display = 'none';
    document.querySelector('#chaea-modal .modal-content > div:nth-child(2)').style.display = 'flex';
    
    generarNavegacionChaea();
    mostrarPreguntaChaea(0);
};

function generarNavegacionChaea() {
    const grid = document.getElementById('chaea-nav-grid');
    grid.innerHTML = '';
    for(let i=0; i<80; i++) {
        const btn = document.createElement('button');
        btn.innerText = i + 1;
        btn.style.cssText = `
            padding: 5px; font-size: 0.75rem; border: 1px solid var(--border-color);
            background: var(--bg-main); color: var(--text-high); cursor: pointer; border-radius: 4px;
        `;
        btn.onclick = () => mostrarPreguntaChaea(i);
        btn.id = 'chaea-nav-' + i;
        grid.appendChild(btn);
    }
    actualizarEstadoNavegacion();
}

function actualizarEstadoNavegacion() {
    let respondidas = 0;
    for(let i=0; i<80; i++) {
        const btn = document.getElementById('chaea-nav-' + i);
        if(!btn) continue;
        
        btn.style.border = i === chaeaCurrentIndex ? '2px solid var(--accent)' : '1px solid var(--border-color)';
        
        if (chaeaRespuestas[i] !== null) {
            btn.style.background = 'var(--primary)';
            btn.style.color = '#fff';
            respondidas++;
        } else {
            btn.style.background = 'var(--bg-main)';
            btn.style.color = 'var(--text-high)';
        }
        
        if (chaeaFlags[i]) {
            btn.style.boxShadow = '0 0 0 2px #ef4444 inset';
        } else {
            btn.style.boxShadow = 'none';
        }
    }
    
    document.getElementById('btn-finalizar-chaea').disabled = respondidas < 80;
}

window.mostrarPreguntaChaea = function(index) {
    if (index < 0 || index >= 80) return;
    chaeaCurrentIndex = index;
    const q = window.CHAEA_QUESTIONS[index];
    
    document.getElementById('chaea-current-num').innerText = q.id;
    document.getElementById('chaea-question-text').innerText = q.texto;
    
    // Ayuda visual basada en palabras clave
    const iconEl = document.getElementById('chaea-icon');
    const visualEl = document.getElementById('chaea-visual-aid');
    visualEl.style.display = 'block';
    
    let txt = q.texto.toLowerCase();
    if (txt.includes('intuir') || txt.includes('intuición') || txt.includes('espontánea')) iconEl.innerText = 'lightbulb';
    else if (txt.includes('lógica') || txt.includes('analizar') || txt.includes('teoría') || txt.includes('razonamiento')) iconEl.innerText = 'account_tree';
    else if (txt.includes('práctica') || txt.includes('experimentar') || txt.includes('concreto')) iconEl.innerText = 'science';
    else if (txt.includes('reflexionar') || txt.includes('observar') || txt.includes('escuchar')) iconEl.innerText = 'visibility';
    else if (txt.includes('normas') || txt.includes('orden') || txt.includes('estructuradas')) iconEl.innerText = 'rule';
    else iconEl.innerText = 'psychology';
    
    // Estado de los botones de respuesta
    const val = chaeaRespuestas[index];
    document.getElementById('chaea-btn-yes').style.opacity = (val === 1) ? '1' : '0.5';
    document.getElementById('chaea-btn-no').style.opacity = (val === 0) ? '1' : '0.5';
    if(val === null) {
        document.getElementById('chaea-btn-yes').style.opacity = '1';
        document.getElementById('chaea-btn-no').style.opacity = '1';
    }
    
    // Estado de la bandera
    const flagBtn = document.getElementById('chaea-btn-flag');
    flagBtn.style.color = chaeaFlags[index] ? '#ef4444' : 'var(--text-medium)';
    
    actualizarEstadoNavegacion();
};

window.responderChaea = function(valor) {
    chaeaRespuestas[chaeaCurrentIndex] = valor;
    if (chaeaCurrentIndex < 79) {
        mostrarPreguntaChaea(chaeaCurrentIndex + 1);
    } else {
        actualizarEstadoNavegacion();
        mostrarPreguntaChaea(chaeaCurrentIndex); // just to update UI
    }
};

window.prevChaea = function() {
    mostrarPreguntaChaea(chaeaCurrentIndex - 1);
};
window.nextChaea = function() {
    mostrarPreguntaChaea(chaeaCurrentIndex + 1);
};

window.toggleChaeaFlag = function() {
    chaeaFlags[chaeaCurrentIndex] = !chaeaFlags[chaeaCurrentIndex];
    mostrarPreguntaChaea(chaeaCurrentIndex);
};

window.finalizarChaea = function() {
    if (chaeaRespuestas.includes(null)) {
        if(window.Swal) Swal.fire('Atención', 'Aún tienes preguntas sin responder.', 'warning');
        return;
    }
    
    // Calcular puntajes
    let scores = { activo: 0, reflexivo: 0, teorico: 0, pragmatico: 0 };
    
    for(let i=0; i<80; i++) {
        let qNum = i + 1;
        let ans = chaeaRespuestas[i]; // 1 o 0
        
        if(CHAEA_KEYS.activo.includes(qNum)) scores.activo += ans;
        else if(CHAEA_KEYS.reflexivo.includes(qNum)) scores.reflexivo += ans;
        else if(CHAEA_KEYS.teorico.includes(qNum)) scores.teorico += ans;
        else if(CHAEA_KEYS.pragmatico.includes(qNum)) scores.pragmatico += ans;
    }
    
    // Determinar dominante
    let maxScore = -1;
    let dominante = '';
    Object.keys(scores).forEach(key => {
        if(scores[key] > maxScore) {
            maxScore = scores[key];
            dominante = key;
        }
    });
    
    mostrarResultados(scores, dominante);
};

let chaeaChartInstance = null;

function mostrarResultados(scores, dominante) {
    // Cambiar UI
    document.querySelector('#chaea-modal .modal-content > div:nth-child(2)').style.display = 'none';
    document.getElementById('chaea-results-view').style.display = 'flex';
    
    const desc = {
        activo: "Eres de mente abierta, entusiasta y te lanzas a nuevas experiencias sin prejuicios. Aprendes mejor enfrentándote a retos, participando activamente y trabajando en equipo.",
        reflexivo: "Eres observador, analítico y prudente. Prefieres reunir datos, escuchando a los demás antes de actuar o tomar una decisión. Aprendes mejor cuando tienes tiempo para pensar y asimilar la información.",
        teorico: "Eres lógico, objetivo y metódico. Te gusta integrar los hechos en teorías coherentes y complejas. Aprendes mejor con modelos, conceptos teóricos y sistemas lógicos.",
        pragmatico: "Eres práctico, realista y directo. Te gusta probar ideas, teorías y técnicas nuevas para comprobar si funcionan en la práctica. Aprendes mejor con actividades directamente relacionadas a tu labor."
    };
    
    const recs = {
        activo: "<li><b>Experimenta con el simulador:</b> Interactúa con las cargas en PhET antes de leer la teoría.</li><li><b>Gamificación:</b> Participa activamente en los retos cognitivos y crucigramas.</li><li><b>Evita lecturas muy largas:</b> Divide el estudio en sesiones dinámicas y prácticas.</li>",
        reflexivo: "<li><b>Bóveda Obsidian:</b> Utiliza y expande tu grafo de conocimiento tomando notas detalladas.</li><li><b>Análisis de Casos:</b> Reflexiona sobre los experimentos históricos como la balanza de Coulomb.</li><li><b>Tómate tu tiempo:</b> Revisa las clases grabadas y pausa para entender cada deducción matemática.</li>",
        teorico: "<li><b>Formulario Matemático:</b> Dedica tiempo a entender las deducciones del Cálculo Vectorial aplicadas a Maxwell.</li><li><b>Lecturas rigurosas:</b> Profundiza en las definiciones exactas del Glosario.</li><li><b>Busca la estructura:</b> Entiende el 'por qué' de cada fórmula antes de usarla.</li>",
        pragmatico: "<li><b>Ejercicios Aplicados:</b> Enfócate en los problemas reales y el 'Tutor por Cámara' para validar tus soluciones.</li><li><b>Menos teoría, más práctica:</b> Aplica las ecuaciones de inmediato a circuitos o problemas de campo.</li><li><b>Busca utilidades:</b> Relaciona la teoría electromagnética con tecnologías reales (motores, antenas).</li>"
    };
    
    document.getElementById('chaea-res-dom').innerText = dominante.charAt(0).toUpperCase() + dominante.slice(1);
    document.getElementById('chaea-res-desc').innerText = desc[dominante];
    document.getElementById('chaea-res-recs').innerHTML = recs[dominante];
    
    // Guardar en Perfil Local
    const chaeaProfile = {
        scores: scores,
        dominante: dominante,
        fecha: new Date().toISOString()
    };
    localStorage.setItem('electro10_chaea', JSON.stringify(chaeaProfile));
    
    // Render Chart
    try {
        const ctx = document.getElementById('chaea-radar-chart').getContext('2d');
        if (chaeaChartInstance) chaeaChartInstance.destroy();
        
        chaeaChartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Activo', 'Reflexivo', 'Teórico', 'Pragmático'],
                datasets: [{
                    label: 'Tu Perfil',
                    data: [scores.activo, scores.reflexivo, scores.teorico, scores.pragmatico],
                    backgroundColor: 'rgba(168, 85, 247, 0.4)',
                    borderColor: '#a855f7',
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#a855f7',
                    pointHoverBackgroundColor: '#a855f7',
                    pointHoverBorderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(128, 128, 128, 0.2)' },
                        grid: { color: 'rgba(128, 128, 128, 0.2)' },
                        pointLabels: { color: '#a855f7', font: { size: 12 } },
                        ticks: { display: false, min: 0, max: 20 }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    } catch (e) {
        console.error("Error al renderizar gráfico CHAEA:", e);
    }
};

window.cerrarYGuardarChaea = async function() {
    document.getElementById('chaea-modal').style.display = 'none';
    
    // Si hay usuario logueado, guardar en la nube
    if (window.currentUserUid) {
        try {
            const profileStr = localStorage.getItem('electro10_chaea');
            if (profileStr) {
                const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");
                const { db } = await import('./firebase.js');
                const { APP_ID } = await import('../config/firebase.config.js');
                await setDoc(doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'profile', 'chaea'), JSON.parse(profileStr));
            }
        } catch(e) {
            console.error("Error guardando chaea en firestore", e);
        }
    }
    
    // Actualizar vista de perfil
    if (window.cargarResultadosChaeaPerfil) {
        window.cargarResultadosChaeaPerfil();
    }
    
    // Verificar si estamos en el módulo cero
    if (document.getElementById('content-header').innerText.includes('Presaberes')) {
        document.getElementById('btn-finalizar-modulo').disabled = false;
        document.getElementById('btn-finalizar-modulo').classList.remove('btn-locked');
    }
    
    if(window.Swal) Swal.fire('¡Perfil Creado!', 'Tus analíticas de aprendizaje han sido guardadas y el docente ha sido notificado.', 'success');
};
