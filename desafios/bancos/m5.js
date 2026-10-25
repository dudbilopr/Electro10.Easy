// Banco del Desafío Integral · Módulo 5 (ley de Gauss y flujo eléctrico).
// Respuestas numéricas calculadas con k = 8,988e9 y ε₀ = 8,854e-12 (Young y Freedman, 2009), como en el taller.
// Valores de referencia: Φ = Q/ε0, E = 2kλ/r, E = kQ/r², E = σ/(2ε0), E = σ/ε0 (documentados abajo).
// Tipos: mc, num, dir, orden, pares, huecos, limite, grafica, error, mision (ver bancos/m1.js).
(() => {
  const K = 8.988e9, nC = 1e-9, EPS0 = 8.854e-12;
  const FLUJO = 2.0 * nC / EPS0;              // Q = 2,0 nC → Φ = Q/ε0 = 225,9 N·m²/C
  const E_CIL = 2 * K * 4.0 * nC / 0.10;      // λ = 4,0 nC/m, r = 0,10 m → E = 2kλ/r = 719,0 N/C
  const E_ESF = K * 3.0 * nC / (0.30 * 0.30); // Q = 3,0 nC, r = 0,30 m → E = kQ/r² = 299,6 N/C
  // Referencias (se citan en opciones y retroalimentación):
  //   lámina σ = 2,0 nC/m² → E = σ/(2ε0) = 112,9 N/C ;  conductor σ = 5,0e-6 C/m² → E = σ/ε0 = 5,65e5 N/C.
  const FIG_ESFERA_GAUSS = `<svg viewBox="0 0 240 240" width="240" role="img" aria-label="Esfera gaussiana (círculo discontinuo) con carga positiva centrada; líneas de campo radiales hacia afuera y punto P en la parte superior"><defs><marker id="arrEsf" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--e10-vec-field)"/></marker></defs><circle cx="120" cy="120" r="70" fill="none" stroke="var(--e10-muted)" stroke-width="2" stroke-dasharray="6 5"/><circle cx="120" cy="120" r="13" fill="var(--e10-q-pos)"/><path d="M114 120 H126 M120 114 V126" stroke="var(--e10-surface)" stroke-width="2.5"/><line x1="146" y1="120" x2="204" y2="120" stroke="var(--e10-vec-field)" stroke-width="3" marker-end="url(#arrEsf)"/><line x1="138" y1="102" x2="179" y2="61" stroke="var(--e10-vec-field)" stroke-width="3" marker-end="url(#arrEsf)"/><line x1="102" y1="102" x2="61" y2="61" stroke="var(--e10-vec-field)" stroke-width="3" marker-end="url(#arrEsf)"/><line x1="94" y1="120" x2="36" y2="120" stroke="var(--e10-vec-field)" stroke-width="3" marker-end="url(#arrEsf)"/><line x1="102" y1="138" x2="61" y2="179" stroke="var(--e10-vec-field)" stroke-width="3" marker-end="url(#arrEsf)"/><line x1="120" y1="146" x2="120" y2="204" stroke="var(--e10-vec-field)" stroke-width="3" marker-end="url(#arrEsf)"/><line x1="138" y1="138" x2="179" y2="179" stroke="var(--e10-vec-field)" stroke-width="3" marker-end="url(#arrEsf)"/><circle cx="120" cy="50" r="5" fill="var(--e10-ink)"/><text x="128" y="46" font-size="14" fill="var(--e10-ink)">P</text></svg>`;
  const FIG_CONDUCTOR = `<svg viewBox="0 0 240 190" width="240" role="img" aria-label="Conductor con la superficie superior cargada positivamente; el campo sale perpendicular hacia arriba"><defs><marker id="arrCon" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--e10-vec-field)"/></marker></defs><rect x="20" y="120" width="200" height="46" fill="var(--e10-q-pos)" opacity="0.3"/><path d="M20 120 H220" stroke="var(--e10-q-pos)" stroke-width="4"/><text x="34" y="112" font-size="15" fill="var(--e10-q-pos)">+</text><text x="82" y="112" font-size="15" fill="var(--e10-q-pos)">+</text><text x="176" y="112" font-size="15" fill="var(--e10-q-pos)">+</text><text x="212" y="112" font-size="15" fill="var(--e10-q-pos)">+</text><line x1="60" y1="98" x2="60" y2="42" stroke="var(--e10-vec-field)" stroke-width="3" marker-end="url(#arrCon)"/><line x1="180" y1="98" x2="180" y2="42" stroke="var(--e10-vec-field)" stroke-width="3" marker-end="url(#arrCon)"/><circle cx="120" cy="72" r="5" fill="var(--e10-ink)"/><text x="128" y="68" font-size="14" fill="var(--e10-ink)">P</text><text x="96" y="156" font-size="13" fill="var(--e10-ink)">conductor</text></svg>`;
  window.DESAFIO = {
    modulo: 5,
    titulo: 'Ley de Gauss y flujo eléctrico',
    sub: 'Flujo, simetrías esférica/cilíndrica/planar y conductores',
    clase: '../presentaciones/M5_Gauss/index.html',
    taller: '../talleres/Taller_5_Ley_de_Gauss.html',
    juego: '../juegos/Juego_5.html',
    juegoNombre: 'Physics Quest · Gauss',
    lab: '../simuladores/GaussLab.html',
    fases: [
      {
        nombre: 'Calentamiento conceptual', peso: 35,
        intro: 'Ideas antes que cuentas: qué es el flujo, qué carga importa en una superficie cerrada y qué simetría pide cada superficie gaussiana.',
        preguntas: [
          { tipo: 'mc', id: 'c1', enun: 'Una carga puntual \\(q\\) está <b>fuera</b> de una superficie gaussiana cerrada. ¿Qué le ocurre al <b>flujo neto</b> a través de la superficie?',
            ops: [
              { t: 'No aporta: solo importa la carga encerrada \\(Q_{\\text{enc}}\\).', ok: true, fb: 'Correcto. Cada línea de campo de la carga externa entra por un lado y sale por el otro, con contribución neta nula. \\(\\Phi=Q_{\\text{enc}}/\\varepsilon_0\\).' },
              { t: 'Aporta un flujo positivo que se suma a las cargas internas.', fb: 'Las líneas de una carga externa atraviesan la superficie dos veces (entran y salen), así que su aporte neto es cero.' },
              { t: 'Aporta un flujo negativo.', fb: 'La contribución neta de una carga externa es exactamente cero, no negativa.' },
              { t: 'Hace que el flujo dependa de la forma de la superficie.', fb: 'El flujo neto solo depende de la carga encerrada, nunca de la forma ni del tamaño de la superficie.' },
            ] },
          { tipo: 'dir', id: 'c2', enun: 'Una carga \\(+q\\) está en el centro de una superficie gaussiana esférica (círculo discontinuo). En el punto \\(P\\), sobre la esfera, ¿hacia dónde apunta el campo (y «sale» el flujo)?',
            fig: FIG_ESFERA_GAUSS, ok: 'N',
            fb: { N: 'Correcto. El campo es radial hacia afuera: en la parte superior de la esfera apunta hacia arriba. El flujo total sale porque encierra carga positiva.',
              S: 'Está invertido. El campo se aleja de la carga positiva, no apunta hacia ella.',
              E: 'El campo es radial: en el punto superior no hay componente horizontal.',
              O: 'El campo es radial: en el punto superior no hay componente horizontal.',
              '0': 'Hay carga positiva encerrada, así que en \\(P\\) el campo no es nulo.',
              _: 'El campo de una carga positiva es radial hacia afuera; en el punto más alto de la esfera eso es «arriba».' } },
          { tipo: 'limite', id: 'c3', enun: 'Muy lejos de una distribución <b>finita</b> de carga (carga total \\(Q\\)), ¿cómo se comporta el campo eléctrico?',
            ops: [
              { t: '\\(\\dfrac{kQ}{r^2}\\)', ok: true, fb: 'Correcto. A gran distancia toda distribución finita se ve como una carga puntual: \\(E\\to kQ/r^2\\).' },
              { t: '\\(\\dfrac{\\sigma}{2\\varepsilon_0}\\)', fb: 'Ese es el campo de una lámina <b>infinita</b>, que no decae. Una distribución finita, vista de lejos, se comporta como carga puntual.' },
              { t: '\\(\\dfrac{\\lambda}{2\\pi\\varepsilon_0 r}\\)', fb: 'Ese es el campo de un hilo <b>infinito</b>, que cae como \\(1/r\\). Una distribución finita cae como \\(1/r^2\\) lejos.' },
              { t: '\\(\\dfrac{Q_{\\text{enc}}}{\\varepsilon_0 A}\\)', fb: 'Eso mezcla flujo y área. El comportamiento asintótico es el de una carga puntual: \\(kQ/r^2\\).' },
            ] },
          { tipo: 'pares', id: 'c4', enun: 'Relaciona cada simetría con la superficie gaussiana que la aprovecha.',
            izq: ['Simetría esférica', 'Hilo infinito (cilíndrica)', 'Lámina infinita (planar)', 'Conductor en equilibrio', 'Esfera aislante uniforme'],
            der: ['Esfera gaussiana concéntrica', 'Cilindro gaussiano coaxial', '«Pastilla» (caja corta)', 'E interior nulo y perpendicular fuera', 'E ∝ r dentro, kQ/r² fuera'],
            fb: 'La simetría dicta la superficie: esferas para lo esférico, cilindros para lo cilíndrico y pastillas para lo planar. En el conductor el interior se anula y en la esfera aislante E crece linealmente dentro.' },
          { tipo: 'mc', id: 'c5', enun: 'Una lámina plana <b>infinita</b> con densidad uniforme \\(\\sigma\\) produce \\(E=\\sigma/(2\\varepsilon_0)\\). ¿Qué ocurre al alejarte de la lámina?',
            ops: [
              { t: 'El campo se mantiene constante: no depende de la distancia.', ok: true, fb: 'Correcto. \\(E=\\sigma/(2\\varepsilon_0)\\) no lleva \\(r\\). Con \\(\\sigma=2{,}0\\ \\mathrm{nC/m^2}\\), \\(E\\approx112{,}9\\ \\mathrm{N/C}\\) a cualquier distancia.' },
              { t: 'Decae como \\(1/r\\).', fb: 'Eso sería un hilo infinito. La lámina infinita tiene campo uniforme e independiente de la distancia.' },
              { t: 'Decae como \\(1/r^2\\).', fb: 'Una lámina infinita no se comporta como carga puntual: su campo es constante.' },
              { t: 'Crece linealmente con la distancia.', fb: 'No crece: el flujo a través de una pastilla es el mismo a cualquier altura, luego \\(E\\) es constante.' },
            ] },
          { tipo: 'mc', id: 'c6', enun: 'Un conductor en equilibrio electrostático tiene un exceso de carga. ¿Dónde se ubica ese exceso?',
            ops: [
              { t: 'Sobre la superficie exterior del conductor.', ok: true, fb: 'Correcto. Si hubiera carga neta en el volumen habría campo interno; en equilibrio \\(\\vec E_{\\text{int}}=0\\), así que toda la carga en exceso vive en la superficie.' },
              { t: 'Uniformemente en todo el volumen.', fb: 'Si hubiera carga en el volumen, el campo interior no sería nulo. En equilibrio la carga se desplaza a la superficie.' },
              { t: 'Solo en el centro geométrico.', fb: 'No hay razón para que se concentre en el centro: las cargas se repelen hacia la superficie.' },
              { t: 'Depende de si el conductor es esférico o no.', fb: 'La ubicación (la superficie) no depende de la forma; la forma solo cambia cómo se reparte por esa superficie.' },
            ] },
        ],
      },
      {
        nombre: 'Misión interactiva', peso: 35,
        intro: 'Manipula, predice y comprueba. Si quieres más práctica, abre Physics Quest o GaussLab antes de seguir.',
        preguntas: [
          { tipo: 'mision', id: 'm1', enun: 'Dos cargas positivas \\(q_1=+2{,}0\\ \\mathrm{nC}\\) (en \\(x=0\\)) y \\(q_2=+8{,}0\\ \\mathrm{nC}\\) (en \\(x=0{,}60\\ \\mathrm m\\)). Arrastra la sonda hasta el punto donde el <b>campo neto sea cero</b> y pulsa «Fijar». Ahí, una pequeña superficie gaussiana encerraría flujo neto nulo (\\(\\Phi=Q_{\\text{enc}}/\\varepsilon_0\\)).',
            q1: 2, q2: 8, L: 0.6, ok: 0.2, tol: 0.012,
            fbOk: 'Correcto: \\(E_1=E_2\\) da \\(q_1/x^2=q_2/(L-x)^2\\), es decir \\(2/x^2=8/(0{,}60-x)^2\\), de donde \\(x=0{,}20\\ \\mathrm m\\). Ahí el campo (y el flujo a través de una superficie infinitesimal) se anula.',
            fbMal: 'Iguala los dos campos: \\(q_1/x^2=q_2/(L-x)^2\\). Como \\(q_2=4q_1\\), el punto queda dos veces más cerca de \\(q_1\\): \\(x=L/3=0{,}20\\ \\mathrm m\\).' },
          { tipo: 'grafica', id: 'm2', enun: '¿Cuál curva representa \\(E(r)\\) de una <b>esfera conductora</b> cargada, desde el centro hacia afuera? (\\(R=r_0\\).)',
            ylab: 'E',
            ops: [
              { f: (r) => r < 1 ? 0 : 1 / (r * r), t: 'A', ok: true, fb: 'Correcto: dentro del conductor \\(E=0\\) y fuera \\(E=kQ/r^2\\propto1/r^2\\), con el salto en la superficie.' },
              { f: (r) => r < 1 ? r : 1 / (r * r), t: 'B', fb: 'Esta es la esfera <b>aislante</b> con carga uniforme: \\(E\\) crece linealmente dentro (\\(E\\propto r\\)). En un conductor el interior es cero.' },
              { f: (r) => 1 / (r * r), t: 'C', fb: 'Es una carga puntual: el campo diverge hacia el centro. Un conductor anula el campo en todo su interior.' },
            ] },
          { tipo: 'huecos', id: 'm3', texto: 'La ley de Gauss relaciona el {0} eléctrico a través de una superficie cerrada con la {1} y la {2} del vacío: \\(\\Phi_E=\\dfrac{Q_{\\text{enc}}}{\\varepsilon_0}\\). Para aplicarla bien, la superficie gaussiana debe aprovechar la {3} del problema.',
            slots: [['flujo', 'campo', 'potencial'], ['carga encerrada', 'carga externa', 'masa encerrada'], ['permitividad', 'permeabilidad', 'resistividad'], ['simetría', 'asimetría', 'rugosidad']],
            ok: [0, 0, 0, 0], fb: 'La ley de Gauss une el flujo con la carga encerrada y la permitividad \\(\\varepsilon_0\\); la superficie elegida debe respetar la simetría para que \\(E\\) sea constante sobre ella.' },
          { tipo: 'dir', id: 'm4', enun: 'Justo afuera de un conductor en equilibrio, \\(\\vec E\\) es perpendicular a la superficie. En la figura, el conductor (abajo) tiene carga positiva en su cara superior. ¿Hacia dónde apunta \\(\\vec E\\) en \\(P\\), justo encima de la superficie?',
            fig: FIG_CONDUCTOR, ok: 'N',
            fb: { N: 'Correcto. \\(\\vec E\\) es perpendicular a la superficie y, con carga positiva, sale de ella (hacia arriba). Vale \\(E=\\sigma/\\varepsilon_0\\).',
              S: 'Está invertido. El campo sale de la superficie positiva, no entra.',
              E: 'El campo es perpendicular (vertical): no tiene componente paralela a la superficie.',
              O: 'El campo es perpendicular (vertical): no tiene componente paralela a la superficie.',
              '0': 'Hay carga superficial, así que justo afuera el campo no es nulo: \\(E=\\sigma/\\varepsilon_0\\).',
              _: 'En un conductor en equilibrio el campo justo afuera es perpendicular a la superficie; aquí eso es «arriba».' } },
        ],
      },
      {
        nombre: 'Certificación rigurosa', peso: 30,
        intro: 'Cálculo exacto, deducción y ojo crítico. Usa unidades SI; acepta coma o punto y notación 2,5e-3.',
        preguntas: [
          { tipo: 'num', id: 'r1', enun: 'Una superficie gaussiana esférica encierra una carga neta \\(Q=+2{,}0\\ \\mathrm{nC}\\). ¿Cuánto vale el flujo eléctrico neto a través de la superficie?',
            ans: FLUJO, unidad: 'N·m²/C', tol: 0.02,
            errores: [{ v: K * 2.0 * nC, fb: 'Obtuviste \\(kQ\\approx17{,}98\\). Dividiste entre \\(4\\pi\\varepsilon_0\\) en vez de solo \\(\\varepsilon_0\\): la ley de Gauss es \\(\\Phi=Q_{\\text{enc}}/\\varepsilon_0\\), sin \\(4\\pi\\).' },
              { v: 2.0 / EPS0, fb: 'No convertiste los nanocoulombs: \\(2{,}0\\ \\mathrm{nC}=2{,}0\\times10^{-9}\\ \\mathrm C\\).' }],
            fbOk: 'Correcto: \\(\\Phi=Q/\\varepsilon_0=2{,}0\\times10^{-9}/8{,}854\\times10^{-12}=225{,}9\\ \\mathrm{N\\cdot m^2/C}\\).',
            fbMal: '\\(\\Phi=Q_{\\text{enc}}/\\varepsilon_0\\). Con \\(Q=2{,}0\\times10^{-9}\\ \\mathrm C\\): divide entre \\(8{,}854\\times10^{-12}\\).' },
          { tipo: 'num', id: 'r2', enun: 'Un hilo (cilindro) infinito tiene densidad lineal \\(\\lambda=+4{,}0\\ \\mathrm{nC/m}\\). ¿Cuánto vale el campo a \\(r=0{,}10\\ \\mathrm m\\) del eje?',
            ans: E_CIL, unidad: 'N/C', tol: 0.02,
            errores: [{ v: K * 4.0 * nC / 0.10, fb: 'Te faltó el factor 2: para el hilo infinito \\(E=2k\\lambda/r\\), no \\(k\\lambda/r\\).' },
              { v: 2 * K * 4.0 * nC / (0.10 * 0.10), fb: 'Dividiste entre \\(r^2\\): el campo del hilo infinito cae como \\(1/r\\), no \\(1/r^2\\).' }],
            fbOk: 'Correcto: \\(E=2k\\lambda/r=2(8{,}988\\times10^9)(4{,}0\\times10^{-9})/0{,}10=719{,}0\\ \\mathrm{N/C}\\).',
            fbMal: 'Usa \\(E=\\lambda/(2\\pi\\varepsilon_0 r)=2k\\lambda/r\\) con \\(\\lambda\\) en C/m y \\(r\\) en m.' },
          { tipo: 'num', id: 'r3', enun: 'Una esfera conductora de radio \\(R=0{,}10\\ \\mathrm m\\) tiene carga \\(Q=+3{,}0\\ \\mathrm{nC}\\). ¿Cuánto vale el campo a \\(r=0{,}30\\ \\mathrm m\\) del centro?',
            ans: E_ESF, unidad: 'N/C', tol: 0.02,
            errores: [{ v: K * 3.0 * nC / 0.30, fb: 'Calculaste el potencial \\(kQ/r\\), no el campo. El campo es \\(kQ/r^2\\).' },
              { v: K * 3.0 * nC / (0.10 * 0.10), fb: 'Usaste \\(r=0{,}10\\ \\mathrm m\\) (la superficie). El punto está a \\(r=0{,}30\\ \\mathrm m\\), fuera de la esfera.' }],
            fbOk: 'Correcto: fuera de la esfera \\(E=kQ/r^2=(8{,}988\\times10^9)(3{,}0\\times10^{-9})/0{,}30^2=299{,}6\\ \\mathrm{N/C}\\).',
            fbMal: 'Fuera de una distribución con simetría esférica, \\(E=kQ/r^2\\), como si toda la carga estuviera en el centro.' },
          { tipo: 'orden', id: 'r4', enun: 'Ordena los pasos para deducir \\(E\\) de una distribución con simetría usando la ley de Gauss.',
            pasos: ['Identificar la simetría de la distribución de carga.', 'Elegir una superficie gaussiana cerrada que respete esa simetría.', 'Argumentar que \\(E\\) es constante en módulo sobre la superficie y paralelo (o perpendicular) a \\(d\\vec A\\).', 'Calcular el flujo: \\(\\Phi=\\oint\\vec E\\cdot d\\vec A=E\\,A\\).', 'Determinar la carga encerrada \\(Q_{\\text{enc}}\\).', 'Igualar con la ley de Gauss: \\(E\\,A=Q_{\\text{enc}}/\\varepsilon_0\\).', 'Despejar \\(E\\) y comprobar los casos límite.'],
            fb: 'La deducción va de la simetría a la superficie, luego el flujo, después la carga encerrada, se iguala con la ley de Gauss y se despeja; los casos límite se verifican al final.' },
          { tipo: 'error', id: 'r5', enun: 'Un estudiante analiza un conductor cargado en equilibrio electrostático. Toca la línea con el error.',
            lineas: ['\\vec E_{\\text{int}}=0 \\quad\\text{(conductor en equilibrio)}', '\\text{La carga en exceso vive en la superficie}', 'E_{\\text{afuera}}=\\dfrac{\\sigma}{\\varepsilon_0}', '\\text{Por tanto, dentro del conductor: } E=\\dfrac{\\sigma}{\\varepsilon_0}'],
            mala: 3, fb: 'El error está en la línea 4: dentro de un conductor en equilibrio el campo es CERO, no \\(\\sigma/\\varepsilon_0\\). Esa expresión vale justo FUERA de la superficie, perpendicular a ella. La línea 4 contradice la línea 1.' },
          { tipo: 'mc', id: 'r6', enun: 'Un conductor en equilibrio electrostático tiene carga neta. ¿Cuánto vale el campo eléctrico en su interior?',
            ops: [
              { t: 'Cero en todos los puntos del interior.', ok: true, fb: 'Correcto. En equilibrio \\(\\vec E=0\\) en todo el interior; por la ley de Gauss no hay carga neta en el volumen.' },
              { t: '\\(\\sigma/\\varepsilon_0\\).', fb: 'Ese es el módulo del campo justo FUERA de la superficie, no dentro.' },
              { t: '\\(kQ/r^2\\).', fb: 'Esa es la forma del campo FUERA de una esfera conductora. Dentro es cero.' },
              { t: 'Constante y distinto de cero, apuntando hacia afuera.', fb: 'Si hubiera campo interno, movería cargas libres; en equilibrio se anula.' },
            ] },
        ],
      },
    ],
  };
})();
