import re
with open('simuladores/Resistance.html', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('const drawComp = (c) => {')
end = text.find('// Física Visual')

if start != -1 and end != -1:
    with open('scratch/draw.js', 'w', encoding='utf-8') as f:
        f.write(text[start:end])
    print("Extracted.")
else:
    print("Not found.")
