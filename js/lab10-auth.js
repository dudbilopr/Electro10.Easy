// ==========================================================================
// Lab10 Auth & Session Bridge — Electro10.Easy
// Centraliza autenticacion, sincronizacion de sesion con el portal principal
// y previene modales bloqueantes dentro de iframes.
// ==========================================================================

import { auth } from './firebase.js';
import { 
    onAuthStateChanged, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signInWithRedirect, 
    signOut 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

class Lab10Auth {
    constructor() {
        this.isInIframe = window !== window.parent;
        this.user = null;
        this.uid = null;
        this.isAuthenticated = this.isInIframe; // En iframe asumimos sesion activa del portal
        this.subscribers = [];

        this.init();
    }

    init() {
        // 1. Escuchar mensajes del portal principal (index.html)
        window.addEventListener('message', (e) => {
            if (!e.data) return;

            if (e.data.type === 'SYNC_UID') {
                this.uid = e.data.uid;
                this.isAuthenticated = true;
                this.notifySubscribers();
                this.updateUI();
            }

            if (e.data.type === 'THEME_SYNC') {
                this.applyTheme(e.data.theme);
            }
        });

        // 2. Si estamos en iframe, solicitar UID al padre y ocultar modales de login
        if (this.isInIframe) {
            try {
                window.parent.postMessage({ type: 'REQUEST_UID' }, '*');
            } catch (_) {}
            
            // Ocultar cualquier modal de autenticacion residual
            window.addEventListener('DOMContentLoaded', () => {
                const modal = document.getElementById('auth-modal');
                if (modal) modal.style.display = 'none';
                const overlay = document.querySelector('.modal-overlay');
                if (overlay) overlay.style.display = 'none';
            });
        }

        // 3. Escuchar estado nativo de Firebase Auth
        try {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.user = user;
                    this.uid = user.uid;
                    this.isAuthenticated = true;
                } else if (!this.isInIframe) {
                    this.user = null;
                    this.uid = null;
                    this.isAuthenticated = false;
                }
                this.notifySubscribers();
                this.updateUI();
            });
        } catch (err) {
            console.warn('[Lab10Auth] Firebase Auth listener:', err);
        }

        // 4. Inicializar sincronizacion de tema
        this.initTheme();
    }

    onAuthChange(callback) {
        if (typeof callback === 'function') {
            this.subscribers.push(callback);
            callback(this.isAuthenticated, this.user, this.uid);
        }
    }

    notifySubscribers() {
        this.subscribers.forEach(cb => {
            try { cb(this.isAuthenticated, this.user, this.uid); } catch (_) {}
        });
    }

    updateUI() {
        const userInfoBtn = document.getElementById('user-info');
        const logoutBtn = document.getElementById('btn-logout');
        const userStats = document.getElementById('user-stats');

        if (this.isAuthenticated) {
            const displayName = this.user?.displayName || 'Estudiante UNAB';
            if (userInfoBtn) userInfoBtn.innerText = displayName;
            if (logoutBtn && !this.isInIframe) logoutBtn.style.display = 'inline-flex';
            if (userStats) userStats.style.display = 'inline-flex';
        } else {
            if (userInfoBtn) userInfoBtn.innerText = 'Iniciar Sesión';
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    }

    async loginGoogle() {
        if (this.isInIframe) {
            // Notificar al portal principal para abrir login central
            window.parent.postMessage({ type: 'TRIGGER_LOGIN' }, '*');
            return;
        }

        const provider = new GoogleAuthProvider();
        try {
            const res = await signInWithPopup(auth, provider);
            return res.user;
        } catch (err) {
            console.warn('[Lab10Auth] Popup bloqueado, intentando redirect:', err);
            try {
                await signInWithRedirect(auth, provider);
            } catch (redirErr) {
                console.error('[Lab10Auth] Error en redirect login:', redirErr);
            }
        }
    }

    async logout() {
        try {
            await signOut(auth);
            this.user = null;
            this.uid = null;
            this.isAuthenticated = false;
            this.notifySubscribers();
            this.updateUI();
        } catch (e) {
            console.error('[Lab10Auth] Error al cerrar sesión:', e);
        }
    }

    // ── Gestion de Tema Dia / Noche ─────────────────────────────────────────
    initTheme() {
        const savedTheme = localStorage.getItem('lab10_theme') || 'light';
        this.applyTheme(savedTheme);
    }

    toggleTheme() {
        const currentIsDark = document.body.classList.contains('dark-mode');
        const newTheme = currentIsDark ? 'light' : 'dark';
        this.applyTheme(newTheme);
        localStorage.setItem('lab10_theme', newTheme);

        // Notificar al padre si estamos en iframe
        if (this.isInIframe) {
            try {
                window.parent.postMessage({ type: 'THEME_CHANGED', theme: newTheme }, '*');
            } catch (_) {}
        }
    }

    applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
        }
    }
}

export const lab10Auth = new Lab10Auth();
window.lab10Auth = lab10Auth;
window.toggleTheme = () => lab10Auth.toggleTheme();
