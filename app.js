const scenarios = {
  thermal: {
    label: 'Thermal drift',
    observed: 'M40 172 C110 92 175 224 245 145 S380 85 455 157 S565 232 650 142',
    cause: 'Temperature-dependent geometric drift',
    locus: 'Coordinate and compensation model',
    authority: 'Shadow recommendation, then bounded auto-correction',
    proof: 'Repeatable metrology across warm-up states',
    learning: 'Machine + environment condition',
    disposition: 'Correct after evidence gate',
    coreTitle: 'THERMAL MODEL',
    coreLine1: 'temperature · state',
    coreLine2: 'drift · authority',
    coreLine3: 'proof · memory',
    state: 'Bounded correction'
  },
  wear: {
    label: 'Tool wear',
    observed: 'M40 172 C110 142 175 186 245 149 S380 126 455 174 S565 218 650 170',
    cause: 'Progressive tool-state change',
    locus: 'Tool offset, life model, or planned change',
    authority: 'Auto-adjust inside certified limits',
    proof: 'Trend consistency and post-correction probe result',
    learning: 'Tool + material + operation family',
    disposition: 'Adjust, validate, retain trend',
    coreTitle: 'TOOL-STATE',
    coreLine1: 'wear · material',
    coreLine2: 'offset · authority',
    coreLine3: 'trend · memory',
    state: 'Qualified adjustment'
  },
  fixture: {
    label: 'Fixture shift',
    observed: 'M40 205 C110 168 175 210 245 176 S380 150 455 192 S565 235 650 184',
    cause: 'Part-frame registration error',
    locus: 'Work-coordinate transform or hold',
    authority: 'Human confirmation above shift boundary',
    proof: 'Multi-point registration and collision-safe replay',
    learning: 'Fixture + setup pattern',
    disposition: 'Re-register or stop the pass',
    coreTitle: 'FRAME SHIFT',
    coreLine1: 'fixture · part',
    coreLine2: 'register · limits',
    coreLine3: 'replay · proof',
    state: 'Confirm registration'
  },
  program: {
    label: 'Program ambiguity',
    observed: 'M40 172 C110 142 175 186 245 149 S380 112 455 157 S525 82 650 142',
    cause: 'Intent cannot be inferred safely from program alone',
    locus: 'G-code, CAM context, and operator intent',
    authority: 'Human clarification required',
    proof: 'Intent trace, simulation, and safe dry run',
    learning: 'Programming style + operation context',
    disposition: 'Hold until intent resolves',
    coreTitle: 'INTENT GATE',
    coreLine1: 'G-code · CAM',
    coreLine2: 'ambiguity · human',
    coreLine3: 'simulate · hold',
    state: 'Human hold required'
  }
};

const pdfs = [
  ['Resume', 'docs/Russell-Dudek-4MP-Resume.pdf'],
  ['Cover letter', 'docs/Russell-Dudek-4MP-Cover-Letter.pdf'],
  ['Interview brief', 'docs/Russell-Dudek-4MP-Interview-Thesis-Brief.pdf'],
  ['120-day plan', 'docs/Russell-Dudek-4MP-120-Day-Plan.pdf'],
  ['Qualification record', 'docs/Russell-Dudek-4MP-Correction-Qualification.pdf']
];

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function prepareKernelSvg() {
  const svg = document.querySelector('.paths svg');
  if (!svg) return;

  const correctedPath = svg.querySelector('.corrected');
  const corePanel = svg.querySelector('.core');

  // SVG uses document order for paint order. Put the correction curve behind
  // the center module so the curve can never cross its labels.
  if (correctedPath && corePanel) {
    svg.insertBefore(correctedPath, corePanel);
  }

  const labels = svg.querySelectorAll('text');
  const ids = ['coreTitle', 'coreLine1', 'coreLine2', 'coreLine3'];
  labels.forEach((label, index) => {
    if (ids[index]) label.id = ids[index];
  });
}

function runScenario(key) {
  const data = scenarios[key];
  const shell = document.querySelector('.kernel');
  if (!data || !shell) return;

  document.querySelectorAll('.scenario').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.scenario === key));
  });

  const observedPath = document.getElementById('observed');
  if (observedPath) observedPath.setAttribute('d', data.observed);

  setText('scenarioLabel', data.label);
  setText('cause', data.cause);
  setText('locus', data.locus);
  setText('authority', data.authority);
  setText('proof', data.proof);
  setText('learning', data.learning);
  setText('disposition', data.disposition);

  setText('coreTitle', data.coreTitle);
  setText('coreLine1', data.coreLine1);
  setText('coreLine2', data.coreLine2);
  setText('coreLine3', data.coreLine3);

  const state = shell.querySelector('.state');
  if (state) state.textContent = data.state;

  const svg = shell.querySelector('.paths svg');
  if (svg) {
    svg.setAttribute(
      'aria-label',
      `${data.label}: observed deviation, ${data.coreTitle.toLowerCase()}, and corrected toolpath.`
    );
  }

  shell.dataset.activeScenario = key;
  shell.classList.remove('run');
  void shell.offsetWidth;

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    shell.classList.add('run');
  }
}

function installIdentity() {
  const style = document.createElement('style');
  style.textContent = '.brand b{display:inline-block;width:54px;height:24px;background:url("assets/brand/4mp-logo.webp") center/contain no-repeat;vertical-align:middle;text-indent:-9999px;overflow:hidden}.pdf-strip{display:flex;flex-wrap:wrap;gap:.65rem;margin-top:1rem}.pdf-strip a{display:inline-flex;padding:.65rem .8rem;border:1px solid #34435f;border-radius:.5rem;color:#fff;text-decoration:none;font-size:.78rem;font-weight:800}.pdf-strip a:hover,.pdf-strip a:focus{border-color:#55d8d2;color:#55d8d2}';
  document.head.appendChild(style);
}

function installDownloads() {
  const section = document.querySelector('#documents .docs');
  if (!section || document.querySelector('.pdf-strip')) return;

  const strip = document.createElement('div');
  strip.className = 'pdf-strip';
  strip.setAttribute('aria-label', 'Direct PDF downloads');

  pdfs.forEach(([label, path]) => {
    const link = document.createElement('a');
    link.href = path;
    link.download = path.split('/').pop();
    link.textContent = `Download ${label}`;
    strip.appendChild(link);
  });

  section.insertAdjacentElement('afterend', strip);
}

document.addEventListener('DOMContentLoaded', () => {
  installIdentity();
  installDownloads();
  prepareKernelSvg();

  document.querySelectorAll('.scenario').forEach((button) => {
    button.addEventListener('click', () => runScenario(button.dataset.scenario));
  });

  runScenario('thermal');
});
