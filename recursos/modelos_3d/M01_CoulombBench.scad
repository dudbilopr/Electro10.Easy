// CoulombBench-3D · Balanza de torsión didáctica y cuna triboeléctrica (Módulo 1, Electro10.Easy)
// Modelo paramétrico en OpenSCAD. Unidades: milímetros. © 2026 Dudbil Olvasada Pabón Riaño · 10.Easy
// Uso: elige la pieza en `pieza` y exporta cada una a STL (F6 y luego F7 en OpenSCAD).
// Impresión sugerida: PLA+, capa 0,16 mm, relleno 20 %, sin soportes salvo la torre (ver ESPECIFICACION).

pieza = "todo";        // "base" | "torre" | "brazo" | "poste" | "cuna" | "todo" (vista de montaje)

/* [Geometría que fija la física: coincide con el ejercicio 8 del taller] */
b_brazo     = 50;      // distancia del hilo al centro de la esfera móvil (b = 5,0 cm)
d_esfera    = 15;      // diámetro de las esferas metalizadas (Ø 15 mm)
r_min       = 30;      // separación mínima entre centros de esferas en el riel (3,0 cm)
r_max       = 90;      // separación máxima (9,0 cm)

/* [Base con escala angular] */
base_d      = 240;     // diámetro de la base (la escala queda fuera de la torre y del riel)
base_h      = 8;
toma_d      = 20;      // toma de la torre
torre_pos   = 75;      // la torre va en (0, -torre_pos): fuera del giro del brazo (radio 57,5 mm)
holgura     = 0.25;    // tolerancia mecánica entre piezas que encajan

/* [Torre y pinza del hilo] */
torre_h     = 220;
torre_d     = 20;
pinza_ranura = 0.8;    // ranura para fibra o alambre fino

/* [Brazo ultraligero] */
brazo_ancho = 4;
brazo_alto  = 3;
copa_pared  = 1.2;

/* [Riel del poste fijo] */
riel_ancho  = 12;
riel_alto   = 4;

$fn = 64;

// ── Base: disco con escala de 0° a 360° (marca cada 1°, larga cada 10°, número cada 30°) y riel radial ──
module base() {
    difference() {
        cylinder(d = base_d, h = base_h);
        translate([0, -torre_pos, 2]) cylinder(d = toma_d + 2 * holgura, h = base_h);  // toma de la torre
        for (a = [0 : 1 : 359]) rotate(a)
            translate([base_d / 2 - (a % 10 == 0 ? 9 : 5), -0.3, base_h - 0.6]) cube([a % 10 == 0 ? 8 : 4, 0.6, 1]);
        for (a = [0 : 30 : 330]) if (a != 60) rotate(a) translate([base_d / 2 - 19, 0, base_h - 0.6])
            rotate(-90) linear_extrude(1) text(str(a), size = 4, halign = "center", valign = "center");
        // riel radial para el poste de la esfera fija, sobre la perpendicular al brazo en reposo
        translate([b_brazo - riel_ancho / 2 - holgura, 0, base_h - riel_alto]) cube([riel_ancho + 2 * holgura, r_max + 5, riel_alto + 1]);   // corto: no toca la escala
        for (mm = [r_min : 10 : r_max]) translate([b_brazo + riel_ancho / 2 + 1.5, mm, base_h - 0.6]) cube([3, 0.6, 1]);
    }
}

// ── Torre en horca: columna con espiga, viga hasta el centro y pinza del hilo sobre el eje de giro ──
module torre() {
    difference() {
        union() {
            translate([0, -torre_pos, 0]) cylinder(d = toma_d, h = 6);                     // espiga que entra en la base
            translate([0, -torre_pos, 6]) cylinder(d = torre_d, h = torre_h);              // columna
            translate([-torre_d / 2, -torre_pos, 6 + torre_h - 12]) cube([torre_d, torre_pos, 12]);  // viga
            translate([0, 0, 6 + torre_h - 12]) cylinder(d = torre_d + 6, h = 22);         // cabeza de la pinza, sobre el eje
        }
        translate([0, 0, -1]) cylinder(d = 2.4, h = 6 + torre_h + 20);                     // paso vertical del hilo
        translate([-pinza_ranura / 2, -torre_d, 6 + torre_h]) cube([pinza_ranura, 2 * torre_d, 11]);   // ranura que pellizca la fibra
        translate([0, 0, 6 + torre_h + 5]) rotate([0, 90, 0]) cylinder(d = 3.2, h = torre_d + 12, center = true);  // tornillo M3 de la pinza
    }
}

// ── Copa para una esfera de Ø d_esfera ──
module copa(d) {
    difference() { cylinder(d = d + 2 * copa_pared, h = d / 2); translate([0, 0, d / 2]) sphere(d = d + 2 * holgura); }
}

// ── Brazo: copa de la esfera móvil a b_brazo, contrapeso al otro lado, buje del hilo y aguja indicadora ──
module brazo() {
    translate([-b_brazo, -brazo_ancho / 2, 0]) cube([2 * b_brazo, brazo_ancho, brazo_alto]);
    translate([b_brazo, 0, 0]) copa(d_esfera);
    translate([-b_brazo, 0, 0]) copa(d_esfera);                                   // contrapeso: otra esfera igual, sin carga
    difference() { cylinder(d = 10, h = 8); translate([0, 0, 5]) rotate([90, 0, 0]) cylinder(d = 1.6, h = 12, center = true); } // buje con ojal para el hilo
    rotate(90) translate([0, -0.6, 0]) cube([base_d / 2 - 12, 1.2, 1.2]);          // aguja que lee la escala de la base
}

// ── Poste de la esfera fija: patín que corre por el riel y copa a la altura de la esfera móvil ──
module poste(altura = 160) {
    cube([riel_ancho, 20, riel_alto], center = false);
    translate([riel_ancho / 2, 10, 0]) cylinder(d = 8, h = altura);
    translate([riel_ancho / 2, 10, altura]) copa(d_esfera);
    translate([-1, 9.7, 0]) cube([1, 0.6, riel_alto + 2]);                         // índice para leer r en el riel
}

// ── Cuna triboeléctrica: bloque con ranuras para barras de Ø 10 a 12 mm (ebonita, vidrio, acrílico) ──
module cuna() {
    difference() {
        cube([90, 40, 22]);
        for (i = [0 : 2]) translate([15 + i * 30, -1, 22]) rotate([-90, 0, 0]) cylinder(d = 10 + i + 2 * holgura, h = 42);
        translate([4, 4, 21]) linear_extrude(1.2) text("10 · 11 · 12 mm", size = 4);
    }
}

if (pieza == "base") base();
else if (pieza == "torre") torre();
else if (pieza == "brazo") brazo();
else if (pieza == "poste") poste();
else if (pieza == "cuna") cuna();
else {                                    // vista de montaje (no se imprime así)
    color("Gainsboro") base();
    color("Silver") translate([0, 0, 2]) torre();
    color("Black") translate([0, 0, 2 + 6 + 160 - d_esfera / 2 + 8]) cylinder(d = 0.6, h = torre_h - 160);  // hilo de torsión
    color("DimGray") translate([0, 0, 2 + 6 + 160 - d_esfera / 2]) brazo();
    color("LightGray") translate([b_brazo - riel_ancho / 2, 60, base_h - riel_alto]) poste(160 + 6 - d_esfera / 2 - 4);
    color("Thistle") translate([-45, -base_d / 2 - 60, 0]) cuna();
}
