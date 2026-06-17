const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/MarxC/Desktop/AI训练知识科普';

// Per-file replacement maps: context snippet -> correct character/text
// We match on the surrounding characters to be precise

const fixes = {
  'ch1.html': {
    // Title
    '第一\uFFFD': '第一章',
    // Sidebar
    '\uFFFD返回目录': '← 返回目录',
    '第一\uFFFD': '第一章',  // sidebar h3
    // TOC items
    '神经元与\uFFFD': '神经元与层',
    '激活函\uFFFD': '激活函数',
    '优化\uFFFD': '优化器',
    // Main h1 area
    '\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD': '从零理解神经网络',
    // Loss diagram
    '\uFFFD\uFFFD\uFFFD': '┃',  // box drawing chars
  },
};

// Actually I'll take a more direct approach: read each file, use regex to find
// all U+FFFD characters, and for each one, look at the context to determine the fix.
// 
// The key insight: the U+FFFD appears where a multi-byte UTF-8 character was damaged.
// I'll write a function that, for each file, creates a comprehensive replace map.

function analyzeAndFix(filepath, chapterNum) {
  let text = fs.readFileSync(filepath, 'utf-8');
  const original = text;
  
  // Common contextual fixes that apply to all files
  const globalFixes = [
    // Back link arrow
    [/←/g, '←'], // keep existing ←
  ];
  
  // Title tags - chapter number after "第" and before specific keywords
  text = text.replace(/第\uFFFD从零理解/g, '第一章从零理解');
  text = text.replace(/第二\uFFFDTransformer/g, '第二章Transformer');
  text = text.replace(/第三\uFFFD训练流程/g, '第三章训练流程');
  text = text.replace(/第四\uFFFD分布式/g, '第四章分布式');
  text = text.replace(/第五\uFFFD微调/g, '第五章微调');
  text = text.replace(/第六\uFFFD推理/g, '第六章推理');
  text = text.replace(/第七\uFFFD评估/g, '第七章评估');
  text = text.replace(/第八\uFFFD实战/g, '第八章实战');
  text = text.replace(/训练流程全解\uFFFD/g, '训练流程全解');
  text = text.replace(/分布式训练策\uFFFD/g, '分布式训练策略');
  text = text.replace(/微调与高效训\uFFFD/g, '微调与高效训练');
  text = text.replace(/推理优化/g, '推理优化');
  text = text.replace(/评估与实\uFFFD/g, '评估与实战');
  text = text.replace(/实战决策/g, '实战决策');
  
  // Sidebar back arrows
  text = text.replace(/\uFFFD返回目录/g, '← 返回目录');
  
  // Sidebar h3 titles
  text = text.replace(/>第一\uFFFD<\/h3>/g, '>第一章</h3>');
  text = text.replace(/>第二\uFFFD<\/h3>/g, '>第二章</h3>');
  text = text.replace(/>第三\uFFFD<\/h3>/g, '>第三章</h3>');
  text = text.replace(/>第四\uFFFD<\/h3>/g, '>第四章</h3>');
  text = text.replace(/>第五\uFFFD<\/h3>/g, '>第五章</h3>');
  text = text.replace(/>第六\uFFFD<\/h3>/g, '>第六章</h3>');
  text = text.replace(/>第七\uFFFD<\/h3>/g, '>第七章</h3>');
  text = text.replace(/>第八\uFFFD<\/h3>/g, '>第八章</h3>');
  
  // Main h1 headings - the corrupted Chinese characters
  text = text.replace(/<h1>\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD<span>/g, '<h1>第一章<span>');
  text = text.replace(/<h1>\uFFFD\uFFFD\uFFFD\uFFFD<span>/g, '<h1>第二章<span>');
  text = text.replace(/<h1>第三\uFFFD训练流程/g, '<h1>第三章训练流程');
  text = text.replace(/<h1>\uFFFD\uFFFD\uFFFD\uFFFD<span>/g, '<h1>第四章<span>');
  text = text.replace(/<h1>第五\uFFFD微调/g, '<h1>第五章微调');
  text = text.replace(/<h1>\uFFFD\uFFFD\uFFFD\uFFFD<span>/g, '<h1>第六章<span>');
  text = text.replace(/<h1>第七\uFFFD评估/g, '<h1>第七章评估');
  text = text.replace(/<h1>\uFFFD\uFFFD\uFFFD\uFFFD<span>/g, '<h1>第八章<span>');
  
  return text;
}

// More comprehensive approach: brute force by replacing each U+FFFD based on surrounding context
const fixMap = {
  // ch1
  '第一\uFFFD从零理解': '第一章从零理解',
  '\uFFFD返回目录': '← 返回目录',
  '第一\uFFFD</h3': '第一章</h3',
  '神经元与\uFFFD</a': '神经元与层</a',
  '激活函\uFFFD</a': '激活函数</a',
  '优化\uFFFD</a': '优化器</a',
  
  // h1 title corruption in ch1 - the sequence ������ represents "从零理解神经网络"
  // Each � is a corrupted Chinese char. Let me handle the known pattern.
  '<h1>\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD<span>\uFFFD</span>\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD': 
    '<h1>第一章<span>·</span>从零理解神经网络',
  
  // ch2
  '第二\uFFFDTransformer': '第二章Transformer',
  '第二\uFFFD</h3': '第二章</h3',
  '2.1 \uFFFDRNN \uFFFDTran': '2.1 从RNN到Tran',
  
  // ch3
  '第三\uFFFD训练流程': '第三章训练流程',
  '第三\uFFFD</h3': '第三章</h3',
  '训练三阶\uFFFD': '训练三阶段',
  '预训\uFFFD</a': '预训练</a',
  '学习率调\uFFFD</a': '学习率调度</a',
  'DPO简\uFFFD</a': 'DPO简介</a',
  
  // ch4
  '第四\uFFFD分布式': '第四章分布式',
  '第四\uFFFD</h3': '第四章</h3',
  'ZeRO优化\uFFFD</a': 'ZeRO优化器</a',
  
  // ch5
  '第五\uFFFD微调': '第五章微调',
  '第五\uFFFD</h3': '第五章</h3',
  '总结与对\uFFFD</a': '总结与对比</a',
  '5.1 \uFFFDFull Fine-Tuning \uFFFDLoRA': '5.1 从Full Fine-Tuning到LoRA',
  
  // ch6
  '第六\uFFFD推理': '第六章推理',
  '第六\uFFFD</h3': '第六章</h3',
  '推理的瓶\uFFFD</a': '推理的瓶颈</a',
  
  // ch7
  '第七\uFFFD评估': '第七章评估',
  '第七\uFFFD</h3': '第七章</h3',
  '过拟合与欠拟\uFFFD</a': '过拟合与欠拟合</a',
  
  // ch8
  '第八\uFFFD实战': '第八章实战',
  '第八\uFFFD</h3': '第八章</h3',
  '电脑能训什\uFFFD</a': '电脑能训什么</a',
  '入门路线\uFFFD</a': '入门路线图</a',
};

// Actually let me just use a simple approach: for each file, iterate through all
// U+FFFD characters and figure out the correct replacement based on context.
// Since the correct Chinese characters are all visible when I READ the file (the read
// tool renders them despite the corruption), I can:
// 1. Read the file with fs
// 2. For each U+FFFD, look at the "correct" character from the rendered content
// 3. The file byte content has U+FFFD where the correct char should be

// Even simpler: I already read all files and the rendered output shows what the
// correct text should be. The U+FFFD positions are at known locations.
// Let me just do a comprehensive string replacement for each file.

// Load each file and apply all known fixes
for (let i = 1; i <= 8; i++) {
  const filepath = path.join(dir, `ch${i}.html`);
  let text = fs.readFileSync(filepath, 'utf-8');
  
  // Apply all fixes
  for (const [pattern, replacement] of Object.entries(fixMap)) {
    // The pattern might contain U+FFFD, use string replace
    text = text.split(pattern).join(replacement);
  }
  
  fs.writeFileSync(filepath, text, 'utf-8');
  console.log(`ch${i}.html: applied basic fixes`);
}

// Now count remaining U+FFFD
for (let i = 1; i <= 8; i++) {
  const filepath = path.join(dir, `ch${i}.html`);
  const text = fs.readFileSync(filepath, 'utf-8');
  const matches = text.match(/\uFFFD/g);
  const remaining = matches ? matches.length : 0;
  console.log(`ch${i}.html: ${remaining} U+FFFD remaining`);
}
console.log('\nNow need file-specific fixes for remaining corruptions');
