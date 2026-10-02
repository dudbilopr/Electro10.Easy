// modulos/modulo6.js — Capacitancia y Dieléctricos
// Asistente IA para deducciones analíticas de capacitancia, arreglos serie/paralelo y energía
export const modulo6 = {
    "titulo": "Módulo 6: Capacitancia y Dieléctricos",
    "color": "#0284c7",
    "icono": "battery_charging_full",
    "descripcionCorta": "Almacenamiento de carga y energía electrostática, polarización en dieléctricos y circuitos capacitivos",
    "subtemas": [
        "Definición formal de capacitancia y geometría de conductores aislados",
        "Capacitor de placas plano-paralelas: derivación analítica de C = ε₀ A / d",
        "Capacitores cilíndricos y esféricos: cálculo riguroso del potencial y capacitancia",
        "Topología de redes de capacitores: arreglos en serie, paralelo y combinaciones mixtas",
        "Energía potencial electrostática y densidad de energía volumétrica u = ½ ε₀ E²",
        "Materiales dieléctricos: constante dieléctrica κ, polarización inducida y ley de Gauss con dieléctricos",
        "Ruptura dieléctrica, rigidez dieléctrica y límites de operación en ingeniería"
    ],
    "lecciones": [
        {
            "id": "m6-l1",
            "tipo": "multivideo",
            "recurso": "z-fv_QDESSc|Sw6vtplA_68|enQ8QuUBYNE|6w51PrhXy04|b_nBNDkJUJE|g2YK35fR7yE|XHAfc4EbH1Q|a7jaxpYtZAQ|DPCcImv1Xko|SizL_9HP6nY|gJasVOhHbao",
            "titulo": "1. Teoría y Deducción: Capacitancia y Dieléctricos",
            "descripcion": "Fundamentación analítica de la capacitancia, análisis de campo interior, efecto de los dieléctricos y cálculo de energía.",
            "xp": 10
        },
        {
            "id": "m6-l2",
            "tipo": "multipresentacion",
            "recurso": "./player.html?clase=5|./player.html?clase=5",
            "titulo": "2. Diapositivas de Apoyo Magistral (2 Partes)",
            "descripcion": "Material visual utilizado en la clase magistral. Incluye demostraciones matemáticas de arreglos en serie y paralelo.",
            "xp": 15
        },
        {
            "id": "m6-g1",
            "tipo": "grupo",
            "titulo": "3. Laboratorio Virtual (Simuladores)",
            "sublecciones": [
                {
                    "id": "m6-l3",
                    "tipo": "simulador",
                    "recurso": "https://phet.colorado.edu/sims/html/capacitor-lab-basics/latest/capacitor-lab-basics_es.html",
                    "titulo": "3.1 Laboratorio de Capacitores (PhET)",
                    "descripcion": "Simulador interactivo de la Universidad de Colorado para visualizar el campo eléctrico, la carga en las placas y la energía almacenada.",
                    "xp": 20
                },
                {
                    "id": "m6-l4",
                    "tipo": "simulador",
                    "recurso": "https://www.falstad.com/circuit/e-cap.html",
                    "titulo": "3.2 Falstad: Dinámica de Carga y Descarga RC",
                    "descripcion": "Osciloscopio en tiempo real para analizar la curva exponencial de carga y descarga en circuitos RC.",
                    "xp": 20
                },
                {
                    "id": "m6-l5",
                    "tipo": "simulador",
                    "recurso": "https://www.geogebra.org/m/jztkf22s",
                    "titulo": "3.3 GeoGebra: Polarización en Dieléctricos",
                    "descripcion": "Modelo matemático interactivo que muestra cómo varía la capacitancia al introducir diferentes materiales dieléctricos.",
                    "xp": 20
                },
                {
                    "id": "m6-l6",
                    "tipo": "simulador",
                    "recurso": "simuladores/Capacitance.html",
                    "titulo": "3.4 Calculadora de Redes Capacitivas Pro",
                    "descripcion": "Módulo analítico nativo de la plataforma para calcular capacitancia equivalente, carga y energía en topologías complejas.",
                    "xp": 20
                }
            ]
        },
        {
            "id": "m6-j1",
            "tipo": "juego",
            "recurso": "juegos/Juego_5.html",
            "titulo": "4. Physics Quest — Capacitancia",
            "descripcion": "Diseña el capacitor óptimo para almacenar energía bajo restricciones de campo dieléctrico. ¡5 retos de física!",
            "xp": 25,
            "logro": { "id": "logro_m6", "nombre": "Ingeniero de Capacitores", "icono": "battery_charging_full" }
        },
        {
            "id": "m6-l7",
            "tipo": "ejercicio",
            "recurso": "talleres/Taller_6_Capacitancia.html",
            "titulo": "5. Taller Práctico No. 6 — Capacitancia y Dieléctricos",
            "descripcion": "Guía de problemas de nivel universitario enfocada en el cálculo de cargas, potenciales en redes mixtas y energía electrostática.",
            "xp": 30
        },
        {
            "id": "m6-q1",
            "tipo": "quiz",
            "recurso": "Examen/Quiz_Adaptativo_5.html",
            "titulo": "6. Quiz Adaptativo — Módulo 6",
            "descripcion": "Evaluación cognitiva progresiva en 3 niveles: relaciones fundamentales Q=CV, circuitos mixtos y balance de energía.",
            "xp": 40
        },
        {
            "id": "m6-eval",
            "tipo": "quiz",
            "recurso": "Examen/Cuestionario_6_Capacitancia.html",
            "titulo": "7. Evaluación Sumativa — Capacitancia y Dieléctricos",
            "descripcion": "Cuestionario oficial de acreditación del Módulo 6 con problemas analíticos y conceptuales.",
            "xp": 50
        },
        {
            "id": "m6-nb1",
            "tipo": "notebooklm",
            "llmLink": "https://notebooklm.google.com/notebook/37622815-4b54-4808-b770-37464cb05719",
            "titulo": "8. Asistente IA (NotebookLM) — Capacitancia",
            "descripcion": "Consulta dudas analíticas, métodos de reducción de redes capacitivas y comportamiento microscópico de dipolos dieléctricos.",
            "xp": 10
        },
        {
            "id": "m6-e1",
            "tipo": "referencias",
            "titulo": "9. Repositorio Documental y Referencias",
            "descripcion": "Directorio de recursos externos, apuntes universitarios y textos de referencia sobre física de capacitores y dieléctricos.",
            "xp": 10,
            "secciones": [
                {
                    "tituloSeccion": "Libros Universitarios de Referencia",
                    "links": [
                        { "url": "https://openstax.org/books/university-physics-volume-2/pages/8-1-capacitors-and-capacitance", "titulo": "OpenStax: Capacitance & Dielectrics — Cap. 8", "descripcion": "Libro de texto universitario de acceso abierto. Desarrollo formal de la capacitancia con ejemplos prácticos." },
                        { "url": "https://www.amazon.com/dp/0321971174", "titulo": "Griffiths: Introduction to Electrodynamics — Cap. 4", "descripcion": "Campos electrostáticos en la materia y polarización dieléctrica." },
                        { "url": "http://hyperphysics.phy-astr.gsu.edu/hbasees/electric/capac.html", "titulo": "HyperPhysics: Capacitancia (GSU)", "descripcion": "Mapas conceptuales altamente estructurados y herramientas de cálculo de la Georgia State University." }
                    ]
                },
                {
                    "tituloSeccion": "OpenCourseWare y Clases Magistrales",
                    "links": [
                        { "url": "https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2007/pages/readings/", "titulo": "MIT OCW: Physics II (8.02) - Lecturas Capacitancia", "descripcion": "Notas del curso del MIT con análisis electromagnético profundo." },
                        { "url": "https://es.khanacademy.org/science/physics/circuits-topic/circuits-with-capacitors/v/capacitors-and-capacitance", "titulo": "Khan Academy: Circuitos con Capacitores", "descripcion": "Módulo estructurado en video que explica intuitivamente el funcionamiento de los condensadores." }
                    ]
                },
                {
                    "tituloSeccion": "Herramientas de Simulación y Análisis",
                    "links": [
                        { "url": "https://www.circuitlab.com/editor/", "titulo": "CircuitLab: Simulador Esquemático", "descripcion": "Diseña arreglos de capacitores en el navegador y simula la respuesta transitoria del voltaje." },
                        { "url": "https://phet.colorado.edu/es/simulations/capacitor-lab-basics", "titulo": "PhET: Laboratorio de Capacitancia", "descripcion": "Explora placas paralelas y constante dieléctrica en tiempo real." }
                    ]
                }
            ]
        }
    ]
};
