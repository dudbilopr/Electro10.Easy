import glob, re, os

modulos = glob.glob('c:/Users/dudbi/Downloads/EMI_COURSE/Electro10.Easy_repo/modulos/modulo*.js')
for file in modulos:
    if 'presaberes' in file: continue
    
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Update titles in modulos
    # Evaluacion:
    text = re.sub(r'"titulo":\s*"Evaluación Completa — Módulo (\d+)"', r'"titulo": "7. Evaluación del Módulo \1"', text)
    
    # NotebookLLM:
    text = re.sub(r'"titulo":\s*"7\.\s*NotebookLLM', r'"titulo": "8. NotebookLLM', text)
    
    # Referencias:
    text = re.sub(r'"titulo":\s*"8\.\s*Referencias', r'"titulo": "9. Referencias', text)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(text)
    print(f'Updated {os.path.basename(file)}')
