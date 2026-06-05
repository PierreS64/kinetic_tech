---
name: Kinetic Tech
colors:
  surface: '#111415'
  surface-dim: '#111415'
  surface-bright: '#373a3b'
  surface-container-lowest: '#0c0f10'
  surface-container-low: '#191c1d'
  surface-container: '#1d2021'
  surface-container-high: '#282a2b'
  surface-container-highest: '#323536'
  on-surface: '#e1e3e4'
  on-surface-variant: '#c1c6d7'
  inverse-surface: '#e1e3e4'
  inverse-on-surface: '#2e3132'
  outline: '#8b90a0'
  outline-variant: '#414754'
  surface-tint: '#adc7ff'
  primary: '#adc7ff'
  on-primary: '#002e68'
  primary-container: '#4a8eff'
  on-primary-container: '#00285b'
  inverse-primary: '#005bc0'
  secondary: '#ffb77d'
  on-secondary: '#4d2600'
  secondary-container: '#fd8b00'
  on-secondary-container: '#603100'
  tertiary: '#b9c7e4'
  on-tertiary: '#233148'
  tertiary-container: '#8391ad'
  on-tertiary-container: '#1c2a41'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc7ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#d6e3ff'
  tertiary-fixed-dim: '#b9c7e4'
  on-tertiary-fixed: '#0d1c32'
  on-tertiary-fixed-variant: '#39475f'
  background: '#111415'
  on-background: '#e1e3e4'
  surface-variant: '#323536'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system is engineered for a high-performance electronics marketplace. It targets tech-savvy consumers and professionals who value precision, speed, and innovation. The brand personality is **Corporate Modern with a High-Tech Edge**, utilizing deep backgrounds to make hardware photography pop.

The UI should evoke a sense of "premium power"—like a high-end workstation or a flagship smartphone interface. We achieve this through a mix of **Minimalism** for content clarity and **Glassmorphism** for interactive overlays, ensuring the product is always the hero while the interface feels like an advanced OS.

## Colors
The palette is rooted in a "Dark Mode First" philosophy to align with professional tech aesthetics.

*   **Primary (#007BFF):** "Electric Blue." Used for primary actions, progress indicators, and active states. It signals technology and reliability.
*   **Secondary (#FF8C00):** "Energizing Orange." Reserved strictly for high-conversion CTAs (Buy Now, Add to Cart) and limited-time offers to create urgency.
*   **Backgrounds:** The main canvas uses `#0A192F` (Deep Tech Blue). Surface containers use subtle variations (lighter tints) to create hierarchy.
*   **Readability:** Use White (#FFFFFF) for primary headers and Light Grey (#E0E0E0) for secondary body text to reduce eye strain against the dark backdrop.

## Typography
The typography strategy balances the geometric, bold nature of **Montserrat** for impact with the supreme legibility of **Inter** for data-heavy specs and shopping flows.

*   **Headlines:** Use Montserrat with tighter letter-spacing to convey a "tightly engineered" feel.
*   **Body:** Inter is the workhorse. High-density information (like PC component specs) should use `body-sm` to maintain a clean layout.
*   **Labels:** Use `label-caps` for technical categories (e.g., "PROCESSOR", "STORAGE") to differentiate them from editorial content.

## Layout & Spacing
This design system employs a **Fluid Grid** with fixed maximum constraints for ultra-wide monitors.

*   **Grid:** A 12-column grid on desktop, 8-column on tablet, and 4-column on mobile. 
*   **Rhythm:** An 8px base unit drives all padding and margins. 
*   **Mobile Reflow:** For product listings, transition from a 4-column grid on desktop to a 2-column "card" view on mobile to maintain image clarity. Spec tables should allow horizontal scrolling on small screens rather than shrinking text.

## Elevation & Depth
Depth is created through **Tonal Layering** rather than traditional heavy shadows.

*   **Level 0 (Background):** `#0A192F`
*   **Level 1 (Cards/Sections):** A slightly lighter blue-grey with a 1px low-opacity border (`rgba(255,255,255,0.1)`).
*   **Level 2 (Modals/Dropdowns):** Use **Glassmorphism**. Background blur (20px) with a semi-transparent fill.
*   **Shadows:** When used, shadows should be "Ambient"—wide-spread, low-opacity (15%), and tinted with the primary blue color to avoid a "dirty" look on the dark background.

## Shapes
We use a **Rounded** language (8px to 12px) to soften the "industrial" feel of tech products, making the store feel approachable and modern.

*   **Small Components:** Buttons and input fields use 8px (`rounded`).
*   **Large Components:** Product cards and feature banners use 16px (`rounded-lg`) to create a distinct frame for imagery.
*   **Media:** Product photos should always have a subtle 8px radius; never use sharp corners for hardware.

## Components
*   **Buttons:** Primary buttons are Solid Electric Blue. "Buy" buttons are Solid Orange. Use a subtle scale-down effect (0.98) on click to simulate a tactile "click."
*   **Product Cards:** Use a Level 1 surface. On hover, the border-color should transition to the Primary Electric Blue with a subtle lift.
*   **Input Fields:** Dark fills with a 1px border. The border glows Electric Blue when focused.
*   **Chips/Badges:** Use "Outline" style for technical specs (e.g., "16GB RAM") and "Solid Tint" for status (e.g., "In Stock" in green).
*   **Spec Lists:** Use zebra-striping with subtle opacity differences for high readability in technical data tables.
*   **Featured Banners:** Use high-contrast gradients (Deep Blue to Transparent) overlaying product hero shots to ensure text remains legible.