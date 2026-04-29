# Layout Structure — Auth Pages

> The visual anatomy of the AuthShell component — every panel, element, and responsive breakpoint.

---

## The Split-Screen Layout

All auth pages (`/auth/*`) share the same **full-viewport, 50/50 split-screen layout**.
The left panel holds the auth form. The right panel promotes the product.

```
 ┌─────────────────────────────────────────────────────────────────────────────────┐
 │                                                                                 │
 │  ┌─── LEFT PANEL ─────────────────────┐  ┌─── RIGHT PANEL ─────────────────┐   │
 │  │                                    │  │                                  │   │
 │  │  Background: #f7f7f8 (light gray)  │  │  Background: #07090b (near-black)│   │
 │  │  Width: 50% (desktop)              │  │  Width: 50% (desktop)            │   │
 │  │  Width: 100% (mobile)              │  │  Hidden on mobile/tablet         │   │
 │  │                                    │  │                                  │   │
 │  │  PURPOSE:                          │  │  PURPOSE:                        │   │
 │  │  - Auth form                       │  │  - Product promo                 │   │
 │  │  - Logo + branding                 │  │  - Audience targeting            │   │
 │  │  - Legal footer                    │  │  - Dashboard mockups             │   │
 │  │                                    │  │  - Social proof                  │   │
 │  │                                    │  │                                  │   │
 │  └────────────────────────────────────┘  └──────────────────────────────────┘   │
 │                                                                                 │
 └─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Left Panel — Detailed Wireframe

```
 ┌────────────────────────────────────────┐
 │                                        │
 │  ZONE 1: HEADER (fixed top)            │
 │  ──────────────────────────────        │
 │                                        │
 │  ┌──┐                                  │
 │  │//│ Voatomy                           │   Logo icon: 18x18 rounded-md
 │  └──┘                                  │   gradient square
 │     by Voatomy Labs                     │   Wordmark: 30px bold
 │                                        │   Subtitle: 12px muted
 │                                        │
 │                                        │
 │                                        │
 │  ZONE 2: CONTENT (vertically centered) │
 │  ──────────────────────────────        │
 │                                        │
 │  ┌──────────────────────────────┐      │
 │  │                              │      │   Max-width: 390px
 │  │    [Auth Form Content]       │      │   Centered horizontally
 │  │                              │      │   Centered vertically
 │  │    Heading (46px)            │      │   (my-auto on parent)
 │  │    Subtitle (15px)           │      │
 │  │    Social buttons            │      │
 │  │    OR divider                │      │
 │  │    Form fields               │      │
 │  │    CTA button                │      │
 │  │    Footer links              │      │
 │  │                              │      │
 │  └──────────────────────────────┘      │
 │                                        │
 │                                        │
 │                                        │
 │  ZONE 3: FOOTER (fixed bottom)         │
 │  ──────────────────────────────        │
 │                                        │
 │  (c) 2025-2026 Voatomy Labs            │   12px text, muted
 │  Terms  Privacy  Licenses  Imprint     │   Links: semibold
 │  Cookie policy  v1.0                   │   Separated by dots
 │                                        │
 └────────────────────────────────────────┘
```

### Left Panel CSS Grid

```css
section.left-panel {
  display: flex;
  flex-direction: column;
  background: #f7f7f8;
  padding: 20px 44px 14px;
}

header   { /* Zone 1 — top-aligned */ }
.content { margin: auto 0; /* Zone 2 — vertically centered */ }
footer   { margin-top: auto; /* Zone 3 — bottom-aligned */ }
```

---

## Right Panel — Detailed Wireframe

```
 ┌──────────────────────────────────────────┐
 │                                          │
 │  ZONE 1: LABEL + HEADLINE (top)         │
 │  ────────────────────────────           │
 │                                          │
 │  FOR ENGINEERING TEAMS & LEADERS         │   12px uppercase bold
 │                                          │   tracking-widest
 │  Sprint planning                         │   gray (#a1a3a7)
 │  that actually                           │
 │  understands                             │   clamp(34px,2.9vw,54px)
 │  your code.                              │   semibold, white
 │                                          │
 │                                          │
 │  ZONE 2: AUDIENCE PILLS (floating)      │
 │  ────────────────────────────           │
 │                                          │
 │   ┌─────────────────┐                   │
 │   │ ◌ EMs           │  -10deg           │   Rounded-full pills
 │   └─────────────────┘                   │   68px height
 │         ┌─────────────────┐             │   border: emerald-500/25
 │         │ ⌁ Tech Leads    │             │   bg: emerald-900/60
 │         └─────────────────┘             │   text: emerald-400
 │  ┌──────────────────────┐               │   Absolutely positioned
 │  │ ▦ Product Leaders    │  12deg        │   with rotation
 │  └──────────────────────┘               │
 │      ┌────────────────┐                 │
 │      │ ⎈ CTOs & VPs   │  12deg         │
 │      └────────────────┘                 │
 │                                          │
 │                                          │
 │  ZONE 3: DEVICE MOCKUPS (bottom)        │
 │  ────────────────────────────           │
 │                                          │
 │  ┌──────────────────────────────────┐   │
 │  │  DESKTOP MOCKUP                  │   │   Rounded-tl-[14px]
 │  │  ┌──────────────────────────┐    │   │   border: white/12
 │  │  │ ■ ■ ■                    │    │   │   bg: gradient white→gray
 │  │  │ ─────────────────        │    │   │
 │  │  │ ── ── ──                 │    │   │   Contains skeletal:
 │  │  │ ┌───┐ ┌───┐ ┌───┐       │    │   │   - Toolbar bar
 │  │  │ │   │ │   │ │   │       │    │   │   - Tab strip
 │  │  │ └───┘ └───┘ └───┘       │    │   │   - Card rows
 │  │  │ ┌─ ○ ──── ────── ─┐     │    │   │   - List items
 │  │  │ ├─ ○ ──── ────── ─┤     │    │   │
 │  │  │ ├─ ○ ──── ────── ─┤     │    │   │
 │  │  │ └─────────────────┘     │    │   │
 │  │  └──────────────────────────┘    │   │
 │  └──────────────────────────────────┘   │
 │                                          │
 │  ┌───────────────┐                      │   Phone: 312px wide
 │  │ PHONE MOCKUP  │                      │   rounded-[34px]
 │  │ ┌───────────┐ │                      │   border: 2px black/55
 │  │ │  (notch)  │ │                      │   bg: gradient white→gray
 │  │ │ ──────    │ │                      │
 │  │ │ ──────    │ │                      │
 │  │ │ ──────    │ │                      │
 │  │ │ ──────    │ │                      │
 │  │ │ ──────    │ │                      │
 │  │ └───────────┘ │                      │
 │  └───────────────┘                      │
 │                                          │
 └──────────────────────────────────────────┘
```

---

## Responsive Breakpoints

### Desktop (>= 1024px)

```
 ┌──────────────────────┬──────────────────────┐
 │                      │                      │
 │    LEFT PANEL        │    RIGHT PANEL       │
 │    (50%)             │    (50%)             │
 │                      │                      │
 │    Logo              │    Label             │
 │    Form              │    Headline          │
 │    Footer            │    Pills + Mockups   │
 │                      │                      │
 └──────────────────────┴──────────────────────┘
  Grid: 1fr | minmax(440px, 48.8%)
```

### Tablet (768px — 1023px)

```
 ┌──────────────────────────────────────────────┐
 │                                              │
 │    LEFT PANEL (100%)                         │
 │                                              │
 │    Logo                                      │
 │    Form (centered, max-w-390px)              │
 │    Footer                                    │
 │                                              │
 │    RIGHT PANEL: hidden                       │
 │                                              │
 └──────────────────────────────────────────────┘
```

### Mobile (< 768px)

```
 ┌───────────────────────┐
 │                       │
 │  Logo                 │
 │                       │
 │  Create your account  │
 │                       │
 │  [Google]             │
 │  [GitHub]             │
 │  ── OR ──             │
 │  Name fields          │
 │  Email                │
 │  [Continue]           │
 │                       │
 │  Footer (compact)     │
 │                       │
 └───────────────────────┘
  Full width, no right panel
  Reduced padding (px-5)
  Footer font: 11px
```

---

## Component: `AuthShell`

**File**: `src/components/auth/auth-shell.tsx`

### Component Tree

```
 AuthShell ({ children })
 │
 ├── <main>
 │   │   className: grid min-h-screen lg:grid-cols-[1fr_minmax(440px,48.8%)]
 │   │
 │   ├── LEFT <section>
 │   │   │   className: flex flex-col bg-[#f7f7f7] px-5 pb-3.5 pt-5 md:px-11
 │   │   │
 │   │   ├── <header>
 │   │   │   ├── <Link href="/">
 │   │   │   │   ├── Logo icon <span> (gradient bg, 18x18, rounded-md)
 │   │   │   │   └── "Voatomy" <span> (30px bold tracking-tight)
 │   │   │   └── "by Voatomy Labs" <span> (12px, muted, ml-[30px])
 │   │   │
 │   │   ├── <div className="my-auto">
 │   │   │   └── {children}            <-- Auth form injected here
 │   │   │       └── max-w-[390px] mx-auto text-center
 │   │   │
 │   │   └── <footer>
 │   │       │   className: mt-auto flex flex-wrap items-center
 │   │       │              justify-center gap-x-3.5 pt-[18px]
 │   │       │              text-xs text-surface-dark/65
 │   │       │
 │   │       ├── "(c) 2025-2026 Voatomy Labs"
 │   │       ├── <Link> "Terms"       (font-semibold)
 │   │       ├── <Link> "Privacy"     (font-semibold)
 │   │       ├── <Link> "Licenses"    (font-semibold)
 │   │       ├── <Link> "Imprint"     (font-semibold)
 │   │       ├── <Link> "Cookie policy" (font-semibold)
 │   │       └── "v1.0"
 │   │
 │   └── RIGHT <section>
 │       │   className: relative hidden overflow-hidden border-l
 │       │              border-[#0f1215] bg-[#07090b] text-white lg:block
 │       │
 │       ├── Label text
 │       │   "FOR ENGINEERING TEAMS & LEADERS"
 │       │   12px bold uppercase tracking-widest white/65
 │       │
 │       ├── Headline
 │       │   "Sprint planning that actually understands your code."
 │       │   clamp(34px,2.9vw,54px) semibold white
 │       │
 │       ├── Audience pills (4x)
 │       │   Each: absolute positioned, rounded-full, 68px tall
 │       │   border-emerald-500/25, bg-emerald-900/60, text-emerald-400
 │       │   Slight rotation per pill for scattered effect
 │       │
 │       └── Device mockups (absolute bottom)
 │           ├── Desktop frame
 │           │   96% width, 76% height, rounded-tl-[14px]
 │           │   border-white/12, gradient bg
 │           │   Contains: toolbar, tabs, cards, list items (skeletal)
 │           │
 │           └── Phone frame
 │               312px wide, 560px tall, rounded-[34px]
 │               border-2 black/55, gradient bg, shadow-2xl
 │               Contains: notch, header bar, list items (skeletal)
 │
 └── (end)
```

---

## Typography Reference

```
 ELEMENT                  SIZE                    WEIGHT    COLOR              TRACKING
 ────────────────────    ──────────────────────  ────────  ─────────────────  ──────────
 Logo wordmark            30px                    Bold      inherit            tight
 Logo subtitle            12px (xs)               Regular   surface-dark/55    normal
 Form heading             46px                    Semibold  inherit            tight
 Form subtitle            15px                    Regular   surface-dark/55    normal
 Button text              14px (sm)               Semibold  varies             tight
 Field label              14px (sm)               Semibold  surface-dark/70    normal
 Field placeholder        16px (base)             Regular   surface-dark/40    normal
 Footer text              12px (xs)               Regular   surface-dark/65    normal
 Footer links             12px (xs)               Semibold  surface-dark/65    normal
 Right label              12px (xs)               Bold      white/65           widest
 Right headline           clamp(34-54px)          Semibold  white              tight
 Pill text                clamp(20-31px)          Medium    emerald-400        tight
```

---

## Color Palette (Auth Pages)

```
 LEFT PANEL
 ──────────────────────────────────────────────────────────
 Background          #f7f7f7        Light warm gray
 Text primary         #121312        Near-black
 Text muted           #121312/55     55% opacity
 Borders              #121312/15     15% opacity
 Focus ring           brand/30       Green glow
 Error                #EF4444        Red

 RIGHT PANEL
 ──────────────────────────────────────────────────────────
 Background          #07090b        Near-black
 Border left          #0f1215        Slightly lighter
 Text primary         #ffffff        White
 Text muted           #ffffff/65     65% opacity
 Pill border           emerald-500/25  Green, subtle
 Pill background      emerald-900/60  Deep green
 Pill text             emerald-400    Light green
 Mockup bg             #f8f8f8→#ececec  White gradient
 Mockup border        white/12        Subtle white
```

---

## Spacing Reference

```
 LEFT PANEL
 ──────────────────────────────────────────────────────────
 Padding top           20px (pt-5)
 Padding bottom        14px (pb-3.5)
 Padding horizontal    20px mobile (px-5), 44px desktop (md:px-11)
 Logo to subtitle      4px (mt-1)
 Form content width    390px max
 Button full width     100% within 390px container
 Footer padding top    18px (pt-[18px])
 Footer link gap       14px (gap-x-3.5)

 RIGHT PANEL
 ──────────────────────────────────────────────────────────
 Padding horizontal    50px
 Padding top           58px
 Label to headline     16px (mt-4)
 Headline to pills     64px (mt-16)
 Pills zone height     175px min
```
