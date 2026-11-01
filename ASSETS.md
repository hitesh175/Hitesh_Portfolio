# Design reference and assets

The portfolio adapts MotionSites' **Portfolio Cosmic** design direction, selected at the user's request: https://motionsites.ai/?prompt=portfolio-cosmic-hero . The public reference and its freely available **Copy full prompt** brief were inspected on 1 November 2026. The portfolio retains its own project facts, sections, theme controls, accessible dialogs, forms, and truthful demo disclosures.

| Asset | Origin | Use |
|---|---|---|
| `public/images/cosmic-poster.jpg` | `https://image.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g/thumbnail.jpg?width=1600` | Static hero poster and reduced-motion fallback; source stream appears in the public MotionSites reference brief. |
| Hero video | `https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8` | Optional motion, loaded by the lightweight player. Pause control, offscreen pause, reduced-motion static fallback. |
| Project icons | Existing `lucide-react` package | Bot, plane, truck, trend, bar chart, table and application-window pictograms; rendered as SVG components. |
| Instrument Serif | `@fontsource/instrument-serif` | Locally served display font from the reference's typographic direction. |
| IBM Plex Sans / Mono | Existing Fontsource packages | Locally served reading, controls, data and technical labels. |

The cosmic poster carries embedded source provenance. Rejected generated covers have been archived outside public assets; the live project showcase uses Lucide SVG icons. The original color background is desaturated in the interface. Original asset/font rights remain with their respective owners. Background streaming availability depends on its external host; the locally served poster remains available without that service.
