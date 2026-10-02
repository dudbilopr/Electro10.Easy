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
            "recurso": "PPnDdEkH5rI|RiCBQJWz0Hs|J0eZkUQrRHY|V0x_kQovAUA|8kU8YyNOanE",
            "titulo": "1. Teoría y Deducción: Ley de Biot-Savart",
            "descripcion": "Cálculo analítico del campo magnético producido por hilos, espiras y arreglos espaciales de corriente.",
            "xp": 10
        },
        {
            "id": "m9-l2",
            "tipo": "presentacion",
            "recurso": "./player.html?clase=8",
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
                    "id": "m9-s1",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M8_BiotSavart_Anillo.html",
                    "titulo": "3.1 Campo Magnético en el Eje de una Espira Circular",
                    "descripcion": "Análisis en tiempo real de la distribución axial del campo generado por espiras circulares.",
                    "xp": 20
                },
                {
                    "id": "m9-s2",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M8_BiotSavart_Hilo.html",
                    "titulo": "3.2 Campo Magnético de Conductor Rectilíneo",
                    "descripcion": "Estudio cuantitativo del campo para conductores finitos e infinitos según la distancia radial.",
                    "xp": 20
                }
            ]
        },
        {
            "id": "m9-j1",
            "tipo": "juego",
            "recurso": "juegos/Juego_8.html",
            "titulo": "4. Physics Quest — Biot-Savart",
            "descripcion": "Construye la configuración óptima de corriente para alcanzar los vectores objetivo de campo magnético. ¡5 misiones!",
            "xp": 25,
            "logro": { "id": "logro_m9", "nombre": "Arquitecto Magnético", "icono": "stream" }
        },
        {
            "id": "m9-l7",
            "tipo": "ejercicio",
            "recurso": "talleres/Taller_8_Biot_Savart.html",
            "titulo": "5. Taller Práctico No. 8 — Ley de Biot-Savart",
            "descripcion": "Cálculo analítico del campo magnético en hilos, arcos circulares, espiras y bobinas de Helmholtz.",
            "xp": 30
        },
        {
            "id": "m9-q1",
            "tipo": "quiz",
            "recurso": "Examen/Quiz_Adaptativo_8.html",
            "titulo": "6. Quiz Adaptativo — Módulo 9",
            "descripcion": "Evaluación formativa progresiva: regla de la mano derecha, cálculo diferencial e integrales de corriente.",
            "xp": 40
        },
        {
            "id": "m9-eval",
            "tipo": "quiz",
            "recurso": "Examen/Cuestionario_8_Campo_Magnetico.html",
            "titulo": "7. Evaluación Sumativa — Biot-Savart y Campo Magnético",
            "descripcion": "Cuestionario oficial de acreditación sobre fuentes de campo magnético y análisis diferencial.",
            "xp": 50
        },
        {
            "id": "m9-nb1",
            "tipo": "notebooklm",
            "llmLink": "https://notebooklm.google.com/notebook/37622815-4b54-4808-b770-37464cb05719",
            "titulo": "8. Asistente IA (NotebookLM) — Biot-Savart",
            "descripcion": "Consulta paso a paso integrales de Biot-Savart, simetrías cilíndricas y comparación analítica con Ampere.",
            "xp": 10
        },
        {
            "id": "m9-e1",
            "tipo": "referencias",
            "titulo": "9. Repositorio Documental y Referencias",
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
