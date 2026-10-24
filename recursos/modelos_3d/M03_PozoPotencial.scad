// ==========================================================================
// M03_PozoPotencial.scad · Maqueta Topográfica de Pozo y Barrera de Potencial
// Módulo 3 (Potencial Eléctrico y Superficies Equipotenciales), Electro10.Easy
//
// La altura z representa el potencial V(x,y). Cada terraza de 2 mm es una
// "superficie equipotencial" física: una canica de acero rueda cuesta abajo
// siguiendo el gradiente del campo, E = -grad(V). El pozo (depresión) modela
// una carga negativa; la barrera (loma) modela una carga positiva.
//
// Unidades: milímetros. © 2026 Dudbil Olvasada Pabón Riaño · 10.Easy
// Impresión sugerida: PLA+, capa 0,16 mm, relleno 20 %, sin soportes.
// ==========================================================================

$fn = 72;

/* [Geometría que fija la física] */
base_l  = 120;    // largo de la base (eje x)
base_a  = 80;     // ancho de la base (eje y)
base_h  = 14;     // espesor total de la base (deja 4 mm de fondo bajo el pozo)
paso    = 2;      // altura de cada terraza (curva de nivel / equipotencial)

/* [Pozo de potencial: V baja, carga negativa] */
pozo_x  = 40;     // centro del pozo
pozo_y  = 40;     // centro del pozo
pozo_R  = 27;     // radio del borde del pozo
pozo_n  = 5;      // número de terrazas descendentes

/* [Barrera de potencial: V alta, carga positiva] */
barr_x  = 88;     // cresta de la barrera (eje x)
barr_L  = 70;     // longitud de la barrera (a lo largo de y)
barr_W  = 24;     // ancho de la base de la barrera
barr_n  = 5;      // número de terrazas ascendentes

/* [Canal de la canica: trayectoria del gradiente] */
canal_w = 9;      // ancho del canal para canica de Ø 8 mm
canal_d = 3;      // profundidad del canal

// ── Pozo: depresión escalonada (se talla del centro hacia afuera) ──
module pozo() {
    for (i = [0 : pozo_n - 1]) {
        R     = pozo_R - i * (pozo_R / pozo_n);   // radio de cada terraza
        z_top = base_h - i * paso;                 // piso de la terraza (más profundo hacia el centro)
        translate([pozo_x, pozo_y, 0]) cylinder(r = R, h = z_top);
    }
}

// ── Barrera: loma escalonada (terrazas apiladas de menor a mayor altura) ──
module barrera() {
    for (i = [0 : barr_n - 1]) {
        w = barr_W - i * (barr_W / barr_n);        // la cresta se angosta
        h = (i + 1) * paso;                        // la cresta crece
        translate([barr_x - w / 2, (base_a - barr_L) / 2, base_h])
            cube([w, barr_L, h]);
    }
}

// ── Canal recto: una canica rueda del pozo hacia la barrera (E = -grad V) ──
module canal() {
    translate([pozo_x + pozo_R - 2, pozo_y - canal_w / 2, base_h - canal_d])
        cube([barr_x - pozo_x - pozo_R - 14, canal_w, canal_d + 1]);
}

// ── Rótulos grabados (curvas de nivel y gradiente) ──
module rotulos() {
    translate([pozo_x - 30, pozo_y + pozo_R + 8, base_h - 0.6])
        linear_extrude(1.2) text("POZO  V baja", size = 5, halign = "center");
    translate([barr_x, base_a - 6, base_h - 0.6])
        linear_extrude(1.2) text("BARRERA  V alta", size = 5, halign = "center");
    translate([base_l - 8, 6, base_h - 0.6])
        rotate(-90) linear_extrude(1.2) text("E = -grad V", size = 5, halign = "left");
}

// ── Maqueta completa ──
module maqueta() {
    difference() {
        union() {
            cube([base_l, base_a, base_h]);       // base sólida
            barrera();                            // loma (V alta) por encima
        }
        pozo();                                   // pozo (V baja) tallado
        canal();                                  // canal de la canica
    }
    rotulos();
}

maqueta();
