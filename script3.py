import glob, re

modulos = glob.glob('c:/Users/dudbi/Downloads/EMI_COURSE/Electro10.Easy_repo/modulos/modulo*.js')
for file in modulos:
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()
    
    new_text = text.replace('"quizzes/', '"Examen/')
    
    if text != new_text:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_text)
        print(f'Updated {file}')
