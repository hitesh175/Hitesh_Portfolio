# Portfolio fixes

Implementation batch completed on 1 November 2026. This document records the changes and validation; repository history records publication.

- Contact delivery: success requires an accepted response; failures retain text, explain recovery, and offer direct email. No sent-message history is retained; old local logs are removed. Associated labels, autocomplete, length limits and announced statuses are present.
- Dialogs: a shared native dialog provides modality, focus entry, Escape, background isolation, scroll locking and focus restoration. Articles have named close controls and shareable fragment links.
- CV: the build generates one two-page PDF from the supplied portfolio data. Preview and download point to the same local PDF. Toolbar controls fit 320px screens. The generated pages were rendered and visually checked.
- Charts and data: histogram bars have definite heights; cohort controls update them. Europe shares total 100%. Confusion matrix row percentages and accuracy derive from matching counts. Charts have accessible descriptions and readable equivalent values.
- Demo honesty: examples are labelled synthetic; JavaScript signal generation is described accurately. Unsupported runtime-memory/virtualization benchmarks have been replaced with a real layout control. No new project performance claims were invented.
- Navigation: section links support fragments and history; keyboard navigation moves focus to the destination. Duplicate IDs were removed. Menus, filters and demo disclosures expose their current states. A skip link and visible focus indicators are available.
- Layout: projects follow the shortened hero. The repeated identity panel, quote block, services presentation and duplicate expertise section were removed from the page. Project counts derive from the data; the portfolio project links to its actual repository.
- Readability: small labels and touch controls were enlarged, placeholders and semantic status colors strengthened, and expertise chips no longer imply nonexistent actions.
- Motion and performance: removed persistent stars, background blur, decorative pulsing and pointer-driven card rotation. Reduced-motion preferences govern navigation and Motion components. CV and demo code load on demand. IBM Plex fonts are served locally with a smaller set of font roles. Unused server/AI dependencies were removed and a lockfile added.
- Metadata: the visible analyst/student identity matches the description and structured data; social preview uses the local asset.

## Verification

- `npm run build`: PDF generation, TypeScript checking, and Vite production build pass.
- Browser regression suite checks contact failure/retry without sending a real email, CV sizing/focus/Escape, article deep links, histogram updates, labelled controls and unique IDs, and layouts at 320/390/768/1440px in both themes.
- Desktop and mobile screenshots were visually inspected; PDF pages were rendered and inspected.
- Impeccable detector was run: the active font warning is resolved. Remaining bounce advisories refer to an unused network component and a reduced-motion CSS selector, not an active bouncing interaction.

No physical-device, screen-reader, exhaustive WCAG certification or Core Web Vitals measurement is claimed. The underlying project datasets and results remain the owner's supplied content; authentic case-study metrics need evidence from those projects. Online contact sending still depends on the configured Web3Forms service accepting requests in production.
