import fs from 'node:fs';
import assert from 'node:assert/strict';

const app=fs.readFileSync('app.js','utf8');
const css=fs.readFileSync('workpiece.css','utf8');

assert.match(app,/function\s+playHero\s*\(/,'hero animation controller is missing');
assert.match(app,/playHero\(\)/,'hero animation is not started during initialization');
assert.match(app,/scene\.classList\.add\('run'\)/,'hero run class is never applied');
assert.match(app,/prefers-reduced-motion:reduce/,'reduced-motion guard is missing');

for(const selector of [
  '.scene.run .part-shell',
  '.scene.run .boundary',
  '.scene.run .residual',
  '.scene.run .correction',
  '.scene.run .seal'
]){
  assert.ok(css.includes(selector),`missing animation stage: ${selector}`);
}

assert.match(css,/\.scene\.motion-pending/,'pre-animation state is missing');
assert.match(css,/@keyframes\s+scan/,'residual scan keyframes are missing');
assert.match(css,/@keyframes\s+seal-lock/,'qualification lock keyframes are missing');
