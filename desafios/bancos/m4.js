// Banco del Desafío Integral · Módulo 4 (distribuciones continuas de carga: varilla, anillo, disco y plano).
// Respuestas numéricas calculadas con k = 8,988e9 y ε₀ = 8,854e-12 (Young y Freedman, 2009), como en el spec.
// Valores de referencia: .design/fase5/M04/_SPEC_TECNICO_M04.md (539 N/C; 3,93×10³ N/C; 7,85×10⁴ N/C; 3,39×10⁵ N/C).
// Tipos: mc, num, dir, orden, pares, huecos, limite, grafica, error, mision (ver bancos/m3.js).
(() => {
  const K = 8.988e9, E0 = 8.854e-12, nC = 1e-9;
  const EVar = K * 12 * nC / (0.40 * Math.sqrt(0.40 * 0.40 + 0.30 * 0.30));                 // 539 N/C
  const EAni = K * 8 * nC * 0.12 / Math.pow(0.12 * 0.12 + 0.05 * 0.05, 1.5);              // 3,93e3 N/C
  const EDis = (6.0e-6 / (2 * E0)) * (1 - 0.30 / Math.sqrt(0.30 * 0.30 + 0.25 * 0.25));   // 7,85e4 N/C
  const EPla = 6.0e-6 / (2 * E0);                                                         // 3,39e5 N/C
  const FIG_VARILLA = `<svg viewBox="0 0 260 170" width="240" role="img" aria-label="Varilla horizontal con carga positiva; punto P sobre la mediatriz a distancia a y campo vertical hacia arriba"><line x1="60" y1="130" x2="200" y2="130" stroke="var(--e10-q-pos)" stroke-width="9" stroke-linecap="round"/><text x="98" y="120" font-size="13" fill="#fff">+ + + +</text><line x1="60" y1="130" x2="60" y2="146" stroke="var(--e10-muted)"/><line x1="200" y1="130" x2="200" y2="146" stroke="var(--e10-muted)"/><text x="118" y="150" font-size="12" fill="var(--e10-ink)">L</text><line x1="130" y1="130" x2="130" y2="52" stroke="var(--e10-muted)" stroke-dasharray="4 4"/><text x="136" y="96" font-size="12" fill="var(--e10-muted)">a</text><circle cx="130" cy="52" r="5" fill="var(--e10-ink)"/><text x="138" y="48" font-size="14" fill="var(--e10-ink)">P</text><line x1="130" y1="52" x2="130" y2="16" stroke="var(--e10-vec-field)" stroke-width="3.5"/><polygon points="130,12 124,22 136,22" fill="var(--e10-vec-field)"/></svg>`;
  const FIG_ANILLO = `<svg viewBox="0 0 260 190" width="240" role="img" aria-label="Anillo con carga positiva en el plano horizontal; punto P sobre el eje vertical y campo hacia arriba"><ellipse cx="130" cy="150" rx="86" ry="24" fill="none" stroke="var(--e10-q-pos)" stroke-width="6"/><text x="126" y="118" font-size="13" fill="var(--e10-ink)">+</text><line x1="130" y1="150" x2="130" y2="58" stroke="var(--e10-muted)" stroke-dasharray="4 4"/><text x="138" y="112" font-size="12" fill="var(--e10-muted)">z</text><circle cx="130" cy="58" r="5" fill="var(--e10-ink)"/><text x="138" y="54" font-size="14" fill="var(--e10-ink)">P</text><line x1="130" y1="58" x2="130" y2="18" stroke="var(--e10-vec-field)" stroke-width="3.5"/><polygon points="130,14 124,24 136,24" fill="var(--e10-vec-field)"/></svg>`;
  const FIG_DISCO = `<svg viewBox="0 0 260 190" width="240" role="img" aria-label="Disco con carga positiva; punto P sobre el eje y campo hacia arriba"><ellipse cx="130" cy="152" rx="86" ry="20" fill="var(--e10-q-pos)"/><text x="56" y="162" font-size="12" fill="#fff">σ</text><line x1="130" y1="152" x2="130" y2="58" stroke="var(--e10-muted)" stroke-dasharray="4 4"/><text x="138" y="112" font-size="12" fill="var(--e10-muted)">z</text><circle cx="130" cy="58" r="5" fill="var(--e10-ink)"/><text x="138" y="54" font-size="14" fill="var(--e10-ink)">P</text><line x1="130" y1="58" x2="130" y2="18" stroke="var(--e10-vec-field)" stroke-width="3.5"/><polygon points="130,14 124,24 136,24" fill="var(--e10-vec-field)"/></svg>`;
  const FIG_PLANO = `<svg viewBox="0 0 260 190" width="240" role="img" aria-label="Plano infinito horizontal con carga positiva; campo perpendicular hacia arriba y hacia abajo"><rect x="30" y="92" width="200" height="7" fill="var(--e10-q-pos)"/><text x="236" y="86" font-size="13" fill="var(--e10-ink)">σ</text><line x1="85" y1="84" x2="85" y2="34" stroke="var(--e10-vec-field)" stroke-width="3.5"/><polygon points="85,30 79,40 91,40" fill="var(--e10-vec-field)"/><line x1="175" y1="84" x2="175" y2="34" stroke="var(--e10-vec-field)" stroke-width="3.5"/><polygon points="175,30 169,40 181,40" fill="var(--e10-vec-field)"/><line x1="85" y1="100" x2="85" y2="150" stroke="var(--e10-vec-field)" stroke-width="3.5"/><polygon points="85,154 79,144 91,144" fill="var(--e10-vec-field)"/><line x1="175" y1="100" x2="175" y2="150" stroke="var(--e10-vec-field)" stroke-width="3.5"/><polygon points="175,154 169,144 181,144" fill="var(--e10-vec-field)"/><text x="92" y="42" font-size="12" fill="var(--e10-vec-field)">E ↑</text><text x="92" y="170" font-size="12" fill="var(--e10-vec-field)">E ↓</text></svg>`;
  window.DESAFIO = {
    modulo: 4,
    titulo: 'Distribuciones continuas de carga',
    sub: 'Densidades lineal (λ) y superficial (σ): varilla, anillo, disco y plano infinito',
    clase: '../presentaciones/M4_DistribucionesContinuas/index.html',
    taller: '../talleres/Taller_4_Distribuciones_de_Carga_Continua.html',
    juego: '../juegos/Juego_4.html',
    juegoNombre: 'Physics Quest · Distribuciones',
    lab: '../simuladores/ContinuousDistLab.html',
    fases: [
      {
        nombre: 'Calentamiento conceptual', peso: 35,
        intro: 'Ideas antes que cuentas: diferenciales de carga, cancelación por simetría y límites asintóticos. Aquí se construye la intuición de varilla, anillo, disco y plano.',
        preguntas: [
          { tipo: 'mc', id: 'c1', enun: 'Para calcular el campo de una varilla delgada con carga uniforme, ¿qué elemento de carga conviene usar?',
            ops: [
              { t: '\\(dq=\\lambda\\,dl\\)', ok: true, fb: 'Correcto. En una línea se usa la densidad lineal \\(\\lambda=Q/L\\) y cada trozo aporta \\(dq=\\lambda\\,dl\\).' },
              { t: '\\(dq=\\sigma\\,dA\\)', fb: 'Esa es la densidad superficial, propia de un disco o un plano, no de una varilla.' },
              { t: '\\(dq=\\rho\\,dV\\)', fb: 'La densidad volumétrica se usa para cuerpos tridimensionales, no para una varilla delgada.' },
              { t: '\\(dq=Q\\) (toda la carga en un punto)', fb: 'Tratar toda la carga junta ignora la extensión de la varilla; solo es válido en el límite \\(a\\gg L\\).' },
            ] },
          { tipo: 'dir', id: 'c2', enun: 'Un anillo con carga positiva está en el plano horizontal y \\(P\\) está sobre su eje, por encima del centro. ¿Hacia dónde apunta \\(\\vec E\\) en \\(P\\)?',
            fig: FIG_ANILLO, ok: 'N',
            fb: { N: 'Correcto. La componente a lo largo del eje apunta alejándose del anillo positivo: hacia arriba.',
              S: 'Está invertido: el campo se aleja de la carga positiva, es decir, hacia arriba en el punto \\(P\\) que está por encima.',
              O: 'Las componentes horizontales se cancelan por simetría. Solo queda la componente vertical, hacia arriba.',
              E: 'Ídem que la opción anterior: por simetría no hay componente horizontal; el campo es vertical, hacia arriba.',
              '0': 'En un punto del eje fuera del centro, el campo del anillo no es nulo; solo en \\(z=0\\) se anula.',
              _: 'Suma las contribuciones de dos elementos diametrales: las horizontales se cancelan y queda la vertical, hacia arriba.' } },
          { tipo: 'limite', id: 'c3', enun: 'Un disco de radio \\(R\\) y carga \\(Q\\) se observa desde una distancia \\(z\\gg R\\). ¿A qué tiende su campo en el eje?',
            ops: [
              { t: '\\(\\dfrac{kQ}{z^2}\\), como una carga puntual.', ok: true, fb: 'Correcto. Con \\(z\\gg R\\) el disco se ve como un punto y \\(E_z\\to kQ/z^2\\).' },
              { t: '\\(\\dfrac{\\sigma}{2\\varepsilon_0}\\), como un plano infinito.', fb: 'Ese es el límite opuesto (\\(z\\ll R\\) o \\(R\\to\\infty\\)): cerca del disco el campo tiende a \\(\\sigma/2\\varepsilon_0\\).' },
              { t: '\\(\\dfrac{2k\\lambda}{z}\\), como una varilla infinita.', fb: 'Ese límite corresponde a una varilla muy larga, no a un disco.' },
              { t: 'Cero, porque las cargas se reparten y se anulan.', fb: 'La carga neta \\(Q\\) no es cero; lejos el campo no se anula, cae como \\(kQ/z^2\\).' },
            ] },
          { tipo: 'pares', id: 'c4', enun: 'Relaciona cada geometría con su expresión de campo.',
            izq: ['Varilla finita, en la mediatriz', 'Anillo, en el eje', 'Disco, en el eje', 'Plano infinito', 'Varilla muy larga (L→∞)'],
            der: ['\\(E=\\dfrac{kQ}{a\\sqrt{a^2+(L/2)^2}}\\)', '\\(E_z=\\dfrac{kQz}{(z^2+R^2)^{3/2}}\\)', '\\(E_z=\\dfrac{\\sigma}{2\\varepsilon_0}\\left[1-\\dfrac{z}{\\sqrt{z^2+R^2}}\\right]\\)', '\\(E=\\dfrac{\\sigma}{2\\varepsilon_0}\\)', '\\(E=\\dfrac{2k\\lambda}{a}\\)'],
            fb: 'Cada geometría tiene su expresión: la varilla finita lleva el factor \\(\\sqrt{a^2+(L/2)^2}\\), el anillo el exponente \\(3/2\\), el disco el corchete \\([1-z/\\sqrt{z^2+R^2}]\\), y el plano \\(\\sigma/(2\\varepsilon_0)\\). La varilla infinita es el límite \\(L\\to\\infty\\) de la finita.' },
          { tipo: 'mc', id: 'c5', enun: 'En un anillo cargado, cada elemento \\(dq\\) produce un \\(d\\vec E\\) en un punto del eje. ¿Por qué el campo neto solo tiene componente a lo largo del eje?',
            ops: [
              { t: 'Las componentes perpendiculares al eje de elementos diametralmente opuestos se cancelan.', ok: true, fb: 'Correcto. Cada par diametral deja solo su componente axial; las transversales se anulan por simetría.' },
              { t: 'Todos los \\(d\\vec E\\) apuntan exactamente a lo largo del eje.', fb: 'Cada \\(d\\vec E\\) apunta de \\(dq\\) hacia el punto, con inclinación. Solo la componente axial sobrevive.' },
              { t: 'El campo en el eje es cero, así que no hay componentes.', fb: 'En el eje el campo no es cero (salvo en \\(z=0\\)): vale \\(kQz/(z^2+R^2)^{3/2}\\).' },
              { t: 'La ley de Coulomb no se aplica a distribuciones continuas.', fb: 'Sí se aplica: se integra la contribución de cada \\(dq\\) usando superposición.' },
            ] },
          { tipo: 'huecos', id: 'c6', texto: 'En un anillo delgado el diferencial de carga es {0}; al integrar, la componente perpendicular al eje de cada dE se {1} con la del elemento diametral, y solo sobrevive la componente {2}. En el centro del anillo (z = 0) el campo neto es {3}.',
            slots: [['dq = λ dl', 'dq = σ dA', 'dq = ρ dV'], ['cancela', 'suma', 'duplica'], ['axial', 'radial', 'tangencial'], ['máximo', 'infinito', 'cero']],
            ok: [0, 0, 0, 2], fb: 'En una línea se usa dq = λ dl; las componentes perpendiculares se cancelan por simetría, dejando solo la axial, y en z = 0 el campo se anula por completo.' },
        ],
      },
      {
        nombre: 'Misión interactiva', peso: 35,
        intro: 'Manipula, predice y comprueba. Si quieres más práctica, abre Physics Quest o ContinuousDistLab antes de seguir.',
        preguntas: [
          { tipo: 'mision', id: 'm1', enun: 'Dos cargas puntuales idénticas \\(+q\\) están separadas \\(L=0{,}60\\ \\mathrm m\\). Arrastra el punto de prueba hasta donde el <b>campo neto se anule</b> y pulsa «Fijar». La simetría aquí hace lo mismo que en el centro de un anillo: cancela los efectos opuestos.',
            q1: 2, q2: 2, L: 0.6, ok: 0.3, tol: 0.012,
            fbOk: 'Correcto: por simetría el campo nulo está en el punto medio, \\(x=0{,}30\\ \\mathrm m\\). Es la misma idea del centro de un anillo, donde las contribuciones diametrales se cancelan.',
            fbMal: 'Ahí los dos campos no son iguales. Con cargas idénticas el campo nulo está exactamente a la mitad: iguala \\(q/x^2=q/(L-x)^2\\).' },
          { tipo: 'grafica', id: 'm2', enun: '¿Cuál curva representa el campo \\(E_z\\) de un <b>disco finito</b>, en función de la distancia \\(r\\) al centro (en unidades del radio \\(R\\))? Observa cómo se comporta cerca y lejos.',
            ylab: 'E_z',
            ops: [
              { f: (r) => 1 - r / Math.sqrt(r * r + 1), t: 'A', ok: true, fb: 'Correcto: cerca del disco el campo se acerca al del plano (\\(\\sigma/2\\varepsilon_0\\)) y lejos cae como el de una carga puntual (\\(kQ/z^2\\)). La curva del disco une ambos regímenes.' },
              { f: (r) => 1, t: 'B', fb: 'Esa línea horizontal es el campo de un plano infinito, independiente de la distancia: el límite \\(R\\to\\infty\\) del disco.' },
              { f: (r) => 1 / (r * r), t: 'C', fb: 'Esa caída en \\(1/r^2\\) es el campo de una carga puntual, el límite \\(r\\gg R\\) del disco. El disco finito arranca más suave, como un plano.' },
            ] },
          { tipo: 'dir', id: 'm3', enun: 'Un plano infinito con carga positiva está en el plano horizontal. ¿Hacia dónde apunta \\(\\vec E\\) en un punto \\(P\\) justo por debajo?',
            fig: FIG_PLANO, ok: 'S',
            fb: { S: 'Correcto. El campo se aleja de la carga positiva por ambos lados: hacia abajo en un punto debajo del plano.',
              N: 'Esa es la dirección en un punto por encima del plano. Debajo, el campo apunta hacia abajo.',
              O: 'El plano es horizontal e infinito: por simetría el campo es perpendicular, sin componente horizontal.',
              E: 'Por simetría no hay componente horizontal; el campo es perpendicular al plano, hacia abajo debajo de él.',
              '0': 'El campo del plano no es nulo: vale \\(\\sigma/(2\\varepsilon_0)\\), independiente de la distancia.',
              _: 'Recuerda: \\(E=\\sigma/(2\\varepsilon_0)\\), perpendicular al plano y alejándose de él por ambos lados.' } },
          { tipo: 'mc', id: 'm4', enun: 'El campo de un anillo en su eje crece desde cero (en \\(z=0\\)) y luego decrece. ¿En qué punto alcanza su máximo?',
            ops: [
              { t: '\\(z=R/\\sqrt{2}\\)', ok: true, fb: 'Correcto. Derivando \\(E_z=kQz/(z^2+R^2)^{3/2}\\) e igualando a cero se obtiene \\(z=R/\\sqrt2\\approx0{,}707R\\).' },
              { t: '\\(z=0\\)', fb: 'En \\(z=0\\) el campo es cero (las contribuciones diametrales se cancelan), no un máximo.' },
              { t: '\\(z=R\\)', fb: 'Cerca, pero el máximo está en \\(R/\\sqrt2\\approx0{,}707R\\), no en \\(R\\).' },
              { t: '\\(z\\to\\infty\\)', fb: 'Muy lejos el campo tiende a cero, como \\(kQ/z^2\\), no a un máximo.' },
            ] },
          { tipo: 'mc', id: 'm5', enun: 'Un plano infinito uniformemente cargado tiene \\(\\sigma=6{,}0\\times10^{-6}\\ \\mathrm{C/m^2}\\). ¿Cuánto vale el módulo del campo que produce?',
            ops: [
              { t: '\\(3{,}39\\times10^{5}\\ \\mathrm{N/C}\\)', ok: true, fb: 'Correcto: \\(E=\\sigma/(2\\varepsilon_0)=6{,}0\\times10^{-6}/(2\\cdot8{,}854\\times10^{-12})=3{,}39\\times10^5\\ \\mathrm{N/C}\\).' },
              { t: '\\(6{,}78\\times10^{5}\\ \\mathrm{N/C}\\)', fb: 'Ese es \\(\\sigma/\\varepsilon_0\\), el campo entre dos planos opuestos. Un solo plano da la mitad: \\(\\sigma/(2\\varepsilon_0)\\).' },
              { t: '\\(7{,}85\\times10^{4}\\ \\mathrm{N/C}\\)', fb: 'Ese es el campo de un disco finito (\\(R=0{,}25\\) m) a \\(z=0{,}30\\) m. El plano infinito da más: \\(3{,}39\\times10^5\\ \\mathrm{N/C}\\).' },
              { t: '\\(1{,}70\\times10^{5}\\ \\mathrm{N/C}\\)', fb: 'Esa es la mitad del valor correcto; revisa el factor 2 en \\(\\sigma/(2\\varepsilon_0)\\).' },
            ] },
        ],
      },
      {
        nombre: 'Certificación rigurosa', peso: 30,
        intro: 'Cálculo exacto y ojo crítico. Usa unidades SI; acepta coma o punto y notación 2,5e-3.',
        preguntas: [
          { tipo: 'num', id: 'r1', enun: `<div style="margin:0 0 10px">${FIG_VARILLA}</div>Una varilla finita de longitud \\(L=0{,}60\\ \\mathrm m\\) tiene carga uniforme \\(Q=+12\\ \\mathrm{nC}\\). ¿Cuánto vale el campo en un punto de la mediatriz, a \\(a=0{,}40\\ \\mathrm m\\) de la varilla?`,
            ans: EVar, unidad: 'N/C', tol: 0.02,
            errores: [{ v: K * 12 * nC / (0.40 * 0.40), fb: 'Diste el campo de una carga puntual (\\(kQ/a^2=674\\ \\mathrm{N/C}\\)). Esa aproximación solo vale si \\(a\\gg L\\), y aquí \\(L=0{,}60\\ \\mathrm m\\) no es despreciable.' },
              { v: 2 * K * (12 * nC / 0.60) / 0.40, fb: 'Usaste la varilla infinita (\\(2k\\lambda/a=899\\ \\mathrm{N/C}\\)). Para \\(L=0{,}60\\ \\mathrm m\\) hay que usar la expresión finita.' }],
            fbOk: 'Correcto: \\(E=\\dfrac{kQ}{a\\sqrt{a^2+(L/2)^2}}=\\dfrac{(8{,}988\\times10^9)(12\\times10^{-9})}{0{,}40\\cdot0{,}50}=539\\ \\mathrm{N/C}\\). La carga puntual daría 674 N/C: la extensión importa.',
            fbMal: 'Usa \\(E=\\dfrac{kQ}{a\\sqrt{a^2+(L/2)^2}}\\) con \\(L=0{,}60\\ \\mathrm m\\). El factor \\(\\sqrt{a^2+(L/2)^2}=\\sqrt{0{,}40^2+0{,}30^2}=0{,}50\\ \\mathrm m\\).' },
          { tipo: 'num', id: 'r2', enun: 'Un anillo de radio \\(R=0{,}050\\ \\mathrm m\\) tiene carga uniforme \\(Q=+8{,}0\\ \\mathrm{nC}\\). ¿Cuánto vale el campo en un punto del eje a \\(z=0{,}12\\ \\mathrm m\\) del centro?',
            ans: EAni, unidad: 'N/C', tol: 0.02,
            errores: [{ v: K * 8 * nC / (0.12 * 0.12), fb: 'Usaste la carga puntual (\\(kQ/z^2=5{,}0\\times10^3\\ \\mathrm{N/C}\\)). Vale solo si \\(z\\gg R\\); aquí \\(z\\) y \\(R\\) son comparables.' },
              { v: K * 8 * nC * 0.12 / (0.12 * 0.12 + 0.05 * 0.05), fb: 'Olvidaste elevar el denominador a \\(3/2\\): usaste \\((z^2+R^2)\\) en vez de \\((z^2+R^2)^{3/2}\\), y da \\(\\approx5{,}1\\times10^2\\ \\mathrm{N/C}\\).' }],
            fbOk: 'Correcto: \\(E_z=\\dfrac{kQz}{(z^2+R^2)^{3/2}}=\\dfrac{(8{,}988\\times10^9)(8{,}0\\times10^{-9})(0{,}12)}{(0{,}12^2+0{,}05^2)^{3/2}}=3{,}93\\times10^3\\ \\mathrm{N/C}\\).',
            fbMal: 'Usa \\(E_z=\\dfrac{kQz}{(z^2+R^2)^{3/2}}\\) con \\(z=0{,}12\\ \\mathrm m\\) y \\(R=0{,}050\\ \\mathrm m\\). No olvides el exponente \\(3/2\\).' },
          { tipo: 'num', id: 'r3', enun: `<div style="margin:0 0 10px">${FIG_DISCO}</div>Un disco de radio \\(R=0{,}25\\ \\mathrm m\\) tiene densidad superficial uniforme \\(\\sigma=6{,}0\\times10^{-6}\\ \\mathrm{C/m^2}\\). ¿Cuánto vale el campo en un punto del eje a \\(z=0{,}30\\ \\mathrm m\\) del centro?`,
            ans: EDis, unidad: 'N/C', tol: 0.02,
            errores: [{ v: EPla, fb: 'Usaste el plano infinito (\\(\\sigma/2\\varepsilon_0=3{,}39\\times10^5\\ \\mathrm{N/C}\\)). Vale solo si \\(R\\to\\infty\\) o \\(z\\ll R\\); aquí el disco es finito.' },
              { v: K * (6.0e-6 * Math.PI * 0.25 * 0.25) / (0.30 * 0.30), fb: 'Usaste la carga puntual (\\(kQ/z^2\\approx1{,}2\\times10^5\\ \\mathrm{N/C}\\)). Para \\(z\\approx R\\) el disco no se comporta como punto.' }],
            fbOk: 'Correcto: \\(E_z=\\dfrac{\\sigma}{2\\varepsilon_0}\\left[1-\\dfrac{z}{\\sqrt{z^2+R^2}}\\right]=3{,}39\\times10^5\\cdot\\left[1-\\dfrac{0{,}30}{\\sqrt{0{,}30^2+0{,}25^2}}\\right]=7{,}85\\times10^4\\ \\mathrm{N/C}\\).',
            fbMal: 'Usa \\(E_z=\\dfrac{\\sigma}{2\\varepsilon_0}\\left[1-\\dfrac{z}{\\sqrt{z^2+R^2}}\\right]\\). Calcula \\(\\sqrt{z^2+R^2}=\\sqrt{0{,}30^2+0{,}25^2}=0{,}39\\ \\mathrm m\\).' },
          { tipo: 'orden', id: 'r4', enun: 'Ordena los pasos para hallar el campo de una distribución continua (por ejemplo, el de un disco en su eje).',
            pasos: ['Elegir el elemento diferencial \\(dq\\) y su densidad: \\(\\lambda\\,dl\\) o \\(\\sigma\\,dA\\).', 'Trazar el vector de posición \\(\\vec r\\) de \\(dq\\) al punto y analizar la simetría.', 'Escribir el campo diferencial \\(d\\vec E = k\\,dq/r^2\\).', 'Proyectar sobre el eje y cancelar las componentes perpendiculares por simetría.', 'Integrar con los límites de la geometría (0 a \\(L\\), 0 a \\(2\\pi R\\) o 0 a \\(R\\)).', 'Evaluar los límites asintóticos: \\(z\\gg R\\) da carga puntual; \\(R\\gg z\\) da plano \\(\\sigma/2\\varepsilon_0\\).', 'Revisar unidades y el sentido del campo.'],
            fb: 'Primero el diferencial y su densidad, luego la simetría, después el \\(d\\vec E\\) y su proyección, la integral con límites y, al final, los límites asintóticos y la revisión de unidades.' },
          { tipo: 'error', id: 'r5', enun: 'Un estudiante calcula el campo de una varilla finita (\\(L=0{,}60\\) m, \\(Q=12\\) nC) en su mediatriz, a \\(0{,}40\\) m. Toca la línea con el error.',
            lineas: ['\\lambda=\\dfrac{Q}{L}=\\dfrac{12\\times10^{-9}}{0{,}60}=2{,}0\\times10^{-8}\\ \\mathrm{C/m}', 'E=\\dfrac{2k\\lambda}{a}=\\dfrac{2(8{,}988\\times10^9)(2{,}0\\times10^{-8})}{0{,}40}', 'E=899\\ \\mathrm{N/C}', '\\text{La varilla es bastante larga; puedo tratarla como infinita.}'],
            mala: 1, fb: 'El error está en la línea 2: usaste la fórmula de la varilla infinita (\\(2k\\lambda/a\\)), que solo vale cuando \\(L\\to\\infty\\). Para una varilla finita es \\(E=kQ/(a\\sqrt{a^2+(L/2)^2})=539\\ \\mathrm{N/C}\\). La línea 4 arrastra ese mismo error conceptual.' },
        ],
      },
    ],
  };
})();
