// modulos/modulo11.js — Inducción Electromagnética: Ley de Faraday
// Asistente IA para flujo magnético dependiente del tiempo, fem inducida y ley de Lenz
export const modulo11 = {
    "titulo": "Módulo 11: Inducción Electromagnética - Ley de Faraday",
    "color": "#e11d48",
    "icono": "electric_meter",
    "descripcionCorta": "Inducción electromagnética, FEM inducida por flujo variable y principio de conservación de Lenz",
    "subtemas": [
        "Definición formal de flujo magnético ΦB a través de superficies abiertas",
        "Ley de Faraday: deducción analítica de la FEM inducida ε = -dΦB/dt",
        "Ley de Lenz: oposición física y conservación de la energía",
        "FEM de movimiento: análisis de barras conductoras deslizantes sobre rieles",
        "Inductancia mutua y coeficientes de acoplamiento magnético",
        "Autoinductancia L y energía magnética almacenada UB = ½ L I²",
        "Generador de corriente alterna: fem sinusoidal, valor máximo y eficaz",
        "Campo eléctrico inducido no conservativo y corrientes parásitas",
        "Inductancia mutua, base del transformador (se completa en el capítulo 13)"
    ],
    "lecciones": [
        {
            "id": "m11-l1",
            "tipo": "multivideo",
            "recurso": "nZjNWgRmIdY|DfJCQZOyR4w|588bqqz2oq4|BO8IdReQeDw|AfeQP8mObI4|3XdeuEFV4QQ|zVzWm1f9JD4|2rwz9jZF6Vo|5e_5kEvnvWM|39bmxwgKCCo|21oFy9ALhP8|B1IO4xiUSTE|3Gcr7UcmFV4|Clnp9-Wk9_Y",
            "titulo": "1. Videos: Ley de Faraday e inductancia",
            "descripcion": "Catorce videos verificados: ley de Faraday y de Lenz, fem de movimiento, generador, inductancia mutua y autoinductancia.",
            "xp": 10,
            "titulosRecursos": [
                {"titulo": "Inducción Electromagnética, Ley de Faraday y Ley de Lenz", "canal": "Es Ciencia"},
                {"titulo": "5- Inducción electromagnética: Ley de Faraday - Lenz", "canal": "JUANMA FÍSICA"},
                {"titulo": "Magnetismo: Ley de Faraday", "canal": "Ubermooc"},
                {"titulo": "LEY de FARADAY y LEY de LENZ (Explicación TEORÍA)", "canal": "Les Ingenieurs"},
                {"titulo": "30. Ley de Lenz. Qué significado tiene el signo Negativo? Ejercicios Resueltos - TinTutor.", "canal": "Tin Tutor (Martin)"},
                {"titulo": "LEY DE FARADAY - LENZ. Experiencia de laboratorio EXPLICADA. Inducción electromagnética", "canal": "Profesor Física y Química"},
                {"titulo": "INDUCCIÓN ELECTROMAGNÉTICA Resumen y Ejemplos: Ley de Faraday-Lenz, FEM en espira y Flujo Magnético", "canal": "FísicaPRO"},
                {"titulo": "Clase 27-Ley de Faraday fem de movimiento-explicacion", "canal": "espiral ciencias"},
                {"titulo": "FEM DE MOVIMIENTO EJ7", "canal": "GRANA2 Y SUS PROBLEMAS"},
                {"titulo": "FEM EN UNA ESPIRA GIRANDO EN UN CAMPO MAGNÉTICO", "canal": "Ignacio González Prieto"},
                {"titulo": "Generador de corriente alterna", "canal": "ceroentropia"},
                {"titulo": "Inductancia mutua y autoinducción Introducción 1", "canal": "Hector Hugo Torres Ortega"},
                {"titulo": "Inductancia e inductancia mutua. Ejemplo 1", "canal": "Profesor Juan Carlos Miranda"},
                {"titulo": "El Inductor lo que debes saber!", "canal": "Les Ingenieurs"}
            ]
        },
        {
            "id": "m11-l2",
            "tipo": "presentacion",
            "recurso": "./player.html?clase=11",
            "titulo": "2. Clase interactiva: Ley de Faraday",
            "descripcion": "14 diapositivas con simulaciones, deducciones en siete pasos (fem de movimiento y autoinductancia), retos con valores nuevos, árbol de decisión, mapa de conceptos, glosario y PDF descargable.",
            "xp": 15
        },
        {
            "id": "m11-g1",
            "tipo": "grupo",
            "titulo": "3. Laboratorio Virtual (Simuladores)",
            "sublecciones": [
                {
                    "id": "m11-s1",
                    "tipo": "simulador",
                    "recurso": "simuladores/Faraday.html#flujo",
                    "titulo": "3.1 FaradayLab · Flujo que cambia",
                    "descripcion": "Cambia el campo, el área o la inclinación de la bobina; predice el sentido de la corriente y calcula la fem.",
                    "xp": 20
                },
                {
                    "id": "m11-s2",
                    "tipo": "simulador",
                    "recurso": "simuladores/Faraday.html#iman",
                    "titulo": "3.2 FaradayLab · Imán y bobina",
                    "descripcion": "Acerca o aleja un imán por el eje de una bobina: ley de Lenz y fem según la distancia.",
                    "xp": 20
                },
                {
                    "id": "m11-s3",
                    "tipo": "simulador",
                    "recurso": "simuladores/Faraday.html#barra",
                    "titulo": "3.3 FaradayLab · Barra sobre rieles",
                    "descripcion": "Fem de movimiento, fuerza de frenado y balance de energía; suelta la barra y mira cómo se frena.",
                    "xp": 20
                },
                {
                    "id": "m11-s4",
                    "tipo": "simulador",
                    "recurso": "simuladores/Faraday.html#generador",
                    "titulo": "3.4 FaradayLab · Generador",
                    "descripcion": "Bobina que gira: flujo y fem en el tiempo, valor máximo y eficaz.",
                    "xp": 20
                }
            ]
        },
        {
            "id": "m11-g2",
            "tipo": "grupo",
            "titulo": "4. Taller No. 11 — Ley de Faraday",
            "sublecciones": [
                {
                    "id": "m11-l7",
                    "tipo": "ejercicio",
                    "recurso": "presentaciones/M11_Faraday/recursos/Cap11_Taller_Faraday.pdf",
                    "titulo": "4.1 Taller (PDF)",
                    "descripcion": "7 ejercicios resueltos (dos por dos caminos), 14 retos por niveles, preguntas de teoría, dos programas de Python y códigos QR al simulador.",
                    "xp": 30
                },
                {
                    "id": "m11-l8",
                    "tipo": "ejercicio",
                    "recurso": "presentaciones/M11_Faraday/recursos/Cap11_Guia_Faraday.pdf",
                    "titulo": "4.2 Guía de estudio (PDF)",
                    "descripcion": "Ideas clave, fórmulas, errores comunes, autoevaluación con respuestas, conectores, glosario y bibliografía.",
                    "xp": 15
                },
                {
                    "id": "m11-l9",
                    "tipo": "ejercicio",
                    "recurso": "talleres/Taller_11_Ley_de_Faraday.html",
                    "titulo": "4.3 Taller de práctica (versión web)",
                    "descripcion": "Problemas de inductancia mutua, barras deslizantes e inductores acoplados, con hoja de entrega.",
                    "xp": 20
                }
            ]
        },
        {
            "id": "m11-desafio",
            "tipo": "desafio",
            "recurso": "desafios/desafio.html?m=11",
            "titulo": "5. Desafío Integral de Maestría (3 Fases)",
            "descripcion": "Ruta formativa unificada: 1. Calentamiento Conceptual ➔ 2. Misión Interactiva Physics Quest ➔ 3. Certificación Cuantitativa.",
            "xp": 100,
            "logro": { "id": "logro_m11", "nombre": "Maestro de la Inducción", "icono": "motion_photos_on" }
        },
        {
            "id": "m11-nb1",
            "tipo": "notebooklm",
            "llmLink": "https://notebooklm.google.com/notebook/37622815-4b54-4808-b770-37464cb05719",
            "titulo": "6. Asistente IA (NotebookLM) — Ley de Faraday",
            "descripcion": "Consulta dudas analíticas, balance de potencia en barras móviles y solución de ecuaciones diferenciales acopladas.",
            "xp": 10
        },
        {
            "id": "m11-e1",
            "tipo": "referencias",
            "titulo": "7. Repositorio Documental y Referencias",
            "descripcion": "Fuentes sobre inducción electromagnética, aplicaciones industriales y transformadores.",
            "xp": 10,
            "secciones": [
                {
                    "tituloSeccion": "Libros Universitarios de Referencia",
                    "links": [
                        { "url": "https://openstax.org/books/university-physics-volume-2/pages/13-1-faradays-law", "titulo": "OpenStax: Ley de Faraday — Cap. 13", "descripcion": "Flujo magnético, FEM inducida, Lenz y aplicaciones electrodinámicas." },
                        { "url": "https://www.amazon.com/dp/0321971174", "titulo": "Griffiths: Introduction to Electrodynamics — Cap. 7", "descripcion": "Electrodinámica analítica, inducción y conservación de energía del campo." }
                    ]
                },
                {
                    "tituloSeccion": "Recursos Web y Clases Magistrales",
                    "links": [
                        { "url": "https://www.fisicalab.com/apartado/induccion-electromagnetica", "titulo": "Fisicalab: Inducción Electromagnética", "descripcion": "Teoría fundamental y ejercicios resueltos de Faraday y Lenz." },
                        { "url": "https://es.khanacademy.org/science/physics/magnetic-forces-and-magnetic-fields", "titulo": "Khan Academy: Inducción Electromagnética", "descripcion": "Explicaciones visuales paso a paso." }
                    ]
                },
                {
                    "tituloSeccion": "Simuladores Interactivos",
                    "links": [
                        { "url": "https://phet.colorado.edu/es/simulations/faradays-law", "titulo": "PhET: Ley de Faraday", "descripcion": "Mueve un imán y observa la FEM inducida y la iluminación de una bombilla en tiempo real." },
                        { "url": "https://phet.colorado.edu/es/simulations/generator", "titulo": "PhET: Generador Eléctrico", "descripcion": "Visualiza cómo la rotación mecánica genera corriente alterna sinusoidal." }
                    ]
                }
            ]
        }
    ]
};
