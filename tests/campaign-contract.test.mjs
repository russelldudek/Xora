import fs from 'node:fs';import assert from 'node:assert/strict';
const files=['index.html','resume.html','cover-letter.html','interview-brief.html','120-day-plan.html','correction-qualification.html','README.md','campaign-audit.md'];
const all=files.map(f=>fs.readFileSync(f,'utf8')).join('\n');
assert.ok(!/mandate/i.test(all),'rejected terminology remains');
assert.ok(!/roleforge/i.test(all),'private system name exposed');
assert.match(all,/Qualification Lens/,'role-specific artifact missing');
assert.match(fs.readFileSync('app.js','utf8'),/inspect\(requested\)/,'clickable stage navigation missing');
assert.match(fs.readFileSync('index.html','utf8'),/How a machine earns permission to correct itself/,'general-audience context missing');
assert.ok(!/Review the evidence built for this mandate/i.test(all),'redundant closing action remains');
