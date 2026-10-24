# -*- coding: utf-8 -*-
# =============================================================================
#  campo_varilla_anillo.py · Electro10.Easy · Módulo 04
#  Valida las fórmulas del spec técnico para la VARILLA finita (mediatriz) y
#  el ANILLO (eje axial): integración numérica frente a solución analítica,
#  con verificación de los límites asintóticos.
#  Constantes: Young y Freedman (2009) · k = 8.988e9, eps0 = 8.854e-12
# =============================================================================
import sys
import numpy as np

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')
if sys.stderr.encoding.lower() != 'utf-8':
    sys.stderr.reconfigure(encoding='utf-8')

K = 8.988e9          # N*m^2/C^2
EPS0 = 8.854e-12     # C^2/(N*m^2)

print("=" * 72)
print("Distribuciones continuas - constantes Young-Freedman (2009)")
print(f"k = {K:.4e} N*m^2/C^2     eps0 = {EPS0:.4e} C^2/(N*m^2)")
print("=" * 72)

# ---------------------------------------------------------------- 1) Varilla
Qv = 12e-9          # C
L = 0.60            # m
a = 0.40            # m (distancia en la mediatriz)
lam = Qv / L

E_rod_analytic = K * Qv / (a * np.sqrt(a**2 + (L / 2.0)**2))
E_rod_point    = K * Qv / a**2
E_rod_inf      = 2.0 * K * lam / a

# Integración numérica: solo la componente perpendicular sobrevive
N = 200000
xs = np.linspace(-L / 2.0, L / 2.0, N)
dx = xs[1] - xs[0]
dq = lam * dx
Ey_num = np.sum(K * dq * a / (xs**2 + a**2)**1.5)

print("\n--- Varilla finita: Q=+12 nC, L=0,60 m, a=0,40 m ---")
print(f"  E_analitico = {E_rod_analytic:9.1f} N/C   (E = kQ/(a*sqrt(a^2+(L/2)^2)))")
print(f"  E_numerico  = {Ey_num:9.1f} N/C   (integracion numerica de dE_y)")
print(f"  Limite puntual (a >> L) : {E_rod_point:9.1f} N/C   (kQ/a^2)")
print(f"  Limite infinito (L >> a): {E_rod_inf:9.1f} N/C   (2*k*lambda/a)")

# ------------------------------------------------------------------ 2) Anillo
Qr = 8e-9           # C
R  = 0.050          # m
z  = 0.12           # m

E_ring_analytic = K * Qr * z / (z**2 + R**2)**1.5
zmax = R / np.sqrt(2.0)
E_ring_max = 2.0 * K * Qr / (3.0 * np.sqrt(3.0) * R**2)

# Integración numérica sobre el perímetro (ángulo azimutal)
phi = np.linspace(0.0, 2.0 * np.pi, 200000, endpoint=False)
dphi = phi[1] - phi[0]
dq = Qr * dphi / (2.0 * np.pi)
dq_arr = np.full(phi.size, dq)          # cada tramo dphi aporta el mismo dq
Ez_num = np.sum(K * dq_arr * z / (z**2 + R**2)**1.5)

print("\n--- Anillo: Q=+8,0 nC, R=0,050 m, z=0,12 m ---")
print(f"  E_z analitico = {E_ring_analytic:9.1f} N/C   (kQz/(z^2+R^2)^(3/2))")
print(f"  E_z numerico  = {Ez_num:9.1f} N/C   (suma sobre el perimetro)")
print(f"  Maximo en z=R/sqrt(2) = {zmax:.4f} m  ->  E_max = {E_ring_max:9.1f} N/C")
print("  E(z=0) = 0 N/C (las componentes opuestas se cancelan por simetria)")

print("\n" + "=" * 72)
print("Fin del programa campo_varilla_anillo.py")
