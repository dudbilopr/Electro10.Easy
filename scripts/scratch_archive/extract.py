import re

with open('simuladores/Resistance.html', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find("$('btn-solve').onclick = () => {")
end = text.find("const triggerExplosion")

if start != -1 and end != -1:
    with open('scratch/btn_solve.js', 'w', encoding='utf-8') as f:
        f.write(text[start:end])
    print("Extracted successfully.")
else:
    print("Could not find start or end markers.")
