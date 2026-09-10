// modulos/curriculo.js — Índice completo del curso (12 módulos)
import { modulo0_presaberes } from './modulo0_presaberes.js';
import { modulo1 }  from './modulo1.js';
import { modulo2 }  from './modulo2.js';
import { modulo3 }  from './modulo3.js';
import { modulo4 }  from './modulo4.js';
import { modulo5 }  from './modulo5.js';
import { modulo6 }  from './modulo6.js';

export const curriculoData = {
    "titulo": "Introducción al Electromagnetismo",
    "subtitulo": "Curso Universitario — CDAT",
    "modulos": [
        modulo0_presaberes,
        modulo1, modulo2, modulo3, modulo4,
        modulo5, modulo6
    ]
};
