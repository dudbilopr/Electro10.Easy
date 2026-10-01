// modulos/modulo10.js — Ley de Ampere
// 📓 NOTEBOOKLM: Reemplaza "#" en llmLink con tu link real
export const modulo10 = {
    "titulo": "Módulo 10: Ley de Ampere",
    "color": "#0d9488",
    "icono": "loop",
    "descripcionCorta": "Circulación del campo magnético y corriente de desplazamiento",
    "subtemas": ["Ley de Ampere — formulación integral","Caminos amperianos y simetría","Campo en solenoides infinitos","Campo en toroides","Solenoides finitos","Corriente de desplazamiento (Maxwell)","Ley de Ampere-Maxwell generalizada"],
    "lecciones": [
        { "id":"m10-l1","tipo":"multivideo","recurso":"6mHK7by6WJc|mIPnkZPFAa8|aEFn-JY_h8A|4DYjxBRjYbc|K7-PiHoJ3v0","titulo":"1. Videos — Ley de Ampere","descripcion":"Circulación del campo magnético, solenoides, toroides y corriente de desplazamiento.","xp":10 },
        { "id":"m10-l2","tipo":"presentacion","recurso":"./player.html?clase=9","titulo":"2. Diapositivas Interactivas","descripcion":"Caminos amperianos con simetría cilíndrica y toroidal. Corriente de desplazamiento animada.","xp":15 },
        { "id":"m10-g1","tipo":"grupo","titulo":"3. Laboratorio Virtual",
          "sublecciones":[
            { "id":"m10-s1","tipo":"simulador","recurso":"simuladores/Sim_M9_Solenoide.html","titulo":"3.1 Solenoide Interactivo","descripcion":"Campo magnético dentro y fuera de solenoides con Ampere.","xp":20 },
            { "id":"m10-s2","tipo":"simulador","recurso":"simuladores/Sim_M9_Tabla_Ampere.html","titulo":"3.2 Tabla Ampere Interactiva","descripcion":"Selecciona la geometría y aplica la Ley de Ampere automáticamente.","xp":20 }
          ]
        },
        { "id":"m10-j1","tipo":"juego","recurso":"juegos/Juego_9.html","titulo":"4. Physics Quest — Ley de Ampere","descripcion":"Elige el camino amperiano correcto y calcula el campo. ¡5 geometrías distintas!","xp":25,"logro":{"id":"logro_m10","nombre":"Maestro Amperiano","icono":"🔄"} },
        { "id":"m10-l7","tipo":"ejercicio","recurso":"talleres/Taller_9_Ley_de_Ampere.html","titulo":"5. Taller Práctico — Ley de Ampere","descripcion":"Problemas de solenoides, toroides, conductores coaxiales y campo toroidal.","xp":30 },
        { "id":"m10-q1","tipo":"quiz","recurso":"Examen/Quiz_Adaptativo_9.html","titulo":"6. Quiz Adaptativo — Módulo 10","descripcion":"Evalúa desde el concepto de circulación hasta aplicaciones con corriente de desplazamiento.","xp":40 },
        { "id":"m10-eval","tipo":"quiz","recurso":"Examen/Cuestionario_9_Ley_de_Ampere.html","titulo":"7. Evaluación Sumativa — Ley de Ampere","descripcion":"Cuestionario oficial de evaluación de la ley de Ampere y sus aplicaciones.","xp":50 },
        { "id":"m10-nb1","tipo":"notebooklm",
          // 📓 NOTEBOOKLM MÓDULO 10: Reemplaza "#" con tu link
          "llmLink": "#",
          "titulo": "8. NotebookLLM — Ley de Ampere","descripcion":"IA para Ampere: cómo elegir el camino amperiano, comparación con Gauss y generalización de Maxwell.","xp":10 },
        { "id":"m10-e1","tipo":"referencias","titulo": "9. Referencias Bibliográficas","descripcion":"Fuentes académicas sobre la Ley de Ampere y sus generalizaciones.","xp":10,
          "secciones":[
            { "tituloSeccion":"📘 Libros de texto","links":[
                { "url":"https://openstax.org/books/university-physics-volume-2/pages/13-1-the-biot-savart-law","titulo":"OpenStax: Ley de Ampere — Cap. 13","descripcion":"Solenoides, toroides y corriente de desplazamiento." },
                { "url":"https://www.amazon.com/dp/0321971174","titulo":"Griffiths — Electrodynamics Cap. 5.3","descripcion":"Ley de Ampere rigurosa con problemas." }
            ]},
            { "tituloSeccion":"🌐 Recursos web","links":[
                { "url":"https://www.fisicalab.com/apartado/ley-de-ampere","titulo":"Fisicalab: Ley de Ampere","descripcion":"Simetría, solenoides y ejemplos." },
                { "url":"https://www.khanacademy.org/science/ap-physics-2/ap-magnetic-forces-and-magnetic-fields/ap-magnetic-field-from-currents/v/amperes-law","titulo":"Khan Academy: Ley de Ampere","descripcion":"Introducción conceptual con practice." }
            ]},
            { "tituloSeccion":"🔬 Simuladores externos","links":[
                { "url":"https://phet.colorado.edu/es/simulations/faradays-law","titulo":"PhET: Campo de Solenoides","descripcion":"Explora el campo magnético en solenoides." }
            ]}
          ]
        }
    ]
};
