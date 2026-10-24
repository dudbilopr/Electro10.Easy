# simulacion_gradiente.py · M03 · Comprueba E = -grad(V) por diferencias finitas.
# Demuestra numéricamente que V = 0 NO implica E = 0 (mediatriz del dipolo).
import sys
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

import numpy as np

K = 8.988e9

def V(x, y, qs):
    return sum(K * q[0] / np.hypot(x - q[1], y - q[2]) for q in qs)

qs = [(1e-9, 0.0, 0.0), (-1e-9, 0.10, 0.0)]   # dipolo ±1 nC en el eje x
h = 1e-6

print("=== Gradiente numérico: E = -grad(V) en un dipolo ±1 nC ===")
for (x, y) in [(0.05, 0.02), (0.05, 0.05), (0.03, 0.0)]:
    Ex = -(V(x + h, y, qs) - V(x - h, y, qs)) / (2 * h)   # E_x = -dV/dx
    Ey = -(V(x, y + h, qs) - V(x, y - h, qs)) / (2 * h)   # E_y = -dV/dy
    print(f"P({x:.2f},{y:.2f})  V={V(x,y,qs):8.1f} V   E=({Ex:8.0f}, {Ey:8.0f}) V/m   |E|={np.hypot(Ex,Ey):8.0f}")
