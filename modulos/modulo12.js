// modulos/modulo12.js — Ecuaciones de Maxwell y Ondas Electromagnéticas
// Asistente IA para unificación electromagnética, vector de Poynting y propagación de ondas
export const modulo12 = {
    "titulo": "Módulo 12: Ecuaciones de Maxwell y Ondas EM",
    "color": "#4f46e5",
    "icono": "waves",
    "descripcionCorta": "Síntesis del electromagnetismo clásico, ondas electromagnéticas en el vacío y transporte de energía",
    "subtemas": [
        "Las cuatro ecuaciones fundamentales de Maxwell en forma integral",
        "Forma diferencial de las ecuaciones de Maxwell y operadores rotacional y divergencia",
        "Corriente de desplazamiento y cierre de la ley de Ampere-Maxwell",
        "Ecuación de onda electromagnética en el vacío: deducción de c = 1 / √(ε₀ μ₀)",
        "Propiedades de ondas planas transversales: relación de fase y amplitudes E = c B",
        "Vector de Poynting S = (1/μ₀) E × B, intensidad de radiación y presión de radiación",
        "Espectro electromagnético y polarización lineal, circular y elíptica"
    ],
    "lecciones": [
        {
            "id": "m12-l1",
            "tipo": "multivideo",
            "recurso": "F3GFTvKu7vM|LKuOc5kqPZw|F4j1N9GepPg|RIUqZ6UiHxs|UeVdq0VFtk8|Y0oN0mTiP3k",
            "titulo": "1. Teoría y Deducción: Ecuaciones de Maxwell",
            "descripcion": "La unificación fundamental de la electricidad, magnetismo y óptica clásica en 4 postulados.",
            "xp": 10
        },
        {
            "id": "m12-l2",
            "tipo": "presentacion",
            "recurso": "./player.html?clase=11",
            "titulo": "2. Diapositivas de Apoyo Magistral",
            "descripcion": "Visualización tridimensional de la propagación de ondas EM con campos ortogonales acoplados.",
            "xp": 15
        },
        {
            "id": "m12-g1",
            "tipo": "grupo",
            "titulo": "3. Laboratorio Virtual (Simuladores)",
            "sublecciones": [
                {
                    "id": "m12-s1",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M11_OndaEM.html",
                    "titulo": "3.1 Visualizador 3D de Onda Electromagnética Plana",
                    "descripcion": "Representación vectorial en fase de campos E y B propagándose a la velocidad de la luz.",
                    "xp": 20
                },
                {
                    "id": "m12-s2",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M11_EcuacionesMaxwell.html",
                    "titulo": "3.2 Matriz de Maxwell: Formas Integral y Diferencial",
                    "descripcion": "Explorador interactivo de los teoremas de Gauss y Stokes aplicados al conjunto de Maxwell.",
                    "xp": 20
                }
            ]
        },
        {
            "id": "m12-j1",
            "tipo": "juego",
            "recurso": "juegos/Juego_11.html",
            "titulo": "4. Physics Quest — Maxwell",
            "descripcion": "Completa las 4 ecuaciones de Maxwell y resuelve el balance de radiación. ¡El desafío unificado!",
            "xp": 25,
            "logro": { "id": "logro_m12", "nombre": "Físico Teórico", "icono": "flare" }
        },
        {
            "id": "m12-l7",
            "tipo": "ejercicio",
            "recurso": "talleres/Taller_11_Ecuaciones_Maxwell.html",
            "titulo": "5. Taller Práctico No. 11 — Ecuaciones de Maxwell",
            "descripcion": "Problemas de corriente de desplazamiento en capacitores, cálculo del vector de Poynting y balance energético.",
            "xp": 30
        },
        {
            "id": "m12-q1",
            "tipo": "quiz",
            "recurso": "Examen/Quiz_Adaptativo_11.html",
            "titulo": "6. Quiz Adaptativo — Módulo 12",
            "descripcion": "Evaluación cognitiva en 3 niveles: significado físico de cada ley, cálculo de vector de Poynting y velocidad de propagación.",
            "xp": 40
        },
        {
            "id": "m12-eval",
            "tipo": "quiz",
            "recurso": "Examen/Cuestionario_12_Ecuaciones_Maxwell.html",
            "titulo": "7. Evaluación Sumativa — Ecuaciones de Maxwell",
            "descripcion": "Cuestionario oficial de acreditación sobre síntesis electromagnética y teoría ondulatoria.",
            "xp": 50
        },
        {
            "id": "m12-nb1",
            "tipo": "notebooklm",
            "llmLink": "https://notebooklm.google.com/notebook/37622815-4b54-4808-b770-37464cb05719",
            "titulo": "8. Asistente IA (NotebookLM) — Maxwell",
            "descripcion": "Consulta dudas teóricas sobre la derivación de la ecuación de onda, gauge de Lorenz y tensor de esfuerzos.",
            "xp": 10
        },
        {
            "id": "m12-e1",
            "tipo": "referencias",
            "titulo": "9. Repositorio Documental y Referencias",
            "descripcion": "Fuentes sobre las ecuaciones de Maxwell, teoría de radiación y ondas electromagnéticas.",
            "xp": 10,
            "secciones": [
                {
                    "tituloSeccion": "Libros Universitarios de Referencia",
                    "links": [
                        { "url": "https://openstax.org/books/university-physics-volume-2/pages/16-1-maxwells-equations-and-electromagnetic-waves", "titulo": "OpenStax: Ecuaciones de Maxwell — Cap. 16", "descripcion": "Síntesis del electromagnetismo clásico, ondas y vector de Poynting." },
                        { "url": "https://www.amazon.com/dp/0321971174", "titulo": "Griffiths: Introduction to Electrodynamics — Cap. 9", "descripcion": "Teoría matemática rigurosa de ondas electromagnéticas." },
                        { "url": "https://www.feynmanlectures.caltech.edu/II_18.html", "titulo": "Feynman Lectures on Physics: Maxwell's Equations", "descripcion": "Derivación con la perspectiva física magistral de Richard Feynman." }
                    ]
                },
                {
                    "tituloSeccion": "Recursos Web y Clases Magistrales",
                    "links": [
                        { "url": "https://maxwells-equations.com/", "titulo": "Maxwell's Equations Visual Guide", "descripcion": "Guía conceptual e interactiva con diagramas vectoriales intuitivos." }
                    ]
                },
                {
                    "tituloSeccion": "Simuladores Interactivos",
                    "links": [
                        { "url": "https://phet.colorado.edu/es/simulations/radio-waves-and-electromagnetic-fields", "titulo": "PhET: Ondas Electromagnéticas y Radio", "descripcion": "Emisión de ondas electromagnéticas por dipolos oscilantes." }
                    ]
                }
            ]
        }
    ]
};
