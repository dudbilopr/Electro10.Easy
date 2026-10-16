import re

with open('simuladores/Resistance.html', 'r', encoding='utf-8') as f:
    text = f.read()

draw_orig = r"""const drawComp = (c) => {
    ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(c.rot*Math.PI/180);
    
    let strokeCol = st.sel.some(s=>s.id===c.id) ? '#ef4444' : 'var(--text)';
    if(c.isEq) { strokeCol = c.stepColor || '#ef4444'; }
    ctx.strokeStyle = strokeCol; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.fillStyle = 'var(--text)';

    if(c.exploded) { ctx.fillStyle='red'; ctx.font='20px Arial'; ctx.fillText('<span class="material-symbols-outlined" style="font-size:1.1em;vertical-align:middle;">bolt</span>', -10, 5); ctx.restore(); return; }

    if(c.type !== 'res_var') {
        ctx.beginPath(); ctx.moveTo(-20,0); ctx.lineTo(-10,0); ctx.moveTo(20,0); ctx.lineTo(10,0); ctx.stroke();
    }

    ctx.font='12px sans-serif'; 
    if(c.type==='battery') {
        ctx.beginPath(); ctx.moveTo(-10,-15); ctx.lineTo(-10,15); ctx.moveTo(10,-8); ctx.lineTo(10,8); ctx.stroke();
        ctx.fillText('+', -22, -10);
    } else if(c.type==='res_fixed') {
        ctx.beginPath(); ctx.moveTo(-10,-12); ctx.lineTo(-10,12); ctx.moveTo(10,-12); ctx.lineTo(10,12); ctx.stroke();
    } else if(c.type==='res_var') {
        // Símbolo Electrolítico IEEE Curva Invertida | (
        ctx.beginPath(); ctx.moveTo(-20,0); ctx.lineTo(-5,0); ctx.moveTo(20,0); ctx.lineTo(5,0); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-5,-12); ctx.lineTo(-5,12); // Placa Recta (+)
        ctx.moveTo(5,-12); ctx.quadraticCurveTo(-2, 0, 5, 12); // Curva hacia la izquierda (
        ctx.stroke(); 
        ctx.fillText('+', -24, -10); ctx.fillText('-', 12, -10);
    } else if(c.type==='multimeter') {
        ctx.strokeRect(-15,-10,30,20); ctx.font='10px sans-serif'; ctx.fillText('V/C', -10, 3);
    }
    
    // Ωísica Visual (Campo y Carga)
    if(c.type.includes('res') && c.V !== undefined && !c.isEq && !c.exploded) {
        let qCount = Math.min(6, Math.max(2, Math.floor(Math.abs(c.Q)/10) || 2)); 
        let sL = c.V >= 0 ? '+' : '-'; let sR = c.V >= 0 ? '-' : '+';
        ctx.font = 'bold 8px monospace'; ctx.textAlign = 'center';
        
        for(let i=0; i<qCount; i++) {
            let oy = -10 + (20/(qCount-1||1))*i;
            ctx.fillStyle = c.V >= 0 ? 'rgba(239, 68, 68, 0.9)' : 'rgba(239, 68, 68, 0.9)'; ctx.fillText(sL, -14, oy+3);
            ctx.fillStyle = c.V >= 0 ? 'rgba(239, 68, 68, 0.9)' : 'rgba(239, 68, 68, 0.9)'; ctx.fillText(sR, 14, oy+3);
        }
        
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.8)'; ctx.lineWidth = 1.5; ctx.beginPath(); // Naranja E-field
        for(let i=0; i<3; i++) {
            let oy = -6 + 6*i;
            ctx.moveTo(-6, oy); ctx.lineTo(6, oy);
            if(c.V >= 0) { ctx.lineTo(3, oy-2); ctx.moveTo(6, oy); ctx.lineTo(3, oy+2); } // ->
            else { ctx.moveTo(-6, oy); ctx.lineTo(-3, oy-2); ctx.moveTo(-6, oy); ctx.lineTo(-3, oy+2); } // <-
        }
        ctx.stroke(); ctx.textAlign = 'left';
    }
    
    ctx.fillStyle = c.isEq ? strokeCol : 'var(--text)';
    ctx.font='10px sans-serif';
    ctx.fillText(c.isEq ? c.id : `${c.val.toFixed(2)}${c.unit}`, -15, 28);
    ctx.restore();
};"""


draw_new = r"""const drawComp = (c) => {
    ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(c.rot*Math.PI/180);
    
    let strokeCol = st.sel.some(s=>s.id===c.id) ? '#ef4444' : 'var(--text)';
    if(c.isEq) { strokeCol = c.stepColor || '#ef4444'; }
    ctx.strokeStyle = strokeCol; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.fillStyle = 'var(--text)';

    if(c.exploded) { ctx.fillStyle='red'; ctx.font='20px Arial'; ctx.fillText('💥', -10, 5); ctx.restore(); return; }

    // Dibuja cables de los pines
    ctx.beginPath(); ctx.moveTo(-20,0); ctx.lineTo(-12,0); ctx.moveTo(20,0); ctx.lineTo(12,0); ctx.stroke();

    ctx.font='12px sans-serif'; 
    if(c.type==='battery') {
        ctx.beginPath(); ctx.moveTo(-10,-15); ctx.lineTo(-10,15); ctx.moveTo(10,-8); ctx.lineTo(10,8); ctx.stroke();
        ctx.fillText('+', -22, -10);
    } else if(c.type==='res_fixed') {
        // Zigzag IEEE
        ctx.beginPath();
        ctx.moveTo(-12, 0); ctx.lineTo(-9, -6); ctx.lineTo(-3, 6); ctx.lineTo(3, -6); ctx.lineTo(9, 6); ctx.lineTo(12, 0);
        ctx.stroke();
    } else if(c.type==='res_var') {
        // Zigzag IEEE con flecha (potenciómetro)
        ctx.beginPath();
        ctx.moveTo(-12, 0); ctx.lineTo(-9, -6); ctx.lineTo(-3, 6); ctx.lineTo(3, -6); ctx.lineTo(9, 6); ctx.lineTo(12, 0);
        ctx.stroke();
        
        ctx.beginPath(); ctx.moveTo(-6, 12); ctx.lineTo(6, -10); ctx.stroke();
        // Cabeza de flecha
        ctx.beginPath(); ctx.moveTo(6, -10); ctx.lineTo(1, -10); ctx.moveTo(6, -10); ctx.lineTo(6, -5); ctx.stroke();
    } else if(c.type==='multimeter') {
        ctx.strokeRect(-15,-10,30,20); ctx.font='10px sans-serif'; ctx.fillText('V/A', -10, 3);
    }
    
    // Física Visual para Resistores (Corriente y Potencia/Calor)
    if(c.type.includes('res') && c.V !== undefined && !c.isEq && !c.exploded) {
        ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
        
        // Mostrar Amperaje (I)
        ctx.fillStyle = '#3b82f6'; // Azul
        let sign = c.V >= 0 ? '→' : '←';
        ctx.fillText(`${c.I ? c.I.toFixed(2) : 0}A ${sign}`, 0, -12);
        
        // Mostrar Potencia disipada (W)
        if(c.P !== undefined) {
            ctx.fillStyle = '#ef4444'; // Rojo calor
            ctx.fillText(`${c.P.toFixed(2)}W`, 0, 20);
        }
    }
    
    ctx.textAlign = 'left';
    ctx.fillStyle = c.isEq ? strokeCol : 'var(--text)';
    ctx.font='10px sans-serif';
    ctx.fillText(c.isEq ? c.id : `${c.val.toFixed(2)}${c.unit}`, -15, 32);
    ctx.restore();
};"""

start = text.find('const drawComp = (c) => {')
end = text.find('const render = () => {')

if start != -1 and end != -1:
    new_text = text[:start] + draw_new + '\n\n' + text[end:]
    with open('simuladores/Resistance.html', 'w', encoding='utf-8') as f:
        f.write(new_text)
    print("Replaced drawComp successfully!")
else:
    print("Failed to find boundaries.")
