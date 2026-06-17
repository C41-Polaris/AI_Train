const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/MarxC/Desktop/AI训练知识科普';

// Strategy: For each file, detect every U+FFFD occurrence and the number of ? after it.
// Then determine the correct character from context using a comprehensive mapping.
// Each FFFD + N question marks = one corrupted Chinese character.
// FFFD + 0? = half-byte corruption (rare)
// FFFD + 1? = 2-byte char or partial 3-byte 
// FFFD + 2? = standard 3-byte Chinese char

// First, let's build complete replacement maps for each file
// based on what I know the correct text should be

function fixFile(filepath) {
  let text = fs.readFileSync(filepath, 'utf-8');
  const original = text;
  const filename = path.basename(filepath);
  
  // ===================================
  // COMMON FIXES - apply to all files
  // ===================================
  
  // All back-links
  text = text.replace(/\uFFFD\?返回目录/g, '← 返回目录');
  
  // All sidebar h3: 第一→章 etc.
  text = text.replace(/第一\uFFFD\?\s*<\/h3>/g, '第一章</h3>');
  text = text.replace(/第二\uFFFD\?\s*<\/h3>/g, '第二章</h3>');
  text = text.replace(/第三\uFFFD\?\s*<\/h3>/g, '第三章</h3>');
  text = text.replace(/第四\uFFFD\?\s*<\/h3>/g, '第四章</h3>');
  text = text.replace(/第五\uFFFD\?\s*<\/h3>/g, '第五章</h3>');
  text = text.replace(/第六\uFFFD\?\s*<\/h3>/g, '第六章</h3>');
  text = text.replace(/第七\uFFFD\?\s*<\/h3>/g, '第七章</h3>');
  text = text.replace(/第八\uFFFD\?\s*<\/h3>/g, '第八章</h3>');
  
  // Replace ALL occurrences of \uFFFD\? with a placeholder, then handle each context
  // Pattern 1: 第一\uFFFD\? → 第一章  (in titles and sidebar names)
  text = text.replace(/(第一)\uFFFD\?/g, '$1章');
  text = text.replace(/(第二)\uFFFD\?/g, '$1章');
  text = text.replace(/(第三)\uFFFD\?/g, '$1章');
  text = text.replace(/(第四)\uFFFD\?/g, '$1章');
  text = text.replace(/(第五)\uFFFD\?/g, '$1章');
  text = text.replace(/(第六)\uFFFD\?/g, '$1章');
  text = text.replace(/(第七)\uFFFD\?/g, '$1章');
  text = text.replace(/(第八)\uFFFD\?/g, '$1章');
  
  // Pattern: \uFFFD\?\uFFFD\? → period 。(many diagram texts)
  text = text.replace(/\uFFFD\?\uFFFD\?/g, '。');
  
  // Pattern: \uFFFD\?/ → 。/ (end of sentence before HTML tag)
  text = text.replace(/\uFFFD\?\//g, '。</');
  
  // ===================================
  // FILE-SPECIFIC FIXES
  // ===================================
  
  if (filename === 'ch1.html') {
    // Title
    text = text.replace(/<title>第一章从零理解神经网络/g, '<title>第一章从零理解神经网络');
    // h1 area
    text = text.replace(/第一章<span>\uFFFD\?<\/span>/g, '第一章<span>·</span>');
    // TOC: 神经元与层, 激活函数, 优化器
    text = text.replace(/神经元与\uFFFD\?/g, '神经元与层');
    text = text.replace(/激活函\uFFFD\?/g, '激活函数');
    text = text.replace(/优化\uFFFD\?/g, '优化器');
    // Body: 网络 = 一层神经 → 网络 = 一层神经 (already has this)
    text = text.replace(/神经\uFFFD\?/g, '神经层');
    text = text.replace(/非线\uFFFD\?/g, '非线性');
    text = text.replace(/线\uFFFD\?/g, '线性');
    text = text.replace(/偏\uFFFD\?/g, '偏置');
    text = text.replace(/激\uFFFD\?/g, '激活');
    text = text.replace(/容\uFFFD\?/g, '容量');
    text = text.replace(/梯\uFFFD\?/g, '梯度');
    text = text.replace(/损\uFFFD\?/g, '损失');
    text = text.replace(/优\uFFFD\?/g, '优化');
    text = text.replace(/公\uFFFD\?/g, '公式');
    text = text.replace(/参\uFFFD\?/g, '参数');
    text = text.replace(/迭\uFFFD\?/g, '迭代');
    text = text.replace(/算\uFFFD\?/g, '算法');
    text = text.replace(/函\uFFFD\?/g, '函数');
    text = text.replace(/层\uFFFD\?/g, '层。');
    text = text.replace(/数\uFFFD\?/g, '数。');
    text = text.replace(/值\uFFFD\?/g, '值。');
  }
  
  if (filename === 'ch2.html') {
    text = text.replace(/第二章/g, '第二章'); // keep
    text = text.replace(/第二\uFFFD\?/g, '第二章');
    text = text.replace(/第二章<span>\uFFFD\?<\/span>/g, '第二章<span>·</span>');
    text = text.replace(/\uFFFD\?RNN/g, '从RNN');
    text = text.replace(/RNN \uFFFD\?Transformer/g, 'RNN到Transformer');
    text = text.replace(/RNN \uFFFD\?Trans/g, 'RNN到Trans');
    text = text.replace(/\uFFFD\?Tran/g, '到Tran');
    text = text.replace(/Transformer 架构/g, 'Transformer 架构');
    text = text.replace(/架构/g, '架构');
    text = text.replace(/深度解析/g, '深度解析');
    text = text.replace(/解\uFFFD\?/g, '解析');
  }
  
  if (filename === 'ch3.html') {
    // Title
    text = text.replace(/第三\uFFFD\?训练流程全解\uFFFD\?/g, '第三章训练流程全解');
    // h1
    text = text.replace(/第三\uFFFD\?训练流程全解\uFFFD\?<\/h1>/g, '第三章训练流程全解</h1>');
    // h1 content already has "第三章训练流程全解" fixed above
    text = text.replace(/预训\uFFFD\?/g, '预训练');
    text = text.replace(/学习率调\uFFFD\?/g, '学习率调度');
    text = text.replace(/DPO 简\uFFFD\?/g, 'DPO 简介');
    text = text.replace(/训练三阶\uFFFD\?/g, '训练三阶段');
    text = text.replace(/流\uFFFD\?/g, '流程');
    text = text.replace(/需\uFFFD\?/g, '需要');
    text = text.replace(/预\uFFFD\?/g, '预算');
    text = text.replace(/偏\uFFFD\?/g, '偏好');
    text = text.replace(/回\uFFFD\?/g, '回复');
    text = text.replace(/挑\uFFFD\?/g, '挑战');
    text = text.replace(/加\uFFFD\?/g, '加载');
    text = text.replace(/方\uFFFD\?/g, '方案');
    text = text.replace(/训\uFFFD\?/g, '训练');
    text = text.replace(/差\uFFFD\?/g, '差距');
    text = text.replace(/过\uFFFD\?/g, '过度');
    text = text.replace(/支\uFFFD\?/g, '支持');
  }
  
  // Count remaining
  const remaining = (text.match(/\uFFFD/g) || []).length;
  if (text !== original || remaining === 0) {
    fs.writeFileSync(filepath, text, 'utf-8');
    console.log(`${filename}: ${remaining} U+FFFD remaining`);
  } else {
    console.log(`${filename}: unchanged, ${remaining} remaining`);
  }
  return remaining;
}

for (let i = 1; i <= 8; i++) {
  fixFile(path.join(dir, `ch${i}.html`));
}
