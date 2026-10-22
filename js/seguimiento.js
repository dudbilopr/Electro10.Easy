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
const PRACTICA = { campo_radial: 'hilos', sentido_invertido: 'hilos', suma_magnitudes: 'hilos', falta_superponer: 'hilos', cancelacion: 'hilos',
    hilo_infinito_en_segmento: 'segmento', prolongacion: 'segmento', b0_medios: 'espira', grados: 'espira', faltan_vueltas: 'espira', angulo_brujula: 'oersted' };
export const practicaDe = (code) => (PRACTICA[code] ? `simuladores/BiotSavart.html#${PRACTICA[code]}` : null);

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
        <div><span class="e10-eyebrow">Error más repetido</span><b class="e10-sem__err">${top ? esc(top.label) : 'Ninguno por ahora'}</b>${link ? `<a href="${link}" target="_blank" rel="noopener">Practicar en BiotSavartLab</a>` : `<small>${comp.length ? `${comp.length} comprobaciones sin errores` : 'usa «Comprobar» en los simuladores'}</small>`}</div>
      </div>`;
    sem.querySelector('[data-avance]')?.addEventListener('click', () => window.mostrarMiAvance?.());
}
