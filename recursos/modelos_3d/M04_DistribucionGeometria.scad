// ==========================================================================
// M04_DistribucionGeometria.scad · Segmentador de dq y geometrías canónicas
// Módulo 4 (Distribuciones Continuas de Carga), Electro10.Easy
//
// Tablero didáctico que materializa el paso 1 de la deducción de las cuatro
// distribuciones canónicas: aislar el elemento diferencial dq antes de sumar
// (integrar). Cada zona muestra una geometría y su diferencial:
//
//   · Varilla finita  (lambda = Q/L)         ->  dq = lambda·dx
//   · Anillo           (lambda = Q/(2·pi·R)) ->  dq = lambda·R·dtheta  (16 sectores)
//   · Disco            (sigma = Q/(pi·R^2))  ->  dq = sigma·2·pi·r·dr  (anillos apilados)
//   · Plano infinito   (E = sigma/(2·eps0))  ->  límite R -> infinito del disco
//
// Los sectores del anillo y los segmentos de la varilla llevan un alojamiento
// para un microimán de neodimio de 4 mm: los "dq" se acoplan por magnetismo
// igual que se acoplan en la integral. El disco y el plano llevan bornes
// banana de 4 mm para conectarlos a una fuente de carga y medir el campo
// sobre el eje. Los rótulos en relieve indican las densidades lambda, sigma, rho.
//
// Unidades: milímetros. © 2026 Dudbil Olvasada Pabón Riaño · 10.Easy
// Impresión sugerida: PLA+, capa 0,16 mm, relleno 20 %, sin soportes.
// ==========================================================================

$fn = 96;

/* [Base del tablero] */
base_l  = 250;   // largo de la base (eje x)
base_a  = 200;   // ancho de la base (eje y)
base_h  = 8;     // espesor de la base

/* [Tolerancias de ensamble] */
holgura_iman   = 0.15;   // holgura de encastre para los imanes de neodimio
holgura_banana = 0.30;   // holgura para los bornes banana de 4 mm

/* [Imanes de neodimio (Ø 4 mm)] */
iman_d  = 4;                            // diámetro nominal del microimán
iman_h  = 2;                            // espesor nominal del microimán
iman_al = iman_d + 2 * holgura_iman;    // diámetro del alojamiento
iman_ah = iman_h + 0.3;                 // profundidad del alojamiento

/* [Bornes banana hembra (Ø 4 mm)] */
banana_d     = 4;                             // diámetro del pin banana
banana_al    = banana_d + 2 * holgura_banana; // paso del pin (con holgura)
banana_cb    = 7.5;                           // contraboca del aislante del jack
banana_cb_h  = 3;                             // profundidad de la contraboca

/* [Zona 1 · Varilla finita] */
var_x   = 70;     // centro x de la varilla
var_y   = 130;    // centro y de la varilla
var_l   = 108;    // longitud de la varilla
var_w   = 10;     // ancho de la varilla
var_h   = 12;     // alto de la varilla
var_n   = 9;      // número de segmentos (cada uno es un dq = lambda·dx)

/* [Zona 2 · Anillo] */
anillo_x   = 180;   // centro x del anillo
anillo_y   = 130;   // centro y del anillo
anillo_R   = 38;    // radio exterior
anillo_r   = 28;    // radio interior (tubo de 10 mm)
anillo_h   = 12;    // alto del anillo
anillo_n   = 16;    // número de sectores (dq = lambda·R·dtheta)

/* [Zona 3 · Disco] */
disco_x   = 70;    // centro x del disco
disco_y   = 38;    // centro y del disco
disco_R   = 34;    // radio del disco
disco_h   = 12;    // alto del disco

/* [Zona 4 · Plano infinito] */
plano_x   = 180;   // centro x del plano
plano_y   = 38;    // centro y del plano
plano_R   = 34;    // radio del plano (límite R -> infinito del disco)
plano_h   = 6;     // alto del plano (placa delgada)

// ── Rótulo en relieve sobre la cara superior de la base ──
module texto(s, x, y, size = 4, h = 1.0) {
    translate([x, y, base_h - 0.4])
        linear_extrude(h) text(s, size = size, halign = "center", valign = "center");
}

// ── Alojamiento estándar de un borne banana hembra de 4 mm ──
// (contraboca superior para el aislante + paso del pin a través del material)
module borne(x, y, alto) {
    translate([x, y, base_h + alto - banana_cb_h - 0.01])
        cylinder(d = banana_cb, h = banana_cb_h + 0.02);            // contraboca
    translate([x, y, -0.01])
        cylinder(d = banana_al, h = base_h + alto + 0.02);          // paso del pin
}

// ── Zona 1: varilla finita segmentada ──
module varilla() {
    difference() {
        // barra sólida
        translate([var_x - var_l / 2, var_y - var_w / 2, base_h])
            cube([var_l, var_w, var_h]);
        // ranuras de segmentación: cada bloque es un dx
        for (i = [1 : var_n - 1]) {
            xx = var_x - var_l / 2 + i * (var_l / var_n);
            translate([xx - 0.4, var_y - var_w / 2 - 1, base_h + 4])
                cube([0.8, var_w + 2, var_h - 4 + 0.01]);
        }
        // alojamientos de imán (uno por segmento)
        for (i = [0 : var_n - 1]) {
            xx = var_x - var_l / 2 + (i + 0.5) * (var_l / var_n);
            translate([xx, var_y, base_h + var_h - iman_ah])
                cylinder(d = iman_al, h = iman_ah + 0.01);
        }
    }
    // regla milimetrada (marca cada 5 mm, larga cada 10 mm)
    for (x = [0 : 5 : var_l]) {
        xx = var_x - var_l / 2 + x;
        translate([xx, var_y + var_w / 2 + 5, base_h - 0.4])
            cube([0.5, (x % 10 == 0) ? 5 : 2.5, 1]);
    }
}

// ── Cursor deslizante: delimita físicamente el elemento dx ──
module cursor() {
    i   = 4;                          // segmento resaltado
    seg = var_l / var_n;
    x0  = var_x - var_l / 2 + i * seg;
    for (xx = [x0, x0 + seg]) {
        translate([xx - 0.75, var_y - var_w / 2 - 2, base_h])
            cube([1.5, var_w + 4, var_h + 2]);
    }
}

// ── Punto de observación P y vector de posición r (mediatriz de la varilla) ──
module puntoP() {
    Px = var_x;
    Py = var_y + var_w / 2 + 16;
    translate([Px, Py, base_h]) cylinder(d = 6, h = 5);            // marcador P
    translate([Px - 0.6, var_y + var_w / 2, base_h - 0.4])
        cube([1.2, Py - (var_y + var_w / 2), 1]);                  // línea r
    texto("P", Px + 7, Py, 4);                                      // rótulo P
    texto("r", Px + 3.5, (var_y + var_w / 2 + Py) / 2, 3.5);        // rótulo r
}

// ── Zona 2: anillo dividido en 16 sectores acoplables con imanes ──
module anillo() {
    difference() {
        // anillo sólido
        translate([anillo_x, anillo_y, base_h])
            cylinder(r = anillo_R, h = anillo_h);
        // hueco central (eje z)
        translate([anillo_x, anillo_y, base_h - 1])
            cylinder(r = anillo_r, h = anillo_h + 2);
        // ranuras radiales: 16 sectores
        for (i = [0 : anillo_n - 1])
            translate([anillo_x, anillo_y, 0]) rotate([0, 0, i * 360 / anillo_n])
                translate([0, -0.4, base_h + 3]) cube([anillo_R + 1, 0.8, anillo_h]);
        // alojamientos de imán (uno por sector, en el radio medio)
        for (i = [0 : anillo_n - 1])
            translate([anillo_x, anillo_y, 0]) rotate([0, 0, (i + 0.5) * 360 / anillo_n])
                translate([(anillo_R + anillo_r) / 2, 0, base_h + anillo_h - iman_ah])
                    cylinder(d = iman_al, h = iman_ah + 0.01);
    }
}

// ── Zona 3: disco con anillos apilados (dq = sigma·dA) y borne banana en el eje ──
module disco() {
    difference() {
        // disco sólido
        translate([disco_x, disco_y, base_h])
            cylinder(r = disco_R, h = disco_h);
        // ranuras anulares: anillos de radio r
        for (r = [disco_R / 4 : disco_R / 4 : disco_R - 1])
            translate([disco_x, disco_y, base_h + disco_h - 3])
                difference() {
                    cylinder(r = r + 0.5, h = 3.01);
                    cylinder(r = r - 0.5, h = 3.01);
                }
        // borne banana central (eje z, para cargar el disco)
        borne(disco_x, disco_y, disco_h);
    }
}

// ── Zona 4: plano infinito (placa delgada, límite R -> infinito) ──
module plano() {
    difference() {
        // placa circular delgada
        translate([plano_x, plano_y, base_h])
            cylinder(r = plano_R, h = plano_h);
        // dos bornes banana (+ / -) para cargar el plano
        borne(plano_x - 18, plano_y, plano_h);
        borne(plano_x + 18, plano_y, plano_h);
    }
    // símbolo de densidad superficial sobre la cara superior
    translate([plano_x, plano_y + 4, base_h + plano_h - 0.4])
        linear_extrude(1) text("σ", size = 6, halign = "center", valign = "center");
}

// ── Tablero completo ──
module maqueta() {
    // base sólida
    cube([base_l, base_a, base_h]);

    // franja de título y leyenda de densidades
    texto("SEGMENTADOR DE dq · GEOMETRÍAS CANÓNICAS", base_l / 2, base_a - 9, 6);
    texto("λ = Q/L · σ = Q/A · ρ = Q/V", base_l / 2, base_a - 17, 4.5);

    // las cuatro zonas
    varilla();
    cursor();
    puntoP();
    anillo();
    disco();
    plano();

    // rótulos de cada zona
    texto("VARILLA", var_x, 118, 5);
    texto("dq = λ·dx", var_x, 111, 4);
    texto("ANILLO", anillo_x, 82, 5);
    texto("dq = λ·R·dθ", anillo_x, 75, 4);
    texto("16 sectores · 22.5°", anillo_x, 68, 4);
    texto("DISCO", disco_x, 78, 5);
    texto("dq = σ·2πr·dr", disco_x, 71, 4);
    texto("PLANO", plano_x, 78, 5);
    texto("E = σ / (2ε0)", plano_x, 71, 4);
}

maqueta();
