const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('=== VERIFICANDO RENDERIZADO EN NAVEGADOR (PUPPETEER) PARA MÓDULO 3 ===');
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

  // 1. Probar Póster / Lámina A3
  await testPage('laminas/M3_Potencial.html', 'Lámina Infográfica A3 M03', async (page, errs) => {
    const katexCount = await page.$$eval('.katex', els => els.length);
    console.log(`  KaTeX rendered elements: ${katexCount}`);
    if (katexCount < 10) errs.push(`KaTeX no renderizó suficientes fórmulas (${katexCount})`);

    const eqCurves = await page.$$eval('.eq-curve', els => els.length);
    console.log(`  Curvas equipotenciales vectoriales (.eq-curve): ${eqCurves}`);
    if (eqCurves < 5) errs.push(`Muy pocas curvas equipotenciales vectoriales (${eqCurves})`);

    const phCount = await page.$$eval('.ph', els => els.length);
    console.log(`  Pulsos fotónicos (.ph): ${phCount}`);
    if (phCount < 5) errs.push(`Muy pocos pulsos fotónicos animados (${phCount})`);

    // Probar click en todas las configuraciones
    for (const cfg of ['dipolo', 'placas', 'cuadrupolo', 'puntual']) {
      await page.click(`[data-cfg="${cfg}"]`);
      await new Promise(r => setTimeout(r, 200));
    }
  });

  // 2. Probar Simulador Flagship EquipotentialLab
  await testPage('simuladores/EquipotentialLab.html', 'Simulador Flagship EquipotentialLab', async (page, errs) => {
    const hasCanvas = await page.$('#cv');
    if (!hasCanvas) errs.push('No se encontró el elemento canvas #cv');

    const liveBar = await page.$('#e10-live');
    if (!liveBar) errs.push('No se encontró la barra en vivo #e10-live');

    const steps = await page.$$eval('.e10-step', els => els.length);
    console.log(`  Pasos pedagógicos en panel lateral: ${steps}`);
    if (steps !== 4) errs.push(`Esperados 4 pasos pedagógicos, encontrados ${steps}`);

    // Probar interacción con escenas
    for (const sc of ['dipolo', 'placas', 'gradiente', 'puntual']) {
      await page.click(`button[data-scene="${sc}"]`);
      await new Promise(r => setTimeout(r, 200));
    }

    // Probar predicción interactiva
    await page.click('#pred-btns .btn[data-p="sube"]');
    await new Promise(r => setTimeout(r, 200));
    const step3Now = await page.$eval('#step-3', el => el.dataset.s);
    if (step3Now !== 'now' && step3Now !== 'done') {
      errs.push('El flujo pedagógico no avanzó al paso 3 tras predecir');
    }
  });

  // 3. Probar Taller 3
  await testPage('talleres/Taller_3_Potencial_Electrico.html', 'Taller 3 (Potencial Eléctrico)', async (page, errs) => {
    const retCount = await page.$$eval('[data-reto]', els => els.length);
    console.log(`  Retos interactivos [data-reto]: ${retCount}`);
    if (retCount !== 14) errs.push(`Esperados 14 retos numéricos, encontrados ${retCount}`);

    const katexCount = await page.$$eval('.katex', els => els.length);
    console.log(`  KaTeX rendered elements: ${katexCount}`);
    if (katexCount < 30) errs.push(`Pocas fórmulas KaTeX renderizadas (${katexCount})`);
  });

  // 4. Probar Presentación M3
  await testPage('presentaciones/M3_Potencial/index.html', 'Master Deck M3 (14 diapositivas)', async (page, errs) => {
    const slides = await page.$$eval('.slide', els => els.length);
    console.log(`  Diapositivas .slide encontradas: ${slides}`);
    if (slides !== 14) errs.push(`Esperadas 14 diapositivas, encontradas ${slides}`);
  });

  await browser.close();

  console.log(`\n======================================================`);
  if (totalErrors === 0) {
    console.log('🎉 TODOS LOS COMPONENTES RENDERIZAN PERFECTAMENTE (0 ERRORES)');
    process.exit(0);
  } else {
    console.log(`❌ SE REGISTRARON ${totalErrors} ERRORES DE RENDERIZADO.`);
    process.exit(1);
  }
})();
