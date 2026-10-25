#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
=============================================================================
AUDITOR Y MONITOR DE SALUD DE VIDEOS DE YOUTUBE · ELECTRO10.EASY
Autor: Prof. Dudbil Olvasada Pabón Riaño & Gemini (Antigravity)
=============================================================================
Verifica la disponibilidad en tiempo real de los videos pedagógicos usando
la API oficial de oEmbed de YouTube (sin requerir API Key).
Detecta videos caídos, privados, borrados o bloqueados por derechos.
Genera el informe de salud y sincroniza con Obsidian Vault.
=============================================================================
"""

import os
import sys
import json
import urllib.request
import urllib.error
from pathlib import Path
from datetime import datetime

# Configuración de codificación para consola Windows
try:
    if sys.stdout.encoding != 'utf-8':
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
except Exception:
    pass

# Catálogo Curado de Videos Pedagógicos por Módulo y Presaberes
# Secuencia Lógica: 1. Intuición Visual / 2. Deducción Analítica / 3. Experimento Tangible
VIDEOTECA_CATALOGO = [
    # ── M01: Ley de Coulomb y Carga ──────────────────────────────────────────
    {
        "id": "x1-SibwIPM4",
        "modulo": "M01",
        "fase": "1. Fenomenología y Experimento Tangible",
        "titulo": "Electric Charges and Forces - Coulomb's Law - Polarization",
        "canal": "Walter Lewin (MIT 8.02)",
        "tiempo_clave": "08:15 - Demostración de atracción electrostática y polarización",
        "presaberes": "PUENTE 01 (Vectores) y PUENTE 04 (3ª Ley de Newton)",
        "conexion_e10": "Deck M1 y Taller 1 (Secciones 1.1 a 1.4)",
        "porque_verlo": "Muestra empíricamente con varillas de vidrio y plástico cómo las cargas iguales se repelen y cómo la polarización atrae cuerpos neutros."
    },

    # ── M02: Campo Eléctrico y Dipolos ───────────────────────────────────────
    {
        "id": "sJG-rXBbmCc",
        "modulo": "M02",
        "fase": "1. Intuición Vectorial y Líneas de Fuerza",
        "titulo": "Electric Fields, Superposition & Induced Dipoles",
        "canal": "Walter Lewin (MIT 8.02)",
        "tiempo_clave": "14:20 - Mapeo de líneas de campo con semillas de hierba en aceite",
        "presaberes": "PUENTE 01 (Vectores unitarios r-hat) y PUENTE 04 (Torque de dipolo)",
        "conexion_e10": "Simulador VectorFieldLab y Lámina M2 (pulsos fotónicos)",
        "porque_verlo": "Permite visualizar físicamente las líneas de campo antes de abordar la abstracción matemática del tensor y superposición."
    },

    # ── M03: Potencial Eléctrico ─────────────────────────────────────────────
    {
        "id": "wT9AsY79f1k",
        "modulo": "M03",
        "fase": "2. Distinción Conceptual: Energía vs Potencial",
        "titulo": "Electric Potential and Potential Difference",
        "canal": "Derek Owens Physics",
        "tiempo_clave": "04:10 - Analogía entre altura h y voltaje V (U = qV)",
        "presaberes": "PUENTE 01 (Producto punto E . dl) y PUENTE 04 (Trabajo-Energía)",
        "conexion_e10": "Simulador EquipotentialLab y Taller 3 (Sección 3.1)",
        "porque_verlo": "Erradica la confusión más destructiva del curso: creer que potencial (Volts) es lo mismo que energía potencial (Joules)."
    },

    # ── M04: Distribuciones Continuas ────────────────────────────────────────
    {
        "id": "sveNLj1Lb0s",
        "modulo": "M04",
        "fase": "2. Deducción Analítica e Integración",
        "titulo": "Electric Field Due to a Line of Charge - Finite Length",
        "canal": "The Organic Chemistry Tutor",
        "tiempo_clave": "06:30 - Sustitución trigonométrica y límites simétricos en la mediatriz",
        "presaberes": "PUENTE 02 (Diferencial dq = lambda dx) y PUENTE 03 (Geometría)",
        "conexion_e10": "Taller 4 (Problema 1 y Reto 1) y Simulador ContinuousDistLab",
        "porque_verlo": "Paso a paso minucioso de cómo plantear la integral en la mediatriz y por qué las componentes axiales se cancelan a cero por simetría."
    },
    {
        "id": "KYikKk9kYz0",
        "modulo": "M04",
        "fase": "3. Límite Asintótico y Alambre Infinito",
        "titulo": "Electric Field Due to an Infinite Line of Charge",
        "canal": "The Organic Chemistry Tutor",
        "tiempo_clave": "03:15 - Límite cuando L tiende a infinito (E = 2k lambda / a)",
        "presaberes": "PUENTE 02 (Límites en el infinito y simplificación algebraica)",
        "conexion_e10": "Taller 4 (Problema 2) y Guía M04 Página 2",
        "porque_verlo": "Muestra el control de calidad matemático: cómo una varilla larga se convierte en el campo canónico 2k*lambda/r."
    },

    # ── M05: Ley de Gauss ────────────────────────────────────────────────────
    {
        "id": "Zu2gomaDqnM",
        "modulo": "M05",
        "fase": "1. Flujo Eléctrico y Superficies Gaussianas",
        "titulo": "Electric Flux, Gauss' Law, Examples",
        "canal": "Walter Lewin (MIT 8.02)",
        "tiempo_clave": "18:40 - Cálculo de flujo a través de una lata cilíndrica y esfera",
        "presaberes": "PUENTE 01 (Producto punto E . dA) y PUENTE 03 (Áreas vs Volúmenes)",
        "conexion_e10": "Simulador GaussLab y Árbol de Simetrías del Deck M5",
        "porque_verlo": "Enseña a razonar cuándo una superficie cerrada simplifica la integral a un simple producto E*A."
    },

    # ── M06: Capacitancia y Dieléctricos ─────────────────────────────────────
    {
        "id": "Pd9HY8iLiCA",
        "modulo": "M06",
        "fase": "1. Dieléctricos, Polarización y Almacenamiento",
        "titulo": "Polarization, Dielectrics, Van de Graaff Generator, Capacitors",
        "canal": "Walter Lewin (MIT 8.02)",
        "tiempo_clave": "22:15 - Efecto de introducir un dieléctrico y aumento de capacitancia",
        "presaberes": "PUENTE 03 (Geometría de placas) y PUENTE 04 (Energía potencial almacenada)",
        "conexion_e10": "Taller 6 Sección 6.2 y Simulador CapacitorLab",
        "porque_verlo": "Demostración experimental impactante de cómo el campo se reduce y la energía se redistribuye al insertar un dieléctrico."
    },

    # ── M07: Circuitos CC y Leyes de Kirchhoff ───────────────────────────────
    {
        "id": "Q39xQUlTGew",
        "modulo": "M07",
        "fase": "2. Regla de los Nodos (KCL)",
        "titulo": "Kirchhoff's Current Law, Junction Rule, KCL Circuits",
        "canal": "The Organic Chemistry Tutor",
        "tiempo_clave": "05:10 - Balance de corrientes que entran y salen en una bifurcación",
        "presaberes": "PUENTE 05 (Conservación de la carga en nodos)",
        "conexion_e10": "Taller 7 Problema 1 y Simulador CircuitLab",
        "porque_verlo": "Explica con diagramas multicolores cómo identificar nodos principales sin duplicar ecuaciones redundantes."
    },
    {
        "id": "6F_rmZ1nXFQ",
        "modulo": "M07",
        "fase": "2. Regla de las Mallas (KVL)",
        "titulo": "Kirchhoff's Voltage Law - KVL Circuits, Loop Rule & Ohm's Law",
        "canal": "The Organic Chemistry Tutor",
        "tiempo_clave": "08:45 - Convención infalible de signos al recorrer resistencias y fuentes",
        "presaberes": "PUENTE 05 (Sistemas lineales 2x2 y signos de mallas)",
        "conexion_e10": "Taller 7 Problema 2 y Guía M07",
        "porque_verlo": "Aclara definitivamente por qué una fem es positiva al entrar por el borne negativo, sin importar el sentido de la corriente."
    },

    # ── M08: Fuerza de Lorentz y Magnetismo ───────────────────────────────────
    {
        "id": "1TKSfAkWWN0",
        "modulo": "M08",
        "fase": "1. Intuición y Relatividad Especial",
        "titulo": "How Special Relativity Makes Magnets Work",
        "canal": "Veritasium",
        "tiempo_clave": "04:50 - Contracción de Lorentz de cargas móviles y origen del magnetismo",
        "presaberes": "PUENTE 01 (Producto cruz v x B) y PUENTE 04 (Dinámica de partículas)",
        "conexion_e10": "Deck M8 diapositiva 2 y Simulador LorentzLab",
        "porque_verlo": "Revela el secreto más profundo de la física: el magnetismo es en realidad la electrostática vista desde un marco en movimiento."
    },

    # ── M09 y M10: Fuentes de Campo y Ley de Ampère ──────────────────────────
    {
        "id": "csMqfwJRjCs",
        "modulo": "M09_M10",
        "fase": "2. Fuentes Magnéticas, Mano Derecha y Ley de Ampère",
        "titulo": "Magnetism, Magnetic Field Force, Right Hand Rule, Ampere's Law, Solenoids",
        "canal": "The Organic Chemistry Tutor",
        "tiempo_clave": "16:20 - Campo magnético dentro de un solenoide y regla de la mano derecha",
        "presaberes": "PUENTE 01 (Regla de la mano derecha) y PUENTE 02 (Integrales de Biot-Savart)",
        "conexion_e10": "Talleres 9 y 10, Simuladores BiotSavartLab y AmpereLab",
        "porque_verlo": "Conexión integral entre corrientes elementales, espiras circulares, solenoides y la integral de línea de Ampère."
    },

    # ── M11: Inducción de Faraday y Ley de Lenz ──────────────────────────────
    {
        "id": "nGQbA2jwkWI",
        "modulo": "M11",
        "fase": "1. Demostración Experimental de Ley de Lenz",
        "titulo": "Electromagnetic Induction, Faraday's Law, Lenz Law, SUPER DEMO",
        "canal": "Walter Lewin (MIT 8.02)",
        "tiempo_clave": "10:30 - El experimento del anillo saltador y la inercia magnética",
        "presaberes": "PUENTE 01 (Flujo magnético B . dA) y PUENTE 05 (FEM inducida)",
        "conexion_e10": "Taller 11, Deck M11 y Simulador FaradayLab",
        "porque_verlo": "La demostración más famosa de la historia de la física del anillo de aluminio flotando y disparado por inducción electromagnética."
    },
    {
        "id": "txmKr69jGBk",
        "modulo": "M11",
        "fase": "3. Aplicación en la Vida Real: Corrientes de Foucault",
        "titulo": "Levitating Barbecue! Electromagnetic Induction",
        "canal": "Veritasium",
        "tiempo_clave": "03:15 - Calentamiento por corrientes parásitas y levitación magnética",
        "presaberes": "PUENTE 04 (Energía y disipación) y Ley de Faraday",
        "conexion_e10": "Desafío Integral M11 y Guía M11",
        "porque_verlo": "Muestra cómo la inducción electromagnética se usa en estufas de inducción reales y trenes de levitación (Maglev)."
    },

    # ── M12: Ondas y Ecuaciones de Maxwell ───────────────────────────────────
    {
        "id": "rB83DpBJQsE",
        "modulo": "M12",
        "fase": "1. Geometría Visual de Campos y Cálculo Vectorial",
        "titulo": "Divergence and curl: The language of Maxwell's equations",
        "canal": "3Blue1Brown",
        "tiempo_clave": "05:10 - Divergencia como fuentes/sumideros y Rotacional como circulación",
        "presaberes": "PUENTE 01 (Vectores) y PUENTE 02 (Integrales de superficie y línea)",
        "conexion_e10": "Deck M12 Ecuaciones de Maxwell y Simulador MaxwellLab",
        "porque_verlo": "Las mejores animaciones geométricas del mundo para entender qué significa gradiente, divergencia y rotacional."
    },

    # ── M13: Corriente Alterna y Resonancia RLC ──────────────────────────────
    {
        "id": "2GvqQvohP2k",
        "modulo": "M13",
        "fase": "2. Deducción Analítica de Fasores e Impedancia",
        "titulo": "Series RLC Circuits, Resonant Frequency, Inductive Reactance & Capacitive Reactance",
        "canal": "The Organic Chemistry Tutor",
        "tiempo_clave": "11:20 - Diagrama fasorial de impedancia Z y frecuencia de resonancia",
        "presaberes": "PUENTE 05 (Sistemas lineales y fasores) y Trigonometría",
        "conexion_e10": "Taller 13 y Simulador RLCResonanceLab",
        "porque_verlo": "Deduce matemáticamente por qué en resonancia XL = XC y la impedancia cae a su valor mínimo puramente resistivo."
    },

    # ── PUENTES DE PRESABERES FUNDAMENTALES ──────────────────────────────────
    {
        "id": "LyGKycYT2v0",
        "modulo": "PRE_VECT_DOT",
        "fase": "Puente 01 · Producto Punto y Dualidad",
        "titulo": "Dot products and duality | Chapter 9, Essence of linear algebra",
        "canal": "3Blue1Brown",
        "tiempo_clave": "02:30 - Proyección geométrica de un vector sobre otro",
        "presaberes": "Trigonometría (coseno), descomposición vectorial",
        "conexion_e10": "PUENTE 01, Trabajo en M3 (W = E . dl) y Flujo en M5 (Phi = E . dA)",
        "porque_verlo": "Explica visualmente por qué E . dl es cero si son perpendiculares y máximo si son paralelos."
    },
    {
        "id": "eu6i7WJeinw",
        "modulo": "PRE_VECT_CROSS",
        "fase": "Puente 01 · Producto Cruz y Espacio 3D",
        "titulo": "Cross products | Chapter 10, Essence of linear algebra",
        "canal": "3Blue1Brown",
        "tiempo_clave": "03:45 - El área del paralelogramo orientado y la regla de la mano derecha",
        "presaberes": "Determinantes 3x3, vectores tridimensionales",
        "conexion_e10": "PUENTE 01, Torque en M2 (tau = p x E) y Fuerza de Lorentz en M8 (F = q v x B)",
        "porque_verlo": "Acaba para siempre con la confusión de hacia dónde apunta el vector resultante en el espacio 3D."
    },
    {
        "id": "WUvTyaaNkzM",
        "modulo": "PRE_CALC",
        "fase": "Puente 02 · La Esencia del Cálculo Integral",
        "titulo": "The essence of calculus | Chapter 1 & 8",
        "canal": "3Blue1Brown",
        "tiempo_clave": "08:15 - Integración como acumulación continua de rebanadas infinitesimales",
        "presaberes": "Límites, suma de Riemann, concepto de diferencial dx",
        "conexion_e10": "PUENTE 02 y Distribuciones continuas en M04 (dq = lambda dx)",
        "porque_verlo": "Permite al estudiante entender por qué integramos: no es una regla mecánica, es sumar infinitos trozos casi invisibles."
    },
    {
        "id": "bpFK2VCRHUs",
        "modulo": "PRE_MECH_CIRC",
        "fase": "Puente 04 · Dinámica Circular y Fuerza Centrípeta",
        "titulo": "Uniform Circular Motion: Crash Course Physics #7",
        "canal": "CrashCourse Physics",
        "tiempo_clave": "04:30 - Aceleración centrípeta a = v^2/r y balance de fuerzas radiales",
        "presaberes": "Cinemática circular, 2ª Ley de Newton",
        "conexion_e10": "PUENTE 04 y Trayectoria de Lorentz en M08 (qvB = mv^2/r)",
        "porque_verlo": "Explica por qué la fuerza centrípeta no hace trabajo y solo curva la trayectoria de la partícula."
    }
]

def check_youtube_video(video_id):
    """Verifica si el video de YouTube existe y está activo mediante oEmbed."""
    url = f"https://www.youtube.com/watch?v={video_id}"
    oembed_url = f"https://www.youtube.com/oembed?url={url}&format=json"
    
    req = urllib.request.Request(
        oembed_url, 
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Electro10Easy-HealthCheck/2.0"}
    )
    
    try:
        with urllib.request.urlopen(req, timeout=8) as response:
            if response.status == 200:
                data = json.loads(response.read().decode("utf-8"))
                return {
                    "status": "ONLINE",
                    "code": 200,
                    "title": data.get("title", "Desconocido"),
                    "author": data.get("author_name", "Desconocido"),
                    "thumbnail": data.get("thumbnail_url", "")
                }
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return {"status": "CAIDO_O_BORRADO", "code": 404, "title": "No disponible", "author": "N/A", "thumbnail": ""}
        elif e.code == 401 or e.code == 403:
            return {"status": "PRIVADO_O_RESTRINGIDO", "code": e.code, "title": "Restringido", "author": "N/A", "thumbnail": ""}
        return {"status": f"ERROR_HTTP_{e.code}", "code": e.code, "title": "Error", "author": "N/A", "thumbnail": ""}
    except Exception as e:
        return {"status": f"ERROR_CONEXION", "code": 0, "title": str(e), "author": "N/A", "thumbnail": ""}

def run_audit():
    print("=================================================================")
    print("AUDITORÍA DE SALUD Y SECUENCIA DE VIDEOS YOUTUBE · ELECTRO10.EASY")
    print("=================================================================\n")
    
    vault_base = Path("Vault_Electro10_Easy")
    video_dir = vault_base / "09_Videoteca_y_Secuencias"
    video_dir.mkdir(parents=True, exist_ok=True)
    
    results = []
    online_count = 0
    
    for item in VIDEOTECA_CATALOGO:
        v_id = item["id"]
        print(f"Comprobando [{item['modulo']}] {item['titulo'][:38]}... (ID: {v_id})")
        health = check_youtube_video(v_id)
        item["health"] = health
        if health["status"] == "ONLINE":
            online_count += 1
            print(f"  -> ✅ [ONLINE] {health['title'][:55]} | Canal: {health['author']}")
        else:
            print(f"  -> ❌ [{health['status']}] Código: {health['code']}")
        results.append(item)
    
    # 1. Generar Informe Maestro en Markdown
    report_md = []
    report_md.append("---")
    report_md.append('title: "Videoteca Curada y Monitor de Salud de Enlaces"')
    report_md.append('tipo: "Auditoría Audiovisual y Secuencia Pedagógica"')
    report_md.append(f'fecha_auditoria: "{datetime.now().strftime("%Y-%m-%d %H:%M")}"')
    report_md.append(f'total_videos: {len(results)}')
    report_md.append(f'videos_online: {online_count}')
    report_md.append('tags: [videos, youtube, oembed, healthcheck, secuencias_pedagogicas, presaberes]')
    report_md.append("---\n")
    
    report_md.append("# 🎥 Videoteca Curada y Monitor de Salud de Enlaces Audiovisuales")
    report_md.append(f"> **Auditoría Automatizada en Tiempo Real:** `{online_count}/{len(results)}` videos operativos en línea.")
    report_md.append("> **Secuencia Lógica de 3 Fases:** 1. Intuición Visual / Animación ➔ 2. Deducción Analítica / Cálculo ➔ 3. Experimento Tangible / Aplicación.\n")
    report_md.append("---")
    
    # Tabla resumen de salud
    report_md.append("\n## 🩺 Matriz de Salud de Recursos Audiovisuales (oEmbed API)\n")
    report_md.append("| Módulo / Código | Fase Didáctica | Video y Título Oficial | Canal | Estado | Acción Requerida |")
    report_md.append("| :---: | :--- | :--- | :--- | :---: | :--- |")
    
    for r in results:
        h = r["health"]
        icon = "🟢 Activo" if h["status"] == "ONLINE" else "🔴 CAÍDO"
        action = "Ninguna (Operativo)" if h["status"] == "ONLINE" else "⚠️ REEMPLAZAR ENLACE"
        yt_link = f"[{h['title']}](https://www.youtube.com/watch?v={r['id']})" if h["status"] == "ONLINE" else f"`{r['id']}` ({r['titulo']})"
        report_md.append(f"| **{r['modulo']}** | {r['fase']} | {yt_link} | {h['author']} | {icon} | {action} |")
    
    report_md.append("\n---\n")
    report_md.append("## 📚 Secuencia Pedagógica Detallada y Guía para el Docente\n")
    
    for r in results:
        h = r["health"]
        report_md.append(f"### {r['modulo']} · {r['titulo']}")
        report_md.append(f"- **Enlace Directo:** https://www.youtube.com/watch?v={r['id']}")
        report_md.append(f"- **Fase Pedagógica:** `{r['fase']}`")
        report_md.append(f"- **Canal / Autor:** {h['author']}")
        report_md.append(f"- **Momento Clave a Observar:** ⏱️ `{r['tiempo_clave']}`")
        report_md.append(f"- **Presaberes Matemáticos / Físicos Exigidos:** `{r['presaberes']}`")
        report_md.append(f"- **Conexión con Plataforma 10.Easy:** `{r['conexion_e10']}`")
        report_md.append(f"- **¿Por qué este video aclara el concepto al estudiante?:**")
        report_md.append(f"  > {r['porque_verlo']}\n")
    
    out_file = video_dir / "ESTADO_VIDEOS_YOUTUBE.md"
    out_file.write_text("\n".join(report_md), encoding="utf-8")
    print(f"\nInforme maestro generado en: {out_file}")
    
    # 2. Generar Guía de Secuencia Lógica de Aprendizaje
    seq_md = [
        "---",
        'title: "Secuencia Lógica de Aprendizaje Audiovisual"',
        'tipo: "Metodología Instruccional y Guía Docente"',
        'autor: "Prof. Dudbil Olvasada Pabón Riaño"',
        'catedra: "Electro10.Easy"',
        "tags: [secuencia_pedagogica, videos, metodologia, 3_fases, aula_invertida]",
        "---\n",
        "# 🎬 Secuencia Lógica de Aprendizaje Audiovisual · Electro10.Easy",
        "> **Fundamento Pedagógico:** No se puede arrojar a un estudiante directamente a calcular integrales o resolver mallas sin antes crear un modelo mental intuitivo del fenómeno. Cada módulo sigue rigurosamente esta secuencia de 3 Fases:\n",
        "```mermaid",
        "graph LR",
        '    F1["Fase 1: Intuición Visual<br>(Animaciones 3D, Campos, Fluidos)"] --> F2["Fase 2: Deducción Analítica<br>(Integrales, Vectores, Ecuaciones)"]',
        '    F2 --> F3["Fase 3: Experimento Tangible<br>(Laboratorio Walter Lewin, Maglev, Motores)"]',
        '    style F1 fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#000',
        '    style F2 fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,color:#000',
        '    style F3 fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000',
        "```\n",
        "---",
        "## 🎯 Protocolo para el Docente (Prof. Dudbil Olvasada Pabón Riaño)",
        "1. **Antes de la Clase (Aula Invertida):** Asignar el video de **Fase 1 (Intuición)**. El estudiante debe llegar al aula sabiendo *qué aspecto físico tiene el fenómeno*.",
        "2. **Durante la Clase (Deducción y Taller):** Proyectar el **Momento Clave** del video de **Fase 2 (Deducción)** antes de resolver los problemas por los 2 caminos en el Taller Web / LaTeX.",
        "3. **Cierre de la Clase (Consolidación):** Mostrar el video de **Fase 3 (Demostración de Cátedra de Walter Lewin / Veritasium)** para fijar la memoria a largo plazo.",
        "4. **Detección Temprana de Fallos:** Si el alumno se bloquea en la deducción matemática, el docente consulta la [[MATRIZ_MAESTRA_DE_PRESABERES_Y_PEDAGOGIA]] y le prescribe el **Puente de Presaberes** correspondiente (Vectores, Integrales, Geometría, Mecánica o Kirchhoff).\n",
        "---",
        "## 🔗 Enlace al Monitor de Salud y Estado en Línea",
        "Consulta el estado en tiempo real de todos los enlaces de la videoteca en: [[ESTADO_VIDEOS_YOUTUBE]]."
    ]
    (video_dir / "SECUENCIA_LOGICA_APRENDIZAJE.md").write_text("\n".join(seq_md), encoding="utf-8")
    print(f"Guía de secuencia lógica generada en: {video_dir / 'SECUENCIA_LOGICA_APRENDIZAJE.md'}")

    # 3. Generar fichas individuales por módulo en 09_Videoteca_y_Secuencias/
    for r in results:
        mod_file = video_dir / f"Videos_{r['modulo']}.md"
        mod_md = [
            "---",
            f'title: "Videos Pedagógicos {r["modulo"]}"',
            f'modulo: "{r["modulo"]}"',
            f'video_id: "{r["id"]}"',
            f'estado_salud: "{r["health"]["status"]}"',
            "tags: [videoteca, recurso_audiovisual, presaberes, electro10easy]",
            "---\n",
            f"# 🎬 Recursos Audiovisuales: {r['modulo']}",
            f"> **Video Curado:** [{r['health']['title']}](https://www.youtube.com/watch?v={r['id']})\n",
            "## 🎯 Enfoque Pedagógico y Secuencia",
            f"* **Fase Didáctica:** `{r['fase']}`",
            f"* **Canal / Autor:** {r['health']['author']}",
            f"* **Momento Clave a Observar:** ⏱️ `{r['tiempo_clave']}`",
            f"* **Presaberes Exigidos:** `{r['presaberes']}`",
            f"* **Conexión con Electro10.Easy:** `{r['conexion_e10']}`",
            f"\n> [!tip] Guía de Observación para el Estudiante\n> {r['porque_verlo']}\n",
            "---\n",
            "### 🧭 Navegación de Cátedra",
            f"* [[ESTADO_VIDEOS_YOUTUBE|🩺 Volver al Monitor de Salud de Videos]]",
            f"* [[MATRIZ_MAESTRA_DE_PRESABERES_Y_PEDAGOGIA|🧠 Consultar Matriz de Presaberes]]"
        ]
        mod_file.write_text("\n".join(mod_md), encoding="utf-8")
    
    print("Fichas de módulo individuales sincronizadas en 09_Videoteca_y_Secuencias/.")

if __name__ == '__main__':
    run_audit()
