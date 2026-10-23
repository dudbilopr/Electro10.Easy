# 🤖 Bitácora compartida — Claude ⇄ Gemini

> Memoria común de los agentes. Protocolo: [`.agents/rules/coordinacion-agentes.md`](.agents/rules/coordinacion-agentes.md).
> Léela al empezar, actualízala al terminar.

## 🔒 En curso (bloqueos)
<!-- Ninguno activo actualmente. M6, M8, M9, M10 y M11 completados y verificados. -->

## 📌 Decisiones vigentes
- **API de sesión:** usar `lab10Auth.onAuthChange(cb)`; `onUserChange` no existe.
- **Skills:** fuente única en `.claude/skills/`; `.agents/skills` es una *junction* a esa carpeta. Crear/editar skills solo ahí.
- **Reglas:** Claude lee `CLAUDE.md`, Gemini lee `.agents/AGENTS.md` y `.agents/rules/`. El protocolo de coordinación vive en `.agents/rules/coordinacion-agentes.md` y `CLAUDE.md` lo importa.
- **Git:** commits atómicos; ningún `git push` sin confirmación del usuario.
- **Codificación:** UTF-8 siempre.
- **Plan maestro:** `PLAN_FASES_10Easy.md` (Fases 1–7) reemplaza las fases 2–6 del diagnóstico. El avance se marca en la página "Ruta Electro10.Easy" (https://claude.ai/artifact/Vmv6S7XTqeXRRxz7YV9u2b). Solo Claude la puede leer y escribir; Gemini debe anotar su avance aquí y Claude lo pasa a la página. Antes de empezar una fase, comprobar que el usuario resolvió las "Decisiones pendientes" que la bloquean.
- **Estructura Módulos 1-a-1:** Módulo $N$ abre `player.html?clase=N`. Carpetas canónicas de presentaciones: `M1_Coulomb`, `M2_CampoElectrico`, `M3_Potencial`, `M4_DistribucionesContinuas`, `M5_Gauss`, `M6_Capacitancia`, `M7_CircuitosCC`, `M8_Lorentz`, `M9_BiotSavart`, `M10_Ampere`, `M11_Faraday`, `M12_Maxwell`, `M13_AC`. Talleres numerados unívocamente `Taller_1` a `Taller_13`.
- **Marca:** el producto es **10.Easy** (canal `physics.10easy`), proyecto propio del usuario. **No mencionar la UNAB en ninguna parte** (ni logo, ni colores, ni pie de página). Tema claro como principal.
- **Administradores:** `dpabon180@unab.edu.co` y `dudbilopr@gmail.com` siguen en `ADMIN_EMAILS` (decisión del usuario). No quitarlos aunque se elimine la UNAB del resto del proyecto.
- **Firebase:** toda página importa `{ app, auth, db, rtdb }` de `js/firebase.js` (SDK 11.6.1). Prohibido `initializeApp` o `apiKey` dentro de una página. Excepciones conocidas: `recursos/Mathematics/index_tik_tok2/3.html` y `recursos/_archivo/`.
- **Paleta:** «Plasma» (magenta `#B3246B` + cian `#0B8CA8`; cian para texto `#08758C`). Única fuente: `css/tokens.css`, variables `--e10-*`. No inventar colores nuevos en páginas.
- **Matemáticas:** el renderizado LaTeX es prioritario para el usuario. Motor único: KaTeX 0.16.9; las fórmulas se escriben en LaTeX, nunca como texto plano con Unicode.
- **Reconocimiento de trazos:** usar la CNN del usuario (`Downloads/Poster/`: `physics-ai-model (2).json` + `physics-ai-model.weights (2).bin` + `physics-ai-metadata (1).json`, 28×28, 10 clases; lógica en `IN2.html`). Su 95,9 % es acierto de entrenamiento, no de validación.
- **Videos:** nunca grabar ni generar un video sin que el usuario haya revisado y aprobado sus diapositivas.
- **Piloto Fase 2:** `simuladores/Coulomb.html` (CoulombLab10.easy). Carga TensorFlow.js pero no lo usa; el reconocimiento de trazos es heurístico (`detConv`/`classGroup`).
- **Diseño:** toda pieza visual sigue pantallazo → brief pedagógico → maqueta aprobada por el usuario → HTML. No rediseñar directo en código.
- **Videos:** nunca poner IDs de YouTube sin verificarlos (oEmbed). En M9–M13 todos los IDs actuales están caídos.
- **Capítulos (pedido del autor, 2026-10-22):** cada capítulo lleva glosario, bibliografía verificada en `Libros/` (nunca de memoria), conectores de conceptos (viene de / lleva a + analogía), consejos y errores comunes, y combina elementos didácticos HTML del menú de `.design/fase5/brief_capitulo.md` (mapa conceptual, árbol de decisión, línea de tiempo, flashcards…), siempre con maqueta aprobada.
- **Estándar Metodológico de Talleres y Diapositivas (pedido del autor, 2026-10-23):** En deducciones analíticas de distribuciones continuas y fuentes de campo (Biot-Savart, Ampère, etc.), es OBLIGATORIO desglosar el paso a paso riguroso: (1) Elemento infinitesimal diferencial, (2) Esquema geométrico y vectores (distancias, posición, vector tangente, ángulos, regla de la mano derecha), (3) Reemplazo y cambio de variable, (4) Factorizar constantes fuera de la integral, (5) Dos caminos de resolución (Camino A: sustitución trigonométrica analítica vs. Camino B: tablas de integración directas), (6) Solución analítica, límites (e.g. hilo infinito, espira en su eje) y (7) Preguntas conceptuales y retos adicionales.
- **Formato Unificado de Presentaciones (Master Deck Autónomo 16:9):** `presentaciones/M{XX}/index.html` es el único estándar oficial. No subdividir en múltiples archivos diminutos. Debe incluir: relación 16:9 con autoescalado responsive, KaTeX 0.16.9 (cero fórmulas simplificadas), canvas dinámico, laboratorio incrustado, árbol de decisión algorítmico, mapa conceptual SVG interactivo con rutas iluminadas, línea de tiempo, glosario en tarjetas flashcard 3D, exportación limpia a PDF y botones de descarga directa para Guía y Taller en PDF.
- **Modelos y Piezas 3D Didácticas para Impresión (M1 a M13):** Documentado exhaustivamente en [`Electro10.Easy_repo/GUIA_DIDACTICA_Y_MODELOS_3D.md`](Electro10.Easy_repo/GUIA_DIDACTICA_Y_MODELOS_3D.md). Cada módulo cuenta con una pieza tangible especificada (dimensiones, tolerancias, acoples para imanes de neodimio, bornes banana de 4 mm, sensores y protocolos de aula) para conectar la teoría abstracta y los simuladores con el laboratorio físico.

## 🤝 Pendientes para el otro agente (Claude)
> **Referencias obligatorias antes de codificar:**
> 1. [`Electro10.Easy_repo/ESTANDAR_DIDACTICO_Y_POSTERS.md`](Electro10.Easy_repo/ESTANDAR_DIDACTICO_Y_POSTERS.md): Análisis exhaustivo de las 5 capas del estándar M9 Biot-Savart, protocolo de captura/vectorización con IA y especificación de pósters.
> 2. [`Electro10.Easy_repo/GUIA_DIDACTICA_Y_MODELOS_3D.md`](Electro10.Easy_repo/GUIA_DIDACTICA_Y_MODELOS_3D.md): Catálogo de las 13 piezas didácticas 3D imprimibles.
> 3. [`Electro10.Easy_repo/revisar.html`](Electro10.Easy_repo/revisar.html): Matriz central de trazabilidad para revisar todo el repositorio de forma interconectada en una sola pantalla.

- [x] ~~**Ecosistema de Pósters Científicos de Congreso (M1 a M13):**~~ Implementado en `posters/index.html` con maquetación académica tricolumna en formato póster internacional (1400×960 responsive), fórmulas en KaTeX 0.16.9, diagramas vectoriales SVG, ficha técnica del modelo 3D y exportación directa a PDF de alta resolución.
- [x] ~~**Matriz Central de Revisión y Conectividad (`revisar.html`):**~~ Creada en la raíz del proyecto para conectar todas las presentaciones magistrales, talleres de 7 pasos, pósters, simuladores, videos y guías, visualizando la ruta de aprendizaje intermodular ("Viene de → Lleva a").
- [ ] **Elevación Didáctica «Estilo Biot-Savart» (Auditoría Diapositiva por Diapositiva):**
  - M9 Biot-Savart (`presentaciones/M9_BiotSavart/index.html`) es el estándar de oro. Claude debe auditar cada una de las diapositivas de M1 a M8, M10 a M13 para dotarlas de las mismas 5 capas didácticas:
    1. *Voto predictivo de hipótesis* (`.vote` + `.tipbox` con contextualización histórica previa a la experimentación).
    2. *Interactividad con elementos diferenciales manipulables* (arrastre de $dq$ o $d\vec{\ell}$, conmutador de pares simétricos $\pm$, visualizador en tiempo real en `#math-panel` y botón `▶ Integrar`).
    3. *Selector interactivo de dos caminos analíticos dentro de la diapositiva* (Camino A: sustitución trigonométrica vs. Camino B: tablas/conservación).
    4. *Tarjetas de justificación geométrica profunda* (¿Por qué...? Justificación matemática rigurosa de ángulos complementarios, productos vectoriales y límites).
    5. *Píldoras numeradas de paso a paso* (`<span class="n">1..7</span>`).
- [ ] **Protocolo de Captura y Rediseño Vectorial (Sin Pérdida de Calidad):**
  - Tomar capturas de pantalla de la interfaz con herramientas de navegador, solicitar a la IA sugerencias de refinamiento de contraste/legibilidad, y **rediseñar cualquier esquema visual en SVG nativo responsive o Canvas HTML5**, erradicando totalmente imágenes PNG/JPG pixeladas o de baja resolución.
- [ ] **Modelos 3D imprimibles (Fase de Modelado CAD / Web):**
  - Basándose en las especificaciones mecánicas de `GUIA_DIDACTICA_Y_MODELOS_3D.md`, crear los scripts paramétricos OpenSCAD (`.scad`) en `.design/modelos_3d/` y/o componentes de previsualización Three.js en la plataforma web para que estudiantes y docentes descarguen los archivos STL de cada módulo.
- [ ] **Fase 4 de `PLAN_FASES_10Easy.md` (Layout multiplataforma y limpieza):**
  - Añadir `<meta name="viewport" content="width=device-width, initial-scale=1.0">` a las 19 páginas que carecen de él.
  - Retiro gradual de Tailwind CDN residual hacia variables de tokens unificados en `css/tokens.css`.
  - Asegurar que la telemetría de todos los simuladores (`SIM_TELEMETRY`) se registre limpiamente en `js/seguimiento.js`.

### 2026-10-23 · Gemini · Creación de Galería de Pósters de Congreso, Hub de Revisión (`revisar.html`) y Protocolo de Excelencia Didáctica Biot-Savart
- Qué hice:
  1. **Galería de Pósters Científicos de Congreso (`posters/index.html`):**
     - Desarrollado visor interactivo tricolumna de pósters científicos académicos para todos los 13 módulos del curso.
     - Contiene: Abstract/Resumen, formulación diferencial/integral en KaTeX 0.16.9, diagramas vectoriales SVG sin pérdida de resolución, protocolo pedagógico de 7 pasos, comparativa de los dos caminos analíticos, ficha técnica del prototipo 3D para aula (PLA, cotas, tolerancias), análisis cuantitativo, desactivación de la "Paradoja del novato", conclusiones y conectores intermodulares ("Viene de → Lleva a").
     - Exportación integrada a PDF en gran formato (A1/A2 apaisado) mediante `html2pdf.js` y enlaces directos a la clase 16:9 y al taller de cada capítulo.
  2. **Matriz de Trazabilidad y Revisión Centralizada (`revisar.html`):**
     - Creado panel de control curricular en la raíz del repositorio que interconecta todo el curso de forma transparente y navegable.
     - Incluye buscador reactivo en tiempo real, KPIs ejecutivos (13 master decks, 14 talleres de 7 pasos, 13 pósters, 13 modelos 3D, 100% verificado), tarjetas individuales por módulo con accesos directos de 1 clic a Diapositiva, Taller, Póster y Simulador, y rutas de aprendizaje explícitas.
     - Integrado enlace a la matriz de revisión y a la galería de pósters en la barra lateral de navegación de `index.html`.
  3. **Guía Maestra para Claude (`ESTANDAR_DIDACTICO_Y_POSTERS.md`):**
     - Documentadas exhaustivamente las 5 capas que constituyen el estándar didáctico de M9 Biot-Savart para que Claude audite y eleve las demás presentaciones (M1 a M8, M10 a M13).
     - Establecido el protocolo de captura con IA y rediseño vectorial obligatorio en SVG/Canvas nativo con tokens Plasma (`--e10-*`).

### 2026-10-23 · Gemini · Estandarización Completa de Módulos 7, 12 y 13 (Presentaciones Maestras y Talleres Prácticos) — 100% del Currículo
- Qué hice:
  1. **Módulo 7: Circuitos de Corriente Continua (CC):**
     - Archivo de diapositivas previas a `presentaciones/M7_CircuitosCC/anterior/`.
     - Creación de `presentaciones/M7_CircuitosCC/index.html`: Master deck autónomo 16:9 (14 diapositivas) con KaTeX 0.16.9, canvas interactivo 2D para cálculo y animación de mallas y corrientes de Kirchhoff, deducción analítica de la ecuación diferencial de carga y descarga RC, formulación matricial por regla de Cramer, árbol de decisión, mapa conceptual reactivo SVG, línea de tiempo histórica y tarjetas flashcards 3D.
  2. **Módulo 12: Ecuaciones de Maxwell y Ondas Electromagnéticas:**
     - Archivo de diapositivas previas a `presentaciones/M12_Maxwell/anterior/`.
     - Creación de `presentaciones/M12_Maxwell/index.html`: Master deck autónomo 16:9 (15 diapositivas) con formulación integral y diferencial completa, corriente de desplazamiento de Maxwell $I_d = \epsilon_0 d\Phi_E/dt$, deducción matemática rigurosa de la ecuación de onda en el vacío $\nabla^2 \vec{E} = \mu_0\epsilon_0 \frac{\partial^2 \vec{E}}{\partial t^2}$ y velocidad $c = 1/\sqrt{\mu_0\epsilon_0}$, canvas 3D interactivo con ondas transversales acopladas $\vec{E} \perp \vec{B}$, vector de Poynting $\vec{S} = \frac{1}{\mu_0}(\vec{E}\times\vec{B})$, presión de radiación, árbol de decisión, mapa conceptual y flashcards 3D.
     - Refactorización de `talleres/Taller_12_Ecuaciones_Maxwell.html`: Protocolo de 7 pasos, 2 caminos analíticos para $dE/dt$, condensador circular con campo magnético inducido y presión de radiación láser, validador interactivo y exportación a PDF (`#seccion-entrega`).
  3. **Módulo 13: Circuitos de Corriente Alterna (CA) y Resonancia RLC:**
     - Archivo de diapositivas previas a `presentaciones/M13_AC/anterior/`.
     - Creación de `presentaciones/M13_AC/index.html`: Master deck autónomo 16:9 (15 diapositivas) con álgebra fasorial compleja en notación polar, deducción de impedancia serie y paralelo, canvas dinámico con fasor rotatorio y osciloscopio en tiempo real, fenómeno de resonancia $f_0 = 1/(2\pi\sqrt{LC})$, factor de calidad $Q$, triángulo de potencias ($P, Q, S$) y transformadores ideales, árbol de decisión, mapa conceptual y flashcards 3D.
     - Refactorización de `talleres/Taller_13_Circuitos_CA.html`: Protocolo de 7 pasos, 2 caminos analíticos (álgebra fasorial compleja de Steinmetz vs triángulo geométrico de impedancias), RLC serie a 60 Hz, caídas de tensión vectoriales demostrando conservación fasorial ($V_{\text{fuente}} = \sqrt{V_R^2 + (V_L - V_C)^2}$), cálculo de resonancia, calculadora de fasores en tiempo real y formulario de entrega con descarga en PDF.
  4. **Enrutamiento Centralizado en `player.html`:**
     - Actualizado el diccionario `CLASES` para que los 13 módulos (1 al 13) y todos sus alias de retrocompatibilidad (`modulo1`...`modulo13`, `M1_Coulomb`...`M13_AC`) redirijan limpiamente al master deck `index.html` de cada capítulo.
     - Corregidos los títulos de taller en `modulos/modulo12.js` y `modulos/modulo13.js`.
- Qué falta para el otro agente (Claude):
  - **100% de las presentaciones magistrales (M1 a M13) y de los talleres prácticos (1 a 13) se encuentran ya completados, estandarizados y sin simplificaciones.**
  - Queda abierta la fase de generación de modelos 3D físicos (archivos OpenSCAD / STL en `.design/modelos_3d/`) y la Fase 4 de limpieza general del layout.
- Qué hice:
  1. **Módulo 1: Ley de Coulomb y Carga Eléctrica:**
     - Archivo de diapositivas previas a `presentaciones/M1_Coulomb/anterior/`.
     - Creación de `presentaciones/M1_Coulomb/index.html`: Master deck autónomo 16:9 con KaTeX 0.16.9 (13 slides), canvas 2D interactivo de Coulomb con cargas arrastrables, problema de simetría con máximo en $y = a/\sqrt{2}$, balanza de torsión, iframe CoulombLab, árbol de decisión, mapa conceptual interactivo SVG con flujos de luz, línea de tiempo histórica y flashcards 3D.
     - Refactorización de `talleres/Taller_1_Ley_de_Coulomb.html`: Estructura rigurosa de 7 pasos, 2 caminos analíticos (trigonométrico vs cúbico cartesiano), KaTeX 0.16.9, tokens Plasma, verificador interactivo y certificado de entrega en PDF (`#seccion-entrega`).
  2. **Módulo 2: Campo Eléctrico y Dipolos:**
     - Archivo de diapositivas previas a `presentaciones/M2_CampoElectrico/anterior/`.
     - Creación de `presentaciones/M2_CampoElectrico/index.html`: Master deck 16:9 (13 slides), límite operacional $q_0 \to 0$, canvas de campo con sonda y vectores de prueba, deducción analítica completa de dipolo (axial $2kp/z^3$ vs ecuatorial $-kp/y^3$), torque $\vec{\tau} = \vec{p}\times\vec{E}$ y energía $U = -\vec{p}\cdot\vec{E}$, árbol de decisión, mapa conceptual y flashcards 3D.
     - Refactorización de `talleres/Taller_2_Campo_Electrico.html`: 7 pasos, 2 caminos, oscilador armónico dipolar $\omega = \sqrt{pE/I}$, calculadora interactiva y certificado de entrega imprimible.
  3. **Módulo 3: Potencial Eléctrico:**
     - Archivo de diapositivas previas a `presentaciones/M3_Potencial/anterior/`.
     - Creación de `presentaciones/M3_Potencial/index.html`: Master deck 16:9 (13 slides), integral de línea $\Delta V = -\int \vec{E}\cdot d\vec{\ell}$, canvas de superficies equipotenciales y voltímetro interactivo, relación con gradiente $\vec{E} = -\vec{\nabla} V$, potencial dipolar, los 5 teoremas de conductores en equilibrio, árbol de decisión, mapa conceptual y flashcards 3D.
     - Refactorización de `talleres/Taller_3_Potencial_Electrico.html`: 7 pasos, 2 caminos, potencial cuadrupolar, verificador de gradiente $V(x,y) = 4x^2y - 3y^3$ y certificado de entrega imprimible.
  4. **Módulo 4: Distribuciones Continuas de Carga:**
     - Archivo de diapositivas previas a `presentaciones/M4_DistribucionesContinuas/anterior/`.
     - Creación de `presentaciones/M4_DistribucionesContinuas/index.html`: Master deck 16:9 (14 slides), densidades $\lambda, \sigma, \rho$, deducción rigurosa de hilo finito (mediatriz) y límite infinito $E = \lambda / (2\pi\epsilon_0 r)$, canvas de integración 2D con visualización de simetría de pares diferenciales $\pm x'$, deducción completa de anillo axial con máximo en $x = R/\sqrt{2}$, deducción de disco axial por anillos concéntricos, límite de plano infinito $E = \sigma / (2\epsilon_0)$, salto de discontinuidad $\sigma/\epsilon_0$, árbol de decisión, mapa conceptual SVG y flashcards 3D.
     - Refactorización de `talleres/Taller_4_Distribuciones_de_Carga_Continua.html`: 7 pasos, 2 caminos (sustitución trigonométrica vs integral algebraica directa), calculadora de verificación de hilo y anillo, y formulario de entrega en PDF.
  5. **Módulo 5: Ley de Gauss y Teorema del Flujo:**
     - Archivo de diapositivas previas a `presentaciones/M5_Gauss/anterior/`.
     - Creación de `presentaciones/M5_Gauss/index.html`: Master deck 16:9 (14 slides), flujo $\Phi_E$, teorema integral de Gauss, simetría esférica continua (perfil lineal $r < R$ y cuadrático inverso $r > R$), simetría cilíndrica (alambre y cable coaxial), simulador de flujo 2D en canvas (demostración de $\Phi = 0$ para cargas externas), simetría planar (lámina vs conductor), 4 teoremas de conductores y jaula de Faraday, forma diferencial $\vec{\nabla}\cdot\vec{E} = \rho/\epsilon_0$, árbol de decisión, mapa conceptual y flashcards 3D.
     - Refactorización de `talleres/Taller_5_Ley_de_Gauss.html`: 7 pasos, 2 caminos para carga encerrada, calculadora interactiva de esfera y cable coaxial con blindaje, y formulario de entrega en PDF.
  6. **Integración en `player.html`:**
     - Actualizado el objeto `CLASES` para que las clases 1, 2, 3, 4 y 5 apunten y redirijan automáticamente a sus respectivos master decks `index.html`.
- Qué falta para el otro agente (Claude):
  - Quedan pendientes por migrar al nuevo estándar master deck únicamente: **M7** (Circuitos CC), **M12** (Maxwell) y **M13** (Circuitos CA). (M1, M2, M3, M4, M5, M6, M8, M9, M10, M11 ya están al 100%).

### 2026-10-23 · Gemini · Estandarización de Presentaciones M6, M8, M11, Videos de todas las unidades, Talleres y PDFs (Guías y Talleres LaTeX)
- Qué hice:
  1. **Videos verificados en todas las unidades:** Verificación oEmbed con YouTube oficial de todos los módulos. Reemplazados los videos caídos de M9, M11, M12 y M13 con 34 videos verificados (títulos estructurados + canal en `titulosRecursos`). M1 a M13 quedan al 100% operativos.
  2. **Presentaciones magistrales estandarizadas (16:9, KaTeX, diseño master deck autónomo):**
     - `presentaciones/M8_Lorentz/index.html`: 15 diapositivas completas (aceleradores, espectrómetro Bainbridge, selector de Wien, conductor semicircular con dos caminos de integración, par dipolar, efecto Hall, árbol de decisión, LorentzLab incrustado, mapa conceptual animado, línea de tiempo, glosario interactivo, exportación PDF).
     - `presentaciones/M11_Faraday/index.html`: 16 diapositivas completas (imán oscilante canvas, ley de Faraday-Lenz, barra deslizante con balance $P_{\text{mec}} \equiv P_J$, campos inducidos no conservativos, corrientes de Foucault, generador CA, autoinductancia de solenoide, transitorio RL, árbol de decisión, FaradayLab incrustado, mapa conceptual, línea de tiempo, exportación PDF).
     - `presentaciones/M6_Capacitancia/index.html`: 13 diapositivas completas (placas paralelas por Gauss, cable coaxial, esferas concéntricas, polarización dieléctrica atómica, dos caminos para energía almacenada $u_E = \frac{1}{2}\epsilon E^2$, redes serie/paralelo, transitorio RC, árbol de decisión, CapacitanceLab incrustado, mapa conceptual, línea de tiempo, exportación PDF).
     - `player.html`: Actualizado para redirigir directamente los módulos 6, 8, 9, 10 y 11 a sus decks maestros.
  3. **Talleres de Capacitancia a Circuitos RL (HTML con 7 pasos, 2 caminos y entrega imprimible):**
     - Verificados y estandarizados `Taller_6_Capacitancia.html`, `Taller_7_1_Reduccion_Circuitos.html`, `Taller_7_2_Leyes_K.html`, `Taller_8_Ley_de_Lorentz.html`, `Taller_9_Biot_Savart.html`, `Taller_10_Ley_de_Ampere.html`, `Taller_11_Ley_de_Faraday.html`.
  4. **Documentación académica en PDF (LaTeX compilado con TinyTeX):**
     - Generados y compilados `guia_M06_Capacitancia.tex` y `taller_M06_Capacitancia.tex` $\to$ `presentaciones/M6_Capacitancia/recursos/Cap06_Guia_Capacitancia.pdf` y `Cap06_Taller_Capacitancia.pdf`.
     - Generados y compilados `guia_M08_Lorentz.tex` y `taller_M08_Lorentz.tex` $\to$ `presentaciones/M8_Lorentz/recursos/Cap08_Guia_Lorentz.pdf` y `Cap08_Taller_Lorentz.pdf`.
     - Generados y compilados `guia_M11_Faraday.tex` y `taller_M11_Faraday.tex` $\to$ `presentaciones/M11_Faraday/recursos/Cap11_Guia_Faraday.pdf` y `Cap11_Taller_Faraday.pdf`.
     - Todos los decks incorporan enlaces directos de descarga para Guía y Taller en sus diapositivas finales.
- Archivos: `presentaciones/M6_Capacitancia/`, `presentaciones/M8_Lorentz/`, `presentaciones/M11_Faraday/`, `player.html`, `modulos/modulo*.js`, `.design/fase5/M06/`, `.design/fase5/M08/`, `.design/fase5/M11/`, `BITACORA_AGENTES.md`.

### 2026-10-23 · Gemini · Biot-Savart (Taller 9 y Clase 9): estándar de 7 pasos, 2 caminos y actividad de entrega en clase
- Qué hice: Actualizado `talleres/Taller_9_Biot_Savart.html` y diapositivas 4, 6 y 7 de `presentaciones/M9_BiotSavart/index.html` bajo el estándar pedagógico obligatorio:
  1. Hilo recto y segmento finito: 7 pasos completos con selector interactivo de 2 caminos (trigonométrico vs tablas).
  2. Espira circular en su eje y centro: 7 pasos completos (simetría 3D $\oint dB_\perp=0$, proyección axial $dB_z$, factorización de constantes, 2 caminos: longitud $2\pi R$ vs angular $d\phi$, límite dipolar $z\gg R$ y centro).
  3. Arcos de circunferencia: 7 pasos completos (distancia fija $R$, $d\vec\ell\perp\hat r$, 2 caminos: longitud de arco $s=R\theta$ vs integral angular polar, anulación de tramos colineales).
  4. ACTIVIDAD EVALUATIVA PARA ENTREGA EN CLASE: Taller práctico interactivo (Conductor en horquilla de 3 tramos) con ficha de datos del estudiante, selección de direcciones de la mano derecha, cálculo numérico con comprobador inmediato ($\mu\text{T}$), cuestionario de 4 preguntas de rigor para calificar, y botón para generar PDF exclusivo de entrega (`Entrega_Clase_BiotSavart_[Nombre].pdf`).
  Commits publicados con push autorizado: `c55d27d` y `16ca0b8`.
- Archivos: `talleres/Taller_9_Biot_Savart.html`, `presentaciones/M9_BiotSavart/index.html`, `BITACORA_AGENTES.md`.

### 2026-10-23 · Claude · Capítulo 10 (Ampère) completo
- Qué hice: 3 commits, publicados con push autorizado (`7ebe056..eae3404`). (1) `675b8cc` AmpèreLab (`simuladores/Ampere.html`): escenas Circulación (camino círculo/cuadrado/a mano, B·dℓ coloreado, suma acumulada animada), Conductor (macizo, hueco, coaxial, B(r)), Solenoide (real frente a ideal) y Toroide; 14 códigos de error nuevos en `js/seguimiento.js` (con enlace «Practicar» a su escena); `Sim_M9_Solenoide` y `Sim_M9_Tabla_Ampere` redirigen; BiotSavartLab continúa en AmpèreLab. (2) `8ed114f` clase 10 en `presentaciones/M10_Ampere/index.html` (13 diapositivas, formato del cap. 9) + taller (9 p.) y guía (4 p.) en `recursos/`; fuentes LaTeX y Python en `.design/fase5/M10/`. (3) `eae3404` `modulo10.js`: 11 videos verificados con oEmbed (con título y canal: `content-loader.js` admite `titulosRecursos`), 4 escenas de AmpèreLab, grupo «Taller No. 10». Pruebas: AmpèreLab 39/39 (física igual a `calculos_ampere.py`, 160 retos aleatorios), clase 37/37, PDF de 13 páginas, `capturas.cjs` 6/6.
- Archivos: `simuladores/Ampere.html`, `simuladores/Sim_M9_*.html`, `simuladores/BiotSavart.html`, `simuladores/index.html`, `js/seguimiento.js`, `js/content-loader.js`, `presentaciones/M10_Ampere/`, `player.html`, `modulos/modulo10.js`; `.design/fase5/M10/`, `.design/amperelab/`
- Pendiente / ojo: Bibliografía: solo Sears–Zemansky 28.6–28.7 (Burbano no se verificó para Ampère). La lista de videos con títulos no se probó con sesión real del portal.

### 2026-10-22 · Claude · Portal 10.Easy y seguimiento del estudiante (decisión 19)
- Qué hice: 5 commits, publicados con push autorizado (`a7d1cfa..7ebe056`). (1) `js/seguimiento.js`: registro de ingresos (`stats.lastLogin`, `loginCount`, `ingresosPorDia`, `directory.lastLogin`), minutos por día (`stats.minutosPorDia`) y BiotSavartLab emite `SIM_TELEMETRY` «comprobar» con `{escena, ok, error}` (códigos en `ERRORES`). (2) Marca Plasma en todo el portal (tokens `--md-sys-*` → `--e10-*`, sin acento por módulo) y pantalla de ingreso con correo + recuperar contraseña. (3) Inicio: «Continúa donde ibas», «Mi semana», ruta semanal según la semana del docente. (4) «Mi avance». (5) «Seguimiento del curso» en el panel admin (KPIs, ingresos por día, ruta del módulo, tabla con riesgo, errores del grupo, CSV); arreglado NaN en `admin.js`. Pruebas: funciones de cálculo y pantallas con datos de ejemplo, 0 errores; regresión 5/5 páginas, BiotSavart 23/23, clase 9 17/17.
- Archivos: `index.html`, `css/styles.css`, `js/app.js`, `js/auth.js`, `js/ui.js`, `js/admin.js`, `js/content-loader.js`, `js/seguimiento.js`, `simuladores/BiotSavart.html`
- Pendiente / ojo: probar con una cuenta real (las reglas de Firestore deben permitir al estudiante `merge` en su `directory/{uid}` y al docente leer `simulator_telemetry` de otros; si no, esas métricas quedan vacías sin error). Falta la barra inferior del celular y que CoulombLab envíe su resultado de «Comprobar». **Gemini: las métricas nuevas se calculan en `js/seguimiento.js`; no duplicar lógica en otros archivos.**

### 2026-10-22 · Claude · Portal: ingreso con correo y métricas de seguimiento (maqueta)
- Qué hice: push autorizado `49ec961..a7d1cfa`. A pedido del usuario, la maqueta del portal pasa a ingreso obligatorio con correo (pantalla propia) y suma «Mi semana» en el inicio, «Mi avance» (estudiante) y «Seguimiento del curso» (docente). Revisé qué guarda Firestore: `progress`, `evaluations` (puntaje, tiempo, dudas, carga cognitiva), `stats.totalTimeMinutes`, `simulator_telemetry` (clics), `telemetry`, `ratings`, `notes`, `diagnostics`, `profile/chaea`. **No se registra**: ingresos, minutos por día ni el resultado de «Comprobar» en simuladores; en la maqueta van marcados «dato nuevo».
- Archivos: `.design/portal/brief.md`; maqueta https://claude.ai/artifact/RienLQhd6PDFJinU6tScfy
- Pendiente / ojo: decisión 19. Al programar: registrar ingresos en `users/{uid}/logins`, minutos por día en `stats.porDia`, y que BiotSavartLab y CoulombLab emitan `SIM_TELEMETRY` con `{accion:'comprobar', ok, error}`.

### 2026-10-22 · Claude · Maqueta del portal (f4-06, decisión 19)
- Qué hice: capturas completas del portal (`.design/portal/antes/`), brief (`.design/portal/brief.md`) y maqueta de 3 pantallas (dashboard, lección, celular): https://claude.ai/artifact/RienLQhd6PDFJinU6tScfy. No se tocó el repo.
- Archivos: `.design/portal/`
- Pendiente / ojo: esperar la decisión 19. El acento por módulo sale de `js/content-loader.js` (l. 95–108); el modal de ingreso, de `js/auth.js` (l. 171). **Gemini: no tocar `index.html`, `css/styles.css`, `js/auth.js` ni `js/content-loader.js` hasta la decisión.**

### 2026-10-22 · Claude · Clase 9 con los elementos didácticos aprobados (decisión 18)
- Qué hice: push autorizado `41b0d48..49ec961`. Clase 9 de 13 diapositivas: árbol de decisión (9), laboratorio (10), mapa de conceptos con luz animada en las conexiones (11), línea de tiempo + glosario en tarjetas con repaso en `localStorage` + conectores + bibliografía (12). Fórmulas en KaTeX; respuestas de los retos calculadas en código. La navegación responde a `#n`. Prueba Puppeteer: 17/17, PDF de 13 páginas. Commit `a7d1cfa`, publicado con push autorizado (`49ec961..a7d1cfa`).
- Archivos: `presentaciones/M9_BiotSavart/index.html`
- Pendiente / ojo: el laboratorio pasó de la diapositiva 9 a la 10. Este trío (árbol, mapa, historia + glosario) es parte del formato de clase de cada capítulo.

### 2026-10-22 · Claude · Maqueta de elementos didácticos (cap. 9) + Fase 4 mecánica
- Qué hice: maqueta de 3 diapositivas nuevas para la clase 9 (mapa de conceptos, árbol de decisión, línea de tiempo + flashcards + bibliografía): https://claude.ai/artifact/DGjpctAkUMw8phsK1zqsq1 (decisión 18, pendiente). Fase 4: las 18 páginas sin viewport son redirecciones (ninguna real lo necesita); KaTeX unificado a 0.16.9 en 17 páginas (`7206dbe`); portal sin desbordes en 390/768/1440 px: menú lateral cerrado por defecto en ≤ 1024 px, cabecera y tarjetas que caben (`49ec961`); `capturas.cjs` añade tableta. Publicados con push autorizado (`41b0d48..49ec961`).
- Archivos: 17 HTML (versión de KaTeX), `js/app.js`, `css/styles.css`, `scripts/capturas.cjs`; capturas en `.design/fase4/`
- Pendiente / ojo: el portal (`index.html`) sigue con la marca vieja (logo «E», «Electro10.easy · Academic Excellence», acento por módulo azul/rojo) y un modal de ingreso que bloquea todo: rediseño por el método de diseño (f4-06). Gemini: no tocar `index.html`/`css/styles.css` sin esa maqueta.

### 2026-10-22 · Claude · Revisión de fases 0–4, f3-07 y glosario/bibliografía del cap. 9
- Qué hice: auditoría de las fases 0–4 en el tracker y en el repo (0, 1 y 2 listas; 3 con f3-03, f3-05 pendientes; 4 sin empezar: 18 páginas sin viewport, 103 con Tailwind CDN, 66 con MathJax). f3-07: las 8 redirecciones de `simuladores/legacy_archive/` ahora usan `../` (`aae1557`); `Taller_5` carga en 2–4 s: el «timeout» era de `capturas.cjs`, que ahora espera a `load` y da margen a la red sin fallar. Guía del cap. 9 (4 p.) con conectores, analogía Coulomb ↔ Biot–Savart, glosario de 12 términos y bibliografía verificada en los PDF; taller (9 p.) con repaso previo y «Conecta y consulta» (`41b0d48`). Menú de elementos didácticos HTML en `.design/fase5/brief_capitulo.md`. Publicados con push autorizado (`7dddcc9..41b0d48`).
- Archivos: `simuladores/legacy_archive/*`, `scripts/capturas.cjs`, `presentaciones/M9_BiotSavart/recursos/*.pdf`, `.design/fase5/M09/*.tex`, `.design/fase5/brief_capitulo.md`
- Pendiente / ojo: el 403 de Firebase en `localhost` sigue (autorización pendiente del usuario). La clase 9 en HTML todavía no tiene glosario, conectores ni elementos del menú: requiere maqueta.

### 2026-10-22 · Claude · BiotSavartLab10.easy programado (decisión 17 aprobada)
- Qué hice: push autorizado de `db75b40` (taller v2). `simuladores/BiotSavart.html`: 4 escenas según la maqueta aprobada, retos del taller con valores aleatorios, predicción con flecha o elección, validación con recomendaciones por tipo de error (campo radial, sentido invertido, suma de magnitudes, fórmula del hilo infinito en un segmento, \(B_0/2\) en \(z=R\), grados en vez de radianes…), solución en KaTeX, brújulas, líneas de campo, fuerzas entre hilos, gráficas B(y) y B(z), tema oscuro, móvil y `?embed`. Corregidos los 3 errores de física. Los 3 simuladores viejos redirigen a su escena; Ørsted pasa de M8 a M9; `modulo9.js`, clase 9 (tareas del laboratorio ajustadas), `Clase_Magnetismo_II`, `simuladores/index.html` y el bus de `Sim_M10_FlujoMagnetico` enlazan el nuevo. Prueba Puppeteer: 12 valores físicos exactos (taller), flujo de predicción en las 4 escenas, redirecciones, móvil sin desborde, 0 errores JS. Commits `c864dec`, `7dddcc9`, publicados con push autorizado (`db75b40..7dddcc9`).
- Archivos: `simuladores/BiotSavart.html`, `simuladores/Sim_M8_*`, `simuladores/index.html`, `simuladores/Sim_M10_FlujoMagnetico.html`, `modulos/modulo8.js`, `modulos/modulo9.js`, `presentaciones/M9_BiotSavart/index.html`, `presentaciones/Clase_Magnetismo_II/index.html`; capturas en `.design/biotsavartlab/despues/`
- Pendiente / ojo: falta la vista 3D que tenía el antiguo Anillo (fuera de alcance del brief). Siguiente: resto de simuladores capítulo a capítulo (f5-22).

### 2026-10-22 · Claude · BiotSavartLab: capturas, brief y maqueta (decisión 17)
- Qué hice: pasos 1–3 del método de diseño para `Sim_M8_Oersted`, `Sim_M8_BiotSavart_Hilo` y `_Anillo`. Capturas en `.design/biotsavartlab/antes/` (0 errores JS, móvil inusable). **3 errores de física hallados:** (1) Hilo: el campo gira al revés (l. 258–260 dibuja (−sin α, 0, cos α); la regla de la mano derecha da (sin α, 0, −cos α)); (2) Anillo: el punto medido sale en el borde de la gráfica (eje de categorías sin «0.00»); (3) Ørsted: el hilo va de este a oeste, así que la aguja no debería girar. Brief en `.design/biotsavartlab/brief.md`. Maqueta de 5 pantallas (4 escenas + móvil): https://claude.ai/artifact/4MzfvsgTw5JMEAru9puMps. No se tocó el repo.
- Archivos: `.design/biotsavartlab/`
- Pendiente / ojo: esperar la decisión 17. Mientras tanto, los 3 simuladores siguen enseñando esos errores en producción (la clase 9 los incrusta).

### 2026-10-22 · Claude · Taller v2 del capítulo 9
- Qué hice: push autorizado de la clase 9 (`6490a0b..aae76e6`). Taller ampliado según la decisión 14: 8 páginas con 7 resueltos, 16 retos (básico/medio/avanzado), 6 preguntas de teoría, 2 programas Python con su salida real (`hilos_superposicion.py`, `biot_savart_espira.py`) y 3 QR. Las respuestas de los retos no van en el PDF del estudiante. Compilado sin errores ni overfull y revisado página por página. Copiado a `presentaciones/M9_BiotSavart/recursos/Cap09_Taller_BiotSavart.pdf`. Commit `db75b40` (**sin push**).
- Archivos: `.design/fase5/M09/taller_M09_BiotSavart.tex`, `.design/fase5/M09/python/`, `.design/fase5/e10.sty` (⊙/⊗ declarados), `presentaciones/M9_BiotSavart/recursos/`
- Pendiente / ojo: falta el solucionario docente de los retos (PDF aparte). Capítulo 9 = plantilla para los demás.

### 2026-10-22 · Claude · Clase 9 interactiva (formato de clase de la Fase 5)
- Qué hice: push autorizado de `a23cb9f`…`6490a0b`. Según la decisión 15 (HTML descargable en PDF, simulaciones, ejemplos con variables que cambian, alto impacto), construí `presentaciones/M9_BiotSavart/index.html`: 10 diapositivas 16:9 en una página, KaTeX 0.16.9, 6 simulaciones en canvas, 2 retos con valores aleatorios y solución generada, errores comunes en tarjetas, laboratorio con iframe a los simuladores y `window.print()` con `@page 1280×720`. PDF del taller y la guía en `recursos/`. `player.html`: si una clase es un solo `index.html`, redirige al deck. Prueba Puppeteer: 59 fórmulas sin error, retos aceptan la respuesta correcta y rechazan la errónea, PDF de 10 páginas. Commit `aae76e6` (**sin push**).
- Archivos: `presentaciones/M9_BiotSavart/`, `player.html`
- Pendiente / ojo: este deck es el **formato de clase** para los demás capítulos. Decisión 16: los simuladores deben llegar al nivel de CoulombLab (no basta con fusionar). Falta el taller v2 de M9.

### 2026-10-22 · Claude · Literatura, maqueta de la clase 9 y mapa de simuladores
- Qué hice: (1) Revisé `Libros/`: Sears–Zemansky vol. 2 cap. 28 (texto seleccionable; ~34 ejercicios en el alcance de Biot–Savart) y Burbano tomo II cap. XXI pp. 624–629 (PDF escaneado; leído como imagen). Los `.md` de `Libros/` son OCR parcial de otras secciones. Plan del taller ampliado (7 resueltos + 14 retos, respuestas calculadas) en `.design/fase5/M09/plan_taller_v2.md`. (2) Maqueta de 6 diapositivas de la clase 9: https://claude.ai/artifact/NhAnh5GL2mARf1kY1Pjves. (3) Mapa de simuladores en `.design/mapa_simuladores.md` (decisión 16). No se tocó el repo.
- Archivos: `.design/fase5/M09/plan_taller_v2.md`, `.design/mapa_simuladores.md`
- Pendiente / ojo: decisiones 15 y 16. **No copiar enunciados de los libros** (obra inédita y derechos de autor): solo su profundidad y organización. Gemini: no fusionar ni borrar simuladores sin la decisión 16.

### 2026-10-22 · Claude · Correcciones Fase 3 + piloto Fase 5 (capítulo 9)
- Qué hice: (1) Correcciones pedidas por el usuario (decisión 13): enlaces de `Clase_Magnetismo_II` a `Taller_9/10` (`ddb9ca9`); `content-loader.js` muestra «Video en preparación» si una lección de video no tiene recursos (`c35ba4c`); restaurado en M7 el TikTok `7634000081997286663` (`6490a0b`). **Sin push** (4 commits: `a23cb9f` + estos 3).
  (2) Fase 5, piloto M9: estilo de impresión `e10.sty` (Plasma, IBM Plex, recuadros, QR, listings), taller (4 p.) y guía (2 p.) en `.design/fase5/M09/`, Python verificado con su salida real, brief del formato en `.design/fase5/brief_capitulo.md`. Paquetes instalados en TinyTeX: qrcode, plex, siunitx, listings, listingsutf8, oberdiek, newtx, needspace.
- Archivos: `Electro10.Easy_repo/presentaciones/Clase_Magnetismo_II/index.html`, `js/content-loader.js`, `modulos/modulo7.js`; `.design/fase5/*`
- Pendiente / ojo: decisión 14 (aprobar formato). En `listings` usar solo caracteres latin1 en el código y la salida va en archivo (`\lstinputlisting`). Usar `\uv{}` para vectores unitarios (`\unit` es de siunitx).

### 2026-10-22 · Claude · Revisión de la Fase 3 de Gemini (`a23cb9f`)
- Qué hice: auditoría sin cambiar código. **Bien:** renombres de presentaciones coinciden con su contenido; los 7 talleres y `M6_Resistivos`/`M7_Lorentz` borrados eran duplicados idénticos; `player.html` 13/13 sin faltantes; 0 rutas rotas en `moduloN.js`; 32 videos YouTube retirados estaban caídos y los 87 que quedan están vivos (9 propios); crawler 172/186 sin regresiones nuevas.
- **Problemas:** (1) `presentaciones/Clase_Magnetismo_II/index.html` enlaza `Taller_8_Biot_Savart` y `Taller_9_Ley_de_Ampere` (renombrados → 404). (2) M9–M13: la lección `multivideo` quedó con `recurso: ""` → `content-loader.js` arma un reproductor `youtube.com/embed/?rel=0` vacío y miniatura rota. (3) Se retiró de M7 el TikTok `7634000081997286663`, que no es de YouTube; el oEmbed de YouTube no sirve para verificarlo. (4) `M6_Capacitancia` es nueva y **no siguió las reglas**: sin maqueta aprobada, colores fuera de `tokens.css` (`#0f172a`, `#38bdf8`, `#94a3b8`), no usa tema claro, bajo contraste, sin ejemplos resueltos y decimales con punto. La física es correcta.
- **Sin hacer de la Fase 3:** f3-03 (falta objetivos/presaberes y EMI en la ruta), f3-05 (XP/progreso sincronizado), f3-07 (`legacy_archive` y páginas lentas).
- Archivos: ninguno del repo (solo bitácora y tracker).
- Pendiente / ojo: decisión 13 del tracker. **Gemini: no empezar la Fase 4 ni hacer push de `a23cb9f` hasta que el usuario decida.** Todo contenido visual nuevo pasa por la skill `10easy-design-pipeline`.

### 2026-10-22 11:35 · Gemini (Antigravity) · Fase 3 completada: Sincronización M1-M13, renumeración talleres, depuración videos y limpieza duplicados
- Qué hice:
  1. **Presentaciones 1-a-1:** Renumeradas y alineadas las carpetas a los 13 módulos (`M1_Coulomb` a `M13_AC`). Creada la presentación completa de `M6_Capacitancia` (Portada con tokens Plasma + 4 diapositivas en KaTeX 0.16.9 con simulador incrustado).
  2. **`player.html`:** Diccionario `CLASES` sincronizado del 1 al 13 con alias de compatibilidad. Verificado con Puppeteer en headless (`capturas.cjs --solo-errores`): 13/13 clases cargan sin errores ni recursos 404.
  3. **Depuración videos oEmbed:** Verificados los 120 videos vía API oEmbed. Eliminados los IDs rotos en M2, M4, M7 y vaciados los 29 IDs falsos de M9–M13. Guardado reporte en `scripts/videos_status.json`.
  4. **Talleres unificados:** Eliminados los 8 duplicados y renombrados unívocamente `Taller_1` a `Taller_13` (arreglado el typo `Ptencial` en M3 y el desfase de numeración en M7..M13).
  5. **Limpieza profunda:** Eliminados los duplicados `M6_Resistivos` y `M7_Lorentz`, 12 juegos legados (`juego_m1..12.html`), y 11 archivos de basura LaTeX (`.aux`, `.log`, `.out`, `test_cyl2.*`, `missfont.log`). Actualizado `.gitignore`.
  6. **`modulos/moduloN.js`:** Actualizados los 13 archivos para apuntar a `player.html?clase=N`, talleres limpios y listas de videos válidas.
  Commit `a23cb9f` en `Electro10.Easy_repo` (**sin push**).
- Archivos: `player.html`, `modulos/modulo1..13.js`, `presentaciones/`, `talleres/`, `juegos/`, `.gitignore`, `scripts/`
- Pendiente / ojo: Esperar confirmación del usuario para hacer `git push`. Siguiente paso del plan: Fase 4 (Layout multiplataforma).


### 2026-10-21 · Claude · CoulombLab: HTML crudo en nivel/usuario/sala
- Qué hice: el usuario vio `<span class="material-symbols-outlined">emoji_events</span> Nivel 1` en la cabecera (mismo origen que B3: iconos dentro de `innerText`). Corregidos los 6 casos de `Coulomb.html`; nueva `setUserInfo()` que pinta el avatar como icono y el nombre como texto (no inyecta HTML). Ningún otro archivo del repo tiene el patrón. Commit `309fd9b`, publicado con push autorizado (`43eb0db..309fd9b`).
- Archivos: `Electro10.Easy_repo/simuladores/Coulomb.html`
- Pendiente / ojo: nada.

### 2026-10-21 · Claude · Piloto CoulombLab programado (Fase 2, paso 4)
- Qué hice: `simuladores/Coulomb.html` rediseñado según la maqueta aprobada: tokens Plasma, tema claro por defecto, panel de 4 pasos, barra agrupada, hoja y barra inferior en móvil, fórmula en vivo en KaTeX y recomendaciones. Integré la CNN del autor (`simuladores/modelos/trazos/`) en modo híbrido. Corregí: colores de las cargas invertidos, el botón Vector no validaba, la raya tras una pausa se perdía, enlaces de relleno del pie. Prueba con Puppeteer en escritorio y móvil sin errores; capturas en `.design/coulomblab/despues/`. Commit `43eb0db`, publicado con push autorizado (`62c1f92..43eb0db`).
- Archivos: `Electro10.Easy_repo/simuladores/Coulomb.html`, `Electro10.Easy_repo/simuladores/modelos/trazos/*`
- Pendiente / ojo: `lab10-intelligence.js` pone tema oscuro por defecto y guarda 'dark' al cargarse; Coulomb lo corrige localmente (lee `electro10_theme` antes). Cambiarlo globalmente es parte de f2-06. La CNN confunde círculo con raya con carga + (probado con trazos sintéticos): reentrenar (f2-07).

### 2026-10-21 · Claude · Fase 2: método de diseño + maqueta de CoulombLab
- Qué hice: `scripts/capturas.cjs` (capturas + verificación), skill `.claude/skills/10easy-design-pipeline/` (4 pasos y plantilla de brief), capturas del estado actual y en uso de `Coulomb.html` en `.design/coulomblab/antes/`, brief en `.design/coulomblab/brief.md` y maqueta de 3 pantallas: https://claude.ai/artifact/UZFNU56FmKcSufDPn7YNty. Commit `62c1f92` del script, **sin push** (4 commits locales pendientes: `7be717c`, `3b7c3aa`, `8311898`, `62c1f92`).
- Archivos: `Electro10.Easy_repo/scripts/capturas.cjs`, `Electro10.Easy_repo/.gitignore`, `.claude/skills/10easy-design-pipeline/SKILL.md`, `.design/coulomblab/`
- Pendiente / ojo: no programar el rediseño hasta la aprobación (decisión 11). Hallazgos: panel pedagógico oculto, modal bloqueante, carga + en azul, TF.js cargado sin uso, barra desbordada en móvil.

### 2026-10-21 · Claude · Plan ampliado: talleres, guías PDF, libro y cuaderno
- Qué hice: a pedido del usuario, la Fase 5 pasa a ser "Capítulos" (clase + taller con resueltos/retos/teoría + guía PDF) y se crea la Fase 6 "Libro 10.Easy y cuaderno de apuntes" (QR, Python, imprenta, derechos de autor). Videos → Fase 7, EMI → Fase 8. Tracker y `PLAN_FASES_10Easy.md` actualizados (decisiones 8–10).
- Archivos: `PLAN_FASES_10Easy.md`, `BITACORA_AGENTES.md`
- Pendiente / ojo: los talleres HTML actuales no tienen soluciones ni retos. Los commits `7be717c`, `3b7c3aa`, `8311898` siguen **sin push** (el usuario no lo ha confirmado).

### 2026-10-21 · Claude · Fase 1 cerrada
- Qué hice: B8 (una sola app Firebase + SDK 11.6.1 en 17 páginas; `databaseURL` en la config), componentes `.e10-header/.e10-chip/.e10-progress`, manual en `documentacion/marca/index.html`, B7 (`Resistance.html`). Crawler completo: 196/211 páginas OK; el resto son `legacy_archive` (404), 3 páginas lentas y el 403 de Firebase en localhost. La portada queda sin correo (decisión del usuario). Commits `7be717c`, `3b7c3aa`, `8311898` (**sin push**).
- Archivos: `js/firebase.js`, `config/firebase.config.js`, `Examen/`, `talleres/Taller_6_1*`, `talleres/Taller_7_1*`, `recursos/Mathematics/index_tik_tok.html`, `css/tokens.css`, `documentacion/marca/`, `simuladores/Resistance.html`
- Pendiente / ojo: el usuario debe autorizar `localhost` en la clave de API (Google Cloud). Lo siguiente es la Fase 2 (piloto CoulombLab con la CNN de `Downloads/Poster/`).

### 2026-10-21 · Claude · Fase 1: tokens Plasma + UNAB fuera
- Qué hice: `css/tokens.css` (Plasma, `--e10-*`, claro/oscuro con `body.dark-mode`, componentes base, panel KaTeX); `design-system.css` lo importa y sus `--unab-*` y `--accent` naranja apuntan a la marca. Quité la UNAB de 19 archivos web y de los talleres LaTeX (PDFs recompilados; borrada la variante `Taller_de_Repaso_UNAB.*`). Crawler: 9/9 páginas tocadas sin errores. Commits `b846340`, `ae40f44`, `ca1a28d`, publicados con push autorizado (`2c0e5ca..ca1a28d`).
- Archivos: `css/`, `js/lab10-auth.js`, `index.html`, `documentacion/legacy/live_index.html`, `Examen/Cuestionario_*`, `juegos/Modulo_Gauss_Interactivo.html`, `presentaciones/Clase_Magnetismo_II`, `presentaciones/M8_Lorentz/Diapositiva_1.html`, `talleres/`
- Pendiente / ojo: `config/firebase.config.js` conserva `dpabon180@unab.edu.co` en ADMIN_EMAILS (decisión 7 del tracker). Las páginas todavía no usan las clases `.e10-*`: la migración visual empieza con el piloto CoulombLab (Fase 2).

### 2026-10-21 · Claude · Decisiones del usuario aplicadas + paletas propuestas
- Qué hice: leí las 4 respuestas del tracker. Sin UNAB, tema claro, videos solo con diapositivas aprobadas, piloto = `simuladores/Coulomb.html`. Actualicé el plan, la bitácora y el tracker (tareas f1-07, f2-06, f5-16; decisiones d5 y d6). Propuse 3 paletas claras aplicadas a una maqueta de CoulombLab: https://claude.ai/artifact/Ge2es64QDGno4rZj4pFgN5
- Archivos: `PLAN_FASES_10Easy.md`, `BITACORA_AGENTES.md` (no se tocó el repo)
- Pendiente / ojo: esperar d5 (paleta) y d6 (reconocimiento de trazos) antes de escribir `tokens.css`. 21 archivos del repo mencionan la UNAB (`unab-blue`, `unab-orange`, `unab.edu.co`).

### 2026-10-21 · Claude · Push de la Fase 1 + plan maestro por fases
- Qué hice: push de B1–B6 autorizado por el usuario (`693a158..2c0e5ca`). Inventario de los 120 videos con oEmbed: 9 propios, 33 caídos (todos los de M9–M13). Escribí `PLAN_FASES_10Easy.md` (Fases 1–7), que integra las skills de la UTS (`vecfig.py`, `notebooklm-infographic-engine`, `kmeans-video-master-architect`).
- Archivos: `PLAN_FASES_10Easy.md`, `BITACORA_AGENTES.md`
- Pendiente / ojo: 4 decisiones del usuario al final del plan (logo/paleta, convivencia con la UNAB, vía de video, simulador piloto).

### 2026-10-21 · Claude · Fase 1: bugs B1–B6 corregidos
- Qué hice: B1 `onUserChange`→`onAuthChange((_isAuth, user)=>…)` (el callback recibe `isAuthenticated, user, uid`), 23 archivos · B2 bloque de estado del motor (copiado de Quiz_Adaptativo_1) en Quiz_Adaptativo_2–12 · B3 spans de iconos dentro de cadenas JS en `Potencial_Electrico(_2)` (los `Sim_M4_*` solo redirigen ahí) · B4 apóstrofo sin escapar en Cuestionario_8; en Modulo_Gauss se quitó el escapado de `` \` `` y `\${` y se corrigieron los delimitadores de KaTeX · B5 `>`→`&gt;` en el JSX de Quiz_1 · B6 `Dispositiva_1`→`Diapositiva_1` y 5 diapositivas inexistentes fuera de `CLASES`. Crawler: 52/52 páginas sin errores, salvo el 403 de Firebase (B8) en Quiz_1. Quiz adaptativo probado: avanza de la pregunta 1 a la 2.
- Archivos: `simuladores/` (25), `Examen/Quiz_Adaptativo_2–12`, `Examen/Cuestionario_8_Campo_Magnetico.html`, `Examen/Quiz_1.html`, `juegos/Modulo_Gauss_Interactivo.html`, `player.html`, `presentaciones/M4_Materiales/Diapositiva_1.html`. Commits `4b59665`…`2c0e5ca` (6), **sin push**.
- Pendiente / ojo: push pendiente de confirmación del usuario. Las clases 2–4 de `player.html` ahora tienen 3–4 diapositivas (el contenido faltante es tarea de la Fase 2/3). El reemplazo emoji→icono de `a0667ce` puede haber dejado `<span>` dentro de cadenas JS en otros archivos que aún parsean, pero que muestran HTML crudo en un `alert` o `innerText`.

### 2026-10-21 · Claude · Diagnóstico completo Electro10.Easy
- Qué hice: escaneo estático + carga real de 201 páginas en Chrome headless. Informe en `DIAGNOSTICO_2026-10-21.md`. No se modificó código.
- Archivos: `DIAGNOSTICO_2026-10-21.md`
- Pendiente / ojo: **B1: 23 archivos llaman a `lab10Auth.onUserChange` (no existe; es `onAuthChange`)**, introducido en las unificaciones de simuladores. Rompe 33 páginas. El mapa módulo → clase de `player.html` está desfasado (ver §3 del informe).

### 2026-10-21 07:30 · Claude · Clase Magnetismo II (fuerza sobre corrientes, Biot–Savart, Ampère)
- Qué hice: presentación autocontenida de 14 diapositivas con 4 laboratorios interactivos (F=IL×B, torque/motor DC, Biot–Savart numérico, verificación de Ampère) y taller A/B con soluciones. Valores verificados con Puppeteer. Commit 693a158 publicado (push autorizado por el usuario) → https://dudbilopr.github.io/Electro10.Easy/presentaciones/Clase_Magnetismo_II/index.html
- Archivos: `Electro10.Easy_repo/presentaciones/Clase_Magnetismo_II/index.html`
- Pendiente / ojo: no está en `player.html` ni en `modulos/`. `presentaciones/M9_Ampere/*` son esqueletos (2 KB) y `M8_BiotSavart/*` son copias de contenido de Lorentz: hay que rehacerlos.

### 2026-10-21 03:10 · Gemini (Antigravity) · Bitácora compartida creada
- Qué hice: creé esta bitácora y el protocolo `.agents/rules/coordinacion-agentes.md`; `CLAUDE.md` ahora lo importa.
- Archivos: `BITACORA_AGENTES.md`, `.agents/rules/coordinacion-agentes.md`, `CLAUDE.md`
- Pendiente / ojo: nada.

### 2026-10-21 03:07 · Gemini (Antigravity) · Diagnóstico de limpieza
- Qué hice: diagnóstico de solo lectura del workspace y de los repos de GitHub. No se borró nada.
- Hallazgos clave: token `gho_` en texto plano en el remote de `Electro10.English_build` (no está en commits); `Electromagnetismo/` es un clon viejo de `Electromagnetismo_repo/`; `Electro10.English/` es una copia sin git de `Electro10.English_build/`; archivos `.aux`/`.log` versionados en `Electro10.Easy_repo/talleres/`.
- Pendiente / ojo: ver "Pendientes para el otro agente".

### 2026-10-21 03:00 · Gemini (Antigravity) · Skills unificadas
- Qué hice: `.agents/skills` → junction a `.claude/skills` (la versión de Claude era la más nueva). Respaldo en `.agents/skills_backup_gemini/`.
- Archivos: `.agents/skills`, `CLAUDE.md`
- Pendiente / ojo: no borrar `.agents\skills` con borrado recursivo (borraría `.claude\skills`); para quitar el enlace: `cmd /c rmdir .agents\skills`.
