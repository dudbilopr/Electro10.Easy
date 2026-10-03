// ==========================================================================
// Lab10 Bus — Interconexion y Potenciacion de Simuladores
// Permite que lo calculado o dibujado en un simulador sea exportado al siguiente
// en la cadena formativa (ej. Cargas -> Campo -> Potencial -> Gauss).
// ==========================================================================

export class Lab10Bus {
    constructor() {
        this.channel = null;
        try {
            this.channel = new BroadcastChannel('lab10_physical_bus');
            this.channel.onmessage = (e) => this.handleBroadcast(e.data);
        } catch (_) {}

        this.listeners = [];
        this.simulatorId = window.location.pathname.split('/').pop().replace('.html', '');
    }

    // ── Exportar Escenario hacia el siguiente simulador ─────────────────────
    exportScenario(targetUrl, scenarioData, targetName = 'Siguiente Simulador') {
        const payload = {
            version: '1.0',
            sourceLab: this.simulatorId,
            targetUrl: targetUrl,
            timestamp: Date.now(),
            data: scenarioData
        };

        // 1. Guardar en localStorage para persistencia inter-pestaña / iframe
        try {
            localStorage.setItem('lab10_scenario_transfer', JSON.stringify(payload));
        } catch (e) {
            console.warn('[Lab10Bus] Error guardando escenario en localStorage:', e);
        }

        // 2. Transmitir por BroadcastChannel si ambas pestañas estan abiertas en simultaneo
        if (this.channel) {
            try {
                this.channel.postMessage({ type: 'SCENARIO_TRANSFERRED', payload });
            } catch (_) {}
        }

        // 3. Telemetria hacia la plataforma principal
        this.emitTelemetry('SCENARIO_EXPORT', {
            from: this.simulatorId,
            to: targetUrl,
            entitiesCount: Object.keys(scenarioData?.entities || {}).length
        });

        // 4. Notificar o navegar
        if (window !== window.parent) {
            // Estamos en iframe: pedirle al contenedor abrir la leccion o actualizar URL
            window.parent.postMessage({
                type: 'NAVIGATE_SIMULATOR',
                targetUrl: targetUrl
            }, '*');
        }

        return payload;
    }

    // ── Verificar si hay un Escenario pendiente de importar ─────────────────
    checkIncomingScenario(onAccept) {
        try {
            const raw = localStorage.getItem('lab10_scenario_transfer');
            if (!raw) return null;

            const payload = JSON.parse(raw);
            const isFresh = (Date.now() - payload.timestamp) < 3600000; // Valido por 1 hora
            const isTarget = !payload.targetUrl || payload.targetUrl.includes(this.simulatorId);

            if (isFresh && isTarget && payload.sourceLab !== this.simulatorId) {
                this.showImportToast(payload, onAccept);
                return payload;
            }
        } catch (e) {
            console.warn('[Lab10Bus] Error leyendo escenario entrante:', e);
        }
        return null;
    }

    showImportToast(payload, onAccept) {
        const toast = document.createElement('div');
        toast.className = 'glass card';
        toast.style.cssText = `
            position: fixed; top: 70px; left: 50%; transform: translateX(-50%);
            z-index: 9999; padding: 14px 20px; display: flex; align-items: center;
            gap: 15px; border: 1px solid var(--accent); box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            animation: slideDown 0.3s ease;
        `;
        toast.innerHTML = `
            <div>
                <strong style="color:var(--accent);">Escenario recibido de ${payload.sourceLab}</strong>
                <p style="font-size:0.8rem; margin-top:2px; opacity:0.85;">¿Deseas cargar las entidades físicas transferidas?</p>
            </div>
            <div style="display:flex; gap:8px;">
                <button id="btn-import-yes" class="btn btn-primary" style="padding:6px 12px; font-size:0.8rem;">Cargar</button>
                <button id="btn-import-no" class="btn" style="padding:6px 12px; font-size:0.8rem;">Descartar</button>
            </div>
        `;

        document.body.appendChild(toast);

        toast.querySelector('#btn-import-yes').onclick = () => {
            toast.remove();
            localStorage.removeItem('lab10_scenario_transfer');
            if (typeof onAccept === 'function') onAccept(payload.data);
            this.emitTelemetry('SCENARIO_IMPORTED', { from: payload.sourceLab });
        };

        toast.querySelector('#btn-import-no').onclick = () => {
            toast.remove();
            localStorage.removeItem('lab10_scenario_transfer');
        };
    }

    // ── Inyector del Boton 'Continuar en...' ─────────────────────────────────
    injectContinueButton(containerEl, targetUrl, targetName, getScenarioDataFn) {
        if (!containerEl) return;

        const btn = document.createElement('button');
        btn.className = 'btn btn-primary';
        btn.style.cssText = 'width:100%; justify-content:center; margin-top:12px; font-weight:700;';
        btn.innerHTML = `<i class="ph ph-arrow-square-out" style="font-size:1.1rem;"></i> Continuar en ${targetName}`;

        btn.onclick = () => {
            const data = typeof getScenarioDataFn === 'function' ? getScenarioDataFn() : {};
            this.exportScenario(targetUrl, data, targetName);
            window.location.href = targetUrl;
        };

        containerEl.appendChild(btn);
    }

    // ── Telemetria Estandarizada ─────────────────────────────────────────────
    emitTelemetry(action, details = {}) {
        try {
            if (window !== window.parent) {
                window.parent.postMessage({
                    type: 'SIM_TELEMETRY',
                    action: action,
                    details: details,
                    simulatorPath: window.location.pathname
                }, '*');
            }
        } catch (_) {}
    }

    handleBroadcast(data) {
        this.listeners.forEach(cb => {
            try { cb(data); } catch (_) {}
        });
    }

    onBroadcast(callback) {
        if (typeof callback === 'function') this.listeners.push(callback);
    }
}

export const lab10Bus = new Lab10Bus();
window.lab10Bus = lab10Bus;
