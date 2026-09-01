# Census 2027 Prototype Walkthrough

This document summarizes the changes made to the Census 2027 Prototype to implement the strict UI/UX design system.

## Global Design System Implementation
- **Palette**: Adopted a navy/slate-dominant palette (`slate-50` background, `white` surfaces, `slate-950` header/footer).
- **Accents**: 
  - Primary CTA and active states use ONE accent color: `amber-600` (`hover:amber-700`).
  - Secondary/cool elements use `indigo-600/700` on `indigo-50` backgrounds.
  - Semantic states strictly use `emerald` (success) and `red` (danger/scam).
- **Typography**: 
  - Sans-serif typography (`font-sans`) globally.
  - Page headlines follow `font-extrabold tracking-tight text-4xl/5xl`.
  - Body text uses `font-normal text-slate-600 leading-relaxed`.
  - Removed ALL-CAPS eyebrows, replacing them with standard `font-semibold text-sm` colored labels.
- **Spacing**: Enforced a strict 8px-grid spacing system. All paddings, margins, and gaps are multiples of 8 (`p-4`, `p-6`, `p-8`, `gap-4`, `gap-8`, `gap-16`). Card padding standardized to `24px` (`p-6`) or `32px` (`p-8`).
- **Structure**: 
  - Applied consistent corner radii (`rounded-2xl` for containers, `rounded-xl` for inner elements/buttons).
  - Replaced decorative drop shadows with crisp `1px` borders (`border border-slate-200`).
  - Removed all gradients.
- **Interaction**:
  - Removed scattered `animate-in` components across all pages.
  - Added exactly ONE orchestrated entrance animation exclusively on the Home page (`PhaseTwo.tsx`) where the hero fades/slides up, followed 150ms later by the adjacent cards.
  - Primary buttons use `hover:scale-105 active:scale-100 shadow-md transition-all duration-200`.

## Component & Page Restyling

### Global Layout (`App.tsx`)
- Stripped dark mode logic and `dark:` overrides to ensure a single, consistent light UI.
- Styled header with `bg-slate-950 text-white` and an `amber-600` logo accent. Nav links use a subtle color transition hover state.
- Refactored footer to `bg-slate-950` matching the header anchors.
- Refactored Disclaimer banner to `bg-amber-50 text-amber-900 border-amber-200`.

### Bhashini Language Bar (`BhashiniLanguageBar.tsx`)
- Active languages use `bg-amber-600`. Inactive use `bg-slate-50 hover:bg-slate-100` with clean borders.
- Removed scaling animations on hover, using purely color transitions.

### Home / Phase Two (`PhaseTwo.tsx`)
- Replaced custom CSS animations with standard Tailwind + arbitrary keyframes added to `tailwind.config.js`.
- Configured a staggered entrance animation using `opacity-0 animate-fade-in-up`.
- Replaced list bullet characters (`•`) with structured HTML/CSS elements (`w-1.5 h-1.5 rounded-full bg-slate-300`).

### State Schedule (`StateSchedule.tsx`)
- Refactored status badges to standard semantic colors (`emerald-50`, `indigo-50`, `amber-50`).
- Removed card shadow and used `border-slate-200`.
- Ensured table rows use simple `hover:bg-slate-50 transition-colors` without scaling.

### Self-Enumeration (`SelfEnumeration.tsx`)
- Redesigned the step indicators and wizard container with `rounded-2xl` borders.
- Styled primary wizard buttons with `amber-600` and `hover:scale-105` physics.
- Organized the AI Assistant Sidebar into a clean block with a dark anchor header (`bg-slate-950`).

### Trust & Safety (`TrustSafety.tsx`)
- Enforced strict color usage for the Scam Checker: `bg-slate-950` for the analyze button, red borders/backgrounds exclusively for SCAM results, and emerald for SAFE results.
- Removed live feed animations in favor of a clean, static layout with a subtle pulse strictly on the recording indicator.

### Citizen Dashboard (`CitizenDashboard.tsx`)
- Cleaned up the simulated login terminal using the new slate and amber tokens.
- Re-styled the tab navigation with simple border bottoms, replacing dark mode overrides.
- Styled the Official SE Pass certificate to match a clean document aesthetic without heavy shadows.

### Legal & Terms (`LegalTerms.tsx`)
- Structured statutory clauses in bordered boxes without decorative shadows.
- Kept the UI austere and focused on text hierarchy.

## Summary
The application now adheres completely to a modern, crisp, non-skeuomorphic UI design system. All pages reflect the requested navy/slate/amber palette, 8px layout precision, simplified entrance animations, and shadowless bordered cards.
