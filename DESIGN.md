---
name: Sistema de Diseño - Electro10
colors:
  surface: '#f8fafd'
  surface-dim: '#f8fafd'
  surface-bright: '#ffffff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f5f9'
  surface-container: '#e2e8f0'
  surface-container-high: '#cbd5e1'
  surface-container-highest: '#94a3b8'
  on-surface: '#0f172a'
  on-surface-variant: '#334155'
  inverse-surface: '#0f172a'
  inverse-on-surface: '#f8fafd'
  outline: '#94a3b8'
  outline-variant: '#cbd5e1'
  surface-tint: '#0284c7'
  primary: '#0284c7'
  on-primary: '#ffffff'
  primary-container: '#bae6fd'
  on-primary-container: '#0369a1'
  inverse-primary: '#38bdf8'
  secondary: '#0ea5e9'
  on-secondary: '#ffffff'
  secondary-container: '#e0f2fe'
  on-secondary-container: '#0284c7'
  tertiary: '#8b5cf6'
  on-tertiary: '#ffffff'
  tertiary-container: '#ede9fe'
  on-tertiary-container: '#6d28d9'
  error: '#ef4444'
  on-error: '#ffffff'
  error-container: '#fee2e2'
  on-error-container: '#b91c1c'
  background: '#f8fafd'
  on-background: '#0f172a'
  # Custom Neon Colors for Themes
  electric-blue: '#00F0FF'
  magnetic-magenta: '#FF003C'
  kinetic-green: '#00FFA3'
typography:
  h1:
    fontFamily: Outfit
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  h3:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  sidebar-width: 260px
  sidebar-collapsed: 72px
  gutter: 16px
---

# Estrategia de Rediseño: Laboratorio Cuántico (Electro10)

## 1. Overview
El rediseño transforma la plataforma en un HUD (Heads-Up Display) de laboratorio científico. Mantenemos un **Modo Claro** por defecto con altos contrastes (blancos limpios y azules técnicos), pero la estructura está preparada para un Modo Oscuro inmersivo.

## 2. Conceptos Clave
- **Glassmorphism:** Las tarjetas principales tienen fondos ligeramente translúcidos con bordes finos, evocando paneles de cristal inteligente.
- **Colores Temáticos:** Cada módulo de la física utilizará su propio color de acento para reforzar el contexto (Azul Eléctrico para Electricidad, Magenta para Magnetismo).
- **Tipografía:** Combinación de `Outfit` (geométrica, moderna, perfecta para encabezados científicos) e `Inter` (alta legibilidad para el contenido educativo).
- **Sombras Direccionales:** En lugar de sombras difusas, usaremos "brillos" suaves (`box-shadow` teñido con el color primario) para simular emisión de luz.

## 3. Elementos de Interfaz
- **Tarjetas Bento:** La estructura de los dashboards se dividirá en cajas con bordes redondeados suaves (`1rem` o `1.5rem`), separando claramente el contenido sin usar líneas divisorias sólidas.
- **Botones:** Gradients sutiles que sugieren volumen, con interacciones `hover` que aumentan el "brillo" (glow).
