// modulos/modulo5.js — Electrostática: Ley de Gauss
// Asistente IA para deducciones analíticas, superficies gaussianas y cálculo de flujo
export const modulo5 = {
    "titulo": "Módulo 5: Electrostática - Ley de Gauss",
    "color": "#0284c7",
    "icono": "blur_circular",
    "descripcionCorta": "Flujo del campo eléctrico, superficies gaussianas y cálculo de campo en distribuciones con alta simetría",
    "subtemas": [
        "Flujo del campo eléctrico a través de superficies abiertas y cerradas",
        "Definición formal del vector diferencial de área dA y producto escalar",
        "Ley de Gauss en forma integral y concepto de carga neta encerrada",
        "Cálculo de campo en distribuciones con simetría esférica (cascarones y esferas dieléctricas)",
        "Cálculo de campo en distribuciones con simetría cilíndrica (línea y cilindros coaxiales)",
        "Cálculo de campo en distribuciones con simetría planar (láminas infinitas y placas paralelas)",
        "Conductores en equilibrio electrostático, blindaje y Jaula de Faraday"
    ],
    "lecciones": [
        {
            "id": "m5-l1",
            "tipo": "multivideo",
            "recurso": "COGjyZI1PS8|A4qBPrfzZMk|LYmdJmTyFGQ|5XdSmm8VWKQ|38lwnRYEGEc|3aWFJdqM_Rw|jJSq8BFJYt4|z-fv_QDESSc|0iU4RWMHqOg|Sw6vtplA_68|enQ8QuUBYNE|6w51PrhXy04|b_nBNDkJUJE|g2YK35fR7yE|XHAfc4EbH1Q|a7jaxpYtZAQ|DPCcImv1Xko|SizL_9HP6nY|gJasVOhHbao|7ssuVrxocBQ|X27VqqJ6Dwo|-iIUb9Bma0k|dxOxY0et1rE|9HCXZruI0Lk|gJasVOhHbao|TnA2ejc-1es|RmbQiiVV_bc|9t65kr3UVFw|a3VThqncuZQ",
            "titulo": "1. Teoría y Deducción: Ley de Gauss y Flujo Eléctrico",
            "descripcion": "Fundamentación teórica rigurosa del flujo eléctrico, análisis de simetrías ortogonales y formulación integral de Gauss.",
            "xp": 10
        },
        {
            "id": "m5-l2",
            "tipo": "presentacion",
            "recurso": "./player.html?clase=5",
            "titulo": "2. Diapositivas de Apoyo Magistral",
            "descripcion": "Material visual interactivo con deducciones paso a paso para geometrías esféricas, cilíndricas y placas conductoras.",
            "xp": 15
        },
        {
            "id": "m5-g1",
            "tipo": "grupo",
            "titulo": "3. Laboratorio Virtual (Simuladores)",
            "sublecciones": [
                {
                    "id": "m5-l3-a",
                    "tipo": "simulador",
                    "recurso": "simuladores/Tabla_Gauss.html",
                    "titulo": "3.1 Ley de Gauss: Simetría Esférica y Cascarones",
                    "descripcion": "Entorno virtual interactivo para medir el flujo y campo en esferas conductoras y dieléctricas con capas concéntricas.",
                    "xp": 20
                },
                {
                    "id": "m5-l3-b",
                    "tipo": "simulador",
                    "recurso": "simuladores/Flujo_Electrico.html",
                    "titulo": "3.2 Analizador 3D de Flujo Eléctrico",
                    "descripcion": "Visualización tridimensional del vector campo eléctrico y el vector normal del diferencial de superficie.",
                    "xp": 20
                },
                {
                    "id": "m5-l3-c",
                    "tipo": "simulador",
                    "recurso": "https://phys-viz.github.io/Gauss/",
                    "titulo": "3.3 Visualizador de Superficies Gaussianas (Phys-Viz)",
                    "descripcion": "Simulador dinámico para evaluar la integral de superficie cerrada ante distintas geometrías de fuentes.",
                    "xp": 20
                }
            ]
        },
        {
            "id": "m5-j1",
            "tipo": "juego",
            "recurso": "juegos/Juego_3.html",
            "titulo": "4. Physics Quest — Ley de Gauss",
            "descripcion": "Encierra cargas en superficies gaussianas y calcula el flujo neto en geometrías desafiantes. ¡5 misiones vectoriales!",
            "xp": 25,
            "logro": { "id": "logro_m5", "nombre": "Guardián de Gauss", "icono": "blur_circular" }
        },
        {
            "id": "m5-l7",
            "tipo": "ejercicio",
            "recurso": "talleres/Taller_5_1_Flujo_Electrico.html",
            "titulo": "5. Taller Práctico No. 5 — Flujo Eléctrico y Ley de Gauss",
            "descripcion": "Colección de problemas Sears-Zemansky: integración directa de flujo, esferas no uniformes y equilibrio electrostático.",
            "xp": 30
        },
        {
            "id": "m5-q1",
            "tipo": "quiz",
            "recurso": "Examen/Quiz_Adaptativo_3.html",
            "titulo": "6. Quiz Adaptativo — Módulo 5",
            "descripcion": "Evaluación formativa progresiva: cálculo conceptual de flujo, simetrías admisibles y campo en conductores.",
            "xp": 40
        },
        {
            "id": "m5-eval",
            "tipo": "quiz",
            "recurso": "Examen/Cuestionario_5_Flujo_Electrico_Ley_de_Gauss.html",
            "titulo": "7. Evaluación Sumativa — Ley de Gauss",
            "descripcion": "Cuestionario oficial de acreditación del Módulo 5 con problemas analíticos y preguntas de opción múltiple.",
            "xp": 50
        },
        {
            "id": "m5-nb1",
            "tipo": "notebooklm",
            "llmLink": "https://notebooklm.google.com/notebook/37622815-4b54-4808-b770-37464cb05719",
            "titulo": "8. Asistente IA (NotebookLM) — Ley de Gauss",
            "descripcion": "Consulta derivaciones analíticas, selección de superficies gaussianas y condiciones de frontera electrostáticas.",
            "xp": 10
        },
        {
            "id": "m5-e1",
            "tipo": "referencias",
            "titulo": "9. Repositorio Documental y Referencias",
            "descripcion": "Textos universitarios rigurosos, guías académicas y herramientas de simulación para la Ley de Gauss.",
            "xp": 10,
            "secciones": [
                {
                    "tituloSeccion": "Libros Universitarios de Referencia",
                    "links": [
                        { "url": "https://openstax.org/books/university-physics-volume-2/pages/6-1-electric-flux", "titulo": "OpenStax: Electric Flux & Gauss's Law — Cap. 6", "descripcion": "Texto universitario de acceso abierto con demostraciones analíticas completas." },
                        { "url": "https://www.amazon.com/dp/0321971174", "titulo": "Griffiths: Introduction to Electrodynamics — Cap. 2.2", "descripcion": "Tratamiento formal del Teorema de Gauss y la divergencia del campo electrostático." },
                        { "url": "http://hyperphysics.phy-astr.gsu.edu/hbasees/electric/gaulaw.html", "titulo": "HyperPhysics: Ley de Gauss (GSU)", "descripcion": "Mapas conceptuales interactivos y cálculos de campo por simetría." }
                    ]
                },
                {
                    "tituloSeccion": "Recursos Web y Clases Magistrales",
                    "links": [
                        { "url": "https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2007/pages/readings/", "titulo": "MIT OCW: Physics II (8.02) - Lecturas Ley de Gauss", "descripcion": "Material magistral del Instituto Tecnológico de Massachusetts." },
                        { "url": "https://www.fisicalab.com/apartado/teorema-gauss", "titulo": "Fisicalab: Teorema y Ley de Gauss", "descripcion": "Guía conceptual con ejemplos paso a paso de cilindros y esferas." }
                    ]
                },
                {
                    "tituloSeccion": "Simuladores y Visualizadores Externos",
                    "links": [
                        { "url": "https://phet.colorado.edu/es/simulations/charges-and-fields", "titulo": "PhET: Cargas y Campos (Colorado)", "descripcion": "Simulador para contrastar el flujo total y las líneas de campo emergentes." }
                    ]
                }
            ]
        }
    ]
};
