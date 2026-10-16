import os, re

# Definición de metadatos pedagógicos por simulador
SIM_CONFIGS = {
    # Electrostática (M1, M2)
    'Sim_M1_Cargas.html': {
        'name': 'VectorCoulomb',
        'module': 'M1 Superposición',
        'domain': 'electro',
        'icon': 'ph-vector-three',
        'nextName': 'Campo Vectorial 2D (M2)',
        'nextUrl': 'Sim_M2_Campo_Vectorial.html',
        'latex': r'F_e = \frac{k |q_1 q_2|}{r^2},\quad \vec{F}_{\text{neta}} = \sum_{i} \vec{F}_i',
        'presets': [
            {'id': 'dipole', 'label': 'Dipolo (+ / -)', 'icon': 'ph-arrows-left-right'},
            {'id': 'repulsion', 'label': 'Repulsión (+ / +)', 'icon': 'ph-arrows-out'},
            {'id': 'triangle', 'label': 'Triángulo Equilátero', 'icon': 'ph-triangle'}
        ]
    },
    'Sim_M1_Coulomb_Pro.html': {
        'name': 'CoulombPro',
        'module': 'M1 Ley de Coulomb',
        'domain': 'electro',
        'icon': 'ph-atom',
        'nextName': 'Superposición de Cargas (M1)',
        'nextUrl': 'Sim_M1_Cargas.html',
        'latex': r'F = \frac{k |q_1 q_2|}{\varepsilon_r r^2},\quad k = \frac{1}{4\pi\varepsilon_0}',
        'presets': [
            {'id': 'vacuum', 'label': r'Vacío (epsilon = 1)', 'icon': 'ph-sparkle'},
            {'id': 'water', 'label': r'Agua (epsilon = 80)', 'icon': 'ph-drop'},
            {'id': 'micro', 'label': 'Distancia micrométrica', 'icon': 'ph-magnifying-glass'}
        ]
    },
    'Sim_M2_Campo_Vectorial.html': {
        'name': 'VectorField',
        'module': 'M2 Campo Eléctrico',
        'domain': 'electro',
        'icon': 'ph-compass',
        'nextName': 'Varilla Cargada (M2)',
        'nextUrl': 'Sim_M2_Varilla.html',
        'latex': r'\vec{E}(x,y) = \sum_{i=1}^N \frac{k q_i}{r_i^2}\hat{r}_i',
        'presets': [
            {'id': 'dipole', 'label': 'Dipolo Eléctrico', 'icon': 'ph-arrows-left-right'},
            {'id': 'quadrupole', 'label': 'Cuadripolo Eléctrico', 'icon': 'ph-square'},
            {'id': 'uniform_line', 'label': 'Línea de Campo', 'icon': 'ph-line-segment'}
        ]
    },
    'Sim_M2_Anillo.html': {
        'name': 'Ring',
        'module': 'M2 Distribución 1D',
        'domain': 'electro',
        'icon': 'ph-circle',
        'nextName': 'Disco Cargado (M2)',
        'nextUrl': 'Sim_M2_Disco.html',
        'latex': r'E_z = \frac{k Q z}{(z^2 + a^2)^{3/2}}',
        'presets': [
            {'id': 'max_field', 'label': 'Campo Máximo (z = a/√2)', 'icon': 'ph-chart-line-up'},
            {'id': 'center', 'label': 'Centro del Anillo (z = 0)', 'icon': 'ph-crosshair'},
            {'id': 'far_field', 'label': 'Límite Puntual (z >> a)', 'icon': 'ph-arrows-out'}
        ]
    },
    'Sim_M2_Disco.html': {
        'name': 'Disk',
        'module': 'M2 Distribución 2D',
        'domain': 'electro',
        'icon': 'ph-disc',
        'nextName': 'Arco de Carga (M2)',
        'nextUrl': 'Sim_M2_Arco.html',
        'latex': r'E_z = \frac{\sigma}{2\varepsilon_0}\left(1 - \frac{z}{\sqrt{z^2 + R^2}}\right)',
        'presets': [
            {'id': 'near_surface', 'label': r'Plano Infinito (z -> 0)', 'icon': 'ph-square'},
            {'id': 'far_field', 'label': r'Límite Puntual (z >> R)', 'icon': 'ph-arrows-out'},
            {'id': 'large_disk', 'label': r'Disco Amplio (R=5m)', 'icon': 'ph-arrows-horizontal'}
        ]
    },
    'Sim_M2_Arco.html': {
        'name': 'Arc',
        'module': 'M2 Distribución Circular',
        'domain': 'electro',
        'icon': 'ph-circle-notch',
        'nextName': 'Semicírculo Cargado (M2)',
        'nextUrl': 'Sim_M2_Semicirculo.html',
        'latex': r'E_x = \frac{2k\lambda}{R}\sin(\theta/2)',
        'presets': [
            {'id': 'quarter', 'label': 'Cuarto de Círculo (90°)', 'icon': 'ph-chart-pie'},
            {'id': 'semicircle', 'label': 'Semicírculo (180°)', 'icon': 'ph-circle-half'},
            {'id': 'complete', 'label': 'Anillo Completo (360°)', 'icon': 'ph-circle'}
        ]
    },
    'Sim_M2_Semicirculo.html': {
        'name': 'Semicircle',
        'module': 'M2 Distribución Curva',
        'domain': 'electro',
        'icon': 'ph-circle-half',
        'nextName': 'Cilindro Cargado (M2)',
        'nextUrl': 'Sim_M2_Cilindro.html',
        'latex': r'E_y = \frac{2k\lambda}{R},\quad E_x = 0\text{ (por simetría)}',
        'presets': [
            {'id': 'high_lambda', 'label': 'Densidad Alta (10 nC/m)', 'icon': 'ph-lightning'},
            {'id': 'small_radius', 'label': 'Radio Compacto (R=1m)', 'icon': 'ph-target'},
            {'id': 'large_radius', 'label': 'Radio Amplio (R=5m)', 'icon': 'ph-arrows-out'}
        ]
    },
    'Sim_M2_Cilindro.html': {
        'name': 'Cylinder',
        'module': 'M2 Distribución 3D',
        'domain': 'electro',
        'icon': 'ph-cylinder',
        'nextName': 'Tablero de Distribuciones (M2)',
        'nextUrl': 'Sim_M2_Tablero_Distribuciones.html',
        'latex': r'E(r > R) = \frac{\rho R^2}{2\varepsilon_0 r},\quad E(r < R) = \frac{\rho r}{2\varepsilon_0}',
        'presets': [
            {'id': 'interior', 'label': 'Campo Interior (r < R)', 'icon': 'ph-arrows-in'},
            {'id': 'surface', 'label': 'Superficie (r = R)', 'icon': 'ph-target'},
            {'id': 'exterior', 'label': 'Campo Exterior (r > R)', 'icon': 'ph-arrows-out'}
        ]
    },
    'Sim_M2_Tablero_Distribuciones.html': {
        'name': 'DistributionsMatrix',
        'module': 'M2 Comparativa',
        'domain': 'electro',
        'icon': 'ph-table',
        'nextName': 'Distribuciones Lineales (M2)',
        'nextUrl': 'Sim_M2_Tablero_Lineas.html',
        'latex': r'\text{Comparativa: } E_{\text{anillo}},\, E_{\text{disco}},\, E_{\text{cilindro}}',
        'presets': [
            {'id': 'compare_axis', 'label': 'Comparación sobre el Eje', 'icon': 'ph-scales'},
            {'id': 'high_charge', 'label': 'Carga Máxima', 'icon': 'ph-lightning'}
        ]
    },
    'Sim_M2_Tablero_Lineas.html': {
        'name': 'LinesMatrix',
        'module': 'M2 Comparativa 1D',
        'domain': 'electro',
        'icon': 'ph-rows',
        'nextName': 'Flujo Eléctrico y Gauss (M3)',
        'nextUrl': 'Sim_M3_Flujo.html',
        'latex': r'E_{\text{infinita}} = \frac{\lambda}{2\pi\varepsilon_0 r}',
        'presets': [
            {'id': 'infinite', 'label': 'Línea Infinita', 'icon': 'ph-infinity'},
            {'id': 'semi_infinite', 'label': 'Línea Semi-Infinita', 'icon': 'ph-arrow-right'}
        ]
    },

    # Gauss (M3)
    'Sim_M3_Flujo.html': {
        'name': 'Flux',
        'module': 'M3 Ley de Gauss',
        'domain': 'gauss',
        'icon': 'ph-bounding-box',
        'nextName': 'Matriz Gaussiana (M3)',
        'nextUrl': 'Tabla_Gauss.html',
        'latex': r'\Phi_E = \oint_S \vec{E}\cdot d\vec{A} = \frac{Q_{\text{enc}}}{\varepsilon_0}',
        'presets': [
            {'id': 'sphere', 'label': 'Superficie Esférica', 'icon': 'ph-globe'},
            {'id': 'cylinder', 'label': 'Superficie Cilíndrica', 'icon': 'ph-cylinder'},
            {'id': 'zero_flux', 'label': r'Carga Fuera (Phi = 0)', 'icon': 'ph-prohibit'}
        ]
    },
    'Tabla_Gauss.html': {
        'name': 'GaussMatrix',
        'module': 'M3 Simetrías',
        'domain': 'gauss',
        'icon': 'ph-grid-four',
        'nextName': 'Gauss 3D Avanzado (M3)',
        'nextUrl': 'Laboratorio_Gauss_Avanzado.html',
        'latex': r'\oint \vec{E}\cdot d\vec{A} = \frac{Q_{\text{enc}}}{\varepsilon_0}',
        'presets': [
            {'id': 'spherical', 'label': 'Simetría Esférica', 'icon': 'ph-globe'},
            {'id': 'cylindrical', 'label': 'Simetría Cilíndrica', 'icon': 'ph-cylinder'},
            {'id': 'planar', 'label': 'Simetría Planar', 'icon': 'ph-square'}
        ]
    },
    'Laboratorio_Gauss_Avanzado.html': {
        'name': 'Gauss3D',
        'module': 'M3 Geometrías 3D',
        'domain': 'gauss',
        'icon': 'ph-cube',
        'nextName': 'Potencial Eléctrico 2D (M4)',
        'nextUrl': 'Potencial_Electrico.html',
        'latex': r'\Phi = \iint \vec{E}\cdot \hat{n}\,dA = \frac{Q_{\text{enc}}}{\varepsilon_0}',
        'presets': [
            {'id': 'sphere_concentric', 'label': 'Esferas Concéntricas', 'icon': 'ph-circle-notch'},
            {'id': 'infinite_sheet', 'label': 'Lámina Plana', 'icon': 'ph-square'}
        ]
    },

    # Potencial (M4)
    'Potencial_Electrico.html': {
        'name': 'Potential2D',
        'module': 'M4 Potencial Eléctrico',
        'domain': 'potential',
        'icon': 'ph-waves',
        'nextName': 'Equipotenciales 3D (M4)',
        'nextUrl': 'Potencial_Electrico_2.html',
        'latex': r'V(r) = \frac{k q}{r},\quad \vec{E} = -\vec{\nabla}V',
        'presets': [
            {'id': 'dipole_pot', 'label': 'Dipolo de Potencial', 'icon': 'ph-arrows-left-right'},
            {'id': 'gradient', 'label': 'Gradiente y Campo', 'icon': 'ph-arrow-up-right'}
        ]
    },
    'Potencial_Electrico_2.html': {
        'name': 'Potential3D',
        'module': 'M4 Trabajo y Energía',
        'domain': 'potential',
        'icon': 'ph-chart-polar',
        'nextName': 'Capacitancia y Dieléctricos (M5)',
        'nextUrl': 'Capacitance.html',
        'latex': r'W = -q\Delta V,\quad U = \frac{1}{2}\sum_i q_i V_i',
        'presets': [
            {'id': 'well', 'label': 'Pozo de Potencial (-q)', 'icon': 'ph-arrow-fat-line-down'},
            {'id': 'barrier', 'label': 'Barrera de Potencial (+q)', 'icon': 'ph-arrow-fat-line-up'}
        ]
    },

    # Circuitos (M6, M7)
    'Sim_M6_Resistividad.html': {
        'name': 'Resistivity',
        'module': 'M6 Ley de Pouillet',
        'domain': 'circuits',
        'icon': 'ph-circuitry',
        'nextName': 'Reducción de Circuitos (M6)',
        'nextUrl': 'Resistance.html',
        'latex': r'R = \rho \frac{L}{A},\quad \rho(T) = \rho_0[1 + \alpha(T - T_0)]',
        'presets': [
            {'id': 'copper', 'label': 'Cobre (\rho = 1.7\times 10^{-8})', 'icon': 'ph-sparkle'},
            {'id': 'aluminum', 'label': 'Aluminio (\rho = 2.8\times 10^{-8})', 'icon': 'ph-shield'},
            {'id': 'carbon', 'label': 'Grafito (\rho = 3.5\times 10^{-5})', 'icon': 'ph-fire'}
        ]
    },
    'Sim_M6_CircuitoDC.html': {
        'name': 'DCCircuit',
        'module': 'M6 Leyes de Kirchhoff',
        'domain': 'circuits',
        'icon': 'ph-cpu',
        'nextName': 'Fuerza de Lorentz (M8)',
        'nextUrl': 'LorentzLab10easy.html',
        'latex': r'\sum I_{\text{nodo}} = 0,\quad \sum \Delta V_{\text{malla}} = 0',
        'presets': [
            {'id': 'series', 'label': 'Circuito Serie', 'icon': 'ph-rows'},
            {'id': 'parallel', 'label': 'Circuito Paralelo', 'icon': 'ph-columns'},
            {'id': 'bridge', 'label': 'Puente de Wheatstone', 'icon': 'ph-crosshair'}
        ]
    },

    # Magnetismo & Biot-Savart (M8)
    'Sim_M8_BiotSavart_Hilo.html': {
        'name': 'WireBiotSavart',
        'module': 'M8 Hilo Conductor',
        'domain': 'magnetism',
        'icon': 'ph-line-segment',
        'nextName': 'Espira Circular Biot-Savart (M8)',
        'nextUrl': 'Sim_M8_BiotSavart_Anillo.html',
        'latex': r'B = \frac{\mu_0 I}{2\pi r},\quad d\vec{B} = \frac{\mu_0 I}{4\pi}\frac{d\vec{l}\times\hat{r}}{r^2}',
        'presets': [
            {'id': 'high_current', 'label': 'Corriente Alta (I=10A)', 'icon': 'ph-lightning'},
            {'id': 'near_wire', 'label': 'Punto Cercano (r=2cm)', 'icon': 'ph-target'}
        ]
    },
    'Sim_M8_BiotSavart_Anillo.html': {
        'name': 'LoopBiotSavart',
        'module': 'M8 Espira Circular',
        'domain': 'magnetism',
        'icon': 'ph-circle',
        'nextName': 'Solenoide de Ampère (M9)',
        'nextUrl': 'Sim_M9_Solenoide.html',
        'latex': r'B_z = \frac{\mu_0 I R^2}{2(R^2 + z^2)^{3/2}}',
        'presets': [
            {'id': 'center_b', 'label': 'Centro de la Espira (z=0)', 'icon': 'ph-crosshair'},
            {'id': 'helmholtz', 'label': 'Configuración Helmholtz', 'icon': 'ph-circle-half'}
        ]
    },

    # Ampère (M9)
    'Sim_M9_Solenoide.html': {
        'name': 'Solenoid',
        'module': 'M9 Ley de Ampère',
        'domain': 'ampere',
        'icon': 'ph-spiral',
        'nextName': 'Matriz Ampere (M9)',
        'nextUrl': 'Sim_M9_Tabla_Ampere.html',
        'latex': r'B_{\text{interior}} = \mu_0 n I = \mu_0 \frac{N}{L} I',
        'presets': [
            {'id': 'ideal', 'label': 'Solenoide Ideal (L >> R)', 'icon': 'ph-infinity'},
            {'id': 'dense', 'label': 'Devanado Denso (N=1000)', 'icon': 'ph-stack'}
        ]
    },
    'Sim_M9_Tabla_Ampere.html': {
        'name': 'AmpereMatrix',
        'module': 'M9 Simetrías Magnéticas',
        'domain': 'ampere',
        'icon': 'ph-table',
        'nextName': 'FEM de Movimiento (M10)',
        'nextUrl': 'Sim_M10_FEM_Movimiento.html',
        'latex': r'\oint_C \vec{B}\cdot d\vec{l} = \mu_0 I_{\text{enc}}',
        'presets': [
            {'id': 'straight_wire', 'label': 'Hilo Recto', 'icon': 'ph-line-segment'},
            {'id': 'toroid', 'label': 'Toroide', 'icon': 'ph-circle-dashed'}
        ]
    },

    # Faraday e Inducción (M10)
    'Sim_M10_FEM_Movimiento.html': {
        'name': 'MotionalEMF',
        'module': 'M10 Ley de Faraday',
        'domain': 'induction',
        'icon': 'ph-arrows-left-right',
        'nextName': 'Flujo Magnético e Inducción (M10)',
        'nextUrl': 'Sim_M10_FlujoMagnetico.html',
        'latex': r'\mathcal{E} = B L v,\quad I = \frac{\mathcal{E}}{R},\quad P_{\text{mec}} = F v = I^2 R',
        'presets': [
            {'id': 'high_speed', 'label': 'Alta Velocidad (v=10m/s)', 'icon': 'ph-speedometer'},
            {'id': 'strong_b', 'label': 'Campo Intenso (B=3T)', 'icon': 'ph-magnet'},
            {'id': 'low_r', 'label': 'Baja Resistencia (R=0.5Ω)', 'icon': 'ph-bolt'}
        ]
    },
    'Sim_M10_FlujoMagnetico.html': {
        'name': 'MagneticFlux',
        'module': 'M10 Ley de Lenz',
        'domain': 'induction',
        'icon': 'ph-magnet',
        'nextName': 'Ecuaciones de Maxwell (M11)',
        'nextUrl': 'Sim_M11_EcuacionesMaxwell.html',
        'latex': r'\Phi_B = B A \cos\theta,\quad \mathcal{E} = -\frac{d\Phi_B}{dt}',
        'presets': [
            {'id': 'perpendicular', 'label': 'Flujo Máximo (\theta = 0)', 'icon': 'ph-arrows-down-up'},
            {'id': 'parallel', 'label': 'Flujo Cero (\theta = 90°)', 'icon': 'ph-prohibit'}
        ]
    },

    # Maxwell & Ondas (M11)
    'Sim_M11_EcuacionesMaxwell.html': {
        'name': 'Maxwell',
        'module': 'M11 Unificación Electromagnética',
        'domain': 'waves',
        'icon': 'ph-squares-four',
        'nextName': 'Onda Electromagnética 3D (M11)',
        'nextUrl': 'Sim_M11_OndaEM.html',
        'latex': r'\vec{\nabla}\cdot\vec{E} = \frac{\rho}{\varepsilon_0},\quad \vec{\nabla}\times\vec{B} = \mu_0\vec{J} + \mu_0\varepsilon_0\frac{\partial\vec{E}}{\partial t}',
        'presets': [
            {'id': 'vacuum_eq', 'label': 'Ecuaciones en el Vacío', 'icon': 'ph-sparkle'},
            {'id': 'static_eq', 'label': 'Límite Estático', 'icon': 'ph-pause'}
        ]
    },
    'Sim_M11_OndaEM.html': {
        'name': 'EMWave',
        'module': 'M11 Radiación',
        'domain': 'waves',
        'icon': 'ph-broadcast',
        'nextName': 'Diagrama de Fasores AC (M12)',
        'nextUrl': 'Sim_M12_Fasores.html',
        'latex': r'\vec{E}(z,t) = E_0\cos(kz - \omega t)\hat{i},\quad \vec{B} = \frac{1}{c}\hat{k}\times\vec{E}',
        'presets': [
            {'id': 'light_speed', 'label': 'Velocidad c = 3×10^8 m/s', 'icon': 'ph-sun'},
            {'id': 'high_freq', 'label': 'Alta Frecuencia', 'icon': 'ph-wave-sine'}
        ]
    },

    # Corriente Alterna y Resonancia (M12)
    'Sim_M12_Fasores.html': {
        'name': 'Phasors',
        'module': 'M12 Circuitos AC',
        'domain': 'ac',
        'icon': 'ph-circle-dashed',
        'nextName': 'Oscilador LC (M12)',
        'nextUrl': 'Sim_M12_OsciladorLC.html',
        'latex': r'V(t) = V_0\sin(\omega t + \phi),\quad I(t) = I_0\sin(\omega t)',
        'presets': [
            {'id': 'pure_r', 'label': r'Resistivo Puro (phi = 0)', 'icon': 'ph-line-segment'},
            {'id': 'pure_l', 'label': r'Inductivo Puro (phi = 90°)', 'icon': 'ph-spiral'},
            {'id': 'pure_c', 'label': r'Capacitivo Puro (phi = -90°)', 'icon': 'ph-rows'}
        ]
    },
    'Sim_M12_OsciladorLC.html': {
        'name': 'LCOscillator',
        'module': 'M12 Oscilaciones Libres',
        'domain': 'ac',
        'icon': 'ph-activity',
        'nextName': 'Resonancia RLC (M12)',
        'nextUrl': 'Sim_M12_RLC.html',
        'latex': r'\omega_0 = \frac{1}{\sqrt{LC}},\quad U_{\text{total}} = \frac{q^2}{2C} + \frac{1}{2}L I^2',
        'presets': [
            {'id': 'fast_osc', 'label': 'Oscilación Rápida (10 kHz)', 'icon': 'ph-gauge'},
            {'id': 'high_energy', 'label': 'Alta Energía (V=100V)', 'icon': 'ph-battery-charging'}
        ]
    },
    'Sim_M12_RLC.html': {
        'name': 'RLCResonance',
        'module': 'M12 Resonancia y Filtros',
        'domain': 'ac',
        'icon': 'ph-pulse',
        'nextName': 'Hub de Simuladores (Lab10)',
        'nextUrl': 'index.html',
        'latex': r'f_0 = \frac{1}{2\pi\sqrt{LC}},\quad Z = \sqrt{R^2 + (X_L - X_C)^2},\quad Q = \frac{\omega_0 L}{R}',
        'presets': [
            {'id': 'resonance', 'label': 'Resonancia Exacta (Z=R)', 'icon': 'ph-target'},
            {'id': 'high_q', 'label': 'Alta Selectividad (Q > 20)', 'icon': 'ph-chart-line-up'},
            {'id': 'critical', 'label': 'Amortiguamiento Crítico', 'icon': 'ph-scales'}
        ]
    }
}

def inject_simulator(filepath, cfg):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()

    # 1. Asegurar inclusión de lab10-core.css y lab10-intelligence.js en head
    if 'lab10-core.css' not in html:
        html = html.replace('</head>', '    <link rel="stylesheet" href="../css/lab10-core.css">\n</head>')
    if 'lab10-intelligence.js' not in html:
        html = html.replace('</head>', '    <script src="../js/lab10-intelligence.js"></script>\n</head>')

    # 2. Asegurar data-domain en body
    domain = cfg['domain']
    if 'data-domain=' not in html:
        html = re.sub(r'<body([^>]*)>', rf'<body data-domain="{domain}"\1>', html, count=1)
    else:
        html = re.sub(r'data-domain="[^"]*"', f'data-domain="{domain}"', html, count=1)

    # 3. Inyectar bloque script de lab10AI antes de </body>
    presets_json = str(cfg['presets']).replace("'", '"')
    next_lab_json = f'{{"name": "{cfg["nextName"]}", "url": "{cfg["nextUrl"]}"}}'
    
    script_block = f"""
<!-- Lab10 Intelligence & Resource Core Engine -->
<script>
document.addEventListener('DOMContentLoaded', () => {{
    if (window.lab10AI) {{
        window.lab10AI.init({{
            labName: '{cfg["name"]}',
            moduleTag: '{cfg["module"]}',
            domain: '{cfg["domain"]}',
            icon: '{cfg["icon"]}',
            solver: () => {{
                return {{
                    latex: String.raw`{cfg["latex"]}`,
                    limits: `
                        <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                            <span>Dominio Físico:</span>
                            <strong style="color:var(--accent);">{cfg["module"]}</strong>
                        </div>
                        <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                            <span>Estado de Simulación:</span>
                            <span class="room-badge" style="color:var(--accent);"><i class="ph ph-check-circle"></i> Activo & Sincronizado</span>
                        </div>
                        <div style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;">
                            Interactúa con los controles y lienzos para explorar las leyes fundamentales en tiempo real.
                        </div>
                    `
                }};
            }},
            presets: {presets_json},
            onPreset: (presetId) => {{
                console.log('[Lab10] Preset aplicado:', presetId);
                const firstSlider = document.querySelector('input[type="range"]');
                if (firstSlider) {{
                    firstSlider.dispatchEvent(new Event('input', {{ bubbles: true }}));
                    firstSlider.dispatchEvent(new Event('change', {{ bubbles: true }}));
                }}
            }},
            nextLab: {next_lab_json}
        }});
    }}
}});
</script>
"""

    if '<!-- Lab10 Intelligence & Resource Core Engine -->' in html:
        idx = html.find('<!-- Lab10 Intelligence & Resource Core Engine -->')
        end_idx = html.find('</body>', idx)
        if end_idx != -1:
            html = html[:idx] + script_block + '\n' + html[end_idx:]
        else:
            html = html.replace('</body>', script_block + '\n</body>')
    else:
        html = html.replace('</body>', script_block + '\n</body>')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'[OK] Successfully upgraded: {os.path.basename(filepath)}')

for filename, cfg in SIM_CONFIGS.items():
    filepath = os.path.join('simuladores', filename)
    if os.path.exists(filepath):
        inject_simulator(filepath, cfg)
    else:
        print(f'⚠️ Warning: {filename} not found')
