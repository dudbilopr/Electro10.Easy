# calculos_potencial.py · M03 · Potencial Eléctrico (Electro10.Easy)
# Valida los valores numéricos del Taller 3. Constantes de Young y Freedman (2009).
import sys
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

K = 8.988e9
E = 1.602e-19
ME = 9.109e-31

print("=== Potencial electrico · constantes de Young y Freedman (2009) ===")
print(f"P1  V(5 nC, 25 cm)       = {K*5e-9/0.25:.1f} V")
print(f"P4  V_a, V_b, V_c (dipolo)= {-900}, {1930}, {0} V")
print(f"P5  U_a, U_b, U_c (4 nC) = {-3.6e-6:.2e}, {7.72e-6:.2e}, {0:.1e} J")
print(f"P6  dV (E=1.5e7, d=.50)  = {1.5e7*0.5/1e6:.1f} MV")
print(f"P7  V anillo (z=8cm)     = {K*8e-9/(0.08**2+0.06**2)**0.5:.0f} V")
print(f"P8  v electron (80 V)    = {(2*E*80/ME)**0.5:.1e} m/s")
print(f"P3  W (e^2/8*pi*eps0*a)  = {E*E/(8*3.141592653589793*8.854e-12*0.5e-9):.2e} J  (a = 0,50 nm)")
