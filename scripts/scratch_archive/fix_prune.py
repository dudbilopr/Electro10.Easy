import re
with open('simuladores/Resistance.html', 'r', encoding='utf-8') as f:
    text = f.read()

prune_orig = r"""const pruneStepWires = (comps, wires, sourceEdge) => {
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
};"""

prune_new = r"""const pruneStepWires = (comps, wires, sourceEdge) => {
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
};"""

start = text.find('const pruneStepWires =')
end = text.find('const setTimelineView =')

if start != -1 and end != -1:
    new_text = text[:start] + prune_new + '\n\n' + text[end:]
    with open('simuladores/Resistance.html', 'w', encoding='utf-8') as f:
        f.write(new_text)
    print("Prune updated successfully!")
else:
    print("Failed to find boundaries.")
