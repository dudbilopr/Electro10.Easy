// modulos/modulo4.js — Electrostática: Distribución de Cargas Continuas
// NOTEBOOKLM: Asistente IA para integración de densidades lineales, superficiales y volumétricas
export const modulo4 = {
    "titulo": "Módulo 4: Electrostática - Distribución de Cargas Continuas",
    "color": "#0284c7",
    "icono": "view_in_ar",
    "descripcionCorta": "Densidades de carga (λ, σ, ρ), integración vectorial diferencial de campo y potencial",
    "subtemas": [
        "Definición de densidades de carga continua: lineal (λ), superficial (σ) y volumétrica (ρ)",
        "Formulación integral general de Coulomb para distribuciones continuas",
        "Campo eléctrico y potencial de segmentos y varillas delgadas de longitud finita e infinita",
        "Campo eléctrico sobre el eje de simetría de anillos cargados y arcos circulares",
        "Campo y potencial de discos cargados y aproximación al plano infinito (σ/2ε₀)",
        "Distribuciones volumétricas: esferas y cilindros coaxiales no conductores",
        "Integración analítica paso a paso y técnicas de cambio de variable trigonométrico"
    ],
    "lecciones": [
        {
            "id": "m4-l1",
            "tipo": "multivideo",
            "recurso": "h57Q1fCwZgA|A9DWg5FSTx0|ZmBfYn9APkg|1cpACIOuFFU|k2dXe2AvoYs|k2w8tZeF0ug|IA5-ydK4ni8|8irn1C12G2U|MjhyOf-6VKQ|YisPzZHHvV0|cbePOxHemJQ|0wZ8s6Byghg|vWWwq63cyY8",
            "titulo": "1. Teoría: Cálculo Integral de Distribuciones de Carga",
            "descripcion": "Deducción matemática completa de las integrales de campo para varillas, anillos, discos y cilindros.",
            "xp": 10
        },
        {
            "id": "m4-l2",
            "tipo": "presentacion",
            "recurso": "./player.html?clase=4",
            "titulo": "2. Diapositivas de Apoyo — Distribuciones Continuas",
            "descripcion": "Desarrollo paso a paso de los diferenciales dq = λ dx, dq = σ dA y dq = ρ dV con animaciones 3D.",
            "xp": 15
        },
        {
            "id": "m4-g1",
            "tipo": "grupo",
            "titulo": "3. Laboratorio Virtual (Simuladores)",
            "sublecciones": [
                {
                    "id": "m4-l3-a",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M2_Varilla.html",
                    "titulo": "3.1 Campo de Varilla Finita e Infinita",
                    "descripcion": "Simulador interactivo con integración numérica y perfil vectorial del campo alrededor de una varilla.",
                    "xp": 20
                },
                {
                    "id": "m4-l3-b",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M2_Arco.html",
                    "titulo": "3.2 Campo en el Centro de un Arco Circular",
                    "descripcion": "Ajusta el ángulo de apertura del arco y la densidad de carga para calcular el campo resultante.",
                    "xp": 20
                },
                {
                    "id": "m4-l3-c",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M2_Disco.html",
                    "titulo": "3.3 Campo Axial de Disco y Plano Infinito",
                    "descripcion": "Comprueba la transición del campo de un disco finito hacia el límite de plano infinito uniforme.",
                    "xp": 20
                },
                {
                    "id": "m4-l3-d",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M2_Tablero_Distribuciones.html",
                    "titulo": "3.4 Tablero Comparativo de Distribuciones",
                    "descripcion": "Panel unificado para comparar anillos, discos y cilindros cargados en tiempo real.",
                    "xp": 20
                },
                {
                    "id": "m4-l3-e",
                    "tipo": "simulador",
                    "recurso": "simuladores/ContinuousDistLab.html",
                    "titulo": "3.5 ContinuousDistLab — Laboratorio Unificado",
                    "descripcion": "Las cuatro geometrías canónicas (varilla, anillo, disco y plano) con validación, telemetría y límites asintóticos.",
                    "xp": 25
                }
            ]
        },
        {
            "id": "m4-l7",
            "tipo": "ejercicio",
            "recurso": "talleres/Taller_4_Distribuciones_de_Carga_Continua.html",
            "titulo": "4. Taller Práctico No. 4 — Cargas Continuas",
            "descripcion": "Guía rigurosa de ejercicios: resolución de integrales impropias, densidad no uniforme y límites asintóticos.",
            "xp": 30
        },
        {
            "id": "m4-desafio",
            "tipo": "desafio",
            "recurso": "desafios/desafio.html?m=4",
            "titulo": "5. Desafío Integral de Maestría (3 Fases)",
            "descripcion": "Ruta formativa unificada: 1. Calentamiento Conceptual ➔ 2. Misión Interactiva Physics Quest ➔ 3. Certificación Cuantitativa.",
            "xp": 100,
            "logro": { "id": "logro_m4", "nombre": "Calculista Diferencial", "icono": "integration_instructions" }
        },
        {
            "id": "m4-nb1",
            "tipo": "notebooklm",
            "llmLink": "https://notebooklm.google.com/notebook/37622815-4b54-4808-b770-37464cb05719",
            "titulo": "6. Asistente IA (NotebookLM) — Cargas Continuas",
            "descripcion": "Asistencia paso a paso para resolver integrales de Coulomb en coordenadas cartesianas y cilíndricas.",
            "xp": 10
        },
        {
            "id": "m4-e1",
            "tipo": "referencias",
            "titulo": "7. Repositorio Documental y Referencias",
            "descripcion": "Fuentes sobre cálculo de campos en distribuciones continuas.",
            "xp": 10,
            "secciones": [
                {
                    "tituloSeccion": "Libros Universitarios de Referencia",
                    "links": [
                        { "url": "https://openstax.org/books/university-physics-volume-2/pages/5-5-calculating-electric-fields-of-charge-distributions", "titulo": "OpenStax: Calculating Electric Fields of Charge Distributions", "descripcion": "Integración analítica de varillas, anillos y discos." },
                        { "url": "https://www.amazon.com/dp/0321971174", "titulo": "Griffiths: Introduction to Electrodynamics — Cap. 2.1.4", "descripcion": "Distribuciones continuas de carga con rigor matemático." }
                    ]
                }
            ]
        }
    ]
};
