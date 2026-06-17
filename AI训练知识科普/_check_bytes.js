const fs = require('fs');
const file = 'C:/Users/MarxC/Desktop/AI训练知识科普/ch1.html';
const buf = fs.readFileSync(file);
const fffd = Buffer.from([0xEF, 0xBF, 0xBD]);

let pos = 0;
let count = 0;
while ((pos = buf.indexOf(fffd, pos)) !== -1 && count < 20) {
  const before = buf.slice(Math.max(0, pos-6), pos);
  const after = buf.slice(pos, pos + 10);
  const hexBefore = Array.from(before).map(b => b.toString(16).padStart(2,'0')).join(' ');
  const hexAfter = Array.from(after).map(b => b.toString(16).padStart(2,'0')).join(' ');
  console.log(`#${count} @${pos}: [${hexBefore}] [${hexAfter}]`);
  pos++;
  count++;
}
