const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/MarxC/Desktop/AI训练知识科普';

// Read the corrupted bytes at the byte level and rebuild correctly
// The corruption: for each 3-byte Chinese char, bytes 2 and 3 (continuation)
// were corrupted to 0x3F (question marks), and the first byte was corrupted to 
// EF BF BD (U+FFFD replacement).
// 
// Strategy: For most corruptions, the surrounding context is enough to identify
// the correct character. But rather than fix each one individually, let's use
// a simpler approach: extract all corrupted regions, analyze them against known
// correct text, and build a replacement map.

const chapterTitles = {
  1: '从零理解神经网络',
  2: 'Transformer 架构深度解析', 
  3: '训练流程全解析',
  4: '分布式训练策略',
  5: '微调与高效训练',
  6: '推理优化',
  7: '评估与实战',
  8: '实战决策框架'
};

const cnNums = ['一','二','三','四','五','六','七','八'];

// Build a comprehensive fix map by processing file content
function fixFile(num) {
  const filepath = path.join(dir, `ch${num}.html`);
  let text = fs.readFileSync(filepath, 'utf-8');
  const original = text;
  const cnNum = cnNums[num-1];
  const title = chapterTitles[num];
  
  // ==================== TITLE ====================
  text = text.replace(
    `<title>第${cnNum}\uFFFD?${title.split('').slice(0,4).join('')}`,
    `<title>第${cnNum}章${title}`
  );
  // Simpler: just match the title tag pattern
  text = text.replace(/(<title>第[\u4e00-\u9fff])\uFFFD\?/g, '$1章');
  
  // ==================== SIDEBAR H3 ====================
  text = text.replace(/(第[一二三四五六七八])\uFFFD\?(<\/h3>)/g, '$1章$2');
  
  // ==================== BACK LINK ====================
  text = text.replace(/href="index\.html"[^>]*>\uFFFD\?返回目录/g, (m) => m.replace('\uFFFD?', '←'));
  text = text.replace(/class="back-link">\uFFFD\?返回目录/g, (m) => m.replace('\uFFFD?', '←'));
  
  // ==================== MAIN H1 ====================
  // The h1 heading has <h1>...</h1> with corruptions. Replace the whole h1.
  const numStr = cnNum;
  text = text.replace(/<h1>[\s\S]*?<\/h1>/, `<h1>第${numStr}章<span>·</span>${title}</h1>`);
  
  // ==================== TOC LINK TEXT ====================
  // Fix <!-- more specific TOC items -->
  
  // ==================== COMMON CORRUPT CHARACTERS ====================
  // Many corruptions follow a pattern where a Chinese char at end of sentence
  // or in diagram was corrupted to U+FFFD ?
  
  // Ch1 specific body fixes
  if (num === 1) {
    // Fix all \uFFFD? pairs in body text based on context
    // We'll replace \uFFFD? with the correct character in every context
    const fixes = [
      ['一\uFFFD?神经层', '一层神经层'],
      ['堆叠成"\uFFFD?"', '堆叠成"层"'],
      ['形\uFFFD?深度"', '形成深度"'],
      ['一\uFFFD?非线', '一个非线性'],
      ['一\uFFFD?激活', '一个激活'],
      ['一\uFFFD?损失', '一个损失'],
      ['偏\uFFFD?', '偏置'],
      ['偏移\uFFFD?', '偏移量'],
      ['容\uFFFD?', '容量'],
      ['梯\uFFFD?', '梯度'],
      ['损\uFFFD?', '损失'],
      ['优\uFFFD?', '优化'],
      ['叠\uFFFD?', '叠加'],
      ['激\uFFFD?', '激活'],
      ['函\uFFFD?', '函数'],
      ['参\uFFFD?', '参数'],
      ['迭\uFFFD?', '迭代'],
      ['算\uFFFD?', '算法'],
      ['消\uFFFD?\n', '消失\n'],
      ['概\uFFFD?\n', '概率\n'],
      ['动\uFFFD?\n', '动量\n'],
      ['公\uFFFD?', '公式'],
      ['了\uFFFD?', '了。'],
      ['态\uFFFD?', '态。'],
      ['层\uFFFD?', '层。'],
      ['好\uFFFD?', '好。'],
      ['差\uFFFD?', '差。'],
      ['稳\uFFFD?', '稳。'],
      ['感\uFFFD?', '感。'],
      ['强\uFFFD?', '强。'],
      ['用\uFFFD?', '用。'],
      ['难\uFFFD?', '难。'],
      ['真\uFFFD?', '真。'],
      ['调\uFFFD?。\n', '调。\n'],
      ['过\uFFFD?', '过。'],
      ['能\uFFFD?=', '能力 ='],
      ['础\uFFFD?。\n', '础。\n'],
    ];
    for (const [from, to] of fixes) {
      text = text.split(from).join(to);
    }
  }
  
  // Ch3 specific
  if (num === 3) {
    text = text.replace(/预训\uFFFD?/g, '预训练');
    text = text.replace(/调\uFFFD?/g, '调度');
    text = text.replace(/简\uFFFD?/g, '简介');
    text = text.replace(/阶\uFFFD?/g, '阶段');
    text = text.replace(/偏\uFFFD?/g, '偏好');
    text = text.replace(/回\uFFFD?/g, '回复');
    text = text.replace(/过\uFFFD?/g, '过度');
    text = text.replace(/支\uFFFD?/g, '支持');
    text = text.replace(/本\uFFFD?/g, '本。');
    text = text.replace(/算\uFFFD?/g, '预算');
    text = text.replace(/据\uFFFD?/g, '数据');
  }
  
  // Ch5 specific
  if (num === 5) {
    text = text.replace(/需\uFFFD?/g, '需要');
    text = text.replace(/需\uFFFD?/g, '需要');
    text = text.replace(/参\uFFFD?/g, '参数');
    text = text.replace(/梯\uFFFD?/g, '梯度');
    text = text.replace(/设\uFFFD?/g, '设置');
    text = text.replace(/开\uFFFD?/g, '开销');
    text = text.replace(/投\uFFFD?/g, '投影');
    text = text.replace(/压\uFFFD?/g, '压缩');
  }
  
  // Ch7 specific
  if (num === 7) {
    text = text.replace(/欠拟\uFFFD?/g, '欠拟合');
    text = text.replace(/实\uFFFD?/g, '实战');
    text = text.replace(/序\uFFFD?/g, '序列');
  }
  
  // General: fix trailing periods and common patterns
  text = text.replace(/需\uFFFD?/g, '需要');
  text = text.replace(/的\uFFFD?/g, '的。');
  text = text.replace(/式\uFFFD?/g, '式。');
  text = text.replace(/路\uFFFD?/g, '路径');
  text = text.replace(/最\uFFFD?/g, '最后');
  
  // Report
  const remaining = (text.match(/\uFFFD/g) || []).length;
  const changed = text !== original;
  if (changed) fs.writeFileSync(filepath, text, 'utf-8');
  console.log(`ch${num}.html: ${changed ? 'FIXED' : 'unchanged'} [${remaining} remaining]`);
}

for (let i = 1; i <= 8; i++) fixFile(i);
