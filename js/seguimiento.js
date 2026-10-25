// ============================================================
// js/seguimiento.js
// Registro y lectura de los datos de seguimiento del estudiante:
// ingresos, minutos por día y resultados de los simuladores.
// Todo vive en artifacts/{APP_ID}/users/{uid}/stats/data y en
// la subcolección simulator_telemetry (que ya llenaba app.js).
// ============================================================
import { doc, setDoc, getDoc, getDocs, collection, query, where, increment } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
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
    // AmpèreLab (capítulo 10)
    circulacion_cero: 'Creyó que circulación nula implica B = 0',
    corriente_encerrada: 'Predijo cero con corriente neta encerrada',
    signo_corriente: 'Signo de la corriente encerrada',
    suma_sin_signo: 'Sumó corrientes encerradas sin signo',
    corriente_fuera: 'Contó un hilo fuera del camino',
    falta_mu0: 'Olvidó multiplicar por μ₀',
    corriente_total_dentro: 'Usó toda la corriente dentro del conductor',
    region_equivocada: 'Forma de B(r) equivocada para la región',
    coaxial_fuera: 'Campo no nulo fuera del coaxial',
    n_por_N: 'Usó N en lugar de n = N/L',
    ideal_en_extremo: 'Campo ideal en el extremo del solenoide',
    campo_fuera_solenoide: 'Campo fuera del solenoide',
    toroide_radio_medio: 'Usó el radio medio del toroide',
    toroide_fuera: 'Campo no nulo fuera del núcleo del toroide',
    // LorentzLab (capítulo 8)
    lorentz_paralelo: 'Fuerza no nula con v (o el hilo) paralelo a B',
    lorentz_fuerza_nula: 'Creyó que no había fuerza magnética',
    lorentz_perpendicular: 'Fuerza no perpendicular a v y a B',
    lorentz_paralela_v: 'Dibujó la fuerza a lo largo de v',
    signo_carga: 'Ignoró el signo negativo de la carga',
    mano_derecha_lorentz: 'Regla de la mano derecha en F = q v × B',
    sentido_giro: 'Sentido de giro de la partícula',
    falta_seno: 'Olvidó el factor sen θ',
    falta_carga: 'Olvidó multiplicar por la carga',
    v_perp: 'Usó v en lugar de v⊥ en la hélice',
    radio_por_diametro: 'Dio R en lugar de 2R en el espectrómetro',
    b_sobre_e: 'Invirtió el cociente v = E/B',
    selector_equilibrio: 'Equilibrio de fuerzas en el selector',
    par_nulo: 'Par nulo con μ paralelo a B',
    sentido_par: 'Sentido de giro de la espira',
    cos_en_par: 'Usó cos φ en el par de la espira',
    // FaradayLab (capítulo 11)
    flujo_constante: 'Confundió flujo grande con flujo que cambia',
    lenz_sentido: 'Sentido de la corriente inducida (Lenz)',
    delta_b: 'Usó B final en lugar de ΔB',
    coseno_flujo: 'Ángulo del flujo (cos φ con la normal)',
    flujo_vs_fem: 'Dio el flujo en lugar de la fem',
    fem_vs_corriente: 'Dio la fem en lugar de la corriente',
    fem_max_posicion: 'Posición de la fem máxima del generador',
    omega_f: 'Usó f en lugar de ω = 2πf',
    eficaz_pico: 'Dio el valor eficaz en lugar del pico',
    // CoulombLab (capítulo 1)
    coulomb_pocas_cargas: 'Comprobó con menos de dos cargas',
    coulomb_sin_vectores: 'No dibujó ninguna fuerza',
    coulomb_sin_origen: 'Dibujó una fuerza que no sale de una carga',
    coulomb_atraccion_repulsion: 'Confundió atracción y repulsión',
    coulomb_fuera_de_recta: 'Fuerza fuera de la recta que une las cargas',
    coulomb_falta_fuerza: 'Faltó una fuerza (superposición incompleta)',
    // VectorFieldLab (capítulo 2)
    campo_sentido_negativa: 'Campo en sentido invertido (debe ir hacia las cargas negativas)',
    campo_una_carga: 'Contó el campo de una sola carga',
    campo_suma_modulos: 'Sumó módulos de campo en vez de vectores',
    campo_inverso_r: 'Usó 1/r en lugar de 1/r²',
    campo_direccion: 'Dirección del campo neto mal estimada',
    dipolo_direccion: 'Dirección del campo del dipolo respecto de p',
    dipolo_aprox: 'Usó la aproximación lejana donde no vale',
    dipolo_factor2: 'Confundió las fórmulas del eje y de la mediatriz',
    dipolo_r2: 'Trató el dipolo como una carga puntual (1/r²)',
    torque_sentido: 'Sentido de giro del dipolo',
    torque_coseno: 'Usó cos φ en el torque (va con sen φ)',
    torque_sin_d: 'Olvidó la separación en p = q d',
    haz_sentido: 'Sentido de la desviación según el signo de la carga',
    haz_medio: 'Olvidó el ½ en y = ½ a t²',
    haz_masa: 'Usó la masa de otra partícula',
    // EquipotentialLab (capítulo 3 · potencial eléctrico)
    potencial_v_vs_u: 'Confundió el potencial V con la energía potencial U',
    potencial_signo: 'Signo de ΔV (integró el campo al revés)',
    potencial_r2: 'Usó 1/r² en lugar de 1/r para el potencial',
    potencial_suma_vectores: 'Sumó potenciales como vectores (es suma escalar)',
    potencial_v0_e0: 'Creyó que V = 0 implica E = 0',
    potencial_signo_carga: 'Ignoró el signo de la carga en V = kq/r',
    potencial_ed_signo: 'Signo en ΔV = Ed (baja hacia donde apunta E)',
    potencial_equip_perp: 'Dibujó equipotenciales no perpendiculares a E',
    potencial_ev_vs_v: 'Confundió electrón-volt (energía) con volt (potencial)',
    potencial_r_distancia: 'Usó la distancia equivocada en la superposición',
    // ContinuousDistLab (capítulo 4 · distribuciones continuas de carga)
    m4_dq_densidad: 'Eligió mal el diferencial dq (λ dl vs σ dA)',
    m4_limites: 'Límites de integración equivocados',
    m4_distancia_r: 'Distancia r al punto mal calculada',
    m4_cancelacion: 'No vio la cancelación por simetría',
    m4_proyeccion: 'Olvidó la proyección cos θ de dE',
    m4_trig: 'Error en la sustitución trigonométrica',
    m4_plano_infinito_disco: 'Usó el plano infinito para un disco finito',
    m4_varilla_infinita: 'Usó la varilla infinita para una varilla finita',
    m4_limite_z_R: 'No comprobó el límite z≫R (carga puntual)',
    m4_unidades: 'Unidades (cm → m)',
    // GaussLab (módulo 5 · ley de Gauss)
    gauss_qenc: 'Olvidó que solo la carga encerrada contribuye al flujo',
    gauss_carga_externa: 'Contó una carga fuera de la superficie',
    gauss_cilindro_r: 'Usó el radio equivocado en E=λ/(2πε0·r)',
    gauss_lamina_factor2: 'Confundió σ/(2ε0) con σ/ε0',
    gauss_conductor_interior: 'Puso E≠0 dentro del conductor',
    gauss_superficie: 'Eligió mal la superficie gaussiana',
    otro: 'Otro error',
};

// ── Lectura y cálculo de métricas ────────────────────────────

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const fmtMin = (m) => { m = Math.round(m || 0); const h = Math.floor(m / 60); return h ? `${h} h ${String(m % 60).padStart(2, '0')} min` : `${m} min`; };
const sinModulo = (t) => String(t || '').replace(/^Módulo\s*\d+:\s*/, '');

export async function leerStats(uid) {
    try { const s = await getDoc(statsRef(uid)); return s.exists() ? s.data() : {}; } catch (e) { return {}; }
}

// Resultados de «Comprobar» de los últimos `dias` días (sin orderBy: no exige índice compuesto).
export async function leerComprobaciones(uid, dias = 60) {
    try {
        const q = query(collection(db, 'artifacts', APP_ID, 'users', uid, 'simulator_telemetry'), where('action', '==', 'comprobar'));
        const snap = await getDocs(q), desde = Date.now() - dias * 864e5, out = [];
        snap.forEach((d) => { const x = d.data(); const t = Date.parse(x.timestamp); if (t >= desde) out.push({ ...(x.details || {}), t, sim: x.simulatorPath || '' }); });
        return out;
    } catch (e) { return []; }
}

// Minutos de los últimos n días (hoy incluido) y racha de días seguidos con actividad.
export function actividad(stats, n = 7) {
    const porDia = stats.minutosPorDia || {}, hoy = new Date();
    let semana = 0;
    for (let i = 0; i < n; i++) { const d = new Date(hoy); d.setDate(hoy.getDate() - i); semana += porDia[claveDia(d)] || 0; }
    let racha = 0;
    for (let i = (porDia[claveDia(hoy)] ? 0 : 1); i < 400; i++) { const d = new Date(hoy); d.setDate(hoy.getDate() - i); if (porDia[claveDia(d)]) racha++; else break; }
    return { semana, racha, porDia };
}

// Mapa id de lección → { mi (índice del módulo), mod, titulo, tipo } a partir del currículo.
export function indiceLecciones(curriculoData) {
    const idx = {};
    (curriculoData?.modulos || []).forEach((mod, mi) => mod.lecciones.forEach((lec) => {
        (lec.tipo === 'grupo' ? lec.sublecciones : [lec]).forEach((it) => { idx[it.id] = { mi, mod: mod.titulo, titulo: it.titulo, tipo: it.tipo }; });
    }));
    return idx;
}

// Quiz: entradas de evaluations con puntaje (las autoevaluaciones 1–4 son números y se ignoran).
export function resumenQuiz(evalData, curriculoData) {
    const idx = indiceLecciones(curriculoData), porMod = {};
    Object.entries(evalData || {}).forEach(([id, v]) => {
        if (!v || typeof v !== 'object' || typeof v.score !== 'number' || !idx[id]) return;
        const m = idx[id].mi; (porMod[m] = porMod[m] || { mod: idx[id].mod, scores: [] }).scores.push(v.score);
    });
    const mods = Object.entries(porMod).map(([mi, o]) => ({ mi: +mi, mod: o.mod, score: Math.round(o.scores.reduce((a, b) => a + b, 0) / o.scores.length) })).sort((a, b) => a.mi - b.mi);
    const aprobados = mods.filter((m) => m.score >= 65).length;
    const peor = mods.filter((m) => m.score < 65).sort((a, b) => a.score - b.score)[0] || null;
    return { mods, aprobados, total: mods.length, media: mods.length ? Math.round(mods.reduce((a, m) => a + m.score, 0) / mods.length) : null, peor };
}

export function erroresFrecuentes(comprobaciones) {
    const c = {};
    comprobaciones.filter((x) => !x.ok && x.error).forEach((x) => { c[x.error] = (c[x.error] || 0) + 1; });
    return Object.entries(c).sort((a, b) => b[1] - a[1]).map(([code, n]) => ({ code, n, label: ERRORES[code] || code }));
}

// Escena del simulador donde se practica cada error (para el botón «Practicar»).
const PRACTICA = { campo_radial: 'BiotSavart.html#hilos', sentido_invertido: 'BiotSavart.html#hilos', suma_magnitudes: 'BiotSavart.html#hilos', falta_superponer: 'BiotSavart.html#hilos', cancelacion: 'BiotSavart.html#hilos',
    hilo_infinito_en_segmento: 'BiotSavart.html#segmento', prolongacion: 'BiotSavart.html#segmento', b0_medios: 'BiotSavart.html#espira', grados: 'BiotSavart.html#espira', faltan_vueltas: 'BiotSavart.html#espira', angulo_brujula: 'BiotSavart.html#oersted',
    circulacion_cero: 'Ampere.html#circulacion', corriente_encerrada: 'Ampere.html#circulacion', signo_corriente: 'Ampere.html#circulacion', suma_sin_signo: 'Ampere.html#circulacion', corriente_fuera: 'Ampere.html#circulacion', falta_mu0: 'Ampere.html#circulacion',
    corriente_total_dentro: 'Ampere.html#conductor', region_equivocada: 'Ampere.html#conductor', coaxial_fuera: 'Ampere.html#conductor',
    n_por_N: 'Ampere.html#solenoide', ideal_en_extremo: 'Ampere.html#solenoide', campo_fuera_solenoide: 'Ampere.html#solenoide', toroide_radio_medio: 'Ampere.html#toroide', toroide_fuera: 'Ampere.html#toroide',
    lorentz_paralelo: 'Lorentz.html#fuerza', lorentz_fuerza_nula: 'Lorentz.html#fuerza', lorentz_perpendicular: 'Lorentz.html#fuerza', lorentz_paralela_v: 'Lorentz.html#fuerza', signo_carga: 'Lorentz.html#fuerza',
    mano_derecha_lorentz: 'Lorentz.html#fuerza', falta_seno: 'Lorentz.html#fuerza', falta_carga: 'Lorentz.html#fuerza', sentido_giro: 'Lorentz.html#orbita', v_perp: 'Lorentz.html#orbita',
    radio_por_diametro: 'Lorentz.html#selector', b_sobre_e: 'Lorentz.html#selector', selector_equilibrio: 'Lorentz.html#selector', par_nulo: 'Lorentz.html#conductor', sentido_par: 'Lorentz.html#conductor', cos_en_par: 'Lorentz.html#conductor',
    flujo_constante: 'Faraday.html#flujo', lenz_sentido: 'Faraday.html#iman', delta_b: 'Faraday.html#flujo', coseno_flujo: 'Faraday.html#flujo', flujo_vs_fem: 'Faraday.html#flujo',
    fem_vs_corriente: 'Faraday.html#barra', fem_max_posicion: 'Faraday.html#generador', omega_f: 'Faraday.html#generador', eficaz_pico: 'Faraday.html#generador',
    coulomb_pocas_cargas: 'Coulomb.html', coulomb_sin_vectores: 'Coulomb.html', coulomb_sin_origen: 'Coulomb.html', coulomb_atraccion_repulsion: 'Coulomb.html', coulomb_fuera_de_recta: 'Coulomb.html', coulomb_falta_fuerza: 'Coulomb.html',
    campo_sentido_negativa: 'VectorField.html#campo', campo_una_carga: 'VectorField.html#campo', campo_suma_modulos: 'VectorField.html#campo', campo_inverso_r: 'VectorField.html#campo', campo_direccion: 'VectorField.html#campo',
    dipolo_direccion: 'VectorField.html#dipolo', dipolo_aprox: 'VectorField.html#dipolo', dipolo_factor2: 'VectorField.html#dipolo', dipolo_r2: 'VectorField.html#dipolo',
    torque_sentido: 'VectorField.html#torque', torque_coseno: 'VectorField.html#torque', torque_sin_d: 'VectorField.html#torque', haz_sentido: 'VectorField.html#haz', haz_medio: 'VectorField.html#haz', haz_masa: 'VectorField.html#haz',
    potencial_v_vs_u: 'EquipotentialLab.html#puntual', potencial_r2: 'EquipotentialLab.html#puntual', potencial_suma_vectores: 'EquipotentialLab.html#puntual', potencial_signo_carga: 'EquipotentialLab.html#puntual', potencial_r_distancia: 'EquipotentialLab.html#puntual',
    potencial_v0_e0: 'EquipotentialLab.html#dipolo', potencial_signo: 'EquipotentialLab.html#gradiente', potencial_equip_perp: 'EquipotentialLab.html#gradiente',
    potencial_ed_signo: 'EquipotentialLab.html#placas', potencial_ev_vs_v: 'EquipotentialLab.html#placas',
    m4_dq_densidad: 'ContinuousDistLab.html#varilla', m4_limites: 'ContinuousDistLab.html#varilla', m4_distancia_r: 'ContinuousDistLab.html#anillo', m4_cancelacion: 'ContinuousDistLab.html#anillo', m4_proyeccion: 'ContinuousDistLab.html#varilla', m4_trig: 'ContinuousDistLab.html#varilla',
    m4_plano_infinito_disco: 'ContinuousDistLab.html#disco', m4_varilla_infinita: 'ContinuousDistLab.html#varilla', m4_limite_z_R: 'ContinuousDistLab.html#disco', m4_unidades: 'ContinuousDistLab.html#varilla' };
export const practicaDe = (code) => (PRACTICA[code] ? `simuladores/${PRACTICA[code]}` : null);
const LABS = { Coulomb: 'CoulombLab', VectorField: 'VectorFieldLab', Ampere: 'AmpèreLab', Lorentz: 'LorentzLab', Faraday: 'FaradayLab', BiotSavart: 'BiotSavartLab', EquipotentialLab: 'EquipotentialLab', ContinuousDistLab: 'ContinuousDistLab' };
export const labDe = (code) => LABS[(PRACTICA[code] || '').split('.')[0]] || 'BiotSavartLab';

// ── Portada del estudiante: «Continúa donde ibas» y «Mi semana» ──

export function guardarUltimaLeccion(leccion, modTitulo) {
    try { localStorage.setItem('e10_ultima_leccion', JSON.stringify({ id: leccion.id, titulo: leccion.titulo, mod: modTitulo || '', t: Date.now() })); } catch (_) {}
}

function rutaModulo(mod, progressData) {
    return mod.lecciones.map((lec) => {
        const items = lec.tipo === 'grupo' ? lec.sublecciones : [lec];
        const hechos = items.filter((it) => progressData[it.id]).length;
        const t = lec.titulo.replace(/^\d+\.\s*/, '').split(/[:—–]/)[0].trim();
        return { t: t.length > 26 ? t.slice(0, 25) + '…' : t, done: hechos === items.length, parcial: hechos > 0 && hechos < items.length, primero: items[0].id };
    });
}

export function abrirLeccion(id) {
    const li = document.getElementById('menu-' + id);
    if (!li) return;
    li.closest('.lesson-list')?.classList.remove('collapsed');
    li.closest('.group-list')?.classList.add('expanded');
    li.click();
}

export async function renderPortada({ uid, curriculoData, progressData, evalData }) {
    const box = document.getElementById('e10-continuar'), sem = document.getElementById('e10-mi-semana');
    if (!box || !curriculoData) return;
    const idx = indiceLecciones(curriculoData), ids = Object.keys(idx);
    let ult = null; try { ult = JSON.parse(localStorage.getItem('e10_ultima_leccion')); } catch (_) {}
    let id = ult && idx[ult.id] ? ult.id : null;
    const continuar = !!id;
    if (!id) id = ids.find((k) => !progressData[k]) || ids[0];
    const info = idx[id], mod = curriculoData.modulos[info.mi];
    const ruta = rutaModulo(mod, progressData), items = ids.filter((k) => idx[k].mi === info.mi);
    const pct = items.length ? Math.round(items.filter((k) => progressData[k]).length / items.length * 100) : 0;
    box.innerHTML = `
      <div class="e10-cont__top"><span class="e10-eyebrow">${continuar ? 'Continúa donde ibas' : 'Tu siguiente paso'}</span><span class="e10-chip">Módulo ${info.mi} · ${esc(sinModulo(mod.titulo))}</span></div>
      <h2 class="e10-cont__title">${esc(info.titulo)}</h2>
      <div class="e10-cont__bar"><div class="e10-progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Avance del módulo"><span style="--e10-p:${pct}%"></span></div><span>${pct} % del módulo</span></div>
      <div class="e10-cont__acts"><button type="button" class="e10-btn e10-btn--primary" data-open="${esc(id)}">${continuar ? 'Continuar' : 'Empezar'}</button></div>
      <div class="e10-cont__ruta" aria-label="Ruta del módulo">${ruta.map((r) => `<button type="button" class="e10-cont__paso${r.done ? ' done' : r.parcial ? ' now' : ''}" data-open="${esc(r.primero)}">${r.done ? '✓ ' : ''}${esc(r.t)}</button>`).join('')}</div>`;
    box.querySelectorAll('[data-open]').forEach((b) => b.addEventListener('click', () => abrirLeccion(b.dataset.open)));

    if (!sem) return;
    if (!uid) { sem.innerHTML = '<p class="e10-sem__vacio">Ingresa para ver tu racha, tu tiempo y tus quiz.</p>'; return; }
    const [stats, comp] = await Promise.all([leerStats(uid), leerComprobaciones(uid, 30)]);
    let metaH = 4;
    try { const p = await getDoc(doc(db, 'artifacts', APP_ID, 'users', uid, 'profile', 'data')); const h = parseFloat(p.exists() && p.data().studyHours); if (h > 0) metaH = h; } catch (_) {}
    const act = actividad(stats), qz = resumenQuiz(evalData, curriculoData), errs = erroresFrecuentes(comp);
    const pctMeta = Math.min(100, Math.round(act.semana / (metaH * 60) * 100));
    const top = errs[0], link = top && practicaDe(top.code);
    sem.innerHTML = `
      <div class="bento-header"><h3><span class="material-symbols-outlined text-accent">insights</span> Mi semana</h3><button type="button" class="e10-sem__link" data-avance>Ver mi avance completo →</button></div>
      <div class="e10-sem">
        <div><span class="e10-eyebrow">Racha</span><b>${act.racha} ${act.racha === 1 ? 'día' : 'días'}</b><small>${act.racha ? 'seguidos estudiando' : 'estudia hoy para empezarla'}</small></div>
        <div><span class="e10-eyebrow">Tiempo (7 días)</span><b>${fmtMin(act.semana)}</b><div class="e10-progress" role="progressbar" aria-valuenow="${pctMeta}" aria-valuemin="0" aria-valuemax="100" aria-label="Tiempo frente a la meta"><span style="--e10-p:${pctMeta}%"></span></div><small>de tu meta de ${metaH} h</small></div>
        <div><span class="e10-eyebrow">Quiz aprobados</span><b>${qz.total ? `${qz.aprobados} de ${qz.total}` : '—'}</b><small class="${qz.peor ? 'e10-warn' : ''}">${qz.peor ? `! repasa ${esc(sinModulo(qz.peor.mod))} (${qz.peor.score} %)` : qz.total ? 'todos aprobados' : 'aún no presentas quiz'}</small></div>
        <div><span class="e10-eyebrow">Error más repetido</span><b class="e10-sem__err">${top ? esc(top.label) : 'Ninguno por ahora'}</b>${link ? `<a href="${link}" target="_blank" rel="noopener">Practicar en ${labDe(top.code)}</a>` : `<small>${comp.length ? `${comp.length} comprobaciones sin errores` : 'usa «Comprobar» en los simuladores'}</small>`}</div>
      </div>`;
    sem.querySelector('[data-avance]')?.addEventListener('click', () => window.mostrarMiAvance?.());
}

// ── «Mi avance» del estudiante ───────────────────────────────

const RAMPA = ['var(--e10-grid)', '#e7b3cc', '#cf6f9e', 'var(--e10-primary)', '#7a1849']; // un solo tono, claro → oscuro
const nivel = (m) => (!m ? 0 : m < 20 ? 1 : m < 40 ? 2 : m < 60 ? 3 : 4);

function sumaDias(mapa, dias) {
    const hoy = new Date(); let s = 0;
    for (let i = 0; i < dias; i++) { const d = new Date(hoy); d.setDate(hoy.getDate() - i); s += (mapa || {})[claveDia(d)] || 0; }
    return s;
}

// `datos` ({ stats, comp }) permite dibujar sin leer Firestore (pruebas y vista previa del docente).
export async function renderMiAvance({ uid, curriculoData, progressData, evalData, datos }) {
    const box = document.getElementById('e10-avance');
    if (!box) return;
    if (!uid && !datos) { box.innerHTML = '<p class="e10-sem__vacio">Ingresa para ver tu avance.</p>'; return; }
    box.innerHTML = '<p class="e10-sem__vacio">Calculando tu avance…</p>';
    const [stats, comp] = datos ? [datos.stats || {}, datos.comp || []] : await Promise.all([leerStats(uid), leerComprobaciones(uid, 60)]);
    const act = actividad(stats), qz = resumenQuiz(evalData, curriculoData), errs = erroresFrecuentes(comp);
    const ok = comp.filter((c) => c.ok).length;

    // Calendario: 8 semanas, de lunes a domingo, terminando en la semana actual
    const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    const lunes = new Date(hoy); lunes.setDate(hoy.getDate() - ((hoy.getDay() + 6) % 7) - 7 * 7);
    let celdas = '', activos = 0, mejor = { s: 0, m: 0 };
    for (let w = 0; w < 8; w++) {
        let mSem = 0;
        for (let d = 0; d < 7; d++) {
            const f = new Date(lunes); f.setDate(lunes.getDate() + w * 7 + d);
            const m = act.porDia[claveDia(f)] || 0, fut = f > hoy;
            if (m) activos++; mSem += m;
            celdas += `<span class="e10-cal__d" style="grid-column:${w + 1};grid-row:${d + 1};background:${fut ? 'transparent' : RAMPA[nivel(m)]}" title="${f.toLocaleDateString('es', { day: 'numeric', month: 'short' })}: ${m} min"></span>`;
        }
        if (mSem > mejor.m) mejor = { s: w + 1, m: mSem };
    }

    // Avance por módulo (% de lecciones completadas)
    const idx = indiceLecciones(curriculoData), porMod = {};
    Object.entries(idx).forEach(([id, i]) => { const o = (porMod[i.mi] = porMod[i.mi] || { t: 0, h: 0 }); o.t++; if (progressData[id]) o.h++; });
    const barrasMod = (curriculoData?.modulos || []).map((m, mi) => {
        const o = porMod[mi] || { t: 0, h: 0 }, p = o.t ? Math.round(o.h / o.t * 100) : 0;
        return `<div class="e10-mod" title="${esc(m.titulo)}: ${p} %"><span>${p ? p + '%' : ''}</span><i style="height:${Math.max(p, 2)}%;${p ? '' : 'background:var(--e10-line)'}"></i><b>${mi}</b></div>`;
    }).join('');

    const tile = (k, v, d) => `<section class="bento-card e10-tile"><span class="e10-eyebrow">${k}</span><b>${v}</b><small>${d}</small></section>`;
    box.innerHTML = `
      <div class="e10-tiles">
        ${tile('Racha', `${act.racha} ${act.racha === 1 ? 'día' : 'días'}`, 'seguidos estudiando')}
        ${tile('Últimos 7 días', fmtMin(act.semana), `en 30 días: ${fmtMin(sumaDias(stats.minutosPorDia, 30))}`)}
        ${tile('Ingresos', String(sumaDias(stats.ingresosPorDia, 30)), stats.lastLogin ? `en 30 días · último ${new Date(stats.lastLogin).toLocaleDateString('es', { day: 'numeric', month: 'short' })}` : 'en 30 días')}
        ${tile('Quiz aprobados', qz.total ? `${qz.aprobados} de ${qz.total}` : '—', qz.media !== null ? `dominio medio ${qz.media} %` : 'aún no presentas quiz')}
        ${tile('Retos de simulador', comp.length ? `${ok} de ${comp.length}` : '—', comp.length ? 'correctos en 60 días' : 'usa «Comprobar» en los simuladores')}
      </div>
      <div class="e10-grid2">
        <section class="bento-card">
          <div class="bento-header"><h3>Actividad de las últimas 8 semanas</h3></div>
          <div class="e10-cal"><div class="e10-cal__dias"><span>lun</span><span></span><span>mié</span><span></span><span>vie</span><span></span><span>dom</span></div><div class="e10-cal__g">${celdas}</div>
            <div class="e10-cal__txt"><span><b>${activos} de 56 días</b> con actividad.${mejor.m ? ` Tu mejor semana fue la ${mejor.s} (${fmtMin(mejor.m)}).` : ''}</span>
            <span class="e10-cal__ley">0 min ${RAMPA.map((c) => `<i style="background:${c}"></i>`).join('')} 60+ min</span></div></div>
        </section>
        <section class="bento-card">
          <div class="bento-header"><h3>Avance por módulo</h3></div>
          <div class="e10-mods">${barrasMod}</div>
          <small class="e10-nota">% de lecciones completadas por módulo (0 = diagnóstico de presaberes).</small>
        </section>
        <section class="bento-card">
          <div class="bento-header"><h3>Dominio en los quiz</h3></div>
          ${qz.mods.length ? qz.mods.map((m) => `<div class="e10-q"><span>M${m.mi} · ${esc(sinModulo(m.mod))}</span><div class="e10-q__bar"><i style="width:${m.score}%"></i><em></em></div><b>${m.score} %</b><span class="e10-q__st ${m.score >= 65 ? 'ok' : 'rep'}">${m.score >= 65 ? '✓ aprobado' : '! repasar'}</span></div>`).join('') + '<small class="e10-nota">La línea marca el 65 % que aprueba el quiz.</small>'
              : '<p class="e10-sem__vacio">Cuando presentes un quiz, aquí verás tu dominio por módulo.</p>'}
        </section>
        <section class="bento-card">
          <div class="bento-header"><h3>Tus errores más frecuentes</h3></div>
          ${errs.length ? errs.slice(0, 5).map((e) => `<div class="e10-e"><span>${esc(e.label)}</span><div class="e10-q__bar"><i style="width:${e.n / errs[0].n * 100}%"></i></div><b>${e.n}</b></div>`).join('')
              : `<p class="e10-sem__vacio">${comp.length ? 'Sin errores en tus comprobaciones recientes.' : 'Cuando uses «Comprobar» en los laboratorios (LorentzLab, BiotSavartLab, AmpèreLab…), aquí verás qué errores repites.'}</p>`}
          ${errs[0] && practicaDe(errs[0].code) ? `<div class="e10-tip"><span class="e10-tip__title">Siguiente paso recomendado</span>Practica «${esc(errs[0].label)}» en ${labDe(errs[0].code)}. <a href="${practicaDe(errs[0].code)}" target="_blank" rel="noopener">Practicar →</a></div>` : ''}
        </section>
      </div>`;
}

// ── «Seguimiento del curso» (panel docente) ──────────────────

const DIA = 864e5;

// Lee directorio + datos de cada estudiante. Las lecturas de un estudiante que fallan no detienen el resto.
async function leerCurso() {
    const dir = await getDocs(collection(db, 'artifacts', APP_ID, 'public', 'data', 'directory'));
    const lista = [];
    dir.forEach((d) => { const x = d.data(); if (x.role !== 'teacher') lista.push({ uid: d.id, name: x.name || '', email: x.email || '', dirLogin: x.lastLogin || null }); });
    const leer = async (uid, col) => { try { const s = await getDoc(doc(db, 'artifacts', APP_ID, 'users', uid, col, 'data')); return s.exists() ? s.data() : {}; } catch (e) { return {}; } };
    return Promise.all(lista.map(async (e) => {
        const [stats, progress, evals, comp] = await Promise.all([leerStats(e.uid), leer(e.uid, 'progress'), leer(e.uid, 'evaluations'), leerComprobaciones(e.uid, 30)]);
        return { ...e, stats, progress, evals, comp };
    }));
}

function filaEstudiante(e, curriculoData, totalLessons, ahora) {
    const last = e.stats.lastLogin || e.dirLogin || null;
    const dias = last ? Math.floor((ahora - last) / DIA) : null;
    const ing = sumaDias(e.stats.ingresosPorDia, 30);
    const tiene30 = !!e.stats.minutosPorDia;
    const min = tiene30 ? sumaDias(e.stats.minutosPorDia, 30) : (e.stats.totalTimeMinutes || 0);
    const hechas = Object.keys(e.progress).filter((k) => e.progress[k]).length;
    const avance = totalLessons ? Math.round(hechas / totalLessons * 100) : 0;
    const qz = resumenQuiz(e.evals, curriculoData);
    let estado = 'ok', motivo = 'Al día';
    if (dias === null || dias >= 7) { estado = 'riesgo'; motivo = dias === null ? 'Sin ingresos registrados' : `Sin ingresar ${dias} días`; }
    else if (qz.media !== null && qz.media < 65) { estado = 'atencion'; motivo = `Dominio bajo (${qz.media} %)`; }
    return { ...e, last, dias, ing, min, tiene30, avance, dominio: qz.media, estado, motivo };
}

const haceTexto = (d) => (d === null ? '—' : d === 0 ? 'hoy' : d === 1 ? 'ayer' : `hace ${d} días`);

export async function cargarSeguimientoDocente({ curriculoData, totalLessons, datos }) {
    const box = document.getElementById('e10-seguimiento');
    if (!box) return;
    box.innerHTML = '<p class="e10-sem__vacio">Cargando el seguimiento del curso…</p>';
    let crudo;
    try { crudo = datos || await leerCurso(); }
    catch (e) { box.innerHTML = '<p class="e10-sem__vacio">No se pudo leer el directorio (reglas de Firestore o conexión).</p>'; return; }
    const ahora = Date.now();
    const filas = crudo.map((e) => filaEstudiante(e, curriculoData, totalLessons, ahora));
    const n = filas.length;
    const activos = filas.filter((f) => f.dias !== null && f.dias < 7).length;
    const ingresos30 = filas.reduce((a, f) => a + f.ing, 0);
    const minMedio = n ? filas.reduce((a, f) => a + f.min, 0) / n : 0;
    const avMedio = n ? Math.round(filas.reduce((a, f) => a + f.avance, 0) / n) : 0;
    const riesgo = filas.filter((f) => f.estado === 'riesgo').length;

    // Ingresos por día (30 días): suma de todos los estudiantes
    const dias = [];
    for (let i = 29; i >= 0; i--) { const d = new Date(ahora - i * DIA); const k = claveDia(d); dias.push({ k, d, v: filas.reduce((a, f) => a + ((f.stats.ingresosPorDia || {})[k] || 0), 0) }); }
    const maxIng = Math.max(1, ...dias.map((x) => x.v));

    // Errores del grupo: % de estudiantes que tuvieron cada error al menos una vez (30 días)
    const conErr = {};
    filas.forEach((f) => { new Set(f.comp.filter((c) => !c.ok && c.error).map((c) => c.error)).forEach((c) => { conErr[c] = (conErr[c] || 0) + 1; }); });
    const errs = Object.entries(conErr).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([c, k]) => ({ c, label: ERRORES[c] || c, pct: n ? Math.round(k / n * 100) : 0 }));

    const mods = curriculoData?.modulos || [];
    const tile = (k, v, d) => `<section class="bento-card e10-tile"><span class="e10-eyebrow">${k}</span><b>${v}</b><small>${d}</small></section>`;
    box.innerHTML = `
      <div class="e10-seg__top"><h2>Seguimiento del curso</h2>
        <label>Módulo <select id="e10-seg-mod" class="form-input">${mods.map((m, i) => `<option value="${i}">${i} · ${esc(sinModulo(m.titulo))}</option>`).join('')}</select></label>
        <span class="e10-seg__sp"></span><button type="button" class="e10-btn" id="e10-seg-csv">Exportar CSV</button></div>
      <div class="e10-tiles">
        ${tile('Activos (7 días)', n ? `${activos} de ${n}` : '—', n ? `${Math.round(activos / n * 100)} % del grupo` : 'sin estudiantes en el directorio')}
        ${tile('Ingresos (30 días)', String(ingresos30), n ? `${(ingresos30 / n).toFixed(1).replace('.', ',')} por estudiante` : '')}
        ${tile('Tiempo medio', fmtMin(minMedio), 'por estudiante en 30 días')}
        ${tile('Avance medio', `${avMedio} %`, 'de las lecciones del curso')}
        ${tile('En riesgo', String(riesgo), 'sin ingresar 7+ días o sin registro')}
      </div>
      <div class="e10-grid2">
        <section class="bento-card">
          <div class="bento-header"><h3>Ingresos por día</h3></div>
          ${ingresos30 ? `<div class="e10-ing" role="img" aria-label="Ingresos de los últimos 30 días">${dias.map((x) => `<i style="height:${x.v / maxIng * 100}%" title="${x.d.toLocaleDateString('es', { day: 'numeric', month: 'short' })}: ${x.v} ingresos"></i>`).join('')}</div>
            <div class="e10-ing__ej"><span>hace 30 días</span><span>máx. ${maxIng} en un día</span><span>hoy</span></div>`
            : '<p class="e10-sem__vacio">Aún no hay ingresos registrados: el registro empezó con esta versión del portal.</p>'}
        </section>
        <section class="bento-card">
          <div class="bento-header"><h3>Ruta del módulo</h3></div>
          <div id="e10-seg-ruta"></div>
        </section>
        <section class="bento-card e10-seg__tabla">
          <div class="bento-header"><h3>Estudiantes</h3><div class="e10-seg__fil"><button type="button" class="e10-btn on" data-f="todos">Todos · ${n}</button><button type="button" class="e10-btn" data-f="riesgo">En riesgo · ${riesgo}</button></div></div>
          <div class="e10-seg__scroll"><table><thead><tr><th>Estudiante</th><th>Último ingreso</th><th>Ingresos 30 d</th><th>Avance</th><th>Tiempo 30 d</th><th>Dominio quiz</th><th>Estado</th><th></th></tr></thead><tbody id="e10-seg-tb"></tbody></table></div>
          ${filas.some((f) => !f.tiene30) ? '<small class="e10-nota">* Tiempo total acumulado: ese estudiante no ha estudiado desde que empezó el registro por día.</small>' : ''}
        </section>
        <section class="bento-card">
          <div class="bento-header"><h3>Errores más frecuentes del grupo</h3></div>
          ${errs.length ? errs.map((e) => `<div class="e10-e"><span>${esc(e.label)}</span><div class="e10-q__bar"><i style="width:${e.pct}%"></i></div><b>${e.pct} %</b></div>`).join('')
            + `<div class="e10-tip"><span class="e10-tip__title">Sugerencia para la próxima clase</span>El ${errs[0].pct} % del grupo comete «${esc(errs[0].label)}» en los simuladores: vale la pena repasarlo en clase.</div>`
            : '<p class="e10-sem__vacio">Cuando los estudiantes usen «Comprobar» en los laboratorios (LorentzLab, BiotSavartLab, AmpèreLab…), aquí aparecerán los errores más comunes del grupo.</p>'}
        </section>
      </div>`;

    const idx = indiceLecciones(curriculoData);
    const pintaRuta = (mi) => {
        const items = Object.keys(idx).filter((k) => idx[k].mi === mi);
        box.querySelector('#e10-seg-ruta').innerHTML = items.length ? items.map((k) => { const h = filas.filter((f) => f.progress[k]).length; return `<div class="e10-e"><span title="${esc(idx[k].titulo)}">${esc(idx[k].titulo)}</span><div class="e10-q__bar"><i style="width:${n ? h / n * 100 : 0}%"></i></div><b>${h}/${n}</b></div>`; }).join('')
            + '<small class="e10-nota">Estudiantes que completaron cada lección del módulo, en orden: donde cae la barra se pierden estudiantes.</small>'
            : '<p class="e10-sem__vacio">Este módulo no tiene lecciones.</p>';
    };
    // Módulo por defecto: el que más estudiantes tienen a medias (donde está el grupo ahora).
    const enCurso = mods.map((_, mi) => { const its = Object.keys(idx).filter((k) => idx[k].mi === mi); return filas.filter((f) => { const h = its.filter((k) => f.progress[k]).length; return h > 0 && h < its.length; }).length; });
    const sel = box.querySelector('#e10-seg-mod'), modDef = enCurso.indexOf(Math.max(0, ...enCurso));
    sel.value = String(Math.max(0, modDef)); pintaRuta(+sel.value);
    sel.addEventListener('change', () => pintaRuta(+sel.value));

    const ORD = { riesgo: 0, atencion: 1, ok: 2 };
    const pintaTabla = (f) => {
        const rows = filas.filter((x) => f === 'todos' || x.estado === 'riesgo').sort((a, b) => ORD[a.estado] - ORD[b.estado] || (b.dias ?? 999) - (a.dias ?? 999));
        box.querySelector('#e10-seg-tb').innerHTML = rows.map((x) => `<tr>
          <td><b>${esc(x.name || x.email.split('@')[0] || x.uid.slice(0, 6))}</b><small>${esc(x.email)}</small></td>
          <td>${haceTexto(x.dias)}</td><td class="m">${x.ing}</td>
          <td><span class="e10-mini"><i style="width:${x.avance}%"></i></span> <span class="m">${x.avance} %</span></td>
          <td class="m">${fmtMin(x.min)}${x.tiene30 ? '' : '*'}</td><td class="m">${x.dominio === null ? '—' : x.dominio + ' %'}</td>
          <td><span class="e10-est ${x.estado}">${x.estado === 'ok' ? '✓ ' : '! '}${esc(x.motivo)}</span></td>
          <td><button type="button" class="e10-btn" data-uid="${esc(x.uid)}" data-n="${esc(x.name || x.email)}">Ver métricas</button></td></tr>`).join('')
          || '<tr><td colspan="8" class="e10-sem__vacio">No hay estudiantes en este filtro.</td></tr>';
        box.querySelectorAll('#e10-seg-tb [data-uid]').forEach((b) => b.addEventListener('click', () => window.verDetalleEstudiante?.(b.dataset.uid, b.dataset.n)));
    };
    pintaTabla('todos');
    box.querySelectorAll('[data-f]').forEach((b) => b.addEventListener('click', () => { box.querySelectorAll('[data-f]').forEach((x) => x.classList.toggle('on', x === b)); pintaTabla(b.dataset.f); }));

    box.querySelector('#e10-seg-csv').addEventListener('click', () => {
        const q = (s) => `"${String(s ?? '').replace(/"/g, '""')}"`;
        const lineas = [['nombre', 'correo', 'ultimo_ingreso', 'ingresos_30d', 'avance_pct', 'minutos_30d', 'dominio_quiz_pct', 'estado'].join(',')]
            .concat(filas.map((x) => [q(x.name), q(x.email), q(x.last ? new Date(x.last).toISOString() : ''), x.ing, x.avance, x.min, x.dominio ?? '', q(x.motivo)].join(',')));
        const url = URL.createObjectURL(new Blob(['﻿' + lineas.join('\n')], { type: 'text/csv;charset=utf-8' }));
        const a = document.createElement('a'); a.href = url; a.download = `seguimiento_${claveDia()}.csv`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
}
