// js/physics-engine.js
// Motor de simulación física 2D para calcular campos eléctricos y líneas de fuerza.

class Charge {
    constructor(x, y, q) {
        this.x = x;
        this.y = y;
        this.q = q; // Carga en Coulombs (ej: +1 o -1 para simplificar)
        this.radius = 15;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.q > 0 ? '#ef4444' : '#3b82f6';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.q > 0 ? '+' : '-', this.x, this.y);
    }
}

class PhysicsSimulation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.charges = [];
        
        // Estado de interaccion
        this.isDragging = false;
        this.draggedCharge = null;

        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Eventos
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('mouseleave', this.onMouseUp.bind(this));

        // Iniciar loop
        this.render();
    }

    resize() {
        // Ajustar resolución del canvas para pantallas retina (DPI)
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height || 400;
        this.render();
    }

    addCharge(q) {
        // Colocar carga en el centro
        const x = this.canvas.width / 2 + (Math.random() * 50 - 25);
        const y = this.canvas.height / 2 + (Math.random() * 50 - 25);
        this.charges.push(new Charge(x, y, q));
        this.render();
    }

    clearCharges() {
        this.charges = [];
        this.render();
    }

    // Calcula el vector de campo eléctrico E en un punto (x, y)
    // E = k * q / r^2 * r_hat
    getElectricField(x, y) {
        let Ex = 0;
        let Ey = 0;
        const k = 8.99e9; // Constante de Coulomb (simulada/escalada visualmente)
        // Para visualización, usaremos un k arbitrario para evitar vectores microscópicos
        const visual_k = 10000;

        for (const charge of this.charges) {
            const dx = x - charge.x;
            const dy = y - charge.y;
            const r2 = dx*dx + dy*dy;
            
            // Evitar singularidad matemática justo en la carga
            if (r2 < 100) continue; 
            
            const r = Math.sqrt(r2);
            const E_mag = (visual_k * charge.q) / r2;
            
            Ex += E_mag * (dx / r);
            Ey += E_mag * (dy / r);
        }
        return { Ex, Ey };
    }

    // Dibuja una cuadrícula de vectores (campo vectorial)
    drawVectorField() {
        if (this.charges.length === 0) return;

        const resolution = 30; // Distancia entre vectores
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        this.ctx.lineWidth = 1;

        for (let x = resolution/2; x < this.canvas.width; x += resolution) {
            for (let y = resolution/2; y < this.canvas.height; y += resolution) {
                const E = this.getElectricField(x, y);
                const E_mag = Math.sqrt(E.Ex*E.Ex + E.Ey*E.Ey);
                
                if (E_mag < 0.01) continue; // Campo muy débil

                // Normalizar y escalar para la vista
                const maxLen = resolution * 0.8;
                let scale = Math.min(E_mag, 10) * 3; // Escala no lineal para ver mejor
                if (scale > maxLen) scale = maxLen;

                const dirX = (E.Ex / E_mag) * scale;
                const dirY = (E.Ey / E_mag) * scale;

                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.lineTo(x + dirX, y + dirY);
                this.ctx.stroke();
                
                // Dibujar flechita
                this.ctx.beginPath();
                this.ctx.arc(x + dirX, y + dirY, 1.5, 0, Math.PI * 2);
                this.ctx.fillStyle = 'rgba(255,255,255,0.7)';
                this.ctx.fill();
            }
        }
    }

    render() {
        if (!this.ctx) return;

        // Limpiar
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Fondo oscuro para contraste de laboratorio
        this.ctx.fillStyle = '#0f172a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibujar campo vectorial
        this.drawVectorField();

        // Dibujar cargas encima
        for (const charge of this.charges) {
            charge.draw(this.ctx);
        }
    }

    // Manejo del ratón
    onMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        for (const charge of this.charges) {
            const dx = mx - charge.x;
            const dy = my - charge.y;
            if (dx*dx + dy*dy <= charge.radius * charge.radius) {
                this.isDragging = true;
                this.draggedCharge = charge;
                break;
            }
        }
    }

    onMouseMove(e) {
        if (!this.isDragging || !this.draggedCharge) return;
        const rect = this.canvas.getBoundingClientRect();
        this.draggedCharge.x = e.clientX - rect.left;
        this.draggedCharge.y = e.clientY - rect.top;
        this.render(); // Redibujar en vivo 60fps
    }

    onMouseUp() {
        this.isDragging = false;
        this.draggedCharge = null;
    }
}

// Inicializar y exponer al window para los botones
window.initPhysicsEngine = function() {
    window.physicsSim = new PhysicsSimulation('physics-canvas');

    const btnPos = document.getElementById('btn-add-pos');
    const btnNeg = document.getElementById('btn-add-neg');
    const btnClr = document.getElementById('btn-clear-canvas');

    if(btnPos) btnPos.addEventListener('click', () => window.physicsSim.addCharge(1));
    if(btnNeg) btnNeg.addEventListener('click', () => window.physicsSim.addCharge(-1));
    if(btnClr) btnClr.addEventListener('click', () => window.physicsSim.clearCharges());
};

// Autoiniciar si el canvas existe al cargar
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('physics-canvas')) {
        window.initPhysicsEngine();
    }
});
