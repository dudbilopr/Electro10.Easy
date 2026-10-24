// Captura y verificación del póster: `node scripts/captura_poster.cjs salida.png`
const puppeteer = require('puppeteer');
(async () => {
  const br = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'], userDataDir: require('os').tmpdir() + '/e10_poster_' + process.pid });
  const pg = await br.newPage(); const errs = [];
  pg.on('pageerror', (e) => errs.push(e.message));
  await pg.setViewport({ width: 1660, height: 1300 });
  await pg.goto('http://localhost:8080/laminas/M1_Coulomb.html', { waitUntil: 'networkidle2' }); await new Promise((r) => setTimeout(r, 1200));
  const r = await pg.evaluate(() => { const p = document.getElementById('poster').getBoundingClientRect(); const out = [];
    document.querySelectorAll('#poster .box, #poster .hero').forEach((b) => { if (b.scrollHeight > b.clientHeight + 2) out.push('desborde ' + (b.querySelector('h2') || b).textContent.slice(0, 30)); });
    return { kerr: document.querySelectorAll('.katex-error').length, out, w: p.width }; });
  await pg.screenshot({ path: process.argv[2], clip: { x: 0, y: 54, width: 1660, height: 1180 } });
  await pg.setViewport({ width: 390, height: 844 }); await new Promise((r) => setTimeout(r, 300));
  const sw = await pg.evaluate(() => document.documentElement.scrollWidth);
  console.log(JSON.stringify({ ...r, errs, movil: sw }));
  await br.close();
})();
