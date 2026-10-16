import os, glob, re

sims = [
    'Capacitance.html',
    'Coulomb.html',
    'Laboratorio_Gauss_Avanzado.html',
    'LorentzLab10easy.html',
    'Potencial_Electrico.html',
    'Potencial_Electrico_2.html',
    'Resistance.html',
    'Sim_M10_FEM_Movimiento.html',
    'Sim_M10_FlujoMagnetico.html',
    'Sim_M11_EcuacionesMaxwell.html',
    'Sim_M11_OndaEM.html',
    'Sim_M12_Fasores.html',
    'Sim_M12_OsciladorLC.html',
    'Sim_M12_RLC.html',
    'Sim_M1_Cargas.html',
    'Sim_M1_Coulomb_Pro.html',
    'Sim_M2_Anillo.html',
    'Sim_M2_Arco.html',
    'Sim_M2_Campo_Vectorial.html',
    'Sim_M2_Cilindro.html',
    'Sim_M2_Disco.html',
    'Sim_M2_Semicirculo.html',
    'Sim_M2_Tablero_Distribuciones.html',
    'Sim_M2_Tablero_Lineas.html',
    'Sim_M2_Varilla.html',
    'Sim_M3_Flujo.html',
    'Sim_M6_CircuitoDC.html',
    'Sim_M6_Resistividad.html',
    'Sim_M8_BiotSavart_Anillo.html',
    'Sim_M8_BiotSavart_Hilo.html',
    'Sim_M9_Solenoide.html',
    'Sim_M9_Tabla_Ampere.html',
    'Tabla_Gauss.html'
]

results = []
for s in sims:
    path = os.path.join('simuladores', s)
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    has_tailwind = 'cdn.tailwindcss.com' in content
    has_lab10_core = 'lab10-core.css' in content
    has_katex = 'katex' in content
    has_mathjax = 'mathjax' in content.lower()
    has_header = '<header' in content
    has_bus = 'lab10-bus.js' in content
    title_m = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE)
    title = title_m.group(1) if title_m else 'No Title'
    results.append({
        'name': s,
        'title': title,
        'tailwind': has_tailwind,
        'lab10_css': has_lab10_core,
        'katex': has_katex,
        'mathjax': has_mathjax,
        'has_header': has_header,
        'has_bus': has_bus
    })

print(f"{'Simulador':<32} | {'Tailwind':<8} | {'lab10.css':<9} | {'KaTeX':<5} | {'Header':<6} | {'Bus':<5} | Title")
print("-" * 105)
for r in results:
    tw = 'YES' if r['tailwind'] else 'no'
    css = 'YES' if r['lab10_css'] else 'no'
    kt = 'YES' if r['katex'] else 'no'
    hd = 'YES' if r['has_header'] else 'no'
    bu = 'YES' if r['has_bus'] else 'no'
    print(f"{r['name']:<32} | {tw:<8} | {css:<9} | {kt:<5} | {hd:<6} | {bu:<5} | {r['title'][:35]}")
