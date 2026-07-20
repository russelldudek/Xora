# Xora / 4MP Precision Workpiece Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the 4MP VP of AI candidate campaign as a premium, responsive 2026 experience centered on a scenario-driven Precision Workpiece, with a redesigned two-page résumé, one-page cover letter, supporting artifacts, committed PDFs, and complete publication QA.

**Architecture:** Keep a small static-site architecture. Semantic HTML contains all default content; `brand-tokens.css` owns provenance-backed tokens; `styles.css` owns responsive, document, print, and reduced-motion presentation; `app.js` owns scenario state, workpiece transitions, reset/replay, and honest section orientation. Chromium-generated PDFs remain derived from the same HTML document routes used on the website.

**Tech Stack:** HTML5, CSS custom properties, inline SVG, vanilla JavaScript, Playwright/Chromium, Python 3, pypdf, local HTTP server, GitHub Pages.

## Global Constraints

- Preserve exact verified titles, employers, dates, contact details, metrics, and claim strength from `memory/candidate-evidence.yaml`.
- Do not claim direct CNC controls tenure, production ML ownership, advanced-degree status, or undisclosed 4MP architecture.
- Use the official locally committed 4MP identity above the fold with an explicit independent-candidate qualifier.
- Commit `brand-intelligence.md`, `brand-tokens.css`, all used assets, all HTML routes, scripts, generated PDFs, and neutral documentation to `main`.
- Hero and interaction use the approved Precision Workpiece metaphor and the exact six-stage Correction Kernel sequence.
- Smart default is `Thermal drift — illustrative baseline`; all four scenarios must change geometry, cause, correction locus, authority, proof, learning scope, disposition, annotations, and final boundary.
- Motion runs once and settles; rapid scenario selection resolves to the last request; reduced motion resolves immediately.
- No generic full-page card stack, empty evidence surfaces, duplicate document action rail, runtime-injected identity, or runtime-injected essential content.
- Résumé PDF must be exactly 2 US Letter pages; cover-letter PDF exactly 1; interview brief 4; 120-day plan 3; Correction Qualification Record 2.
- Resume and cover letter use one shared header and visibly cross-link in web view.
- Every document route has exactly one native `Download PDF` action; Print is omitted.
- Validate desktop 1440×900, laptop 1280×800, tablet 768×1024, mobile 390×844, narrow phone 320×844, and reduced motion.
- Candidate-facing public files and PDF metadata must contain zero private orchestration-name or source-repository invitation matches.

---

### Task 1: Establish Brand and Source Contracts

**Files:**
- Create: `brand-intelligence.md`
- Create: `brand-tokens.css`
- Modify: `README.md`
- Test: `tests/source-contract.test.js`

**Interfaces:**
- Consumes: official 4MP logo at `assets/brand/4mp-logo.webp` and official product imagery already sourced for the campaign.
- Produces: CSS variables `--brand-blue`, `--brand-ink`, `--brand-paper`, `--brand-steel`, `--inspection-cyan`, `--inspection-amber`, `--inspection-coral`, typography variables, spacing variables, and documented asset provenance used by every later task.

- [ ] **Step 1: Write the failing source-contract test**

```js
import fs from 'node:fs';
import assert from 'node:assert/strict';

const required = [
  'brand-intelligence.md',
  'brand-tokens.css',
  'assets/brand/4mp-logo.webp'
];
for (const file of required) assert.ok(fs.existsSync(file), `missing ${file}`);
const tokens = fs.readFileSync('brand-tokens.css', 'utf8');
for (const token of ['--brand-blue','--brand-ink','--brand-paper','--brand-steel','--inspection-cyan']) {
  assert.ok(tokens.includes(token), `missing ${token}`);
}
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `node tests/source-contract.test.js`
Expected: failure naming missing `brand-intelligence.md` or `brand-tokens.css`.

- [ ] **Step 3: Create the brand record and token file**

Document official source URLs, logo provenance, source-sampled blue, typography evidence, licensed substitutions, imagery decisions, independent-candidate distinction, and surface-by-surface application. Define the exact variables listed above in `brand-tokens.css`.

- [ ] **Step 4: Run the test and confirm it passes**

Run: `node tests/source-contract.test.js`
Expected: exit code 0.

- [ ] **Step 5: Commit**

```bash
git add brand-intelligence.md brand-tokens.css README.md tests/source-contract.test.js
git commit -m "Establish 4MP brand and source contracts"
```

### Task 2: Build the Precision Workpiece Candidate Vision

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Create: `assets/campaign/precision-workpiece.svg`
- Test: `tests/site-structure.test.js`

**Interfaces:**
- Consumes: brand tokens from Task 1.
- Produces: semantic DOM IDs `thesis`, `workpiece`, `evidence`, `entry`, `dossier`; scenario buttons with `data-scenario`; SVG groups `nominal-layer`, `residual-layer`, `correction-layer`, `boundary-layer`, `disposition-layer`; readout fields used by Task 3.

- [ ] **Step 1: Write the failing structure test**

```js
import fs from 'node:fs';
import assert from 'node:assert/strict';
const html = fs.readFileSync('index.html','utf8');
for (const id of ['thesis','workpiece','evidence','entry','dossier']) {
  assert.ok(html.includes(`id="${id}"`), `missing ${id}`);
}
for (const key of ['thermal','wear','fixture','program']) {
  assert.ok(html.includes(`data-scenario="${key}"`), `missing ${key}`);
}
assert.equal((html.match(/class="dossier-downloads"/g)||[]).length, 0, 'duplicate download rail present');
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `node tests/site-structure.test.js`
Expected: failure for missing approved section IDs and workpiece controls.

- [ ] **Step 3: Replace the page architecture**

Build: official identity lockup; asymmetric editorial hero; inline/source SVG workpiece; technical tension spread; continuous six-stage qualification path; career-to-capability evidence trace; calibrated 120-day passes; hierarchical dossier with three primary and two supporting routes; one closing résumé action; independent-work footer.

- [ ] **Step 4: Implement full responsive art direction**

Use desktop asymmetry, tablet annotation strip, mobile-specific workpiece composition, alternating evidence records, touch-safe controls, no internal horizontal scrolling, visible focus, and no generic repeated card grid.

- [ ] **Step 5: Run the structure test**

Run: `node tests/site-structure.test.js`
Expected: exit code 0.

- [ ] **Step 6: Commit**

```bash
git add index.html styles.css assets/campaign/precision-workpiece.svg tests/site-structure.test.js
git commit -m "Build the Precision Workpiece candidate vision"
```

### Task 3: Implement Scenario State, Motion, Reset, and Orientation

**Files:**
- Modify: `app.js`
- Test: `tests/scenario-browser.test.mjs`

**Interfaces:**
- Consumes: DOM contract from Task 2.
- Produces: `SCENARIOS`, `applyScenario(key, {animate})`, `resetBaseline()`, `replayScenario()`, and active-section navigation state.

- [ ] **Step 1: Write the failing Playwright scenario test**

```js
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser = await chromium.launch({headless:true});
const page = await browser.newPage({viewport:{width:1280,height:800}});
await page.goto('http://127.0.0.1:4173/');
for (const [key, expected] of Object.entries({
  thermal:'Bounded correction',
  wear:'Qualified adjustment',
  fixture:'Confirm registration',
  program:'Human hold required'
})) {
  await page.click(`[data-scenario="${key}"]`);
  assert.equal(await page.locator('#dispositionValue').textContent(), expected);
  assert.equal(await page.locator(`[data-scenario="${key}"]`).getAttribute('aria-pressed'), 'true');
}
await page.click('[data-action="reset"]');
assert.equal(await page.locator('#scenarioValue').textContent(), 'Thermal drift');
await browser.close();
```

- [ ] **Step 2: Run the test and confirm it fails**

Run in two terminals:

```bash
python -m http.server 4173
node tests/scenario-browser.test.mjs
```

Expected: failure because approved IDs/functions are not implemented.

- [ ] **Step 3: Implement the scenario data and controller**

Each scenario must define residual SVG path/field values, workpiece annotation, cause, locus, authority, proof, learning scope, disposition, boundary class, accessible summary, and timing. `applyScenario` must cancel prior animation state before applying the latest request.

- [ ] **Step 4: Implement one-shot and reduced-motion behavior**

Use CSS classes and `animationend`/timers only for causal sequence; settle into a static final state. With reduced motion, update all values and final geometry synchronously.

- [ ] **Step 5: Implement reset, replay, keyboard state, and honest section orientation**

Reset returns to the labeled thermal baseline. Replay replays the active scenario. IntersectionObserver updates only the real current section link.

- [ ] **Step 6: Run browser tests**

Run: `node tests/scenario-browser.test.mjs`
Expected: exit code 0 for all four scenarios and reset.

- [ ] **Step 7: Commit**

```bash
git add app.js tests/scenario-browser.test.mjs
git commit -m "Implement qualified correction scenarios"
```

### Task 4: Redesign Resume and Cover Letter as a Shared Document System

**Files:**
- Modify: `resume.html`
- Modify: `cover-letter.html`
- Create: `document.css`
- Test: `tests/document-contract.test.js`

**Interfaces:**
- Consumes: brand tokens and verified candidate evidence.
- Produces: shared `.document-header`, `.document-actions`, `.page`, `.page-footer`; exact contact line; reciprocal links; one native PDF download per route.

- [ ] **Step 1: Write the failing document contract test**

```js
import fs from 'node:fs';
import assert from 'node:assert/strict';
const resume = fs.readFileSync('resume.html','utf8');
const letter = fs.readFileSync('cover-letter.html','utf8');
for (const value of ['412.287.8640','russelldudek@gmail.com','russelldudek.github.io/Xora/']) {
  assert.ok(resume.includes(value), `resume missing ${value}`);
  assert.ok(letter.includes(value), `letter missing ${value}`);
}
assert.ok(resume.includes('View Cover Letter'));
assert.ok(letter.includes('View Resume'));
assert.equal((resume.match(/Download PDF/g)||[]).length,1);
assert.equal((letter.match(/Download PDF/g)||[]).length,1);
assert.ok(!resume.includes('Print / Save PDF'));
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `node tests/document-contract.test.js`
Expected: failure for missing phone, reciprocal link, or native download.

- [ ] **Step 3: Build the shared document header and screen action bar**

Use one name, one identity line, compact verified contact line, visible candidate URL, official employer identifier, and no duplicate metadata.

- [ ] **Step 4: Compose résumé page one and page two**

Page one: immediate contribution profile, selected capabilities, Vape-Jet, DudeWorth, Compunetics, and a mandate/evidence trace. Page two: ZeusVu, Amazon, selected complementary experience, education, credentials in approved order, toolkit, continuation identity, visible URL. Keep exact titles and claim strength.

- [ ] **Step 5: Compose the one-page cover letter**

Open with the operating problem, connect two to four verified evidence threads, explain the Precision Workpiece and qualification model, mention the full candidate URL, use transparent transferability language, and close with `Carpe diem`.

- [ ] **Step 6: Run the document contract test**

Run: `node tests/document-contract.test.js`
Expected: exit code 0.

- [ ] **Step 7: Commit**

```bash
git add resume.html cover-letter.html document.css tests/document-contract.test.js
git commit -m "Redesign the application document system"
```

### Task 5: Recompose Supporting Documents

**Files:**
- Modify: `interview-brief.html`
- Modify: `120-day-plan.html`
- Modify: `correction-qualification.html`
- Test: `tests/supporting-documents.test.js`

**Interfaces:**
- Consumes: shared document system and thesis terminology.
- Produces: consulting-quality 4-page brief, 3-page plan, and 2-page qualification record, each with one native download action.

- [ ] **Step 1: Write the failing supporting-document test**

```js
import fs from 'node:fs';
import assert from 'node:assert/strict';
for (const file of ['interview-brief.html','120-day-plan.html','correction-qualification.html']) {
  const html = fs.readFileSync(file,'utf8');
  assert.equal((html.match(/Download PDF/g)||[]).length,1, `${file} download count`);
  assert.ok(html.includes('document.css'), `${file} missing shared system`);
  assert.ok(html.includes('russelldudek.github.io/Xora/'), `${file} missing candidate URL`);
}
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `node tests/supporting-documents.test.js`
Expected: failure for missing shared system, URL, or download action.

- [ ] **Step 3: Recompose the interview brief**

Use executive summary, company moment, tensions, Precision Workpiece, six-stage kernel, evidence transfer, affirmative contribution profile, 120-day overview, executive questions, and source notes across four deliberate pages.

- [ ] **Step 4: Recompose the 120-day plan**

Use four calibrated passes with operating question, principal work, exit evidence, authority transition, dependencies, and scorecard across three pages.

- [ ] **Step 5: Recompose the Correction Qualification Record**

Create a two-page printable review record for residual, cause, evidence, authority, permitted action, validation, reuse boundary, and learning admission.

- [ ] **Step 6: Run the supporting-document test**

Run: `node tests/supporting-documents.test.js`
Expected: exit code 0.

- [ ] **Step 7: Commit**

```bash
git add interview-brief.html 120-day-plan.html correction-qualification.html tests/supporting-documents.test.js
git commit -m "Recompose the interview and operating artifacts"
```

### Task 6: Generate and Verify Exact PDFs

**Files:**
- Create/Replace: `docs/Russell-Dudek-4MP-Resume.pdf`
- Create/Replace: `docs/Russell-Dudek-4MP-Cover-Letter.pdf`
- Create/Replace: `docs/Russell-Dudek-4MP-Interview-Thesis-Brief.pdf`
- Create/Replace: `docs/Russell-Dudek-4MP-120-Day-Plan.pdf`
- Create/Replace: `docs/Russell-Dudek-4MP-Correction-Qualification.pdf`
- Create: `scripts/generate-pdfs.mjs`
- Test: `tests/pdf-contract.py`

**Interfaces:**
- Consumes: document HTML and print CSS.
- Produces: same-origin PDFs with page counts `2 / 1 / 4 / 3 / 2`.

- [ ] **Step 1: Write the failing page-count test**

```python
from pathlib import Path
from pypdf import PdfReader
expected = {
    'Russell-Dudek-4MP-Resume.pdf': 2,
    'Russell-Dudek-4MP-Cover-Letter.pdf': 1,
    'Russell-Dudek-4MP-Interview-Thesis-Brief.pdf': 4,
    'Russell-Dudek-4MP-120-Day-Plan.pdf': 3,
    'Russell-Dudek-4MP-Correction-Qualification.pdf': 2,
}
for name, count in expected.items():
    path = Path('docs') / name
    assert path.exists(), f'missing {path}'
    assert len(PdfReader(path).pages) == count, f'{name} page count'
```

- [ ] **Step 2: Run the test and confirm it fails against stale PDFs**

Run: `python tests/pdf-contract.py`
Expected: at least one missing/stale pagination or content failure after document redesign.

- [ ] **Step 3: Generate PDFs with Chromium**

`scripts/generate-pdfs.mjs` launches Chromium, loads each local HTTP route, waits for fonts/images, emulates print media, and calls `page.pdf({format:'Letter', printBackground:true, preferCSSPageSize:true})`.

- [ ] **Step 4: Run page-count and text checks**

Run:

```bash
node scripts/generate-pdfs.mjs
python tests/pdf-contract.py
```

Expected: exact `2 / 1 / 4 / 3 / 2` pagination.

- [ ] **Step 5: Rasterize and inspect every page**

Run the PDF rendering/preflight scripts and inspect contact sheets for balance, clipping, split modules, microscopic text, footer collisions, logo quality, and document continuity.

- [ ] **Step 6: Commit**

```bash
git add docs scripts/generate-pdfs.mjs tests/pdf-contract.py
git commit -m "Generate the redesigned application PDFs"
```

### Task 7: Run Full Responsive, Accessibility, Confidentiality, and Link QA

**Files:**
- Create: `tests/full-site-qa.mjs`
- Create: `campaign-audit.md`
- Modify: `.github/workflows/quality.yml`

**Interfaces:**
- Consumes: complete site and PDF set.
- Produces: browser screenshots, zero-overflow assertions, interaction assertions, download/link checks, confidentiality scan, and audit record.

- [ ] **Step 1: Write the full-site QA runner**

Test every HTML route at 1440×900, 1280×800, 768×1024, 390×844, and 320×844. Assert no horizontal overflow, no direct-child overlap in critical components, no console/page errors, visible company identity, exactly one document download action, working reciprocal links, keyboard scenario operation, reset, rapid-selection settlement, and reduced-motion final state.

- [ ] **Step 2: Add confidentiality and evidence scans**

Scan public source and PDF-extracted text/metadata case-insensitively for prohibited internal names and source-repository invitation language. Scan for unverified AWS/Bedrock/SageMaker claims if not supported by candidate evidence.

- [ ] **Step 3: Run the complete suite**

Run:

```bash
node tests/source-contract.test.js
node tests/site-structure.test.js
node tests/document-contract.test.js
node tests/supporting-documents.test.js
python tests/pdf-contract.py
node tests/full-site-qa.mjs
```

Expected: all commands exit 0 and screenshots show no unfinished section or generic empty surface.

- [ ] **Step 4: Write the campaign audit**

Record manifest, brand fidelity, visible identity, token provenance, typography decision, visual experience, role-derived motion, UX psychology, responsive review, reduced motion, document pagination, evidence integrity, confidentiality, and remaining live-deployment status.

- [ ] **Step 5: Commit**

```bash
git add tests campaign-audit.md .github/workflows/quality.yml
git commit -m "Add complete campaign quality gates"
```

### Task 8: Publish, Re-Fetch, Verify Live State, and Re-Ingest Learning

**Files:**
- Modify: `.github/workflows/deploy-pages.yml`
- Modify: `README.md`
- Modify private canonical case and learning records after public publication.

**Interfaces:**
- Consumes: audited campaign files.
- Produces: complete `main`, Pages deployment, audited head SHA, live route verification, and revision-delta learning record.

- [ ] **Step 1: Make Pages deploy the readable root source**

Deploy the repository root directly; generate PDFs before upload only when the committed PDFs are stale, and fail when generated bytes/page counts do not match the committed contract.

- [ ] **Step 2: Commit all final public files to `main`**

Verify the manifest contains every required route, CSS file, script, asset, PDF, brand record, README, and audit file.

- [ ] **Step 3: Re-fetch critical files from `ref=main`**

Re-fetch `index.html`, `styles.css`, `brand-tokens.css`, `app.js`, all document routes, all PDFs, logo assets, `brand-intelligence.md`, and `campaign-audit.md`. Confirm they correspond to the final head.

- [ ] **Step 4: Verify the public Pages site**

Confirm HTTP success, visible redesigned hero, all four scenario transitions, responsive behavior, same-origin downloads, PDF page counts, reciprocal links, and live/source correspondence. Do not mark complete if live verification is unavailable.

- [ ] **Step 5: Re-read the latest canonical campaign skill and references**

Run the Canonical Skill Alignment Audit against the final site and artifacts. Repair any drift before handoff.

- [ ] **Step 6: Update private learning records**

Record the user-observed empty-card, redundant-action, generic-site, and weak-résumé defects; why prior QA missed them; the rejected execution; the approved Precision Workpiece correction; regression coverage; verification evidence; and case-specific anti-clone fingerprint.

- [ ] **Step 7: Final commit and completion classification**

Capture the audited `main` head. Classify `complete` only when public source, PDFs, rendered QA, confidentiality, and live deployment all pass; otherwise classify `building` or `blocked` with the exact remaining check.
