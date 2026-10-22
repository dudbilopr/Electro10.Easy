// ============================================================
// js/seguimiento.js
// Registro y lectura de los datos de seguimiento del estudiante:
// ingresos, minutos por día y resultados de los simuladores.
// Todo vive en artifacts/{APP_ID}/users/{uid}/stats/data y en
// la subcolección simulator_telemetry (que ya llenaba app.js).
// ============================================================
import { doc, setDoc, increment } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { db } from './firebase.js';
import { APP_ID } from '../config/firebase.config.js';

// Fecha local AAAA-MM-DD (clave de los mapas por día)
export function claveDia(d = new Date()) {
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

const statsRef = (uid) => doc(db, 'artifacts', APP_ID, 'users', uid, 'stats', 'data');

// Un ingreso por sesión del navegador (recargar la página no cuenta como otro ingreso).
export async function registrarIngreso(uid) {
    const k = 'e10_ingreso_' + uid;
    try { if (sessionStorage.getItem(k)) return; sessionStorage.setItem(k, '1'); } catch (_) {}
    const ahora = Date.now();
    try {
        await setDoc(statsRef(uid), { lastLogin: ahora, loginCount: increment(1), ingresosPorDia: { [claveDia()]: increment(1) } }, { merge: true });
    } catch (e) { /* sin conexión */ }
    // Copia en el directorio público para que el panel docente lo lea sin abrir cada perfil.
    try {
        await setDoc(doc(db, 'artifacts', APP_ID, 'public', 'data', 'directory', uid), { lastLogin: ahora }, { merge: true });
    } catch (e) { /* reglas de Firestore */ }
}

// Un minuto de estudio activo: total y por día.
export async function sumarMinuto(uid) {
    try {
        await setDoc(statsRef(uid), { totalTimeMinutes: increment(1), minutosPorDia: { [claveDia()]: increment(1) } }, { merge: true });
    } catch (e) { /* sin conexión */ }
}

// Códigos de error que envían los simuladores al comprobar un reto (SIM_TELEMETRY · accion «comprobar»).
export const ERRORES = {
    campo_radial: 'Dibujó B hacia el hilo (debe rodearlo)',
    sentido_invertido: 'Sentido del campo invertido',
    suma_magnitudes: 'Sumó magnitudes en vez de vectores',
    falta_superponer: 'Contó un solo hilo (faltó superponer)',
    cancelacion: 'No vio la cancelación por simetría',
    hilo_infinito_en_segmento: 'Usó el hilo infinito en un segmento',
    prolongacion: 'Campo distinto de cero en la prolongación',
    b0_medios: 'B₀/2 en lugar de B₀/(2√2) en z = R',
    grados: 'Ángulo del arco en grados',
    faltan_vueltas: 'Olvidó multiplicar por N vueltas',
    angulo_brujula: 'Ángulo de la brújula mal calculado',
    regla_mano_derecha: 'Regla de la mano derecha',
    unidades: 'Unidades (cm → m)',
    otro: 'Otro error',
};
