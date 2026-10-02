// ==========================================================================
// Electro10.Easy — Módulo JavaScript Base para Simuladores (simulator-base.js)
// Centraliza telemetría, escalado HiDPI, renderizado matemático y sincronización.
// ==========================================================================

export class SimulatorBase {
    constructor(options = {}) {
        this.simulatorId = options.id || window.location.pathname.split('/').pop().replace('.html', '');
        this.title = options.title || document.title;
        this.canvas = options.canvas || document.querySelector('canvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.isRunning = true;
        this.speed = 1.0;
        this.telemetryDebounce = null;
        
        this.init();
    }

    init() {
        if (this.canvas) {
            this.handleResize();
            window.addEventListener('resize', () => this.handleResize());
        }
        this.attachGlobalListeners();
        this.emitTelemetry('SIM_LOADED', { title: this.title });
    }

    // ── Escalado de Canvas para Pantallas HiDPI / Retina ─────────────────────
    handleResize() {
        if (!this.canvas) return;
        const rect = this.canvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        this.width = rect.width;
        this.height = rect.height;
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        
        if (this.ctx) {
            this.ctx.resetTransform?.();
            this.ctx.scale(dpr, dpr);
        }
        
        if (typeof this.onResize === 'function') {
            this.onResize(this.width, this.height);
        }
    }

    // ── Enlace y Envío de Telemetría a Firebase Firestore ────────────────────
    emitTelemetry(action, details = {}) {
        if (!window.parent) return;
        window.parent.postMessage({
            type: 'SIM_TELEMETRY',
            action: action,
            details: details,
            simulatorPath: window.location.pathname
        }, '*');
    }

    debounceTelemetry(action, details = {}, delay = 500) {
        clearTimeout(this.telemetryDebounce);
        this.telemetryDebounce = setTimeout(() => {
            this.emitTelemetry(action, details);
        }, delay);
    }

    // ── Escucha de Interacciones de Usuario ──────────────────────────────────
    attachGlobalListeners() {
        // Escuchar cambios en sliders y controles de entrada
        document.querySelectorAll('input[type="range"], select, input[type="number"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.debounceTelemetry('CONTROL_CHANGED', {
                    id: e.target.id || e.target.name,
                    value: e.target.value
                });
            });
        });

        // Escuchar clics en botones
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const btnId = e.currentTarget.id || e.currentTarget.innerText.trim();
                this.emitTelemetry('BUTTON_CLICKED', { buttonId: btnId });
            });
        });

        // Escuchar sincronización de tema claro/oscuro desde la ventana principal
        window.addEventListener('message', (e) => {
            if (e.data && e.data.type === 'THEME_SYNC') {
                if (e.data.theme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
        });
    }

    // ── Dibujado de Cuadrícula Técnica en Canvas ─────────────────────────────
    drawGrid(ctx, step = 40, strokeColor = null) {
        if (!ctx) return;
        const isDark = document.documentElement.classList.contains('dark');
        const color = strokeColor || (isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)');
        
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;

        for (let x = 0; x < this.width; x += step) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.height);
            ctx.stroke();
        }

        for (let y = 0; y < this.height; y += step) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.width, y);
            ctx.stroke();
        }
        ctx.restore();
    }

    // ── Exportación de Captura de Pantalla PNG ───────────────────────────────
    exportSnapshot(filename = null) {
        if (!this.canvas) return;
        const name = filename || `${this.simulatorId}_captura_${Date.now()}.png`;
        const link = document.createElement('a');
        link.download = name;
        link.href = this.canvas.toDataURL('image/png');
        link.click();
        this.emitTelemetry('SNAPSHOT_EXPORTED', { filename: name });
    }
}
