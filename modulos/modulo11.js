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
        "Transformadores ideales: relación de espiras y transmisión de potencia"
    ],
    "lecciones": [
        {
            "id": "m11-l1",
            "tipo": "multivideo",
            "recurso": "nZjNWgRmIdY|DfJCQZOyR4w|3XdeuEFV4QQ|zVzWm1f9JD4|BO8IdReQeDw|0xZv6_HwFVU|xBPwx9dBtl8|Clnp9-Wk9_Y|UcJPlOnrYnk|SwaEw6zjqJg",
            "titulo": "1. Videos: Ley de Faraday, Inductancia y Circuitos RL",
            "descripcion": "Colección de 10 clases universitarias verificadas: flujo magnético, fem inducida de Faraday-Lenz, autoinductancia, balance energético y análisis transitorio en circuitos RL.",
            "xp": 10,
            "titulosRecursos": [
                {"titulo": "Inducción Electromagnética, Ley de Faraday y Ley de Lenz", "canal": "Es Ciencia"},
                {"titulo": "Inducción electromagnética: Ley de Faraday - Lenz", "canal": "JUANMA FÍSICA"},
                {"titulo": "Ley de Faraday-Lenz: Experiencia de Laboratorio", "canal": "Profesor Física y Química"},
                {"titulo": "Inducción: FEM inducida, Espira y Flujo Magnético", "canal": "FísicaPRO"},
                {"titulo": "Ley de Faraday y Ley de Lenz (Explicación Teórica)", "canal": "Les Ingenieurs"},
                {"titulo": "Circuitos RL: Explicación y Deducción Analítica", "canal": "espiral ciencias"},
                {"titulo": "Inducción: Circuito RL y Crecimiento de Corriente", "canal": "Aritz Leonardo - Física General"},
                {"titulo": "El Inductor: Comportamiento Físico y Autoinductancia", "canal": "Les Ingenieurs"},
                {"titulo": "Ecuación Diferencial Circuito RL: Análisis Transitorio", "canal": "EngiTube"},
                {"titulo": "Respuesta Natural y Descarga del Circuito RL", "canal": "EngiTube"}
            ]
        },
        {
            "id": "m11-l2",
            "tipo": "presentacion",
            "recurso": "./player.html?clase=11",
            "titulo": "2. Diapositivas de Apoyo Magistral",
            "descripcion": "Visualización vectorial interactiva de espiras en rotación, barras conductoras y flujos variantes en el tiempo.",
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
                    "recurso": "simuladores/Sim_M10_FlujoMagnetico.html",
                    "titulo": "3.1 Analizador de Flujo Magnético y FEM",
                    "descripcion": "Calcula y grafica en tiempo real la derivada temporal del flujo magnético.",
                    "xp": 20
                },
                {
                    "id": "m11-s2",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M10_FEM_Movimiento.html",
                    "titulo": "3.2 FEM de Movimiento en Rieles Conductores",
                    "descripcion": "Estudio dinámico de fuerza magnética retardadora y disipación de energía por efecto Joule.",
                    "xp": 20
                }
            ]
        },
        {
            "id": "m11-j1",
            "tipo": "juego",
            "recurso": "juegos/Juego_10.html",
            "titulo": "4. Physics Quest — Faraday",
            "descripcion": "Genera la corriente exacta moviendo espiras y núcleos magnéticos. ¡5 misiones de inducción!",
            "xp": 25,
            "logro": { "id": "logro_m11", "nombre": "Maestro de la Inducción", "icono": "bolt" }
        },
        {
            "id": "m11-l7",
            "tipo": "ejercicio",
            "recurso": "talleres/Taller_11_Ley_de_Faraday.html",
            "titulo": "5. Taller Práctico No. 10 — Ley de Faraday",
            "descripcion": "Problemas de inductancia mutua, barras deslizantes con fricción y circuitos con inductores acoplados.",
            "xp": 30
        },
        {
            "id": "m11-q1",
            "tipo": "quiz",
            "recurso": "Examen/Quiz_Adaptativo_10.html",
            "titulo": "6. Quiz Adaptativo — Módulo 11",
            "descripcion": "Evaluación progresiva en 3 niveles: polaridad por ley de Lenz, cálculo de derivadas temporales y fem de movimiento.",
            "xp": 40
        },
        {
            "id": "m11-eval",
            "tipo": "quiz",
            "recurso": "Examen/Cuestionario_10_Ley_de_Faraday.html",
            "titulo": "7. Evaluación Sumativa — Ley de Faraday y Lenz",
            "descripcion": "Cuestionario oficial de acreditación sobre inducción electromagnética e inductores.",
            "xp": 50
        },
        {
            "id": "m11-nb1",
            "tipo": "notebooklm",
            "llmLink": "https://notebooklm.google.com/notebook/37622815-4b54-4808-b770-37464cb05719",
            "titulo": "8. Asistente IA (NotebookLM) — Ley de Faraday",
            "descripcion": "Consulta dudas analíticas, balance de potencia en barras móviles y solución de ecuaciones diferenciales acopladas.",
            "xp": 10
        },
        {
            "id": "m11-e1",
            "tipo": "referencias",
            "titulo": "9. Repositorio Documental y Referencias",
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
