import os, glob

sim_dir = 'simuladores'
files = sorted(glob.glob(os.path.join(sim_dir, '*.html')))
results = []

for fpath in files:
    fname = os.path.basename(fpath)
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    is_stub = 'window.location.replace' in content or 'http-equiv="refresh"' in content
    if is_stub:
        continue
    
    has_mathjax = 'mathjax' in content.lower()
    has_katex = 'katex' in content.lower()
    has_tailwind = 'tailwindcss' in content.lower() or 'tailwind' in content.lower()
    has_lab10_core = 'lab10-core.css' in content
    has_firebase = 'firebase' in content.lower()
    has_bus = 'lab10-bus' in content.lower()
    
    results.append({
        'name': fname,
        'size': len(content),
        'mathjax': has_mathjax,
        'katex': has_katex,
        'tailwind': has_tailwind,
        'lab10': has_lab10_core,
        'bus': has_bus,
        'fb': has_firebase
    })

print(f"Total active non-stub simulators: {len(results)}")
print(f"{'File':<35} | {'MJ':<2} | {'KT':<2} | {'TW':<2} | {'L10':<3} | {'Bus':<3} | {'FB':<2}")
print('-' * 65)
for r in results:
    mj = 'Y' if r['mathjax'] else '.'
    kt = 'Y' if r['katex'] else '.'
    tw = 'Y' if r['tailwind'] else '.'
    l10 = 'Y' if r['lab10'] else '.'
    bus = 'Y' if r['bus'] else '.'
    fb = 'Y' if r['fb'] else '.'
    print(f"{r['name']:<35} | {mj:<2} | {kt:<2} | {tw:<2} | {l10:<3} | {bus:<3} | {fb:<2}")
