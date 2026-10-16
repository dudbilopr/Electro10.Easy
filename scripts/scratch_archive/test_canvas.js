const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Configurar viewport grande para el canvas
    await page.setViewport({ width: 1200, height: 800 });

    console.log("Navigating...");
    await page.goto('http://127.0.0.1:8080/simuladores/Resistance.html', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 1000));
    await page.evaluate(() => {
        const modal = document.getElementById('auth-modal');
        if (modal) modal.style.display = 'none';
        const overlay = document.querySelector('.modal-overlay');
        if (overlay) overlay.style.display = 'none';
    });


    console.log("Placing components...");
    
    // Clic en "Source DC"
    await page.click('button[data-tool="battery"]');
    // Place it at 150, 300
    await page.mouse.click(150, 300);
    
    // Clic en "Resistor"
    await page.click('button[data-tool="res_fixed"]');
    // Place R1 at 300, 200
    await page.mouse.click(300, 200);
    // Place R2 at 300, 400
    await page.mouse.click(300, 400);

    console.log("Wiring...");
    // Wire
    await page.click('button[data-tool="wire"]');
    
    // vSrc top (150, 270) to R1 top (300, 170)
    await page.mouse.click(150, 270);
    await page.mouse.click(300, 170);
    
    // vSrc bottom (150, 330) to R1 bottom (300, 230)
    await page.mouse.click(150, 330);
    await page.mouse.click(300, 230);
    
    // R1 top (300, 170) to R2 top (300, 370)
    await page.mouse.click(300, 170);
    await page.mouse.click(300, 370);
    
    // R1 bottom (300, 230) to R2 bottom (300, 430)
    await page.mouse.click(300, 230);
    await page.mouse.click(300, 430);

    console.log("Solving...");
    await page.click('#btn-solve');
    
    // Wait for the panel to show
    await new Promise(r => setTimeout(r, 1000));
    
    await page.screenshot({ path: '../test_canvas_1.png' });
    console.log("Initial state screenshot saved.");
    
    // Clic en "Next"
    await page.click('#btn-step-next');
    await new Promise(r => setTimeout(r, 1000));
    
    await page.screenshot({ path: '../test_canvas_2_reduced.png' });
    console.log("Reduced state screenshot saved.");

    await browser.close();
})();
