import fs from 'node:fs';
import assert from 'node:assert/strict';

const bootstrap=fs.readFileSync('app.js','utf8');
const data=fs.readFileSync('qualification-data.js','utf8');
const lens=fs.readFileSync('qualification-lens.js','utf8');
const controller=fs.readFileSync('qualification-controller.js','utf8');
const css=fs.readFileSync('stage-navigation.css','utf8');

assert.match(bootstrap,/import\('\.\/qualification-controller\.js'\)/,'bootstrap does not load the controller');
for(const name of ['renderQualificationLens','playHero','setHeroStage','completeHero','scrubHero','updateStageExplanation','installStageControls']){
  assert.match(lens+controller,new RegExp(`function\\s+${name}\\s*\\(`),`missing ${name}`);
}
assert.match(lens,/data-stage-index="\$\{index\}"/,'stage buttons are not generated with indexes');
for(const phrase of ['Define the target','Measure reality','Explain the difference','Limit the action','Verify the result','Keep qualified learning']) assert.ok((data+lens).includes(phrase),`missing general-audience stage copy: ${phrase}`);
assert.match(lens,/Click any step to inspect that exact moment/,'stage navigation instruction missing');
assert.match(lens,/It cannot continue to/,'early-stop explanation missing');
assert.match(controller,/button\.setAttribute\('aria-pressed'/,'stage pressed state missing');
assert.match(controller,/prefers-reduced-motion:reduce/,'reduced-motion guard missing');
assert.match(css,/\.scene\.is-scrubbed/,'scrubbed-state styling missing');
for(let index=0;index<6;index++) assert.ok(css.includes(`data-scrub-index="${index}"`),`missing snapshot styling for stage ${index+1}`);
assert.match(css,/data-scrub-terminal="true"/,'terminal snapshot styling missing');
