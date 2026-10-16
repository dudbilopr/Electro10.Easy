const buildGraph = () => {
    let edges = []; let vSrc = null;
    cur().comps.forEach(c => {
        let rad = c.rot*Math.PI/180;
        let nx1 = c.x - 20*Math.cos(rad), ny1 = c.y - 20*Math.sin(rad);
        let nx2 = c.x + 20*Math.cos(rad), ny2 = c.y + 20*Math.sin(rad);
        let n1 = cur().nodes.find(n=>dist(n.x,n.y,nx1,ny1)<30); // Tolerancia generosa
        let n2 = cur().nodes.find(n=>dist(n.x,n.y,nx2,ny2)<30);
        if(n1&&n2) {
            let edge = { id:c.id, type:c.type, val:c.val, n1:n1.id, n2:n2.id, ref:c }; 
            if(c.type==='battery') vSrc = edge; else edges.push(edge);
        }
    });
    
    let nMap = {}; cur().nodes.forEach(n=>nMap[n.id]=n.id);
    const find = (i) => nMap[i]===i ? i : nMap[i]=find(nMap[i]);
    const union = (i,j) => nMap[find(i)] = find(j);
    cur().wires.forEach(w => union(w.n1, w.n2));
    
    edges.forEach(e => { e.n1 = find(e.n1); e.n2 = find(e.n2); });
    if(vSrc) { vSrc.n1 = find(vSrc.n1); vSrc.n2 = find(vSrc.n2); }
    return { edges: edges.filter(e=>e.n1!==e.n2), vSrc };
};

// Algoritmo para limpiar cables muertos visuales en los pasos de reducción
const pruneStepWires = (comps, wires, sourceEdge) => {
    let activeNodes = new Set();
    comps.forEach(c => {
        if(c.isEq) {
            if(c.n1) activeNodes.add(c.n1);
            if(c.n2) activeNodes.add(c.n2);
        } else {
            let rad = c.rot*Math.PI/180;
            let p1 = {x: c.x - 20*Math.cos(rad), y: c.y - 20*Math.sin(rad)};
            let p2 = {x: c.x + 20*Math.cos(rad), y: c.y + 20*Math.sin(rad)};
            cur().nodes.forEach(n => {
                if(dist(n.x,n.y,p1.x,p1.y)<30 || dist(n.x,n.y,p2.x,p2.y)<30) activeNodes.add(n.id);
            });
        }
    });
    if(sourceEdge) { activeNodes.add(sourceEdge.n1); activeNodes.add(sourceEdge.n2); }
    
    let adj = {};
    wires.forEach(w => {
        if(!w.n1 || !w.n2) return;
        adj[w.n1] = adj[w.n1] || []; adj[w.n1].push(w);
        adj[w.n2] = adj[w.n2] || []; adj[w.n2].push(w);
    });
    
    let visitedWires = new Set();
    let q = Array.from(activeNodes);
    let visitedNodes = new Set(q);
    
    while(q.length > 0) {
        let curr = q.shift();
        if(adj[curr]) {
            adj[curr].forEach(w => {
                if(!visitedWires.has(w.id)) {
                    visitedWires.add(w.id);
                    let nxt = w.n1 === curr ? w.n2 : w.n1;
                    if(!visitedNodes.has(nxt)) {
                        visitedNodes.add(nxt); q.push(nxt);
                    }
                }
            });
        }
    }
    return wires.filter(w => w.dashed || visitedWires.has(w.id));
};

const setTimelineView = (idx) => {
    let tCur = cur();
    if(idx < 0 || !tCur.circuitStates || tCur.circuitStates.length===0) {
        $('step-viewer-panel').style.display = 'none'; tCur.currentViewIdx = -1;
    } else {
        if(idx >= tCur.circuitStates.length) idx = tCur.circuitStates.length-1;
        $('step-viewer-panel').style.display = 'flex';
        tCur.currentViewIdx = idx; $('step-viewer-label').innerText = tCur.circuitStates[idx].name;
    }
    render();
};
$('btn-step-prev').onclick = () => { if(cur().currentViewIdx > 0) setTimelineView(cur().currentViewIdx - 1); };
$('btn-step-next').onclick = () => { if(cur().currentViewIdx < cur().circuitStates.length - 1) setTimelineView(cur().currentViewIdx + 1); };
$('btn-step-close').onclick = () => setTimelineView(-1);
$('btn-show-steps').onclick = () => setTimelineView(0);


$('btn-solve').onclick = () => {
    if(!auth.currentUser) return toast('Debe iniciar sesión para resolver');
    cur().comps.forEach(c => { c.stepBg = null; c.V = undefined; c.Q = undefined; }); 

    let { edges, vSrc } = buildGraph();
    let mw = $('math-window'); mw.style.display = 'flex'; mw.classList.remove('minimized');
    let kc = $('katex-container'); kc.innerHTML = '';
    
    if(!vSrc) { kc.innerHTML = '<div style="color:var(--danger); padding:16px; border-radius:8px; background:rgba(239,68,68,0.1);"><b>Error Crítico:</b> No hay fuente conectada a nodos válidos. Asegúrate de conectar los cables directamente a los pines de los componentes.</div>'; return; }
    if(edges.length===0) { kc.innerHTML = '<div style="color:var(--danger); padding:16px; border-radius:8px; background:rgba(239,68,68,0.1);"><b>Aviso:</b> No hay resistores en bucle cerrado.</div>'; return; }

    // RASTREO ΩÍSICO DE POLARIDAD VÍA DIJKSTRA/BFS (Para Explosiones)
    let distFromPos = {};
    cur().nodes.forEach(n => distFromPos[n.id] = Infinity);
    let qNodes = [{id: vSrc.n1, d: 0}]; distFromPos[vSrc.n1] = 0;
    let visited = new Set();
    while(qNodes.length > 0) {
        qNodes.sort((a,b)=>a.d-b.d); let curr = qNodes.shift();
        if(visited.has(curr.id)) continue; visited.add(curr.id);
        edges.forEach(e => {
            if(e.n1 === curr.id && distFromPos[e.n2] > curr.d + 1) { distFromPos[e.n2] = curr.d + 1; qNodes.push({id:e.n2, d:curr.d+1}); }
            if(e.n2 === curr.id && distFromPos[e.n1] > curr.d + 1) { distFromPos[e.n1] = curr.d + 1; qNodes.push({id:e.n1, d:curr.d+1}); }
        });
    }

    let blocks = [{type:'math', content:`\\textbf{Fase Analítica de Reducción}\\\\ \\rule{6cm}{0.4pt} \\\\ V_{fuente} = ${vSrc.val}V`}];
    let step = 1; let workingEdges = JSON.parse(JSON.stringify(edges)); 
    let history = []; 
    
    cur().circuitStates = [ { comps: JSON.parse(JSON.stringify(cur().comps)), wires: JSON.parse(JSON.stringify(cur().wires)), nodes: JSON.parse(JSON.stringify(cur().nodes)), name: "Paso 0: Original" } ];
    
    while(workingEdges.length > 1 && step < 50) {
        let reduced = false; let sColor = STEP_COLORS[(step-1) % STEP_COLORS.length];
        
        let pMap = {};
        workingEdges.forEach(e => { let k = e.n1<e.n2 ? `${e.n1}-${e.n2}` : `${e.n2}-${e.n1}`; (pMap[k]=pMap[k]||[]).push(e); });
        
        for(let k in pMap) {
            if(pMap[k].length > 1) { 
                let group = pMap[k]; let invSum = group.reduce((s,c)=>s+c.val, 0); let cEq = invSum;
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
                
                // Ocultar cables muertos
                curWires = pruneStepWires(curComps, curWires, vSrc);
                cur().circuitStates.push({ comps: curComps, wires: curWires, nodes: cur().nodes, name: `Paso ${step}: Eq Serie` });
                step++; reduced=true;
            }
        }
        if(!reduced) break; 
    }

    let Rtot = workingEdges.length===1 ? workingEdges[0].val : workingEdges.reduce((s,c)=>s+c.val,0); // Rtot is the final single edge or series of remaining edges
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
    }

    blocks.forEach(b => { let div = document.createElement('div'); try { katex.render(b.content, div, {displayMode: true}); } catch(e){ div.innerText = b.content; } kc.appendChild(div); });

    $('btn-show-steps').style.display = 'block';
    
    // Tabla de Resultados Profesional
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
    html += '</table>'; tb.innerHTML = html; render(); syncState();

    if(allOk) {
        toast('¡Circuito simulado con éxito!');
        updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'directory', st.user.uid), { puntos: increment(10) });
        window.parent.postMessage({ type: 'PROGRESS_UPDATE', lesson: 'resistores', completed: true, score: 100 }, '*');
    } else toast('¡SISTEMA DETENIDO! Explosión detectada por Polaridad Inversa o Sobrevoltaje.');
};

const triggerExplosion = (x,y) => { for(let i=0;i<25;i++) st.particles.push({x,y,vx:(Math.random()-0.5)*12,vy:(Math.random()-0.5)*12,r:Math.random()*6+2,c: Math.random()>0.5?'#f59e0b':'#ef4444',a:1}); requestAnimatiomΩrame(render); };

