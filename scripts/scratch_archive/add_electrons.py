import re

with open('simuladores/Resistance.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update render() to include animation loop for electrons
render_orig = r"""    st.particles.forEach((p,i) => { ctx.fillStyle=p.c; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,6); ctx.fill(); p.x+=p.vx; p.y+=p.vy; p.a-=0.02; if(p.a<=0) st.particles.splice(i,1); });
    ctx.restore();
    if(st.particles.length>0) requestAnimatiomΩrame(render);
};"""

render_new = r"""    st.particles.forEach((p,i) => { ctx.fillStyle=p.c; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,6); ctx.fill(); p.x+=p.vx; p.y+=p.vy; p.a-=0.02; if(p.a<=0) st.particles.splice(i,1); });
    
    // Dibujar electrones/corriente dinámica
    let time = Date.now() / 1000;
    renderWires.forEach(w => {
        let current = w.I || 0; // Usar la corriente si está pre-calculada en el cable
        // Buscar si el cable conecta con algo que tenga I
        if(!current) {
            let comp = renderComps.find(c => c.id === w.n1 || c.id === w.n2 || w.id.includes(c.id));
            if(comp && comp.I) current = comp.I;
        }
        // Asignar corriente genérica para visualización si el sistema está resuelto
        if(tCur.circuitStates && tCur.circuitStates.length > 1) {
            current = current || 1; 
        }
        
        if(current > 0 && w.path && w.path.length > 1) {
            ctx.fillStyle = '#3b82f6'; // Azul eléctrico
            let speed = Math.min(5, Math.max(1, current * 2));
            let offset = (time * speed) % 1;
            
            for(let i=0; i<w.path.length-1; i++) {
                let p1 = w.path[i], p2 = w.path[i+1];
                let dx = p2.x - p1.x, dy = p2.y - p1.y;
                let len = Math.hypot(dx, dy);
                if(len === 0) continue;
                
                // Varias cargas por segmento
                let numCharges = Math.floor(len / 30);
                for(let j=0; j<=numCharges; j++) {
                    let segmentOffset = (offset + j/numCharges) % 1;
                    let ex = p1.x + dx * segmentOffset;
                    let ey = p1.y + dy * segmentOffset;
                    ctx.beginPath(); ctx.arc(ex, ey, 3, 0, Math.PI*2); ctx.fill();
                }
            }
        }
    });

    ctx.restore();
    // Animación continua siempre para los electrones
    requestAnimationFrame(render);
};"""

text = text.replace(render_orig, render_new)

# We need to trigger render once to start the loop
if 'render();' in text:
    pass # render is called in init

with open('simuladores/Resistance.html', 'w', encoding='utf-8') as f:
    f.write(text)

print('Added electrons')
