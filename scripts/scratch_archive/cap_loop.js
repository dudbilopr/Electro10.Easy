while(workingEdges.length > 1 && step < 50) {
        let reduced = false; let sColor = STEP_COLORS[(step-1) % STEP_COLORS.length];
        
        let pMap = {};
        workingEdges.forEach(e => { let k = e.n1<e.n2 ? `${e.n1}-${e.n2}` : `${e.n2}-${e.n1}`; (pMap[k]=pMap[k]||[]).push(e); });
        
        for(let k in pMap) {
            if(pMap[k].length > 1) { 
                let group = pMap[k]; let cEq = group.reduce((s,c)=>s+c.val,0);
                let names = group.map(c=>`C_{${c.id.substring(0,3)}}`).join(' + ');
                blocks.push({type:'math', content:`\\text{Paso } ${step}: \\text{Paralelo } \\Rightarrow C_{eq${step}} = ${names} = ${cEq.toFixed(2)}\\mu F`});
                
                let eqEdge = {id:`eq${step}`, val:cEq, n1:group[0].n1, n2:group[0].n2, isEq:true, comps:group, type:'P', color: sColor};
                workingEdges = workingEdges.filter(e => !group.includes(e)); workingEdges.push(eqEdge); history.push(eqEdge);
                
                let lastState = cur().circuitStates[cur().circuitStates.length-1];
                let curComps = JSON.parse(JSON.stringify(lastState.comps)); let curWires = JSON.parse(JSON.stringify(lastState.wires));
                let anchor = curComps.find(c => c.id === group[0].id); let cx = anchor ? anchor.x : 200, cy = anchor ? anchor.y : 200;
                group.forEach(g => { curComps = curComps.filter(c => c.id !== g.id); }); 
                
                let n1Obj = cur().nodes.find(n=>n.id===group[0].n1) || {x:cx-40, y:cy}; let n2Obj = cur().nodes.find(n=>n.id===group[0].n2) || {x:cx+40, y:cy};
                curComps.push({ id: `eq${step}`, type:'cap_ceramic', x:cx, y:cy, val:cEq, unit:'µF', rot:0, isEq:true, stepColor:sColor, n1: group[0].n1, n2: group[0].n2 });
                curWires.push({ id:uid(), dashed:true, color:sColor, path:[{x:cx-20,y:cy}, {x:cx-20,y:n1Obj.y}, {x:n1Obj.x,y:n1Obj.y}] });
                curWires.push({ id:uid(), dashed:true, color:sColor, path:[{x:cx+20,y:cy}, {x:cx+20,y:n2Obj.y}, {x:n2Obj.x,y:n2Obj.y}] });
                
                // Ocultar cables muertos
                curWires = pruneStepWires(curComps, curWires, vSrc);
                cur().circuitStates.push({ comps: curComps, wires: curWires, nodes: cur().nodes, name: `Paso ${step}: Eq Paralelo` });
                step++; reduced=true; break;
            }
        }
        if(reduced) continue;

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
                let invSum = group.reduce((s,c)=>s+(1/c.val), 0); let cEq = 1/invSum;
                let names = group.map(c=>`\\frac{1}{C_{${c.id.substring(0,3)}}}`).join(' + ');
                blocks.push({type:'math', content:`\\text{Paso } ${step}: \\text{Serie } \\Rightarrow C_{eq${step}} = \\left(${names}\\right)^{-1} = ${cEq.toFixed(2)}\\mu F`});

                let endNodes = []; group.forEach(e => { if(!chainNodes.has(e.n1)) endNodes.push(e.n1); if(!chainNodes.has(e.n2)) endNodes.push(e.n2); });
                let eqEdge = {id:`eq${step}`, val:cEq, n1:endNodes[0], n2:endNodes[1], isEq:true, comps:group, type:'S', color:sColor};
                workingEdges = workingEdges.filter(e => !group.includes(e)); workingEdges.push(eqEdge); history.push(eqEdge);
                
                let lastState = cur().circuitStates[cur().circuitStates.length-1];
                let curComps = JSON.parse(JSON.stringify(lastState.comps)); let curWires = JSON.parse(JSON.stringify(lastState.wires));
                let anchor = curComps.find(c => c.id === group[0].id); let cx = anchor ? anchor.x : 200, cy = anchor ? anchor.y : 200;
                group.forEach(g => { curComps = curComps.filter(c => c.id !== g.id); });
                
                let n1Obj = cur().nodes.find(n=>n.id===endNodes[0]) || {x:cx-40, y:cy}; let n2Obj = cur().nodes.find(n=>n.id===endNodes[1]) || {x:cx+40, y:cy};
                curComps.push({ id: `eq${step}`, type:'cap_ceramic', x:cx, y:cy, val:cEq, unit:'µF', rot:0, isEq:true, stepColor:sColor, n1: endNodes[0], n2: endNodes[1] });
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