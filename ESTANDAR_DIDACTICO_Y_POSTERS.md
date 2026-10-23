# Protocolo de Excelencia Didáctica «Estilo Biot-Savart», Pósters de Congreso y Diseño Vectorial

> **Guía Maestra de Coordinación y Transferencia Técnica para Claude y Gemini**  
> **Proyecto:** Electro10.Easy (`10.Easy`) — Física Universitaria / Electromagnetismo  
> **Autor y Director:** Dudbil Olvasada Pabón Riaño  
> **Fecha:** 2026-10-23  

---

## 1. El «Estándar de Oro» de M9 Biot-Savart: Análisis Anatómico

El autor ha determinado que la presentación magistral **`presentaciones/M9_BiotSavart/index.html`** representa el **Estándar de Oro Didáctico** de la plataforma. Cualquier otra presentación (M1 a M8, M10 a M13), taller o guía que carezca de estos elementos se percibe como genérica o simplificada.

Para que Claude (y futuros agentes o desarrolladores) puedan auditar y elevar cada diapositiva al máximo nivel, se desglosan a continuación las **5 Capas Didácticas Obligatorias** que hacen único a M9:

```
┌────────────────────────────────────────────────────────────────────────┐
│              LAS 5 CAPAS DEL ESTÁNDAR BIOT-SAVART (M9)                 │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Voto Predictivo de Hipótesis («Predice antes de mover la simulación»)│
│ 2. Elementos Diferenciales Manipulables (Arrastre, dℓ, r̂ y ±y simetría)│
│ 3. Pestañas de Doble Camino Analítico dentro de la misma Diapositiva   │
│ 4. Tarjetas de Justificación Geométrica Profunda («¿Por qué...?»)      │
│ 5. Píldoras Numeradas de Paso a Paso (<span class="n">1..7</span>)     │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Capa 1: Voto Predictivo de Hipótesis («Predice antes de observar»)
- **Implementación en M9 (Slide 2 - Ørsted):**
  - Antes de permitir que el estudiante active los controles, se le presenta un dilema con opciones mutuamente excluyentes (A, B, C) dentro de un contenedor `.vote`.
  - Al votar, se desbloquea una tarjeta `.tipbox` con la contextualización histórica (Ørsted, 1820) y la fundamentación física ($\tan\varphi = B_c/B_T$).
  - **Directriz para otros módulos:**
    - *M1:* Predecir qué ocurre con la fuerza si se triplica la distancia y se duplican ambas cargas.
    - *M2:* Predecir hacia dónde rota un dipolo eléctrico inmerso en un campo uniforme.
    - *M3:* Predecir si el trabajo electrostático para mover una carga entre dos puntos depende de la trayectoria seguida.
    - *M5:* Predecir el flujo a través de una superficie cerrada cuando una carga está afuera vs adentro.
    - *M11:* Predecir el sentido de la corriente inducida al acercar el polo norte de un imán a una espira (Lenz).

---

### Capa 2: Interactividad Dual con Componentes Manipulables
- **Implementación en M9 (Slide 4 - Hilo):**
  - Un canvas interactivo donde el estudiante puede **arrastrar verticalmente el elemento infinitesimal $d\vec{\ell}$**.
  - Botón selector para visualizar el **par simétrico ($\pm y$)** demostrando la cancelación o suma de componentes.
  - Botón de acción **«▶ Integrar»**, que realiza un barrido continuo acumulando la integral a lo largo del conductor.
  - Panel dinámico `#math-panel` que recalcula en tiempo real el ángulo $\theta$, el vector $\hat{r}$ y la magnitud diferencial $|d\vec{B}|$.
- **Directriz para otros módulos:**
  - En M4 (Distribuciones Continuas): permitir arrastrar el elemento $dq$ sobre el anillo para ver cómo se cancelan las componentes radiales y solo sobrevive el eje axial.
  - En M12 (Maxwell): permitir cambiar la frecuencia de la onda plana para observar cómo se acortan las longitudes de onda de $\vec{E}$ y $\vec{B}$ simultáneamente manteniendo $c = \lambda f$.

---

### Capa 3: Selector de Doble Camino Analítico Integrado en la Diapositiva
- **Implementación en M9 (Slides 4 y 5):**
  - La diapositiva no impone un solo método de cálculo. Contiene un conmutador interactivo:
    - **Camino A: Sustitución Trigonométrica Analítica** (cambio $y = a\tan\theta$, $dy = a\sec^2\theta\,d\theta$).
    - **Camino B: Integración por Tablas Directas de Cálculo** ($\int \frac{dy}{(y^2+a^2)^{3/2}} = \left[\frac{y}{a^2\sqrt{y^2+a^2}}\right]$).
  - Ambos botones (`#btn-camino-a`, `#btn-camino-b`) alternan la visualización sin recargar la página, demostrando la consistencia matemática.
- **Directriz para otros módulos:**
  - Todo problema de deducción en M1–M13 debe tener sus botones de conmutación de Camino A vs Camino B directamente en el HTML de la presentación.

---

### Capa 4: Tarjetas de Justificación Geométrica Profunda («¿Por qué...?»)
- **Implementación en M9 (Slide 4):**
  - "¿Por qué el ángulo del producto cruz es $\varphi = 90^\circ + \theta$?"
  - Se explica paso a paso la relación de perpendicularidad con la horizontal y la identidad trigonométrica $\sin(90^\circ + \theta) = \cos\theta$.
  - "¿Por qué en el eje del hilo ($a=0$) el campo es estrictamente cero?" (Porque $d\vec{\ell} \parallel \hat{r} \implies d\vec{\ell}\times\hat{r} = \vec{0}$).
- **Directriz para otros módulos:**
  - Incluir en cada capítulo preguntas de rigor que desarticulen dudas sutiles de examen:
    - M2: "¿Por qué el campo de un dipolo decae como $1/r^3$ y no como $1/r^2$?"
    - M5: "¿Por qué el campo en la superficie de un conductor es $\sigma/\epsilon_0$ mientras que en una lámina no conductora es $\sigma/(2\epsilon_0)$?"
    - M13: "¿Por qué la suma aritmética de voltajes $V_R + V_L + V_C$ puede superar con creces el voltaje de la fuente?"

---

### Capa 5: Píldoras Numeradas de Paso a Paso
- Uso sistemático de:
  ```html
  <div class="steps">
    <div><span class="n">1</span><span><b>Elemento infinitesimal:</b> ...</span></div>
    <div><span class="n">2</span><span><b>Esquema geométrico y vectores:</b> ...</span></div>
    <div><span class="n">3</span><span><b>Cambio de variable:</b> ...</span></div>
    <div><span class="n">4</span><span><b>Factorización de constantes:</b> ...</span></div>
    <div><span class="n">5</span><span><b>Resolución analítica (2 caminos):</b> ...</span></div>
    <div><span class="n">6</span><span><b>Límites físicos asintóticos:</b> ...</span></div>
    <div><span class="n">7</span><span><b>Validación y preguntas de rigor:</b> ...</span></div>
  </div>
  ```

---

## 2. Sistema de Pósters Científicos de Congreso (M1 a M13)

Cada capítulo cuenta ahora con su **Póster Científico de Congreso Internacional**, alojado en **`posters/index.html`** (y accesible directamente con el parámetro `?cap=N`):

### 2.1. Estructura Académica Tricolumna (Formato A1 / 1400×960 Responsive)
1. **Cabecera Institucional:**
   - Nombre del congreso ficticio universitario: *Congreso Internacional de Educación e Innovación en Física Universitaria · 10.Easy*.
   - Título científico del trabajo.
   - Autor: **Dudbil Olvasada Pabón Riaño**.
   - Afiliación: *Physics.10easy · Laboratorio de Innovación Tecno-Pedagógica*.
   - Código QR vectorial de trazabilidad y píldora del capítulo.
2. **Columna 1: Fundamento Teórico & Pregunta Problematizadora:**
   - Resumen y Abstract en español/inglés.
   - Formulación matemática con ecuaciones diferenciales e integrales en KaTeX.
   - Esquema geométrico vectorial SVG puro.
3. **Columna 2: Metodología Didáctica & Modelo 3D Tangible:**
   - Desglose del protocolo de 7 pasos.
   - Cuadro comparativo de la dualidad de caminos analíticos.
   - Ficha técnica de la pieza física imprimible en 3D (dimensiones, material PLA/PETG, infill, tolerancias).
4. **Columna 3: Validación, Resultados & Conectividad:**
   - Análisis cuantitativo con evaluación de límites asintóticos.
   - Desactivación de errores conceptuales comunes ("Paradoja del novato").
   - Conclusiones de transferencia didáctica al aula.
5. **Pie de Página (Ruta de Aprendizaje Interconectada):**
   - Conectores explícitos: `[Viene de Módulo N-1] → [Este Capítulo] → [Lleva a Módulo N+1]`.

---

## 3. Protocolo de Captura y Rediseño Vectorial (Sin Pérdida de Calidad)

Para atender el mandato del usuario:
> *"diseños que se le pregunte a la IA con captura para mejora y rediseñar en formatos vectorizados para mantener la calidad"*

Claude y los agentes colaboradores deben seguir estrictamente este flujo de trabajo:

```
  ┌────────────────────────────────────────────────────────┐
  │         FLUJO DE MEJORA VISUAL VECTORIZADA             │
  ├────────────────────────────────────────────────────────┤
  │ 1. Capturar pantalla de la sección con navegador       │
  │ 2. Analizar jerarquía visual, contraste y legibilidad │
  │ 3. NUNCA reemplazar por imágenes PNG/JPG rasterizadas  │
  │ 4. Codificar la ilustración en SVG nativo / Canvas     │
  │ 5. Usar variables de color de tokens.css (--e10-*)     │
  │ 6. Validar nitidez infinita en resoluciones 4K         │
  └────────────────────────────────────────────────────────┘
```

### Reglas Técnicas de Vectorización:
1. **Cero Placeholders y Cero PNGs borrosos:** Todo diagrama físico (cargas, vectores de campo $\vec{E}$, líneas de inducción $\vec{B}$, espiras, condensadores) debe programarse directamente en etiquetas `<svg>` con viewBox o en elementos `<canvas>` acelerados por hardware.
2. **Paleta Unificada Plasma:**
   - Primario (Acción/Fuerza/Positivo): `#B3246B` (`--e10-primary`).
   - Acento (Campo/Flujo/Negativo): `#0B8CA8` (`--e10-accent`).
   - Acento Oscuro (Texto sobre fondos claros): `#08758C` (`--e10-accent-strong`).
   - Superficie y líneas: `#ffffff`, `#f8fafc`, `#e2e8f0`.
3. **Escalabilidad Vectorial:** Todos los diagramas deben responder a `width="100%"` y ajustar su `viewBox` para que se vean nítidos tanto en un proyector de aula como en un teléfono móvil.

---

## 4. Matriz Central de Trazabilidad (`revisar.html`)

Se ha creado en la raíz del repositorio el archivo **`revisar.html`**, que actúa como **Panel Maestro de Control e Interconexión**:
- Proporciona un buscador en tiempo real de conceptos, fórmulas y módulos.
- Presenta las 13 fichas de los capítulos con botones de lanzamiento directo a:
  - **Clase 16:9** (`presentaciones/M{XX}/index.html`)
  - **Taller 7 Pasos** (`talleres/Taller_{N}_*.html`)
  - **Póster de Congreso** (`posters/index.html?cap={N}`)
  - **Simulador Oficial**
- Despliega la especificación del prototipo 3D y la ruta de aprendizaje intermodular.

---

## 5. Tareas Pendientes para Claude (Hoja de Ruta Inmediata)

Claude debe tomar este documento como especificación técnica obligatoria para las siguientes fases:

1. **Auditoría Diapositiva por Diapositiva (M1 a M5, M6, M7, M8, M10, M11, M12, M13):**
   - Cotejar cada presentación contra `presentaciones/M9_BiotSavart/index.html`.
   - Incorporar los bloques `.vote` interactivos con retroalimentación histórica en las diapositivas conceptuales.
   - Agregar conmutadores de "Camino A vs Camino B" en las diapositivas de deducción analítica.
   - Verificar que ningún paso matemático esté omitido ni simplificado a fórmulas escolares.
2. **Modelado CAD 3D de las 13 Piezas Didácticas:**
   - Crear en `.design/modelos_3d/` los scripts generadores paramétricos OpenSCAD (`.scad`) basados en el inventario de la Sección 2 de `GUIA_DIDACTICA_Y_MODELOS_3D.md`.
3. **Revisión de Enlaces en Guías de Estudio:**
   - Asegurar que todas las guías de estudio y talleres enlacen al nuevo portal de pósters (`posters/index.html?cap=N`) y al hub de revisión (`revisar.html`).
