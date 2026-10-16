// modulos/modulo8.js — Ley de Lorentz y Campo Magnético
// Asistente IA para Fuerza Magnética, Trayectorias de Partículas y Aplicaciones Electrodinámicas
export const modulo8 = {
    "titulo": "Módulo 8: Ley de Lorentz y Campo Magnético",
    "color": "#ea580c",
    "icono": "north",
    "descripcionCorta": "Fuerza magnética sobre cargas y conductores, trayectorias helicoidales, ciclotrón y efecto Hall",
    "subtemas": [
        "Campo magnético B, líneas de inducción y ausencia de monopolos (∇·B = 0)",
        "Fuerza de Lorentz completa F = q(E + v×B) y producto vectorial en 3D",
        "Regla de la mano derecha, trabajo nulo (W = 0) y conservación de energía cinética",
        "Movimiento circular uniforme de partículas cargadas y radio de giro R = mv⊥/(|q|B)",
        "Frecuencia angular de ciclotrón, período y su independencia de la rapidez",
        "Movimiento helicoidal en el espacio 3D, botellas magnéticas y cinturones de van Allen",
        "Selector de velocidades de Wien (v = E/B) y espectrómetro de masas de Bainbridge",
        "Fuerza magnética sobre conductores con corriente F = I(L×B) y elemento diferencial dF = I(dl×B)",
        "Momento dipolar magnético de espiras μ = I A, torque magnético τ = μ×B y energía U = -μ·B",
        "Efecto Hall: voltaje transversal ΔV_H, determinación de portadores y sensores magnéticos"
    ],
    "conceptosClave": [
        "Fuerza de Lorentz",
        "Campo Magnético B",
        "Producto Vectorial",
        "Regla de la Mano Derecha",
        "Radio de Giro",
        "Frecuencia de Ciclotrón",
        "Trayectoria Helicoidal",
        "Selector de Velocidades",
        "Espectrómetro de Masas",
        "Fuerza sobre Corrientes",
        "Momento Dipolar Magnético",
        "Torque Magnético",
        "Efecto Hall",
        "Gauss Magnético (∇·B = 0)"
    ],
    "ecuaciones": [
        "$$\\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B})$$",
        "$$R = \\frac{m v_\\perp}{|q| B}, \\quad \\omega_c = \\frac{|q| B}{m}, \\quad T = \\frac{2\\pi m}{|q| B}$$",
        "$$p = v_\\parallel T = \\frac{2\\pi m v_\\parallel}{|q| B} \\quad \\text{(Paso de la trayectoria helicoidal)}$$",
        "$$v = \\frac{E}{B} \\quad \\text{(Condición de paso sin desviación en el selector de velocidades)}$$",
        "$$\\vec{F} = I(\\vec{L} \\times \\vec{B}), \\quad d\\vec{F} = I(d\\vec{l} \\times \\vec{B})$$",
        "$$\\vec{\\tau} = \\vec{\\mu} \\times \\vec{B}, \\quad U = -\\vec{\\mu} \\cdot \\vec{B}, \\quad \\vec{\\mu} = N I \\vec{A}$$",
        "$$\\Delta V_H = \\frac{I B}{n q d} = R_H \\frac{I B}{d} \\quad \\text{(Voltaje de Hall transversal)}$$"
    ],
    "historia": {
        "experimentoClave": "Fundamentación de la Fuerza Magnética y el Efecto Hall (1820 - 1895)",
        "hallazgo": "Hans Christian Ørsted (1820) descubrió experimentalmente que las corrientes eléctricas desvían las agujas magnéticas. Hendrik Antoon Lorentz (1895) unificó las interacciones eléctrica y magnética sobre cargas puntuales móviles. Edwin Hall (1879) probó de manera irrefutable que los portadores de corriente en conductores metálicos son cargas negativas libres (electrones)."
    },
    "bibliografia": [
        "Sears, F. W., Zemansky, M. W., Young, H. D., & Freedman, R. A. Física Universitaria con Física Moderna (Vol. 2), Cap. 27: Campo Magnético y Fuerzas Magnéticas.",
        "Griffiths, D. J. Introduction to Electrodynamics (4th ed.), Cap. 5: Magnetostatics & The Lorentz Force Law.",
        "Halliday, D., Resnick, R., & Walker, J. Fundamentos de Física (Vol. 2), Cap. 28: Campos Magnéticos.",
        "Serway, R. A., & Jewett, J. W. Física para Ciencias e Ingeniería (Vol. 2), Cap. 29: Campos Magnéticos y Fuerza de Lorentz."
    ],
    "lecciones": [
        {
            "id": "m8-l1",
            "tipo": "multivideo",
            "recurso": "9_p7MUf8QCE|YXA_F7qHiDM|LqT1VX18kEk|hBUpBwbmBwc|OsZRKqHrOTw|sLHNkl2TYOE",
            "titulo": "1. Teoría y Deducción: Ley de Lorentz y Campo B",
            "descripcion": "Fuerza magnética sobre cargas móviles, regla de la mano derecha, trayectorias circulares, selector de velocidades y efecto Hall.",
            "llmLink": "https://notebooklm.google.com/notebook/490fdd69-c932-4486-9866-e68a80ae92da",
            "xp": 10
        },
        {
            "id": "m8-l2",
            "tipo": "presentacion",
            "recurso": "./player.html?clase=modulo8",
            "titulo": "2. Diapositivas Pedagógicas — Fuerza de Lorentz y Electrodinámica",
            "descripcion": "Diapositivas detalladas con ejercicios resueltos paso a paso: producto cruz vectorial, frecuencia de ciclotrón, conductores con corriente y motores DC, selector de Wien, espectrómetro y laboratorio 3D con tips de examen.",
            "llmLink": "https://notebooklm.google.com/notebook/490fdd69-c932-4486-9866-e68a80ae92da",
            "xp": 15
        },
        {
            "id": "m8-g1",
            "tipo": "grupo",
            "titulo": "3. Laboratorio Virtual (Simuladores Científicos)",
            "sublecciones": [
                {
                    "id": "m8-s1",
                    "tipo": "simulador",
                    "recurso": "simuladores/LorentzLab10easy.html",
                    "titulo": "3.1 LorentzLab10.easy — Laboratorio 3D de Fuerza de Lorentz",
                    "descripcion": "Controla velocidad v, carga q y campo vectorial B en tiempo real. Analiza trayectorias helicoidales, radios de giro y desarrollo analítico paso a paso.",
                    "llmLink": "https://notebooklm.google.com/notebook/490fdd69-c932-4486-9866-e68a80ae92da",
                    "xp": 25
                },
                {
                    "id": "m8-s2",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M10_FEM_Movimiento.html",
                    "titulo": "3.2 Fuerza sobre Conductor y FEM por Movimiento",
                    "descripcion": "Visualiza la acción de la fuerza magnética F = I(L×B) y la generación de fuerza electromotriz inducida en conductores móviles.",
                    "xp": 20
                },
                {
                    "id": "m8-s3",
                    "tipo": "simulador",
                    "recurso": "https://phet.colorado.edu/sims/html/charges-and-fields/latest/charges-and-fields_es.html",
                    "titulo": "3.3 PhET: Dinámica de Cargas y Líneas de Campo",
                    "descripcion": "Simulador de la Universidad de Colorado para contrastar campos electrostáticos conservativos frente a la acción del campo magnético.",
                    "xp": 20
                },
                {
                    "id": "m8-s4",
                    "tipo": "simulador",
                    "recurso": "https://www.falstad.com/cyclotron/",
                    "titulo": "3.4 Falstad: Simulación de Ciclotrón en Tiempo Real",
                    "descripcion": "Observa la sincronización entre el período de revolución magnético y la aceleración periódica de alta frecuencia en las 'D' del ciclotrón.",
                    "xp": 20
                }
            ]
        },
        {
            "id": "m8-j1",
            "tipo": "juego",
            "recurso": "juegos/Juego_7.html",
            "titulo": "4. Physics Quest — Misión Lorentz",
            "descripcion": "Pilota partículas cargadas a través de campos magnéticos hacia el reactor cuántico objetivo. ¡5 misiones de precisión vectorial!",
            "xp": 25,
            "logro": { "id": "logro_m8", "nombre": "Piloto Cuántico", "icono": "speed" }
        },
        {
            "id": "m8-l7",
            "tipo": "ejercicio",
            "recurso": "talleres/Taller_7_Ley_de_Lorentz.html",
            "titulo": "5. Taller Práctico No. 8 — Ley de Lorentz y Trayectorias",
            "descripcion": "Resolución analítica de problemas: cálculo de radio de órbita, ciclotrones, espectrómetros de masas y fuerzas sobre conductores rectilíneos.",
            "llmLink": "https://notebooklm.google.com/notebook/490fdd69-c932-4486-9866-e68a80ae92da",
            "xp": 30
        },
        {
            "id": "m8-q1",
            "tipo": "quiz",
            "recurso": "Examen/Quiz_Adaptativo_7.html",
            "titulo": "6. Quiz Adaptativo — Módulo 8",
            "descripcion": "Evaluación formativa progresiva: regla de la mano derecha, productos vectoriales, fuerzas nulas sobre partículas en reposo y frecuencia de ciclotrón.",
            "xp": 40
        },
        {
            "id": "m8-eval",
            "tipo": "quiz",
            "recurso": "Examen/Cuestionario_8_Campo_Magnetico.html",
            "titulo": "7. Evaluación Sumativa — Campo Magnético y Lorentz",
            "descripcion": "Examen oficial de acreditación con 20 reactivos rigurosos de nivel universitario Sears-Zemansky: teoría, cálculo numérico, efecto Hall y espectrometría.",
            "xp": 50
        },
        {
            "id": "m8-nb1",
            "tipo": "notebooklm",
            "llmLink": "https://notebooklm.google.com/notebook/490fdd69-c932-4486-9866-e68a80ae92da",
            "titulo": "8. Asistente IA (NotebookLM) — Ley de Lorentz y Campo Magnético",
            "descripcion": "Tutor inteligente conectado al cuaderno de cátedra: resuelve dudas paso a paso sobre el producto cruz v×B, el selector de velocidades de Wien, la demostración de W = 0 y el efecto Hall.",
            "xp": 10
        },
        {
            "id": "m8-e1",
            "tipo": "referencias",
            "titulo": "9. Repositorio Documental y Referencias Bibliográficas",
            "descripcion": "Textos universitarios, artículos de divulgación, apuntes del MIT y simuladores de referencia sobre campo magnético y fuerza de Lorentz.",
            "xp": 10,
            "secciones": [
                {
                    "tituloSeccion": "Libros Universitarios de Referencia",
                    "links": [
                        { "url": "https://openstax.org/books/university-physics-volume-2/pages/11-1-magnetism-and-its-historical-discoveries", "titulo": "OpenStax: Magnetic Forces & Fields — Cap. 11", "descripcion": "Texto universitario de física abierta: fuerza magnética, movimiento de cargas, aplicaciones y efecto Hall." },
                        { "url": "https://www.amazon.com/dp/0321971174", "titulo": "Griffiths: Introduction to Electrodynamics — Cap. 5.1", "descripcion": "Tratamiento vectorial riguroso de la fuerza de Lorentz, trabajo magnético nulo y corrientes eléctricas." },
                        { "url": "http://hyperphysics.phy-astr.gsu.edu/hbasees/magnetic/magfor.html", "titulo": "HyperPhysics: Fuerza Magnética y Lorentz (GSU)", "descripcion": "Mapas conceptuales interactivos con calculadoras automáticas de radio de ciclotrón y fuerza magnética." }
                    ]
                },
                {
                    "tituloSeccion": "Clases Magistrales y Recursos Web",
                    "links": [
                        { "url": "https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2007/pages/class-slides/", "titulo": "MIT OCW: Physics II (8.02) — Magnetic Forces", "descripcion": "Diapositivas y lecciones magistrales del Prof. Walter Lewin sobre campos magnéticos y fuerza de Lorentz." },
                        { "url": "https://www.fisicalab.com/apartado/fuerza-magnetica", "titulo": "Fisicalab: Fuerza Magnética y Ley de Lorentz", "descripcion": "Explicación conceptual con ejercicios resueltos paso a paso y aplicación de la regla de la mano derecha." },
                        { "url": "https://es.khanacademy.org/science/ap-physics-2/ap-magnetic-forces-and-magnetic-fields", "titulo": "Khan Academy: Fuerzas y Campos Magnéticos", "descripcion": "Videos didácticos interactivos con ejercicios de práctica guiada sobre trayectorias circulares de cargas." }
                    ]
                },
                {
                    "tituloSeccion": "Simuladores Interactivos Externos",
                    "links": [
                        { "url": "https://www.falstad.com/cyclotron/", "titulo": "Falstad: Simulador del Ciclotrón", "descripcion": "Aceleración de partículas cargadas en campos cruzados con visualización en tiempo real." },
                        { "url": "https://www.geogebra.org/m/jJjFp3e8", "titulo": "GeoGebra: Fuerza de Lorentz en 3D", "descripcion": "Representación vectorial tridimensional del producto cruz v×B y la fuerza resultante." },
                        { "url": "https://phet.colorado.edu/es/simulations/charges-and-fields", "titulo": "PhET: Movimiento de Partículas en Campos", "descripcion": "Simulador dinámico de la Universidad de Colorado." }
                    ]
                }
            ]
        }
    ]
};
