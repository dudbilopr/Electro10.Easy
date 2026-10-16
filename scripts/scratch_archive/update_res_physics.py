import re

with open('simuladores/Resistance.html', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace constants
physics_orig = r"""// Constantes Ωísicas
const E0 = 8.854e-12; 
const DIEL = { vacio:1, teflon:2.1, papel:3.7, vidrio:7.5, ceramica:100 };

const calcPhysicsC = (c) => {
    let er1 = DIEL[c.er1||'vacio'], er2 = DIEL[c.er2||'vacio'];
    let erEq = er1;
    if(c.composite === 'serie') erEq = 1 / (0.5/er1 + 0.5/er2);
    else if(c.composite === 'paralelo') erEq = (er1 + er2) / 2;
    
    let R_f = 0;
    if(c.geom === 'paralelas') R_f = (erEq * E0 * c.A) / c.d;
    else if(c.geom === 'cilindrico') R_f = (2 * Math.PI * erEq * E0 * c.L) / Math.log(c.b / c.a);
    else if(c.geom === 'esferico') R_f = (4 * Math.PI * erEq * E0) / ((1/c.a) - (1/c.b));
    
    let mult = 1e-6; 
    if(c.unit==='kΩ') mult = 1e-3; else if(c.unit==='mΩ') mult = 1e-9; else if(c.unit==='MΩ') mult = 1e-12;
    c.val = R_f / mult;
    return c.val;
};"""

physics_new = r"""// Constantes Físicas
const RHO = { carbono:3.5e-5, cobre:1.68e-8, aluminio:2.82e-8, oro:2.44e-8, plata:1.59e-8, grafito:3e-5, nicrom:1.1e-6 };

const calcPhysicsR = (c) => {
    let rho = RHO[c.material||'carbono'];
    let R_f = (rho * (c.L||0.01)) / (c.A||0.0001); // R = rho * L / A
    
    let mult = 1; 
    if(c.unit==='kΩ') mult = 1e3; else if(c.unit==='mΩ') mult = 1e-3; else if(c.unit==='MΩ') mult = 1e6;
    c.val = R_f / mult;
    return c.val;
};"""

code = code.replace(physics_orig, physics_new)
code = code.replace("calcPhysicsC", "calcPhysicsR")

# Props orig
props_orig = r"""${c.type.includes('cap') ? `<div class="input-group"><label>Max V (Voltaje Ruptura)</label><input type="number" id="prop-max" value="${c.maxV||50}"></div>` : ''}
    `;

    if(c.type.includes('cap')) {
        pc.innerHTML += `
        <div style="margin-top:16px; border-top:1px solid var(--glass-border); padding-top:12px;">
            <div class="panel-title" style="font-size:0.8rem; margin-bottom:8px;"><i class="ph ph-atom"></i> Ωísica Constructiva</div>
            <div class="input-group"><label>Geometría del Resistor</label>
                <select id="prop-geom">
                    <option value="paralelas" ${c.geom==='paralelas'?'selected':''}>Placas Paralelas</option>
                    <option value="cilindrico" ${c.geom==='cilindrico'?'selected':''}>Cilíndrico</option>
                    <option value="esferico" ${c.geom==='esferico'?'selected':''}>Esférico</option>
                </select>
            </div>
            
            <div class="physics-grid" id="phys-vars">
                ${c.geom==='paralelas' ? `<div class="input-group"><label>Área (m²)</label><input type="number" id="p-A" value="${c.A}" step="0.001"></div><div class="input-group"><label>Dist. d (m)</label><input type="number" id="p-d" value="${c.d}" step="0.001"></div>` : ''}
                ${c.geom==='cilindrico' ? `<div class="input-group"><label>Radio Int. a (m)</label><input type="number" id="p-a" value="${c.a}" step="0.001"></div><div class="input-group"><label>Radio Ext. b (m)</label><input type="number" id="p-b" value="${c.b}" step="0.001"></div><div class="input-group" style="grid-column: span 2;"><label>Largo L (m)</label><input type="number" id="p-L" value="${c.L}" step="0.001"></div>` : ''}
                ${c.geom==='esferico' ? `<div class="input-group"><label>Radio Int. a (m)</label><input type="number" id="p-a" value="${c.a}" step="0.001"></div><div class="input-group"><label>Radio Ext. b (m)</label><input type="number" id="p-b" value="${c.b}" step="0.001"></div>` : ''}
            </div>

            <div class="input-group" style="margin-top:12px;"><label>Dieléctrico (Permitividad)</label>
                <select id="prop-comp">
                    <option value="none" ${c.composite==='none'?'selected':''}>Simple (1 Capa)</option>
                    <option value="serie" ${c.composite==='serie'?'selected':''}>Doble (Capas en Serie)</option>
                    <option value="paralelo" ${c.composite==='paralelo'?'selected':''}>Doble (Capas Paralelas)</option>
                </select>
            </div>
            
            <div class="physics-grid">
                <div class="input-group"><label>Mat ${c.composite!=='none'?'1':''}</label>
                    <select id="prop-d1">${Object.keys(DIEL).map(k=>`<option value="${k}" ${c.er1===k?'selected':''}>${k}</option>`).join('')}</select>
                </div>
                ${c.composite!=='none' ? `<div class="input-group"><label>Mat 2</label>
                    <select id="prop-d2">${Object.keys(DIEL).map(k=>`<option value="${k}" ${c.er2===k?'selected':''}>${k}</option>`).join('')}</select>
                </div>` : ''}
            </div>
        </div>`;
    }"""

props_new = r"""${c.type.includes('res') ? `<div class="input-group"><label>Max P (Potencia Máx W)</label><input type="number" id="prop-max" value="${c.maxV||0.25}"></div>` : ''}
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
    }"""

code = code.replace(props_orig, props_new)

# Props bind events orig
bind_orig = r"""    if(c.type.includes('cap')) {
        $('prop-geom').onchange = e => { c.geom = e.target.value; recalc(); };
        $('prop-comp').onchange = e => { c.composite = e.target.value; recalc(); };
        $('prop-d1').onchange = e => { c.er1 = e.target.value; recalc(); };
        if($('prop-d2')) $('prop-d2').onchange = e => { c.er2 = e.target.value; recalc(); };
        ['p-A','p-d','p-a','p-b','p-L'].forEach(id => { if($(id)) $(id).onchange = e => { c[id.split('-')[1]] = parseFloat(e.target.value); recalc(); }; });
    }"""

bind_new = r"""    if(c.type.includes('res')) {
        $('prop-mat').onchange = e => { c.material = e.target.value; recalc(); };
        ['p-L','p-A'].forEach(id => { if($(id)) $(id).onchange = e => { c[id.split('-')[1]] = parseFloat(e.target.value); recalc(); }; });
    }"""

code = code.replace(bind_orig, bind_new)
code = code.replace("c.type.includes('cap')", "c.type.includes('res')")

with open('simuladores/Resistance.html', 'w', encoding='utf-8') as f:
    f.write(code)

print("Props and Physics replaced successfully")
