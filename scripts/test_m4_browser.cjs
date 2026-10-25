const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log('=== VERIFICANDO RENDERIZADO EN NAVEGADOR (PUPPETEER) PARA MÓDULO 4 ===');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  let totalErrors = 0;

  async function testPage(relPath, label, checksFn) {
    console.log(`\nProbando: ${label} (${relPath})`);
    const page = await browser.newPage();
    const pageErrors = [];

    page.on('pageerror', err => {
      pageErrors.push(err.message);
    });
    page.on('console', msg => {
      if (msg.type() === 'error' && !/favicon|403|404|gtag/i.test(msg.text())) {
        pageErrors.push(msg.text());
      }
    });

    const fileUrl = 'file://' + path.resolve(__dirname, '..', relPath).replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'load', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1000));

    if (checksFn) {
      await checksFn(page, pageErrors);
    }

    if (pageErrors.length > 0) {
      console.log(`  ❌ ERRORES ENCONTRADOS (${pageErrors.length}):`);
      pageErrors.forEach(e => console.log('    - ' + e));
      totalErrors += pageErrors.length;
    } else {
      console.log('  ✅ Sin errores de consola ni de ejecución.');
    }
    await page.close();
  }

  // 1. Probar Póster / Lámina A3 M4
  await testPage('laminas/M4_DistribucionesContinuas.html', 'Lámina Infográfica A3 M04', async (page, errs) => {
    const katexCount = await page.$$eval('.katex', els => els.length);
    console.log(`  KaTeX rendered elements: ${katexCount}`);
    if (katexCount < 10) errs.push(`KaTeX no renderizó suficientes fórmulas (${katexCount})`);

    const phCount = await page.$$eval('.ph', els => els.length);
    console.log(`  Pulsos fotónicos (.ph): ${phCount}`);
    if (phCount < 5) errs.push(`Muy pocos pulsos fotónicos animados (${phCount})`);

    // Probar click en todas las configuraciones
    for (const g of ['varilla', 'anillo', 'disco', 'plano']) {
      await page.click(`[data-g="${g}"]`);
      await new Promise(r => setTimeout(r, 200));
    }
  });

  // 2. Probar Simulador Flagship ContinuousDistLab
  await testPage('simuladores/ContinuousDistLab.html', 'Simulador Flagship ContinuousDistLab', async (page, errs) => {
    const hasCanvas = await page.$('#main-canvas');
    if (!hasCanvas) errs.push('No se encontró el elemento canvas #main-canvas');

    const liveBar = await page.$('#e10-live');
    if (!liveBar) errs.push('No se encontró la barra en vivo #e10-live');

    // Verificar si el texto matemático en vivo tiene NaN o guion vacío inicial
    const liveMath = await page.$eval('#e10-live-math', el => el.textContent);
    console.log(`  Live math initial text: "${liveMath}"`);
    if (/NaN|—/.test(liveMath)) {
      errs.push(`El texto matemático contiene NaN o valor no inicializado: "${liveMath}"`);
    }

    const steps = await page.$$eval('.e10-step', els => els.length);
    console.log(`  Pasos pedagógicos en panel lateral: ${steps}`);
    if (steps !== 4) errs.push(`Esperados 4 pasos pedagógicos, encontrados ${steps}`);

    // Probar interacción con todas las escenas
    for (const sc of ['varilla', 'anillo', 'disco', 'plano']) {
      await page.click(`.case-tab[data-scene="${sc}"]`);
      await new Promise(r => setTimeout(r, 200));
      const math = await page.$eval('#e10-live-math', el => el.textContent);
      if (/NaN|—/.test(math)) {
        errs.push(`Escena "${sc}" tiene fórmula inválida o no inicializada: "${math}"`);
      }
    }

    // Probar predicción y comprobación en plano
    await page.click('.predict-row .btn');
    await new Promise(r => setTimeout(r, 200));
    await page.click('button[onclick="comprobar()"]');
    await new Promise(r => setTimeout(r, 300));

    const overlayDisplay = await page.$eval('#solution-overlay', el => getComputedStyle(el).display);
    if (overlayDisplay === 'none') {
      errs.push('El overlay de solución no se abrió');
    }
    const latexRes = await page.$eval('#latex-result', el => el.innerHTML.trim());
    console.log(`  Latex result content length: ${latexRes.length}`);
    if (latexRes.length === 0 || latexRes === '—') {
      errs.push(`Latex result quedó vacío tras comprobar: "${latexRes}"`);
    }
  });

  // 3. Probar Taller 4
  await testPage('talleres/Taller_4_Distribuciones_de_Carga_Continua.html', 'Taller 4 (Distribuciones Continuas)', async (page, errs) => {
    const retCount = await page.$$eval('[data-reto]', els => els.length);
    console.log(`  Retos interactivos [data-reto]: ${retCount}`);
    if (retCount !== 14) errs.push(`Esperados 14 retos numéricos, encontrados ${retCount}`);

    const katexCount = await page.$$eval('.katex', els => els.length);
    console.log(`  KaTeX rendered elements: ${katexCount}`);
    if (katexCount < 30) errs.push(`Pocas fórmulas KaTeX renderizadas (${katexCount})`);
  });

  // 4. Probar Presentación M4
  await testPage('presentaciones/M4_DistribucionesContinuas/index.html', 'Master Deck M4 (14 diapositivas)', async (page, errs) => {
    const slides = await page.$$eval('.slide', els => els.length);
    console.log(`  Diapositivas .slide encontradas: ${slides}`);
    if (slides !== 14) errs.push(`Esperadas 14 diapositivas, encontradas ${slides}`);
  });

  // 5. Probar Ficha Técnica y Modelo 3D M04
  await testPage('recursos/modelos_3d/M04_DistribucionGeometria.html', 'Ficha Técnica 3D M04 (DistribucionGeometria)', async (page, errs) => {
    const imgLoaded = await page.$eval('figure img', el => el.complete && el.naturalWidth > 0);
    console.log(`  Imagen render 3D cargada correctamente: ${imgLoaded}`);
    if (!imgLoaded) errs.push('La imagen render 3D no cargó o no tiene dimensiones');

    const downloadLinks = await page.$$eval('.bar .btn', els => els.length);
    console.log(`  Botones de descarga STL/SCAD: ${downloadLinks}`);
    if (downloadLinks < 2) errs.push(`Esperados al menos 2 botones de descarga, encontrados ${downloadLinks}`);
  });

  await browser.close();

  console.log(`\n======================================================`);
  if (totalErrors === 0) {
    console.log('🎉 TODOS LOS COMPONENTES DE M04 RENDERIZAN PERFECTAMENTE (0 ERRORES)');
    process.exit(0);
  } else {
    console.log(`❌ SE REGISTRARON ${totalErrors} ERRORES DE RENDERIZADO EN M04.`);
    process.exit(1);
  }
})();
