// modulos/modulo8.js — Ley de Lorentz y Campo Magnético
// NOTEBOOKLM: Reemplaza "#" en llmLink con tu link real
export const modulo8 = {
    "titulo": "Módulo 8: Ley de Lorentz y Campo Magnético",
    "color": "#ea580c",
    "icono": "north",
    "descripcionCorta": "Fuerza magnética sobre cargas y conductores, movimiento en campo magnético",
    "subtemas": ["Campo magnético y sus fuentes","Fuerza de Lorentz F = q(E + v×B)","Movimiento circular y helicoidal de cargas","Espectrómetro de masas y ciclotrón","Fuerza sobre conductores con corriente","Momento dipolar magnético y torque","Efecto Hall"],
    "lecciones": [
        { "id":"m8-l1","tipo":"multivideo","recurso":"9_p7MUf8QCE|YXA_F7qHiDM|LqT1VX18kEk|hBUpBwbmBwc|OsZRKqHrOTw|sLHNkl2TYOE","titulo":"1. Videos — Ley de Lorentz","descripcion":"Fuerza magnética sobre cargas móviles, conductores y aplicaciones tecnológicas.","xp":10 },
        { "id":"m8-l2","tipo":"presentacion","recurso":"./player.html?clase=7","titulo":"2. Diapositivas Interactivas","descripcion":"Visualización 3D de F = qv×B con animaciones de trayectorias circulares y helicoidales.","xp":15 },
        { "id":"m8-g1","tipo":"grupo","titulo":"3. Laboratorio Virtual",
          "sublecciones":[
            { "id":"m8-s1","tipo":"simulador","recurso":"simuladores/Sim_M7_Lorentz.html","titulo":"3.1 Lab Lorentz Interactivo","descripcion":"Controla velocidad, carga y B. Observa la trayectoria helicoidal en 3D.","xp":20 },
            { "id":"m8-s2","tipo":"simulador","recurso":"simuladores/Sim_M2_Campo_Vectorial.html","titulo":"3.2 Fuerza sobre Conductor","descripcion":"Visualiza la fuerza sobre segmentos de corriente en campo magnético.","xp":20 }
          ]
        },
        { "id":"m8-j1","tipo":"juego","recurso":"juegos/Juego_7.html","titulo":"4. Physics Quest — Lorentz","descripcion":"Dirige partículas cargadas a través de campos magnéticos hacia el objetivo. ¡5 misiones!","xp":25,"logro":{"id":"logro_m8","nombre":"Piloto Cuántico","icono":"speed"} },
        { "id":"m8-l7","tipo":"ejercicio","recurso":"talleres/Taller_7_Ley_de_Lorentz.html","titulo":"5. Taller Práctico — Lorentz","descripcion":"Problemas de trayectorias en campo magnético, espectrómetros y ciclotrones.","xp":30 },
        { "id":"m8-q1","tipo":"quiz","recurso":"Examen/Quiz_Adaptativo_7.html","titulo":"6. Quiz Adaptativo — Módulo 8","descripcion":"Evalúa desde la dirección de la fuerza (regla de la mano derecha) hasta cálculos de radio de ciclotrón.","xp":40 },
        {
            "id": "m8-eval", "tipo": "quiz",
            "recurso": "Examen/Cuestionario_8_Campo_Magnetico.html",
            "titulo": "7. Evaluación Sumativa — Campo Magnético y Lorentz",
            "descripcion": "Cuestionario oficial de validación de conocimientos sobre fuerza magnética y trayectorias.",
            "xp": 50
        },
        { "id":"m8-nb1","tipo":"notebooklm",
          // NOTEBOOKLM MÓDULO 8: Reemplaza "#" con tu link
          "llmLink": "#",
          "titulo": "8. NotebookLLM — Ley de Lorentz","descripcion":"IA para Lorentz: regla de la mano derecha, movimiento circular, aplicaciones en tecnología.","xp":10 },
        { "id":"m8-e1","tipo":"referencias","titulo": "9. Referencias Bibliográficas","descripcion":"Fuentes sobre magnetostática y fuerza de Lorentz.","xp":10,
          "secciones":[
            { "tituloSeccion":"Libros de texto","links":[
                { "url":"https://openstax.org/books/university-physics-volume-2/pages/11-1-magnetism-and-its-historical-discoveries","titulo":"OpenStax: Magnetismo y Fuerza de Lorentz — Cap. 11","descripcion":"Fuerza magnética, movimiento de cargas y aplicaciones." },
                { "url":"https://www.amazon.com/dp/0321971174","titulo":"Griffiths — Electrodynamics Cap. 5.1","descripcion":"Fuerza magnética sobre cargas y corrientes." }
            ]},
            { "tituloSeccion":"Recursos web","links":[
                { "url":"https://www.fisicalab.com/apartado/fuerza-magnetica","titulo":"Fisicalab: Fuerza Magnética","descripcion":"Ley de Lorentz con ejemplos numéricos." },
                { "url":"https://www.khanacademy.org/science/ap-physics-2/ap-magnetic-forces-and-magnetic-fields","titulo":"Khan Academy: Fuerzas Magnéticas","descripcion":"Videos interactivos sobre magnetismo y Lorentz." }
            ]},
            { "tituloSeccion":"Simuladores externos","links":[
                { "url":"https://phet.colorado.edu/es/simulations/charges-and-fields","titulo":"PhET: Movimiento en Campo Magnético","descripcion":"Visualiza trayectorias de partículas cargadas." }
            ]}
          ]
        }
    ]
};
