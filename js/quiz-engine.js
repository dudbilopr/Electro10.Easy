// quiz-engine.js
// Motor Centralizado de Evaluación Dinámica y Análisis Cognitivo para Electro10.Easy

(function() {
    let currentQuiz = null;
    let currentQuestionIndex = 0;
    let userState = [];
    let startTime = null;
    let questionTimer = null;
    let containerEl = null;

    window.initDynamicQuiz = (containerId, leccion) => {
        containerEl = document.getElementById(containerId);
        if(!containerEl) return;

        currentQuiz = leccion;
        currentQuestionIndex = 0;
        
        // Inicializar estado del usuario y métricas cognitivas
        userState = leccion.preguntas.map(() => ({
            answered: false,
            value: null,
            flagged: false,
            timeSpent: 0, // Segundos invertidos en esta pregunta
            hesitations: 0 // Cambios de respuesta o re-visitas
        }));

        renderQuizUI();
        showQuestion(0);
        startTimer();
    };

    function renderQuizUI() {
        // Estructura Base: Header, Navegación, Contenedor de Preguntas, Controles, Panel de Resultados
        let html = `
        <div class="quiz-wrapper" style="max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px;">
            
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: var(--text-high); display: flex; align-items: center; justify-content: center; gap: 10px;">
                    <span class="material-symbols-outlined">quiz</span> ${currentQuiz.titulo}
                </h2>
                <p style="color: var(--text-medium);">${currentQuiz.descripcion || 'Selecciona la respuesta correcta para cada pregunta.'}</p>
            </div>

            <div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap;">
                
                <!-- Navegación y Banderas -->
                <aside style="flex: 1; min-width: 250px; background: var(--bg-surface); padding: 20px; border-radius: 12px; border: 1px solid var(--border-color);">
                    <h3 style="display: flex; align-items: center; gap: 8px; font-size: 1rem; margin-bottom: 15px;">
                        <span class="material-symbols-outlined">grid_view</span> Navegación
                    </h3>
                    <div id="quiz-nav-grid" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-bottom: 20px;"></div>
                    
                    <div style="font-size: 0.85rem; color: var(--text-medium); display: flex; flex-direction: column; gap: 8px; margin-top: 20px; border-top: 1px solid var(--border-color); padding-top: 15px;">
                        <div style="display:flex; align-items:center; gap:8px;"><div style="width:12px; height:12px; border-radius:3px; border:1px solid var(--border-color);"></div> Sin responder</div>
                        <div style="display:flex; align-items:center; gap:8px;"><div style="width:12px; height:12px; border-radius:3px; background:var(--accent);"></div> Respondida</div>
                        <div style="display:flex; align-items:center; gap:8px;"><div style="width:12px; height:12px; border-radius:3px; background:var(--warning);"></div> Revisar Luego</div>
                    </div>

                    <button id="btn-evaluar-quiz" class="btn-primary" style="width: 100%; margin-top: 20px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <span class="material-symbols-outlined">analytics</span> Evaluar Examen
                    </button>
                </aside>

                <!-- Área Central de Pregunta -->
                <section style="flex: 3; min-width: 300px; display: flex; flex-direction: column; gap: 20px;">
                    <div id="quiz-questions-container" style="background: var(--bg-surface); padding: 30px; border-radius: 12px; border: 1px solid var(--border-color); min-height: 350px;"></div>
                    
                    <!-- Controles Inferiores -->
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <button id="btn-quiz-prev" class="btn-secondary" style="display: flex; align-items: center; gap: 5px;">
                            <span class="material-symbols-outlined">chevron_left</span> Anterior
                        </button>
                        <button id="btn-quiz-flag" class="btn-secondary" style="display: flex; align-items: center; gap: 5px; color: var(--warning); border-color: var(--warning);">
                            <span class="material-symbols-outlined" id="icon-quiz-flag">flag</span> <span class="hidden-mobile">Marcar para revisar</span>
                        </button>
                        <button id="btn-quiz-next" class="btn-primary" style="display: flex; align-items: center; gap: 5px;">
                            Siguiente <span class="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </section>
            </div>

            <!-- Panel de Resultados (Oculto) -->
            <div id="quiz-results-panel" style="display: none; background: var(--bg-surface); padding: 40px; border-radius: 12px; border: 1px solid var(--border-color); text-align: center; margin-top: 20px;">
                <span class="material-symbols-outlined" style="font-size: 60px; color: var(--success); margin-bottom: 20px;">task_alt</span>
                <h2>Resultados de Evaluación</h2>
                <h1 id="quiz-score-display" style="font-size: 4rem; color: var(--text-high); margin: 10px 0;">0%</h1>
                <p id="quiz-feedback-msg" style="color: var(--text-medium); font-size: 1.1rem; max-width: 600px; margin: 0 auto 30px auto;"></p>
                
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button class="btn-secondary" onclick="document.getElementById('quiz-results-panel').style.display='none';" style="display: flex; align-items: center; gap: 5px;">
                        <span class="material-symbols-outlined">manage_search</span> Revisar Respuestas
                    </button>
                </div>
            </div>

        </div>`;

        containerEl.innerHTML = html;
        renderNavGrid();
        renderAllQuestions();

        // Eventos
        document.getElementById('btn-quiz-prev').addEventListener('click', () => { if(currentQuestionIndex > 0) showQuestion(currentQuestionIndex - 1); });
        document.getElementById('btn-quiz-next').addEventListener('click', () => { if(currentQuestionIndex < currentQuiz.preguntas.length - 1) showQuestion(currentQuestionIndex + 1); });
        document.getElementById('btn-quiz-flag').addEventListener('click', () => toggleFlag(currentQuestionIndex));
        document.getElementById('btn-evaluar-quiz').addEventListener('click', evaluateDynamicQuiz);
    }

    function renderNavGrid() {
        const grid = document.getElementById('quiz-nav-grid');
        grid.innerHTML = '';
        currentQuiz.preguntas.forEach((_, i) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-nav-item';
            btn.style.cssText = `width: 100%; aspect-ratio: 1; border-radius: 6px; font-weight: bold; border: 1px solid var(--border-color); background: transparent; color: var(--text-medium); cursor: pointer; transition: all 0.2s;`;
            btn.id = `quiz-nav-btn-${i}`;
            btn.textContent = i + 1;
            btn.addEventListener('click', () => showQuestion(i));
            grid.appendChild(btn);
        });
        updateNavStyles();
    }

    function updateNavStyles() {
        currentQuiz.preguntas.forEach((_, i) => {
            const btn = document.getElementById(`quiz-nav-btn-${i}`);
            if(!btn) return;
            
            // Reset styles
            btn.style.background = 'transparent';
            btn.style.color = 'var(--text-medium)';
            btn.style.borderColor = 'var(--border-color)';
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = 'none';

            if (userState[i].flagged) {
                btn.style.background = 'var(--warning)';
                btn.style.color = '#fff';
                btn.style.borderColor = 'var(--warning)';
            } else if (userState[i].answered) {
                btn.style.background = 'var(--accent)';
                btn.style.color = '#fff';
                btn.style.borderColor = 'var(--accent)';
            }

            if (i === currentQuestionIndex) {
                btn.style.transform = 'scale(1.1)';
                btn.style.boxShadow = '0 0 0 2px var(--bg-main), 0 0 0 4px var(--accent)';
            }
        });
    }

    function renderAllQuestions() {
        const container = document.getElementById('quiz-questions-container');
        container.innerHTML = '';

        currentQuiz.preguntas.forEach((q, index) => {
            const card = document.createElement('div');
            card.className = `quiz-q-card`;
            card.id = `quiz-q-card-${index}`;
            card.style.display = 'none';

            let typeLabel = "Opción Múltiple";
            if(q.type === 'fill') typeLabel = "Respuesta Corta";
            if(q.type === 'equation') typeLabel = "Ecuación";

            let html = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <span style="background: var(--bg-main); padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: bold; color: var(--accent); border: 1px solid var(--border-color);">${q.tema || typeLabel}</span>
                    <span style="font-size: 0.8rem; color: var(--text-low);"><span class="material-symbols-outlined" style="font-size:14px; vertical-align:middle;">timer</span> <span id="timer-q-${index}">0s</span></span>
                </div>
                <h3 style="font-size: 1.2rem; color: var(--text-high); margin-bottom: 20px; line-height: 1.5;">${index + 1}. ${q.pregunta}</h3>
            `;

            // Si es MCQ o por defecto
            if (!q.type || q.type === 'mcq') {
                html += `<div style="display: flex; flex-direction: column; gap: 10px;">`;
                q.opciones.forEach((opt, oIdx) => {
                    html += `
                    <label style="display: flex; align-items: center; gap: 12px; p-padding: 15px; border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer; transition: all 0.2s; padding: 15px;" class="quiz-opt-wrapper hover:bg-slate-50">
                        <input type="radio" name="dq_${index}" value="${oIdx}" class="quiz-input-radio" style="width: 18px; height: 18px; accent-color: var(--accent);">
                        <span style="color: var(--text-medium); font-size: 1rem;">${opt}</span>
                    </label>`;
                });
                html += `</div>`;
            } else if (q.type === 'fill' || q.type === 'equation') {
                html += `
                <div style="margin-top: 20px;">
                    <input type="text" id="dq_${index}" placeholder="Escribe tu respuesta aquí..." style="width: 100%; padding: 15px; border: 2px solid var(--border-color); border-radius: 8px; font-size: 1.1rem; background: var(--bg-main); color: var(--text-high); text-align: center; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border-color)'">
                </div>`;
            }

            html += `
                <div id="quiz-feedback-${index}" style="display: none; margin-top: 20px; padding: 15px; border-radius: 8px; font-size: 0.95rem; border-left: 4px solid transparent;"></div>
            `;

            card.innerHTML = html;
            container.appendChild(card);
        });

        // Listeners para cambiar estado a "respondida"
        document.querySelectorAll('.quiz-input-radio').forEach(input => {
            input.addEventListener('change', (e) => {
                const match = e.target.name.match(/dq_(\d+)/);
                if (match) {
                    const idx = parseInt(match[1]);
                    userState[idx].answered = true;
                    userState[idx].value = e.target.value;
                    userState[idx].hesitations++;
                    updateNavStyles();
                }
            });
        });

        document.querySelectorAll('input[type="text"][id^="dq_"]').forEach(input => {
            input.addEventListener('input', (e) => {
                const match = e.target.id.match(/dq_(\d+)/);
                if (match) {
                    const idx = parseInt(match[1]);
                    userState[idx].answered = e.target.value.trim() !== '';
                    userState[idx].value = e.target.value;
                    updateNavStyles();
                }
            });
        });
    }

    function showQuestion(index) {
        // Pausar timer de la pregunta anterior
        clearInterval(questionTimer);

        document.querySelectorAll('.quiz-q-card').forEach((el, i) => {
            el.style.display = (i === index) ? 'block' : 'none';
        });

        currentQuestionIndex = index;
        updateNavStyles();

        document.getElementById('btn-quiz-prev').disabled = (index === 0);
        document.getElementById('btn-quiz-next').disabled = (index === currentQuiz.preguntas.length - 1);

        const flagBtn = document.getElementById('btn-quiz-flag');
        const flagIcon = document.getElementById('icon-quiz-flag');
        if (userState[index].flagged) {
            flagBtn.style.background = 'var(--warning)';
            flagBtn.style.color = '#fff';
            flagIcon.innerText = 'check';
        } else {
            flagBtn.style.background = 'transparent';
            flagBtn.style.color = 'var(--warning)';
            flagIcon.innerText = 'flag';
        }

        // Renderizar KaTeX si existe
        if (window.renderMathInElement) {
            renderMathInElement(document.getElementById(`quiz-q-card-${index}`), {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false},
                    {left: '\\(', right: '\\)', display: false},
                    {left: '\\[', right: '\\]', display: true}
                ],
                throwOnError: false
            });
        }

        startTimer();
    }

    function toggleFlag(index) {
        userState[index].flagged = !userState[index].flagged;
        showQuestion(index);
    }

    function startTimer() {
        questionTimer = setInterval(() => {
            userState[currentQuestionIndex].timeSpent++;
            const timerEl = document.getElementById(`timer-q-${currentQuestionIndex}`);
            if(timerEl) timerEl.innerText = userState[currentQuestionIndex].timeSpent + 's';
        }, 1000);
    }

    function evaluateDynamicQuiz() {
        clearInterval(questionTimer);

        const unanswered = userState.filter(s => !s.answered).length;
        if (unanswered > 0) {
            Swal.fire({
                title: 'Preguntas sin responder',
                html: `Aún tienes <b>${unanswered}</b> preguntas sin responder. <br>¿Estás seguro de enviar el examen?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, evaluar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) processEvaluation();
                else startTimer();
            });
        } else {
            processEvaluation();
        }
    }

    async function processEvaluation() {
        let scorePonderado = 0;
        let pesoTotal = 0;
        let totalTime = 0;
        let totalHesitations = 0;

        currentQuiz.preguntas.forEach((q, i) => {
            const state = userState[i];
            pesoTotal += q.peso || 10;
            totalTime += state.timeSpent;
            totalHesitations += state.hesitations;

            const feedbackEl = document.getElementById(`quiz-feedback-${i}`);
            let isCorrect = false;

            if (!q.type || q.type === 'mcq') {
                isCorrect = parseInt(state.value) === q.respuestaCorrecta;
            } else if (q.type === 'fill' || q.type === 'equation') {
                isCorrect = state.value && state.value.trim().toLowerCase() === q.answer.trim().toLowerCase();
            }

            if (isCorrect) {
                scorePonderado += q.peso || 10;
                feedbackEl.innerHTML = `<div style="display:flex; align-items:center; gap:8px;"><span class="material-symbols-outlined">check_circle</span> ¡Correcto!</div>`;
                feedbackEl.style.background = 'rgba(16,185,129,0.1)';
                feedbackEl.style.color = 'var(--success)';
                feedbackEl.style.borderColor = 'var(--success)';
            } else {
                feedbackEl.innerHTML = `<div style="display:flex; align-items:center; gap:8px;"><span class="material-symbols-outlined">cancel</span> Incorrecto.</div><div style="margin-top:5px; font-size:0.9em;">${q.feedback_error || q.tip || ''}</div>`;
                feedbackEl.style.background = 'rgba(239,68,68,0.1)';
                feedbackEl.style.color = 'var(--danger)';
                feedbackEl.style.borderColor = 'var(--danger)';
            }
            feedbackEl.style.display = 'block';
        });

        const puntajeFinal = Math.round((scorePonderado / pesoTotal) * 100);
        
        // Muestra panel de resultados
        document.getElementById('quiz-results-panel').style.display = 'block';
        document.getElementById('quiz-score-display').innerText = puntajeFinal + '%';
        
        let msg = puntajeFinal >= 65 ? "¡Excelente trabajo! Has demostrado dominio cognitivo en esta área." : "Necesitas repasar algunos conceptos clave. Revisa el feedback en las preguntas.";
        document.getElementById('quiz-feedback-msg').innerText = msg;

        // Fase 4: Tutoría IA Proactiva y Sistema Adaptativo
        let perfilCognitivo = puntajeFinal > 85 ? 'avanzado' : 'estructurado';

        if (puntajeFinal < 65 && window.triggerProactiveAI) {
            window.triggerProactiveAI(`He notado que tu puntuación fue del ${puntajeFinal}%. No te preocupes, el aprendizaje es un proceso. ¿En qué conceptos sientes que tuviste más dudas? Estoy aquí para explicártelo de forma diferente.`);
        }

        // Mostrar Insights Adaptativos (Learning by Doing / ABP)
        const feedbackContainer = document.getElementById('quiz-results-panel');
        if(feedbackContainer) {
            let adaptiveHtml = '';
            if(perfilCognitivo === 'avanzado') {
                adaptiveHtml = `
                <div style="margin-top: 15px; padding: 15px; background: rgba(168, 85, 247, 0.1); border-left: 4px solid #a855f7; border-radius: 8px;">
                    <h4 style="margin: 0 0 5px 0; color: #a855f7;"><span class="material-symbols-outlined" style="vertical-align: middle;">psychology_alt</span> Reto de Física Profunda</h4>
                    <p style="margin: 0; font-size: 0.9rem; color: var(--text-medium);">Dominas este nivel. Intenta aplicar estos conceptos en el simulador desactivando las ayudas visuales y derivando tú mismo las ecuaciones.</p>
                </div>`;
            } else {
                adaptiveHtml = `
                <div style="margin-top: 15px; padding: 15px; background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; border-radius: 8px;">
                    <h4 style="margin: 0 0 5px 0; color: #3b82f6;"><span class="material-symbols-outlined" style="vertical-align: middle;">lightbulb</span> Metodología Sugerida (Paso a Paso)</h4>
                    <p style="margin: 0; font-size: 0.9rem; color: var(--text-medium);">Te recomendamos revisar el glosario en el "Cerebro de Conocimiento" y rehacer el experimento virtual anotando las variables una por una.</p>
                </div>`;
            }
            // Inject after msg
            const msgEl = document.getElementById('quiz-feedback-msg');
            if (msgEl && !document.getElementById('adaptive-insight-box')) {
                const box = document.createElement('div');
                box.id = 'adaptive-insight-box';
                box.innerHTML = adaptiveHtml;
                msgEl.parentNode.insertBefore(box, msgEl.nextSibling);
            }
        }

        // Calcular Índice de Carga Cognitiva
        // (Un índice inventado para el admin: Mayor tiempo y mayor duda = Mayor Carga Cognitiva)
        const avgTimePerQuestion = totalTime / currentQuiz.preguntas.length;
        const cognitiveLoad = Math.min(100, Math.round((avgTimePerQuestion * 0.5) + (totalHesitations * 2)));

        // Guardar la evaluación
        if (window._currentLeccionId && window.evalData && window.progressData) {
            window.evalData[window._currentLeccionId] = puntajeFinal;
            localStorage.setItem('cursoElectromagnetismoEval', JSON.stringify(window.evalData));
            
            if (puntajeFinal >= 65) {
                window.progressData[window._currentLeccionId] = true;
                localStorage.setItem('cursoElectromagnetismoProgreso', JSON.stringify(window.progressData));
                if(window.guardarProgresoNube) window.guardarProgresoNube(window._currentLeccionId);
            }
            
            // Guardar en Firestore con métricas avanzadas y Perfil Cognitivo
            if (window.currentUserUid && window.APP_ID) {
                try {
                    const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");
                    await setDoc(doc(window.db, 'artifacts', window.APP_ID, 'users', window.currentUserUid, 'evaluations', 'data'), {
                        [window._currentLeccionId]: {
                            score: puntajeFinal,
                            cognitiveLoad: cognitiveLoad,
                            timeSpent: totalTime,
                            hesitations: totalHesitations,
                            timestamp: Date.now()
                        }
                    }, { merge: true });
                    
                    // Actualizar Perfil Raíz del usuario
                    await setDoc(doc(window.db, 'artifacts', window.APP_ID, 'users', window.currentUserUid), {
                        cognitiveProfile: perfilCognitivo,
                        lastActive: Date.now()
                    }, { merge: true });
                    
                } catch(e) { console.error("Error guardando analíticas cognitivas", e); }
            }
        }
        
        // Renderizar KaTeX en el feedback
        if (window.renderMathInElement) {
            renderMathInElement(document.getElementById('quiz-questions-container'), {
                delimiters: [ {left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false} ],
                throwOnError: false
            });
        }
    }

})();
