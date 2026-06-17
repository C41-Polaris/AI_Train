const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/MarxC/Desktop/AI训练知识科普';

for (let i = 1; i <= 8; i++) {
  const filepath = path.join(dir, `ch${i}.html`);
  const text = fs.readFileSync(filepath, 'utf-8');
  const remaining = (text.match(/\uFFFD/g) || []).length;
  if (remaining === 0) continue;
  
  const contexts = new Set();
  let idx = 0;
  while ((idx = text.indexOf('\uFFFD', idx)) !== -1) {
    const start = Math.max(0, idx - 25);
    const end = Math.min(text.length, idx + 20);
    const ctx = text.slice(start, end).replace(/\n/g, '\\n').replace(/\r/g, '');
    contexts.add(ctx);
    idx++;
  }
  
  console.log(`\n=== ch${i}.html (${contexts.size} unique contexts, ${remaining} total) ===`);
  const sorted = [...contexts].sort();
  for (const ctx of sorted) {
    console.log(ctx);
  }
}
