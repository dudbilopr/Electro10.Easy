import re

with open('simuladores/Resistance.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Modify parallel reduction block
p_orig = r"""blocks.push({type:'math', content:`\\text{Paso } ${step}: \\text{Paralelo } \\Rightarrow ${eqName} = \\left(${names}\\right)^{-1} = ${cEq.toFixed(2)}\\Omega`});"""
p_new = r"""blocks.push({type:'math', content:`\\text{\\textbf{Paso } } ${step}\\text{\\textbf{: Reducción en Paralelo}}\\\\ \\text{Los componentes comparten terminales (Voltaje constante).}\\\\ \\Rightarrow ${eqName} = \\left(${names}\\right)^{-1} = ${cEq.toFixed(2)}\\Omega`});"""
text = text.replace(p_orig, p_new)

# Modify series reduction block
s_orig = r"""blocks.push({type:'math', content:`\\text{Paso } ${step}: \\text{Serie } \\Rightarrow ${eqName} = ${names} = ${cEq.toFixed(2)}\\Omega`});"""
s_new = r"""blocks.push({type:'math', content:`\\text{\\textbf{Paso } } ${step}\\text{\\textbf{: Reducción en Serie}}\\\\ \\text{Los componentes comparten un solo nodo (Corriente constante).}\\\\ \\Rightarrow ${eqName} = ${names} = ${cEq.toFixed(2)}\\Omega`});"""
text = text.replace(s_orig, s_new)

# Modify parallel retropropagation
rp_orig = r"""let t = `${nameMap[eq.id]} \\text{ (Paralelo): } V = ${eqV.toFixed(2)}V \\Rightarrow ` + eq.comps.map(c => `I_{${nameMap[c.id].replace('R_{','')}} = ${(c.I).toFixed(2)}A`).join(', ');"""
rp_new = r"""let t = `\\text{\\textbf{Desglose de }} ${nameMap[eq.id]} \\text{ (Paralelo)}\\\\ \\text{Voltaje cte: } V = ${eqV.toFixed(2)}V \\Rightarrow ` + eq.comps.map(c => `I_{${nameMap[c.id].replace('R_{','')}} = ${(c.I).toFixed(2)}A`).join(', ');"""
text = text.replace(rp_orig, rp_new)

# Modify series retropropagation
rs_orig = r"""let t = `${nameMap[eq.id]} \\text{ (Serie): } I = ${eqI.toFixed(2)}A \\Rightarrow ` + eq.comps.map(c => `V_{${nameMap[c.id].replace('R_{','')}} = ${(c.V).toFixed(2)}V`).join(', ');"""
rs_new = r"""let t = `\\text{\\textbf{Desglose de }} ${nameMap[eq.id]} \\text{ (Serie)}\\\\ \\text{Corriente cte: } I = ${eqI.toFixed(2)}A \\Rightarrow ` + eq.comps.map(c => `V_{${nameMap[c.id].replace('R_{','')}} = ${(c.V).toFixed(2)}V`).join(', ');"""
text = text.replace(rs_orig, rs_new)

with open('simuladores/Resistance.html', 'w', encoding='utf-8') as f:
    f.write(text)

print('Added explanations')
