const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/MarxC/Desktop/AI训练知识科普';

// Build a comprehensive replacement map by analyzing the corrupted text
// against what we know the correct text should be.

// First, let's extract ALL corruption contexts from ALL files
// and build a unified fix map

const FIX_MAP = {};

// Manual fixes based on content analysis
const manualFixes = {
  // Chapter numbers in titles and headings
  '\uFFFD?': '章',
};

// For each file, build specific fixes
const fileFixes = {
  'ch1.html': [
    // Title
    ['第一\uFFFD?从零理解神经网络', '第一章从零理解神经网络'],
    // TOC sidebar
    ['第一\uFFFD?</h3>', '第一章</h3>'],
    ['神经元与\uFFFD?</a>', '神经元与层</a>'],
    ['激活函\uFFFD?</a>', '激活函数</a>'],
    ['优化\uFFFD?</a>', '优化器</a>'],
    // h1
    ['\uFFFD?返回目录', '←返回目录'],
    ['第一\uFFFD?<span>\uFFFD?</span>', '第一章<span>·</span>'],
    // Body
    ['一\uFFFD?神经', '一层神经'],
    ['形\uFFFD?深度', '形成深度'],
    ['堆叠成"\uFFFD?"', '堆叠成"层"'],
    ['非线\uFFFD?', '非线性'],
    ['偏\uFFFD?', '偏置'],
    ['偏移\uFFFD?', '偏移量'],
    ['容\uFFFD?', '容量'],
    ['梯\uFFFD?', '梯度'],
    ['损\uFFFD?', '损失'],
    ['优\uFFFD?', '优化'],
    ['流\uFFFD?', '流程'],
    ['消\uFFFD?', '消失'],
    ['概\uFFFD?', '概率'],
    ['迭\uFFFD?', '迭代'],
    ['参\uFFFD?', '参数'],
    ['函\uFFFD?', '函数'],
    ['激\uFFFD?', '激活'],
    ['算\uFFFD?', '算法'],
    ['动\uFFFD?', '动量'],
    ['公\uFFFD?', '公式'],
    ['线\uFFFD?', '线性'],
    ['全连\uFFFD?', '全连接'],
    ['即\uFFFD?等于', '即等于'],
    ['深\uFFFD?"', '深度"'],
    ['层\uFFFD? ', '层。 '],
    ['真\uFFFD?', '真。'],
    ['好\uFFFD?', '好。'],
    ['稳\uFFFD?', '稳。'],
    ['感\uFFFD?', '感。'],
    ['强\uFFFD?', '强。'],
    ['差\uFFFD?', '差。'],
    ['用\uFFFD?', '用。'],
    ['费\uFFFD?', '费。'],
    ['够\uFFFD?', '够。'],
    ['练\uFFFD?', '练。'],
    ['化\uFFFD?', '化。'],
    ['\uFFFD?容量', '⏺容量'],
    ['\uFFFD?自动', '⏺自动'],
    ['\uFFFD?理论上', '⏺理论上'],
    ['\uFFFD?收敛慢', '⏺收敛慢'],
    ['\uFFFD?在鞍', '⏺在鞍'],
    ['\uFFFD?需要', '⏺需要'],
    // Diagram box-drawing chars with corruption
    ['─\uFFFD?  ', '─┃  '],
    [' x\uFFFD?─', ' x₁─'],
    ['x\uFFFD?─', 'x₁─'],
    ['x\uFFFD?。c', 'x。c'],
  ],
  
  'ch2.html': [
    ['第二\uFFFD?Transfor', '第二章Transfor'],
    ['第二\uFFFD?</h3>', '第二章</h3>'],
    ['\uFFFD?返回目录', '←返回目录'],
    ['\uFFFD?RNN', '从RNN'],
    ['RNN \uFFFD?Tran', 'RNN到Tran'],
  ],
  
  'ch3.html': [
    ['第三\uFFFD?训练流程全解\uFFFD?', '第三章训练流程全解'],
    ['第三\uFFFD?</h3>', '第三章</h3>'],
    ['\uFFFD?返回目录', '←返回目录'],
    ['预训\uFFFD?', '预训练'],
    ['调\uFFFD?', '调度'],
    ['简\uFFFD?', '简介'],
  ],
  
  'ch5.html': [
    ['第五\uFFFD?微调与高效训\uFFFD?', '第五章微调与高效训练'],
    ['第五\uFFFD?</h3>', '第五章</h3>'],
    ['\uFFFD?返回目录', '←返回目录'],
  ],
  
  'ch7.html': [
    ['第七\uFFFD?评估与实\uFFFD?', '第七章评估与实战'],
    ['第七\uFFFD?</h3>', '第七章</h3>'],
    ['\uFFFD?返回目录', '←返回目录'],
    ['欠拟\uFFFD?', '欠拟合'],
  ],
};

// Now apply ALL fixes
for (let i = 1; i <= 8; i++) {
  const fn = `ch${i}.html`;
  const filepath = path.join(dir, fn);
  let text = fs.readFileSync(filepath, 'utf-8');
  const original = text;
  const fixes = fileFixes[fn] || [];
  
  for (const [from, to] of fixes) {
    text = text.split(from).join(to);
  }
  
  // Also try some generic patterns
  // Fix common Chinese sentence-ending chars that got corrupted
  text = text.replace(/([\u4e00-\u9fff])\uFFFD\?/g, (match, before) => {
    // Typical Chinese characters that often appear before periods
    const periodChars = ['层','好','稳','感','强','差','用','够','练','化','费','式','真'];
    if (periodChars.includes(before)) return before + '。';
    return match;
  });
  
  if (text !== original) {
    fs.writeFileSync(filepath, text, 'utf-8');
  }
  
  const remaining = (text.match(/\uFFFD/g) || []).length;
  console.log(`${fn}: ${remaining} remaining`);
}
