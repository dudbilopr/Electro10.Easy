// brain.js
// Motor del "Cerebro del Estudiante" (Grafo Visual, Herramientas, Juegos y Cámara IA)

// ── Datos Estáticos del Cerebro ──────────────────────────────
const cerebroDatos = {
    glosario: [
        { termino: "Carga Eléctrica", definicion: "Propiedad física intrínseca de algunas partículas subatómicas que se manifiesta mediante fuerzas de atracción y repulsión." },
        { termino: "Campo Eléctrico", definicion: "Región del espacio donde una carga eléctrica experimenta una fuerza eléctrica." },
        { termino: "Ley de Coulomb", definicion: "Establece que la fuerza eléctrica entre dos cargas puntuales es directamente proporcional al producto de las cargas e inversamente proporcional al cuadrado de la distancia que las separa." },
        { termino: "Potencial Eléctrico", definicion: "Energía potencial eléctrica por unidad de carga en un punto de un campo eléctrico." },
        { termino: "Capacitancia", definicion: "Capacidad de un componente o circuito para recoger y almacenar energía en forma de carga eléctrica." }
    ],
    formulas: [
        { nombre: "Fuerza de Coulomb", eq: "$$ F = k_e \\frac{|q_1 q_2|}{r^2} $$" },
        { nombre: "Campo Eléctrico (Puntual)", eq: "$$ E = k_e \\frac{|q|}{r^2} $$" },
        { nombre: "Potencial Eléctrico", eq: "$$ V = k_e \\frac{q}{r} $$" },
        { nombre: "Energía Potencial Eléctrica", eq: "$$ U = k_e \\frac{q_1 q_2}{r} $$" },
        { nombre: "Ley de Ohm", eq: "$$ V = I \\cdot R $$" }
    ],
    constantes: [
        { simbolo: "e", valor: "1.602 × 10⁻¹⁹ C", nombre: "Carga Elemental" },
        { simbolo: "k_e", valor: "8.987 × 10⁹ N·m²/C²", nombre: "Constante de Coulomb" },
        { simbolo: "ε₀", valor: "8.854 × 10⁻¹² F/m", nombre: "Permitividad del Vacío" },
        { simbolo: "m_e", valor: "9.109 × 10⁻³¹ kg", nombre: "Masa del Electrón" },
        { simbolo: "m_p", valor: "1.672 × 10⁻²⁷ kg", nombre: "Masa del Protón" }
    ],
    cientificos: [
        { nombre: "Charles-Augustin de Coulomb", epoca: "1736 - 1806", aporte: "Formuló la ley que describe la fuerza entre cargas eléctricas (Ley de Coulomb). Inventó la balanza de torsión." },
        { nombre: "Michael Faraday", epoca: "1791 - 1867", aporte: "Descubrió la inducción electromagnética, el diamagnetismo y la electrólisis. Introdujo el concepto de 'Líneas de campo'." },
        { nombre: "James Clerk Maxwell", epoca: "1831 - 1879", aporte: "Unificó la electricidad y el magnetismo en su famosa teoría electromagnética (Ecuaciones de Maxwell), demostrando que la luz es una onda electromagnética." },
        { nombre: "Alessandro Volta", epoca: "1745 - 1827", aporte: "Inventó la pila voltaica, la primera batería química, proporcionando la primera fuente continua de corriente eléctrica." },
        { nombre: "Heinrich Hertz", epoca: "1857 - 1894", aporte: "Demostró experimentalmente la existencia de las ondas electromagnéticas teorizadas por Maxwell." }
    ],
    experimentos: [
        { nombre: "Balanza de Torsión (Coulomb)", año: "1785", descripcion: "Midió con precisión la fuerza de repulsión y atracción electrostática entre cargas puntuales, estableciendo la dependencia de la inversa del cuadrado de la distancia." },
        { nombre: "Experimento de la Cometa (Franklin)", año: "1752", descripcion: "Demostró que los rayos son descargas eléctricas al volar una cometa durante una tormenta, recolectando carga en una botella de Leyden." },
        { nombre: "Descubrimiento de la Inducción (Faraday)", año: "1831", descripcion: "Usó un anillo de hierro y dos bobinas. Al encender/apagar la batería de un lado, observó una corriente transitoria en el otro, probando que un campo magnético cambiante induce un campo eléctrico." },
        { nombre: "El Experimento de Oersted", año: "1820", descripcion: "Hans Christian Ørsted notó que la aguja de una brújula se desviaba cerca de un cable con corriente, descubriendo por primera vez la relación entre electricidad y magnetismo." },
        { nombre: "Gotas de Aceite de Millikan", año: "1909", descripcion: "Robert Millikan y Harvey Fletcher midieron la carga elemental (la carga del electrón) balanceando gotas de aceite cargadas entre campos eléctricos y gravitacionales." }
    ]
};

// ── Variables Globales ───────────────────────────────────────
let network = null;
let cameraStream = null;

// ── Grafo Visual (Vis-Network) ───────────────────────────────
window.initBrainGraph = function() {
    renderGlosario();
    renderFormulas();
    renderConstantes();
    renderHistoria();

    const container = document.getElementById('vis-network-container');
    if (!container) return;

    // Solo inicializar una vez
    if (network !== null) {
        network.fit(); // Ajustar vista
        return;
    }

    // ── Bóveda Obsidian (Exportación) ─────────────────────────
window.descargarObsidian = async function() {
    if (typeof JSZip === 'undefined') {
        alert("La librería para generar ZIP no ha cargado. Reintenta en unos segundos.");
        return;
    }
    
    const zip = new JSZip();
    const vault = zip.folder("Cerebro_Electro10");
    
    // 1. Crear Notas de Lecciones
    const notasFolder = vault.folder("Apuntes_Lecciones");
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("notas_")) {
            const leccionId = key.replace("notas_", "");
            const notaContent = localStorage.getItem(key);
            // El formato Markdown usa tags para conectarlo
            const mdContent = `---
tags: [leccion, electromagnetismo, ${leccionId}]
date: ${new Date().toISOString().split('T')[0]}
---
# Apuntes: ${leccionId}

${notaContent}

## Enlaces Relacionados
- [[Glosario]]
- [[Formulario Master]]
`;
            notasFolder.file(`${leccionId}.md`, mdContent);
        }
    }
    
    // 2. Glosario Maestro
    let glosarioMd = `# Glosario de Electromagnetismo\n\n`;
    cerebroDatos.glosario.forEach(item => {
        glosarioMd += `## ${item.termino}\n${item.definicion}\n\n`;
    });
    vault.file("Glosario.md", glosarioMd);

    // 3. Fórmulas Maestro
    let formulasMd = `# Fórmulas y Ecuaciones\n\n`;
    cerebroDatos.formulas.forEach(item => {
        formulasMd += `### ${item.nombre}\n${item.eq}\n\n`;
    });
    vault.file("Formulario Master.md", formulasMd);

    // 4. Historia y Experimentos
    let historiaMd = `# Pioneros del Electromagnetismo\n\n`;
    cerebroDatos.cientificos.forEach(c => {
        historiaMd += `## ${c.nombre} (${c.epoca})\n${c.aporte}\n\n`;
    });
    historiaMd += `# Experimentos Icónicos\n\n`;
    cerebroDatos.experimentos.forEach(e => {
        historiaMd += `## ${e.nombre} (${e.año})\n${e.descripcion}\n\n`;
    });
    vault.file("Historia y Experimentos.md", historiaMd);

    // 5. Index (Home)
    const homeMd = `# Bóveda Electro10: ${new Date().getFullYear()}
Bienvenido a tu segundo cerebro de física.
- Revisa tus [[Glosario]]
- Revisa tu [[Formulario Master]]
- Conoce la [[Historia y Experimentos]]

Esta bóveda fue autogenerada por tu **Tutor IA**.`;
    vault.file("Home.md", homeMd);

    // 6. Configuración de Obsidian (.obsidian folder)
    const obsFolder = vault.folder(".obsidian");
    const appearanceJson = { "cssTheme": "", "theme": "obsidian" };
    obsFolder.file("appearance.json", JSON.stringify(appearanceJson, null, 2));
    const graphJson = {
        "collapse-filter": false, "search": "", "showArrow": false, "textFadeMultiplier": 0, "nodeSizeMultiplier": 1.5,
        "lineSizeMultiplier": 1.5, "collapse-forces": false, "centerStrength": 0.518713248972782,
        "repelStrength": 10, "linkStrength": 1, "linkDistance": 250, "scale": 1, "close": false
    };
    obsFolder.file("graph.json", JSON.stringify(graphJson, null, 2));

    // Generar y descargar
    try {
        const content = await zip.generateAsync({ type: "blob" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(content);
        a.download = "Boveda_Obsidian_Electro10.zip";
        a.click();
        URL.revokeObjectURL(a.href);
    } catch (e) {
        console.error(e);
        alert("Hubo un error al generar la bóveda.");
    }
};

    // Nodos de Electromagnetismo (Inspirados en el currículo)
    const nodes = new vis.DataSet([
        { id: 1, label: 'Electromagnetismo', group: 'core', value: 30 },
        { id: 2, label: 'Carga Eléctrica', group: 'done', value: 20 },
        { id: 3, label: 'Ley de Coulomb', group: 'done', value: 20 },
        { id: 4, label: 'Campo Eléctrico', group: 'doing', value: 25 },
        { id: 5, label: 'Potencial Eléctrico', group: 'todo', value: 15 },
        { id: 6, label: 'Capacitancia', group: 'todo', value: 15 },
        { id: 7, label: 'Corriente y Resistencia', group: 'todo', value: 15 },
        { id: 8, label: 'Circuitos DC', group: 'todo', value: 15 },
        { id: 9, label: 'Campo Magnético', group: 'todo', value: 20 }
    ]);

    const edges = new vis.DataSet([
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
        { from: 4, to: 5 },
        { from: 5, to: 6 },
        { from: 1, to: 7 },
        { from: 7, to: 8 },
        { from: 6, to: 8 },
        { from: 1, to: 9 },
        { from: 4, to: 9 } // Relación Maxwell
    ]);

    const data = { nodes: nodes, edges: edges };

    const options = {
        nodes: {
            shape: 'dot',
            font: { color: '#ffffff', face: 'Outfit', strokeWidth: 0 },
            borderWidth: 2,
            shadow: true
        },
        edges: {
            width: 2,
            color: { color: 'rgba(255,255,255,0.2)', highlight: '#a855f7' },
            smooth: { type: 'continuous' }
        },
        groups: {
            core: { color: { background: '#a855f7', border: '#d8b4fe' } },
            done: { color: { background: '#10b981', border: '#6ee7b7' } },
            doing: { color: { background: '#3b82f6', border: '#93c5fd' } },
            todo: { color: { background: '#4b5563', border: '#9ca3af' }, font: { color: '#9ca3af' } }
        },
        physics: {
            forceAtlas2Based: { gravitationalConstant: -50, centralGravity: 0.01, springLength: 100, springConstant: 0.08 },
            maxVelocity: 50,
            solver: 'forceAtlas2Based',
            timestep: 0.35,
            stabilization: { iterations: 150 }
        },
        interaction: {
            hover: true,
            tooltipDelay: 200,
            zoomView: true
        }
    };

    network = new vis.Network(container, data, options);
};

// ── Renderizado de Herramientas ──────────────────────────────
function renderGlosario() {
    const list = document.getElementById('brain-glosario-list');
    if(!list) return;
    list.innerHTML = cerebroDatos.glosario.map(item => `
        <div style="background: var(--bg-main); padding: 10px; border-radius: 8px; border-left: 3px solid var(--accent);">
            <strong style="color: var(--text-high);">${item.termino}</strong>
            <p style="margin: 5px 0 0 0; font-size: 0.85rem; color: var(--text-medium);">${item.definicion}</p>
        </div>
    `).join('');
}

function renderFormulas() {
    const list = document.getElementById('brain-formulas-list');
    if(!list) return;
    list.innerHTML = cerebroDatos.formulas.map(item => `
        <div style="background: var(--bg-main); padding: 15px 10px; border-radius: 8px; text-align: center; border: 1px solid var(--border-color);">
            <div style="font-size: 0.85rem; color: var(--text-medium); margin-bottom: 8px;">${item.nombre}</div>
            <div style="color: var(--text-high); font-size: 1.2rem;">${item.eq}</div>
        </div>
    `).join('');
    
    if (window.renderMathInElement) {
        renderMathInElement(list, { delimiters: [{left: '$$', right: '$$', display: true}], throwOnError: false });
    }
}

function renderConstantes() {
    const list = document.getElementById('brain-constantes-list');
    if(!list) return;
    list.innerHTML = cerebroDatos.constantes.map(item => `
        <div style="background: var(--bg-main); padding: 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; border: 1px solid var(--border-color);">
            <div>
                <strong style="color: var(--accent); font-family: monospace;">${item.simbolo}</strong>
                <div style="font-size: 0.75rem; color: var(--text-medium);">${item.nombre}</div>
            </div>
            <div style="color: var(--text-high); font-family: monospace; font-size: 0.9rem;">${item.valor}</div>
        </div>
    `).join('');
}

function renderHistoria() {
    const listC = document.getElementById('brain-cientificos-list');
    if(listC) {
        listC.innerHTML = cerebroDatos.cientificos.map(item => `
            <div style="background: var(--bg-main); padding: 10px; border-radius: 8px; border-left: 3px solid #3b82f6; margin-bottom:10px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong style="color: var(--text-high);">${item.nombre}</strong>
                    <span class="badge" style="background:#3b82f6; color:#fff; font-size:0.7rem;">${item.epoca}</span>
                </div>
                <p style="margin: 5px 0 0 0; font-size: 0.85rem; color: var(--text-medium);">${item.aporte}</p>
            </div>
        `).join('');
    }

    const listE = document.getElementById('brain-experimentos-list');
    if(listE) {
        listE.innerHTML = cerebroDatos.experimentos.map(item => `
            <div style="background: var(--bg-main); padding: 10px; border-radius: 8px; border-left: 3px solid #10b981; margin-bottom:10px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong style="color: var(--text-high);">${item.nombre}</strong>
                    <span class="badge" style="background:#10b981; color:#fff; font-size:0.7rem;">${item.año}</span>
                </div>
                <p style="margin: 5px 0 0 0; font-size: 0.85rem; color: var(--text-medium);">${item.descripcion}</p>
            </div>
        `).join('');
    }
}

// ── Interfaz de Cámara (Evaluador IA) ────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const btnStart = document.getElementById('btn-start-camera');
    const btnTake = document.getElementById('btn-take-photo');
    const video = document.getElementById('ai-camera-video');
    const canvas = document.getElementById('ai-camera-canvas');
    const feedbackBox = document.getElementById('ai-camera-feedback');

    if(!btnStart) return;

    btnStart.addEventListener('click', async () => {
        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            video.srcObject = cameraStream;
            btnTake.disabled = false;
            btnStart.style.display = 'none';
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("No se pudo acceder a la cámara. Revisa los permisos.");
        }
    });

    btnTake.addEventListener('click', async () => {
        if (!cameraStream) return;
        
        // Capturar frame al canvas
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convertir a base64 (removiendo el prefijo data:image/jpeg;base64,)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        const base64Image = dataUrl.split(',')[1];
        
        // Pausar video y mostrar loading
        video.pause();
        feedbackBox.innerHTML = `<div style="display:flex; flex-direction:column; align-items:center; gap:10px; padding: 20px;">
            <div class="material-symbols-outlined animate-pulse" style="font-size:40px; color:var(--accent);">smart_toy</div>
            <div>Analizando tu ejercicio... esto puede tomar unos segundos.</div>
        </div>`;

        // Evaluar con IA
        await evaluarConGeminiVision(base64Image, feedbackBox);
        
        // Reanudar cámara para otro intento
        video.play();
    });
});

async function evaluarConGeminiVision(base64Image, feedbackBox) {
    const apiKey = localStorage.getItem('electro10_gemini_key');
    if (!apiKey) {
        feedbackBox.innerHTML = `<span style="color:var(--danger)">⚠️ Error: No se encontró la API Key. Configúrala en el Asistente IA primero.</span>`;
        return;
    }

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
        const systemPrompt = `Eres un Profesor Experto en Electromagnetismo y Física. 
El estudiante te está enviando una foto de su cuaderno con un ejercicio resuelto o un problema.
Tu tarea es:
1. Leer y transcribir mentalmente el contenido.
2. Identificar si el procedimiento matemático y los conceptos físicos son correctos.
3. Si hay errores, indícalos de manera constructiva y pedagógica, SIN darle la respuesta final (guíalo al descubrimiento).
4. Usa lenguaje motivador. Puedes usar markdown y KaTeX (bloques $$ $$) para las fórmulas.
Estructura tu respuesta con un saludo, un análisis paso a paso y una conclusión/pista.`;

        const payload = {
            contents: [
                {
                    parts: [
                        { text: systemPrompt },
                        { inlineData: { mimeType: "image/jpeg", data: base64Image } }
                    ]
                }
            ]
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error("Fallo en la comunicación con la API de Gemini.");

        const data = await response.json();
        const replyText = data.candidates[0].content.parts[0].text;
        
        // Parsear a HTML básico y renderizar
        feedbackBox.innerHTML = marked.parse ? marked.parse(replyText) : replyText.replace(/\n/g, '<br>');
        
        if (window.renderMathInElement) {
            renderMathInElement(feedbackBox, { delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}], throwOnError: false });
        }

    } catch (e) {
        console.error(e);
        feedbackBox.innerHTML = `<span style="color:var(--danger)">⚠️ Error al analizar la imagen: ${e.message}</span>`;
    }
}

// ── Lógica de Juegos (Asociación Cognitiva) ────────────────────────
let gameDataA = [];
let gameDataB = [];
let selectedA = null;
let selectedB = null;
let gameScore = 0;

window.iniciarJuegoAsociacion = function() {
    document.getElementById('game-panel').style.display = 'block';
    const colA = document.getElementById('game-col-a');
    const colB = document.getElementById('game-col-b');
    const feedback = document.getElementById('game-feedback');
    const scoreEl = document.getElementById('game-score');
    
    colA.innerHTML = '';
    colB.innerHTML = '';
    feedback.innerText = 'Elige un concepto y luego su definición.';
    feedback.style.color = 'var(--text-medium)';
    gameScore = 0;
    scoreEl.innerText = gameScore;
    selectedA = null;
    selectedB = null;

    const pool = [...cerebroDatos.glosario.map(i => ({...i, tipo: 'def'})), ...cerebroDatos.formulas.map(i => ({...i, tipo: 'eq'}))];
    const shuffledPool = pool.sort(() => 0.5 - Math.random()).slice(0, 5);
    
    gameDataA = [];
    gameDataB = [];
    
    shuffledPool.forEach((item, index) => {
        gameDataA.push({ id: index, text: item.termino || item.nombre });
        gameDataB.push({ id: index, text: item.definicion || item.eq, isMath: item.tipo === 'eq' });
    });
    
    gameDataB.sort(() => 0.5 - Math.random());
    
    gameDataA.forEach(item => {
        const div = document.createElement('div');
        div.className = 'game-card-a';
        div.style.cssText = 'padding: 15px; background: var(--bg-surface-light); border: 2px solid var(--border-color); border-radius: 8px; cursor: pointer; text-align: center; font-weight: bold; transition: all 0.2s;';
        div.innerText = item.text;
        div.onclick = () => selectCardA(div, item.id);
        colA.appendChild(div);
    });
    
    gameDataB.forEach(item => {
        const div = document.createElement('div');
        div.className = 'game-card-b';
        div.style.cssText = 'padding: 15px; background: var(--bg-surface-light); border: 2px solid var(--border-color); border-radius: 8px; cursor: pointer; text-align: center; font-size: 0.9rem; transition: all 0.2s;';
        div.innerText = item.text;
        div.onclick = () => selectCardB(div, item.id);
        colB.appendChild(div);
    });
    
    if (window.renderMathInElement) {
        renderMathInElement(colB, { delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}] });
    }
};

function selectCardA(element, id) {
    if (element.classList.contains('matched')) return;
    document.querySelectorAll('.game-card-a').forEach(el => { if(!el.classList.contains('matched')) el.style.borderColor = 'var(--border-color)'; });
    element.style.borderColor = '#3b82f6';
    selectedA = { element, id };
    checkMatch();
}

function selectCardB(element, id) {
    if (element.classList.contains('matched')) return;
    document.querySelectorAll('.game-card-b').forEach(el => { if(!el.classList.contains('matched')) el.style.borderColor = 'var(--border-color)'; });
    element.style.borderColor = '#10b981';
    selectedB = { element, id };
    checkMatch();
}

function checkMatch() {
    if (selectedA && selectedB) {
        const feedback = document.getElementById('game-feedback');
        const scoreEl = document.getElementById('game-score');
        
        if (selectedA.id === selectedB.id) {
            selectedA.element.classList.add('matched');
            selectedB.element.classList.add('matched');
            selectedA.element.style.background = 'rgba(16, 185, 129, 0.2)';
            selectedA.element.style.borderColor = '#10b981';
            selectedA.element.style.cursor = 'default';
            selectedB.element.style.background = 'rgba(16, 185, 129, 0.2)';
            selectedB.element.style.borderColor = '#10b981';
            selectedB.element.style.cursor = 'default';
            
            gameScore += 20;
            scoreEl.innerText = gameScore;
            feedback.innerText = '¡Correcto! +20 puntos';
            feedback.style.color = '#10b981';
            
            if (gameScore === 100) {
                feedback.innerText = '¡Reto Completado Magistralmente! 🎉';
                feedback.style.color = 'var(--accent)';
                if (window.Swal) window.Swal.fire('¡Felicidades!', 'Has demostrado un excelente dominio conceptual.', 'success');
            }
        } else {
            selectedA.element.style.borderColor = '#ef4444';
            selectedB.element.style.borderColor = '#ef4444';
            gameScore = Math.max(0, gameScore - 5);
            scoreEl.innerText = gameScore;
            feedback.innerText = 'Asociación incorrecta. Intenta de nuevo.';
            feedback.style.color = '#ef4444';
            
            setTimeout(() => {
                if(selectedA && !selectedA.element.classList.contains('matched')) selectedA.element.style.borderColor = 'var(--border-color)';
                if(selectedB && !selectedB.element.classList.contains('matched')) selectedB.element.style.borderColor = 'var(--border-color)';
                selectedA = null;
                selectedB = null;
            }, 800);
            return;
        }
        selectedA = null;
        selectedB = null;
    }
}
