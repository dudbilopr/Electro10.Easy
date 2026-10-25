// Prueba automatizada del capítulo 4 (Distribuciones Continuas de Carga):
// Master Deck 16:9 (14 diapositivas, .stp de 7 pasos, KaTeX, canvas, mapa mental SVG),
// Taller 4 espejo 1:1, Guía LaTeX 4 páginas, ContinuousDistLab y telemetría m4_*.
const fs = require('fs');
const path = require('path');

let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  FALLA:', m); } };

console.log('=== INICIANDO VALIDACIÓN ESTÁTICA Y ESTRUCTURAL DE MÓDULO 4 ===');

const baseDir = path.resolve(__dirname, '..');

// Cuenta páginas de un PDF (soporta streams FlateDecode comprimidos).
function countPages(buf) {
  const zlib = require('zlib');
  const s = buf.toString('latin1');
  let n = (s.match(/\/Type\s*\/Page[^s]/g) || []).length;
  if (n > 0) return n;
  const re = /stream\r?\n([\s\S]*?)endstream/g;
  let m, total = 0;
  while ((m = re.exec(s)) !== null) {
    try {
      const raw = Buffer.from(m[1].replace(/^\s+|\s+$/g, ''), 'latin1');
      let inf; try { inf = zlib.inflateSync(raw); } catch (e) { inf = zlib.inflateRawSync(raw); }
      total += (inf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
    } catch (e) {}
  }
  return total;
}

// 1. Existencia de los 8 componentes canónicos y archivos de soporte
const files = [
  'presentaciones/M4_DistribucionesContinuas/index.html',
  'talleres/Taller_4_Distribuciones_de_Carga_Continua.html',
  'recursos/Cap04_Guia.pdf',
  'recursos/Cap04_Taller.pdf',
  'simuladores/ContinuousDistLab.html',
  'desafios/bancos/m4.js',
  'laminas/M4_DistribucionesContinuas.html',
  'recursos/modelos_3d/M04_DistribucionGeometria.scad',
  'recursos/modelos_3d/M04_DistribucionGeometria.stl',
  'recursos/modelos_3d/M04_DistribucionGeometria.png',
  'recursos/modelos_3d/M04_DistribucionGeometria.html',
  'modulos/modulo4.js',
  'desafios/desafio.html',
  'desafios/integral.html',
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

// 2. Master Deck 16:9
const deckPath = path.join(baseDir, 'presentaciones/M4_DistribucionesContinuas/index.html');
if (fs.existsSync(deckPath)) {
  const deckContent = fs.readFileSync(deckPath, 'utf8');
  ok(!deckContent.includes('UNAB'), 'Deck no menciona a la UNAB');
  ok(deckContent.includes('katex@0.16.9'), 'Deck carga KaTeX 0.16.9');
  ok(deckContent.includes('ContinuousDistLab'), 'Deck referencia a ContinuousDistLab');
  ok(deckContent.includes('window.__c4'), 'Deck exporta el objeto global __c4');
  ok(deckContent.includes('data-stp'), 'Deck incluye el componente .stp de 7 pasos');
  ok((deckContent.match(/class="stp-p"/g) || []).length >= 14, 'Deck tiene al menos 14 pasos .stp (2 bloques x 7)');
  ok(deckContent.includes('sim-canvas'), 'Deck incluye canvas interactivo');
  ok(deckContent.includes('cmap-4'), 'Deck incluye mapa mental SVG');
  ok(deckContent.includes('Camino A') && deckContent.includes('Camino B'), 'Deck presenta el doble camino analítico');
}

// 3. Taller 4 (espejo 1:1)
const tallerPath = path.join(baseDir, 'talleres/Taller_4_Distribuciones_de_Carga_Continua.html');
if (fs.existsSync(tallerPath)) {
  const tallerContent = fs.readFileSync(tallerPath, 'utf8');
  ok(!tallerContent.includes('UNAB'), 'Taller no menciona a la UNAB');
  ok(tallerContent.includes('Cap04_Taller.pdf'), 'Taller referencia a Cap04_Taller.pdf');
  ok(tallerContent.includes('ContinuousDistLab'), 'Taller referencia a ContinuousDistLab');
}

// 4. Guía y Taller LaTeX → Validación de macros y páginas
const guiaTexPath4 = path.join(baseDir, '.design/fase5/M04/M04_Guia.tex');
const tallerTexPath4 = path.join(baseDir, '.design/fase5/M04/Taller_4.tex');
if (fs.existsSync(guiaTexPath4)) {
  const gTex = fs.readFileSync(guiaTexPath4, 'utf8');
  ok(gTex.includes('\\ePortada'), 'M04 Guía usa banner oficial \\ePortada');
  ok(gTex.includes('\\begin{eClave}'), 'M04 Guía usa cajas tcolorbox eClave');
  ok(gTex.includes('\\begin{eError}'), 'M04 Guía usa cajas tcolorbox eError');
  ok(!gTex.includes('\\fcolorbox{plasmaViolet}'), 'M04 Guía erradica tablas crudas fcolorbox');
}
if (fs.existsSync(tallerTexPath4)) {
  const tTex = fs.readFileSync(tallerTexPath4, 'utf8');
  ok(tTex.includes('\\ePortada'), 'Taller 4 usa banner oficial \\ePortada');
  ok(tTex.includes('\\begin{eResuelto}'), 'Taller 4 usa cajas tcolorbox eResuelto');
  ok(tTex.includes('\\begin{eReto}'), 'Taller 4 usa cajas tcolorbox eReto');
  ok(!tTex.includes('\\newcommand{\\prob}'), 'Taller 4 no define comandos ad-hoc \\prob');
}
const guiaPath = path.join(baseDir, 'recursos/Cap04_Guia.pdf');
if (fs.existsSync(guiaPath)) {
  const nPages = countPages(fs.readFileSync(guiaPath));
  ok(nPages === 4, `Guía PDF tiene 4 páginas exactas (detectadas: ${nPages})`);
}
const tallerPathPdf = path.join(baseDir, 'recursos/Cap04_Taller.pdf');
ok(fs.existsSync(tallerPathPdf), 'Cap04_Taller.pdf existe en recursos/');

// 5. Banco de Desafío Integral
const bancoPath = path.join(baseDir, 'desafios/bancos/m4.js');
if (fs.existsSync(bancoPath)) {
  const bancoContent = fs.readFileSync(bancoPath, 'utf8');
  ok(bancoContent.includes('modulo: 4'), 'Banco registra módulo 4');
  ok(bancoContent.includes('Calentamiento conceptual'), 'Banco incluye fase 1 conceptual');
  ok(bancoContent.includes('ContinuousDistLab'), 'Banco referencia ContinuousDistLab');
  const tipos = ['mc', 'num', 'dir', 'orden', 'pares', 'huecos', 'limite', 'grafica', 'error', 'mision', 'ajuste'];
  const presentes = tipos.filter(t => bancoContent.includes(`tipo: '${t}'`));
  ok(presentes.length >= 10, `Banco usa al menos 10 tipos de pregunta (${presentes.length}): ${presentes.join(', ')}`);
  const dch = fs.readFileSync(path.join(baseDir, 'desafios/desafio.html'), 'utf8');
  ok(/\[1,\s*2,\s*3,\s*4/.test(dch), 'desafio.html redirige el módulo 4 al motor integral');
}

// 6. Simulador ContinuousDistLab
const simPath = path.join(baseDir, 'simuladores/ContinuousDistLab.html');
if (fs.existsSync(simPath)) {
  const simContent = fs.readFileSync(simPath, 'utf8');
  const escenas = ['varilla', 'anillo', 'disco', 'plano'];
  ok(escenas.every(s => simContent.includes(`data-scene="${s}"`)), 'Simulador contiene las 4 escenas (varilla, anillo, disco, plano)');
  ok(simContent.includes('tokens.css'), 'Simulador utiliza tokens.css');
  ok(simContent.includes('SIM_TELEMETRY'), 'Simulador emite telemetría SIM_TELEMETRY');
  ok(simContent.includes('m4_') , 'Simulador usa códigos de error m4_*');
  ok(!simContent.includes('UNAB'), 'Simulador no menciona a la UNAB');
}

// 7. Lámina infográfica
const lamPath = path.join(baseDir, 'laminas/M4_DistribucionesContinuas.html');
if (fs.existsSync(lamPath)) {
  const lamContent = fs.readFileSync(lamPath, 'utf8');
  ok(/Distribuciones\s+Continuas/i.test(lamContent), 'Lámina contiene el título del capítulo');
  ok(lamContent.includes('tokens.css'), 'Lámina utiliza tokens.css');
  ok(!lamContent.includes('UNAB'), 'Lámina no menciona a la UNAB');
}

// 8. Modelo 3D (STL compilado real)
const stlPath = path.join(baseDir, 'recursos/modelos_3d/M04_DistribucionGeometria.stl');
if (fs.existsSync(stlPath)) {
  const stlStat = fs.statSync(stlPath);
  ok(stlStat.size > 100000, `STL compilado tiene tamaño realista (${(stlStat.size / 1024 / 1024).toFixed(2)} MB)`);
  ok(fs.readFileSync(stlPath, 'utf8').trimStart().startsWith('solid'), 'STL es un archivo ASCII válido');
}

// 9. Telemetría m4_* en seguimiento.js
const segPath = path.join(baseDir, 'js/seguimiento.js');
if (fs.existsSync(segPath)) {
  const segContent = fs.readFileSync(segPath, 'utf8');
  ['m4_dq_densidad', 'm4_distancia_r', 'm4_cancelacion', 'm4_plano_infinito_disco', 'm4_varilla_infinita', 'm4_limite_z_R'].forEach(c => {
    ok(segContent.includes(c), `seguimiento.js registra el error ${c}`);
  });
  ok(segContent.includes('ContinuousDistLab: \'ContinuousDistLab\''), 'seguimiento.js mapea ContinuousDistLab en LABS');
}

console.log(`\n=== RESUMEN: ${pass} PASADAS, ${fail} FALLAS ===\n`);
if (fail > 0) process.exit(1);
