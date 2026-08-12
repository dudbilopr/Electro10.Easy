import os

os.makedirs('c:/Users/dudbi/Downloads/EMI_COURSE/Electro10.Easy_repo/juegos', exist_ok=True)

modules_concepts = {
    1: 'Ley de Coulomb y Fuerza Eléctrica',
    2: 'Campo Eléctrico',
    3: 'Potencial Eléctrico',
    4: 'Distribución de Carga Continua',
    5: 'Ley de Gauss',
    6: 'Capacitancia',
    7: 'Circuitos Corriente Continua',
    8: 'Campo Magnético',
    9: 'Ley de Ampère',
    10: 'Ley de Faraday',
    11: 'Inductancia',
    12: 'Ecuaciones de Maxwell'
}

html_template = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Juego: {title}</title>
    <style>
        body {{ margin: 0; padding: 0; background-color: #1e293b; color: white; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; overflow: hidden; }}
        #gameCanvas {{ background-color: #334155; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border-radius: 8px; }}
        #hud {{ margin-bottom: 20px; text-align: center; }}
        h1 {{ margin: 0 0 10px 0; font-size: 1.5rem; color: #38bdf8; }}
        p {{ margin: 0; font-size: 1.1rem; }}
        .btn {{ margin-top: 15px; padding: 10px 20px; background-color: #38bdf8; color: #0f172a; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; }}
        .btn:hover {{ background-color: #0284c7; color: white; }}
    </style>
</head>
<body>
    <div id="hud">
        <h1>Módulo {mod_num}: {title}</h1>
        <p id="questionText">Atrapa el concepto correcto: Mueve con Izquierda/Derecha</p>
        <p>Puntuación: <span id="score">0</span> / 5</p>
    </div>
    <canvas id="gameCanvas" width="800" height="400"></canvas>
    <button id="restartBtn" class="btn" style="display:none;" onclick="location.reload()">Jugar de Nuevo</button>

    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const questionText = document.getElementById('questionText');
        const scoreSpan = document.getElementById('score');
        const restartBtn = document.getElementById('restartBtn');

        const questions = [
            {{ q: "¿Fórmula principal?", a: "Concepto Correcto", wrong: "Error Común" }},
            {{ q: "¿Unidad de medida?", a: "Unidad SI", wrong: "Unidad Falsa" }},
            {{ q: "¿Principio fundamental?", a: "Teorema Clave", wrong: "Teoría Falsa" }},
            {{ q: "¿Quién lo descubrió?", a: "Científico 1", wrong: "Científico 2" }},
            {{ q: "¿Aplicación común?", a: "Tecnología Real", wrong: "Magia" }}
        ];

        let currentQ = 0;
        let score = 0;

        let player = {{ x: 375, y: 350, w: 50, h: 30, speed: 7, dx: 0 }};
        let blocks = [];
        let gameActive = true;

        function spawnBlocks() {{
            if (currentQ >= questions.length) {{
                gameActive = false;
                questionText.innerText = "¡Juego Terminado! Puntuación final: " + score;
                restartBtn.style.display = 'block';
                return;
            }}
            questionText.innerText = questions[currentQ].q;
            
            let isLeftCorrect = Math.random() > 0.5;
            blocks = [
                {{ x: 150, y: -50, w: 180, h: 40, text: isLeftCorrect ? questions[currentQ].a : questions[currentQ].wrong, isCorrect: isLeftCorrect }},
                {{ x: 470, y: -50, w: 180, h: 40, text: !isLeftCorrect ? questions[currentQ].a : questions[currentQ].wrong, isCorrect: !isLeftCorrect }}
            ];
        }}

        document.addEventListener('keydown', e => {{
            if (e.key === 'ArrowLeft') player.dx = -player.speed;
            if (e.key === 'ArrowRight') player.dx = player.speed;
        }});
        document.addEventListener('keyup', e => {{
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') player.dx = 0;
        }});

        function update() {{
            if (!gameActive) return;

            player.x += player.dx;
            if (player.x < 0) player.x = 0;
            if (player.x + player.w > canvas.width) player.x = canvas.width - player.w;

            blocks.forEach(b => {{
                b.y += 2; 
            }});

            // Collision
            for (let b of blocks) {{
                if (player.x < b.x + b.w && player.x + player.w > b.x && player.y < b.y + b.h && player.h + player.y > b.y) {{
                    if (b.isCorrect) score++;
                    scoreSpan.innerText = score;
                    currentQ++;
                    spawnBlocks();
                    break;
                }}
            }}

            if (blocks.length > 0 && blocks[0].y > canvas.height) {{
                currentQ++;
                spawnBlocks();
            }}
        }}

        function draw() {{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (!gameActive) return;

            // Draw player (Car shape)
            ctx.fillStyle = '#38bdf8';
            ctx.fillRect(player.x, player.y, player.w, player.h);
            ctx.fillStyle = '#0284c7';
            ctx.fillRect(player.x + 10, player.y - 15, player.w - 20, 15);

            // Draw blocks
            blocks.forEach(b => {{
                ctx.fillStyle = '#e2e8f0';
                ctx.fillRect(b.x, b.y, b.w, b.h);
                ctx.fillStyle = '#0f172a';
                ctx.font = '14px sans-serif';
                ctx.fillText(b.text, b.x + 10, b.y + 25);
            }});
        }}

        function loop() {{
            update();
            draw();
            requestAnimationFrame(loop);
        }}

        spawnBlocks();
        loop();
    </script>
</body>
</html>
"""

for i in range(1, 13):
    title = modules_concepts.get(i, f"Módulo {i}")
    content = html_template.format(mod_num=i, title=title)
    with open(f'c:/Users/dudbi/Downloads/EMI_COURSE/Electro10.Easy_repo/juegos/juego_m{i}.html', 'w', encoding='utf-8') as f:
        f.write(content)

print("12 games generated!")
