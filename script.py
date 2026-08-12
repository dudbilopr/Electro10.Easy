import os, glob, re

modulos = glob.glob('c:/Users/dudbi/Downloads/EMI_COURSE/Electro10.Easy_repo/modulos/modulo*.js')

cuestionarios = {
    '1': 'Cuestionario_1_Ley_de_Coulomb.html',
    '2': 'Cuestionario_2_Campo_Electrico.html',
    '3': 'Cuestionario_3_Trabajo_Potencial_Electrico.html',
    '4': 'Cuestionario_4_Distribuciones_de_Carga_continua.html',
    '5': 'Cuestionario_5_Flujo_Electrico_Ley_de_Gauss.html',
    '7': 'Cuestionario_7_Circuitos_CC.html'
}

for mod_file in modulos:
    if 'presaberes' in mod_file: continue
    
    basename = os.path.basename(mod_file)
    mod_num = basename.replace('modulo', '').replace('.js', '')
    
    if mod_num not in cuestionarios:
        continue
        
    cuestionario_file = cuestionarios[mod_num]
    
    with open(mod_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'Cuestionario_' not in content and 'Quiz_Adaptativo_' in content:
        quiz_block_pattern = re.compile(r'(\{\s*"id":\s*"m\d+-q1".*?"recurso":\s*"quizzes/Quiz_Adaptativo_.*?\}\s*\,?)', re.DOTALL)
        
        new_cuestionario = f'''{{
            "id": "m{mod_num}-eval", "tipo": "quiz",
            "recurso": "quizzes/{cuestionario_file}",
            "titulo": "Evaluación Completa — Módulo {mod_num}",
            "descripcion": "Cuestionario final de evaluación de todos los conceptos del módulo.",
            "xp": 50
        }},'''
        
        def replacer(match):
            return match.group(1) + '\n        ' + new_cuestionario
            
        new_content = quiz_block_pattern.sub(replacer, content)
        
        with open(mod_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {basename}')
