import re

def create_cuestionario(template_path, out_path, title, questions_json):
    with open(template_path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Replace title
    text = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', text)
    
    # Replace questions array
    # Find the block starting with "const questions = [" and ending with "];"
    text = re.sub(r'const questions = \[.*?\];', f'const questions = {questions_json};', text, flags=re.DOTALL)
    
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(text)

template = 'c:/Users/dudbi/Downloads/EMI_COURSE/Electro10.Easy_repo/Examen/Cuestionario_1_Ley_de_Coulomb.html'

q6 = "[" + ",\n".join([f"""{{
    type: 'mcq',
    text: 'Pregunta {i} de Capacitancia: ¿Cuál es la unidad de capacitancia?',
    options: ['Faradio', 'Coulomb', 'Voltio', 'Amperio'],
    answer: 0,
    tip: 'El faradio (F) es la unidad del SI.'
}}""" for i in range(1, 21)]) + "]"

create_cuestionario(template, 'c:/Users/dudbi/Downloads/EMI_COURSE/Electro10.Easy_repo/Examen/Cuestionario_6_Capacitancia.html', 'Física Universitaria: Capacitancia', q6)

q8 = "[" + ",\n".join([f"""{{
    type: 'mcq',
    text: 'Pregunta {i} de Campo Magnético: ¿Cuál es la unidad del campo magnético?',
    options: ['Tesla', 'Weber', 'Faradio', 'Henry'],
    answer: 0,
    tip: 'El Tesla (T) es la unidad del SI.'
}}""" for i in range(1, 21)]) + "]"

create_cuestionario(template, 'c:/Users/dudbi/Downloads/EMI_COURSE/Electro10.Easy_repo/Examen/Cuestionario_8_Campo_Magnetico.html', 'Física Universitaria: Campo Magnético', q8)

q9 = "[" + ",\n".join([f"""{{
    type: 'mcq',
    text: 'Pregunta {i} de Ley de Ampère: ¿Qué genera una corriente eléctrica constante?',
    options: ['Campo magnético constante', 'Campo eléctrico variable', 'Ondas electromagnéticas', 'Nada'],
    answer: 0,
    tip: 'Una corriente estacionaria genera un campo magnético estático.'
}}""" for i in range(1, 21)]) + "]"

create_cuestionario(template, 'c:/Users/dudbi/Downloads/EMI_COURSE/Electro10.Easy_repo/Examen/Cuestionario_9_Ley_de_Ampere.html', 'Física Universitaria: Ley de Ampère', q9)

q10 = "[" + ",\n".join([f"""{{
    type: 'mcq',
    text: 'Pregunta {i} de Ley de Faraday: ¿Qué produce un flujo magnético variable?',
    options: ['Una FEM inducida', 'Un monopolio magnético', 'Una carga en reposo', 'Nada'],
    answer: 0,
    tip: 'La ley de Faraday establece que un flujo magnético variable induce una FEM.'
}}""" for i in range(1, 21)]) + "]"
create_cuestionario(template, 'c:/Users/dudbi/Downloads/EMI_COURSE/Electro10.Easy_repo/Examen/Cuestionario_10_Ley_de_Faraday.html', 'Física Universitaria: Ley de Faraday', q10)

q11 = "[" + ",\n".join([f"""{{
    type: 'mcq',
    text: 'Pregunta {i} de Inductancia: ¿Cuál es la unidad de la inductancia?',
    options: ['Henry', 'Faradio', 'Tesla', 'Weber'],
    answer: 0,
    tip: 'El Henry (H) es la unidad de inductancia.'
}}""" for i in range(1, 21)]) + "]"
create_cuestionario(template, 'c:/Users/dudbi/Downloads/EMI_COURSE/Electro10.Easy_repo/Examen/Cuestionario_11_Inductancia.html', 'Física Universitaria: Inductancia', q11)

q12 = "[" + ",\n".join([f"""{{
    type: 'mcq',
    text: 'Pregunta {i} de Ecuaciones de Maxwell: ¿A qué velocidad viajan las ondas electromagnéticas en el vacío?',
    options: ['Velocidad de la luz c', 'Velocidad del sonido', 'Infinito', 'Cero'],
    answer: 0,
    tip: 'Viajan a la velocidad de la luz c = 3 x 10^8 m/s.'
}}""" for i in range(1, 21)]) + "]"
create_cuestionario(template, 'c:/Users/dudbi/Downloads/EMI_COURSE/Electro10.Easy_repo/Examen/Cuestionario_12_Ecuaciones_Maxwell.html', 'Física Universitaria: Ecuaciones de Maxwell', q12)

print('Quizzes generated successfully.')
