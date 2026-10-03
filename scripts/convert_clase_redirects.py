redirects = {
    'clase_1.html': 'player.html?clase=1',
    'clase_2.html': 'player.html?clase=2',
    'clase_3.html': 'player.html?clase=3',
    'clase_4.html': 'player.html?clase=4',
    'clase_5.html': 'player.html?clase=5',
    'clase_7.html': 'player.html?clase=modulo7',
    'clase_8.html': 'player.html?clase=8',
}

template = """<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url={target}">
  <script>window.location.replace("{target}");</script>
  <title>Redirigiendo a Presentación...</title>
</head>
<body style="background:#0f172a;color:#94a3b8;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
  <p>Cargando presentación interactiva en el reproductor...</p>
</body>
</html>"""

for fname, target in redirects.items():
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(template.format(target=target))
    print(f'Updated {fname} -> {target}')
