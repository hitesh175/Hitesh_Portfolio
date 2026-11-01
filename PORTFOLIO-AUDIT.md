# Portfolio audit — 1 November 2026

> **Implementation update:** The findings below describe the original site. Fixes have now been implemented locally; see [FIXES.md](FIXES.md) for the changes and verification. The original score has been retained as a baseline, not a rating of the updated implementation.

Target: https://hiteshkanagalaportfolio.vercel.app/ and repository main at `f896fa2fdb316f359fecc61e6f247dae02f4f781`.

Method: Impeccable technical audit, source inspection, bundled source detector, and live browser inspection at desktop (1440×900), mobile (390×844), and narrow mobile (320×740). Both light and dark themes were inspected. This is an audit, not a redesign or the separate dual-assessment Impeccable critique workflow. No application source was changed.

## Verdict

Implementation integrity: **needs work**. The monochrome visual system is reasonably consistent, but demonstrations, delivery feedback, project counts, and CV presentation make promises the implementation does not reliably support. Fix these trust and interaction issues before visual polish.

| Dimension | Score /4 | Main evidence |
|---|---:|---|
| Accessibility | 1 | Unassociated labels, inaccessible modal behavior, removed focus indicators |
| Performance | 2 | Persistent animated background, large blurs, no route/component splitting; runtime performance unmeasured |
| Theming | 2 | Both themes work broadly; low-contrast placeholder text and scattered semantic colors |
| Responsive design | 2 | Main layout adapts; narrow CV toolbar clips and important controls/text are small |
| Implementation integrity | 1 | False delivery success path, empty histogram, simulated measurements presented too confidently |
| **Total** | **8/20** | **Poor: major issues to address** |

Scores are qualitative audit ratings, not Lighthouse results or a WCAG certification. Performance is provisional. Findings: **0 P0, 8 P1, 12 P2, 2 P3**. P1 means fix before release; P2 means next improvement pass; P3 means polish.

## P1 — fix first

### 1. A failed contact submission can report successful delivery

Location: `src/components/Contact.tsx:89`, `:107`, `:319`. Category: implementation integrity.

When Web3Forms rejects a request or the connection fails, `saveLocally()` clears the fields and sets `isSuccess`. The resulting message depends on whether a key exists, not whether delivery succeeded. With configuration present, the UI says “Message sent to inbox!” after a local-only save. There is no retry queue that later forwards that message. A recruiter could believe you received a message you never received.

Fix: separate sent, failed, and saved-draft states; only show delivery success after confirmed acceptance. Keep failed messages in the fields, explain the error inline, offer Retry and email. Announce status using `role="status"`/an appropriate live region. Suggested command: `$impeccable harden`.

Evidence: verified source control flow; no real contact message was submitted during this audit.

### 2. Form and simulator labels are not associated with controls

Location: `src/components/Contact.tsx:250`, `:265`, `:281`, `:295`; `src/components/Projects.tsx:372`, `:482`, `:496`, `:864`. Category: accessibility.

Labels are siblings of controls with no `htmlFor`/matching ID. Live inspection found zero associated labels on all four contact fields and the initial range slider. Placeholder examples do not replace persistent accessible labels. Relevant WCAG: 1.3.1 and 3.3.2.

Fix: stable IDs, associated labels, clear required/optional wording, `name` and autocomplete attributes where applicable. Suggested command: `$impeccable harden`.

### 3. CV and article overlays lack modal accessibility

Location: `src/components/CVModal.tsx:83`; `src/components/Blog.tsx:111`. Category: accessibility.

Neither overlay provides a dialog role/name, focus entry, focus containment, inert background, or deliberate focus restoration. Opening the CV left focus on the underlying View CV button. Escape did not dismiss it, despite the footer explicitly promising Escape support. The article close icon also has no accessible name, and its overlay does not lock background scrolling. Relevant WCAG: 2.1.1, 2.4.3, 4.1.2.

Fix: use a proven accessible dialog or native dialog with correct focus behavior; support Escape and return focus; name the article close button. Suggested command: `$impeccable harden`.

### 4. Keyboard focus is deliberately hidden on important actions

Location: `src/components/Navbar.tsx:59`; `src/components/Blog.tsx:98`; `src/components/CVModal.tsx:374`. Category: accessibility.

The logo and Read Article controls remove outlines without replacement. “Open in external viewer” is a clickable div without a keyboard equivalent. Relevant WCAG: 2.4.7 and 2.1.1.

Fix: consistent visible `:focus-visible` rings; use an anchor for the external viewer. Suggested command: `$impeccable harden`.

### 5. Retail histogram renders with no visible bars

Location: `src/components/Projects.tsx:816`. Category: implementation integrity.

Confirmed in the live Retail Store Sales simulator: all eight bars had a rendered height of 0px. Their percentage heights sit inside auto-height wrappers, so the chart displays only dollar labels. Users cannot inspect the claimed distribution.

Fix: give the bar wrappers a definite chart height and reserve label space separately; verify every cohort after rendering. Suggested command: `$impeccable harden`.

### 6. CV close control is clipped on narrow phones

Location: `src/components/CVModal.tsx:100`. Category: responsive design.

At a 320px viewport the close control extended from approximately x=296 to x=329. The toolbar combines a nonshrinking filename with multiple actions inside an overflow-hidden modal. The dismissal affordance is partially cut off.

Fix: allow filename flex shrinking with `min-width:0`, shorten it on phones, and keep close fully visible; move secondary actions to a second row if needed. Suggested command: `$impeccable adapt`.

### 7. Light-mode placeholder text has insufficient contrast

Location: `src/components/Contact.tsx:259`, `:274`, `:289`, `:304`. Category: accessibility/theming.

Small placeholder text uses `neutral-400` on white, approximately 2.6:1 for the palette used, below the 4.5:1 normal-text threshold. These examples are difficult for low-vision visitors to read. Relevant WCAG: 1.4.3.

Fix: use a text token that passes contrast in both themes. Audit amber/emerald simulator status text as well before release; those variants were not fully contrast-measured. Suggested command: `$impeccable colorize`.

### 8. Demo figures can be mistaken for real measured results

Location: `src/components/Projects.tsx:120`, `:139`, `:447`, `:844`, `:922`.
Category: implementation integrity.

The aircraft view claims NumPy filtering while the implementation generates JavaScript waves and changes noise amplitude; it does not run a NumPy filtering pipeline. “VECTORIZED_LATENCY: 1.8ms” is a literal. Supply-chain accuracy/latency are assigned constants. Web heap figures and “98.5% Culled” are fixed strings; toggles do not implement actual DOM virtualization. “Sandbox” and “simulator” provide some context, but “benchmark active” and precise timings still suggest real instrumentation.

Fix: explicitly label synthetic data and illustrative metrics beside each result; remove unsupported benchmark claims or measure real behavior. Link to the actual notebook/model/dashboard and its validation. Suggested command: `$impeccable clarify`.

## P2 — improve next

### 9. Contact details and messages persist in the visitor’s browser

Location: `src/components/Contact.tsx:24`, `:75`, `:119`. Category: implementation integrity.

Names, email addresses and full messages are retained in localStorage, including after successful sending, then displayed in an outbox on later visits. This is unexpected on a public portfolio, especially on shared devices. Storage writes can also fail and interfere with the delivery state.

Fix: avoid retaining sent messages; make optional draft saving explicit, bound its lifetime, and handle storage failures. Suggested command: `$impeccable harden`.

### 10. Motion has no reduced-motion alternative

Location: `src/components/SpaceBackground.tsx:52`; `src/App.tsx:83`; `src/index.css:26`; `src/components/Projects.tsx:939`. Category: accessibility/performance.

Stars drift and twinkle indefinitely, smooth scrolling is unconditional, and several indicators/graphs animate continuously. No `prefers-reduced-motion`, `useReducedMotion`, or Motion configuration addresses the preference.

Fix: static background and stable charts for reduced motion; immediate navigation when appropriate; stop nonessential motion offscreen. Assess WCAG 2.2.2 for persistent moving content; this audit did not measure flash thresholds. Suggested command: `$impeccable animate`.

### 11. Selected and expanded states are visual only

Location: `src/components/Navbar.tsx:120`; `src/components/Skills.tsx:95`; `src/components/Projects.tsx:248`; `src/components/ProjectCard.tsx:147`. Category: accessibility.

Menu toggle lacks `aria-expanded`/`aria-controls`. Filters and skill selectors do not expose selection, and sandbox controls do not associate their expanded panel. Assistive technology misses state changes.

Fix: use `aria-pressed` for filters, appropriate selected-state semantics for genuine tabs, expanded/controls for disclosures, and current-page/location semantics in navigation. Suggested command: `$impeccable harden`.

### 12. Charts lack accessible explanations and values

Location: `src/components/Projects.tsx:421`, `:624`, `:816`. Category: accessibility.

SVG plots have no useful accessible name/description or equivalent data table. Labels, scales, units and methodology are insufficient for interpreting the plotted waves as analytical evidence.

Fix: name each chart, describe the trend, supply accessible values, and label axes/units where quantitative interpretation is intended. Suggested command: `$impeccable clarify`.

### 13. Your strongest work appears far too late

Location: `src/App.tsx:166`; `src/components/Hero.tsx:187`; `src/components/Expertise.tsx:15`. Category: hierarchy/responsive.

At desktop size the Projects heading begins around 6,384px down a roughly 10,759px page; the mobile page is about 17,926px tall. About, services, education, two skill presentations and nine certificates come before work. The hero repeats study/location/status in an identification card and repeats the intelligent-solutions proposition in a quote box.

Fix: put selected work directly after a shorter hero; condense repeated skills and credentials; prioritize project evidence. Keep contact and CV easy to reach. Suggested command: `$impeccable layout`, then `$impeccable distill`.

### 14. Small typography and compact targets reduce usability

Location: `src/components/Contact.tsx:250`; `src/components/Projects.tsx:372`; `src/components/ProjectCard.tsx:147`; `src/components/Navbar.tsx:76`. Category: responsive/accessibility.

Many labels use 7–11px uppercase monospace. Sandbox action text measured roughly 15px high; Read Article roughly 16px. Tiny controls are harder to read and tap. A small height alone does not establish a WCAG 2.5.8 violation because spacing exceptions apply.

Fix: increase meaningful labels and body copy; provide comfortable 44px touch areas where practical and check 24px minimum/spacing requirements. Verify text enlargement. Suggested command: `$impeccable typeset`, `$impeccable adapt`.

### 15. CV preview and Download are different delivery paths

Location: `src/components/CVModal.tsx:45`, `:53`, `:183`; `src/data.ts:15`. Category: implementation integrity.

The supposed PDF preview is generated HTML, while Download opens a separate Mega URL after an 800ms timer. This adds third-party friction, can encounter popup restrictions, and provides no guarantee that the preview matches the downloaded document. Print depends on a separate CDN stylesheet plus a fixed 500ms wait.

Fix: serve one actual PDF directly and preview that same file; provide a reliable download link and a print stylesheet if HTML printing is retained. No claim is made here that the Mega file itself is broken; its content was not opened. Suggested command: `$impeccable harden`.

### 16. Navigation does not produce shareable section URLs

Location: `src/App.tsx:93`; `src/components/Navbar.tsx:76`. Category: usability.

Section navigation uses buttons and programmatic scrolling without updating the fragment or moving focus. Browser history/back and copied URLs do not represent the selected section; keyboard users remain at the navigation control. Long articles also exist only in modal state.

Fix: use section anchors and deliberate destination focus; give articles stable URLs if they are intended to be shared or indexed. Add a skip-to-content link. Suggested command: `$impeccable harden`.

### 17. Project evidence and the headline count do not align

Location: `src/data.ts:79`, `:129`, `:213`; `src/components/ProjectCard.tsx:121`. Category: implementation integrity/content.

The stats claim “15+ Featured Projects,” but the visible catalogue has six. This is a discrepancy to reconcile, not proof that other projects do not exist. The web-platform project's GitHub link goes to the profile rather than a specific repository. All repository icons share the generic name “GitHub link.” Descriptions list activities but omit dataset scope, baseline, validation method and defensible outcomes.

Fix: show an accurate displayed-project count or link the larger collection; use project-specific URLs/names and case studies with real, verified evidence. Suggested command: `$impeccable clarify`.

### 18. Simulator data contains mathematical inconsistencies

Location: `src/components/Projects.tsx:535`, `:729`. Category: implementation integrity.

The Europe category contributions total 110% (45+45+20); APAC totals 100%, global totals 100%, North America totals 100%. The confusion matrix percentages also do not match its case counts using normal row-based rates: 92/(92+12)=88.5%, not 85%; 65/(65+8)=89.0%. The matrix never changes when the selected model changes.

Fix: derive shares from one source dataset; define the percentage denominator; compute the matrix and model metrics consistently. Suggested command: `$impeccable harden`.

### 19. Decorative animation and loading architecture deserve optimization

Location: `src/components/SpaceBackground.tsx:72`; `src/App.tsx:9`; `src/index.css:1`; `package.json`.
Category: performance.

Thirty stars retain `will-change` continuously; three large blurred layers persist behind the page. Every section, simulator and modal is imported eagerly. Three font families and many weights arrive through a CSS import. Dependencies include packages with no matching application usage found (`@google/genai`, Express, dotenv); installation weight alone is not proof they enter the browser bundle. There is no committed lockfile.

Fix: profile actual rendering, pause offscreen decorative work, load heavy optional UI on demand, reduce needed font weights, remove unused dependencies and commit a lockfile. No frame-drop, bundle-size, Core Web Vitals or network-speed claim was measured here. Suggested command: `$impeccable optimize`.

### 20. Expertise chips imply interactions that do not exist

Location: `src/components/Expertise.tsx:53`. Category: usability.

Static skill labels have `cursor-pointer` and animated hover scaling but no action. They look like filters or links and create unproductive interaction attempts.

Fix: remove action-like cursor/hover behavior or add a meaningful destination showing related work. Suggested command: `$impeccable polish`.

## P3 — polish

### 21. Minor copy and identity inconsistencies

Location: `src/components/Projects.tsx:537`; `src/components/CVModal.tsx:364`; `index.html:8`.

“Confusion Matrix Matrix” repeats a word. CV footer says “Generated from hitesh-kanagala.com” while the live site uses Vercel. Metadata describes a Data Scientist & Machine Learning Engineer while the visible brand is Data Analyst/student. Social preview points to an external screenshot despite a local `public/og-preview.png` being available.

Fix: proofread labels, use the actual canonical identity/domain, and ensure the chosen social image reflects the current site. Suggested command: `$impeccable clarify`.

### 22. Typography could express more personality

Location: `src/index.css:1`. Category: visual polish.

The detector flags the familiar font stack. Inter plus Space Grotesk plus monospace is functional, but widespread; repeated uppercase headings, separators and boxed metadata make different sections feel similar. Font popularity is a taste observation, not an accessibility defect or reason to replace a working identity by itself.

Fix: prioritize evidence and hierarchy first; then simplify the font roles and make project visuals carry the personality. Suggested command: `$impeccable typeset`, finishing with `$impeccable polish`.

## Detector verification

The bundled detector ran successfully over `src` and reported two items:

- Overused-font warning in `src/index.css:1`: confirmed active import; low-priority design judgment only.
- Bounce advisory in `src/components/InteractiveNetwork.tsx:303`: excluded from the active-site findings because this component is not imported by the current application. Its mere presence is not evidence of a live problem.

The detector's two results are not the full audit: it does not establish working forms, correct math, keyboard behavior or business truth.

## What is working

- Clear availability, location, email, GitHub and LinkedIn destinations.
- Actual contact/CV actions, responsive grids, a main landmark, labelled social links and broad light/dark styling.
- Project demos make the site interactive, provided their illustrative nature is made explicit and the chart defects are corrected.
- Meaningful project titles, education and publication links supply useful material for a stronger portfolio.
- No general horizontal page overflow was observed at the inspected 390px layout; the CV toolbar has its own confirmed narrow-screen problem.

## Recommended order

1. `$impeccable harden`: delivery truth, dialog/keyboard behavior, form labels, chart geometry and mathematical correctness.
2. `$impeccable adapt`: 320px CV toolbar, readable controls, text enlargement and comfortable touch targets.
3. `$impeccable clarify`: label simulations, reconcile counts, add project evidence, align CV and identity.
4. `$impeccable layout` and `$impeccable distill`: move work earlier and remove repetition.
5. `$impeccable colorize`, `$impeccable animate`, `$impeccable optimize`: contrast, reduced motion and measured performance.
6. `$impeccable polish`: final consistency check, followed by `$impeccable audit` to reassess.

You can ask me to run these one at a time, all at once, or in any order you prefer. Re-run `$impeccable audit` after fixes to see your score improve.

## Limits

No real message was sent, external resume content was not verified, and external project/certificate destinations were not exhaustively validated. No physical phone, synthesized touch gestures, screen reader, 200% zoom, production build, dependency security scan, network throttling or performance profiler was run. Source findings are tied to the recorded commit; deployment/source parity was not cryptographically verified. This is a broad audit of inspected behavior and source, not a guarantee that every possible defect has been found.
