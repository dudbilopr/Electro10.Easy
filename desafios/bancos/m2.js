// Banco del Desafío Integral · Módulo 2 (campo eléctrico y dipolos).
// Respuestas numéricas calculadas con k = 8,988e9, e = 1,602e-19, m_e = 9,109e-31 (Young y Freedman, 2009), como en el taller.
// Valores de referencia: .design/fase5/M02/python/calculos_campo.py.
// Tipos: mc, num, dir, orden, pares, huecos, limite, grafica, error, mision (ver bancos/m1.js).
(() => {
  const K = 8.988e9, nC = 1e-9;
  const E4 = Math.hypot(K * 4 * nC / 0.25 * 0.8, K * 4 * nC / 0.25 * 0.6 - K * 5 * nC / 0.09);
  const p2 = 2 * nC * 5e-3, tau2 = p2 * 3e4 * 0.5;
  // Figuras propias de este banco (el motor acepta el SVG como texto)
  const FIG_DIPOLO = `<svg viewBox="0 0 240 200" width="240" role="img" aria-label="Carga positiva a la izquierda, negativa a la derecha y un punto P sobre la mediatriz"><path d="M10 160H230M120 190V10" stroke="var(--e10-line)" stroke-width="1.5" fill="none"/><line x1="60" y1="160" x2="120" y2="60" stroke="var(--e10-muted)" stroke-dasharray="4 4"/><line x1="180" y1="160" x2="120" y2="60" stroke="var(--e10-muted)" stroke-dasharray="4 4"/><circle cx="60" cy="160" r="13" fill="var(--e10-q-pos)"/><circle cx="180" cy="160" r="13" fill="var(--e10-q-neg)"/><circle cx="120" cy="60" r="5" fill="var(--e10-ink)"/><text x="128" y="56" font-size="14" fill="var(--e10-ink)">P</text><text x="44" y="190" font-size="13" fill="var(--e10-ink)">+q</text><text x="170" y="190" font-size="13" fill="var(--e10-ink)">−q</text></svg>`;
  const FIG_UNIF = `<svg viewBox="0 0 240 180" width="240" role="img" aria-label="Dipolo inclinado en un campo uniforme horizontal"><g stroke="var(--e10-vec-field)" opacity=".45"><line x1="10" y1="30" x2="230" y2="30"/><line x1="10" y1="75" x2="230" y2="75"/><line x1="10" y1="120" x2="230" y2="120"/><line x1="10" y1="165" x2="230" y2="165"/></g><text x="214" y="22" font-size="13" fill="var(--e10-vec-field)">E →</text><line x1="80" y1="130" x2="160" y2="60" stroke="var(--e10-muted)" stroke-width="3"/><circle cx="160" cy="60" r="12" fill="var(--e10-q-pos)"/><circle cx="80" cy="130" r="12" fill="var(--e10-q-neg)"/><text x="176" y="56" font-size="13" fill="var(--e10-ink)">+q</text><text x="48" y="150" font-size="13" fill="var(--e10-ink)">−q</text></svg>`;
  window.DESAFIO = {
    modulo: 2,
    titulo: 'Campo eléctrico y dipolos',
    sub: 'Carga de prueba, superposición, dipolo y cargas en un campo uniforme',
    clase: '../presentaciones/M2_CampoElectrico/index.html',
    taller: '../talleres/Taller_2_Campo_Electrico.html',
    juego: '../juegos/Juego_2.html',
    juegoNombre: 'Physics Quest',
    lab: '../simuladores/VectorField.html',
    fases: [
      {
        nombre: 'Calentamiento conceptual', peso: 35,
        intro: 'Ideas antes que cuentas: qué mide la carga de prueba, hacia dónde apunta el campo y cómo cae lejos de un dipolo.',
        preguntas: [
          { tipo: 'mc', id: 'c1', enun: 'En un punto, una carga de prueba \\(q_0\\) siente una fuerza \\(\\vec F\\). Si la cambias por \\(2q_0\\), ¿qué pasa con el campo en ese punto?',
            ops: [
              { t: 'No cambia; la fuerza se duplica.', ok: true, fb: 'Correcto. El campo lo producen las otras cargas: \\(\\vec E=\\vec F/q_0\\) queda igual porque la fuerza crece en la misma proporción que \\(q_0\\).' },
              { t: 'Se duplica.', fb: 'Es una confusión muy común, no te preocupes. Lo que se duplica es la fuerza. La carga de prueba solo mide el campo; no lo produce.' },
              { t: 'Queda a la mitad, porque \\(E=F/q_0\\).', fb: 'Buena idea mirar la fórmula, pero falta un detalle: si \\(q_0\\) se duplica, \\(F\\) también se duplica. El cociente no cambia.' },
              { t: 'Depende del signo de la carga fuente.', fb: 'El signo de la carga fuente decide hacia dónde apunta el campo, no si cambia al variar \\(q_0\\).' },
            ] },
          { tipo: 'dir', id: 'c2', enun: '\\(+q\\) y \\(-q\\) están sobre el eje \\(x\\). ¿Hacia dónde apunta el campo en el punto \\(P\\) de la mediatriz?',
            fig: FIG_DIPOLO, ok: 'E',
            fb: { E: 'Correcto. \\(\\vec E_+\\) se aleja de \\(+q\\) (arriba a la derecha) y \\(\\vec E_-\\) va hacia \\(-q\\) (abajo a la derecha). Las componentes verticales se anulan y queda un campo hacia la derecha, de la carga positiva hacia la negativa.',
              O: 'Vas bien con la simetría, pero el sentido está invertido. El campo apunta hacia donde se movería una carga positiva: lejos de \\(+q\\) y hacia \\(-q\\).',
              N: 'Las componentes verticales de los dos campos se cancelan: una sube y la otra baja. Dibuja \\(\\vec E_+\\) y \\(\\vec E_-\\) en \\(P\\) y súmalos.',
              S: 'Las componentes verticales se cancelan. Revisa: \\(\\vec E_+\\) se aleja de \\(+q\\) y \\(\\vec E_-\\) apunta hacia \\(-q\\).',
              '0': 'En la mediatriz de un dipolo el campo no se anula: solo se anulan las componentes verticales. Las horizontales se suman.',
              _: 'Dibuja las dos flechas en \\(P\\): una que se aleja de \\(+q\\) y otra que va hacia \\(-q\\). Súmalas.' } },
          { tipo: 'limite', id: 'c3', enun: 'Un dipolo de momento \\(p\\). Muy lejos, sobre su eje (\\(x\\gg d\\)), el campo se parece a…',
            ops: [
              { t: '\\(2kp/x^3\\)', ok: true, fb: 'Correcto. Con la expansión binomial, \\(kq[(x-a)^{-2}-(x+a)^{-2}]\\approx4kqa/x^3=2kp/x^3\\).' },
              { t: '\\(kp/x^3\\)', fb: 'Casi: esa es la forma lejana en la mediatriz. En el eje el campo es el doble.' },
              { t: '\\(kq/x^2\\)', fb: 'Ese sería el campo de una sola carga. El dipolo tiene carga neta cero: sus dos campos casi se cancelan y queda una potencia más de \\(1/x\\).' },
              { t: 'Cero, porque la carga neta es cero.', fb: 'Carga neta cero no significa campo cero: una carga está un poco más cerca que la otra. Por eso queda un campo pequeño que cae como \\(1/x^3\\).' },
            ] },
          { tipo: 'pares', id: 'c4', enun: 'Relaciona cada situación con la idea que la explica.',
            izq: ['Se usa una carga de prueba muy pequeña', 'Dos líneas de campo nunca se cruzan', 'El agua disuelve bien la sal', 'Un electrón entre placas describe una parábola', 'Una gota cargada queda quieta entre dos placas'],
            der: ['No perturbar las cargas que crean el campo', 'En cada punto el campo tiene una sola dirección', 'La molécula de agua es un dipolo', 'Aceleración constante qE/m', 'qE = mg'],
            fb: 'Cada situación remite a una idea del capítulo: el límite \\(q_0\\to0\\), la unicidad de la dirección del campo, el momento dipolar del agua, la aceleración constante en un campo uniforme y el equilibrio de Millikan.' },
          { tipo: 'mc', id: 'c5', enun: '¿Cuánto vale el campo a \\(0{,}50\\ \\mathrm m\\) de una carga puntual de \\(5{,}0\\ \\mathrm{nC}\\)?',
            ops: [
              { t: '\\(179{,}8\\ \\mathrm{N/C}\\)', ok: true, fb: 'Correcto: \\(E=k|q|/r^2=(8{,}988\\times10^9)(5{,}0\\times10^{-9})/0{,}25=179{,}8\\ \\mathrm{N/C}\\).' },
              { t: '\\(89{,}9\\ \\mathrm{N/C}\\)', fb: 'Dividiste entre \\(r\\) y no entre \\(r^2\\). El campo de una carga puntual cae como \\(1/r^2\\).' },
              { t: '\\(1{,}80\\times10^{11}\\ \\mathrm{N/C}\\)', fb: 'Olvidaste pasar los nanocoulombs a coulombs: \\(1\\ \\mathrm{nC}=10^{-9}\\ \\mathrm C\\).' },
              { t: '\\(44{,}9\\ \\mathrm{N/C}\\)', fb: 'Usaste el doble de la distancia (1,0 m). La distancia es la que hay de la carga al punto: \\(r^2=(0{,}50)^2=0{,}25\\ \\mathrm{m^2}\\).' },
            ] },
        ],
      },
      {
        nombre: 'Misión interactiva', peso: 35,
        intro: 'Manipula, predice y comprueba. Si quieres más práctica, juega Physics Quest o abre VectorFieldLab antes de seguir.',
        preguntas: [
          { tipo: 'mision', id: 'm1', enun: '\\(q_1=+2{,}0\\ \\mathrm{nC}\\) está en \\(x=0\\) y \\(q_2=+8{,}0\\ \\mathrm{nC}\\) en \\(x=0{,}60\\ \\mathrm m\\). Las flechas son los campos de cada carga en el punto \\(q_0\\). Arrástralo hasta donde el campo neto sea cero y pulsa «Fijar».',
            q1: 2, q2: 8, L: 0.6, ok: 0.2, tol: 0.012,
            fbOk: 'Correcto: \\(kq_1/x^2=kq_2/(L-x)^2\\) da \\(x=L/(1+\\sqrt{q_2/q_1})=0{,}20\\ \\mathrm m\\), más cerca de la carga menor.',
            fbMal: 'Ahí las dos flechas no son iguales. El punto de campo nulo está más cerca de la carga menor: iguala \\(q_1/x^2=q_2/(L-x)^2\\).' },
          { tipo: 'grafica', id: 'm2', ylab: 'E', enun: '¿Cuál curva representa el campo de un dipolo, lejos de él, en función de la distancia \\(r\\)? Fíjate en cuánto baja entre \\(r_0\\) y \\(2r_0\\).',
            ops: [
              { f: (r) => 1 / (r * r), t: 'A', fb: 'Esta curva va como \\(1/r^2\\): al duplicar \\(r\\) queda en la cuarta parte. Así cae una carga puntual, no un dipolo.' },
              { f: (r) => 1 / r, t: 'B', fb: 'Esta va como \\(1/r\\): cae demasiado despacio para un dipolo.' },
              { f: (r) => 1 / (r * r * r), t: 'C', ok: true, fb: 'Correcto: \\(E\\propto1/r^3\\). Entre \\(r_0\\) y \\(2r_0\\) la altura se divide entre 8.' },
            ] },
          { tipo: 'huecos', id: 'm3', texto: 'El campo de una carga positiva apunta {0} de ella; el de una negativa apunta {1}. Lejos de un dipolo el campo decae como {2}, y en un campo uniforme un dipolo {3}.',
            slots: [['lejos', 'hacia', 'alrededor'], ['hacia ella', 'lejos de ella', 'en círculos'], ['1/r³', '1/r²', '1/r'], ['gira sin trasladarse', 'se traslada sin girar', 'se queda quieto siempre']],
            ok: [0, 0, 0, 0], fb: 'El campo apunta hacia donde se movería una carga positiva; el dipolo, con carga neta cero, crea un campo que cae como \\(1/r^3\\), y en un campo uniforme siente un torque pero no una fuerza neta.' },
          { tipo: 'dir', id: 'm4', enun: 'El dipolo está en un campo uniforme hacia la derecha. ¿Hacia dónde apunta la <b>fuerza neta</b> sobre él? (Usa «0» si es nula.)',
            fig: FIG_UNIF, ok: '0',
            fb: { '0': 'Correcto. Sobre \\(+q\\) actúa \\(q\\vec E\\) y sobre \\(-q\\), \\(-q\\vec E\\): suman cero. El dipolo solo gira (aquí, en sentido horario, hacia \\(\\vec E\\)).',
              E: 'Esa es la fuerza sobre la carga positiva sola. Súmale la de la negativa, \\(-q\\vec E\\), que apunta al revés.',
              O: 'Esa es la fuerza sobre la carga negativa sola. Súmale la de la positiva: se cancelan.',
              _: 'Las dos fuerzas tienen el mismo módulo \\(qE\\) y sentidos opuestos. ¿Cuánto suman? El efecto que queda es un giro, no un desplazamiento.' } },
        ],
      },
      {
        nombre: 'Certificación rigurosa', peso: 30,
        intro: 'Cálculo exacto, deducción y ojo crítico. Usa unidades SI; acepta coma o punto y notación 2,5e-3.',
        preguntas: [
          { tipo: 'num', id: 'r1', enun: '\\(q_1=+5{,}0\\ \\mathrm{nC}\\) está en \\((0;\\,0{,}30)\\) m y \\(q_2=-4{,}0\\ \\mathrm{nC}\\) en \\((0{,}40;\\,0{,}30)\\) m. ¿Cuánto vale el módulo del campo en el origen?',
            ans: E4, unidad: 'N/C', tol: 0.02,
            errores: [{ v: K * 5 * nC / 0.09 + K * 4 * nC / 0.25, fb: 'Sumaste los módulos (643 N/C). Los campos forman un ángulo: súmalos por componentes.' },
              { v: K * 5 * nC / 0.09 - K * 4 * nC / 0.25, fb: 'Restaste los módulos. Los campos no son opuestos: descompón \\(\\vec E_2\\) con \\(\\cos\\alpha=0{,}80\\) y \\(\\sin\\alpha=0{,}60\\).' }],
            fbOk: 'Correcto: \\(\\vec E_1=(0;\\,-499{,}3)\\) y \\(\\vec E_2=(115{,}0;\\,86{,}3)\\) N/C; \\(\\vec E=(115{,}0;\\,-413{,}0)\\) N/C, \\(E=428{,}8\\ \\mathrm{N/C}\\).',
            fbMal: 'Calcula cada campo con su dirección (lejos de la positiva, hacia la negativa), descompón y suma por componentes.' },
          { tipo: 'num', id: 'r2', enun: 'Un dipolo de \\(\\pm2{,}0\\ \\mathrm{nC}\\) separadas \\(5{,}0\\ \\mathrm{mm}\\) forma \\(30^\\circ\\) con un campo uniforme de \\(3{,}0\\times10^{4}\\ \\mathrm{N/C}\\). ¿Cuánto vale el torque?',
            ans: tau2, unidad: 'N·m', tol: 0.02,
            errores: [{ v: p2 * 3e4 * Math.cos(Math.PI / 6), fb: 'Usaste el coseno. El torque va con \\(\\sin\\phi\\); el coseno aparece en la energía \\(U=-pE\\cos\\phi\\).' },
              { v: tau2 * 1e3, fb: 'Pasa la separación a metros: \\(5{,}0\\ \\mathrm{mm}=5{,}0\\times10^{-3}\\ \\mathrm m\\).' }, { v: 2 * nC * 3e4 * 0.5, fb: 'Te faltó la separación: \\(p=qd\\).' }],
            fbOk: 'Correcto: \\(p=qd=1{,}0\\times10^{-11}\\ \\mathrm{C\\,m}\\) y \\(\\tau=pE\\sin\\phi=1{,}5\\times10^{-7}\\ \\mathrm{N\\,m}\\).',
            fbMal: '\\(\\tau=pE\\sin\\phi\\), con \\(p=qd\\) en C·m.' },
          { tipo: 'orden', id: 'r3', enun: 'Ordena los pasos para hallar el campo de un dipolo en un punto de su mediatriz.',
            pasos: ['Escribir el campo de una carga: \\(E_1=kq/(a^2+y^2)\\).', 'Dibujar \\(\\vec E_+\\) (lejos de \\(+q\\)) y \\(\\vec E_-\\) (hacia \\(-q\\)).', 'Ver por simetría que las componentes a lo largo de la mediatriz se anulan.', 'Proyectar: \\(E=2E_1\\cos\\theta\\), con \\(\\cos\\theta=a/r\\).', 'Agrupar en \\(p=2qa\\): \\(E=kp/(a^2+y^2)^{3/2}\\).', 'Comprobar el límite: \\(E\\to kp/y^3\\) lejos.'],
            fb: 'Primero una carga y su dibujo, luego la simetría, después la proyección y el momento dipolar; el límite lejano se revisa al final con la expresión ya obtenida.' },
          { tipo: 'error', id: 'r4', enun: 'Un estudiante calcula cuánto se desvía un electrón que entra a \\(4{,}0\\times10^{6}\\ \\mathrm{m/s}\\) entre placas de \\(4{,}0\\ \\mathrm{cm}\\) con un campo de \\(1{,}5\\times10^{3}\\ \\mathrm{N/C}\\). Toca la línea con el error.',
            lineas: ['a=\\dfrac{eE}{m_e}=2{,}64\\times10^{14}\\ \\mathrm{m/s^2}', 't=\\dfrac{L}{v_0}=1{,}0\\times10^{-8}\\ \\mathrm s', 'y=a\\,t^2=2{,}64\\times10^{-2}\\ \\mathrm m', '\\text{Se desvía en sentido contrario a }\\vec E.'],
            mala: 2, fb: 'El error está en la línea 3: con aceleración constante desde \\(v_y=0\\), \\(y=\\tfrac12at^2=1{,}32\\times10^{-2}\\ \\mathrm m\\). La línea 4 está bien: el electrón es negativo.' },
          { tipo: 'mc', id: 'r5', enun: 'Un dipolo tiene \\(p=4{,}80\\times10^{-10}\\ \\mathrm{C\\,m}\\) y \\(a=0{,}060\\ \\mathrm m\\). ¿Cuánto vale el campo <b>exacto</b> sobre su eje a \\(x=0{,}30\\ \\mathrm m\\) del centro?',
            ops: [
              { t: '\\(346{,}8\\ \\mathrm{N/C}\\)', ok: true, fb: 'Correcto: \\(E=2kpx/(x^2-a^2)^2=346{,}8\\ \\mathrm{N/C}\\), en el sentido de \\(\\vec p\\).' },
              { t: '\\(319{,}6\\ \\mathrm{N/C}\\)', fb: 'Esa es la aproximación \\(2kp/x^3\\). Con \\(x=5a\\) todavía se queda corta un 7,8 %: pide el valor exacto.' },
              { t: '\\(173{,}4\\ \\mathrm{N/C}\\)', fb: 'Te faltó el factor 2 del eje: en la mediatriz no está, pero aquí sí.' },
              { t: '\\(47{,}9\\ \\mathrm{N/C}\\)', fb: 'Usaste \\(kp/x^2\\), como si fuera una carga. El dipolo cae como \\(1/x^3\\) lejos y su forma exacta es \\(2kpx/(x^2-a^2)^2\\).' },
            ] },
        ],
      },
    ],
  };
})();
