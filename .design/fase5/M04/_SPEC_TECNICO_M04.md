# Especificación Técnica Compartida · M04 Distribuciones Continuas de Carga

> Fuente única de verdad para TODOS los entregables de M04. Léela antes de escribir y no inventes valores: usa los de aquí.

## Identidad
- Autor: Prof. Dudbil Olvasada Pabón Riaño. Marca: **10.Easy** (sin mencionar UNAB en ningún archivo).
- KaTeX **0.16.9**. Display mode `$$…$$`, inline `\(…\)`. Sin Unicode plano para fórmulas.
- Paleta Plasma: `--e10-primary: #B3246B`, `--e10-accent: #0B8CA8`. En simulador, acento de dominio "cargas/campo": `#4ecca3`.
- Sin emojis en la UI (los emojis solo en notas Obsidian, no en HTML/PDF).
- UTF-8 en todo archivo. En Python: reconfigure stdout/stderr a UTF-8.

## Constantes (Young y Freedman, 2009)
- `k = 1/(4πε₀) = 8.988e9 N·m²/C²`
- `ε₀ = 8.854e-12 C²/(N·m²)`

## Fórmulas canónicas y ejemplos numéricos (usar EXACTAMENTE estos)

### 1) Varilla finita (longitud L, carga Q, λ = Q/L) → campo en la mediatriz a distancia a
```
E = k·Q / (a·√(a² + (L/2)²))      (dirección perpendicular, alejándose)
```
- Límite `a ≫ L`: E → kQ/a² (carga puntual). Límite `L → ∞`: E → λ/(2πε₀ a) = 2kλ/a.
- Ejemplo: Q = +12 nC, L = 0,60 m, a = 0,40 m → √(0,40²+0,30²)=0,50 m → **E = 539 N/C** (puntual daría 674 N/C).

### 2) Anillo (radio R, carga Q, λ = Q/(2πR)) → campo en el eje a distancia z
```
E_z = k·Q·z / (z² + R²)^(3/2)      (máximo en z = R/√2; E(0)=0)
```
- Límite `z ≫ R`: E → kQ/z². 
- Ejemplo: Q = +8,0 nC, R = 0,050 m, z = 0,12 m → **E_z = 3,93×10³ N/C**.

### 3) Disco (radio R, densidad σ, Q = σπR²) → campo en el eje a distancia z
```
E_z = (σ/2ε₀) · [1 − z/√(z² + R²)]
```
- Límite `z ≫ R`: E → σπR²/(4πε₀ z²) = kQ/z² (puntual). Límite `R → ∞`: E → σ/(2ε₀) (plano).
- Ejemplo: σ = 6,0×10⁻⁶ C/m², R = 0,25 m, z = 0,30 m → **E_z = 7,85×10⁴ N/C** (plano infinito daría 3,39×10⁵ N/C).

### 4) Plano infinito → E = σ/(2ε₀), independiente de z
- Ejemplo: σ = 6,0×10⁻⁶ C/m² → **E = 3,39×10⁵ N/C**.

### Camino B (derivación por potencial E = −dV/dz)
- Anillo: V(z) = kQ/√(z²+R²). Disco: V(z) = (σ/2ε₀)(√(z²+R²) − z). Derivar respecto a z da las E_z de arriba.
- El disco se construye apilando anillos de radio r (2 → 3); el plano es el límite R→∞ del disco.

## Deducción en 7 pasos (`.stp` del Master Deck y columna vertebral del Taller)
1. **Elemento diferencial** dq y densidad (λ dl / σ dA / ρ dV).
2. **Vector de posición r** y simetría (dónde se cancela).
3. **Expresión diferencial** dE (o dV).
4. **Proyección trigonométrica** y cancelación de componentes por simetría.
5. **Dos caminos**: A = sustitución trigonométrica; B = tablas/integración directa o E = −dV/dz.
6. **Solución analítica** y evaluación de límites asintóticos (z≫R puntual; R≫z plano σ/2ε₀).
7. **Retos conceptuales cuantitativos** con retroalimentación empática.

## Códigos de error para telemetría (seguimiento.js · ContinuousDistLab)
Añadir a `ERRORES` y mapear en `PRACTICA` hacia `ContinuousDistLab.html#<escena>`:
- `dq_densidad`: 'Eligió mal el diferencial dq (λ dl vs σ dA)'
- `limites_integral`: 'Límites de integración equivocados'
- `distancia_r`: 'Distancia r al punto mal calculada'
- `cancelacion`: 'No vio la cancelación por simetría'
- `proyeccion`: 'Olvidó la proyección cos θ de dE'
- `trig_sustitucion`: 'Error en la sustitución trigonométrica'
- `plano_infinito_disco`: 'Usó el plano infinito para un disco finito'
- `varilla_infinita`: 'Usó la varilla infinita para una varilla finita'
- `limite_z_R`: 'No comprobó el límite z≫R (carga puntual)'
- `unidades`: 'Unidades (cm → m)'

## Rutas de salida (EXACTAS)
| Entregable | Ruta |
|---|---|
| Master Deck | `presentaciones/M4_DistribucionesContinuas/index.html` |
| Taller web | `talleres/Taller_4_Distribuciones_de_Carga_Continua.html` |
| Taller PDF | `recursos/Cap04_Taller.pdf` (+ fuente `.design/fase5/M04/Taller_4.tex`) |
| Guía PDF | `recursos/Cap04_Guia.pdf` (+ fuente `.design/fase5/M04/M04_Guia.tex` y `e10.sty`) |
| Simulador | `simuladores/ContinuousDistLab.html` |
| Desafío | `desafios/bancos/m4.js` (registrado en `desafio.html` e `integral.html`) |
| Póster | `laminas/M4_DistribucionesContinuas.html` |
| 3D | `recursos/modelos_3d/M04_DistribucionGeometria.scad` + `.stl` (+ `.html` + `.png`) |
| Verificación | `scripts/prueba_cap4.cjs` |

## Los 10 tipos de pregunta del Desafío
`mc` (opción múltiple), `num` (numérico), `dir` (dirección vectorial), `orden` (orden de pasos), `pares` (emparejamiento), `huecos` (completar), `limite` (casos límite), `grafica` (interpretar gráficas), `error` (caza de errores), `mision`/`ajuste` (misión interactiva). Ver `desafios/bancos/m3.js` como molde exacto.
