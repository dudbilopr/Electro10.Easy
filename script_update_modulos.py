import glob, re, os

os.makedirs('juegos', exist_ok=True)

modules = glob.glob('modulos/modulo*.js')

for mod_file in modules:
    with open(mod_file, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Extract module number
    match = re.search(r'modulo(\d+)\.js', mod_file)
    if not match: continue
    mod_num = match.group(1)
    
    # Check if game already exists in lessons
    if "'juego'" not in text:
        # We need to insert a game lesson. Find the lessons array.
        # It's usually `const lecciones = [...]`
        # We can append it at the end of the array, before `];`
        
        juego_lesson = f"""    {{
        id: 'm{mod_num}-juego',
        titulo: 'Juego Interactivo: Conceptos de Módulo {mod_num}',
        descripcion: 'Diviértete repasando los conceptos aprendidos.',
        tipo: 'juego',
        recurso: 'juegos/juego_m{mod_num}.html',
        completado: false
    }},"""
        
        text = re.sub(r'(\s*)];\s*export const modulo\d+', r'\1' + juego_lesson + r'\1];\nexport const modulo' + mod_num, text)

    # Check if clase_emi already exists in lessons
    if "'clase_emi'" not in text:
        emi_lesson = f"""    {{
        id: 'm{mod_num}-emi',
        titulo: 'Clase EMI (English as a Medium of Instruction)',
        descripcion: 'Aprende y practica la pronunciación y vocabulario en inglés.',
        tipo: 'clase_emi',
        recurso: '../Dia_{mod_num}/index.html',
        completado: false
    }},"""
        text = re.sub(r'(\s*)];\s*export const modulo\d+', r'\1' + emi_lesson + r'\1];\nexport const modulo' + mod_num, text)
        
    with open(mod_file, 'w', encoding='utf-8') as f:
        f.write(text)

print("modulos updated with games and EMI classes")
