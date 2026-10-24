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
        "$$\\Delta V_H = \\frac{I B}{n |q| t} \\quad \\text{(t: espesor en la dirección de B)}$$"
    ],
    "historia": {
        "experimentoClave": "De la brújula de Ørsted (1820) al espectrómetro de masas de Aston (1919)",
        "hallazgo": "En 1820 Hans Christian Ørsted observó que una corriente eléctrica desvía la aguja de una brújula. En 1897, en el laboratorio Cavendish, J. J. Thomson usó un campo eléctrico y otro magnético cruzados para medir la razón carga/masa del electrón. En 1919 Francis Aston, discípulo de Thomson, construyó el primero de los espectrómetros de masas. En 1958 los instrumentos del satélite Explorer I revelaron los cinturones de Van Allen: partículas cargadas atrapadas en hélices por el campo magnético terrestre. (Young y Freedman, 2009, secciones 27.1, 27.4 y 27.5.)"
    },
    "bibliografia": [
        "Young, H. D., y Freedman, R. A. (2009). Física universitaria con física moderna, vol. 2 (12.ª ed.). Pearson Educación. Capítulo 27 «Campo magnético y fuerzas magnéticas», secciones 27.1–27.9, pp. 916–944."
    ],
    "lecciones": [
        {
            "id": "m8-l1",
            "tipo": "multivideo",
            "recurso": "N_1yLphLoWQ|A8MWFEGuJXg|rp0-YdIva7o|IDVghi_IjsE|EHW5kFlU1cQ|6pqADZ3bQls|5vBIawads9Y|09ODpPKRTMs|1aZXXoKE5ac|0IDhnjX2lWA|zTqRtjjeze4|efBTzmpKvac|wvejixeN838",
            "titulo": "1. Videos: Fuerza de Lorentz",
            "descripcion": "Trece videos verificados: la fuerza sobre una carga y la regla de la mano derecha, órbitas, selector de velocidades y espectrómetro, fuerza sobre conductores, par sobre una bobina y efecto Hall.",
            "llmLink": "https://notebooklm.google.com/notebook/490fdd69-c932-4486-9866-e68a80ae92da",
            "xp": 10,
            "titulosRecursos": [
                {"titulo": "Ley de Lorentz explicación Campo magnético ejercicios", "canal": "profesor10demates"},
                {"titulo": "Ley de LORENTZ Fuerza MAGNETICA", "canal": "Ingeniosos"},
                {"titulo": "Física: Ley de Lorentz. Fuerzas magnéticas sobre cargas en movimiento - Utemvirtual Traful", "canal": "traful"},
                {"titulo": "Fuerza magnética, Ley de Lorentz", "canal": "Academia Internet"},
                {"titulo": "Campo Magnético 2 Fuerza de Lorentz", "canal": "marcos vazquez"},
                {"titulo": "Problema 9: Movimiento de partículas cargadas en un campo magnético", "canal": "Hernando Granados"},
                {"titulo": "Selector de Velocidades - Espectrómetro de Masa", "canal": "Cátedra de Física FFyB UBA"},
                {"titulo": "Fuerza Magnética Sobre Un Conductor", "canal": "Armando Aburto"},
                {"titulo": "Momento de torsión sobre una bobina", "canal": "De físico poeta y loco"},
                {"titulo": "EL EFECTO HALL, bien explicado.", "canal": "CANAL ELECTRICO"},
                {"titulo": "El Campo Electromagnético, cómo surgen las fuerzas Eléctricas y Magnéticas", "canal": "ScienceClic Español"},
                {"titulo": "¿De dónde viene el campo magnético? | Electromagnetismo", "canal": "Armónicos Esféricos"},
                {"titulo": "El Campo Magnético (Universo Mecánico 35)", "canal": "Ciencias TV"}
            ]
        },
        {
            "id": "m8-l2",
            "tipo": "presentacion",
            "recurso": "./player.html?clase=8",
            "titulo": "2. Clase interactiva: Fuerza de Lorentz",
            "descripcion": "14 diapositivas con simulaciones, deducciones en siete pasos (órbita y conductor curvo), retos con valores nuevos, árbol de decisión, mapa de conceptos, glosario y PDF descargable.",
            "llmLink": "https://notebooklm.google.com/notebook/490fdd69-c932-4486-9866-e68a80ae92da",
            "xp": 15
        },
        {
            "id": "m8-g1",
            "tipo": "grupo",
            "titulo": "3. Laboratorio Virtual (Simuladores)",
            "sublecciones": [
                {
                    "id": "m8-s1",
                    "tipo": "simulador",
                    "recurso": "simuladores/Lorentz.html#fuerza",
                    "titulo": "3.1 LorentzLab · Fuerza sobre una carga",
                    "descripcion": "Predice hacia dónde apunta la fuerza (dibújala o elige ⊙/⊗) y compruébalo; cambia el ángulo entre v y B y el signo de la carga.",
                    "xp": 20
                },
                {
                    "id": "m8-s2",
                    "tipo": "simulador",
                    "recurso": "simuladores/Lorentz.html#orbita",
                    "titulo": "3.2 LorentzLab · Órbita y hélice",
                    "descripcion": "Predice el sentido de giro y el radio; con v oblicua mira la hélice en la vista lateral.",
                    "xp": 20
                },
                {
                    "id": "m8-s3",
                    "tipo": "simulador",
                    "recurso": "simuladores/Lorentz.html#selector",
                    "titulo": "3.3 LorentzLab · Selector y espectrómetro",
                    "descripcion": "Ajusta E y B para que el haz pase y mide dónde impacta cada isótopo.",
                    "xp": 20
                },
                {
                    "id": "m8-s4",
                    "tipo": "simulador",
                    "recurso": "simuladores/Lorentz.html#conductor",
                    "titulo": "3.4 LorentzLab · Conductor y espira",
                    "descripcion": "Fuerza sobre un hilo y par sobre una bobina; suelta la espira y mira cómo se alinea con el campo.",
                    "xp": 20
                },
                {
                    "id": "m8-s5",
                    "tipo": "simulador",
                    "recurso": "simuladores/LorentzLab10easy.html",
                    "titulo": "3.5 Trayectorias en 3D",
                    "descripcion": "Vista tridimensional de la hélice de una partícula en campos eléctrico y magnético combinados.",
                    "xp": 10
                }
            ]
        },
        {
            "id": "m8-g2",
            "tipo": "grupo",
            "titulo": "4. Taller No. 8 — Fuerza de Lorentz",
            "sublecciones": [
                {
                    "id": "m8-l7",
                    "tipo": "ejercicio",
                    "recurso": "presentaciones/M8_Lorentz/recursos/Cap08_Taller_Lorentz.pdf",
                    "titulo": "4.1 Taller (PDF)",
                    "descripcion": "8 ejercicios resueltos (uno por dos caminos), 14 retos por niveles, preguntas de teoría, dos programas de Python y códigos QR al simulador.",
                    "xp": 30
                },
                {
                    "id": "m8-l8",
                    "tipo": "ejercicio",
                    "recurso": "presentaciones/M8_Lorentz/recursos/Cap08_Guia_Lorentz.pdf",
                    "titulo": "4.2 Guía de estudio (PDF)",
                    "descripcion": "Ideas clave, fórmulas, errores comunes, autoevaluación con respuestas, conectores, glosario y bibliografía.",
                    "xp": 15
                },
                {
                    "id": "m8-l9",
                    "tipo": "ejercicio",
                    "recurso": "talleres/Taller_8_Ley_de_Lorentz.html",
                    "titulo": "4.3 Taller de práctica (versión web)",
                    "descripcion": "Problemas de radio de órbita, ciclotrones, espectrómetros y fuerzas sobre conductores, con hoja de entrega.",
                    "llmLink": "https://notebooklm.google.com/notebook/490fdd69-c932-4486-9866-e68a80ae92da",
                    "xp": 20
                }
            ]
        },
        {
            "id": "m8-desafio",
            "tipo": "desafio",
            "recurso": "desafios/desafio.html?m=8",
            "titulo": "5. Desafío Integral de Maestría (3 Fases)",
            "descripcion": "Ruta formativa unificada: 1. Calentamiento Conceptual ➔ 2. Misión Interactiva Physics Quest ➔ 3. Certificación Cuantitativa.",
            "xp": 100,
            "logro": { "id": "logro_m8", "nombre": "Piloto de Lorentz", "icono": "explore" }
        },
        {
            "id": "m8-nb1",
            "tipo": "notebooklm",
            "llmLink": "https://notebooklm.google.com/notebook/490fdd69-c932-4486-9866-e68a80ae92da",
            "titulo": "6. Asistente IA (NotebookLM) — Ley de Lorentz y Campo Magnético",
            "descripcion": "Tutor inteligente conectado al cuaderno de cátedra: resuelve dudas paso a paso sobre el producto cruz v×B, el selector de velocidades de Wien, la demostración de W = 0 y el efecto Hall.",
            "xp": 10
        },
        {
            "id": "m8-e1",
            "tipo": "referencias",
            "titulo": "7. Repositorio Documental y Referencias Bibliográficas",
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
