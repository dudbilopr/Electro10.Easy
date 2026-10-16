import os, glob, re

sim_dir = r'c:\Users\dudbi\Downloads\Cursos_UNAB\Curso_Electromagnetismo\Electro10.Easy_repo\simuladores'
files = glob.glob(os.path.join(sim_dir, '*.html'))

real_sims = []
redirects = []

for f in sorted(files):
    name = os.path.basename(f)
    if name == 'index.html': continue
    size = os.path.getsize(f)
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        txt = fp.read()
    if 'http-equiv="refresh"' in txt or size < 1000:
        redirects.append((name, size))
    else:
        has_katex_css = 'katex.min.css' in txt
        has_katex_js = 'katex.min.js' in txt
        has_autorender = 'auto-render.min.js' in txt
        has_lab10_core = 'lab10-core.css' in txt
        has_lab10_intel = 'lab10-intelligence.js' in txt
        real_sims.append({
            'name': name,
            'size': size,
            'katex_css': has_katex_css,
            'katex_js': has_katex_js,
            'autorender': has_autorender,
            'lab10_core': has_lab10_core,
            'lab10_intel': has_lab10_intel
        })

print(f"=== Real Simulators ({len(real_sims)}) ===")
for r in real_sims:
    print(f"{r['name']:35} | size: {r['size']:6} | katex_css: {str(r['katex_css']):5} | katex_js: {str(r['katex_js']):5} | auto-render: {str(r['autorender']):5} | lab10_intel: {str(r['lab10_intel']):5}")

print(f"\n=== Redirects / Stubs ({len(redirects)}) ===")
for rd, sz in redirects:
    print(f"  {rd:35} ({sz:6} bytes)")
