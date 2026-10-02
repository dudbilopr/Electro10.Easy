// modulos/modulo2.js — Electrostática: Campo Eléctrico
// NOTEBOOKLM: Asistente IA para análisis vectorial de campos electrostáticos
export const modulo2 = {
    "titulo": "Módulo 2: Electrostática - Campo Eléctrico",
    "color": "#7c3aed",
    "icono": "scatter_plot",
    "descripcionCorta": "Vector campo eléctrico, principio de superposición, líneas de fuerza y dipolo eléctrico",
    "subtemas": [
        "Definición operacional del campo eléctrico y carga de prueba",
        "Campo eléctrico de un sistema discreto de cargas puntuales",
        "Propiedades topológicas y trazado de líneas de campo eléctrico",
        "Momento dipolar eléctrico y campo producido por un dipolo",
        "Torque y energía potencial de un dipolo en un campo externo uniforme",
        "Dinámica relativista y clásica de partículas cargadas en campos eléctricos uniformes",
        "Aceleradores lineales electrostáticos y tubos de rayos catódicos"
    ],
    "lecciones": [
        {
            "id": "m2-l1",
            "tipo": "multivideo",
            "recurso": "y00efYMfQbg|-c8JxTvP9zs|CBwHsuVcXUI|hqg_89-2Lyo|c1jyhvkPqqk|3p_rM3i9IxY|tF8zfTVUAFY",
            "titulo": "1. Teoría Vectorial del Campo Eléctrico",
            "descripcion": "Definición formal del vector campo eléctrico, líneas de fuerza, superposición vectorial y análisis de dipolos.",
            "xp": 10
        },
        {
            "id": "m2-l2",
            "tipo": "presentacion",
            "recurso": "./player.html?clase=2",
            "titulo": "2. Diapositivas Interactivas — Campo Eléctrico",
            "descripcion": "Visualizaciones 3D vectoriales del campo electrostático, mapeo de líneas de fuerza y cálculo de dipolos.",
            "xp": 15
        },
        {
            "id": "m2-g1",
            "tipo": "grupo",
            "titulo": "3. Laboratorio Virtual (Simuladores)",
            "sublecciones": [
                {
                    "id": "m2-s1",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M2_Campo_Vectorial.html",
                    "titulo": "3.1 Campo Eléctrico Vectorial Dinámico",
                    "descripcion": "Visualizador bidimensional del campo creado por múltiples cargas con vectores normalizados.",
                    "xp": 20
                },
                {
                    "id": "m2-s2",
                    "tipo": "simulador",
                    "recurso": "simuladores/Campo_Electrico.html",
                    "titulo": "3.2 Trazador de Líneas de Campo",
                    "descripcion": "Entorno virtual para interactuar con cargas puntuales y visualizar líneas de campo en alta resolución.",
                    "xp": 20
                },
                {
                    "id": "m2-s3",
                    "tipo": "simulador",
                    "recurso": "https://phet.colorado.edu/es/simulations/charges-and-fields",
                    "titulo": "3.3 Laboratorio PhET: Cargas y Campos",
                    "descripcion": "Simulador de la Univ. de Colorado con sensores de voltaje y magnitud de campo eléctrico.",
                    "xp": 20
                }
            ]
        },
        {
            "id": "m2-j1",
            "tipo": "juego",
            "recurso": "juegos/Juego_2.html",
            "titulo": "4. Physics Quest — Campo Eléctrico",
            "descripcion": "¡Guía partículas a través de campos eléctricos! 5 rondas de desafío y calibración vectorial.",
            "xp": 25,
            "logro": { "id": "logro_m2", "nombre": "Cartógrafo de Campos", "icono": "navigation" }
        },
        {
            "id": "m2-l7",
            "tipo": "ejercicio",
            "recurso": "talleres/Taller_2_Campo_Electrico.html",
            "titulo": "5. Taller Práctico No. 2 — Campo Eléctrico",
            "descripcion": "Problemas de nivel Sears-Zemansky: cálculo de campo neto, momentos dipolares y cinemática en campos uniformes.",
            "xp": 30
        },
        {
            "id": "m2-q1",
            "tipo": "quiz",
            "recurso": "Examen/Quiz_Adaptativo_2.html",
            "titulo": "6. Quiz Adaptativo — Módulo 2",
            "descripcion": "Evaluación multinivel: conceptos de campo, cálculo vectorial numérico y comportamiento de dipolos.",
            "xp": 40
        },
        {
            "id": "m2-eval",
            "tipo": "quiz",
            "recurso": "Examen/Cuestionario_2_Campo_Electrico.html",
            "titulo": "7. Evaluación Sumativa — Campo Eléctrico",
            "descripcion": "Cuestionario oficial de validación de conocimientos sobre el campo electrostático.",
            "xp": 50
        },
        {
            "id": "m2-nb1",
            "tipo": "notebooklm",
            "llmLink": "https://notebooklm.google.com/notebook/37622815-4b54-4808-b770-37464cb05719",
            "titulo": "8. Asistente IA (NotebookLM) — Campo Eléctrico",
            "descripcion": "Consulta dudas matemáticas sobre divergencia, líneas de campo y dipolos con IA.",
            "xp": 10
        },
        {
            "id": "m2-e1",
            "tipo": "referencias",
            "titulo": "9. Repositorio Documental y Referencias",
            "descripcion": "Fuentes sobre teoría de campos electrostáticos.",
            "xp": 10,
            "secciones": [
                {
                    "tituloSeccion": "Libros Universitarios de Referencia",
                    "links": [
                        { "url": "https://openstax.org/books/university-physics-volume-2/pages/5-1-electric-field", "titulo": "OpenStax: Electric Field — Cap. 5", "descripcion": "Definición, propiedades y cálculo de campo eléctrico." },
                        { "url": "https://www.amazon.com/dp/0131496824", "titulo": "Serway: Física para Ciencias e Ingeniería — Cap. 23", "descripcion": "Desarrollo completo del campo electrostático." },
                        { "url": "https://www.fisicalab.com/apartado/campo-electrico", "titulo": "Fisicalab: Campo Eléctrico", "descripcion": "Explicaciones visuales y ejercicios paso a paso." }
                    ]
                },
                {
                    "tituloSeccion": "Simuladores Interactivos",
                    "links": [
                        { "url": "https://www.geogebra.org/m/bZcA35JW", "titulo": "GeoGebra: Campo Eléctrico Vectorial", "descripcion": "Visualización geométrica en tiempo real." }
                    ]
                }
            ]
        }
    ]
};
