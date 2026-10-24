// modulos/modulo9.js — Ley de Biot-Savart
// Asistente IA para integración vectorial, geometrías de corrientes y cálculo de B
export const modulo9 = {
    "titulo": "Módulo 9: Ley de Biot-Savart",
    "color": "#9333ea",
    "icono": "radio_button_checked",
    "descripcionCorta": "Campo magnético generado por corrientes estacionarias y elementos diferenciales de corriente",
    "subtemas": [
        "Ley de Biot-Savart: formulación diferencial rigurosa y producto vectorial",
        "Campo magnético generado por un conductor rectilíneo de longitud finita e infinita",
        "Campo magnético en el eje y centro de una espira circular con corriente",
        "Solenoides y toroides: aproximación inicial pre-amperiana",
        "Fuerza magnética entre conductores paralelos y definición del Ampere",
        "Momento dipolar magnético y torque sobre espiras",
        "Integración analítica de configuraciones mixtas de corriente"
    ],
    "lecciones": [
        {
            "id": "m9-l1",
            "tipo": "multivideo",
            "recurso": "WSDVvHvIEk4|2K2CaMUI4ts|aCPDlyQBzRg|1Fm6JrEQLXo|Sv1e2frHeeA|l56NWh-96Qc|etGr1dHQs-Q|HgOmWO05vhY",
            "titulo": "1. Videos: Ley de Biot-Savart",
            "descripcion": "Colección de clases universitarias verificadas: deducción diferencial, regla de la mano derecha, hilos finitos e infinitos, y campo en el eje de espiras.",
            "xp": 10,
            "titulosRecursos": [
                {"titulo": "Clase 10: Ley de Biot-Savart - Explicación", "canal": "espiral ciencias"},
                {"titulo": "Campo magnético creado por corrientes: Biot-Savart y Oersted", "canal": "Física Explicada"},
                {"titulo": "Explicación Ley Biot-Savart y Ejemplo de Aplicación", "canal": "Mayken Espinoza"},
                {"titulo": "Ley de Biot y Savart: Deducción y Cálculo", "canal": "Problemas de Física e Ingeniería Resueltos"},
                {"titulo": "Fuentes de Campo Magnético y Regla de la Mano Derecha", "canal": "espiral ciencias"},
                {"titulo": "La Ley de Biot-Savart en 5 minutos", "canal": "You Tec"},
                {"titulo": "Ley de Biot-Savart: Fundamentos Físicos", "canal": "INGENIARED"},
                {"titulo": "Ley de Biot & Savart paso a paso", "canal": "PEPE REPARA"}
            ]
        },
        {
            "id": "m9-l2",
            "tipo": "presentacion",
            "recurso": "./player.html?clase=9",
            "titulo": "2. Diapositivas de Apoyo Magistral",
            "descripcion": "Visualización tridimensional del campo magnético y análisis diferencial para distintas geometrías.",
            "xp": 15
        },
        {
            "id": "m9-g1",
            "tipo": "grupo",
            "titulo": "3. Laboratorio Virtual (Simuladores)",
            "sublecciones": [
                {
                    "id": "m9-s0",
                    "tipo": "simulador",
                    "recurso": "simuladores/BiotSavart.html#oersted",
                    "titulo": "3.1 BiotSavartLab · Experimento de Ørsted",
                    "descripcion": "Un hilo sobre una brújula: predice hacia dónde y cuánto gira la aguja al sumar el campo del hilo y el campo terrestre.",
                    "xp": 20
                },
                {
                    "id": "m9-s2",
                    "tipo": "simulador",
                    "recurso": "simuladores/BiotSavart.html#segmento",
                    "titulo": "3.2 BiotSavartLab · Segmento de corriente",
                    "descripcion": "Arrastra el punto P frente al centro, frente a un extremo o en la prolongación de un segmento y compara con el hilo infinito.",
                    "xp": 20
                },
                {
                    "id": "m9-s3",
                    "tipo": "simulador",
                    "recurso": "simuladores/BiotSavart.html#hilos",
                    "titulo": "3.3 BiotSavartLab · Varios hilos y fuerza entre conductores",
                    "descripcion": "Coloca hilos, dibuja tu predicción del campo en P, suma los aportes como vectores y mira las fuerzas entre conductores.",
                    "xp": 20
                },
                {
                    "id": "m9-s1",
                    "tipo": "simulador",
                    "recurso": "simuladores/BiotSavart.html#espira",
                    "titulo": "3.4 BiotSavartLab · Espira, arco y bobina",
                    "descripcion": "Campo en el eje de una espira o una bobina plana y en el centro de un arco, con la gráfica B(z) y la aproximación de dipolo.",
                    "xp": 20
                }
            ]
        },
        {
            "id": "m9-l7",
            "tipo": "ejercicio",
            "recurso": "talleres/Taller_9_Biot_Savart.html",
            "titulo": "4. Taller Práctico No. 8 — Ley de Biot-Savart",
            "descripcion": "Cálculo analítico del campo magnético en hilos, arcos circulares, espiras y bobinas de Helmholtz.",
            "xp": 30
        },
        {
            "id": "m9-desafio",
            "tipo": "desafio",
            "recurso": "desafios/desafio.html?m=9",
            "titulo": "5. Desafío Integral de Maestría (3 Fases)",
            "descripcion": "Ruta formativa unificada: 1. Calentamiento Conceptual ➔ 2. Misión Interactiva Physics Quest ➔ 3. Certificación Cuantitativa.",
            "xp": 100,
            "logro": { "id": "logro_m9", "nombre": "Navegante de Biot-Savart", "icono": "rotate_right" }
        },
        {
            "id": "m9-nb1",
            "tipo": "notebooklm",
            "llmLink": "https://notebooklm.google.com/notebook/37622815-4b54-4808-b770-37464cb05719",
            "titulo": "6. Asistente IA (NotebookLM) — Biot-Savart",
            "descripcion": "Consulta paso a paso integrales de Biot-Savart, simetrías cilíndricas y comparación analítica con Ampere.",
            "xp": 10
        },
        {
            "id": "m9-e1",
            "tipo": "referencias",
            "titulo": "7. Repositorio Documental y Referencias",
            "descripcion": "Textos universitarios, artículos formativos y simuladores sobre la Ley de Biot-Savart.",
            "xp": 10,
            "secciones": [
                {
                    "tituloSeccion": "Libros Universitarios de Referencia",
                    "links": [
                        { "url": "https://openstax.org/books/university-physics-volume-2/pages/12-1-the-biot-savart-law", "titulo": "OpenStax: Ley de Biot-Savart — Cap. 12", "descripcion": "Derivación analítica y aplicaciones a geometrías estándar de corriente." },
                        { "url": "https://www.amazon.com/dp/0321971174", "titulo": "Griffiths: Introduction to Electrodynamics — Cap. 5.2", "descripcion": "Tratamiento vectorial de la Ley de Biot-Savart y divergencia magnética." }
                    ]
                },
                {
                    "tituloSeccion": "Recursos Web y Clases Magistrales",
                    "links": [
                        { "url": "https://www.fisicalab.com/apartado/ley-de-biot-savart", "titulo": "Fisicalab: Ley de Biot-Savart", "descripcion": "Explicación conceptual con ejercicios resueltos paso a paso." },
                        { "url": "https://es.khanacademy.org/science/physics/magnetic-forces-and-magnetic-fields", "titulo": "Khan Academy: Fuentes de Campo Magnético", "descripcion": "Videos didácticos y práctica guiada." }
                    ]
                },
                {
                    "tituloSeccion": "Simuladores Interactivos",
                    "links": [
                        { "url": "https://www.geogebra.org/m/mfkHRdKy", "titulo": "GeoGebra: Biot-Savart Interactivo", "descripcion": "Visualización tridimensional del campo magnético en geometrías arbitrarias." }
                    ]
                }
            ]
        }
    ]
};
