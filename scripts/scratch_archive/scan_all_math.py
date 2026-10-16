import os, glob, re, sys
sys.stdout.reconfigure(encoding='utf-8')

repo_dir = r'c:\Users\dudbi\Downloads\Cursos_UNAB\Curso_Electromagnetismo\Electro10.Easy_repo'

for root, dirs, files in os.walk(repo_dir):
    dirs[:] = [d for d in dirs if d not in ('.git', 'node_modules', 'scratch', 'dist', '.agents')]
    for f in files:
        if f.endswith('.html'):
            p = os.path.join(root, f)
            rel = os.path.relpath(p, repo_dir)
            try:
                with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                    c = fp.read()
                matches = len(re.findall(r'\$[^\$]+\$', c))
                if matches > 5:
                    has_katex = 'katex' in c
                    has_intel = 'lab10-intelligence.js' in c
                    print(f"{rel:50} | math matches: {matches:3} | katex: {str(has_katex):5} | intel: {str(has_intel):5}")
            except Exception as e:
                pass
