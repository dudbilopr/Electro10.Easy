// modulos/modulo3.js — Electrostática: Potencial Eléctrico
// NOTEBOOKLM: Asistente IA para trabajo electrostático, gradientes y superficies equipotenciales
export const modulo3 = {
    "titulo": "Módulo 3: Electrostática - Potencial Eléctrico",
    "color": "#d97706",
    "icono": "bolt",
    "descripcionCorta": "Energía potencial eléctrica, potencial electrostático escalar, gradiente y superficies equipotenciales",
    "subtemas": [
        "Fuerza electrostática como campo conservativo y función de energía potencial",
        "Diferencia de potencial electrostático y definición del Voltio",
        "Potencial eléctrico de cargas puntuales y principio de superposición escalar",
        "Cálculo del campo eléctrico a partir del gradiente del potencial (E = -∇V)",
        "Topología y propiedades de las superficies equipotenciales",
        "Energía electrostática requerida para ensamblar una distribución de carga",
        "Comportamiento de conductores en equilibrio electrostático (volumen equipotencial)"
    ],
    "lecciones": [
        {
            "id": "m3-l1",
            "tipo": "multivideo",
            "recurso": "Klavo8gWKdY|_JRXyGSnT5o|o-5079Lk0Y8|3hBEZTL_F7Y|dA9NyRuYlyA|rf2F8kRQtls|wdghLg094w8",
            "titulo": "1. Teoría: Trabajo, Energía y Potencial Eléctrico",
            "descripcion": "Deducción rigurosa de la integral de línea de campo, energía potencial electrostática y cálculo del potencial escalar.",
            "xp": 10
        },
        {
            "id": "m3-l2",
            "tipo": "presentacion",
            "recurso": "./player.html?clase=3",
            "titulo": "2. Diapositivas Interactivas — Potencial Eléctrico",
            "descripcion": "Superficies equipotenciales animadas, relación E-V en 3D y ejemplos resueltos de cálculo integral.",
            "xp": 15
        },
        {
            "id": "m3-g1",
            "tipo": "grupo",
            "titulo": "3. Laboratorio Virtual (Simuladores)",
            "sublecciones": [
                {
                    "id": "m3-s1",
                    "tipo": "simulador",
                    "recurso": "simuladores/Potencial_Electrico.html",
                    "titulo": "3.1 Analizador de Potencial Escalar y Gradiente",
                    "descripcion": "Mapa topográfico 2D del potencial eléctrico generado por configuraciones de carga arbitrarias.",
                    "xp": 20
                },
                {
                    "id": "m3-s2",
                    "tipo": "simulador",
                    "recurso": "simuladores/Potencial_Electrico_2.html",
                    "titulo": "3.2 Trazador de Superficies Equipotenciales",
                    "descripcion": "Dibuja líneas equipotenciales continuas y calcula las líneas ortogonales del campo eléctrico.",
                    "xp": 20
                },
                {
                    "id": "m3-s3",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M4_Potencial_3D.html",
                    "titulo": "3.3 Visualizador 3D de Pozos y Barreras de Potencial",
                    "descripcion": "Modelo tridimensional del relieve de potencial para visualizar la aceleración de partículas.",
                    "xp": 20
                }
            ]
        },
        {
            "id": "m3-l7",
            "tipo": "ejercicio",
            "recurso": "talleres/Taller_3_Potencial_Electrico.html",
            "titulo": "4. Taller Práctico No. 3 — Potencial Eléctrico",
            "descripcion": "Problemas de nivel universitario sobre trabajo de fuerzas eléctricas, potenciales de esferas y gradientes.",
            "xp": 30
        },
        {
            "id": "m3-desafio",
            "tipo": "desafio",
            "recurso": "desafios/desafio.html?m=3",
            "titulo": "5. Desafío Integral de Maestría (3 Fases)",
            "descripcion": "Ruta formativa unificada: 1. Calentamiento Conceptual ➔ 2. Misión Interactiva Physics Quest ➔ 3. Certificación Cuantitativa.",
            "xp": 100,
            "logro": { "id": "logro_m3", "nombre": "Explorador de Superficies", "icono": "terrain" }
        },
        {
            "id": "m3-nb1",
            "tipo": "notebooklm",
            "llmLink": "https://notebooklm.google.com/notebook/37622815-4b54-4808-b770-37464cb05719",
            "titulo": "6. Asistente IA (NotebookLM) — Potencial Eléctrico",
            "descripcion": "Consulta deducciones de energía electrostática y relación diferencial entre campo y potencial.",
            "xp": 10
        },
        {
            "id": "m3-e1",
            "tipo": "referencias",
            "titulo": "7. Repositorio Documental y Referencias",
            "descripcion": "Fuentes sobre teoría de potencial electrostático y energía.",
            "xp": 10,
            "secciones": [
                {
                    "tituloSeccion": "Libros Universitarios de Referencia",
                    "links": [
                        { "url": "https://openstax.org/books/university-physics-volume-2/pages/7-1-electric-potential-energy", "titulo": "OpenStax: Electric Potential Energy & Potential — Cap. 7", "descripcion": "Desarrollo formal del potencial eléctrico con ejemplos." },
                        { "url": "https://www.amazon.com/dp/0321971174", "titulo": "Griffiths: Introduction to Electrodynamics — Cap. 2.3", "descripcion": "Potencial electrostático con rigor matemático y condiciones de frontera." },
                        { "url": "https://www.fisicalab.com/apartado/potencial-electrico", "titulo": "Fisicalab: Potencial Eléctrico", "descripcion": "Teoría y problemas con gráficas claras de equipotenciales." }
                    ]
                }
            ]
        }
    ]
};
