// diagnostics.js
import { KOLB_QUESTIONS, MI_QUESTIONS, MI_KEYS, analyzeHolisticProfile } from './diagnostics_data.js';
import { db, auth } from './firebase.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { APP_ID } from '../config/firebase.config.js';

let kolbResponses = {}; // { qId: { a: val, b: val, c: val, d: val } }
let miResponses = new Array(35).fill(null);

window.iniciarDiagnosticoHub = function() {
    // 1. Check if CHAEA is done
    const savedChaea = localStorage.getItem('electro10_chaea');
    if (!savedChaea) {
        Swal.fire({
            title: 'Fase 1: CHAEA',
            text: 'Primero completaremos el test de estilos de aprendizaje CHAEA (80 preguntas).',
            icon: 'info',
            confirmButtonText: 'Comenzar'
        }).then(() => {
            window.iniciarChaea(); // Already exists in chaea.js
            // We need a hook when CHAEA finishes. We will intercept the finalize or poll.
        });
        return;
    }
    
    // 2. Check if Kolb is done
    const savedKolb = localStorage.getItem('electro10_kolb');
    if (!savedKolb) {
        startKolbTest();
        return;
    }
    
    // 3. Check if MI is done
    const savedMI = localStorage.getItem('electro10_mi');
    if (!savedMI) {
        startMITest();
        return;
    }
    
    // All done! Update Profile
    window.cargarResultadosHolisticos();
};

function startKolbTest() {
    kolbResponses = {};
    let html = `<div style="text-align:left; font-size:0.9rem; max-height:60vh; overflow-y:auto; padding-right:10px;">
        <p style="color:var(--text-medium); margin-bottom:15px;">Jerarquiza cada fila del 1 al 4, siendo <b>4</b> lo que mejor te describe y <b>1</b> lo que menos.</p>
        <table style="width:100%; border-collapse:collapse; background:var(--bg-main);">
            <tr style="background:var(--bg-surface-hover); border-bottom:1px solid var(--border-color);">
                <th style="padding:10px; text-align:left;">Contexto</th>
                <th style="padding:10px; text-align:center; color:#ef4444;">A (EC)</th>
                <th style="padding:10px; text-align:center; color:#3b82f6;">B (OR)</th>
                <th style="padding:10px; text-align:center; color:#eab308;">C (CA)</th>
                <th style="padding:10px; text-align:center; color:#10b981;">D (EA)</th>
            </tr>`;
            
    KOLB_QUESTIONS.forEach(q => {
        html += `<tr style="border-bottom:1px solid var(--border-color);">
            <td style="padding:15px 10px; font-weight:bold; color:var(--text-high);">${q.id}. ${q.title}</td>
            <td style="padding:10px;"><div style="font-size:0.75rem; color:var(--text-medium); margin-bottom:5px;">${q.a}</div>
                <input type="number" min="1" max="4" class="kolb-input" data-q="${q.id}" data-opt="a" style="width:100%; padding:5px; background:var(--bg-surface); color:var(--text-high); border:1px solid var(--border-color); border-radius:5px;">
            </td>
            <td style="padding:10px;"><div style="font-size:0.75rem; color:var(--text-medium); margin-bottom:5px;">${q.b}</div>
                <input type="number" min="1" max="4" class="kolb-input" data-q="${q.id}" data-opt="b" style="width:100%; padding:5px; background:var(--bg-surface); color:var(--text-high); border:1px solid var(--border-color); border-radius:5px;">
            </td>
            <td style="padding:10px;"><div style="font-size:0.75rem; color:var(--text-medium); margin-bottom:5px;">${q.c}</div>
                <input type="number" min="1" max="4" class="kolb-input" data-q="${q.id}" data-opt="c" style="width:100%; padding:5px; background:var(--bg-surface); color:var(--text-high); border:1px solid var(--border-color); border-radius:5px;">
            </td>
            <td style="padding:10px;"><div style="font-size:0.75rem; color:var(--text-medium); margin-bottom:5px;">${q.d}</div>
                <input type="number" min="1" max="4" class="kolb-input" data-q="${q.id}" data-opt="d" style="width:100%; padding:5px; background:var(--bg-surface); color:var(--text-high); border:1px solid var(--border-color); border-radius:5px;">
            </td>
        </tr>`;
    });
    
    html += `</table></div>`;
    
    Swal.fire({
        title: 'Fase 2: Test de Kolb',
        html: html,
        width: '900px',
        showCancelButton: true,
        confirmButtonText: 'Guardar y Continuar',
        cancelButtonText: 'Cancelar',
        background: 'var(--bg-surface)',
        color: 'var(--text-high)',
        preConfirm: () => {
            const inputs = document.querySelectorAll('.kolb-input');
            let data = {};
            let error = false;
            
            KOLB_QUESTIONS.forEach(q => { data[q.id] = {a:0, b:0, c:0, d:0}; });
            
            inputs.forEach(inp => {
                const qId = inp.getAttribute('data-q');
                const opt = inp.getAttribute('data-opt');
                const val = parseInt(inp.value);
                if(isNaN(val) || val < 1 || val > 4) error = true;
                data[qId][opt] = val;
            });
            
            if(error) {
                Swal.showValidationMessage('Todas las casillas deben tener un número entre 1 y 4.');
                return false;
            }
            
            // Check uniqueness per row
            for(let id in data) {
                const vals = Object.values(data[id]);
                const unique = new Set(vals);
                if(unique.size !== 4) {
                    Swal.showValidationMessage(`En la pregunta ${id} repetiste números. Deben ser únicos (1, 2, 3, 4).`);
                    return false;
                }
            }
            
            return data;
        }
    }).then((result) => {
        if(result.isConfirmed) {
            calculateKolb(result.value);
        }
    });
}

function calculateKolb(data) {
    let scores = { ec: 0, or: 0, ca: 0, ea: 0 };
    for(let id in data) {
        scores.ec += data[id].a;
        scores.or += data[id].b;
        scores.ca += data[id].c;
        scores.ea += data[id].d;
    }
    
    // Determinar cuadrante
    // Eje vertical: Conceptualización Abstracta (CA) - Experiencia Concreta (EC) -> Si CA > EC -> Abstracto (Abajo), si EC > CA -> Concreto (Arriba)
    // Eje horizontal: Experimentación Activa (EA) - Observación Reflexiva (OR) -> Si EA > OR -> Activo (Izquierda), si OR > EA -> Reflexivo (Derecha)
    
    // Acomodador: EC + EA
    // Divergente: EC + OR
    // Convergente: CA + EA
    // Asimilador: CA + OR
    
    let isConcrete = scores.ec >= scores.ca;
    let isActive = scores.ea >= scores.or;
    
    let dominante = "";
    if (isConcrete && isActive) dominante = "acomodador";
    else if (isConcrete && !isActive) dominante = "divergente";
    else if (!isConcrete && isActive) dominante = "convergente";
    else dominante = "asimilador";
    
    const kolbResult = { scores, dominante };
    localStorage.setItem('electro10_kolb', JSON.stringify(kolbResult));
    
    Swal.fire('¡Kolb Guardado!', 'Pasemos a la última fase: Inteligencias Múltiples.', 'success').then(() => {
        window.iniciarDiagnosticoHub(); // Launch next phase
    });
}

function startMITest() {
    miResponses = new Array(35).fill(null);
    let html = `<div style="text-align:left; font-size:0.9rem; max-height:60vh; overflow-y:auto; padding-right:10px;">
        <p style="color:var(--text-medium); margin-bottom:15px;">Responde Verdadero (V) o Falso (F) a las siguientes afirmaciones sobre ti.</p>
        <div style="display:flex; flex-direction:column; gap:10px;">`;
        
    MI_QUESTIONS.forEach((q, idx) => {
        html += `
        <div style="background:var(--bg-main); padding:12px; border-radius:8px; border:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
            <div style="flex:1; padding-right:15px; color:var(--text-high);">${idx+1}. ${q}</div>
            <div style="display:flex; gap:10px; flex-shrink:0;">
                <label style="cursor:pointer;"><input type="radio" name="mi_q_${idx}" value="1"> V</label>
                <label style="cursor:pointer;"><input type="radio" name="mi_q_${idx}" value="0"> F</label>
            </div>
        </div>`;
    });
    
    html += `</div></div>`;
    
    Swal.fire({
        title: 'Fase 3: Inteligencias Múltiples',
        html: html,
        width: '800px',
        showCancelButton: true,
        confirmButtonText: 'Finalizar Diagnóstico',
        cancelButtonText: 'Cancelar',
        background: 'var(--bg-surface)',
        color: 'var(--text-high)',
        preConfirm: () => {
            let error = false;
            let data = [];
            for(let i=0; i<35; i++) {
                const selected = document.querySelector(`input[name="mi_q_${i}"]:checked`);
                if(!selected) {
                    error = true;
                    break;
                }
                data.push(parseInt(selected.value));
            }
            if(error) {
                Swal.showValidationMessage('Por favor responde a todas las afirmaciones.');
                return false;
            }
            return data;
        }
    }).then((result) => {
        if(result.isConfirmed) {
            calculateMI(result.value);
        }
    });
}

function calculateMI(data) {
    let scores = {
        verbal: 0, logica: 0, visual: 0, cinestesica: 0, musical: 0, intrapersonal: 0, interpersonal: 0
    };
    
    // Note: data is 0-indexed, MI_KEYS uses 1-indexed question numbers
    for (const [intelType, qNumbers] of Object.entries(MI_KEYS)) {
        qNumbers.forEach(qNum => {
            scores[intelType] += data[qNum - 1];
        });
    }
    
    // Find top intelligences (can be tie)
    let maxScore = Math.max(...Object.values(scores));
    let topMI = Object.keys(scores).filter(k => scores[k] === maxScore);
    
    const miResult = { scores, topMI };
    localStorage.setItem('electro10_mi', JSON.stringify(miResult));
    
    guardarDiagnosticoNube().then(() => {
        Swal.fire('¡Diagnóstico Integral Completado!', 'Hemos generado tu mapa cognitivo.', 'success').then(() => {
            window.cargarResultadosHolisticos();
        });
    });
}

async function guardarDiagnosticoNube() {
    if (!window.currentUserUid) return;
    
    const chaea = JSON.parse(localStorage.getItem('electro10_chaea'));
    const kolb = JSON.parse(localStorage.getItem('electro10_kolb'));
    const mi = JSON.parse(localStorage.getItem('electro10_mi'));
    
    try {
        await setDoc(doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'diagnostics', 'data'), {
            chaea, kolb, mi,
            timestamp: new Date().getTime()
        }, { merge: true });
    } catch (e) {
        console.error("Error saving diagnostics to cloud:", e);
    }
}

// Hooked into profile.js or called explicitly
window.cargarResultadosHolisticos = async function() {
    const statusEl = document.getElementById('profile-diagnostics-status');
    const dataEl = document.getElementById('profile-diagnostics-data');
    if (!statusEl || !dataEl) return;
    
    let chaea = JSON.parse(localStorage.getItem('electro10_chaea'));
    let kolb = JSON.parse(localStorage.getItem('electro10_kolb'));
    let mi = JSON.parse(localStorage.getItem('electro10_mi'));
    
    // Attempt cloud fetch if missing
    if(!chaea || !kolb || !mi) {
        if(window.currentUserUid) {
            try {
                const docSnap = await getDoc(doc(db, 'artifacts', APP_ID, 'users', window.currentUserUid, 'diagnostics', 'data'));
                if(docSnap.exists()) {
                    const data = docSnap.data();
                    if(data.chaea) { chaea = data.chaea; localStorage.setItem('electro10_chaea', JSON.stringify(chaea)); }
                    if(data.kolb) { kolb = data.kolb; localStorage.setItem('electro10_kolb', JSON.stringify(kolb)); }
                    if(data.mi) { mi = data.mi; localStorage.setItem('electro10_mi', JSON.stringify(mi)); }
                }
            } catch(e){}
        }
    }
    
    if (chaea && kolb && mi) {
        statusEl.style.display = 'none';
        dataEl.style.display = 'flex';
        
        // 1. CHAEA Chart
        document.getElementById('profile-chaea-dom').innerText = chaea.dominante.toUpperCase();
        if (window.profileChaeaChart) window.profileChaeaChart.destroy();
        window.profileChaeaChart = new Chart(document.getElementById('profile-chaea-chart').getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Activo', 'Reflexivo', 'Teórico', 'Pragmático'],
                datasets: [{
                    data: [chaea.scores.Activo, chaea.scores.Reflexivo, chaea.scores.Teórico, chaea.scores.Pragmático],
                    backgroundColor: 'rgba(168, 85, 247, 0.2)', borderColor: '#a855f7', pointBackgroundColor: '#a855f7'
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { r: { ticks: { display: false } } }, plugins: { legend: { display: false } } }
        });

        // 2. KOLB Chart (Scatter Plot - EA vs OR, CA vs EC)
        // For standard Kolb, Y axis is CA - EC (Abstract to Concrete). Actually standard is Y = AC - CE (Abstract down, Concrete up, but usually AC is positive Y, CE is negative Y)
        // Let's just use simple bar or radar for Kolb since it's 4 dimensions, similar to CHAEA.
        document.getElementById('profile-kolb-dom').innerText = kolb.dominante.toUpperCase();
        if (window.profileKolbChart) window.profileKolbChart.destroy();
        window.profileKolbChart = new Chart(document.getElementById('profile-kolb-chart').getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['E. Concreta', 'O. Reflexiva', 'C. Abstracta', 'E. Activa'],
                datasets: [{
                    data: [kolb.scores.ec, kolb.scores.or, kolb.scores.ca, kolb.scores.ea],
                    backgroundColor: 'rgba(59, 130, 246, 0.2)', borderColor: '#3b82f6', pointBackgroundColor: '#3b82f6'
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { r: { ticks: { display: false } } }, plugins: { legend: { display: false } } }
        });

        // 3. MI Chart (Polar Area or Bar)
        document.getElementById('profile-mi-dom').innerText = mi.topMI.join(", ").toUpperCase();
        if (window.profileMiChart) window.profileMiChart.destroy();
        window.profileMiChart = new Chart(document.getElementById('profile-mi-chart').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Verbal', 'Lógica', 'Visual', 'Cinestésica', 'Musical', 'Intraper', 'Interper'],
                datasets: [{
                    data: [mi.scores.verbal, mi.scores.logica, mi.scores.visual, mi.scores.cinestesica, mi.scores.musical, mi.scores.intrapersonal, mi.scores.interpersonal],
                    backgroundColor: ['#f43f5e', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'],
                    borderRadius: 4
                }]
            },
            options: { 
                responsive: true, maintainAspectRatio: false, 
                scales: { y: { display: false }, x: { ticks: { font: {size: 8}, color: 'gray' } } }, 
                plugins: { legend: { display: false } } 
            }
        });

        // 4. Inferencia Científica
        const analysis = analyzeHolisticProfile(chaea.dominante.toLowerCase(), kolb.dominante.toLowerCase(), mi.topMI);
        const insightsContainer = document.getElementById('profile-diagnostic-insights');
        let insightsHtml = ``;
        
        analysis.warnings.forEach(w => {
            insightsHtml += `<div style="padding:10px; background:rgba(245, 158, 11, 0.1); border-left:4px solid #f59e0b; margin-bottom:5px;">${w}</div>`;
        });
        analysis.consejos.forEach(c => {
            insightsHtml += `<div style="padding:10px; background:rgba(16, 185, 129, 0.1); border-left:4px solid #10b981; margin-bottom:5px;"><b>Recomendación de Estudio:</b> ${c}</div>`;
        });
        
        insightsContainer.innerHTML = insightsHtml;
        
    } else {
        statusEl.style.display = 'block';
        dataEl.style.display = 'none';
    }
}
