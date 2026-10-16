import os, glob, re, sys
sys.stdout.reconfigure(encoding='utf-8')

sim_dir = r'c:\Users\dudbi\Downloads\Cursos_UNAB\Curso_Electromagnetismo\Electro10.Easy_repo\simuladores'
files = glob.glob(os.path.join(sim_dir, '*.html'))

updated_files = []

for f in sorted(files):
    name = os.path.basename(f)
    if name == 'index.html': continue
    if os.path.getsize(f) < 1000: continue # Skip redirect stubs

    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        content = fp.read()

    orig_content = content

    # 1. Ensure KaTeX CSS
    if 'katex.min.css' not in content:
        css_tag = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">\n'
        if '<head>' in content:
            content = content.replace('<head>', '<head>\n    ' + css_tag, 1)

    # 2. Ensure KaTeX JS
    if 'katex.min.js' not in content:
        js_tag = '<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>\n'
        if '</head>' in content:
            content = content.replace('</head>', '    ' + js_tag + '</head>', 1)
        elif '<body' in content:
            content = content.replace('<body', '    ' + js_tag + '\n<body', 1)

    # 3. Ensure KaTeX auto-render JS
    if 'auto-render.min.js' not in content:
        ar_tag = '<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>\n'
        if 'katex.min.js' in content:
            content = re.sub(
                r'(<script[^>]*src="[^"]*katex\.min\.js"[^>]*></script>)',
                r'\1\n    ' + ar_tag.strip(),
                content,
                count=1
            )
        elif '</head>' in content:
            content = content.replace('</head>', '    ' + ar_tag + '</head>', 1)
        elif '<body' in content:
            content = content.replace('<body', '    ' + ar_tag + '\n<body', 1)

    # 4. Ensure lab10-core.css
    if 'lab10-core.css' not in content:
        core_css = '<link rel="stylesheet" href="../css/lab10-core.css">\n'
        if '</head>' in content:
            content = content.replace('</head>', '    ' + core_css + '</head>', 1)
        elif '<body' in content:
            content = content.replace('<body', '    ' + core_css + '\n<body', 1)

    # 5. Ensure lab10-intelligence.js
    if 'lab10-intelligence.js' not in content:
        intel_js = '<script src="../js/lab10-intelligence.js"></script>\n'
        if '</head>' in content:
            content = content.replace('</head>', '    ' + intel_js + '</head>', 1)
        elif '<body' in content:
            content = content.replace('<body', '</head>\n<body', 1)
            content = content.replace('</head>', '    ' + intel_js + '</head>', 1)

    if content != orig_content:
        with open(f, 'w', encoding='utf-8') as fp:
            fp.write(content)
        updated_files.append(name)

print(f"Updated {len(updated_files)} simulators:")
for u in updated_files:
    print(f"  + {u}")
