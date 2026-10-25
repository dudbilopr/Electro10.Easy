// ==========================================================================
// M05_SuperficieGaussiana.scad · Kit de Superficies Gaussianas Desarmable
// Módulo 5 (Ley de Gauss), Electro10.Easy
//
// Tres superficies gaussianas didácticas que se desarman y se ensamblan
// sobre una base: (1) CÁSCARA ESFÉRICA hueca en dos hemisferios encajables,
// con una ventana que muestra el interior vacío (E = 0); (2) CILINDRO COAXIAL
// de Gauss con tapas, para el hilo infinito (E = λ/(2πε0·r)); y (3) PILLBOX
// (caja de pastillas) con dos tapas planas paralelas y pared lateral, para la
// lámina infinita (E = σ/(2ε0)). Cada pieza lleva su fórmula grabada y en la
// base se graba la ley integral: ∮ E·dA = Q_enc/ε0.
//
// Unidades: milímetros. © 2026 Dudbil Olvasada Pabón Riaño · 10.Easy
// Impresión sugerida: PLA+, capa 0,16 mm, relleno 20 %; sin soportes salvo la
// espiga del hemisferio inferior (añadir brim). Renderiza con F6 para STL.
// La fuente usada en text() debe tener cobertura griega (Liberation Sans /
// DejaVu Sans) para λ, σ, ε, π y ·.
// ==========================================================================

$fn = 72;

/* [Base y grabado] */
base_l   = 120;   // largo de la base (eje x)
base_a   = 80;    // ancho de la base (eje y)
base_h   = 8;     // espesor de la base
receso_d = 2;     // profundidad de los pocillos de asiento
holgura  = 0.4;   // juego radial total entre piezas que encajan
prof     = 0.8;   // profundidad de los rótulos grabados

/* [Posiciones de las tres estaciones sobre la base] */
pos_esfera = [24, 40];   // centro de la cáscara esférica
pos_cilin  = [60, 40];   // centro del cilindro coaxial
pos_pill   = [96, 40];   // centro del pillbox

/* [Cáscara esférica] */
R        = 20;        // radio exterior de la cáscara esférica
t_esf    = 2.5;       // espesor de la pared esférica (interior hueco: E = 0)
t_lap    = t_esf / 2; // mitad del espesor para el solape de encaje
encaje   = 3;         // altura del solape espiga/zócalo entre hemisferios
ventana_w = 14;       // ancho de la ventana que revela el interior hueco
ventana_h = 12;       // alto de la ventana de visualización
tab_l    = 24;        // largo de la pestaña del rótulo esférico (eje x)
tab_w    = 8;         // profundidad radial de la pestaña del rótulo (eje y)
tab_h    = 1.6;       // espesor de la pestaña del rótulo
tab_texto = 2.8;      // tamaño del rótulo "E = 0 interior"

/* [Cilindro coaxial de Gauss] */
rc     = 13;        // radio exterior del cilindro (pared lateral)
tc     = 2.5;       // espesor de la pared cilíndrica
hc     = 40;        // altura del cilindro (largo axial, paralelo al hilo λ)
rc_tapa = rc + 2;   // radio de las tapas (resalte de 2 mm, tapa con reborde)
tapa_c = 3;         // espesor de cada tapa
r_eje  = 2.5;       // radio del agujero central (ranura por donde pasa el hilo λ)
hilo_l = 70;        // largo total del hilo λ (sobresale por ambos extremos)

/* [Pillbox (caja de pastillas)] */
rp     = 17;            // radio de las tapas planas (discos)
tp     = 3;             // espesor de cada tapa
tl     = 2.5;           // espesor de la pared lateral (anillo)
hp     = 24;            // altura total (separación entre tapas)
pill_l = hp - 2 * tp;   // altura de la pared lateral del pillbox
lamina_g = 1.6;                 // espesor de la lámina σ
lamina_w = 2 * (rp - tl) - 4;   // ancho de la lámina (cabe dentro del anillo)
lamina_l = 2 * rp + 28;         // largo de la lámina (sobresale, sugiere infinito)

// ==========================================================================
// ── Símbolo de integral cerrada (∮): anillo con muesca, independiente de
//    la fuente. Se graba a la izquierda de la ley de Gauss en la base. ──
// ==========================================================================
module simbolo_flujo(r = 3.4, g = 1.1, h = prof) {
    linear_extrude(h) {
        difference() {
            circle(r = r);
            circle(r = r - g);
            translate([0, r - 0.35]) square([1.7, 1.4], center = true);
        }
    }
}

// ==========================================================================
// ── BASE con pocillos de asiento y rótulos grabados ──
// ==========================================================================
module base() {
    difference() {
        cube([base_l, base_a, base_h]);

        // Pocillos circulares de asiento (una estación por superficie)
        translate([pos_esfera[0], pos_esfera[1], base_h - receso_d])
            cylinder(r = R + holgura, h = receso_d + 0.02);
        translate([pos_cilin[0], pos_cilin[1], base_h - receso_d])
            cylinder(r = rc_tapa + holgura, h = receso_d + 0.02);
        translate([pos_pill[0], pos_pill[1], base_h - receso_d])
            cylinder(r = rp + holgura, h = receso_d + 0.02);

        // Título del kit
        translate([base_l / 2, 73, base_h - prof + 0.01])
            linear_extrude(prof)
                text("SUPERFICIE GAUSSIANA", size = 6, halign = "center", valign = "center");

        // Ley de Gauss: ∮ E·dA = Q_enc/ε0  (símbolo + texto)
        translate([40, 6, base_h - prof + 0.01])
            simbolo_flujo(r = 3.4, g = 1.1);
        translate([45.5, 6, base_h - prof + 0.01])
            linear_extrude(prof)
                text("E·dA = Q_enc/ε0", size = 4.5, halign = "left", valign = "center");

        // Nombres de estación (guía de dónde va cada superficie)
        translate([pos_esfera[0], 16, base_h - prof + 0.01])
            linear_extrude(prof) text("ESFERA", size = 3.2, halign = "center", valign = "center");
        translate([pos_cilin[0], 16, base_h - prof + 0.01])
            linear_extrude(prof) text("CILINDRO", size = 3.2, halign = "center", valign = "center");
        translate([pos_pill[0], 16, base_h - prof + 0.01])
            linear_extrude(prof) text("PILLBOX", size = 3.2, halign = "center", valign = "center");
    }
}

// ==========================================================================
// ── 1) CÁSCARA ESFÉRICA (dos hemisferios huecos encajables) ──
// ==========================================================================

// Hemisferio inferior: cáscara (mitad baja) + espiga de encaje hacia arriba.
module hemisferio_inferior() {
    union() {
        // Cáscara hueca: esfera exterior menos esfera interior, cortada a z <= 0
        difference() {
            difference() { sphere(R); sphere(R - t_esf); }
            translate([0, 0, R / 2]) cube([2 * R, 2 * R, R], center = true);
        }
        // Espiga recta hacia arriba (entra en el zócalo del hemisferio superior)
        translate([0, 0, 0])
            difference() {
                cylinder(r = R - t_lap - holgura / 2, h = encaje);
                cylinder(r = R - t_esf, h = encaje + 0.01);
            }
    }
}

// Pestaña del rótulo "E = 0 interior" (sale del borde en dirección +y)
module tab_rotulo_esfera() {
    difference() {
        translate([-tab_l / 2, R - 1, 0])
            cube([tab_l, tab_w, tab_h]);
        translate([0, R - 1 + tab_w / 2, tab_h - prof + 0.01])
            linear_extrude(prof)
                text("E = 0 interior", size = tab_texto, halign = "center", valign = "center");
    }
}

// Hemisferio superior: cáscara (mitad alta) + zócalo interior + ventana + rótulo.
module hemisferio_superior() {
    difference() {
        // Cáscara hueca cortada a z >= 0
        difference() {
            difference() { sphere(R); sphere(R - t_esf); }
            translate([0, 0, -R / 2]) cube([2 * R, 2 * R, R], center = true);
        }
        // Zócalo: ensancha el radio interior en z in [0, encaje] (recibe la espiga)
        translate([0, 0, -0.01])
            difference() {
                cylinder(r = R - t_lap + holgura / 2, h = encaje + 0.02);
                cylinder(r = R - t_esf, h = encaje + 0.02);
            }
        // Ventana de visualización: revela el interior hueco donde E = 0
        translate([R - 4, -ventana_w / 2, 4])
            cube([t_esf + 3, ventana_w, ventana_h]);
    }
    tab_rotulo_esfera();
}

// Esfera ensamblada (polo sur en z = 0): inferior abajo, superior arriba.
module esfera_armada() {
    translate([0, 0, R]) {
        hemisferio_inferior();
        hemisferio_superior();
    }
}

// ==========================================================================
// ── 2) CILINDRO COAXIAL DE GAUSS (hilo infinito) ──
// ==========================================================================

// Pared lateral hueca del cilindro
module lateral_cilindro() {
    difference() {
        cylinder(r = rc, h = hc);
        translate([0, 0, -0.01]) cylinder(r = rc - tc, h = hc + 0.02);
    }
}

// Tapa plana con agujero central (ranura del hilo λ) y rótulo opcional
module tapa_cilindro(rotulo = false) {
    difference() {
        cylinder(r = rc_tapa, h = tapa_c);
        cylinder(r = r_eje, h = tapa_c + 0.02);
        if (rotulo)
            translate([0, -4.5, tapa_c - prof + 0.01])
                linear_extrude(prof)
                    text("E = λ/(2πε0·r)", size = 2.9, halign = "center", valign = "center");
    }
}

// Hilo λ: varilla con puntas cónicas (sugiere longitud infinita)
module hilo_lambda() {
    cylinder(r = r_eje - 0.4, h = hilo_l, center = true);
    translate([0, 0, hilo_l / 2]) cylinder(r1 = r_eje - 0.4, r2 = 0, h = 5);
    translate([0, 0, -hilo_l / 2 - 5]) cylinder(r1 = 0, r2 = r_eje - 0.4, h = 5);
}

// Cilindro ensamblado (base en z = 0): lateral + tapa inferior + tapa superior
module cilindro_armado() {
    translate([0, 0, tapa_c]) lateral_cilindro();
    translate([0, 0, tapa_c]) mirror([0, 0, 1]) tapa_cilindro(false);
    translate([0, 0, tapa_c + hc]) tapa_cilindro(true);
}

// ==========================================================================
// ── 3) PILLBOX / CAJA DE PASTILLAS (lámina infinita) ──
// ==========================================================================

// Pared lateral (anillo) con ranura central para la lámina σ
module lateral_pillbox() {
    difference() {
        cylinder(r = rp, h = pill_l);
        translate([0, 0, -0.01]) cylinder(r = rp - tl, h = pill_l + 0.02);
        // ranura horizontal que atraviesa el anillo por ±x (de pared a pared)
        translate([-rp - 1, -lamina_w / 2 - holgura / 2,
                   pill_l / 2 - lamina_g / 2 - holgura / 2])
            cube([2 * rp + 2, lamina_w + holgura, lamina_g + holgura]);
    }
}

// Tapa plana del pillbox (rótulo opcional en la cara superior)
module tapa_pillbox(rotulo = false) {
    difference() {
        cylinder(r = rp, h = tp);
        if (rotulo)
            translate([0, 0, tp - prof + 0.01])
                linear_extrude(prof)
                    text("E = σ/(2ε0)", size = 3.8, halign = "center", valign = "center");
    }
}

// Lámina σ: placa delgada que atraviesa el pillbox (lámina infinita)
module lamina_sigma() {
    cube([lamina_l, lamina_w, lamina_g]);
}

// Pillbox ensamblado (base en z = 0): anillo + dos tapas + lámina σ
module pillbox_armado() {
    translate([0, 0, tp]) lateral_pillbox();
    translate([0, 0, tp]) mirror([0, 0, 1]) tapa_pillbox(false);
    translate([0, 0, tp + pill_l]) tapa_pillbox(true);
    translate([-lamina_l / 2, -lamina_w / 2, hp / 2 - lamina_g / 2]) lamina_sigma();
}

// ==========================================================================
// ── MAQUETA ensamblada (renderiza con F6 para ver el kit montado) ──
// ==========================================================================
module maqueta() {
    base();

    // Estación esférica: cáscara cerrada con ventana y rótulo "E = 0 interior"
    translate([pos_esfera[0], pos_esfera[1], base_h - receso_d])
        esfera_armada();

    // Estación cilíndrica: cilindro coaxial + hilo λ que lo atraviesa
    translate([pos_cilin[0], pos_cilin[1], base_h - receso_d])
        cilindro_armado();
    translate([pos_cilin[0], pos_cilin[1], base_h - receso_d + tapa_c + hc / 2])
        hilo_lambda();

    // Estación planar: pillbox con lámina σ que lo atraviesa
    translate([pos_pill[0], pos_pill[1], base_h - receso_d])
        pillbox_armado();
}

// ==========================================================================
// ── LAYOUT DE IMPRESIÓN: todas las piezas desarmadas, en la cama (z = 0) ──
//    Para imprimir el kit completo, cambia la última línea a: partes();
// ==========================================================================
module partes() {
    // Cáscara esférica (2 hemisferios + sus pestañas)
    translate([24, 24, encaje]) mirror([0, 0, 1]) hemisferio_inferior(); // espiga abajo
    translate([76, 22, 0])     hemisferio_superior();                    // domo arriba

    // Cilindro coaxial (lateral + 2 tapas + hilo λ)
    translate([30, 86, 0]) lateral_cilindro();
    translate([66, 78, 0]) tapa_cilindro(true);
    translate([66, 102, 0]) tapa_cilindro(false);
    translate([80, 40, 0]) rotate([0, 90, 0]) hilo_lambda();

    // Pillbox (anillo + 2 tapas + lámina σ)
    translate([30, 136, 0]) lateral_pillbox();
    translate([70, 130, 0]) tapa_pillbox(true);
    translate([70, 154, 0]) tapa_pillbox(false);
    translate([20, 186, 0]) lamina_sigma();
}

maqueta();
