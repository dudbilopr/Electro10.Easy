import re

with open('simuladores/Resistance.html', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('const render = () => {')
end = text.find('const setTimelineView')

if start != -1 and end != -1:
    with open('scratch/render.js', 'w', encoding='utf-8') as f:
        f.write(text[start:end])
    print('Extracted')
else:
    print('Not found')
