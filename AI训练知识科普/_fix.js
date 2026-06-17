const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/MarxC/Desktop/AI训练知识科普';

for (let i = 1; i <= 8; i++) {
  const file = path.join(dir, 'ch' + i + '.html');
  const buf = fs.readFileSync(file);
  const text = buf.toString('utf-8');
  const matches = text.match(/\uFFFD/g);
  const total = matches ? matches.length : 0;
  console.log('ch' + i + '.html: total U+FFFD=' + total);
  
  let idx = 0;
  let count = 0;
  while ((idx = text.indexOf('\uFFFD', idx)) !== -1 && count < 20) {
    const start = Math.max(0, idx - 30);
    const end = Math.min(text.length, idx + 15);
    let ctx = text.slice(start, end).replace(/\n/g, '\\n').replace(/\r/g, '');
    console.log('  [' + count + '] pos=' + idx + ' ctx="' + ctx + '"');
    idx++;
    count++;
  }
}
