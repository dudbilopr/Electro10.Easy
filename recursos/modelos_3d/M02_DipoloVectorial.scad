// DipoloVectorial-3D · Indicador vectorial de dipolo y rejilla de campo (Módulo 2, Electro10.Easy)
// Modelo paramétrico en OpenSCAD. Unidades: milímetros. © 2026 Dudbil Olvasada Pabón Riaño · 10.Easy
// Uso: elige la pieza en `pieza` y exporta cada una a STL (F6 y luego F7 en OpenSCAD).
// Impresión sugerida: PETG para las rótulas y las flechas, PLA para la base; capa 0,20 mm, relleno 20 %, sin soportes.

pieza = "todo";        // "base" | "carga" | "soporte" | "flecha" | "disco" | "dipolo" | "cubeta" | "todo" (vista de montaje)

/* [Rejilla: la de la guía didáctica, 10 × 10 orificios cada 20 mm] */
paso        = 20;      // separación entre orificios (en el aula, 1 cuadro = 10 cm del taller)
n_orif      = 10;
orif_d      = 6.2;     // orificio para espigas de 6 mm
base_lado   = 220;
base_h      = 6;
holgura     = 0.25;    // tolerancia entre piezas que encajan

/* [Cargas fuente y flechas] */
espiga_d    = 6;
espiga_h    = 8;
cabeza_d    = 16;      // tapa de la carga: + o − en relieve; imprime en rojo (+) y azul (−)
signo       = "+";     // "+" | "-"   (para la pieza "carga")
bola_d      = 10;      // rótula esférica de la flecha
flecha_L    = 50;      // 30 | 50 | 80 mm: tres largos para tres órdenes de intensidad
flecha_s    = 4;       // sección cuadrada del astil

/* [Dipolo sobre disco angular] */
disco_d     = 96;      // disco con escala cada 15°; el 0° es el sentido de E
pivote_d    = 4;       // pasador de giro (clavo o varilla de 4 mm)
dipolo_L    = 70;      // distancia entre los centros de las dos esferas (d del modelo)
esfera_d    = 14;

/* [Cubeta para semillas en aceite (Young y Freedman, figura 21.30)] */
cub_L       = 140;
cub_W       = 90;
cub_h       = 14;
pared       = 2.4;
borne_d     = 4;       // varillas o bornes banana de 4 mm como electrodos
borne_sep   = 60;

$fn = 48;
eps = 0.01;

// ── Base: rejilla de 10 × 10 orificios, ejes grabados y toma central para el disco angular ──
module base() {
    off = -paso * (n_orif - 1) / 2;
    difference() {
        translate([-base_lado / 2, -base_lado / 2, 0]) cube([base_lado, base_lado, base_h]);
        for (i = [0 : n_orif - 1], j = [0 : n_orif - 1]) translate([off + i * paso, off + j * paso, -eps]) cylinder(d = orif_d + 2 * holgura, h = base_h + 1);
        // ejes x e y grabados entre filas, y su nombre
        translate([-base_lado / 2 + 4, -0.4, base_h - 0.6]) cube([base_lado - 8, 0.8, 1]);
        translate([-0.4, -base_lado / 2 + 4, base_h - 0.6]) cube([0.8, base_lado - 8, 1]);
        translate([base_lado / 2 - 8, 3, base_h - 0.6]) linear_extrude(1) text("x", size = 5, halign = "center");
        translate([3, base_lado / 2 - 10, base_h - 0.6]) linear_extrude(1) text("y", size = 5);
        // toma central para la espiga del disco angular (cae entre cuatro orificios)
        translate([0, 0, 1.5]) cylinder(d = 8 + 2 * holgura, h = base_h);
    }
}

// ── Carga fuente: espiga y tapa con el signo en relieve ──
module carga() {
    cylinder(d = espiga_d, h = espiga_h);
    translate([0, 0, espiga_h]) cylinder(d = cabeza_d, h = 5);
    translate([0, 0, espiga_h + 5]) linear_extrude(1.2) text(signo == "+" ? "+" : "−", size = 10, halign = "center", valign = "center", font = "Liberation Sans:style=Bold");
}

// ── Soporte con copa esférica (rótula de giro libre en 360°): tres ranuras dan el ajuste a presión ──
module soporte() {
    difference() {
        union() {
            cylinder(d = espiga_d, h = espiga_h);
            translate([0, 0, espiga_h]) cylinder(d = bola_d + 5, h = bola_d * 0.75);
        }
        translate([0, 0, espiga_h + bola_d / 2 + 1]) sphere(d = bola_d + 2 * holgura);
        for (a = [0, 120, 240]) rotate(a) translate([0, -0.6, espiga_h + 2]) cube([bola_d, 1.2, bola_d]);
    }
}

// ── Flecha de campo: bola en la cola, astil cuadrado y punta; la bola se aplana 1 mm para imprimir sin soportes ──
module flecha() {
    translate([0, 0, bola_d / 2 - 1]) difference() {
        union() {
            sphere(d = bola_d);
            rotate([0, 90, 0]) translate([0, 0, bola_d / 2 - 1]) translate([-flecha_s / 2, -flecha_s / 2, 0]) cube([flecha_s, flecha_s, flecha_L - 12]);
            translate([bola_d / 2 + flecha_L - 14, 0, 0]) rotate([0, 90, 0]) cylinder(d1 = 12, d2 = 0, h = 14);
        }
        translate([-50, -50, -bola_d / 2 - 50 + 1]) cube([200, 100, 50]);
    }
}

// ── Disco angular: escala cada 15° (número cada 45°) y flecha «E» grabada en 0° ──
module disco() {
    difference() {
        union() {
            cylinder(d = disco_d, h = 3);
            translate([0, 0, -4.4]) cylinder(d = 8, h = 4.4);                   // espiga a la toma central de la base (4,5 mm de fondo)
            cylinder(d = pivote_d + 4, h = 10);                                   // buje del pasador
        }
        translate([0, 0, -7]) cylinder(d = pivote_d + 2 * holgura, h = 20);
        for (a = [0 : 15 : 345]) rotate(a) translate([disco_d / 2 - (a % 45 == 0 ? 9 : 5), -0.35, 2.4]) cube([a % 45 == 0 ? 8 : 4, 0.7, 1]);
        for (a = [45 : 45 : 315]) rotate(a) translate([disco_d / 2 - 15, 0, 2.4]) rotate(-90) linear_extrude(1) text(str(a), size = 4, halign = "center", valign = "center");
        translate([disco_d / 2 - 20, -1, 2.4]) cube([12, 2, 1]);                  // astil de la «E»
        translate([disco_d / 2 - 8, 0, 2.4]) linear_extrude(1) polygon([[0, -3], [5, 0], [0, 3]]);
        translate([disco_d / 2 - 26, 4, 2.4]) linear_extrude(1) text("E", size = 5, halign = "center");
    }
}

// ── Dipolo: barra con dos copas para esferas de color (−q azul, +q rojo), buje central y vector p grabado de − a + ──
module dipolo() {
    difference() {
        union() {
            translate([-dipolo_L / 2, -4, 0]) cube([dipolo_L, 8, 5]);
            for (s = [-1, 1]) translate([s * dipolo_L / 2, 0, 0]) cylinder(d = esfera_d + 3, h = 5);
            cylinder(d = pivote_d + 6, h = 8);
        }
        translate([0, 0, -1]) cylinder(d = pivote_d + 2 * holgura, h = 10);
        for (s = [-1, 1]) translate([s * dipolo_L / 2, 0, 5 + esfera_d / 2 - 2]) sphere(d = esfera_d + 2 * holgura);   // copas
        translate([-dipolo_L / 2 + 12, -0.6, 4.4]) cube([dipolo_L - 30, 1.2, 1]);                                      // astil de p
        translate([dipolo_L / 2 - 18, 0, 4.4]) linear_extrude(1) polygon([[0, -2.5], [5, 0], [0, 2.5]]);
        translate([-dipolo_L / 2 + 4, -2.5, 4.4]) linear_extrude(1) text("−", size = 5, valign = "center");
        translate([dipolo_L / 2 - 8, -2.5, 4.4]) linear_extrude(1) text("+", size = 5, valign = "center");
    }
}

// ── Cubeta: bandeja estanca con dos tomas para electrodos de 4 mm (semillas en aceite, solo con el docente) ──
module cubeta() {
    difference() {
        translate([-cub_L / 2, -cub_W / 2, 0]) cube([cub_L, cub_W, cub_h]);
        translate([-cub_L / 2 + pared, -cub_W / 2 + pared, 2]) cube([cub_L - 2 * pared, cub_W - 2 * pared, cub_h]);
        for (s = [-1, 1]) translate([s * borne_sep / 2, 0, -eps]) cylinder(d = borne_d + 2 * holgura, h = 3);
        translate([-cub_L / 2 + 6, -cub_W / 2 + 4, 1]) linear_extrude(1.5) text("aceite + semillas", size = 4);
    }
    for (s = [-1, 1]) translate([s * borne_sep / 2, 0, 0]) difference() { cylinder(d = borne_d + 6, h = 8); translate([0, 0, -1]) cylinder(d = borne_d + 2 * holgura, h = 10); }
}

// ── Vista de montaje ──
module todo() {
    color("WhiteSmoke") base();
    off = -paso * (n_orif - 1) / 2;
    color("Crimson") translate([off + 1 * paso, off + 8 * paso, base_h]) carga();
    color("RoyalBlue") translate([off + 8 * paso, off + 8 * paso, base_h]) { cylinder(d = espiga_d, h = espiga_h); translate([0, 0, espiga_h]) cylinder(d = cabeza_d, h = 5); }
    for (p = [[3, 8, 0], [6, 8, 0], [3, 9, -30], [6, 9, 30]])   // fuera del disco angular translate([off + p[0] * paso, off + p[1] * paso, base_h]) { color("DimGray") soporte(); color("MediumPurple") translate([0, 0, espiga_h + bola_d / 2 + 1]) rotate(p[2]) flecha(); }
    color("Gainsboro") translate([0, 0, base_h]) disco();
    color("DarkGray") translate([0, 0, base_h + 10.5]) rotate(30) dipolo();   // gira sobre el pasador; φ = 30° respecto de E
}

if (pieza == "base") base();
else if (pieza == "carga") carga();
else if (pieza == "soporte") soporte();
else if (pieza == "flecha") flecha();
else if (pieza == "disco") disco();
else if (pieza == "dipolo") dipolo();
else if (pieza == "cubeta") cubeta();
else todo();
