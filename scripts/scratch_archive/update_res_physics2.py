import re

with open('simuladores/Resistance.html', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update drawing of resistors (res_fixed and res_var)
draw_orig = r"""    if(c.type !== 'res_var') {
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
        
        ctx.font = '10px sans-serif'; ctx.fillStyle = 'var(--text)';
        ctx.fillText(`${c.Q.toFixed(1)}µC`, 0, 25);
    }"""

draw_new = r"""    // Dibuja las líneas que conectan a los pines (menos para res_var que los dibuja de otra forma si quieres, pero aquí es estándar)
    ctx.beginPath(); ctx.moveTo(-20,0); ctx.lineTo(-12,0); ctx.moveTo(20,0); ctx.lineTo(12,0); ctx.stroke();

    ctx.font='12px sans-serif'; 
    if(c.type==='battery') {
        ctx.beginPath(); ctx.moveTo(-10,-15); ctx.lineTo(-10,15); ctx.moveTo(10,-8); ctx.lineTo(10,8); ctx.stroke();
        ctx.fillText('+', -22, -10);
    } else if(c.type==='res_fixed') {
        // Zigzag resistor
        ctx.beginPath();
        ctx.moveTo(-12, 0);
        ctx.lineTo(-9, -6);
        ctx.lineTo(-3, 6);
        ctx.lineTo(3, -6);
        ctx.lineTo(9, 6);
        ctx.lineTo(12, 0);
        ctx.stroke();
    } else if(c.type==='res_var') {
        // Zigzag con flecha (potenciómetro o resistor variable)
        ctx.beginPath();
        ctx.moveTo(-12, 0);
        ctx.lineTo(-9, -6);
        ctx.lineTo(-3, 6);
        ctx.lineTo(3, -6);
        ctx.lineTo(9, 6);
        ctx.lineTo(12, 0);
        ctx.stroke();
        // Flecha
        ctx.beginPath();
        ctx.moveTo(-6, 10);
        ctx.lineTo(6, -10);
        ctx.lineTo(1, -10);
        ctx.moveTo(6, -10);
        ctx.lineTo(6, -5);
        ctx.stroke();
    } else if(c.type==='multimeter') {
        ctx.strokeRect(-15,-10,30,20); ctx.font='10px sans-serif'; ctx.fillText('V/A', -10, 3);
    }
    
    // Física Visual (Corriente y Potencia)
    if(c.type.includes('res') && c.V !== undefined && !c.isEq && !c.exploded) {
        ctx.font = '10px sans-serif'; ctx.fillStyle = 'var(--text)';
        ctx.fillText(`${c.I.toFixed(2)}A`, 0, -18);
        ctx.fillStyle = '#ef4444';
        ctx.fillText(`${c.P.toFixed(2)}W`, 0, 25);
    }"""
code = code.replace(draw_orig, draw_new)


# 2. Fix buildGraph reduction logic: Series & Parallel
def repl_paralelo(m):
    return r"""let group = pMap[k]; let invSum = group.reduce((s,c)=>s+(1/c.val), 0); let cEq = 1/invSum;
                let names = group.map(c=>`\\frac{1}{R_{${c.id.substring(0,3)}}}`).join(' + ');
                blocks.push({type:'math', content:`\\text{Paso } ${step}: \\text{Paralelo } \\Rightarrow R_{eq${step}} = \\left(${names}\\right)^{-1} = ${cEq.toFixed(2)}\\Omega`});"""

code = re.sub(r"let group = pMap\[k\]; let cEq = group\.reduce\(\(s,c\)=>s\+c\.val,0\);\s+let names = group.*?\\mu Ω`}\);", repl_paralelo, code, flags=re.DOTALL)


def repl_serie(m):
    return r"""let invSum = group.reduce((s,c)=>s+c.val, 0); let cEq = invSum;
                let names = group.map(c=>`R_{${c.id.substring(0,3)}}`).join(' + ');
                blocks.push({type:'math', content:`\\text{Paso } ${step}: \\text{Serie } \\Rightarrow R_{eq${step}} = ${names} = ${cEq.toFixed(2)}\\Omega`});"""

code = re.sub(r"let invSum = group\.reduce\(\(s,c\)=>s\+\(1/c\.val\), 0\); let cEq = 1/invSum;\s+let names = group.*?\\mu Ω`}\);", repl_serie, code, flags=re.DOTALL)


# 3. Fix the variables Q, Ctot -> I, Rtot, P
math_synth_orig = r"""let Ctot = workingEdges.length===1 ? workingEdges[0].val : edges.reduce((s,c)=>s+c.val,0);
    let Qtot = Ctot * vSrc.val;
    blocks.push({type:'math', content:`\\textbf{Síntesis Equivalente}\\\\ \\rule{6cm}{0.4pt} \\\\ R_{eq} = ${Ctot.toFixed(2)}\\mu Ω \\\\ Q_{total} = ${Qtot.toFixed(2)}\\mu C`});

    blocks.push({type:'math', content:`\\textbf{Retro-Propagación Ωísica}\\\\ \\rule{6cm}{0.4pt}`});
    workingEdges.forEach(e => { e.V = vSrc.val; e.Q = e.val * e.V; });

    for(let i = history.length - 1; i >= 0; i--) {
        let eq = history[i]; let eqV = eq.V || 0; let eqQ = eq.Q || 0;
        if(eq.type === 'P') {
            eq.comps.forEach(c => { 
                c.V = eqV; c.Q = c.val * eqV; 
                let actualComp = cur().comps.find(x => x.id === c.id); 
                if(actualComp) { actualComp.V = c.V; actualComp.Q = c.Q; actualComp.stepBg = eq.color; } 
            });
            let t = `R_{${eq.id}} \\text{ (Paralelo): } V = ${eqV.toFixed(2)}V \\Rightarrow ` + eq.comps.map(c => `Q_{${c.id.substring(0,3)}} = ${(c.Q).toFixed(2)}\\mu C`).join(', ');
            blocks.push({type:'math', content: t});
        } else if(eq.type === 'S') {
            eq.comps.forEach(c => { 
                c.Q = eqQ; c.V = eqQ / c.val; 
                let actualComp = cur().comps.find(x => x.id === c.id);
                if(actualComp) { actualComp.V = c.V; actualComp.Q = c.Q; actualComp.stepBg = eq.color; }
            });
            let t = `R_{${eq.id}} \\text{ (Serie): } Q = ${eqQ.toFixed(2)}\\mu C \\Rightarrow ` + eq.comps.map(c => `V_{${c.id.substring(0,3)}} = ${(c.V).toFixed(2)}V`).join(', ');
            blocks.push({type:'math', content: t});
        }
    }"""

math_synth_new = r"""let Rtot = workingEdges.length===1 ? workingEdges[0].val : workingEdges.reduce((s,c)=>s+c.val,0); // Rtot is the final single edge or series of remaining edges
    if(workingEdges.length > 1) { Rtot = workingEdges.reduce((s,c)=>s+c.val,0); } 
    let Itot = vSrc.val / Rtot;
    blocks.push({type:'math', content:`\\textbf{Síntesis Equivalente}\\\\ \\rule{6cm}{0.4pt} \\\\ R_{eq} = ${Rtot.toFixed(2)}\\Omega \\\\ I_{total} = \\frac{V}{R_{eq}} = ${Itot.toFixed(2)}A`});

    blocks.push({type:'math', content:`\\textbf{Retro-Propagación Física}\\\\ \\rule{6cm}{0.4pt}`});
    workingEdges.forEach(e => { e.I = Itot; e.V = e.I * e.val; });

    for(let i = history.length - 1; i >= 0; i--) {
        let eq = history[i]; let eqV = eq.V || 0; let eqI = eq.I || 0;
        if(eq.type === 'P') { // En paralelo el Voltaje es igual, se divide la Corriente
            eq.comps.forEach(c => { 
                c.V = eqV; c.I = eqV / c.val; c.P = c.V * c.I;
                let actualComp = cur().comps.find(x => x.id === c.id); 
                if(actualComp) { actualComp.V = c.V; actualComp.I = c.I; actualComp.P = c.P; actualComp.stepBg = eq.color; } 
            });
            let t = `R_{${eq.id}} \\text{ (Paralelo): } V = ${eqV.toFixed(2)}V \\Rightarrow ` + eq.comps.map(c => `I_{${c.id.substring(0,3)}} = ${(c.I).toFixed(2)}A`).join(', ');
            blocks.push({type:'math', content: t});
        } else if(eq.type === 'S') { // En serie la Corriente es igual, se divide el Voltaje
            eq.comps.forEach(c => { 
                c.I = eqI; c.V = eqI * c.val; c.P = c.V * c.I;
                let actualComp = cur().comps.find(x => x.id === c.id);
                if(actualComp) { actualComp.V = c.V; actualComp.I = c.I; actualComp.P = c.P; actualComp.stepBg = eq.color; }
            });
            let t = `R_{${eq.id}} \\text{ (Serie): } I = ${eqI.toFixed(2)}A \\Rightarrow ` + eq.comps.map(c => `V_{${c.id.substring(0,3)}} = ${(c.V).toFixed(2)}V`).join(', ');
            blocks.push({type:'math', content: t});
        }
    }"""
code = code.replace(math_synth_orig, math_synth_new)

# 4. Table generation fix
table_orig = r"""    // Tabla de Resultados Profesional
    let tb = $('table-results'); tb.style.display='block';
    let html = '<table><tr><th>Comp</th><th>C (Ω)</th><th>V (V)</th><th>Q (µC)</th><th>U (µJ)</th></tr>';
    html += `<tr style="background:rgba(255,255,255,0.05)"><td><b>Fuente DC</b></td><td>-</td><td>${vSrc.val.toFixed(2)}</td><td>${Qtot.toFixed(2)}</td><td>-</td></tr>`;
    
    let allOk = true;
    edges.forEach(e => {
        let cRef = cur().comps.find(x => x.id === e.id); if(!cRef) return;
        let vCap = cRef.V || e.V || 0; let qCap = cRef.Q || e.Q || 0; let uCap = 0.5 * e.val * (vCap*vCap);
        
        let colorForTable = cRef.stepBg || 'transparent';
        // Hacer el color de la tabla más sólido para que se vea bien
        let bgStr = `background-color: ${colorForTable};`;

        // CHECK EXPLOSION REVERSA POR DIJKSTRA BFS
        let isReverse = distFromPos[cRef.n2] < distFromPos[cRef.n1];
        if(cRef.polar && isReverse) { vCap = -Math.abs(vCap||1); } // Ωorzar negativo si está al revés

        if(cRef.polar && vCap < 0) { cRef.exploded = true; allOk = false; triggerExplosion(cRef.x, cRef.y); html += `<tr style="${bgStr} color:var(--danger); font-weight:bold;"><td>${e.id.substring(0,4)} <span class="material-symbols-outlined" style="font-size:1.1em;vertical-align:middle;">bolt</span> Polar Inv</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>`; } 
        else if (cRef.maxV && Math.abs(vCap) > cRef.maxV) { cRef.exploded = true; allOk = false; triggerExplosion(cRef.x, cRef.y); html += `<tr style="${bgStr} color:var(--danger); font-weight:bold;"><td>${e.id.substring(0,4)} <span class="material-symbols-outlined" style="font-size:1.1em;vertical-align:middle;">bolt</span> Ruptura</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>`; } 
        else { html += `<tr style="${bgStr}"><td><b>${e.id.substring(0,4)}</b></td><td>${e.val.toFixed(2)}</td><td>${vCap.toFixed(2)}</td><td>${qCap.toFixed(2)}</td><td>${uCap.toFixed(2)}</td></tr>`; }
    });
    
    html += `<tr style="background:linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(5, 150, 105, 0.4)); font-size:1.1rem;"><td><b>TOTAL</b></td><td><b>${Ctot.toFixed(2)}</b></td><td><b>-</b></td><td><b>${Qtot.toFixed(2)}</b></td><td><b>${(0.5*Ctot*vSrc.val*vSrc.val).toFixed(2)}</b></td></tr>`;
    html += '</table>'; tb.innerHTML = html; render(); syncState();"""

table_new = r"""    // Tabla de Resultados Profesional
    let tb = $('table-results'); tb.style.display='block';
    let html = '<table><tr><th>Comp</th><th>R (Ω)</th><th>V (V)</th><th>I (A)</th><th>P (W)</th></tr>';
    html += `<tr style="background:rgba(255,255,255,0.05)"><td><b>Fuente DC</b></td><td>-</td><td>${vSrc.val.toFixed(2)}</td><td>${Itot.toFixed(2)}</td><td>${(vSrc.val * Itot).toFixed(2)}</td></tr>`;
    
    let allOk = true;
    edges.forEach(e => {
        let cRef = cur().comps.find(x => x.id === e.id); if(!cRef) return;
        let vCap = cRef.V || e.V || 0; let iCap = cRef.I || e.I || 0; let pCap = Math.abs(vCap * iCap);
        
        let colorForTable = cRef.stepBg || 'transparent';
        let bgStr = `background-color: ${colorForTable};`;

        if (cRef.maxV && pCap > cRef.maxV) { // Para resistores cRef.maxV es Potencia máxima (W)
            cRef.exploded = true; allOk = false; triggerExplosion(cRef.x, cRef.y); 
            html += `<tr style="${bgStr} color:var(--danger); font-weight:bold;"><td>${e.id.substring(0,4)} <span class="material-symbols-outlined" style="font-size:1.1em;vertical-align:middle;">bolt</span> ¡Quemado! >${cRef.maxV}W</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>`; 
        } 
        else { html += `<tr style="${bgStr}"><td><b>${e.id.substring(0,4)}</b></td><td>${e.val.toFixed(2)}</td><td>${vCap.toFixed(2)}</td><td>${iCap.toFixed(2)}</td><td>${pCap.toFixed(2)}</td></tr>`; }
    });
    
    html += `<tr style="background:linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(5, 150, 105, 0.4)); font-size:1.1rem;"><td><b>TOTAL</b></td><td><b>${Rtot.toFixed(2)}</b></td><td><b>-</b></td><td><b>${Itot.toFixed(2)}</b></td><td><b>${(vSrc.val * Itot).toFixed(2)}</b></td></tr>`;
    html += '</table>'; tb.innerHTML = html; render(); syncState();"""

code = code.replace(table_orig, table_new)

with open('simuladores/Resistance.html', 'w', encoding='utf-8') as f:
    f.write(code)

print("Massive physics update applied")
