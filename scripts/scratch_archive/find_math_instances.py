import os, glob, re, sys
sys.stdout.reconfigure(encoding='utf-8')

sim_dir = r'c:\Users\dudbi\Downloads\Cursos_UNAB\Curso_Electromagnetismo\Electro10.Easy_repo\simuladores'
files = glob.glob(os.path.join(sim_dir, '*.html'))

for f in sorted(files):
    name = os.path.basename(f)
    if name == 'index.html': continue
    if os.path.getsize(f) < 1000: continue

    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        txt = fp.read()

    # Find occurrences of $ in HTML vs in JS scripts
    # Find all inline math in labels / headings
    html_math = re.findall(r'<[^>]+>[^<]*\$[^<]+\$[^<]*<', txt)
    js_math = re.findall(r'(\.innerHTML|\.innerText|\.textContent)\s*=\s*[`"\'][^`"\']*\$[^`"\']+\$[`"\']', txt)

    if html_math or js_math:
        print(f"=== {name} ===")
        if html_math:
            print(f"  HTML label math ({len(html_math)} instances):")
            for h in html_math[:4]:
                print(f"    {h.strip()[:80]}")
        if js_math:
            print(f"  Dynamic JS math assignments ({len(js_math)} instances):")
            for j in js_math[:4]:
                print(f"    {j.strip()[:80]}")
