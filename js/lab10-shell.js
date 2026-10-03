// ==========================================================================
// Lab10 Shell — HUD Controls, KaTeX Math Engine & Canvas Helpers
// Estandariza la interaccion del usuario, ventanas flotantes, drawer y matematicas.
// ==========================================================================

export class Lab10Shell {
    constructor() {
        this.init();
    }

    init() {
        // 1. Exponer helpers globales para ventanas flotantes estilo macOS
        window.toggleWin = (winId, action) => {
            const el = document.getElementById(winId);
            if (!el) return;
            if (action === 'close') {
                el.style.display = 'none';
            } else if (action === 'min') {
                const isMin = el.dataset.minimized === 'true';
                el.dataset.minimized = isMin ? 'false' : 'true';
                el.style.height = isMin ? 'auto' : '48px';
                el.style.overflow = isMin ? 'auto' : 'hidden';
            } else if (action === 'max') {
                el.classList.toggle('maximized');
            }
        };

        // 2. Exponer helper del panel deslizable lateral
        window.togglePanel = (panelId = 'right-panel') => {
            const p = document.getElementById(panelId);
            if (p) p.classList.toggle('open');
        };

        // 3. Exponer actualizador de coordenadas
        window.updateCoords = (x, y) => {
            const ind = document.getElementById('coords-indicator');
            if (ind) ind.innerText = `X:${Math.round(x)} Y:${Math.round(y)}`;
        };

        // 4. Atajo de teclado para pantalla completa
        window.toggleFullscreen = () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
            } else {
                document.exitFullscreen().catch(() => {});
            }
        };
    }

    // ── Renderizado Matematico KaTeX Seguro ─────────────────────────────────
    renderLatex(mathStr, containerEl, displayMode = false) {
        if (!containerEl) return;
        if (window.katex) {
            try {
                window.katex.render(mathStr, containerEl, {
                    displayMode: displayMode,
                    throwOnError: false
                });
                return;
            } catch (e) {
                console.warn('[Lab10Shell] Error en KaTeX render:', e);
            }
        }
        containerEl.innerText = mathStr;
    }

    // ── Escalador de Canvas para pantallas Retina / 4K ──────────────────────
    setupHiDPICanvas(canvas) {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.resetTransform?.();
            ctx.scale(dpr, dpr);
        }
        return { width: rect.width, height: rect.height, dpr };
    }
}

export const lab10Shell = new Lab10Shell();
window.lab10Shell = lab10Shell;
