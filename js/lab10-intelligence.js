// ==========================================================================
// Lab10 Intelligence & Resource Engine — Electro10.Easy
// Motor unificado universal (sin dependencias CORS) para:
// 1. Unificacion visual de paleta y temas (Modo Claro / Modo Oscuro)
// 2. Dinamismo pedagogico con deduccion analitica KaTeX en vivo
// 3. Analisis de limites asintoticos y simetrias fisicas
// 4. Aprovechamiento continuo de datos (Lab10Bus inter-simulador)
// ==========================================================================

(function(global) {
    'use strict';

    // ── Bus de Datos Integrado (Universal / Zero CORS) ──────────────────────
    class LocalLab10Bus {
        constructor() {
            this.channel = null;
            try {
                if (typeof BroadcastChannel !== 'undefined') {
                    this.channel = new BroadcastChannel('lab10_physical_bus');
                    this.channel.onmessage = (e) => this.handleMessage(e.data);
                }
            } catch (_) {}
            this.listeners = [];
        }

        handleMessage(msg) {
            if (msg && msg.type === 'SCENARIO_TRANSFERRED') {
                this.listeners.forEach(fn => fn(msg.payload));
            }
        }

        exportScenario(targetUrl, scenarioData, targetName = 'Siguiente Simulador') {
            const payload = {
                version: '1.0',
                targetUrl,
                targetName,
                timestamp: Date.now(),
                data: scenarioData
            };
            try {
                localStorage.setItem('lab10_scenario_transfer', JSON.stringify(payload));
            } catch (e) {}

            if (this.channel) {
                try {
                    this.channel.postMessage({ type: 'SCENARIO_TRANSFERRED', payload });
                } catch (_) {}
            }

            if (window !== window.parent) {
                try {
                    window.parent.postMessage({ type: 'NAVIGATE_SIMULATOR', targetUrl }, '*');
                } catch (_) {}
            }
            return payload;
        }

        onScenarioImported(callback) {
            this.listeners.push(callback);
            try {
                const stored = localStorage.getItem('lab10_scenario_transfer');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    if (Date.now() - parsed.timestamp < 3600000) {
                        callback(parsed.data);
                    }
                }
            } catch (_) {}
        }
    }

    // ── Motor Principal Lab10Intelligence ──────────────────────────────────
    class Lab10Intelligence {
        constructor() {
            this.bus = new LocalLab10Bus();
            this.isDrawerOpen = false;
            this.registeredSolver = null;
            this.presets = [];
            this.onPresetSelect = null;
            this.domain = 'electro';
            this.nextLab = null;

            this.initThemeSync();
        }

        // ── 1. Sincronización Dinámica de Tema y Colores ─────────────────────
        initThemeSync() {
            const savedTheme = localStorage.getItem('electro10_theme') || 'dark';
            this.setTheme(savedTheme, false);

            window.addEventListener('message', (event) => {
                if (event.data && event.data.type === 'THEME_SYNC') {
                    this.setTheme(event.data.theme, false);
                }
                if (event.data && event.data.type === 'LAB10_PRESET') {
                    if (this.onPresetSelect) this.onPresetSelect(event.data.preset);
                }
            });

            global.toggleTheme = () => {
                const isLight = document.body ? document.body.classList.contains('light-mode') : false;
                const next = isLight ? 'dark' : 'light';
                this.setTheme(next, true);
            };
        }

        setTheme(theme, broadcast = true) {
            if (document.documentElement) {
                if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                } else {
                    document.documentElement.classList.add('dark');
                }
            }

            if (document.body) {
                if (theme === 'light') {
                    document.body.classList.remove('dark', 'dark-mode');
                    document.body.classList.add('light-mode');
                } else {
                    document.body.classList.remove('light-mode');
                    document.body.classList.add('dark', 'dark-mode');
                }
            } else {
                // Si el body aún no existe al ejecutarse en <head>, aplicar al cargar DOM
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', () => this.setTheme(theme, false), { once: true });
                }
            }

            try {
                localStorage.setItem('electro10_theme', theme);
            } catch (_) {}

            if (broadcast) {
                try {
                    window.parent.postMessage({ type: 'THEME_SYNC', theme }, '*');
                } catch (_) {}
            }

            // Notificar a funciones de renderizado canvas conocidas
            ['renderSimulation', 'updateSimulation', 'draw', 'update', 'render', 'resizeCanvas'].forEach(fn => {
                if (typeof window[fn] === 'function') {
                    try { window[fn](); } catch (_) {}
                }
            });
        }

        // ── 2. Inicializador del Asistente Físico Inteligente ───────────────
        init({
            labName = 'Laboratorio',
            moduleTag = 'Módulo',
            domain = 'electro',
            icon = 'ph-lightning',
            solver = null,
            presets = [],
            onPreset = null,
            nextLab = null
        }) {
            this.labName = labName;
            this.moduleTag = moduleTag;
            this.domain = domain;
            this.icon = icon;
            this.registeredSolver = solver;
            this.presets = presets;
            this.onPresetSelect = onPreset;
            this.nextLab = nextLab;

            const onReady = () => {
                if (document.body) {
                    document.body.dataset.domain = domain;
                    document.body.classList.add(`theme-${domain}`);
                }
                this.enhanceHeader();
                this.injectIntelligenceDrawer();
            };

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', onReady, { once: true });
            } else {
                onReady();
            }

            this.bus.onScenarioImported((scenario) => {
                if (this.onPresetSelect && scenario && scenario.preset) {
                    this.onPresetSelect(scenario.preset);
                }
            });
        }

        // ── 3. Estandarización y Embellecimiento del Header HUD ──────────────
        enhanceHeader() {
            let header = document.querySelector('header');
            if (!header) return;

            const brand = header.querySelector('.brand-title, h1, h2, .logo');
            if (brand && !brand.dataset.lab10Enhanced) {
                brand.dataset.lab10Enhanced = 'true';
                brand.className = 'brand-title';
                brand.innerHTML = `<i class="ph ${this.icon}"></i> ${this.labName}Lab10<span style="color:var(--text-muted);font-weight:400">.easy</span> <span class="room-badge">${this.moduleTag}</span>`;
            }

            let actions = header.querySelector('.header-actions, .flex.items-center:last-child');
            if (actions && !header.querySelector('#btn-theme-toggle')) {
                const themeBtn = document.createElement('button');
                themeBtn.id = 'btn-theme-toggle';
                themeBtn.className = 'btn';
                themeBtn.title = 'Modo Día / Modo Noche';
                themeBtn.innerHTML = `<i class="ph ph-moon"></i>`;
                themeBtn.onclick = () => global.toggleTheme();
                actions.prepend(themeBtn);
            }

            if (this.nextLab && actions && !header.querySelector('#btn-next-lab-header')) {
                const nextBtn = document.createElement('button');
                nextBtn.id = 'btn-next-lab-header';
                nextBtn.className = 'btn btn-primary';
                nextBtn.style.padding = '6px 12px';
                nextBtn.style.fontSize = '0.82rem';
                nextBtn.title = `Avanzar en la cadena formativa hacia ${this.nextLab.name}`;
                nextBtn.innerHTML = `<i class="ph ph-arrow-fat-line-right"></i> ${this.nextLab.name}`;
                nextBtn.onclick = () => this.goToNextLab();
                actions.appendChild(nextBtn);
            }
        }

        // ── 4. Inyección del Asistente Flotante y Drawer ─────────────────────
        injectIntelligenceDrawer() {
            if (document.getElementById('lab10-ia-pill')) return;

            // Botón Flotante (Pill)
            const pill = document.createElement('button');
            pill.id = 'lab10-ia-pill';
            pill.className = 'lab10-ia-pill';
            pill.innerHTML = `<i class="ph ph-sparkle"></i> <span>IA Inspector Físico</span>`;
            pill.onclick = () => this.toggleDrawer();
            document.body.appendChild(pill);

            // Drawer Flotante Inteligente
            const drawer = document.createElement('div');
            drawer.id = 'lab10-ia-drawer';
            drawer.className = 'lab10-ia-drawer';
            drawer.innerHTML = `
                <div class="lab10-drawer-header">
                    <div class="lab10-drawer-title">
                        <i class="ph ph-sparkle"></i> Inspector Físico Inteligente
                    </div>
                    <div class="window-controls">
                        <button class="win-btn win-close" onclick="window.lab10AI.toggleDrawer(false)"></button>
                    </div>
                </div>
                <div class="lab10-drawer-body">
                    <!-- Tarjeta 1: Deducción Matemática KaTeX en Vivo -->
                    <div class="lab10-insight-card">
                        <div class="lab10-insight-title">
                            <i class="ph ph-function"></i> Deducción Analítica en Vivo
                        </div>
                        <div class="lab10-insight-value" id="lab10-math-deduction">
                            Cargando formulación matemática...
                        </div>
                    </div>

                    <!-- Tarjeta 2: Análisis de Límites y Simetrías -->
                    <div class="lab10-insight-card">
                        <div class="lab10-insight-title">
                            <i class="ph ph-scales"></i> Comprobación de Límites & Simetrías
                        </div>
                        <div class="lab10-insight-value" id="lab10-limits-check">
                            Ajusta los controles para ver la verificación asintótica en tiempo real.
                        </div>
                    </div>

                    <!-- Tarjeta 3: Escenarios Pedagógicos Inteligentes -->
                    ${this.presets.length > 0 ? `
                    <div class="lab10-insight-card">
                        <div class="lab10-insight-title">
                            <i class="ph ph-bookmarks"></i> Escenarios y Casos Clave
                        </div>
                        <div class="lab10-preset-grid" id="lab10-presets-container">
                            ${this.presets.map(p => `
                                <button class="lab10-preset-btn" onclick="window.lab10AI.applyPreset('${p.id}')">
                                    <i class="ph ${p.icon || 'ph-arrow-circle-right'}"></i>
                                    <span>${p.label}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>` : ''}

                    <!-- Tarjeta 4: Continuidad de Datos (Lab10Bus) -->
                    ${this.nextLab ? `
                    <div class="lab10-insight-card" style="border-color: var(--accent); background: rgba(78, 204, 163, 0.05);">
                        <div class="lab10-insight-title" style="color: var(--accent);">
                            <i class="ph ph-git-fork"></i> Continuidad Curricular
                        </div>
                        <div class="lab10-insight-value" style="display:flex;flex-direction:column;gap:8px;">
                            <span>Transfiere las variables actuales directamente a <strong>${this.nextLab.name}</strong> para continuar el análisis.</span>
                            <button class="btn btn-primary" style="width:100%;justify-content:center;" onclick="window.lab10AI.goToNextLab()">
                                <i class="ph ph-arrow-right"></i> Continuar en ${this.nextLab.name}
                            </button>
                        </div>
                    </div>` : ''}
                </div>
            `;
            document.body.appendChild(drawer);

            // Actualizar deducción inicial
            this.updateIntelligence();
        }

        toggleDrawer(forceState = null) {
            const drawer = document.getElementById('lab10-ia-drawer');
            if (!drawer) return;
            this.isDrawerOpen = forceState !== null ? forceState : !this.isDrawerOpen;
            if (this.isDrawerOpen) {
                drawer.classList.add('open');
                this.updateIntelligence();
            } else {
                drawer.classList.remove('open');
            }
        }

        // ── 5. Actualización Dinámica del Análisis Físico ───────────────────
        updateIntelligence() {
            if (!this.registeredSolver) return;

            try {
                const analysis = this.registeredSolver();
                if (!analysis) return;

                const mathContainer = document.getElementById('lab10-math-deduction');
                if (mathContainer && analysis.latex) {
                    if (window.katex) {
                        try {
                            window.katex.render(analysis.latex, mathContainer, { displayMode: true, throwOnError: false });
                        } catch (e) {
                            mathContainer.innerText = analysis.latex;
                        }
                    } else {
                        mathContainer.innerText = analysis.latex;
                    }
                }

                const limitsContainer = document.getElementById('lab10-limits-check');
                if (limitsContainer && analysis.limits) {
                    limitsContainer.innerHTML = analysis.limits;
                    if (window.renderMathInElement) {
                        try {
                            window.renderMathInElement(limitsContainer, {
                                delimiters: [
                                    { left: '$$', right: '$$', display: true },
                                    { left: '$', right: '$', display: false }
                                ],
                                throwOnError: false
                            });
                        } catch (_) {}
                    }
                }
            } catch (e) {
                console.warn('[Lab10Intelligence] Error al evaluar física:', e);
            }
        }

        applyPreset(presetId) {
            if (this.onPresetSelect) {
                this.onPresetSelect(presetId);
                this.updateIntelligence();
            }
        }

        goToNextLab() {
            if (!this.nextLab) return;
            const scenarioData = {
                origen: `${this.labName}Lab10`,
                dominio: this.domain,
                timestamp: Date.now()
            };
            this.bus.exportScenario(this.nextLab.url, scenarioData, this.nextLab.name);
            window.location.href = this.nextLab.url;
        }
    }

    const lab10AI = new Lab10Intelligence();
    global.Lab10Intelligence = Lab10Intelligence;
    global.lab10AI = lab10AI;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { Lab10Intelligence, lab10AI };
    }
})(typeof window !== 'undefined' ? window : globalThis);
