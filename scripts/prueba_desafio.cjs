// Prueba del Desafío Integral (motor + banco): `node scripts/prueba_desafio.cjs [m] [carpeta_capturas]`, con servidor en :8080.
const puppeteer = require('puppeteer');
const path = require('path');
const M = process.argv[2] || '1', OUT = process.argv[3] || null;
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  FALLA:', m); } };

async function responder(pg, bien) {
  return pg.evaluate(async (bien) => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const st = window.__desafio.st, f = window.DESAFIO.fases[st.f], q = f.preguntas[st.q], $ = (s) => document.querySelector(s), all = (s) => [...document.querySelectorAll(s)];
    const t = q.tipo;
    if (t === 'mc' || t === 'limite') { const i = q._ops.findIndex((o) => !!o.ok === bien); all('#qbody .op')[i].click(); }
    else if (t === 'dir') $(`#qbody [data-k="${bien ? q.ok : 'SE'}"]`).click();
    else if (t === 'pares') q.izq.forEach((_, i) => { $(`[data-l="${i}"]`).click(); $(`[data-r="${bien ? i : (i + 1) % q.izq.length}"]`).click(); });
    else if (t === 'huecos') all('#qbody select').forEach((s) => { s.value = bien ? '0' : '1'; });
    else if (t === 'orden') { if (bien) for (let g = 0; g < 60; g++) { const it = all('.order .it'), k = it.findIndex((x, j) => +x.dataset.i !== j); if (k < 0) break; const want = it.findIndex((x) => +x.dataset.i === k); document.querySelector(`[data-u="${want}"]`).click(); await wait(20); } }
    else if (t === 'error') $(`#qbody [data-i="${bien ? q.mala : 0}"]`).click();
    else if (t === 'grafica') all('#qbody .op')[q.ops.findIndex((o) => !!o.ok === bien)].click();
    else if (t === 'num') $('#num-in').value = String(bien ? q.ans : q.ans * 1.4).replace('.', ',');
    else if (t === 'mision' || t === 'ajuste') window.__mision.set(bien ? q.ok : q.ok + 0.08);
    $('#btn-ck').click(); await wait(80);
    const fb = $('#fb'), cls = fb.className, txt = fb.textContent, kerr = document.querySelectorAll('.katex-error').length;
    return { id: q.id, tipo: t, ok: cls.includes('ok'), txt: txt.slice(0, 80), kerr, len: txt.length };
  }, bien);
}

(async () => {
  const br = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'], userDataDir: require('os').tmpdir() + '/e10_desafio_' + process.pid });
  const pg = await br.newPage(); const errs = [];
  pg.on('pageerror', (e) => errs.push(e.message));
  await pg.setViewport({ width: 1100, height: 900 });
  await pg.goto(`http://localhost:8080/desafios/desafio.html?m=${M}`, { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1200));
  ok(pg.url().includes('integral.html'), 'desafio.html no redirige al motor: ' + pg.url());
  await pg.evaluate(() => localStorage.clear()); await pg.reload({ waitUntil: 'networkidle2' }); await new Promise((r) => setTimeout(r, 1000));
  const tipos = new Set(); let n = 0, shot = 0;
  for (let guard = 0; guard < 60; guard++) {
    const where = await pg.evaluate(() => (document.querySelector('.cert') ? 'cert' : document.querySelector('#btn-f') ? 'fase' : 'q'));
    if (where === 'cert') break;
    if (where === 'fase') { await pg.click('#btn-f'); await new Promise((r) => setTimeout(r, 200)); continue; }
    // La primera respuesta de cada tipo se prueba también mal, en una copia de la pregunta, antes de responderla bien.
    const r = await responder(pg, true); n++; tipos.add(r.tipo === 'ajuste' ? 'mision' : r.tipo);
    ok(r.ok, `pregunta ${r.id} (${r.tipo}) no aceptó la respuesta correcta: ${r.txt}`);
    ok(r.kerr === 0, `KaTeX con errores en ${r.id}`); ok(r.len > 40, `retroalimentación corta en ${r.id}`);
    if (OUT && shot < 4 && ['dir', 'pares', 'mision', 'orden'].includes(r.tipo)) { shot++; await pg.screenshot({ path: path.join(OUT, `desafio_${r.tipo}.png`), fullPage: true }); }
    await pg.click('#btn-next'); await new Promise((r) => setTimeout(r, 150));
  }
  const nota = await pg.evaluate(() => window.__nota);
  ok(Math.abs(nota - 100) < 1e-6, 'nota con todo bien: ' + nota);
  ok(tipos.size === 10, 'tipos de pregunta: ' + [...tipos].join(','));
  if (OUT) await pg.screenshot({ path: path.join(OUT, 'desafio_cert.png'), fullPage: true });
  // Respuestas erróneas: retroalimentación formativa y nota menor
  await pg.evaluate(() => localStorage.clear()); await pg.reload({ waitUntil: 'networkidle2' }); await new Promise((r) => setTimeout(r, 1000));
  let malos = 0;
  for (let guard = 0; guard < 60; guard++) {
    const where = await pg.evaluate(() => (document.querySelector('.cert') ? 'cert' : document.querySelector('#btn-f') ? 'fase' : 'q'));
    if (where === 'cert') break;
    if (where === 'fase') { await pg.click('#btn-f'); await new Promise((r) => setTimeout(r, 200)); continue; }
    const r = await responder(pg, false); if (!r.ok) malos++; else console.log('  aviso: respuesta errónea aceptada en', r.id, r.tipo);
    ok(!r.ok, `pregunta ${r.id} aceptó una respuesta errónea`);
    await pg.click('#btn-next'); await new Promise((r) => setTimeout(r, 120));
  }
  const nota2 = await pg.evaluate(() => window.__nota);
  ok(nota2 === 0, 'nota con todo mal: ' + nota2);
  await pg.setViewport({ width: 390, height: 844 }); await new Promise((r) => setTimeout(r, 300));
  const sw = await pg.evaluate(() => document.documentElement.scrollWidth); ok(sw <= 392, 'desborde horizontal en móvil: ' + sw);
  ok(errs.length === 0, 'errores de JavaScript: ' + errs.join(' | '));
  await br.close();
  console.log(`Desafío m=${M}: ${n} preguntas, ${pass}/${pass + fail} comprobaciones correctas`);
  process.exit(fail ? 1 : 0);
})();
