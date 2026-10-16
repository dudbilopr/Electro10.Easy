import re

with open('simuladores/Resistance.html', 'r', encoding='utf-8') as f:
    text = f.read()

# We need to find btn-solve and replace the logic.
# Because it's large, we will just use re.sub with a well-defined boundary.

solve_logic = r"""$('btn-solve').onclick = () => {
    if(!auth.currentUser) return toast('Debe iniciar sesión para resolver');
    cur().comps.forEach(c => { c.stepBg = null; c.V = undefined; c.Q = undefined; }); 

    let { edges, vSrc } = buildGraph();
    let mw = $('math-window'); mw.style.display = 'flex'; mw.classList.remove('minimized');
    let kc = $('katex-container'); kc.innerHTML = '';
    
    if(!vSrc) { kc.innerHTML = '<div style="color:var(--danger); padding:16px; border-radius:8px; background:rgba(239,68,68,0.1);"><b>Error Crítico:</b> No hay fuente conectada a nodos válidos. Asegúrate de conectar los cables directamente a los pines de los componentes.</div>'; return; }
    if(edges.length===0) { kc.innerHTML = '<div style="color:var(--danger); padding:16px; border-radius:8px; background:rgba(239,68,68,0.1);"><b>Aviso:</b> No hay resistores en bucle cerrado.</div>'; return; }

    let blocks = [{type:'math', content:`\\textbf{Fase Analítica de Reducción}\\\\ \\rule{6cm}{0.4pt} \\\\ V_{fuente} = ${vSrc.val}V`}];
    let step = 1; let workingEdges = JSON.parse(JSON.stringify(edges)); 
    let history = []; 
    
    cur().circuitStates = [ { comps: JSON.parse(JSON.stringify(cur().comps)), wires: JSON.parse(JSON.stringify(cur().wires)), nodes: JSON.parse(JSON.stringify(cur().nodes)), name: "Paso 0: Original" } ];
    
    // REDUCTION LOOP
    while(workingEdges.length > 1 && step < 50) {
        let reduced = false; let sColor = STEP_COLORS[(step-1) % STEP_COLORS.length];
        
        // 1. PARALLEL
        let pMap = {};
        workingEdges.forEach(e => { let k = e.n1<e.n2 ? `${e.n1}-${e.n2}` : `${e.n2}-${e.n1}`; (pMap[k]=pMap[k]||[]).push(e); });
        
        for(let k in pMap) {
            if(pMap[k].length > 1) { 
                let group = pMap[k]; let invSum = group.reduce((s,c)=>s+(1/c.val), 0); let cEq = 1/invSum;
                let names = group.map(c=>`\\frac{1}{R_{${c.id.substring(0,3)}}}`).join(' + ');
                blocks.push({type:'math', content:`\\text{Paso } ${step}: \\text{Paralelo } \\Rightarrow R_{eq${step}} = \\left(${names}\\right)^{-1} = ${cEq.toFixed(2)}\\Omega`});

                let eqEdge = {id:`eq${step}`, val:cEq, n1:group[0].n1, n2:group[0].n2, isEq:true, comps:group, type:'P', color:sColor};
                workingEdges = workingEdges.filter(e => !group.includes(e)); workingEdges.push(eqEdge); history.push(eqEdge);
                
                let lastState = cur().circuitStates[cur().circuitStates.length-1];
                let curComps = JSON.parse(JSON.stringify(lastState.comps)); let curWires = JSON.parse(JSON.stringify(lastState.wires));
                let anchor = curComps.find(c => c.id === group[0].id); let cx = anchor ? anchor.x : 200, cy = anchor ? anchor.y : 200;
                group.forEach(g => { curComps = curComps.filter(c => c.id !== g.id); });
                
                let n1Obj = cur().nodes.find(n=>n.id===group[0].n1) || {x:cx-40, y:cy}; let n2Obj = cur().nodes.find(n=>n.id===group[0].n2) || {x:cx+40, y:cy};
                curComps.push({ id: `eq${step}`, type:'res_fixed', x:cx, y:cy, val:cEq, unit:'Ω', rot:0, isEq:true, stepColor:sColor, n1: group[0].n1, n2: group[0].n2 });
                curWires.push({ id:uid(), dashed:true, color:sColor, path:[{x:cx-20,y:cy}, {x:cx-20,y:n1Obj.y}, {x:n1Obj.x,y:n1Obj.y}] });
                curWires.push({ id:uid(), dashed:true, color:sColor, path:[{x:cx+20,y:cy}, {x:cx+20,y:n2Obj.y}, {x:n2Obj.x,y:n2Obj.y}] });
                
                curWires = pruneStepWires(curComps, curWires, vSrc);
                cur().circuitStates.push({ comps: curComps, wires: curWires, nodes: cur().nodes, name: `Paso ${step}: Eq Paralelo` });
                step++; reduced=true; break;
            }
        }
        if(reduced) continue;

        // 2. SERIES
        let nCounts = {}; workingEdges.forEach(e=>{ nCounts[e.n1]=(nCounts[e.n1]||0)+1; nCounts[e.n2]=(nCounts[e.n2]||0)+1; });
        let d2Nodes = Object.keys(nCounts).filter(n => nCounts[n]===2 && n!==vSrc.n1 && n!==vSrc.n2);
        
        if(d2Nodes.length > 0) {
            let chainNodes = new Set(), chainEdges = new Set(), queue = [d2Nodes[0]];
            while(queue.length > 0) {
                let n = queue.pop(); if(chainNodes.has(n)) continue; chainNodes.add(n);
                workingEdges.filter(e => e.n1===n || e.n2===n).forEach(e => {
                    chainEdges.add(e); let other = e.n1===n ? e.n2 : e.n1;
                    if(nCounts[other]===2 && other!==vSrc.n1 && other!==vSrc.n2) queue.push(other);
                });
            }
            let group = Array.from(chainEdges);
            if(group.length > 1) { 
                let cEq = group.reduce((s,c)=>s+c.val, 0);
                let names = group.map(c=>`R_{${c.id.substring(0,3)}}`).join(' + ');
                blocks.push({type:'math', content:`\\text{Paso } ${step}: \\text{Serie } \\Rightarrow R_{eq${step}} = ${names} = ${cEq.toFixed(2)}\\Omega`});

                let endNodes = []; group.forEach(e => { if(!chainNodes.has(e.n1)) endNodes.push(e.n1); if(!chainNodes.has(e.n2)) endNodes.push(e.n2); });
                let eqEdge = {id:`eq${step}`, val:cEq, n1:endNodes[0], n2:endNodes[1], isEq:true, comps:group, type:'S', color:sColor};
                workingEdges = workingEdges.filter(e => !group.includes(e)); workingEdges.push(eqEdge); history.push(eqEdge);
                
                let lastState = cur().circuitStates[cur().circuitStates.length-1];
                let curComps = JSON.parse(JSON.stringify(lastState.comps)); let curWires = JSON.parse(JSON.stringify(lastState.wires));
                let anchor = curComps.find(c => c.id === group[0].id); let cx = anchor ? anchor.x : 200, cy = anchor ? anchor.y : 200;
                group.forEach(g => { curComps = curComps.filter(c => c.id !== g.id); });
                
                let n1Obj = cur().nodes.find(n=>n.id===endNodes[0]) || {x:cx-40, y:cy}; let n2Obj = cur().nodes.find(n=>n.id===endNodes[1]) || {x:cx+40, y:cy};
                curComps.push({ id: `eq${step}`, type:'res_fixed', x:cx, y:cy, val:cEq, unit:'Ω', rot:0, isEq:true, stepColor:sColor, n1: endNodes[0], n2: endNodes[1] });
                curWires.push({ id:uid(), dashed:true, color:sColor, path:[{x:cx-20,y:cy}, {x:cx-20,y:n1Obj.y}, {x:n1Obj.x,y:n1Obj.y}] });
                curWires.push({ id:uid(), dashed:true, color:sColor, path:[{x:cx+20,y:cy}, {x:cx+20,y:n2Obj.y}, {x:n2Obj.x,y:n2Obj.y}] });
                
                curWires = pruneStepWires(curComps, curWires, vSrc);
                cur().circuitStates.push({ comps: curComps, wires: curWires, nodes: cur().nodes, name: `Paso ${step}: Eq Serie` });
                step++; reduced=true;
            }
        }
        if(!reduced) break; 
    }

    let Rtot = 0, Itot = 0;
    if (workingEdges.length === 1) {
        // Reducible Completamente
        Rtot = workingEdges[0].val; 
        Itot = vSrc.val / Rtot;
        blocks.push({type:'math', content:`\\textbf{Síntesis Equivalente}\\\\ \\rule{6cm}{0.4pt} \\\\ R_{eq} = ${Rtot.toFixed(2)}\\Omega \\\\ I_{total} = \\frac{V}{R_{eq}} = ${Itot.toFixed(2)}A`});
        blocks.push({type:'math', content:`\\textbf{Retro-Propagación Física}\\\\ \\rule{6cm}{0.4pt}`});
        workingEdges[0].I = Itot; workingEdges[0].V = vSrc.val;
        
        for(let i = history.length - 1; i >= 0; i--) {
            let eq = history[i]; let eqV = eq.V || 0; let eqI = eq.I || 0;
            if(eq.type === 'P') { 
                eq.comps.forEach(c => { 
                    c.V = eqV; c.I = eqV / c.val; c.P = c.V * c.I;
                    let actualComp = cur().comps.find(x => x.id === c.id); 
                    if(actualComp) { actualComp.V = c.V; actualComp.I = c.I; actualComp.P = c.P; actualComp.stepBg = eq.color; } 
                });
                let t = `R_{${eq.id}} \\text{ (Paralelo): } V = ${eqV.toFixed(2)}V \\Rightarrow ` + eq.comps.map(c => `I_{${c.id.substring(0,3)}} = ${(c.I).toFixed(2)}A`).join(', ');
                blocks.push({type:'math', content: t});
            } else if(eq.type === 'S') { 
                eq.comps.forEach(c => { 
                    c.I = eqI; c.V = eqI * c.val; c.P = c.V * c.I;
                    let actualComp = cur().comps.find(x => x.id === c.id);
                    if(actualComp) { actualComp.V = c.V; actualComp.I = c.I; actualComp.P = c.P; actualComp.stepBg = eq.color; }
                });
                let t = `R_{${eq.id}} \\text{ (Serie): } I = ${eqI.toFixed(2)}A \\Rightarrow ` + eq.comps.map(c => `V_{${c.id.substring(0,3)}} = ${(c.V).toFixed(2)}V`).join(', ');
                blocks.push({type:'math', content: t});
            }
        }
    } else {
        // Malla Irreductible -> Análisis Nodal
        blocks.push({type:'math', content:`\\textbf{Malla Irreductible detectada}\\\\ \\rule{6cm}{0.4pt} \\\\ \\text{Aplicando Análisis Nodal (Leyes de Kirchhoff)}`});
        
        let allNodes = new Set();
        edges.forEach(e => { allNodes.add(e.n1); allNodes.add(e.n2); });
        
        // n1 es Positivo, n2 es Negativo (Tierra)
        let vKnown = {};
        vKnown[vSrc.n2] = 0; // Tierra
        vKnown[vSrc.n1] = vSrc.val; 
        
        let unkNodes = Array.from(allNodes).filter(n => n !== vSrc.n1 && n !== vSrc.n2);
        let N = unkNodes.length;
        
        if (N > 0) {
            let A = Array(N).fill(0).map(()=>Array(N).fill(0));
            let B = Array(N).fill(0);
            
            edges.forEach(e => {
                let g = 1 / e.val;
                let i = unkNodes.indexOf(e.n1);
                let j = unkNodes.indexOf(e.n2);
                
                if (i !== -1) A[i][i] += g;
                if (j !== -1) A[j][j] += g;
                if (i !== -1 && j !== -1) { A[i][j] -= g; A[j][i] -= g; }
                
                if (i !== -1 && vKnown[e.n2] !== undefined) B[i] += vKnown[e.n2] * g;
                if (j !== -1 && vKnown[e.n1] !== undefined) B[j] += vKnown[e.n1] * g;
            });
            
            // Gauss-Jordan
            for (let i = 0; i < N; i++) {
                let maxRow = i;
                for (let k = i + 1; k < N; k++) if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) maxRow = k;
                let tempRow = A[i]; A[i] = A[maxRow]; A[maxRow] = tempRow;
                let tempVal = B[i]; B[i] = B[maxRow]; B[maxRow] = tempVal;
                for (let k = i + 1; k < N; k++) {
                    let c = -A[k][i] / A[i][i];
                    for (let j = i; j < N; j++) {
                        if (i == j) A[k][j] = 0; else A[k][j] += c * A[i][j];
                    }
                    B[k] += c * B[i];
                }
            }
            for (let i = N - 1; i >= 0; i--) {
                let x = B[i] / A[i][i];
                for (let k = i - 1; k >= 0; k--) B[k] -= A[k][i] * x;
                vKnown[unkNodes[i]] = x;
            }
        }
        
        Itot = 0;
        edges.forEach(e => {
            let v1 = vKnown[e.n1], v2 = vKnown[e.n2];
            let vDrop = v1 - v2;
            e.V = Math.abs(vDrop);
            e.I = e.V / e.val;
            
            let actualComp = cur().comps.find(x => x.id === e.id);
            if(actualComp) { 
                actualComp.V = e.V; actualComp.I = e.I; actualComp.P = e.V * e.I; 
                actualComp.stepBg = 'rgba(139,92,246,0.3)'; // Color para mallas
            }
            
            if (e.n1 === vSrc.n1) Itot += (v1 - v2)/e.val;
            else if (e.n2 === vSrc.n1) Itot += (v2 - v1)/e.val;
        });
        
        Itot = Math.abs(Itot);
        Rtot = vSrc.val / Itot;
        
        let t = Object.keys(vKnown).map(k => `V_{n\\dots${k.substring(k.length-3)}} = ${vKnown[k].toFixed(2)}V`).join(', ');
        blocks.push({type:'math', content: `\\text{Voltajes Nodales: } \\\\ ` + t});
        blocks.push({type:'math', content:`R_{eq(malla)} = \\frac{V_{fuente}}{I_{total}} = ${Rtot.toFixed(2)}\\Omega`});
    }

    blocks.forEach(b => { let div = document.createElement('div'); try { katex.render(b.content, div, {displayMode: true}); } catch(e){ div.innerText = b.content; } kc.appendChild(div); });

    $('btn-show-steps').style.display = 'block';
    
    let tb = $('table-results'); tb.style.display='block';
    let html = '<table><tr><th>Comp</th><th>R (Ω)</th><th>V (V)</th><th>I (A)</th><th>P (W)</th></tr>';
    html += `<tr style="background:rgba(255,255,255,0.05)"><td><b>Fuente DC</b></td><td>-</td><td>${vSrc.val.toFixed(2)}</td><td>${Itot.toFixed(2)}</td><td>${(vSrc.val * Itot).toFixed(2)}</td></tr>`;
    
    let allOk = true;
    edges.forEach(e => {
        let cRef = cur().comps.find(x => x.id === e.id); if(!cRef) return;
        let vCap = cRef.V || e.V || 0; let iCap = cRef.I || e.I || 0; let pCap = Math.abs(vCap * iCap);
        
        let colorForTable = cRef.stepBg || 'transparent';
        let bgStr = `background-color: ${colorForTable};`;

        if (cRef.maxV && pCap > cRef.maxV) { 
            cRef.exploded = true; allOk = false; triggerExplosion(cRef.x, cRef.y); 
            html += `<tr style="${bgStr} color:var(--danger); font-weight:bold;"><td>${e.id.substring(0,4)} <span class="material-symbols-outlined" style="font-size:1.1em;vertical-align:middle;">bolt</span> ¡Quemado! >${cRef.maxV}W</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>`; 
        } 
        else { html += `<tr style="${bgStr}"><td><b>${e.id.substring(0,4)}</b></td><td>${e.val.toFixed(2)}</td><td>${vCap.toFixed(2)}</td><td>${iCap.toFixed(2)}</td><td>${pCap.toFixed(2)}</td></tr>`; }
    });
    
    html += `<tr style="background:linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(5, 150, 105, 0.4)); font-size:1.1rem;"><td><b>TOTAL</b></td><td><b>${Rtot.toFixed(2)}</b></td><td><b>-</b></td><td><b>${Itot.toFixed(2)}</b></td><td><b>${(vSrc.val * Itot).toFixed(2)}</b></td></tr>`;
    html += '</table>'; tb.innerHTML = html; render(); syncState();

    if(allOk) {
        toast('¡Circuito simulado con éxito!');
        updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'directory', st.user.uid), { puntos: increment(10) });
        window.parent.postMessage({ type: 'PROGRESS_UPDATE', lesson: 'resistores', completed: true, score: 100 }, '*');
    } else toast('¡SISTEMA DETENIDO! Explosión detectada por Sobrevoltaje.');
};"""

start_idx = text.find("$('btn-solve').onclick = () => {")
end_idx = text.find("const triggerExplosion")

if start_idx != -1 and end_idx != -1:
    new_text = text[:start_idx] + solve_logic + "\n\n" + text[end_idx:]
    with open('simuladores/Resistance.html', 'w', encoding='utf-8') as f:
        f.write(new_text)
    print("Replaced logic successfully!")
else:
    print("Failed to find boundaries.")
