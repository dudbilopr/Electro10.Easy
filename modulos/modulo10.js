// modulos/modulo10.js — Ley de Ampere
// Asistente IA para circulación magnética, caminos amperianos y corriente de desplazamiento
export const modulo10 = {
    "titulo": "Módulo 10: Ley de Ampere",
    "color": "#0d9488",
    "icono": "loop",
    "descripcionCorta": "Circulación del campo magnético, simetrías amperianas y la corriente de desplazamiento de Maxwell",
    "subtemas": [
        "Ley de Ampere: formulación integral rigurosa y producto escalar B·dl",
        "Selección estratégica de caminos amperianos y análisis de simetrías",
        "Campo magnético en solenoides ideales y reales",
        "Campo magnético en toroides y bobinas toroidales",
        "Conductores coaxiales y corrientes distribuidas volumétricamente",
        "Inconsistencia de la ley de Ampere para campos variables y corriente de desplazamiento",
        "Ley de Ampere-Maxwell generalizada"
    ],
    "lecciones": [
        {
            "id": "m10-l1",
            "tipo": "multivideo",
            "recurso": "6mHK7by6WJc|mIPnkZPFAa8|aEFn-JY_h8A|4DYjxBRjYbc|K7-PiHoJ3v0",
            "titulo": "1. Teoría y Deducción: Ley de Ampere",
            "descripcion": "Circulación magnética, aplicación a solenoides, toroides y la introducción histórica de la corriente de desplazamiento.",
            "xp": 10
        },
        {
            "id": "m10-l2",
            "tipo": "presentacion",
            "recurso": "./player.html?clase=9",
            "titulo": "2. Diapositivas de Apoyo Magistral",
            "descripcion": "Caminos amperianos en geometrías cilíndricas y toroidales, con demostraciones analíticas completas.",
            "xp": 15
        },
        {
            "id": "m10-g1",
            "tipo": "grupo",
            "titulo": "3. Laboratorio Virtual (Simuladores)",
            "sublecciones": [
                {
                    "id": "m10-s1",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M9_Solenoide.html",
                    "titulo": "3.1 Solenoide Interactivo",
                    "descripcion": "Análisis cuantitativo del campo en el interior y exterior de solenoides según densidad de espiras.",
                    "xp": 20
                },
                {
                    "id": "m10-s2",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M9_Tabla_Ampere.html",
                    "titulo": "3.2 Tabla Ampere Interactiva",
                    "descripcion": "Calculadora geométrica para evaluar la circulación y corriente encerrada en múltiples configuraciones.",
                    "xp": 20
                }
            ]
        },
        {
            "id": "m10-j1",
            "tipo": "juego",
            "recurso": "juegos/Juego_9.html",
            "titulo": "4. Physics Quest — Ley de Ampere",
            "descripcion": "Selecciona el camino amperiano óptimo y calcula el campo en 5 geometrías desafiantes.",
            "xp": 25,
            "logro": { "id": "logro_m10", "nombre": "Maestro Amperiano", "icono": "loop" }
        },
        {
            "id": "m10-l7",
            "tipo": "ejercicio",
            "recurso": "talleres/Taller_9_Ley_de_Ampere.html",
            "titulo": "5. Taller Práctico No. 9 — Ley de Ampere",
            "descripcion": "Problemas de solenoides, toroides, cables coaxiales con densidades volumétricas de corriente.",
            "xp": 30
        },
        {
            "id": "m10-q1",
            "tipo": "quiz",
            "recurso": "Examen/Quiz_Adaptativo_9.html",
            "titulo": "6. Quiz Adaptativo — Módulo 10",
            "descripcion": "Evaluación cognitiva en 3 niveles: concepto de circulación, aplicaciones simétricas y corrección de Maxwell.",
            "xp": 40
        },
        {
            "id": "m10-eval",
            "tipo": "quiz",
            "recurso": "Examen/Cuestionario_9_Ley_de_Ampere.html",
            "titulo": "7. Evaluación Sumativa — Ley de Ampere",
            "descripcion": "Cuestionario oficial de acreditación sobre circulación magnética y la ley de Ampere-Maxwell.",
            "xp": 50
        },
        {
            "id": "m10-nb1",
            "tipo": "notebooklm",
            "llmLink": "https://notebooklm.google.com/notebook/37622815-4b54-4808-b770-37464cb05719",
            "titulo": "8. Asistente IA (NotebookLM) — Ley de Ampere",
            "descripcion": "Consulta cómo seleccionar el camino amperiano, comparación con la ley de Gauss y demostración de la corriente de desplazamiento.",
            "xp": 10
        },
        {
            "id": "m10-e1",
            "tipo": "referencias",
            "titulo": "9. Repositorio Documental y Referencias",
            "descripcion": "Fuentes académicas sobre la ley de Ampere, magnetostática y corrección de Maxwell.",
            "xp": 10,
            "secciones": [
                {
                    "tituloSeccion": "Libros Universitarios de Referencia",
                    "links": [
                        { "url": "https://openstax.org/books/university-physics-volume-2/pages/12-3-amperes-law", "titulo": "OpenStax: Ley de Ampere — Cap. 12", "descripcion": "Solenoides, toroides y corriente de desplazamiento." },
                        { "url": "https://www.amazon.com/dp/0321971174", "titulo": "Griffiths: Introduction to Electrodynamics — Cap. 5.3", "descripcion": "Ley de Ampere rigurosa y aplicaciones formales." }
                    ]
                },
                {
                    "tituloSeccion": "Recursos Web y Clases Magistrales",
                    "links": [
                        { "url": "https://www.fisicalab.com/apartado/ley-de-ampere", "titulo": "Fisicalab: Ley de Ampere", "descripcion": "Simetría, solenoides y ejemplos prácticos resueltos." },
                        { "url": "https://es.khanacademy.org/science/physics/magnetic-forces-and-magnetic-fields", "titulo": "Khan Academy: Ley de Ampere", "descripcion": "Introducción conceptual con práctica interactiva." }
                    ]
                },
                {
                    "tituloSeccion": "Simuladores Interactivos",
                    "links": [
                        { "url": "https://phet.colorado.edu/es/simulations/faradays-law", "titulo": "PhET: Campo en Solenoides", "descripcion": "Explora el campo magnético en bobinas y solenoides en tiempo real." }
                    ]
                }
            ]
        }
    ]
};
