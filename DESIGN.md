# Design System Specification: The Kinetic Nebula

## 1. Overview & Creative North Star: "The Neural Architect"
This design system moves beyond the "SaaS dashboard" trope, positioning itself as a high-end, immersive interface for the next generation of talent. Our Creative North Star is **"The Neural Architect."** It envisions a workspace that feels like a holographic command center—professional, precise, but alive with energy.

To break the "template" look, we abandon rigid grids in favor of **Intentional Asymmetry**. Large-scale typography (Space Grotesk) should overlap background elements, and 3D icons should break the "bounding box" of containers to create a sense of physical depth. We are not just building a platform; we are building a digital atmosphere where learning feels like an evolution.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the void of deep space, punctuated by the high-frequency vibrations of neon accents.

### The Palette (Material Design Tokens)
- **Base:** `background (#0b0e14)` / `surface (#0b0e14)`
- **Primary (Neon Cyan):** `primary (#8ff5ff)` / `primary_container (#00eefc)`
- **Secondary (Electric Violet):** `secondary (#d575ff)` / `secondary_container (#9800d0)`
- **Tertiary (Lime Tech):** `tertiary (#bcff5f)` / `tertiary_container (#a2f31f)`

### The "No-Line" Rule
Sectioning must never be achieved with 1px solid borders. Use background shifts from the **Surface Hierarchy**:
- **Base Layer:** `surface`
- **Sectioning:** `surface_container_low`
- **Interactive Cards:** `surface_container` or `surface_container_high`
- **Floating Modals:** `surface_bright` with backdrop blur.

### The "Glass & Gradient" Rule
To achieve a premium, futuristic feel, all primary CTAs and high-level headers should utilize **Signature Textures**. 
*   **Action Gradient:** Transition from `primary` (#8ff5ff) to `primary_dim` (#00deec) at a 135-degree angle.
*   **The Glass Layer:** Use `surface_variant` at 40% opacity with a `20px` backdrop-blur for all navigation and overlay elements.

---

## 3. Typography: Editorial Tech
We use a tri-font system to balance high-tech aesthetics with extreme readability.

*   **Display & Headlines (Space Grotesk):** This is our "voice." Use `display-lg` (3.5rem) for hero sections and `headline-lg` (2rem) for page titles. The wide, geometric apertures of Space Grotesk suggest a futuristic, architectural precision.
*   **Interface & Titles (Manrope):** Used for `title-lg` through `body-lg`. Manrope’s modern sans-serif builds trust and ensures the "Professional" half of our tone is maintained.
*   **System Labels (Plus Jakarta Sans):** Reserved for `label-md` and `label-sm`. Its slightly tighter tracking and high x-height make it perfect for micro-copy and data-heavy "gamified" stats.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are replaced by **Light Emission** and **Tonal Stacking**.

### The Layering Principle
Depth is achieved by nesting. A `surface_container_lowest` card sitting on a `surface_container_high` section creates a recessed "dock" look. For a "lifted" look, place a `surface_bright` element on the `background`.

### Ambient Glows (Beyond Shadows)
When an element must "float," use an **Ambient Glow** instead of a drop shadow.
*   **Shadow Color:** Use a 10% opacity version of the `primary` or `secondary` token.
*   **Blur:** 40px to 60px spread to mimic the glow of a neon light against a dark wall.

### The "Ghost Border" Fallback
If an edge must be defined for accessibility, use the `outline_variant` token at **15% opacity**. This creates a "laser-etched" glass look rather than a heavy container edge.

---

## 5. Components: The High-Tech Toolkit

### Buttons: The Power Cells
- **Primary:** Gradient fill (`primary` to `primary_dim`). No border. `xl` (0.75rem) roundedness. Add a subtle `primary` outer glow on hover.
- **Secondary:** `surface_container_highest` background with a `primary` "Ghost Border."
- **Tertiary:** Text-only in `primary`, using `label-md` weight.

### Input Fields: Holographic Data Entry
Forgo the four-sided box. Use a bottom-only border (2px) using `outline_variant`. On focus, the border transitions to `primary` with a 4px vertical glow (linear-gradient). Use `surface_container_low` as a subtle field fill.

### Progress Bars: The Velocity Meter
Progress bars must feel kinetic. Use a `secondary` background for the track and `primary` for the fill. Add a "scanning" animation: a high-light streak (white at 30% opacity) that slides across the fill every 3 seconds.

### Cards: Modular Hubs
Forbid divider lines. Use `spacing-6` (1.5rem) of vertical whitespace to separate header and body. Use a `surface_container_highest` background for the header and `surface_container` for the body to create an integrated, multi-tonal unit.

### 3D Icons & Chips
- **Icons:** Must use a 3-color palette (Cyan, Violet, and White). Light source should always come from the top-left to maintain consistency.
- **Chips:** Use `secondary_container` with `on_secondary_container` text. Roundedness: `full`.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Negative Space:** Use the `24` (6rem) spacing token between major sections to let the "deep space" background breathe.
*   **Animate Transitions:** Use "Spring" physics (stiff, low-dampening) for hover states to make the UI feel responsive and mechanical.
*   **Layer Glass:** Use backdrop-blurs on all navigation bars to show the content moving underneath, reinforcing the "holographic" feel.

### Don’t:
*   **Don't use 100% Black:** Always use `background` (#0b0e14). Pure black (#000000) kills the depth and makes the neon accents look "cheap."
*   **Don't use heavy borders:** If you feel the need for a border, use a background color shift instead.
*   **Don't center everything:** High-end editorial design thrives on asymmetrical balance. Try left-aligned headlines with right-aligned supporting imagery.