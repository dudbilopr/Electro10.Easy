// modulos/modulo10.js — Ley de Ampere
// Asistente IA para circulación magnética, caminos amperianos y corriente de desplazamiento
export const modulo10 = {
    "titulo": "Módulo 10: Ley de Ampère",
    "color": "#0d9488",
    "icono": "loop",
    "descripcionCorta": "Circulación del campo magnético, simetrías amperianas y la corriente de desplazamiento de Maxwell",
    "subtemas": [
        "Ley de Ampere: formulación integral rigurosa y producto escalar B·dl",
        "Selección estratégica de caminos amperianos y análisis de simetrías",
        "Campo magnético en solenoides ideales y reales",
        "Campo magnético en toroides y bobinas toroidales",
        "Conductores coaxiales y corrientes distribuidas volumétricamente",
        "Inconsistencia de la ley de Ampere para campos variables y corriente de desplazamiento",
        "Ley de Ampere-Maxwell generalizada"
    ],
    "lecciones": [
        {
            "id": "m10-l1",
            "tipo": "multivideo",
            "recurso": "xdvfJ57NjJU|BK1NBJWo6kk|Nat546C-4DQ|cd7ctZkropg|-6V1cGWhZYI|4c_h8tEVeVA|rPWQSPng6cw|nbB1QnbruVA|Z_7YJFfT7pE|BSLYSE1rDB4|FqUfRYC_TmI",
            "titulo": "1. Videos: Ley de Ampère",
            "descripcion": "Once videos verificados: la ley y la regla de la mano derecha, conductor grueso, cable coaxial, solenoide y toroide, con ejercicios resueltos.",
            "xp": 10,
            "titulosRecursos": [
                {"titulo": "LEY DE AMPERE y REGLA DE LA MANO DERECHA", "canal": "La Constante Universal"},
                {"titulo": "Ley de Ampere - explicación", "canal": "Mayken Espinoza"},
                {"titulo": "Clase N°17 Física II Ley de Ampere POSTA", "canal": "Física II - UTN FRBA"},
                {"titulo": "Aplicación de la ley de Ampère a un cable grueso", "canal": "ceroentropia"},
                {"titulo": "414 Aplicaciones de la Ley de Ampère (cable coaxial y demostración de campo de un conductor recto)", "canal": "JOSE GABRIEL BONOMI CASAS"},
                {"titulo": "Ley de AMPERE CAMPO MAGNETICO de CABLE COAXIAL", "canal": "Ingeniosos"},
                {"titulo": "5.9 Ley de Ampere - Campo creado por un solenoide", "canal": "FísicaLab EPN"},
                {"titulo": "LEY DE AMPÈRE - Campo magnético al interior de un solenoide y en un cable con densidad de corriente", "canal": "Física Clara University"},
                {"titulo": "Ejercicio Electromagnetismo. Ley de Ampere 6 ( Caso: solenoide)", "canal": "Clases de Física de Jonh Bucanero"},
                {"titulo": "5.10 Ley de Ampere - Campo creado por un solenoide toroidal", "canal": "FísicaLab EPN"},
                {"titulo": "24. Ley de Ampere. Campo en un Toroide. Ejercicios Resueltos - TinTutor.", "canal": "Tin Tutor (Martin)"}
            ]
        },
        {
            "id": "m10-l2",
            "tipo": "presentacion",
            "recurso": "./player.html?clase=10",
            "titulo": "2. Clase interactiva: Ley de Ampère",
            "descripcion": "13 diapositivas con simulaciones, retos con valores nuevos, árbol de decisión Ampère o Biot–Savart, mapa de conceptos, glosario y PDF descargable.",
            "xp": 15
        },
        {
            "id": "m10-g1",
            "tipo": "grupo",
            "titulo": "3. Laboratorio Virtual (Simuladores)",
            "sublecciones": [
                {
                    "id": "m10-s1",
                    "tipo": "simulador",
                    "recurso": "simuladores/Ampere.html#circulacion",
                    "titulo": "3.1 AmpèreLab · Circulación",
                    "descripcion": "Mueve hilos y deforma el camino (incluso a mano): la circulación solo depende de la corriente encerrada. Mira cómo se acumula la suma de B·dℓ.",
                    "xp": 20
                },
                {
                    "id": "m10-s2",
                    "tipo": "simulador",
                    "recurso": "simuladores/Ampere.html#conductor",
                    "titulo": "3.2 AmpèreLab · Conductor macizo, hueco y coaxial",
                    "descripcion": "Arrastra el camino amperiano desde el eje hacia fuera y predice cómo cambia B(r) en cada región.",
                    "xp": 20
                },
                {
                    "id": "m10-s3",
                    "tipo": "simulador",
                    "recurso": "simuladores/Ampere.html#solenoide",
                    "titulo": "3.3 AmpèreLab · Solenoide real e ideal",
                    "descripcion": "Compara el campo de un solenoide finito con μ₀nI en el centro, en las bocas y fuera.",
                    "xp": 20
                },
                {
                    "id": "m10-s4",
                    "tipo": "simulador",
                    "recurso": "simuladores/Ampere.html#toroide",
                    "titulo": "3.4 AmpèreLab · Toroide",
                    "descripcion": "Campo en el agujero, en el núcleo y fuera del toroide, con la gráfica B(r).",
                    "xp": 20
                }
            ]
        },
        {
            "id": "m10-g2",
            "tipo": "grupo",
            "titulo": "4. Taller No. 10 — Ley de Ampère",
            "sublecciones": [
                {
                    "id": "m10-l7",
                    "tipo": "ejercicio",
                    "recurso": "presentaciones/M10_Ampere/recursos/Cap10_Taller_Ampere.pdf",
                    "titulo": "4.1 Taller (PDF)",
                    "descripcion": "7 ejercicios resueltos, 14 retos por niveles, preguntas de teoría, dos programas de Python y códigos QR al simulador.",
                    "xp": 30
                },
                {
                    "id": "m10-l8",
                    "tipo": "ejercicio",
                    "recurso": "presentaciones/M10_Ampere/recursos/Cap10_Guia_Ampere.pdf",
                    "titulo": "4.2 Guía de estudio (PDF)",
                    "descripcion": "Ideas clave, fórmulas, errores comunes, autoevaluación con respuestas, conectores de conceptos, glosario y bibliografía.",
                    "xp": 15
                },
                {
                    "id": "m10-l9",
                    "tipo": "ejercicio",
                    "recurso": "talleres/Taller_10_Ley_de_Ampere.html",
                    "titulo": "4.3 Taller de práctica (versión web)",
                    "descripcion": "Problemas de solenoides, toroides y cables coaxiales con densidades volumétricas de corriente.",
                    "xp": 20
                }
            ]
        },
        {
            "id": "m10-desafio",
            "tipo": "desafio",
            "recurso": "desafios/desafio.html?m=10",
            "titulo": "5. Desafío Integral de Maestría (3 Fases)",
            "descripcion": "Ruta formativa unificada: 1. Calentamiento Conceptual ➔ 2. Misión Interactiva Physics Quest ➔ 3. Certificación Cuantitativa.",
            "xp": 100,
            "logro": { "id": "logro_m10", "nombre": "Guardián de la Circulación", "icono": "all_inclusive" }
        },
        {
            "id": "m10-nb1",
            "tipo": "notebooklm",
            "llmLink": "https://notebooklm.google.com/notebook/37622815-4b54-4808-b770-37464cb05719",
            "titulo": "6. Asistente IA (NotebookLM) — Ley de Ampere",
            "descripcion": "Consulta cómo seleccionar el camino amperiano, comparación con la ley de Gauss y demostración de la corriente de desplazamiento.",
            "xp": 10
        },
        {
            "id": "m10-e1",
            "tipo": "referencias",
            "titulo": "7. Repositorio Documental y Referencias",
            "descripcion": "Fuentes académicas sobre la ley de Ampere, magnetostática y corrección de Maxwell.",
            "xp": 10,
            "secciones": [
                {
                    "tituloSeccion": "Libros Universitarios de Referencia",
                    "links": [
                        { "url": "https://openstax.org/books/university-physics-volume-2/pages/12-3-amperes-law", "titulo": "OpenStax: Ley de Ampere — Cap. 12", "descripcion": "Solenoides, toroides y corriente de desplazamiento." },
                        { "url": "https://www.amazon.com/dp/0321971174", "titulo": "Griffiths: Introduction to Electrodynamics — Cap. 5.3", "descripcion": "Ley de Ampere rigurosa y aplicaciones formales." }
                    ]
                },
                {
                    "tituloSeccion": "Recursos Web y Clases Magistrales",
                    "links": [
                        { "url": "https://www.fisicalab.com/apartado/ley-de-ampere", "titulo": "Fisicalab: Ley de Ampere", "descripcion": "Simetría, solenoides y ejemplos prácticos resueltos." },
                        { "url": "https://es.khanacademy.org/science/physics/magnetic-forces-and-magnetic-fields", "titulo": "Khan Academy: Ley de Ampere", "descripcion": "Introducción conceptual con práctica interactiva." }
                    ]
                },
                {
                    "tituloSeccion": "Simuladores Interactivos",
                    "links": [
                        { "url": "https://phet.colorado.edu/es/simulations/faradays-law", "titulo": "PhET: Campo en Solenoides", "descripcion": "Explora el campo magnético en bobinas y solenoides en tiempo real." }
                    ]
                }
            ]
        }
    ]
};
