---
name: Hitesh Portfolio Cosmic
description: A cinematic black portfolio with editorial serif headings and a practical project gallery.
colors:
  midnight: "#000000"
  gallery-surface: "#121212"
  ice: "#f2f2f2"
  silver: "#d9d9d9"
  ice-hover: "#d5d5d5"
  button-ink: "#1b1b1b"
  hero-text: "#f7f7f7"
  hero-muted: "#c7c7c7"
  gallery-border: "#2e2e2e"
  neutral-950: "#111111"
  neutral-900: "#1a1a1a"
  neutral-850: "#282828"
  neutral-800: "#343434"
  neutral-750: "#4a4a4a"
  neutral-700: "#555555"
  neutral-600: "#606060"
  neutral-500: "#828282"
  neutral-400: "#a8a8a8"
  neutral-300: "#c9c9c9"
  neutral-200: "#e2e2e2"
  neutral-100: "#efefef"
  neutral-50: "#f8f8f8"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(3.3rem, 7.6vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.99
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  cover-label:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "10px"
    fontWeight: 400
  title:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "clamp(1.2rem, 2vw, 1.6rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    lineHeight: 1.7
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.05em"
rounded:
  surface: "12px"
  card: "20px"
  pill: "30px"
  navigation: "40px"
spacing:
  action-gap: "14px"
  gallery-gap: "24px"
  card-padding: "30px"
  mobile-card-padding: "24px"
  section: "4rem"
  mobile-section: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.ice}"
    textColor: "{colors.button-ink}"
    rounded: "{rounded.pill}"
    padding: "12px 25px"
  button-primary-hover:
    backgroundColor: "{colors.ice-hover}"
  project-card-dark:
    backgroundColor: "{colors.gallery-surface}"
    rounded: "{rounded.card}"
    padding: "30px"
---

# Design System: Hitesh Portfolio Cosmic

## Overview

**Creative North Star: "Portfolio Cosmic"**

The implemented world adapts the publicly available MotionSites Portfolio Cosmic reference: a cinematic midnight scene introduces the person, followed by a quieter gallery of real projects. The serif display voice gives the identity room; the sans-serif reading voice keeps project descriptions and controls practical.

This is a code-led adaptation of the reference's visual grammar, with existing portfolio content and interactions retained. Light mode changes the reading surfaces below the hero while the cinematic hero remains dark. The reference is https://motionsites.ai/?prompt=portfolio-cosmic-hero; the selected direction is recorded in PRODUCT.md and the surface contract.

**Key Characteristics:**
- True black with restrained ice and silver accents.
- Large serif headings, compact sans-serif reading text, mono data labels.
- Floating capsule navigation and rounded gallery surfaces.
- Optional atmospheric motion with a complete static presentation.

## Colors

The palette uses true black, neutral charcoal, white and silver throughout; frontmatter values are normative.

### Primary
- **Ice:** primary hero action fill, contrasted with Button Ink.
- **Silver:** italic name emphasis, linking the identity to the monochrome scene.
- **Ice Hover:** primary action hover fill.

### Neutral
- **Midnight:** page base in dark mode and permanent hero base.
- **Gallery Surface / Gallery Border:** dark project-card fill and quiet outline.
- **Hero Text / Hero Muted:** clear foreground and subordinate identity/location copy over the image.
- **Neutral ramp:** shared reading surfaces, separators, controls and text across both themes. Light surfaces use the pale end; dark surfaces use the deep end.

**The Cinematic Hero Rule.** Keep the hero's dark background and light foreground together in both themes. Do not invert the scene when changing the reading theme.

## Typography

**Display Font:** Instrument Serif, falling back to Georgia and serif. This is the hero and section-heading face; the legacy display utility itself still resolves to IBM Plex Sans.

**Body Font:** IBM Plex Sans with system sans-serif fallbacks.

**Label/Mono Font:** IBM Plex Mono with system monospace fallbacks.

### Hierarchy
- **Display:** regular serif; the second name line is italic. Mobile uses `clamp(2.8rem, 11vw, 4.6rem)`.
- **Headline:** regular serif with tight tracking. At the mobile layout breakpoint section headings become (2.6rem).
- **Title:** medium sans-serif project titles; sentence case rather than forced uppercase.
- **Body:** project descriptions use the frontmatter body role, limited to (65ch). Hero description uses (15px), line height (1.75), and (50ch); About and Contact copy also use line height (1.75).
- **Label:** compact mono for categories, technologies, counts and technical metadata. Desktop navigation and filter names use sans-serif, with normal casing and tracking.

## Layout

Reading containers reach a maximum width of (1200px), with responsive horizontal padding. Main sections below the hero use the section spacing token. The hero centers its introduction in a (1000px) maximum width and uses generous top and bottom clearance for the floating header and footer.

The project gallery uses equally sized cards and icon areas. At 1280px and above it has three equal columns; from 768px it has two; smaller screens have one. Grid auto rows equalize card heights across the visible set. Every card has a 180px icon row, flexible content and an aligned action footer.

At widths up to (767px), the gallery becomes one column with a (20px) gap; equal card sizing is retained. Hero actions wrap and the CV action gets its own row. Desktop navigation appears at 1280px.

## Elevation & Depth

Depth comes principally from the atmospheric backdrop, tonal surfaces, quiet borders and translucent navigation. Gallery cards explicitly remove box shadows. The floating header uses `0 10px 30px #00000012`, a subtle ambient shadow with (14px) backdrop blur. Hero imagery is covered with a dark vertical gradient so foreground contrast remains stable.

## Shapes

Gallery cards use the card radius; other existing rounded surfaces are softened to the surface radius. Hero actions and filter controls are capsules; the header has the navigation radius. Image-led cards clip their image inside the card and let it bleed to the top and side edges. Theme and menu controls are circular.

## Components

### Buttons

Hero primary and outline actions are rounded capsules with (50px) minimum height, (14px) type and weight (600). The primary uses Ice and Button Ink. The outline action uses a translucent deep fill, a silver outline and light text. Hover lifts actions by (3px) over (250ms); reduced motion removes the lift. The CV action is an underlined text control.

Global keyboard focus uses a (2px) outline with (4px) offset, dark in light mode and light in dark mode. Buttons and navigation links have at least (44px) height.

### Chips

Project technologies use compact mono labels, quiet borders and the shared rounded surface treatment. Filter buttons are rounded (24px), sans-serif (13px), weight (500); selected filters invert their light/dark foreground and background relationship. Counts remain mono and `aria-pressed` exposes selection.

### Cards / Containers

Project cards have a (350px) desktop minimum height and the card padding token. Dark cards use Gallery Surface and Gallery Border; light cards use pale neutral surfaces and borders. Titles, description, technology chips and repository/demo actions form the repeated content pattern. The lead project image has aspect ratio (1.7), a slow (700ms) hover scale to (1.035), and a direct link to its real project overview.

### Navigation

The floating header is centered at (20px) from the desktop top, width `min(1160px, calc(100% - 40px))`. It has a translucent light or black fill, thin border and blur. On mobile it sits (12px) from the top at `calc(100% - 24px)` width. The collapsible panel retains a rounded lower edge, current-location state, and Escape-to-close behavior.

### Cosmic Backdrop

A local poster provides the complete static composition. A lazy `hls.js/light` stream adds muted, looping motion where supported, with native HLS fallback. The video fades in over (1s) and uses opacity (0.7). The user can pause/play it; reduced motion leaves the poster and suppresses the motion control. Playback pauses when offscreen or the document is hidden. Backdrop imagery is decorative and hidden from assistive technology.

Hero and project content render visibly by default (`initial={false}`); animation is not required to discover content. Existing CV/contact dialogs, input behavior and truthful demonstration labels remain part of the portfolio.

## Do's and Don'ts

### Do:
- **Do** preserve the serif/sans/mono division of roles.
- **Do** keep the static poster readable and complete when motion is unavailable.
- **Do** preserve visible focus, keyboard controls, theme behavior and reduced-motion behavior.
- **Do** use a single consistent Lucide icon per project; no generated artwork or image badges in the showcase.

### Don't:
- **Don't** hide essential content behind entrance animation.
- **Don't** apply the dark hero's colors indiscriminately to light reading surfaces.
- **Don't** treat synthetic demonstrations as evidence of real deployment or outcomes.
- **Do** keep project icons simple, recognizable and equal in scale.

Current showcase: 96px charcoal application-icon tiles with 56px white Lucide glyphs. Project titles use 21px text. No visible render badges or generated project images.
