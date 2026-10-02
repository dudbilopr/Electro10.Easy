// modulos/modulo1.js — Electrostática: Ley de Coulomb
// NOTEBOOKLM: Asistente IA para deducciones vectoriales y resolución analítica
export const modulo1 = {
    "titulo": "Módulo 1: Electrostática - Ley de Coulomb",
    "color": "#0284c7",
    "icono": "electric_bolt",
    "descripcionCorta": "Cuantización de la carga eléctrica, polarización y fuerza electrostática vectorial",
    "subtemas": [
        "Naturaleza atómica de la carga eléctrica y principio de conservación",
        "Cuantización de la carga y el experimento de Millikan",
        "Conductores, aislantes y polarización dieléctrica",
        "Formulación escalar de la Ley de Coulomb",
        "Formulación vectorial rigurosa de la Ley de Coulomb",
        "Principio de superposición lineal para distribuciones discretas",
        "Equilibrio electrostático en configuraciones de cargas puntuales"
    ],
    "lecciones": [
        {
            "id": "m1-l1",
            "tipo": "multivideo",
            "recurso": "xLyRPFL0GJ8|mrCyjv9lf3I|HpHVmuQb1gM|YgP-9fVA0-Y|gigeloLe1jI|ph341nhqOII|tXschFCgjrY|q1Ez2tLVy10|EhCX3JR6mHQ|8FXllt2Z9Tk|a1M2OmlwGyc|_hgOrdi7Epw",
            "titulo": "1. Teoría y Deducción: Ley de Coulomb",
            "descripcion": "Fundamentación teórica rigurosa, deducción de la fuerza electrostática y análisis vectorial del principio de superposición.",
            "xp": 10
        },
        {
            "id": "m1-l2",
            "tipo": "presentacion",
            "recurso": "./player.html?clase=1",
            "titulo": "2. Diapositivas de Apoyo Magistral",
            "descripcion": "Presentación visual interactiva: diagramas de cuerpo libre electrostáticos, vectores unitarios y ejemplos resueltos paso a paso.",
            "xp": 15
        },
        {
            "id": "m1-g1",
            "tipo": "grupo",
            "titulo": "3. Laboratorio Virtual (Simuladores)",
            "sublecciones": [
                {
                    "id": "m1-l3",
                    "tipo": "simulador",
                    "recurso": "simuladores/Coulomb.html",
                    "titulo": "3.1 Analizador de Fuerzas de Coulomb Pro",
                    "descripcion": "Simulador interactivo con cálculo en tiempo real de vectores de fuerza neta y ángulos.",
                    "xp": 20
                },
                {
                    "id": "m1-l4",
                    "tipo": "simulador",
                    "recurso": "simuladores/Simulador_Cargas_Electricas.html",
                    "titulo": "3.2 Dinámica de Partículas Cargadas",
                    "descripcion": "Entorno virtual para experimentar atracción y repulsión bajo la ley del cuadrado inverso.",
                    "xp": 20
                },
                {
                    "id": "m1-l5",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M1_Coulomb_Pro.html",
                    "titulo": "3.3 Laboratorio de Superposición Vectorial",
                    "descripcion": "Configura arreglos bidimensionales de cargas y mide las componentes cartesianas de la fuerza resultante.",
                    "xp": 20
                }
            ]
        },
        {
            "id": "m1-j1",
            "tipo": "juego",
            "recurso": "juegos/Juego_1.html",
            "titulo": "4. Physics Quest — Ley de Coulomb",
            "descripcion": "Ubica cargas de prueba en el espacio para guiar partículas y neutralizar campos. ¡5 misiones vectoriales!",
            "xp": 25,
            "logro": { "id": "logro_m1", "nombre": "Maestro de Cargas", "icono": "bolt" }
        },
        {
            "id": "m1-l7",
            "tipo": "ejercicio",
            "recurso": "talleres/Taller_1_Ley_de_Coulomb.html",
            "titulo": "5. Taller Práctico No. 1 — Ley de Coulomb",
            "descripcion": "Problemas de nivel universitario: modelado vectorial, equilibrio de cargas en hilos y sistemas simétricos.",
            "xp": 30
        },
        {
            "id": "m1-q1",
            "tipo": "quiz",
            "recurso": "Examen/Quiz_Adaptativo_1.html",
            "titulo": "6. Quiz Adaptativo — Módulo 1",
            "descripcion": "Evaluación cognitiva en 3 niveles: conceptual, cálculo vectorial numérico y problemas de aplicación.",
            "xp": 40
        },
        {
            "id": "m1-eval",
            "tipo": "quiz",
            "recurso": "Examen/Cuestionario_1_Ley_de_Coulomb.html",
            "titulo": "7. Evaluación Sumativa — Ley de Coulomb",
            "descripcion": "Cuestionario oficial de validación con preguntas de opción múltiple, cálculo riguroso y análisis físico.",
            "xp": 50
        },
        {
            "id": "m1-nb1",
            "tipo": "notebooklm",
            "llmLink": "https://notebooklm.google.com/notebook/37622815-4b54-4808-b770-37464cb05719",
            "titulo": "8. Asistente IA (NotebookLM) — Ley de Coulomb",
            "descripcion": "Consulta dudas teóricas, solicita derivaciones paso a paso y valida ejercicios con el modelo de lenguaje curado.",
            "xp": 10
        },
        {
            "id": "m1-e1",
            "tipo": "referencias",
            "titulo": "9. Repositorio Documental y Referencias",
            "descripcion": "Textos de referencia, artículos y herramientas de cálculo.",
            "xp": 10,
            "secciones": [
                {
                    "tituloSeccion": "Libros Universitarios de Referencia",
                    "links": [
                        { "url": "https://openstax.org/books/university-physics-volume-2/pages/5-1-electric-charge", "titulo": "OpenStax: Electric Charge & Coulomb's Law", "descripcion": "Texto abierto de física universitaria con deducciones paso a paso." },
                        { "url": "https://www.amazon.com/dp/0321971174", "titulo": "Griffiths: Introduction to Electrodynamics — Cap. 2", "descripcion": "Tratamiento formal del electromagnetismo clásico." },
                        { "url": "https://www.fisicalab.com/apartado/ley-de-coulomb", "titulo": "Fisicalab: Ley de Coulomb", "descripcion": "Explicación didáctica con representaciones gráficas y problemas resueltos." }
                    ]
                },
                {
                    "tituloSeccion": "Simuladores y Laboratorios Externos",
                    "links": [
                        { "url": "https://phet.colorado.edu/es/simulations/coulombs-law", "titulo": "PhET: Ley de Coulomb Interactiva", "descripcion": "Simulador de la Universidad de Colorado para visualizar la fuerza electrostática en tiempo real." }
                    ]
                }
            ]
        }
    ]
};
