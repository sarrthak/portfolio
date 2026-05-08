---
name: Technical Precision
colors:
  surface: '#faf8ff'
  surface-dim: '#d8d9e4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3fe'
  surface-container: '#ecedf8'
  surface-container-high: '#e6e7f2'
  surface-container-highest: '#e1e2ec'
  on-surface: '#191b23'
  on-surface-variant: '#424754'
  inverse-surface: '#2e3038'
  inverse-on-surface: '#eff0fb'
  outline: '#727786'
  outline-variant: '#c2c6d6'
  surface-tint: '#0059c8'
  primary: '#0057c3'
  on-primary: '#ffffff'
  primary-container: '#1f6feb'
  on-primary-container: '#fffcff'
  inverse-primary: '#afc6ff'
  secondary: '#565f69'
  on-secondary: '#ffffff'
  secondary-container: '#dae3ef'
  on-secondary-container: '#5c656f'
  tertiary: '#9d3f00'
  on-tertiary: '#ffffff'
  tertiary-container: '#c55100'
  on-tertiary-container: '#fffdff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#afc6ff'
  on-primary-fixed: '#001944'
  on-primary-fixed-variant: '#004299'
  secondary-fixed: '#dae3ef'
  secondary-fixed-dim: '#bec7d2'
  on-secondary-fixed: '#141c25'
  on-secondary-fixed-variant: '#3f4851'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb693'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7a3000'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ec'
typography:
  display:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h1:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h2:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.02em
  mono-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 16px
  margin: 24px
---

## Brand & Style

This design system is engineered for high-density data environments where clarity and technical rigor are paramount. It evolves a complex data aesthetic into a refined, light-mode interface that feels like a precision instrument. The brand personality is authoritative yet unobtrusive, prioritizing information architecture over visual flair. 

The style utilizes a **Modern Minimalist** approach with a "Technical Utility" edge. It avoids the heavy glows of traditional dark-themed data systems in favor of razor-sharp lines, subtle tonal shifts, and intentional whitespace. The emotional response should be one of "controlled complexity"—giving the user confidence that they are working with a powerful, enterprise-grade data tool.

## Colors

The palette is anchored by a pure `#ffffff` background for primary workspaces, with `#f6f8fa` used for sidebars, headers, and recessed wells to create structural logic. 

- **Primary:** The deep GitHub blue (`#1f6feb`) is the sole driver of action and focus. It is used sparingly for primary buttons, active states, and critical progress indicators.
- **Neutrals:** A range of slates and grays define the hierarchy. Text is set in a high-contrast dark slate to ensure maximum legibility against white surfaces.
- **Accents:** Semantic colors (success, warning, error) should follow the same high-chroma, technical profile as the primary blue but are reserved strictly for status communication.

## Typography

This design system uses **Geist** as its primary typeface to maintain a developer-centric, technical aesthetic. Geist’s geometric rigor and clean terminals ensure that even dense tables of data remain readable. 

For code blocks, logs, or raw data strings, **JetBrains Mono** is introduced to provide clear character distinction (e.g., 0 vs O). Letter spacing is tightened slightly on headlines to maintain a "locked-in" look, while labels use a slight tracking increase for better scanning at small sizes.

## Layout & Spacing

The system follows a strict **4px baseline grid** to ensure mathematical consistency across all components. Layouts are primarily **Fixed-Fluid hybrids**: sidebars and utility panels maintain fixed widths (e.g., 240px or 320px) to preserve density, while the primary data canvas scales to fill the viewport.

- **Margins:** 24px container padding for standard views; 40px for editorial or dashboard overviews.
- **Density:** High density is the default. Information-heavy views should utilize 8px and 4px spacing increments to group related data points tightly.

## Elevation & Depth

In this design system, depth is achieved through **Tonal Layering** and **Micro-Shadows** rather than dramatic elevation or glows. 

1.  **Level 0 (Background):** `#ffffff` or `#f6f8fa`.
2.  **Level 1 (Cards/Panels):** Pure `#ffffff` surface with a 1px border (`#d0d7de`).
3.  **Level 2 (Dropdowns/Popovers):** `#ffffff` surface, 1px border, and a "Soft Technical Shadow": `0px 4px 12px rgba(27, 34, 44, 0.08)`.

Avoid any blurs or glows. Elements should feel "clipped" into the interface. Use subtle 1px internal strokes for buttons to give them a tactile, inset feel when pressed.

## Shapes

The design system adheres to the **rounded-eight (8px)** corner radius as its foundational geometry. This radius provides a professional balance—soft enough to feel modern, but sharp enough to maintain a technical, grid-aligned character.

- **Base Components:** Buttons, inputs, and small cards use 8px (`0.5rem`).
- **Large Containers:** Main content areas or modal backgrounds may use 12px (`0.75rem`) to emphasize containment.
- **Inner Elements:** Nested items (like chips inside an input) should drop to 4px (`0.25rem`) to maintain visual concentricity.

## Components

- **Buttons:** Primary buttons use `#1f6feb` with white text and no gradient. Secondary buttons use a white surface, `#d0d7de` border, and `#1b222c` text. 
- **Input Fields:** Use a white background with a 1px border. On focus, the border transitions to the primary blue with a 2px "halo" shadow of 10% opacity blue (not a glow, but a crisp offset).
- **Cards:** Defined by a 1px `#d0d7de` border. Headers within cards should have a subtle `#f6f8fa` background to separate metadata from content.
- **Chips/Tags:** Small, 4px radius, using high-contrast slate text on a `#eff2f5` background.
- **Data Tables:** Row-based layout with 1px horizontal dividers only. Header cells should use `label-md` typography in all-caps with a subtle background tint.
- **Checkboxes:** Square with a 2px radius, turning primary blue when checked with a crisp white checkmark. Avoid rounded-circle styles for checkboxes to maintain the "technical" feel.