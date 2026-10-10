# Design system (source of truth: `src/app/globals.css`)

## Colour
| Token | Value | Use | Contrast |
|---|---|---|---|
| `--paper` | #efece6 | ground (lime plaster) | — |
| `--paper-2` | #e5e1d9 | stone band, placeholders | — |
| `--ink` | #1a1916 | text, rules | 14.9:1 |
| `--ink-2` | #4a463f | body copy | 7.9:1 |
| `--ink-3` | #6b665e | labels, metadata (#5e5951 on paper-2) | 4.8:1 |
| `--night` / `--on-night` / `--on-night-2` | #161513 / #efece6 / #a8a297 | footer, viewer | 15.5 / 7.2 |

## Type — Newsreader (serif, opsz 6–72, wght 260–520) + Jost (sans)
| Role | Class | Size (375→1600) | Notes |
|---|---|---|---|
| Display 1 | `.d1` | 48→124px / 0.94 / −0.032em | project & page titles, two-tone (ink + `--ink-3`) |
| Display 2 | `.d2` | 38→84px | feature titles, footer line |
| Display 3 | `.d3` | 28→50px | chapter titles, section heads |
| Lede | `.lede` | 21→34px / 1.24 | statements, descriptions |
| Body | `.body` | 17→20px / 1.58 serif | long text |
| UI | base | 15px Jost | |
| Small | `.small` | 13px Jost | metadata values, captions |
| Label | `.label` | 11.5px Jost 500, caps, +0.16em, tabular nums | kickers, nav, data keys |
Italic: rare (quote, current menu item). Caps only for labels.

## Grid
12 cols ≥1024px · 8 cols ≥768px · 4 cols mobile. Margin 18→40px, gutter 16→40px (margins ≈ gutters).
Section spacing `--section` 96→240px. 8px rhythm (`--s-1`…`--s-10`). Header 72/80px.

## Image rules
- Never upscale beyond ~1.15× native at DPR (sub-1300px files never wide).
- Native proportions everywhere except the home aperture/feature crops (focus points set per image).
- Drawings: paper ground, hairline mount, caption ("Axonometric", "Plan", "Sketch").
- Captions: number + optional kind label; alt text describes what is visible.

## Composition patterns (`src/lib/sequence.ts`)
wide (1/11 · 3/13 · 2/12) · single (5/11 · 2/8 · 7/13 · 3/9) · portrait single · pair (portrait+portrait offset / landscape+portrait) · drawing (centred). Never the same kind twice in a row. Mobile: wide = full-bleed, singles alternate ¾ insets, portrait pairs side by side.

## Motion
`--ease-out: cubic-bezier(.16,1,.3,1)` only. Reveal 1s (aperture cover lift + image settle 1.12→1; words rise from masks; fade+8px).
Hover 0.25–0.45s. Page: out 0.32s / in 0.7s (+0.18s delay). Cover morph 0.9s. Viewer step 0.6s.
`prefers-reduced-motion`: no hidden states, no transitions, instant view transitions.

Scroll choreography (`MotionDirector`, `data-m`): `parallax` · `cover` · `doors` · `blind` · `lower` · `expand` · `dolly` ·
`depth` · `fade` · `lines` · `read` · `fadeout` · `next` · `track`; `data-bg` shifts the page ground. Gallery rows map one
kind each: wide → expand, single/pair → blind, drawing → fade. Microinteractions: sliding nav rule, arrow hand-over
(`Arrow`), monogram assembly on first load, feature card lean-in.

## Components
Header (hide-on-scroll; thumb-zone mobile menu) · Footer (night visit band) · HomeHero · ProjectIndex (list+preview / grid) ·
Picture (frame, placeholder colour + blur, reveal, morph) · MorphLink (click-time shared element + hero preload) ·
ProjectGallery + Viewer · PageHead (two-tone) · IndexPill · ContactForm.
