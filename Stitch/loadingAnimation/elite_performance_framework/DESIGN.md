---
name: Elite Performance Framework
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#cfc4c5'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#988e90'
  outline-variant: '#4c4546'
  surface-tint: '#c6c6c6'
  primary: '#c6c6c6'
  on-primary: '#303030'
  primary-container: '#000000'
  on-primary-container: '#757575'
  inverse-primary: '#5e5e5e'
  secondary: '#ffb4a8'
  on-secondary: '#680200'
  secondary-container: '#e00600'
  on-secondary-container: '#fff1ef'
  tertiary: '#c6c6c7'
  on-tertiary: '#2f3131'
  tertiary-container: '#000000'
  on-tertiary-container: '#747576'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#ffdad4'
  secondary-fixed-dim: '#ffb4a8'
  on-secondary-fixed: '#410100'
  on-secondary-fixed-variant: '#930300'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 64px
    fontWeight: '900'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  section-gap-desktop: 120px
  section-gap-mobile: 64px
  grid-columns: '12'
  gutter: 24px
  margin: 40px
---

## Brand & Style

The design system is engineered for the **Indian Institute of Fitness & Nutrition (IIFN)**, targeting high-performance athletes, fitness professionals, and serious students. The brand personality is **authoritative, intense, and premium**. It avoids the clutter of traditional ed-tech in favor of a high-end "Performance Lab" aesthetic.

The visual style blends **High-Contrast Minimalism** with **Glassmorphism**. By using a pure black foundation, we create a "dark room" effect that makes the Intense Red accent feel like a source of energy and light. The UI should evoke the feeling of a premium gym or a high-tech athletic dashboard: disciplined, powerful, and cutting-edge.

## Colors

This design system utilizes a **High-Intensity Dark Mode** palette. 

- **Primary (Pure Black):** Used for the main canvas to provide maximum depth and contrast.
- **Accent (Intense Red):** Used exclusively for high-priority actions, progress indicators, and "active" states. It represents heat, energy, and the "IIFN" brand core.
- **Surface (Neutral):** A slightly lifted gray (#1A1A1A) used for secondary containers to differentiate from the infinite black background.
- **Typography:** White (#FFFFFF) is the standard for high-readability body copy, while a muted gray (#888888) is used for tertiary metadata.

## Typography

The typography strategy is built on **Strength and Precision**. 

**Montserrat** is used for all headlines in its Bold to Black weights. It provides a geometric, masculine structure that feels architectural and grounded. To maximize impact, the largest display sizes should use tight letter spacing and uppercase styling.

**Inter** handles all functional copy. It was chosen for its exceptional legibility in dark mode environments. Its neutral, systematic nature ensures that dense nutritional data or course modules remain readable and professional.

## Layout & Spacing

The layout follows a **Fixed Grid** model for a structured, editorial feel. 

- **Desktop:** A 12-column grid with generous 120px vertical spacing between major sections to emphasize the "Premium" positioning.
- **Negative Space:** Use white space as a design element. Content should never feel cramped; large margins give the bold typography room to breathe.
- **Rhythm:** All spacing (padding, margins, gaps) must be multiples of 8px. 
- **Responsibility:** On mobile, the grid collapses to 4 columns. Headlines should scale down significantly to maintain the athletic impact without breaking layouts.

## Elevation & Depth

Depth is achieved through **Optical Layering** rather than traditional drop shadows.

1.  **Base Layer:** Pure Black (#000000) - The foundation.
2.  **Card Layer:** Deep Gray (#111111) with a thin 1px border (#222222) to define the edge.
3.  **Glass Layer:** Used for navigation bars and side panels. Use a backdrop-blur of 20px and a 10% white opacity fill. This creates a "frosted glass" effect that allows background colors/images to bleed through subtly.
4.  **Accent Glow:** For the most important CTAs, use a "Red Heat" glow—an outer shadow using #E10600 at 30% opacity with a high blur radius (20px-40px). This makes the button appear as if it is emitting energy.

## Shapes

The shape language is **Soft but Structured**. We use a 0.25rem (4px) base radius. This provides a subtle "machined" edge that feels more technical and precise than sharp corners, but more aggressive and professional than fully rounded/pill shapes. 

Large-scale components like hero image containers may use 0.5rem (8px) to feel more integrated into the modern web aesthetic, but never exceed this to maintain the masculine, athletic tone.

## Components

- **Primary Buttons:** Solid #E10600 background with white uppercase bold text. Include a subtle red outer glow on hover to simulate "activation."
- **Secondary Buttons:** 1.5px solid white border with transparent background. Text is white.
- **Course Cards:** Utilize the "Neutral" surface (#1A1A1A). Images should feature high-contrast, desaturated photography. A 4px red accent bar should appear on the left or top edge of "Active" cards.
- **Data Tables:** For nutrition facts or course modules, use a "Zebra" striping with #000000 and #0A0A0A. Headers should be all-caps using `label-bold`.
- **Input Fields:** Pure black fill with a 1px #333333 border. On focus, the border transitions to #E10600 with a subtle red inner glow.
- **Progress Indicators:** Linear bars should be #222222 (track) and #E10600 (fill), emphasizing the "Elite" energy of the brand.