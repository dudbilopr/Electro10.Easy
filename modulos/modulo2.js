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
            "recurso": "y00efYMfQbg|-c8JxTvP9zs|hqg_89-2Lyo|c1jyhvkPqqk|CBwHsuVcXUI",
            "titulo": "1. Videos: campo eléctrico",
            "descripcion": "Cinco videos verificados: definición y ejercicio (canal physics.10easy) y campo de varias cargas en una recta, un rombo y un hexágono.",
            "xp": 10,
            "titulosRecursos": [
                {"titulo": "3.1 Campo eléctrico", "canal": "physics.10easy"},
                {"titulo": "3.2 Campo eléctrico: Ejercicio 2", "canal": "physics.10easy"},
                {"titulo": "Campo eléctrico magnitud entre dos cargas puntuales", "canal": "LA GUÍA DEL MAESTRO"},
                {"titulo": "Campo eléctrico en el vértice de  un rombo", "canal": "LA GUÍA DEL MAESTRO"},
                {"titulo": "CAMPO Y POTENCIAL ELÉCTRICOS EN EL CENTRO DE UN HEXÁGONO. Ejercicio resuelto.", "canal": "física fit"}
            ]
        },
        {
            "id": "m2-l2",
            "tipo": "presentacion",
            "recurso": "./player.html?clase=2",
            "titulo": "2. Clase interactiva: campo eléctrico y dipolos",
            "descripcion": "14 diapositivas: predicción, definición con q₀ → 0, carga puntual, dipolo en su mediatriz y en su eje y dipolo en un campo uniforme en siete pasos (dos caminos cada una), carga entre placas, árbol de decisión, VectorFieldLab, mapa de conceptos, glosario y PDF.",
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
                    "recurso": "simuladores/VectorField.html#campo",
                    "titulo": "3.1 VectorFieldLab · Campo de varias cargas",
                    "descripcion": "Dibuja la dirección del campo en un punto, calcula su módulo y comprueba; el resultado queda en tu seguimiento.",
                    "xp": 20
                },
                {
                    "id": "m2-s2",
                    "tipo": "simulador",
                    "recurso": "simuladores/VectorField.html#dipolo",
                    "titulo": "3.2 VectorFieldLab · Campo de un dipolo",
                    "descripcion": "Eje y mediatriz, valor exacto frente a la aproximación 1/r³.",
                    "xp": 20
                },
                {
                    "id": "m2-s4",
                    "tipo": "simulador",
                    "recurso": "simuladores/VectorField.html#torque",
                    "titulo": "3.3 VectorFieldLab · Dipolo en un campo uniforme",
                    "descripcion": "Sentido de giro, torque y energía; suelta el dipolo y míralo oscilar.",
                    "xp": 20
                },
                {
                    "id": "m2-s5",
                    "tipo": "simulador",
                    "recurso": "simuladores/VectorField.html#haz",
                    "titulo": "3.4 VectorFieldLab · Carga entre placas",
                    "descripcion": "Electrón o protón entre placas paralelas: hacia dónde y cuánto se desvía.",
                    "xp": 20
                },
                {
                    "id": "m2-s3",
                    "tipo": "simulador",
                    "recurso": "https://phet.colorado.edu/es/simulations/charges-and-fields",
                    "titulo": "3.5 Laboratorio PhET: Cargas y Campos",
                    "descripcion": "Simulador de la Universidad de Colorado con sensores de campo eléctrico.",
                    "xp": 20
                }
            ]
        },
        {
            "id": "m2-g2",
            "tipo": "grupo",
            "titulo": "4. Taller No. 2 y guía de estudio",
            "sublecciones": [
                {
                    "id": "m2-l7",
                    "tipo": "ejercicio",
                    "recurso": "talleres/Taller_2_Campo_Electrico.html",
                    "titulo": "4.1 Taller (web, con comprobador)",
                    "descripcion": "El taller único del capítulo: 8 ejercicios resueltos (seis por dos caminos), 14 retos por niveles, teoría, Python y hoja de entrega. Es el mismo del PDF.",
                    "xp": 30
                },
                {
                    "id": "m2-l8",
                    "tipo": "ejercicio",
                    "recurso": "presentaciones/M2_CampoElectrico/recursos/Cap02_Taller.pdf",
                    "titulo": "4.2 El mismo taller en PDF",
                    "descripcion": "Versión imprimible, idéntica a la web, con códigos QR a la clase y a VectorFieldLab.",
                    "xp": 10
                },
                {
                    "id": "m2-l9",
                    "tipo": "ejercicio",
                    "recurso": "presentaciones/M2_CampoElectrico/recursos/Cap02_Guia.pdf",
                    "titulo": "4.3 Guía de estudio (PDF)",
                    "descripcion": "Ideas clave, organizador gráfico, fórmulas, errores comunes, autoevaluación con solucionario, conectores, glosario y bibliografía.",
                    "xp": 15
                }
            ]
        },
        {
            "id": "m2-juego",
            "tipo": "juego",
            "recurso": "juegos/Juego_2.html",
            "titulo": "5. Juego: Physics Quest",
            "descripcion": "Cinco rondas sobre la dirección del campo, superposición, líneas de campo y el dipolo.",
            "xp": 20
        },
        {
            "id": "m2-desafio",
            "tipo": "desafio",
            "recurso": "desafios/desafio.html?m=2",
            "titulo": "6. Desafío Integral (3 fases)",
            "descripcion": "Calentamiento conceptual (35 %), misión interactiva (35 %) y certificación (30 %): 14 preguntas de 10 tipos con retroalimentación y certificado.",
            "xp": 100,
            "logro": { "id": "logro_m2", "nombre": "Cartógrafo de Campos", "icono": "navigation" }
        },
        {
            "id": "m2-g3",
            "tipo": "grupo",
            "titulo": "7. Lámina y modelo 3D",
            "sublecciones": [
                {
                    "id": "m2-lam",
                    "tipo": "lamina",
                    "recurso": "laminas/M2_CampoElectrico.html",
                    "titulo": "7.1 Póster: el espacio alrededor de una carga",
                    "descripcion": "Lámina A3 interactiva: definición con q₀ → 0, superposición, dipolo y su caída 1/r³, torque y energía, carga entre placas e historia.",
                    "xp": 10
                },
                {
                    "id": "m2-3d",
                    "tipo": "lamina",
                    "recurso": "recursos/modelos_3d/M02_DipoloVectorial.html",
                    "titulo": "7.2 Pieza 3D: indicador vectorial de dipolo",
                    "descripcion": "Modelo paramétrico OpenSCAD para imprimir, medidas y protocolo de aula para ver el torque p × E y la orientación estable.",
                    "xp": 10
                }
            ]
        },
        {
            "id": "m2-nb1",
            "tipo": "notebooklm",
            "llmLink": "https://notebooklm.google.com/notebook/37622815-4b54-4808-b770-37464cb05719",
            "titulo": "8. Asistente IA (NotebookLM) — Campo eléctrico",
            "descripcion": "Consulta dudas matemáticas sobre divergencia, líneas de campo y dipolos con IA.",
            "xp": 10
        },
        {
            "id": "m2-e1",
            "tipo": "referencias",
            "titulo": "9. Repositorio documental y referencias",
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
