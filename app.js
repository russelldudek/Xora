const S={
  thermal:{
    label:'Thermal drift',
    path:'M80 270 C155 150 250 385 340 230 S520 135 660 260',
    cause:'Temperature-dependent geometric drift',
    locus:'Coordinate and compensation model',
    authority:'Shadow recommendation, then bounded auto-correction',
    proof:'Repeatable metrology across warm-up states',
    learning:'Machine + environment condition',
    state:'Bounded correction',
    core:'THERMAL MODEL',
    boundary:'qualified',
    heroPath:'M168 252 C214 133 350 105 480 154 C600 199 632 306 576 397 C520 489 370 506 242 454 C142 413 111 330 168 252 Z',
    focus:[244,174],
    deltas:[[222,166,238,205],[465,154,454,190],[590,302,552,304],[248,454,266,420]],
    outcome:'qualified',
    terminal:5,
    heroState:'QUALIFIED CORRECTION',
    heroDetail:'Evidence admitted · machine + environment',
    authorityShort:'Bounded compensation',
    proofShort:'Repeat metrology',
    memoryShort:'Local condition retained'
  },
  wear:{
    label:'Tool wear',
    path:'M80 270 C175 220 245 290 340 240 S520 245 660 305',
    cause:'Progressive tool-state change',
    locus:'Tool offset, life model, or planned change',
    authority:'Auto-adjust inside certified limits',
    proof:'Trend consistency and post-correction probe result',
    learning:'Tool + material + operation family',
    state:'Qualified adjustment',
    core:'TOOL-STATE',
    boundary:'qualified',
    heroPath:'M175 245 C218 142 350 112 475 150 C555 175 626 224 612 304 C603 365 548 432 474 460 C360 503 224 466 160 389 C117 337 128 280 175 245 Z',
    focus:[552,205],
    deltas:[[523,180,502,205],[592,244,554,255],[581,358,548,342],[444,467,435,430]],
    outcome:'qualified',
    terminal:5,
    heroState:'QUALIFIED ADJUSTMENT',
    heroDetail:'Evidence admitted · tool + operation family',
    authorityShort:'Certified offset window',
    proofShort:'Trend + probe result',
    memoryShort:'Tool-state pattern retained'
  },
  fixture:{
    label:'Fixture shift',
    path:'M80 320 C170 270 250 345 340 290 S520 265 660 320',
    cause:'Part-frame registration error',
    locus:'Work-coordinate transform or hold',
    authority:'Human confirmation above shift boundary',
    proof:'Multi-point registration and collision-safe replay',
    learning:'Fixture + setup pattern',
    state:'Confirm registration',
    core:'FRAME SHIFT',
    boundary:'confirm',
    heroPath:'M197 264 C237 159 367 124 492 164 C607 201 657 304 612 404 C562 511 407 539 272 489 C167 451 134 349 197 264 Z',
    focus:[608,401],
    deltas:[[202,251,181,236],[494,166,476,147],[620,400,581,376],[284,492,263,455]],
    outcome:'confirm',
    terminal:4,
    heroState:'CONFIRM REGISTRATION',
    heroDetail:'Proof pending · memory not admitted',
    authorityShort:'Human registration check',
    proofShort:'Multi-point registration',
    memoryShort:'Pending confirmation'
  },
  program:{
    label:'Program ambiguity',
    path:'M80 270 C180 215 260 275 340 230 S520 85 660 260',
    cause:'Intent cannot be inferred safely from program alone',
    locus:'G-code, CAM context, and operator intent',
    authority:'Human clarification required',
    proof:'Intent trace, simulation, and safe dry run',
    learning:'Programming style + operation context',
    state:'Human hold required',
    core:'INTENT GATE',
    boundary:'hold',
    heroPath:'M176 244 C215 142 330 104 438 136 C500 154 535 187 568 222 C602 258 633 300 605 355 C571 423 500 462 421 466 C344 470 301 435 244 448 C176 464 125 414 126 350 C127 305 146 270 176 244 Z',
    focus:[541,206],
    deltas:[[510,180,490,202],[567,220,530,236],[596,342,558,334],[245,448,259,414]],
    outcome:'hold',
    terminal:3,
    heroState:'HUMAN HOLD REQUIRED',
    heroDetail:'Intent unresolved · no correction admitted',
    authorityShort:'Human clarification gate',
    proofShort:'Intent trace + safe dry run',
    memoryShort:'Admission blocked'
  }
};

const HERO_STAGES=['intent','state','cause','bound','prove','memory'];
const HERO_STAGE_COPY={
  intent:'Manufacturing intent and tolerance established.',
  state:'Measured geometry reconstructed.',
  cause:'Residual isolated and cause hypothesis formed.',
  bound:'Authority window applied.',
  prove:'Correction tested against required evidence.',
  memory:'Qualified evidence admitted to memory.'
};
const HERO_STAGE_TIMES=[120,720,1420,2150,2920,3650];
const HERO_COMPLETE_TIMES={qualified:4300,confirm:3700,hold:2900};

let current='thermal';
let reviewTimer;
let heroTimers=[];
let heroFrame;

const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];
const reducedMotion=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;

function text(id,value){
  const element=document.getElementById(id);
  if(element) element.textContent=value;
}

function renderQualificationLens(){
  const scene=$('.scene');
  if(!scene||scene.querySelector('.qualification-lens')) return;

  scene.innerHTML=`
    <div class="qualification-lens">
      <div class="lens-head">
        <div>
          <span>AUTONOMOUS CORRECTION KERNEL</span>
          <strong>Qualification Lens</strong>
        </div>
        <div class="lens-scenario">
          <span>ILLUSTRATIVE BASELINE</span>
          <strong id="heroScenarioValue">Thermal drift</strong>
        </div>
      </div>
      <div class="lens-grid">
        <div class="lens-canvas">
          <svg class="lens-svg" viewBox="0 0 760 520" role="img" aria-labelledby="lensTitle lensDescription">
            <title id="lensTitle">Thermal drift qualification sequence</title>
            <desc id="lensDescription">Manufacturing intent is compared with measured geometry, constrained by an authority window, proven, and admitted to memory when qualified.</desc>
            <defs>
              <pattern id="lensGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0V40" fill="none" stroke="rgba(139,164,194,.12)" stroke-width="1"/>
              </pattern>
              <radialGradient id="lensField" cx="50%" cy="44%" r="62%">
                <stop offset="0" stop-color="#172941"/>
                <stop offset="1" stop-color="#091422"/>
              </radialGradient>
              <filter id="lensGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="5" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <marker id="lensArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M0 0L10 5L0 10Z" fill="context-stroke"/>
              </marker>
            </defs>
            <rect class="lens-field" x="0" y="0" width="760" height="520" rx="22"/>
            <rect class="lens-grid-lines" x="0" y="0" width="760" height="520" rx="22"/>
            <g class="intent-layer">
              <path class="tolerance-contour tolerance-outer" pathLength="1" d="M155 235 C205 113 347 76 492 124 C628 169 680 296 616 414 C548 538 368 562 220 503 C100 455 69 337 155 235 Z"/>
              <path class="tolerance-contour tolerance-inner" pathLength="1" d="M194 259 C235 169 355 139 462 172 C560 202 601 295 558 382 C510 474 380 494 271 453 C181 419 150 340 194 259 Z"/>
              <path class="intent-contour" pathLength="1" d="M175 245 C215 140 345 105 470 145 C585 182 635 285 590 385 C540 492 385 520 250 470 C145 432 112 330 175 245 Z"/>
              <path class="intent-inner" pathLength="1" d="M279 263 C323 214 410 206 470 242 C523 274 526 343 479 384 C426 431 334 420 286 374 C249 338 247 299 279 263 Z"/>
            </g>
            <g class="state-layer">
              <line class="measurement-sweep" x1="105" y1="92" x2="655" y2="92"/>
              <path id="heroMeasuredShadow" class="measured-shadow" pathLength="1" d="M168 252 C214 133 350 105 480 154 C600 199 632 306 576 397 C520 489 370 506 242 454 C142 413 111 330 168 252 Z"/>
              <path id="heroMeasuredContour" class="measured-contour" pathLength="1" d="M168 252 C214 133 350 105 480 154 C600 199 632 306 576 397 C520 489 370 506 242 454 C142 413 111 330 168 252 Z"/>
              <circle id="heroResidualFocus" class="residual-focus" cx="244" cy="174" r="11"/>
              <circle class="residual-halo" cx="244" cy="174" r="28"/>
            </g>
            <g class="authority-window">
              <path class="authority-rail rail-left" d="M205 118V430M190 118H225M190 430H225"/>
              <path class="authority-rail rail-right" d="M555 118V430M535 118H570M535 430H570"/>
              <text x="380" y="112" text-anchor="middle">PERMITTED INTERVENTION WINDOW</text>
            </g>
            <g class="delta-vectors">
              <line data-delta="0" pathLength="1" marker-end="url(#lensArrow)" x1="222" y1="166" x2="238" y2="205"/>
              <line data-delta="1" pathLength="1" marker-end="url(#lensArrow)" x1="465" y1="154" x2="454" y2="190"/>
              <line data-delta="2" pathLength="1" marker-end="url(#lensArrow)" x1="590" y1="302" x2="552" y2="304"/>
              <line data-delta="3" pathLength="1" marker-end="url(#lensArrow)" x1="248" y1="454" x2="266" y2="420"/>
            </g>
            <path id="heroQualifiedContour" class="qualified-contour" pathLength="1" d="M175 245 C215 140 345 105 470 145 C585 182 635 285 590 385 C540 492 385 520 250 470 C145 432 112 330 175 245 Z"/>
            <g class="proof-mark" transform="translate(585 420)">
              <circle r="28"/>
              <path d="M-11 0l8 9 16-20"/>
            </g>
          </svg>
          <div class="lens-legend" aria-label="Contour legend">
            <span><i class="legend-intent"></i>Intent</span>
            <span><i class="legend-measured"></i>Measured</span>
            <span><i class="legend-qualified"></i>Qualified</span>
          </div>
        </div>
        <aside class="lens-ledger" aria-label="Qualification evidence">
          <div class="ledger-row" data-ledger="cause"><span>CAUSE</span><strong id="heroCauseValue">Temperature-dependent geometric drift</strong></div>
          <div class="ledger-row" data-ledger="authority"><span>AUTHORITY</span><strong id="heroAuthorityValue">Bounded compensation</strong></div>
          <div class="ledger-row" data-ledger="proof"><span>PROOF</span><strong id="heroProofValue">Repeat metrology</strong></div>
          <div class="ledger-row" data-ledger="memory"><span>LEARNING</span><strong id="heroMemoryValue">Local condition retained</strong></div>
          <div class="ledger-outcome">
            <span>DISPOSITION</span>
            <strong id="heroOutcomeValue">QUALIFIED CORRECTION</strong>
            <small id="heroOutcomeDetail">Evidence admitted · machine + environment</small>
          </div>
        </aside>
      </div>
      <div class="kernel-wrap">
        <ol class="kernel-rail" aria-label="Qualification stages">
          <li data-stage="intent"><i>01</i><span>INTENT</span></li>
          <li data-stage="state"><i>02</i><span>STATE</span></li>
          <li data-stage="cause"><i>03</i><span>CAUSE</span></li>
          <li data-stage="bound"><i>04</i><span>BOUND</span></li>
          <li data-stage="prove"><i>05</i><span>PROVE</span></li>
          <li data-stage="memory"><i>06</i><span>MEMORY</span></li>
        </ol>
        <span class="memory-packet" aria-hidden="true"></span>
      </div>
      <div class="lens-foot">
        <p id="heroLiveStatus" aria-live="polite">Thermal drift illustrative baseline. Ready to replay qualification.</p>
        <button class="lens-replay" type="button" data-action="hero-replay">Replay qualification</button>
      </div>
    </div>`;
}

function clearHeroMotion(){
  heroTimers.forEach(clearTimeout);
  heroTimers=[];
  if(heroFrame) cancelAnimationFrame(heroFrame);
  heroFrame=undefined;
}

function updateHeroData(key){
  const data=S[key];
  const scene=$('.scene');
  if(!data||!scene) return;

  scene.dataset.outcome=data.outcome;
  text('heroScenarioValue',data.label);
  text('heroCauseValue',data.cause);
  text('heroAuthorityValue',data.authorityShort);
  text('heroProofValue',data.proofShort);
  text('heroMemoryValue',data.memoryShort);
  text('heroOutcomeValue',data.heroState);
  text('heroOutcomeDetail',data.heroDetail);

  const measured=$('#heroMeasuredContour');
  const shadow=$('#heroMeasuredShadow');
  if(measured) measured.setAttribute('d',data.heroPath);
  if(shadow) shadow.setAttribute('d',data.heroPath);

  const focus=$('#heroResidualFocus');
  const halo=$('.residual-halo');
  if(focus){focus.setAttribute('cx',data.focus[0]);focus.setAttribute('cy',data.focus[1]);}
  if(halo){halo.setAttribute('cx',data.focus[0]);halo.setAttribute('cy',data.focus[1]);}

  data.deltas.forEach((points,index)=>{
    const line=$(`[data-delta="${index}"]`);
    if(!line) return;
    ['x1','y1','x2','y2'].forEach((attribute,pointIndex)=>line.setAttribute(attribute,points[pointIndex]));
  });

  const title=$('#lensTitle');
  const description=$('#lensDescription');
  if(title) title.textContent=`${data.label} qualification sequence`;
  if(description) description.textContent=`${data.label}. ${data.cause}. ${data.authority}. Final disposition: ${data.heroState}.`;
}

function setHeroStage(index,final=false){
  const nodes=$$('.kernel-rail [data-stage]');
  nodes.forEach((node,nodeIndex)=>{
    node.classList.toggle('is-complete',final?nodeIndex<=index:nodeIndex<index);
    node.classList.toggle('is-active',!final&&nodeIndex===index);
    node.classList.toggle('is-terminal',final&&nodeIndex===index);
    node.classList.toggle('is-pending',nodeIndex>index);
    if(!final&&nodeIndex===index) node.setAttribute('aria-current','step');
    else node.removeAttribute('aria-current');
  });
}

function completeHero(key){
  const data=S[key];
  const scene=$('.scene');
  if(!data||!scene||key!==current) return;
  scene.classList.remove('is-preparing','is-animating');
  scene.classList.add('is-complete');
  setHeroStage(data.terminal,true);
  text('heroLiveStatus',`${data.label}. ${data.heroState}. ${data.heroDetail}.`);
}

function playHero(key=current,animate=true){
  const data=S[key];
  const scene=$('.scene');
  if(!data||!scene) return;

  clearHeroMotion();
  updateHeroData(key);
  scene.classList.remove('is-preparing','is-animating','is-complete');
  setHeroStage(-1,false);

  if(!animate||reducedMotion()){
    scene.classList.add('is-complete');
    setHeroStage(data.terminal,true);
    text('heroLiveStatus',`${data.label}. ${data.heroState}. ${data.heroDetail}.`);
    return;
  }

  scene.classList.add('is-preparing');
  text('heroLiveStatus',`${data.label}. Qualification sequence started.`);

  heroFrame=requestAnimationFrame(()=>{
    heroFrame=requestAnimationFrame(()=>{
      if(key!==current) return;
      scene.classList.remove('is-preparing');
      scene.classList.add('is-animating');

      HERO_STAGE_TIMES.slice(0,data.terminal+1).forEach((delay,index)=>{
        heroTimers.push(setTimeout(()=>{
          if(key!==current) return;
          setHeroStage(index,false);
          text('heroLiveStatus',HERO_STAGE_COPY[HERO_STAGES[index]]);
        },delay));
      });

      heroTimers.push(setTimeout(()=>completeHero(key),HERO_COMPLETE_TIMES[data.outcome]));
    });
  });
}

function apply(key,animate=true){
  const data=S[key];
  if(!data) return;
  current=key;
  clearTimeout(reviewTimer);

  $$('.scenario').forEach(button=>{
    button.setAttribute('aria-pressed',String(button.dataset.scenario===key));
  });

  const measured=$('#measuredPath');
  if(measured) measured.setAttribute('d',data.path);
  text('scenarioValue',data.label);
  text('causeValue',data.cause);
  text('locusValue',data.locus);
  text('authorityValue',data.authority);
  text('proofValue',data.proof);
  text('learningValue',data.learning);
  text('dispositionValue',data.state);
  text('coreValue',data.core);

  const review=$('.review');
  const status=$('.review-status');
  if(review){
    review.dataset.boundary=data.boundary;
    review.classList.remove('run');
    void review.offsetWidth;
    if(animate&&!reducedMotion()){
      review.classList.add('run');
      reviewTimer=setTimeout(()=>review.classList.remove('run'),1250);
    }
  }
  if(status) status.textContent=data.state;

  const svg=$('.review-visual svg');
  if(svg) svg.setAttribute('aria-label',`${data.label}: ${data.cause}. ${data.state}.`);

  playHero(key,animate);
}

function installNav(){
  const links=$$('.navlinks a[data-nav]');
  const sections=$$('[data-section]');
  if(!('IntersectionObserver' in window)) return;

  const observer=new IntersectionObserver(entries=>{
    const hit=entries
      .filter(entry=>entry.isIntersecting)
      .sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];

    if(hit){
      links.forEach(link=>{
        link.setAttribute('aria-current',String(link.dataset.nav===hit.target.dataset.section));
      });
    }
  },{rootMargin:'-20% 0px -65%',threshold:[.1,.3]});

  sections.forEach(section=>observer.observe(section));
}

addEventListener('DOMContentLoaded',()=>{
  renderQualificationLens();

  $$('.scenario').forEach(button=>{
    button.addEventListener('click',()=>apply(button.dataset.scenario));
  });

  const reset=$('[data-action=reset]');
  const replay=$('[data-action=replay]');
  const heroReplay=$('[data-action=hero-replay]');
  if(reset) reset.addEventListener('click',()=>apply('thermal'));
  if(replay) replay.addEventListener('click',()=>apply(current));
  if(heroReplay) heroReplay.addEventListener('click',()=>playHero(current,true));

  apply('thermal',false);
  playHero('thermal',true);
  installNav();
});
