// modulos/modulo1.js — Electrostática: Ley de Coulomb
// NOTEBOOKLM: Asistente IA para deducciones vectoriales y resolución analítica
export const modulo1 = {
    "titulo": "Módulo 1: Electrostática - Ley de Coulomb",
    "color": "#0284c7",
    "icono": "electric_bolt",
    "descripcionCorta": "Cuantización de la carga eléctrica, polarización y fuerza electrostática vectorial",
    "subtemas": [
        "Naturaleza atómica de la carga eléctrica y principio de conservación",
        "Cuantización de la carga y el experimento de Millikan",
        "Conductores, aislantes y polarización dieléctrica",
        "Formulación escalar de la Ley de Coulomb",
        "Formulación vectorial rigurosa de la Ley de Coulomb",
        "Principio de superposición lineal para distribuciones discretas",
        "Equilibrio electrostático en configuraciones de cargas puntuales"
    ],
    "lecciones": [
        {
            "id": "m1-l1",
            "tipo": "multivideo",
            "recurso": "xLyRPFL0GJ8|mrCyjv9lf3I|HpHVmuQb1gM|YgP-9fVA0-Y|gigeloLe1jI|ph341nhqOII|tXschFCgjrY|q1Ez2tLVy10|EhCX3JR6mHQ|8FXllt2Z9Tk|a1M2OmlwGyc|_hgOrdi7Epw",
            "titulo": "1. Videos: carga eléctrica y ley de Coulomb",
            "descripcion": "Doce videos verificados: carga y electrización (canal physics.10easy), ley de Coulomb, forma vectorial y superposición con tres y cuatro cargas.",
            "xp": 10,
            "titulosRecursos": [
                {"titulo": "1.1 Que es la carga eléctrica", "canal": "physics.10easy"},
                {"titulo": "1.2 Tipos de Electrización", "canal": "physics.10easy"},
                {"titulo": "2.1 Ley de Coulomb", "canal": "physics.10easy"},
                {"titulo": "2.2 Ley de Coulomb: Ejemplo 2", "canal": "physics.10easy"},
                {"titulo": "▶️Ley de Coulomb (4 cargas sobre un Rectángulo) 👉 Como calcular la fuerza resultante sobre una carga", "canal": "Vitual"},
                {"titulo": "Como calcular la fuerza resultante con 3 cargas -  Ley de Coulomb/Fuerza eléctrica", "canal": "Física para todos"},
                {"titulo": "Cuatro Cargas en un rectángulo (Ley de Coulomb)", "canal": "FIS- MAT"},
                {"titulo": "LEY DE COULOMB (Cuatro cargas puntuales - una solución simple) | Ejercicio 3", "canal": "IngE Darwin"},
                {"titulo": "03. Ley de Coulomb forma vectorial-ejercicio", "canal": "espiral ciencias"},
                {"titulo": "02. Ley de Coulomb-forma vectorial", "canal": "espiral ciencias"},
                {"titulo": "Electrostatica ley de coulomb 3 cargas", "canal": "LA GUÍA DEL MAESTRO"},
                {"titulo": "Fuerza de repulsión entre dos esferas cargadas", "canal": "LA GUÍA DEL MAESTRO"}
            ]
        },
        {
            "id": "m1-l2",
            "tipo": "presentacion",
            "recurso": "./player.html?clase=1",
            "titulo": "2. Clase interactiva: ley de Coulomb",
            "descripcion": "14 diapositivas: predicción, carga cuantizada y conservada, F(r), superposición en el plano y eje de simetría en siete pasos (dos caminos cada una), péndulos, balanza de torsión, árbol de decisión, CoulombLab, mapa de conceptos, glosario y PDF.",
            "xp": 15
        },
        {
            "id": "m1-g1",
            "tipo": "grupo",
            "titulo": "3. Laboratorio Virtual (Simuladores)",
            "sublecciones": [
                {
                    "id": "m1-l3",
                    "tipo": "simulador",
                    "recurso": "simuladores/Coulomb.html",
                    "titulo": "3.1 CoulombLab · Fuerzas entre cargas",
                    "descripcion": "Dibuja cargas y fuerzas, predice y comprueba; el resultado de «Comprobar» queda en tu seguimiento.",
                    "xp": 20
                },
                {
                    "id": "m1-l4",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M1_Cargas.html",
                    "titulo": "3.2 Superposición y diagrama de cuerpo libre",
                    "descripcion": "Entorno complementario para experimentar atracción y repulsión con varias cargas.",
                    "xp": 20
                },
                {
                    "id": "m1-l5",
                    "tipo": "simulador",
                    "recurso": "simuladores/Sim_M1_Coulomb_Pro.html",
                    "titulo": "3.3 Laboratorio de superposición vectorial",
                    "descripcion": "Arreglos bidimensionales de cargas y componentes cartesianas de la fuerza resultante.",
                    "xp": 20
                }
            ]
        },
        {
            "id": "m1-g2",
            "tipo": "grupo",
            "titulo": "4. Taller No. 1 y guía de estudio",
            "sublecciones": [
                {
                    "id": "m1-l7",
                    "tipo": "ejercicio",
                    "recurso": "talleres/Taller_1_Ley_de_Coulomb.html",
                    "titulo": "4.1 Taller (web, con comprobador)",
                    "descripcion": "El taller único del capítulo: 8 ejercicios resueltos (cuatro por dos caminos), 12 retos por niveles, teoría, Python y hoja de entrega. Es el mismo del PDF.",
                    "xp": 30
                },
                {
                    "id": "m1-l8",
                    "tipo": "ejercicio",
                    "recurso": "presentaciones/M1_Coulomb/recursos/Cap01_Taller_Coulomb.pdf",
                    "titulo": "4.2 El mismo taller en PDF",
                    "descripcion": "Versión imprimible, idéntica a la web, con códigos QR a la clase y a CoulombLab.",
                    "xp": 10
                },
                {
                    "id": "m1-l9",
                    "tipo": "ejercicio",
                    "recurso": "presentaciones/M1_Coulomb/recursos/Cap01_Guia_Coulomb.pdf",
                    "titulo": "4.3 Guía de estudio (PDF)",
                    "descripcion": "Ideas clave, fórmulas, errores comunes, autoevaluación con respuestas, conectores, glosario y bibliografía.",
                    "xp": 15
                }
            ]
        },
        {
            "id": "m1-juego",
            "tipo": "juego",
            "recurso": "juegos/Juego_1.html",
            "titulo": "5. Juego: Charge Wars",
            "descripcion": "Cambia tu carga neta en zonas de fricción y esquiva o atrae partículas: 5 niveles y 25 conceptos de electrostática.",
            "xp": 20
        },
        {
            "id": "m1-desafio",
            "tipo": "desafio",
            "recurso": "desafios/desafio.html?m=1",
            "titulo": "6. Desafío Integral (3 fases)",
            "descripcion": "Calentamiento conceptual (35 %), misión interactiva (35 %) y certificación (30 %): 14 preguntas de 10 tipos con retroalimentación y certificado.",
            "xp": 100,
            "logro": { "id": "logro_m1", "nombre": "Maestro de Cargas", "icono": "bolt" }
        },
        {
            "id": "m1-g3",
            "tipo": "grupo",
            "titulo": "7. Lámina y modelo 3D",
            "sublecciones": [
                {
                    "id": "m1-lam",
                    "tipo": "lamina",
                    "recurso": "laminas/M1_Coulomb.html",
                    "titulo": "7.1 Póster: el inverso del cuadrado",
                    "descripcion": "Lámina A3 interactiva del capítulo: carga, 1/r², superposición, eje de simetría, balanza de torsión e historia.",
                    "xp": 10
                },
                {
                    "id": "m1-3d",
                    "tipo": "lamina",
                    "recurso": "recursos/modelos_3d/M01_CoulombBench.html",
                    "titulo": "7.2 Pieza 3D: CoulombBench (balanza de torsión)",
                    "descripcion": "Modelo paramétrico OpenSCAD para imprimir, medidas, impresión y protocolo para comprobar F ∝ 1/r² en el aula.",
                    "xp": 10
                }
            ]
        },
        {
            "id": "m1-nb1",
            "tipo": "notebooklm",
            "llmLink": "https://notebooklm.google.com/notebook/37622815-4b54-4808-b770-37464cb05719",
            "titulo": "8. Asistente IA (NotebookLM) — Ley de Coulomb",
            "descripcion": "Consulta dudas teóricas, solicita derivaciones paso a paso y valida ejercicios con el modelo de lenguaje curado.",
            "xp": 10
        },
        {
            "id": "m1-e1",
            "tipo": "referencias",
            "titulo": "9. Repositorio documental y referencias",
            "descripcion": "Textos de referencia, artículos y herramientas de cálculo.",
            "xp": 10,
            "secciones": [
                {
                    "tituloSeccion": "Libros Universitarios de Referencia",
                    "links": [
                        { "url": "https://openstax.org/books/university-physics-volume-2/pages/5-1-electric-charge", "titulo": "OpenStax: Electric Charge & Coulomb's Law", "descripcion": "Texto abierto de física universitaria con deducciones paso a paso." },
                        { "url": "https://www.amazon.com/dp/0321971174", "titulo": "Griffiths: Introduction to Electrodynamics — Cap. 2", "descripcion": "Tratamiento formal del electromagnetismo clásico." },
                        { "url": "https://www.fisicalab.com/apartado/ley-de-coulomb", "titulo": "Fisicalab: Ley de Coulomb", "descripcion": "Explicación didáctica con representaciones gráficas y problemas resueltos." }
                    ]
                },
                {
                    "tituloSeccion": "Simuladores y Laboratorios Externos",
                    "links": [
                        { "url": "https://phet.colorado.edu/es/simulations/coulombs-law", "titulo": "PhET: Ley de Coulomb Interactiva", "descripcion": "Simulador de la Universidad de Colorado para visualizar la fuerza electrostática en tiempo real." }
                    ]
                }
            ]
        }
    ]
};
