import fs from 'node:fs';
import assert from 'node:assert/strict';

const app=fs.readFileSync('app.js','utf8');
const css=fs.readFileSync('workpiece.css','utf8');

for(const name of ['renderQualificationLens','playHero','setHeroStage','completeHero']){
  assert.match(app,new RegExp(`function\\s+${name}\\s*\\(`),`missing ${name}`);
}
for(const stage of ['intent','state','cause','bound','prove','memory']){
  assert.ok(app.includes(`data-stage="${stage}"`),`missing ${stage} stage`);
}
for(const outcome of ['qualified','confirm','hold']){
  assert.ok(css.includes(`[data-outcome="${outcome}"]`),`missing ${outcome} outcome styling`);
}
assert.match(app,/playHero\(key,animate\)/,'scenario changes do not replay the hero');
assert.match(app,/data-action=hero-replay/,'hero replay binding missing');
assert.match(app,/prefers-reduced-motion:reduce/,'reduced-motion guard missing');
assert.match(css,/@keyframes\s+measurement-sweep/,'measurement sweep missing');
assert.match(css,/@keyframes\s+memory-travel/,'memory admission motion missing');
