import re
import os

with open('simuladores/Capacitance.html', 'r', encoding='utf-8') as f:
    code = f.read()

replacements = {
    'Capacitance10.easy': 'Resistance10.easy',
    'Capacitancia': 'Resistencia',
    'capacitancia': 'resistencia',
    'Capacitor': 'Resistor',
    'capacitor': 'resistor',
    'Capacitores': 'Resistores',
    'capacitores': 'resistores',
    'Redes Capacitivas': 'Redes Resistivas',
    'cap_ceramic': 'res_fixed',
    'cap_electro': 'res_var',
    'Faradios': 'Ohmios',
    'Farads': 'Ohms',
    ' F': ' Ω',
    'mF': 'kΩ',
    'µF': 'Ω',
    'nF': 'mΩ',
    'pF': 'MΩ',
    'C_eq': 'R_eq',
    'C_': 'R_',
    'C1': 'R1',
    'C2': 'R2',
    'C3': 'R3',
    'C4': 'R4',
    'var(--accent)': '#ef4444', # Let's change accent to red for resistance
    'rgba(14, 165, 233': 'rgba(239, 68, 68',
    '#3b82f6': '#ef4444',
    '#0ea5e9': '#dc2626',
    'rgba(14,165,233': 'rgba(239,68,68'
}

for k, v in replacements.items():
    code = code.replace(k, v)

# Fix toolbar icons and titles
code = code.replace('Resistor Placas Paralelas', 'Resistor Fijo')
code = code.replace('Resistor Electrolítico', 'Resistor Variable')
code = code.replace('<i class="ph ph-pause" style="transform: rotate(90deg);"></i>', '<i class="ph ph-wave-sawtooth"></i>')

# Now for the series/parallel logic, we need to swap them!
# In the original, Series is C_eq = 1 / (1/c1 + 1/c2), Parallel is C_eq = c1 + c2
# We need Resistor series: R_eq = R1 + R2, Parallel = 1 / (1/R1 + 1/R2)

code = code.replace('val = sum', 'val = sum_parallel_placeholder')
code = code.replace('val = 1 / invSum', 'val = sum')
code = code.replace('val = sum_parallel_placeholder', 'val = 1 / invSum')

code = code.replace('str += `${n.id} (${v.toFixed(2)} Ω) `;', 'str += `${n.id} (${v.toFixed(2)} Ω) `;')

with open('simuladores/Resistance.html', 'w', encoding='utf-8') as f:
    f.write(code)

print("Done generating Resistance.html")
