// Banco del Desafío Integral · Módulo 3 (potencial eléctrico y superficies equipotenciales).
// Respuestas numéricas calculadas con k = 8,988e9, e = 1,602e-19 (Young y Freedman, 2009), como en el taller.
// Valores de referencia: .design/fase5/M03/python/calculos_potencial.py.
// Tipos: mc, num, dir, orden, pares, huecos, limite, grafica, error, mision (ver bancos/m1.js).
(() => {
  const K = 8.988e9, nC = 1e-9, E = 1.602e-19;
  const Vr1 = K * 5 * nC / 0.30 - K * 4 * nC / 0.50; // 77,9 V
  const FIG_DIPOLO = `<svg viewBox="0 0 240 200" width="240" role="img" aria-label="Dipolo: carga positiva a la izquierda, negativa a la derecha y un punto P sobre la mediatriz"><path d="M20 160H220" stroke="var(--e10-line)" stroke-width="1.5" fill="none"/><circle cx="60" cy="160" r="13" fill="var(--e10-q-pos)"/><circle cx="180" cy="160" r="13" fill="var(--e10-q-neg)"/><text x="44" y="192" font-size="13" fill="var(--e10-ink)">+q</text><text x="170" y="192" font-size="13" fill="var(--e10-ink)">−q</text><line x1="60" y1="160" x2="120" y2="60" stroke="var(--e10-muted)" stroke-dasharray="4 4"/><line x1="180" y1="160" x2="120" y2="60" stroke="var(--e10-muted)" stroke-dasharray="4 4"/><circle cx="120" cy="60" r="5" fill="var(--e10-ink)"/><text x="128" y="56" font-size="14" fill="var(--e10-ink)">P</text><line x1="120" y1="60" x2="196" y2="60" stroke="var(--e10-vec-field)" stroke-width="3.5" marker-end="url(#none)"/><polygon points="196,60 186,55 186,65" fill="var(--e10-vec-field)"/><text x="150" y="46" font-size="13" fill="var(--e10-vec-field)">E →</text></svg>`;
  const FIG_PLACAS = `<svg viewBox="0 0 240 180" width="240" role="img" aria-label="Dos placas paralelas: la superior positiva y la inferior negativa; el campo apunta hacia abajo"><rect x="30" y="20" width="180" height="10" fill="var(--e10-q-pos)"/><rect x="30" y="150" width="180" height="10" fill="var(--e10-q-neg)"/><text x="210" y="14" font-size="12" fill="var(--e10-ink)">+</text><text x="210" y="176" font-size="12" fill="var(--e10-ink)">−</text><line x1="90" y1="38" x2="90" y2="142" stroke="var(--e10-vec-field)" stroke-width="2.5" marker-end="url(#none)"/><polygon points="90,146 85,138 95,138" fill="var(--e10-vec-field)"/><line x1="150" y1="38" x2="150" y2="142" stroke="var(--e10-vec-field)" stroke-width="2.5" marker-end="url(#none)"/><polygon points="150,146 145,138 155,138" fill="var(--e10-vec-field)"/><circle cx="120" cy="90" r="7" fill="var(--e10-q-neg)"/><text x="132" y="94" font-size="12" fill="var(--e10-ink)">e⁻</text><text x="40" y="168" font-size="12" fill="var(--e10-vec-field)">E ↓</text></svg>`;
  window.DESAFIO = {
    modulo: 3,
    titulo: 'Potencial eléctrico y superficies equipotenciales',
    sub: 'Energía por unidad de carga, voltaje, equipotenciales y gradiente',
    clase: '../presentaciones/M3_Potencial/index.html',
    taller: '../talleres/Taller_3_Potencial_Electrico.html',
    juego: '../juegos/Juego_4.html',
    juegoNombre: 'Physics Quest · Potencial',
    lab: '../simuladores/EquipotentialLab.html',
    fases: [
      {
        nombre: 'Calentamiento conceptual', peso: 35,
        intro: 'Ideas antes que cuentas: qué es el potencial, hacia dónde apunta el campo y cómo cae el voltaje de un dipolo.',
        preguntas: [
          { tipo: 'mc', id: 'c1', enun: 'Una carga de prueba \\(q_0\\) está en un punto donde el potencial es \\(V\\). Si la reemplazas por \\(2q_0\\), ¿qué pasa con \\(V\\) en ese punto?',
            ops: [
              { t: 'No cambia; lo producen las cargas fuente.', ok: true, fb: 'Correcto. \\(V=U/q_0\\) queda igual porque tanto \\(U\\) como \\(q_0\\) se duplican. El potencial es una propiedad del campo, no de la carga de prueba.' },
              { t: 'Se duplica.', fb: 'Lo que se duplica es la energía \\(U=q_0V\\). El potencial \\(V\\) no depende de la carga de prueba.' },
              { t: 'Queda a la mitad, porque \\(V=U/q_0\\).', fb: 'Ojo: si \\(q_0\\) se duplica, \\(U\\) también se duplica. El cociente no cambia.' },
              { t: 'Depende del signo de la carga fuente.', fb: 'El signo de la carga fuente decide el signo de \\(V\\), no si cambia al variar \\(q_0\\).' },
            ] },
          { tipo: 'dir', id: 'c2', enun: 'Un dipolo \\(+q\\) a la izquierda y \\(-q\\) a la derecha. ¿Hacia dónde apunta el <b>campo</b> en el punto \\(P\\) de la mediatriz? (Ahí \\(V=0\\), pero \\(\\vec E\\) no se anula.)',
            fig: FIG_DIPOLO, ok: 'E',
            fb: { E: 'Correcto. El campo va de la carga positiva hacia la negativa: hacia la derecha. Que \\(V=0\\) en la mediatriz no significa que el campo sea nulo.',
              O: 'Está invertido. El campo se aleja de \\(+q\\) y se acerca a \\(-q\\): apunta de la positiva a la negativa.',
              N: 'Las componentes verticales de los dos campos se cancelan en la mediatriz. Solo queda la componente horizontal.',
              S: 'Las componentes verticales se cancelan. Revisa: \\(\\vec E_+\\) se aleja de \\(+q\\) y \\(\\vec E_-\\) apunta hacia \\(-q\\).',
              '0': 'En la mediatriz \\(V=0\\), pero \\(\\vec E\\) no es nulo: el potencial cero es por cancelación de signos, no por ausencia de campo.',
              _: 'Dibuja las dos flechas en \\(P\\): una que se aleja de \\(+q\\) y otra que va hacia \\(-q\\). La suma horizontal es hacia la derecha.' } },
          { tipo: 'limite', id: 'c3', enun: 'Muy lejos de un dipolo (carga neta cero), el <b>potencial</b> se parece a…',
            ops: [
              { t: '\\(\\dfrac{kp\\cos\\theta}{r^2}\\)', ok: true, fb: 'Correcto. El potencial de un dipolo cae como \\(1/r^2\\) (un grado más rápido que el de una carga, porque las dos contribuciones casi se cancelan).' },
              { t: '\\(\\dfrac{kp\\cos\\theta}{r^3}\\)', fb: 'Esa es la caída del <b>campo</b> del dipolo, no del potencial. El potencial cae un grado más despacio: \\(1/r^2\\).' },
              { t: '\\(\\dfrac{kq}{r}\\)', fb: 'Ese sería el potencial de una sola carga puntual. El dipolo tiene carga neta cero: sus dos potenciales casi se cancelan y queda \\(1/r^2\\).' },
              { t: 'Cero, porque la carga neta es cero.', fb: 'Carga neta cero no significa potencial cero en todas partes: una carga está un poco más cerca. Por eso queda un potencial que cae como \\(1/r^2\\).' },
            ] },
          { tipo: 'pares', id: 'c4', enun: 'Relaciona cada situación con la idea que la explica.',
            izq: ['Mover una carga sobre una equipotencial no requiere trabajo', 'V = 0 en la mediatriz de un dipolo', '1 eV es una unidad de energía', 'El campo es perpendicular a las equipotenciales', 'V de varias cargas se suma como escalar'],
            der: ['ΔV = 0', 'Cancelación de dos contribuciones opuestas', '1,602×10⁻¹⁹ J', 'dV = −E·dl = 0 en la superficie', 'V = Σ kqᵢ/rᵢ'],
            fb: 'Cada situación remite a una idea del capítulo: el trabajo nulo sobre equipotenciales, la cancelación de signos en el dipolo, el eV como energía, la perpendicularidad campo-equipotencial y la suma escalar.' },
          { tipo: 'mc', id: 'c5', enun: '¿Cuánto vale el potencial a \\(0{,}50\\ \\mathrm m\\) de una carga puntual de \\(+5{,}0\\ \\mathrm{nC}\\)?',
            ops: [
              { t: '\\(89{,}9\\ \\mathrm V\\)', ok: true, fb: 'Correcto: \\(V=kq/r=(8{,}988\\times10^9)(5{,}0\\times10^{-9})/0{,}50=89{,}9\\ \\mathrm V\\).' },
              { t: '\\(44{,}9\\ \\mathrm V\\)', fb: 'Usaste la distancia al doble (1,0 m) o dividiste entre \\(r^2\\). El potencial cae como \\(1/r\\), no \\(1/r^2\\).' },
              { t: '\\(179{,}8\\ \\mathrm V\\)', fb: 'Ese valor corresponde a \\(r=0{,}25\\ \\mathrm m\\). Con \\(r=0{,}50\\ \\mathrm m\\) el potencial es la mitad.' },
              { t: '\\(8{,}99\\times10^{10}\\ \\mathrm V\\)', fb: 'Olvidaste pasar los nanocoulombs a coulombs: \\(1\\ \\mathrm{nC}=10^{-9}\\ \\mathrm C\\).' },
            ] },
        ],
      },
      {
        nombre: 'Misión interactiva', peso: 35,
        intro: 'Manipula, predice y comprueba. Si quieres más práctica, abre Physics Quest o EquipotentialLab antes de seguir.',
        preguntas: [
          { tipo: 'mision', id: 'm1', enun: '\\(q_1=+2{,}0\\ \\mathrm{nC}\\) está en \\(x=0\\) y \\(q_2=+2{,}0\\ \\mathrm{nC}\\) en \\(x=0{,}60\\ \\mathrm m\\). Arrastra la carga de prueba hasta donde el <b>campo neto sea cero</b> y pulsa «Fijar». Ahí \\(E=-dV/dx=0\\): el potencial tiene su mínimo.',
            q1: 2, q2: 2, L: 0.6, ok: 0.3, tol: 0.012,
            fbOk: 'Correcto: por simetría el campo nulo está en el punto medio, \\(x=0{,}30\\ \\mathrm m\\). Ahí \\(dV/dx=0\\) y \\(V\\) es mínimo: a ambos lados el campo empuja hacia ese valle.',
            fbMal: 'Ahí las dos flechas no son iguales. Con cargas iguales el campo nulo está exactamente a la mitad: iguala \\(q_1/x^2=q_2/(L-x)^2\\).' },
          { tipo: 'grafica', id: 'm2', enun: '¿Cuál curva representa el potencial \\(V(r)\\) de una carga puntual positiva, en función de la distancia \\(r\\)? Fíjate en cuánto baja entre \\(r_0\\) y \\(2r_0\\).',
            ops: [
              { f: (r) => 1 / r, t: 'A', ok: true, fb: 'Correcto: \\(V\\propto1/r\\). Al duplicar \\(r\\) la altura se divide entre 2.' },
              { f: (r) => 1 / (r * r), t: 'B', fb: 'Esta va como \\(1/r^2\\): al duplicar \\(r\\) queda en la cuarta parte. Así cae el <b>campo</b>, no el potencial.' },
              { f: (r) => Math.max(0, 1.2 - 0.3 * r), t: 'C', fb: 'Una recta decreciente no corresponde a \\(V=kq/r\\), que se curva y nunca corta el eje a distancia finita.' },
            ] },
          { tipo: 'huecos', id: 'm3', texto: 'El potencial eléctrico es una magnitud {0}; el de una carga puntual cae como {1}. La unidad {2} es de energía, no de voltaje, y el campo se recupera con {3}.',
            slots: [['escalar', 'vectorial', 'tensorial'], ['1/r', '1/r²', 'r'], ['electrón-volt', 'volt', 'joule'], ['E = −∇V', 'E = ∇V', 'E = V/d']],
            ok: [0, 0, 0, 0], fb: 'El potencial es un escalar (\\(V=\\sum kq_i/r_i\\)), cae como \\(1/r\\), el electrón-volt mide energía y \\(\\vec E=-\\vec\\nabla V\\).' },
          { tipo: 'dir', id: 'm4', enun: 'Entre dos placas, el campo \\(\\vec E\\) apunta hacia abajo (de la placa positiva a la negativa). ¿Hacia dónde se mueve espontáneamente un <b>electrón</b>?',
            fig: FIG_PLACAS, ok: 'N',
            fb: { N: 'Correcto. El electrón (carga negativa) siente la fuerza opuesta a \\(\\vec E\\): sube hacia la placa positiva, que está a mayor potencial. La carga negativa «cae» hacia el potencial mayor.',
              S: 'Esa es la dirección de una carga positiva. El electrón es negativo: va contra \\(\\vec E\\), hacia la placa positiva.',
              '0': 'Hay una fuerza neta \\(q\\vec E\\neq0\\): el electrón no se queda quieto.',
              E: 'El campo es vertical, no hay fuerza horizontal. Revisa la dirección de \\(\\vec E\\).',
              _: 'Recuerda: \\(\\vec F=q\\vec E\\). Con \\(q&lt;0\\) la fuerza va contra \\(\\vec E\\), es decir, hacia arriba.' } },
        ],
      },
      {
        nombre: 'Certificación rigurosa', peso: 30,
        intro: 'Cálculo exacto, deducción y ojo crítico. Usa unidades SI; acepta coma o punto y notación 2,5e-3.',
        preguntas: [
          { tipo: 'num', id: 'r1', enun: '\\(q_1=+5{,}0\\ \\mathrm{nC}\\) está en \\((0;\\,0{,}30)\\) m y \\(q_2=-4{,}0\\ \\mathrm{nC}\\) en \\((0{,}40;\\,0{,}30)\\) m. ¿Cuánto vale el potencial en el origen?',
            ans: Vr1, unidad: 'V', tol: 0.02,
            errores: [{ v: K * 5 * nC / 0.30 + K * 4 * nC / 0.50, fb: 'Sumaste los módulos (221,7 V). Los potenciales se suman con su signo: la carga negativa aporta negativo.' },
              { v: K * 5 * nC / 0.30 - K * 4 * nC / 0.40, fb: 'La distancia a \\(q_2\\) es la hipotenusa: \\(\\sqrt{0{,}40^2+0{,}30^2}=0{,}50\\ \\mathrm m\\), no 0,40 m.' }],
            fbOk: 'Correcto: \\(V=kq_1/r_1+kq_2/r_2=149{,}8-71{,}9=77{,}9\\ \\mathrm V\\).',
            fbMal: 'Calcula cada potencial con su signo (positivo si la fuente es positiva) y suma algebraicamente: \\(V=\\sum kq_i/r_i\\).' },
          { tipo: 'num', id: 'r2', enun: 'Un electrón parte del reposo y atraviesa una diferencia de potencial de \\(250\\ \\mathrm V\\). ¿Cuánta energía cinética gana, en electrón-volt?',
            ans: 250, unidad: 'eV', tol: 0.02,
            errores: [{ v: 250 * E, fb: 'Diste la energía en joules (\\(4{,}0\\times10^{-17}\\)). El enunciado pide eV: la energía en eV es justo la diferencia de potencial en volt multiplicada por la carga en unidades de \\(e\\).' },
              { v: 250 / E, fb: 'Invertiste el factor. La energía en eV de una carga \\(e\\) que cruza \\(\\Delta V\\) voltios es numéricamente \\(\\Delta V\\) en eV.' }],
            fbOk: 'Correcto: una carga de magnitud \\(e\\) que cruza \\(250\\ \\mathrm V\\) gana \\(250\\ \\mathrm{eV}\\) (o \\(4{,}0\\times10^{-17}\\ \\mathrm J\\)).',
            fbMal: '\\(\\Delta K=q\\,\\Delta V\\); con \\(|q|=e\\), la energía en eV es numéricamente igual a la diferencia de potencial en volt.' },
          { tipo: 'orden', id: 'r3', enun: 'Ordena los pasos para hallar el potencial de un dipolo en un punto genérico.',
            pasos: ['Identificar las dos cargas y sus signos.', 'Medir la distancia de cada carga al punto.', 'Escribir \\(V_1=kq_1/r_1\\) y \\(V_2=kq_2/r_2\\).', 'Sumar algebraicamente: \\(V=V_1+V_2\\).', 'Comprobar casos límite: \\(V=0\\) en la mediatriz.', 'Verificar que lejos cae como \\(1/r^2\\).'],
            fb: 'Primero las cargas y sus distancias, luego cada potencial por separado, después la suma escalar con signos; los casos límite se revisan al final con la expresión ya obtenida.' },
          { tipo: 'error', id: 'r4', enun: 'Un estudiante calcula el potencial a \\(0{,}25\\ \\mathrm m\\) de una carga de \\(+5{,}0\\ \\mathrm{nC}\\). Toca la línea con el error.',
            lineas: ['V=\\dfrac{kq}{r}', 'V=\\dfrac{(8{,}988\\times10^9)(5{,}0\\times10^{-9})}{(0{,}25)^2}', 'V=719\\ \\mathrm V', '\\text{El potencial cae como }1/r^2.'],
            mala: 1, fb: 'El error está en la línea 2: el potencial cae como \\(1/r\\), no \\(1/r^2\\). Debe dividirse entre \\(0{,}25\\), no entre \\((0{,}25)^2\\). Con \\(r=0{,}25\\) m: \\(V=179{,}8\\ \\mathrm V\\). La línea 4 arrastra el mismo error conceptual.' },
          { tipo: 'mc', id: 'r5', enun: 'Una esfera conductora cargada está en equilibrio electrostático. ¿Qué afirmación es correcta?',
            ops: [
              { t: 'Su superficie es equipotencial y \\(\\vec E\\) es perpendicular a ella.', ok: true, fb: 'Correcto. En equilibrio, todo el conductor (superficie e interior) está al mismo potencial y el campo exterior es perpendicular a la superficie.' },
              { t: 'El potencial es mayor en el centro que en la superficie.', fb: 'En equilibrio el interior del conductor es equipotencial: \\(V\\) es igual en el centro y en la superficie (\\(kQ/R\\)).' },
              { t: 'El campo en la superficie es tangente a ella.', fb: 'Si el campo tuviera componente tangencial, movería cargas por la superficie; en equilibrio es perpendicular.' },
              { t: 'El potencial dentro del conductor crece linealmente.', fb: 'Dentro del conductor \\(\\vec E=0\\), así que \\(V\\) es constante, no lineal.' },
            ] },
        ],
      },
    ],
  };
})();
