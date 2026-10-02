// modulos/modulo13.js — Circuitos RL, LC, RLC y Corriente Alterna
// Asistente IA para régimen transitorio, oscilaciones LC, fasores e impedancia compleja
export const modulo13 = {
    "titulo": "Módulo 13: Circuitos RL, LC, RLC y CA",
    "color": "#65a30d",
    "icono": "electric_meter",
    "descripcionCorta": "Respuesta transitoria y en estado estacionario senoidal, oscilaciones electromagnéticas, fasores y resonancia",
    "subtemas": [
        "Circuito RL: constantes de tiempo τ = L/R y análisis transitorio de conexión y desconexión",
        "Circuito LC: oscilaciones electromagnéticas armónicas y conservación de la energía",
        "Circuito RLC en serie: regímenes subamortiguado, críticamente amortiguado y sobreamortiguado",
        "Corriente alterna senoidal: fasores, relaciones de fase entre corriente y voltaje",
        "Reactancia inductiva XL, reactancia capacitiva XC e impedancia compleja Z",
        "Resonancia eléctrica, factor de calidad Q y ancho de banda en filtros pasivos",
        "Potencia instantánea, potencia activa P, potencia reactiva Q y factor de potencia"
    ],
    "lecciones": [
        {
            "id": "m13-l1",
            "tipo": "multivideo",
            "recurso": "2HxTt0Kl8KM|NHhK6RHFB4c|L4fTVV7mMBc|8p82v2_KYVQ|j-JK4GVv6BA|mFTfzQFdSJ8|SLFi1M0j2To",
            "titulo": "1. Teoría y Deducción: Circuitos Transitorios y Corriente Alterna",
            "descripcion": "Ecuaciones diferenciales de segundo orden, analogía mecánica del oscilador y formulación fasorial en régimen senoidal.",
            "xp": 10
        },
        {
            "id": "m13-l2",
            "tipo": "presentacion",
            "recurso": "./player.html?clase=12",
            "titulo": "2. Diapositivas de Apoyo Magistral",
            "descripcion": "Diagramas fasoriales animados, curvas de resonancia en frecuencia y cálculo de impedancias equivalentes.",
            "xp": 15
        },
        {
            "id": "m13-g1",
            "tipo": "grupo",
            "titulo": "3. Laboratorio Virtual (Simuladores)",
            "sublecciones": [
                {
                    "id": "m13-s1",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M12_OsciladorLC.html",
                    "titulo": "3.1 Oscilador LC: Conservación de Energía",
                    "descripcion": "Visualiza el intercambio continuo entre energía electrostática en C y energía magnética en L.",
                    "xp": 20
                },
                {
                    "id": "m13-s2",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M12_RLC.html",
                    "titulo": "3.2 Curvas de Resonancia y Factor Q en RLC",
                    "descripcion": "Modifica amortiguamiento y frecuencia para analizar la selectividad del circuito resonante.",
                    "xp": 20
                },
                {
                    "id": "m13-s3",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M12_Fasores.html",
                    "titulo": "3.3 Calculador Fasorial Dinámico",
                    "descripcion": "Representación vectorial en el plano complejo de corrientes y tensiones en corriente alterna.",
                    "xp": 20
                }
            ]
        },
        {
            "id": "m13-j1",
            "tipo": "juego",
            "recurso": "juegos/Juego_12.html",
            "titulo": "4. Physics Quest — Circuitos CA",
            "descripcion": "Sintoniza el circuito RLC a la frecuencia de resonancia y maximiza la potencia útil. ¡5 desafíos!",
            "xp": 25,
            "logro": { "id": "logro_m13", "nombre": "Maestro de la Resonancia", "icono": "graphic_eq" }
        },
        {
            "id": "m13-l7",
            "tipo": "ejercicio",
            "recurso": "talleres/Taller_12_Circuitos_CA.html",
            "titulo": "5. Taller Práctico No. 12 — Circuitos RLC y Corriente Alterna",
            "descripcion": "Problemas de régimen transitorio, análisis de impedancia compleja, factor de potencia y diseño de filtros.",
            "xp": 30
        },
        {
            "id": "m13-q1",
            "tipo": "quiz",
            "recurso": "Examen/Quiz_Adaptativo_12.html",
            "titulo": "6. Quiz Adaptativo — Módulo 13",
            "descripcion": "Evaluación cognitiva en 3 niveles: reactancia y fase, oscilaciones LC amortiguadas y resonancia en CA.",
            "xp": 40
        },
        {
            "id": "m13-eval",
            "tipo": "quiz",
            "recurso": "Examen/Cuestionario_11_Inductancia.html",
            "titulo": "7. Evaluación Sumativa — Inductancia y Circuitos de CA",
            "descripcion": "Cuestionario oficial de acreditación sobre regímenes transitorios y alternos.",
            "xp": 50
        },
        {
            "id": "m13-nb1",
            "tipo": "notebooklm",
            "llmLink": "https://notebooklm.google.com/notebook/37622815-4b54-4808-b770-37464cb05719",
            "titulo": "8. Asistente IA (NotebookLM) — Circuitos CA",
            "descripcion": "Consulta dudas analíticas sobre transformadas en régimen permanente senoidal, corrección del factor de potencia y resonancia.",
            "xp": 10
        },
        {
            "id": "m13-e1",
            "tipo": "referencias",
            "titulo": "9. Repositorio Documental y Referencias",
            "descripcion": "Textos y manuales sobre análisis de circuitos en corriente alterna y señales senoidales.",
            "xp": 10,
            "secciones": [
                {
                    "tituloSeccion": "Libros Universitarios de Referencia",
                    "links": [
                        { "url": "https://openstax.org/books/university-physics-volume-2/pages/14-1-mutual-inductance", "titulo": "OpenStax: Inductancia y Circuitos AC — Cap. 14–15", "descripcion": "Tratamiento completo de inductancia, RLC, corriente alterna y transformadores." },
                        { "url": "https://www.amazon.com/dp/0073380679", "titulo": "Hayt: Análisis de Circuitos en Ingeniería", "descripcion": "Capítulos fundamentales sobre fasores, potencia compleja y redes de CA." },
                        { "url": "https://www.amazon.com/dp/0132116056", "titulo": "Nilsson & Riedel: Circuitos Eléctricos", "descripcion": "Análisis riguroso de respuesta en frecuencia y resonancia RLC." }
                    ]
                },
                {
                    "tituloSeccion": "Recursos Web y Manuales Técnicos",
                    "links": [
                        { "url": "https://www.allaboutcircuits.com/textbook/alternating-current/", "titulo": "All About Circuits: Alternating Current", "descripcion": "Guía conceptual de CA con diagramas fasoriales y diseño de filtros pasivos." },
                        { "url": "https://www.electronics-tutorials.ws/accircuits/ac-resistance.html", "titulo": "Electronics Tutorials: Circuitos de CA", "descripcion": "Impedancia, reactancias y resonancia explicadas visualmente." }
                    ]
                },
                {
                    "tituloSeccion": "Simuladores Interactivos",
                    "links": [
                        { "url": "https://phet.colorado.edu/es/simulations/circuit-construction-kit-ac", "titulo": "PhET: Kit de Circuitos AC", "descripcion": "Laboratorio interactivo para construir circuitos RLC en tiempo real." },
                        { "url": "https://www.falstad.com/circuit/", "titulo": "Falstad: Osciloscopio y Filtros AC", "descripcion": "Simulador dinámico con trazado de respuesta en frecuencia y curvas de Bode." }
                    ]
                }
            ]
        }
    ]
};
