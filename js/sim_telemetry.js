// ============================================================
// SIMULATOR TELEMETRY SCRIPT
// Este script se inyecta en los simuladores para rastrear la interacción 
// del estudiante y enviarla al cerebro (app.js) sin necesidad de cargar 
// Firebase o Auth en cada simulador por separado.
// ============================================================

(function() {
    // Si no estamos dentro de un iframe que tiene parent, no hacemos nada.
    if (window === window.parent) return;

    function sendTelemetry(action, details = {}) {
        try {
            // Se envía el mensaje al contenedor principal (index.html)
            window.parent.postMessage({
                type: 'SIM_TELEMETRY',
                action: action,
                details: details,
                simulatorPath: window.location.pathname
            }, '*');
        } catch (e) {
            console.error('Error enviando telemetría al sistema principal:', e);
        }
    }

    // 1. Rastrear clicks en botones importantes (Validar, Analizar, etc.)
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('button');
        if (btn) {
            const btnText = btn.innerText.trim();
            const btnId = btn.id || 'btn-anonimo';
            
            // Filtramos botones muy genéricos si queremos, pero por ahora rastreamos todos
            sendTelemetry('button_click', {
                buttonId: btnId,
                buttonText: btnText
            });
        }
    });

    // 2. Rastrear interacción general con el Canvas (dibujar, mover)
    let lastCanvasInteraction = 0;
    document.addEventListener('mouseup', function(e) {
        if (e.target.tagName.toLowerCase() === 'canvas') {
            const now = Date.now();
            // Limitar el envío a 1 vez por segundo para no saturar
            if (now - lastCanvasInteraction > 1000) {
                lastCanvasInteraction = now;
                sendTelemetry('canvas_interaction', {
                    x: e.clientX,
                    y: e.clientY
                });
            }
        }
    });

    // 3. Notificar que el simulador ha terminado de cargar exitosamente
    window.addEventListener('load', function() {
        sendTelemetry('simulator_loaded', { title: document.title });
    });

    // Exponer función de telemetría a nivel global por si el simulador 
    // quiere enviar métricas específicas personalizadas en un futuro.
    window._sendSimTelemetry = sendTelemetry;
})();
