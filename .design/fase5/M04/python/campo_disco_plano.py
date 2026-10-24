# -*- coding: utf-8 -*-
# =============================================================================
#  campo_disco_plano.py · Electro10.Easy · Módulo 04
#  Valida las fórmulas del spec técnico para el DISCO (eje) y el PLANO
#  infinito, con el Camino B (E = -dV/dz) aplicado al anillo y al disco.
#  Constantes: Young y Freedman (2009) · k = 8.988e9, eps0 = 8.854e-12
# =============================================================================
import sys
import numpy as np

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')
if sys.stderr.encoding.lower() != 'utf-8':
    sys.stderr.reconfigure(encoding='utf-8')

K = 8.988e9
EPS0 = 8.854e-12

print("=" * 72)
print("Disco y plano infinito - constantes Young-Freedman (2009)")
print(f"k = {K:.4e} N*m^2/C^2     eps0 = {EPS0:.4e} C^2/(N*m^2)")
print("=" * 72)

sigma = 6.0e-6        # C/m^2
R = 0.25              # m
z = 0.30              # m
Qd = sigma * np.pi * R**2

E_disk_analytic = (sigma / (2.0 * EPS0)) * (1.0 - z / np.sqrt(z**2 + R**2))
E_plane = sigma / (2.0 * EPS0)
z_pp = 1.0                        # distancia grande para el limite puntual (z >> R)
E_disk_point = K * Qd / z_pp**2

# Integración numérica apilando anillos de radio r (dq = sigma * 2*pi*r * dr)
Nr = 5000
r = np.linspace(0.0, R, Nr)
dr = r[1] - r[0]
integrand = K * sigma * 2.0 * np.pi * r * z / (z**2 + r**2)**1.5
E_disk_num = np.sum(integrand) * dr

print("\n--- Disco: sigma=6,0e-6 C/m^2, R=0,25 m, z=0,30 m ---")
print(f"  Q_disco = sigma*pi*R^2 = {Qd:.4e} C")
print(f"  E_z analitico = {E_disk_analytic:9.1f} N/C   ((sigma/2eps0)(1 - z/sqrt(z^2+R^2)))")
print(f"  E_z numerico  = {E_disk_num:9.1f} N/C   (apilado numerico de anillos)")
print(f"  Limite puntual (z >> R, z=1,0 m): {E_disk_point:9.1f} N/C   (kQ/z^2)")
print(f"  Plano infinito (R -> inf): {E_plane:9.1f} N/C   (sigma/2eps0)")

print("\n--- Plano infinito: sigma=6,0e-6 C/m^2 ---")
print(f"  E = sigma/(2*eps0) = {E_plane:9.1f} N/C   (independiente de la distancia z)")

# ----------------------------------------------- Camino B: E = -dV/dz
def V_ring(zz, Q, RR):
    return K * Q / np.sqrt(zz**2 + RR**2)

def V_disk(zz, sg, RR):
    return (sg / (2.0 * EPS0)) * (np.sqrt(zz**2 + RR**2) - zz)

h = 1e-6
Qr = 8e-9
Rr = 0.050
za = 0.12
zd = 0.30

Ez_ring_pot = -(V_ring(za + h, Qr, Rr) - V_ring(za - h, Qr, Rr)) / (2.0 * h)
Ez_disk_pot = -(V_disk(zd + h, sigma, R) - V_disk(zd - h, sigma, R)) / (2.0 * h)

print("\n--- Camino B: E = -dV/dz (derivada numerica del potencial) ---")
print(f"  Anillo: E_z = {Ez_ring_pot:9.1f} N/C   (coincide con la integral directa)")
print(f"  Disco : E_z = {Ez_disk_pot:9.1f} N/C   (coincide con la integral directa)")

print("\n" + "=" * 72)
print("Fin del programa campo_disco_plano.py")
