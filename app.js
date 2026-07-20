const S={
  thermal:{label:'Thermal drift',path:'M80 270 C155 150 250 385 340 230 S520 135 660 260',cause:'Temperature-dependent geometric drift',locus:'Coordinate and compensation model',authority:'Shadow recommendation, then bounded auto-correction',proof:'Repeatable metrology across warm-up states',learning:'Machine + environment condition',state:'Bounded correction',core:'THERMAL MODEL',boundary:'qualified'},
  wear:{label:'Tool wear',path:'M80 270 C175 220 245 290 340 240 S520 245 660 305',cause:'Progressive tool-state change',locus:'Tool offset, life model, or planned change',authority:'Auto-adjust inside certified limits',proof:'Trend consistency and post-correction probe result',learning:'Tool + material + operation family',state:'Qualified adjustment',core:'TOOL-STATE',boundary:'qualified'},
  fixture:{label:'Fixture shift',path:'M80 320 C170 270 250 345 340 290 S520 265 660 320',cause:'Part-frame registration error',locus:'Work-coordinate transform or hold',authority:'Human confirmation above shift boundary',proof:'Multi-point registration and collision-safe replay',learning:'Fixture + setup pattern',state:'Confirm registration',core:'FRAME SHIFT',boundary:'confirm'},
  program:{label:'Program ambiguity',path:'M80 270 C180 215 260 275 340 230 S520 85 660 260',cause:'Intent cannot be inferred safely from program alone',locus:'G-code, CAM context, and operator intent',authority:'Human clarification required',proof:'Intent trace, simulation, and safe dry run',learning:'Programming style + operation context',state:'Human hold required',core:'INTENT GATE',boundary:'hold'}
};

let current='thermal';
let reviewTimer;
let heroTimer;

const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];
const reducedMotion=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;

function text(id,value){
  const element=document.getElementById(id);
  if(element) element.textContent=value;
}

function playHero(){
  const scene=$('.scene');
  if(!scene) return;

  clearTimeout(heroTimer);
  scene.classList.remove('run','motion-pending');

  if(reducedMotion()) return;

  scene.classList.add('motion-pending');
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    scene.classList.remove('motion-pending');
    scene.classList.add('run');
    heroTimer=setTimeout(()=>scene.classList.remove('run'),2400);
  }));
}

function apply(key,animate=true){
  const data=S[key];
  if(!data) return;

  current=key;
  clearTimeout(reviewTimer);

  $$('.scenario').forEach(button=>{
    button.setAttribute('aria-pressed',String(button.dataset.scenario===key));
  });

  $('#measuredPath').setAttribute('d',data.path);
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
  review.dataset.boundary=data.boundary;
  status.textContent=data.state;
  review.classList.remove('run');
  void review.offsetWidth;

  if(animate&&!reducedMotion()){
    review.classList.add('run');
    reviewTimer=setTimeout(()=>review.classList.remove('run'),1250);
  }

  const svg=$('.review-visual svg');
  svg.setAttribute('aria-label',`${data.label}: ${data.cause}. ${data.state}.`);
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
  $$('.scenario').forEach(button=>{
    button.addEventListener('click',()=>apply(button.dataset.scenario));
  });

  $('[data-action=reset]').addEventListener('click',()=>apply('thermal'));
  $('[data-action=replay]').addEventListener('click',()=>apply(current));

  apply('thermal',false);
  playHero();
  installNav();
});
