// modulos/modulo9.js — Ley de Biot-Savart
// 📓 NOTEBOOKLM: Reemplaza "#" en llmLink con tu link real
export const modulo9 = {
    "titulo": "Módulo 9: Ley de Biot-Savart",
    "color": "#9333ea",
    "icono": "radio_button_checked",
    "descripcionCorta": "Campo magnético creado por corrientes eléctricas",
    "subtemas": ["Ley de Biot-Savart — formulación diferencial","Campo de un hilo conductor infinito","Campo en el centro de una espira circular","Campo del eje de una espira","Solenoides y toroides (precursor de Ampere)","Fuerzas entre conductores paralelos","Definición del Ampere"],
    "lecciones": [
        { "id":"m9-l1","tipo":"multivideo","recurso":"PPnDdEkH5rI|RiCBQJWz0Hs|J0eZkUQrRHY|V0x_kQovAUA|8kU8YyNOanE","titulo":"1. Videos — Biot-Savart","descripcion":"Cálculo del campo magnético de hilos, espiras y solenoides paso a paso.","xp":10 },
        { "id":"m9-l2","tipo":"presentacion","recurso":"./player.html?clase=8","titulo":"2. Diapositivas Interactivas","descripcion":"Visualización 3D del campo magnético de distintas geometrías de conductor.","xp":15 },
        { "id":"m9-g1","tipo":"grupo","titulo":"3. Laboratorio Virtual",
          "sublecciones":[
            { "id":"m9-s1","tipo":"simulador","recurso":"simuladores/Sim_M8_BiotSavart_Anillo.html","titulo":"3.1 Campo de Anillo con Corriente","descripcion":"Campo magnético en el eje de una espira circular.","xp":20 },
            { "id":"m9-s2","tipo":"simulador","recurso":"simuladores/Sim_M8_BiotSavart_Anillo.html","titulo":"3.2 Campo de Arco de Corriente","descripcion":"Contribución de arcos parciales al campo total.","xp":20 },
            { "id":"m9-s3","tipo":"simulador","recurso":"simuladores/Sim_M8_BiotSavart_Hilo.html","titulo":"3.3 Campo de Conductor Recto","descripcion":"Campo magnético de un hilo conductor de longitud finita e infinita.","xp":20 }
          ]
        },
        { "id":"m9-j1","tipo":"juego","recurso":"juegos/Juego_8.html","titulo":"4. Physics Quest — Biot-Savart","descripcion":"¡Construye el electroimán perfecto! Elige geometría y corriente para alcanzar el campo objetivo.","xp":25,"logro":{"id":"logro_m9","nombre":"Arquitecto Magnético","icono":"🧲"} },
        { "id":"m9-l7","tipo":"ejercicio","recurso":"talleres/Taller_8_Biot_Savart.html","titulo":"5. Taller Práctico — Biot-Savart","descripcion":"Cálculo del campo magnético de hilos, arcos, espiras y solenoides finitos.","xp":30 },
        { "id":"m9-q1","tipo":"quiz","recurso":"Examen/Quiz_Adaptativo_8.html","titulo":"6. Quiz Adaptativo — Módulo 9","descripcion":"Evalúa desde la dirección de B hasta cálculos integrales de Biot-Savart.","xp":40 },
        { "id":"m9-nb1","tipo":"notebooklm",
          // 📓 NOTEBOOKLM MÓDULO 9: Reemplaza "#" con tu link
          "llmLink": "#",
          "titulo": "8. NotebookLLM — Biot-Savart","descripcion":"IA para Biot-Savart: integración vectorial, geometrías y comparación con Ampere.","xp":10 },
        { "id":"m9-e1","tipo":"referencias","titulo": "9. Referencias Bibliográficas","descripcion":"Fuentes sobre la Ley de Biot-Savart y campo magnético de corrientes.","xp":10,
          "secciones":[
            { "tituloSeccion":"📘 Libros de texto","links":[
                { "url":"https://openstax.org/books/university-physics-volume-2/pages/12-1-the-biot-savart-law","titulo":"OpenStax: Ley de Biot-Savart — Cap. 12","descripcion":"Derivación y aplicaciones a geometrías estándar." },
                { "url":"https://www.amazon.com/dp/0321971174","titulo":"Griffiths — Electrodynamics Cap. 5.2","descripcion":"Ley de Biot-Savart con rigor matemático." }
            ]},
            { "tituloSeccion":"🌐 Recursos web","links":[
                { "url":"https://www.fisicalab.com/apartado/ley-de-biot-savart","titulo":"Fisicalab: Biot-Savart","descripcion":"Explicación con ejemplos resueltos." },
                { "url":"https://www.khanacademy.org/science/ap-physics-2/ap-magnetic-forces-and-magnetic-fields/electric-current-ap/v/magnetic-field-created-by-a-current","titulo":"Khan Academy: Campo de Corriente","descripcion":"Videos y práctica guiada." }
            ]},
            { "tituloSeccion":"🔬 Simuladores externos","links":[
                { "url":"https://www.geogebra.org/m/mfkHRdKy","titulo":"GeoGebra: Biot-Savart Interactivo","descripcion":"Visualiza el campo de conductores con forma libre." }
            ]}
          ]
        }
    ]
};
