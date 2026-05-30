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

    // 4. Index (Home)
    const homeMd = `# Bóveda Electro10: ${new Date().getFullYear()}
Bienvenido a tu segundo cerebro de física.
- Revisa tus [[Glosario]]
- Revisa tu [[Formulario Master]]

Esta bóveda fue autogenerada por tu **Tutor IA**.`;
    vault.file("Home.md", homeMd);

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
