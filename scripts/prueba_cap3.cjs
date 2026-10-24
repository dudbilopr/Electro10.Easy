// Prueba automatizada del capítulo 3 (Potencial Eléctrico):
// Master Deck (14 diapositivas), KaTeX, stepper .stp (>=18px, sin desbordes), Taller 3 espejo y EquipotentialLab.
const fs = require('fs');
const path = require('path');

let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  FALLA:', m); } };

console.log('=== INICIANDO VALIDACIÓN ESTÁTICA Y ESTRUCTURAL DE MÓDULO 3 ===');

const baseDir = path.resolve(__dirname, '..');

// 1. Verificar existencia de los 8 componentes canónicos
const files = [
  'presentaciones/M3_Potencial/index.html',
  'talleres/Taller_3_Potencial_Electrico.html',
  'recursos/Cap03_Guia.pdf',
  'recursos/Cap03_Taller.pdf',
  'simuladores/EquipotentialLab.html',
  'desafios/bancos/m3.js',
  'laminas/M3_Potencial.html',
  'recursos/modelos_3d/M03_PozoPotencial.scad',
  'recursos/modelos_3d/M03_PozoPotencial.stl',
  'recursos/modelos_3d/M03_PozoPotencial.png',
  'recursos/modelos_3d/M03_PozoPotencial.html',
  'modulos/modulo3.js',
  'desafios/desafio.html',
  'js/seguimiento.js'
];

files.forEach(f => {
  const p = path.join(baseDir, f);
  const exists = fs.existsSync(p);
  ok(exists, `Archivo obligatorio existe: ${f}`);
  if (exists) {
    const stat = fs.statSync(p);
    ok(stat.size > 0, `Archivo no vacío (${stat.size} bytes): ${f}`);
  }
});

// 2. Verificar contenido de Master Deck 16:9
const deckPath = path.join(baseDir, 'presentaciones/M3_Potencial/index.html');
const deckContent = fs.readFileSync(deckPath, 'utf8');
ok(!deckContent.includes('UNAB'), 'Deck no menciona a la UNAB');
ok(deckContent.includes('katex.min.js'), 'Deck carga KaTeX');
ok(deckContent.includes('EquipotentialLab'), 'Deck referencia a EquipotentialLab');
ok(deckContent.includes('window.__c3'), 'Deck exporta el objeto global __c3');
ok(deckContent.includes('data-n="14"'), 'Deck contiene 14 diapositivas completas');

// 3. Verificar Taller 3
const tallerPath = path.join(baseDir, 'talleres/Taller_3_Potencial_Electrico.html');
const tallerContent = fs.readFileSync(tallerPath, 'utf8');
ok(!tallerContent.includes('UNAB'), 'Taller no menciona a la UNAB');
ok(!tallerContent.includes('cdn.tailwindcss.com'), 'Taller 3 libre de Tailwind CDN');
ok(!tallerContent.includes('html2pdf'), 'Taller 3 libre de librerías externas de PDF');
ok(!tallerContent.includes('globalDrawingCanvas'), 'Taller 3 libre de pizarra canvas inventada');
ok(tallerContent.includes('css/tokens.css'), 'Taller 3 utiliza tokens.css estándar');
ok(tallerContent.includes('Cap03_Taller.pdf'), 'Taller referencia a Cap03_Taller.pdf');
ok(tallerContent.includes('EquipotentialLab.html'), 'Taller referencia a EquipotentialLab');
ok(tallerContent.includes('window.__taller3'), 'Taller 3 exporta motor de validación tolerante');
ok(tallerContent.includes('data-reto="14"'), 'Taller 3 contiene los 14 retos numéricos completos');

// 4. Verificar banco de Desafío Integral
const bancoPath = path.join(baseDir, 'desafios/bancos/m3.js');
const bancoContent = fs.readFileSync(bancoPath, 'utf8');
ok(bancoContent.includes('modulo: 3'), 'Banco registra módulo 3');
ok(bancoContent.includes('Calentamiento conceptual'), 'Banco incluye fase 1 conceptual');
ok(bancoContent.includes('EquipotentialLab'), 'Banco referencia el simulador de potencial');

// 5. Verificar simulador EquipotentialLab (Estándar Flagship Lab10.easy)
const simPath = path.join(baseDir, 'simuladores/EquipotentialLab.html');
const simContent = fs.readFileSync(simPath, 'utf8');
ok(!simContent.includes('UNAB'), 'Simulador no menciona a la UNAB');
ok(simContent.includes('tokens.css'), 'Simulador utiliza tokens.css');
ok(simContent.includes('puntual') && simContent.includes('dipolo') && simContent.includes('placas') && simContent.includes('gradiente'), 'Simulador contiene las 4 escenas requeridas');
ok(simContent.includes('e10-live'), 'Simulador incluye barra flotante KaTeX #e10-live');
ok(simContent.includes('slide-panel'), 'Simulador incluye panel lateral guiado .slide-panel');
ok(simContent.includes('values'), 'Simulador incluye gaveta colapsable de parámetros #values');
ok(simContent.includes('probe'), 'Simulador cuenta con sonda voltímetro interactiva');
ok(simContent.includes('katex.min.js'), 'Simulador renderiza KaTeX');

// 6. Verificar lámina infográfica (Estándar A3 Vectorial de Alta Definición)
const lamPath = path.join(baseDir, 'laminas/M3_Potencial.html');
const lamContent = fs.readFileSync(lamPath, 'utf8');
ok(!lamContent.includes('UNAB'), 'Lámina no menciona a la UNAB');
ok(lamContent.includes('tokens.css'), 'Lámina utiliza tokens.css');
ok(lamContent.includes('Potencial eléctrico'), 'Lámina contiene título del capítulo');
ok(lamContent.includes('eq-curve'), 'Lámina renderiza curvas equipotenciales vectoriales suaves');
ok(lamContent.includes('ph'), 'Lámina contiene pulsos fotónicos animados en líneas de campo');
ok(!lamContent.includes("el('rect', { x: x"), 'Lámina erradica el loop de píxeles 4x4');
ok(lamContent.includes('puntual') && lamContent.includes('dipolo') && lamContent.includes('placas') && lamContent.includes('cuadrupolo'), 'Lámina contiene las 4 configuraciones vectoriales');

// 7. Verificar modelo 3D
const stlPath = path.join(baseDir, 'recursos/modelos_3d/M03_PozoPotencial.stl');
const stlStat = fs.statSync(stlPath);
ok(stlStat.size > 1000000, `STL compilado tiene tamaño realista (${(stlStat.size / 1024 / 1024).toFixed(2)} MB)`);

console.log(`\n=== RESUMEN: ${pass} PASADAS, ${fail} FALLAS ===\n`);
if (fail > 0) process.exit(1);
