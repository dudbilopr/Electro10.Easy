// modulos/modulo7.js — Circuitos de Corriente Continua (CC)
// NOTEBOOKLM: Reemplaza "#" en llmLink con tu link real
export const modulo7 = {
    "titulo": "Módulo 7: Circuitos de Corriente Continua (CC)",
    "color": "#059669",
    "icono": "electrical_services",
    "descripcionCorta": "Corriente eléctrica, resistencia, Ley de Ohm, redes resistivas y Leyes de Kirchhoff",
    "subtemas": [
        "Corriente eléctrica y densidad de corriente",
        "Resistencia, resistividad y Ley de Ohm",
        "Fuerza Electromotriz (FEM) y resistencia interna",
        "Circuitos en serie, paralelo y transformaciones Delta-Estrella",
        "Ley de Kirchhoff de voltajes (LKV) y de corrientes (LKC)",
        "Análisis sistemático de nodos y mallas",
        "Teoremas de Thévenin y Norton",
        "Potencia eléctrica y circuitos RC en corriente continua"
    ],
    "lecciones": [
        {
            "id": "m7-l1",
            "tipo": "multivideo",
            "recurso": "Z_XkDlMFXGA|8Fy4-FOgNlA|gxbA_iy4aWM|y5X2AMZVMxM|s7YUiSeMJ0g|cFPjijfVTtU|WUmxkuYVHsQ|Oq7Dfh85-VE|wwcBAZoPGrE",
            "titulo": "1. Videos — Circuitos de Corriente Continua (CC)",
            "descripcion": "Corriente, resistencia, reglas de Kirchhoff, mallas, Thévenin y circuitos RC con demostraciones completas.",
            "xp": 10
        },
        {
            "id": "m7-l2",
            "tipo": "presentacion",
            "recurso": "./clase_7.html",
            "titulo": "2. Diapositivas Interactivas — Circuitos Resistivos",
            "descripcion": "Análisis de circuitos con métodos de reducción, mallas y nodos visualizados paso a paso.",
            "xp": 15
        },

        {
            "id": "m7-g1",
            "tipo": "grupo",
            "titulo": "3. Laboratorio Virtual (Simuladores)",
            "sublecciones": [
                {
                    "id": "m7-s1",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M6_Resistividad.html",
                    "titulo": "3.1 Resistividad y Geometría del Conductor",
                    "descripcion": "Observa cómo influyen la longitud, la sección transversal y el material en la resistencia eléctrica.",
                    "xp": 20
                },
                {
                    "id": "m7-s2",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M6_CircuitoDC.html",
                    "titulo": "3.2 Campo Eléctrico en Conductores y Corriente",
                    "descripcion": "Simulación interactiva del movimiento de los portadores de carga impulsados por el campo.",
                    "xp": 20
                },
                {
                    "id": "m7-s3",
                    "tipo": "simulador",
                    "recurso": "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_es.html",
                    "titulo": "3.3 Kit de Construcción de Circuitos CC (PhET)",
                    "descripcion": "Simulador interactivo de la Univ. de Colorado con voltímetros, amperímetros y fuentes.",
                    "xp": 20
                },
                {
                    "id": "m7-s4",
                    "tipo": "simulador",
                    "recurso": "https://www.falstad.com/circuit/circuitjs.html",
                    "titulo": "3.4 Simulador Falstad de Circuitos en Tiempo Real",
                    "descripcion": "Osciloscopio y visualizador interactivo del flujo de corriente y caídas de voltaje en tiempo real.",
                    "xp": 20
                }
            ]
        },
        {
            "id": "m7-j1",
            "tipo": "juego",
            "recurso": "juegos/Juego_6.html",
            "titulo": "4. Physics Quest — Circuitos DC",
            "descripcion": "Diseña redes eléctricas para satisfacer especificaciones de voltaje y corriente. ¡5 misiones de ingeniería!",
            "xp": 25,
            "logro": { "id": "logro_m7", "nombre": "Arquitecto de Redes", "icono": "schema" }
        },
        {
            "id": "m7-t",
            "tipo": "grupo",
            "titulo": "5. Talleres Prácticos",
            "sublecciones": [
                {
                    "id": "m7-t1",
                    "tipo": "ejercicio",
                    "recurso": "talleres/Taller_6_1_Reduccion_Circuitos.html",
                    "titulo": "5.1 Taller — Reducción de Circuitos",
                    "descripcion": "Simplificación sistemática de redes resistivas en serie, paralelo y conversiones delta-estrella.",
                    "xp": 25
                },
                {
                    "id": "m7-t2",
                    "tipo": "ejercicio",
                    "recurso": "talleres/Taller_6_2_Leyes_K.html",
                    "titulo": "5.2 Taller — Leyes de Kirchhoff y Mallas",
                    "descripcion": "Análisis sistemático de circuitos mediante sistemas de ecuaciones con LKV y LKC.",
                    "xp": 30
                }
            ]
        },
        {
            "id": "m7-q1",
            "tipo": "quiz",
            "recurso": "Examen/Quiz_Adaptativo_6.html",
            "titulo": "6. Quiz Adaptativo — Circuitos DC",
            "descripcion": "Evalúa desde la Ley de Ohm elemental hasta análisis de redes complejas con Kirchhoff.",
            "xp": 40
        },
        {
            "id": "m7-eval",
            "tipo": "quiz",
            "recurso": "Examen/Cuestionario_7_Circuitos_CC.html",
            "titulo": "7. Evaluación Sumativa — Módulo 7 (Circuitos CC)",
            "descripcion": "Cuestionario oficial de validación de conocimientos teóricos y problemas de circuitos de CC.",
            "xp": 50
        },
        {
            "id": "m7-nb1",
            "tipo": "notebooklm",
            "llmLink": "https://notebooklm.google.com/notebook/d8eac5d0-34e5-4bdc-949e-fdbef626d764",
            "titulo": "8. NotebookLM — Circuitos de Corriente Continua",
            "descripcion": "IA especializada en circuitos DC. Asistencia en resolución por mallas, nodos y teoremas de Thévenin/Norton.",
            "xp": 10
        },
        {
            "id": "m7-e1",
            "tipo": "referencias",
            "titulo": "9. Referencias Bibliográficas y Repositorio",
            "descripcion": "Libros universitarios, manuales técnicos y herramientas online para circuitos CC.",
            "xp": 10,
            "secciones": [
                {
                    "tituloSeccion": "Libros de texto",
                    "links": [
                        { "url": "https://openstax.org/books/university-physics-volume-2/pages/10-1-electromotive-force", "titulo": "OpenStax: Circuitos DC — Cap. 10", "descripcion": "FEM, resistencia interna, Kirchhoff y circuitos RC." },
                        { "url": "https://openstax.org/books/college-physics-2e/pages/21-introduction-to-circuits-and-dc-instruments", "titulo": "OpenStax College Physics: Circuitos y Mediciones CC", "descripcion": "Instrumentos de medición CC, amperímetros, voltímetros y divisor de tensión." },
                        { "url": "https://ece.uprm.edu/~jrosado/oldexams/3105/Materiales/Book-Electric-Circuits-9th-ed-J.-Nilsson-S.-Riedel-Prentice-Hall-2011.pdf", "titulo": "Nilsson & Riedel: Electric Circuits (9th Ed)", "descripcion": "Texto universitario exhaustivo con métodos de mallas y nodos paso a paso." }
                    ]
                },
                {
                    "tituloSeccion": "Recursos web",
                    "links": [
                        { "url": "https://www.allaboutcircuits.com/textbook/direct-current/", "titulo": "All About Circuits: Direct Current", "descripcion": "Guía completa de circuitos DC con esquemas y explicaciones intuitivas." },
                        { "url": "https://es.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic", "titulo": "Khan Academy: Circuitos Eléctricos", "descripcion": "Videos instructivos y ejercicios paso a paso de Kirchhoff y Thévenin." },
                        { "url": "https://www.engineer4free.com/circuits.html", "titulo": "Engineer4Free: Circuit Analysis", "descripcion": "Curso libre con decenas de problemas de circuitos resueltos." }
                    ]
                },
                {
                    "tituloSeccion": "Simuladores externos",
                    "links": [
                        { "url": "https://phet.colorado.edu/es/simulations/circuit-construction-kit-dc", "titulo": "PhET: Construcción de Circuitos DC", "descripcion": "Construye y mide voltajes y corrientes en tiempo real." },
                        { "url": "https://www.falstad.com/circuit/", "titulo": "Falstad Circuit Simulator", "descripcion": "Simulador profesional de circuitos electrónicos en el navegador." },
                        { "url": "https://www.circuitlab.com/editor/", "titulo": "CircuitLab", "descripcion": "Diseño y simulación de circuitos en línea." }
                    ]
                }
            ]
        }
    ]
};
