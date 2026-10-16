const render = () => {
    let tCur = cur();
    ctx.fillStyle = st.theme==='dark' ? '#0b0f19' : '#f0f4f8'; ctx.fillRect(0,0,cv.width,cv.height);
    ctx.save(); ctx.translate(tCur.pan.x, tCur.pan.y); ctx.scale(tCur.zoom, tCur.zoom);
    
    ctx.strokeStyle = st.theme==='dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'; ctx.lineWidth=1;
    ctx.beginPath();
    let l=-tCur.pan.x/tCur.zoom, r=l+cv.width/tCur.zoom, top=-tCur.pan.y/tCur.zoom, b=top+cv.height/tCur.zoom;
    for(let x=snap(l); x<r; x+=20) { ctx.moveTo(x,top); ctx.lineTo(x,b); }
    for(let y=snap(top); y<b; y+=20) { ctx.moveTo(l,y); ctx.lineTo(r,y); }
    ctx.stroke();

    let renderComps = tCur.currentViewIdx === -1 ? tCur.comps : tCur.circuitStates[tCur.currentViewIdx].comps;
    let renderWires = tCur.currentViewIdx === -1 ? tCur.wires : tCur.circuitStates[tCur.currentViewIdx].wires;
    let renderNodes = tCur.currentViewIdx === -1 ? tCur.nodes : tCur.circuitStates[tCur.currentViewIdx].nodes;

    // Cables Libres y Continuos
    ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    renderWires.forEach(w => {
        if(w.dashed) { ctx.setLineDash([5,5]); ctx.strokeStyle = w.color || '#ef4444'; }
        else { ctx.setLineDash([]); ctx.strokeStyle = st.theme==='dark' ? 'rgba(203, 213, 225, 0.8)' : 'rgba(71, 85, 105, 0.8)'; }
        ctx.beginPath(); ctx.moveTo(w.path[0].x, w.path[0].y); w.path.forEach(p => ctx.lineTo(p.x, p.y)); ctx.stroke();
    });
    ctx.setLineDash([]); 
    
    if(st.routingStart && st.tempWireEnd && tCur.currentViewIdx === -1) {
        ctx.strokeStyle = '#ef4444'; ctx.beginPath(); ctx.moveTo(st.routingStart.x, st.routingStart.y); ctx.lineTo(st.tempWireEnd.x, st.tempWireEnd.y); ctx.stroke();
    }
    
    // Puntos Ωísicos (Nodos Reales y Puntos de Quiebre Naranjas)
    ctx.fillStyle = '#f59e0b'; // Naranja brillante
    renderNodes.forEach(n => {
        let isConnected = renderWires.some(w => w.n1===n.id || w.n2===n.id);
        if(isConnected) { ctx.beginPath(); ctx.arc(n.x,n.y,4.5,0,Math.PI*2); ctx.fill(); }
    });

    // Punto dinámico naranja durante enrutamiento
    if(st.routingStart && tCur.currentViewIdx === -1) {
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath(); ctx.arc(st.routingStart.x, st.routingStart.y, 5.5, 0, Math.PI*2); ctx.fill();
        if(st.tempWireEnd) { ctx.beginPath(); ctx.arc(st.tempWireEnd.x, st.tempWireEnd.y, 5.5, 0, Math.PI*2); ctx.fill(); }
    }
    
    renderComps.forEach(drawComp);
    
    if(st.selBox && st.tool==='select' && tCur.currentViewIdx === -1) {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.1)'; ctx.strokeStyle = '#ef4444'; ctx.setLineDash([5,5]);
        let x = Math.min(st.selBox.startX, st.selBox.endX), y = Math.min(st.selBox.startY, st.selBox.endY);
        let w = Math.abs(st.selBox.endX - st.selBox.startX), h = Math.abs(st.selBox.endY - st.selBox.startY);
        ctx.fillRect(x,y,w,h); ctx.strokeRect(x,y,w,h); ctx.setLineDash([]);
    }

    st.particles.forEach((p,i) => { ctx.fillStyle=p.c; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,6); ctx.fill(); p.x+=p.vx; p.y+=p.vy; p.a-=0.02; if(p.a<=0) st.particles.splice(i,1); });
    ctx.restore();
    if(st.particles.length>0) requestAnimatiomΩrame(render);
};

// Panel Propiedades (Ventana Ωlotante)
const renderProps = () => {
    const pc = $('props-content'); const pw = $('props-window');
    if(st.sel.length === 0) { pw.style.display='none'; return; }
    pw.style.display='flex'; pw.classList.remove('minimized');
    
    if(st.sel.length > 1) { 
        pc.innerHTML = `<b>${st.sel.length} items seleccionados</b><br><button class="btn btn-outline" id="btn-del-multi" style="margin-top:8px; border-color:var(--danger); color:var(--danger); width:100%;">Eliminar Todos</button>`; 
        $('btn-del-multi').onclick = () => { cur().comps = cur().comps.filter(c => !st.sel.includes(c)); st.sel=[]; pw.style.display='none'; syncState(); render(); }; return; 
    }
    
    let c = st.sel[0];
    pc.innerHTML = `
        <div class="input-group"><label>Tipo</label><input disabled value="${c.type}" style="font-weight:bold;"></div>
        <div class="input-group"><label>Rotar (Grados - Libre)</label>
            <div style="display:flex; gap:8px;">
                <input type="range" id="prop-rot" min="0" max="360" step="1" value="${c.rot}" style="flex:1; accent-color:#ef4444;">
                <span id="prop-rot-val" style="font-size:0.8rem; width:35px; font-weight:bold;">${c.rot}°</span>
            </div>
        </div>
        <div class="input-group"><label>Valor Numérico Base</label>
            <div style="display:flex; gap:8px;">
                <input type="number" id="prop-val" value="${c.val.toFixed(4)}" style="flex:1; font-weight:bold;">
                <select id="prop-unit" style="width:80px;">
                    ${['kΩ','Ω','mΩ','MΩ'].map(u=>`<option value="${u}" ${c.unit===u?'selected':''}>${u}</option>`).join('')}
                </select>
            </div>
        </div>
        ${c.type.includes('res') ? `<div class="input-group"><label>Max P (Potencia Máx W)</label><input type="number" id="prop-max" value="${c.maxV||0.25}"></div>` : ''}
    `;

    if(c.type.includes('res')) {
        let mats = ['carbono', 'cobre', 'aluminio', 'oro', 'plata', 'grafito', 'nicrom'];
        pc.innerHTML += `
        <div style="margin-top:16px; border-top:1px solid var(--glass-border); padding-top:12px;">
            <div class="panel-title" style="font-size:0.8rem; margin-bottom:8px;"><i class="ph ph-atom"></i> Física Constructiva</div>
            <div class="input-group"><label>Material (Resistividad)</label>
                <select id="prop-mat">
                    ${mats.map(k=>`<option value="${k}" ${c.material===k?'selected':''}>${k.toUpperCase()}</option>`).join('')}
                </select>
            </div>
            
            <div class="physics-grid" id="phys-vars">
                <div class="input-group"><label>Largo L (m)</label><input type="number" id="p-L" value="${c.L||0.01}" step="0.001"></div>
                <div class="input-group"><label>Área A (m²)</label><input type="number" id="p-A" value="${c.A||0.0001}" step="0.0001"></div>
            </div>
        </div>`;
    }

    pc.innerHTML += `<button class="btn btn-outline" id="btn-del-comp" style="margin-top:16px; width:100%; border-color:var(--danger); color:var(--danger);"><i class="ph ph-trash"></i> Eliminar Componente</button>`;

    const recalc = () => { if(c.type.includes('res')) { calcPhysicsR(c); renderProps(); } syncState(); render(); };

    $('prop-rot').onchange = $('prop-rot').oninput = e => { c.rot = parseInt(e.target.value); $('prop-rot-val').innerText = `${c.rot}°`; syncState(); render(); };
    $('prop-val').onchange = e => { c.val = parseFloat(e.target.value); syncState(); render(); };
    $('prop-unit').onchange = e => { c.unit = e.target.value; recalc(); };
    if($('prop-max')) $('prop-max').onchange = e => { c.maxV = parseFloat(e.target.value); syncState(); render(); };
    
    if(c.type.includes('res')) {
        $('prop-mat').onchange = e => { c.material = e.target.value; recalc(); };
        ['p-L','p-A'].forEach(id => { if($(id)) $(id).onchange = e => { c[id.split('-')[1]] = parseFloat(e.target.value); recalc(); }; });
    }
    $('btn-del-comp').onclick = () => { cur().comps = cur().comps.filter(x=>x.id!==c.id); st.sel=[]; pw.style.display='none'; syncState(); render(); };
};

$('btn-clear').onclick = () => { cur().comps=[]; cur().wires=[]; cur().nodes=[]; setTimelineView(-1); syncState(); render(); $('katex-container').innerHTML='Circuito limpio'; $('btn-show-steps').style.display='none'; $('table-results').style.display='none'; $('props-window').style.display='none'; $('math-window').style.display='none';};

// ==========================================
// 7. MOTOR MATEMÁTICO (SOLVER & EXPANSION & POLARITY BFS)
// ==========================================
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
    // 1. Identificar TODOS los nodos activos basados únicamente en los componentes actuales
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
    
    // 2. Un cable solo sobrevive si ambos extremos terminan eventualmente en un activeNode
    // Construimos grafo de cables
    let adj = {};
    let validWires = [];
    wires.forEach(w => {
        if(w.dashed) { validWires.push(w); return; } // Los cables nuevos siempre viven
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
    
    // Eliminar cables colgados agresivamente
    // Un cable es válido si FUE VISITADO y ninguno de sus extremos es un "callejón sin salida" (grado 1 que no sea activo)
    let finalWires = wires.filter(w => w.dashed || visitedWires.has(w.id));
    
    // Purga de "pelos" o cables sueltos que no conectan a nada más (Dead ends)
    let changed = true;
    while(changed) {
        changed = false;
        let deg = {};
        finalWires.forEach(w => {
            if(w.dashed) return;
            deg[w.n1] = (deg[w.n1]||0) + 1;
            deg[w.n2] = (deg[w.n2]||0) + 1;
        });
        let before = finalWires.length;
        finalWires = finalWires.filter(w => {
            if(w.dashed) return true;
            // Si un nodo del cable tiene grado 1 y NO es un nodo activo (pin de componente), entonces es basura colgando
            if(deg[w.n1] === 1 && !activeNodes.has(w.n1)) return false;
            if(deg[w.n2] === 1 && !activeNodes.has(w.n2)) return false;
            return true;
        });
        if(finalWires.length < before) changed = true;
    }
    
    return finalWires;
};

