const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/MarxC/Desktop/AI训练知识科普';

// Strategy: for each file, find all unique corruption contexts and build a fix map
// The corruption is U+FFFD (3 bytes EF BF BD) sometimes followed by ? (0x3F)

function buildFixMap(filepath) {
  const buf = fs.readFileSync(filepath);
  const text = buf.toString('utf-8');
  const fffd = '\uFFFD';
  
  // Collect all unique contexts
  const contexts = new Map(); // context snippet -> count
  
  let idx = 0;
  while ((idx = text.indexOf(fffd, idx)) !== -1) {
    // Get context: 15 chars before and 8 chars after
    const start = Math.max(0, idx - 12);
    const end = Math.min(text.length, idx + 10);
    const ctx = text.slice(start, end);
    const key = ctx.replace(/\uFFFD/g, '◆');
    contexts.set(key, (contexts.get(key) || 0) + 1);
    idx++;
  }
  
  console.log('=== ' + path.basename(filepath) + ' ===');
  console.log('Total unique corruption contexts:', contexts.size);
  const sorted = [...contexts.entries()].sort((a,b) => b[1] - a[1]);
  for (const [ctx, count] of sorted.slice(0, 30)) {
    console.log(`  [x${count}] ${ctx}`);
  }
  return contexts;
}

for (let i = 1; i <= 8; i++) {
  buildFixMap(path.join(dir, `ch${i}.html`));
  console.log();
}
