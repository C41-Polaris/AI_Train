const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/MarxC/Desktop/AI训练知识科普';

// Parse the file and rebuild it by replacing every corruption with the correct character
// The approach: iterate through the string, and for each U+FFFD, determine the correct replacement
// based on what the context should be.

// We'll use fix-per-file approach with known replacement pairs

const ALL_FIXES = new Map();

function fix(from, to) {
  ALL_FIXES.set(from, to);
}

// ============= TITLE FIXES =============
fix('第一\uFFFD?从零理解神经网络', '第一章从零理解神经网络');
fix('第二\uFFFD?Transformer', '第二章Transformer');
fix('第三\uFFFD?训练流程全解\uFFFD?', '第三章训练流程全解');
fix('第四\uFFFD?分布式训练策\uFFFD?', '第四章分布式训练策略');
fix('第五\uFFFD?微调与高效训\uFFFD?', '第五章微调与高效训练');
fix('第六\uFFFD?推理优化', '第六章推理优化');
fix('第七\uFFFD?评估与实\uFFFD?', '第七章评估与实战');
fix('第八\uFFFD?实战决策', '第八章实战决策');

// ============= SIDEBAR =============
fix('第一\uFFFD?</h3>', '第一章</h3>');
fix('第二\uFFFD?</h3>', '第二章</h3>');
fix('第三\uFFFD?</h3>', '第三章</h3>');
fix('第四\uFFFD?</h3>', '第四章</h3>');
fix('第五\uFFFD?</h3>', '第五章</h3>');
fix('第六\uFFFD?</h3>', '第六章</h3>');
fix('第七\uFFFD?</h3>', '第七章</h3>');
fix('第八\uFFFD?</h3>', '第八章</h3>');

// ============= SIDEBAR BACK ARROWS =============
fix('href="index.html" class="back-link">\uFFFD?返回目录', 'href="index.html" class="back-link">← 返回目录');
fix('href="index.html">\uFFFD?返回目录', 'href="index.html">← 返回目录');

// ============= TOC ITEMS =============
fix('神经元与\uFFFD?</a>', '神经元与层</a>');
fix('激活函\uFFFD?</a>', '激活函数</a>');
fix('1.6 优化\uFFFD?</a>', '1.6 优化器</a>');
fix('2.1 \uFFFD?RNN \uFFFD?Transformer</a>', '2.1 从RNN到Transformer</a>');
fix('3.3 预训\uFFFD?</a>', '3.3 预训练</a>');
fix('学习率调\uFFFD?</a>', '学习率调度</a>');
fix('DPO 简\uFFFD?</a>', 'DPO 简介</a>');
fix('4.3 ZeRO 优化\uFFFD?</a>', '4.3 ZeRO 优化器</a>');
fix('6.1 推理的瓶\uFFFD?</a>', '6.1 推理的瓶颈</a>');
fix('7.2 过拟合与欠拟\uFFFD?</a>', '7.2 过拟合与欠拟合</a>');
fix('电脑能训什\uFFFD?</a>', '电脑能训什么</a>');
fix('入门路线\uFFFD?</a>', '入门路线图</a>');

// ============= H1 HEADINGS =============
// The h1 content is the biggest corruption area for some files
// We need to match the exact pattern in the corrupted file

// ch1 h1 area - the sequence of corruptions
fix('第一\uFFFD?<span>\uFFFD?</span>从零理解神经网络', '第一章<span>·</span>从零理解神经网络');

// ch2 h1 - corrupted with many FFFD 
fix('第二\uFFFD?<span>\uFFFD?</span>Transformer', '第二章<span>·</span>Transformer');

// ch3 h1 - mostly intact
fix('第三\uFFFD?训练流程全解\uFFFD?</h1>', '第三章训练流程全解</h1>');

// ch5 h1
fix('第五\uFFFD?微调与高效训\uFFFD?</h1>', '第五章微调与高效训练</h1>');

// ch7 h1
fix('第七\uFFFD?评估与实\uFFFD?</h1>', '第七章评估与实战</h1>');

// ============= BODY TEXT - ch1 =============
fix('神经网络 = 一\uFFFD?神经层', '神经网络 = 一层神经层');
fix('堆叠成"\uFFFD?"', '堆叠成"层"');
fix('形\uFFFD?深度"', '形成深度"');
fix('一\uFFFD?<strong>非线', '一个<strong>非线性');
fix('一\uFFFD?神经', '一个神经');
fix('非线\uFFFD?', '非线性');
fix('偏\uFFFD?', '偏置');
fix('偏移\uFFFD?', '偏移量');
fix('容\uFFFD?', '容量');
fix('梯\uFFFD?', '梯度');
fix('损\uFFFD?', '损失');
fix('优\uFFFD?', '优化');
fix('叠\uFFFD?', '叠加');
fix('激\uFFFD?', '激活');
fix('函\uFFFD?', '函数');
fix('参\uFFFD?', '参数');
fix('迭\uFFFD?', '迭代');
fix('算\uFFFD?', '算法');
fix('层\uFFFD?。</', '层。</');
fix('好\uFFFD?。</', '好。</');
fix('强\uFFFD?。</', '强。</');
fix('稳\uFFFD?。</', '稳。</');
fix('感\uFFFD?。</', '感。</');
fix('费\uFFFD?。</', '费。</');
fix('备\uFFFD?></', '备。</');
fix('深\uFFFD?"。', '深度"。');
fix('概\uFFFD?\n', '概率\n');
fix('消\uFFFD?', '消失');
fix('动\uFFFD?', '动量');
fix('公\uFFFD?', '公式');
fix('层\uFFFD?\n', '层。\n');
fix('层\uFFFD? </div', '层。 </div');
fix('能\uFFFD?=', '能力 =');
fix('为\uFFFD?。</', '为。</');
fix('率\uFFFD?</', '率。</');
fix('预\uFFFD?\n', '预测。\n');
fix('要\uFFFD?。</', '要。</');
fix('好\uFFFD?', '好。');
fix('密\uFFFD?(', '密集(');

// ============= PERFORM AND COUNT =============

const filenames = ['ch1.html','ch2.html','ch3.html','ch4.html','ch5.html','ch6.html','ch7.html','ch8.html'];

for (const fn of filenames) {
  const filepath = path.join(dir, fn);
  let text = fs.readFileSync(filepath, 'utf-8');
  const original = text;
  
  // Apply ALL fixes
  for (const [from, to] of ALL_FIXES) {
    text = text.split(from).join(to);
  }
  
  if (text !== original) {
    fs.writeFileSync(filepath, text, 'utf-8');
    const remaining = (text.match(/\uFFFD/g) || []).length;
    console.log(`${fn}: fixed some, ${remaining} remaining`);
  } else {
    const remaining = (text.match(/\uFFFD/g) || []).length;
    console.log(`${fn}: no change, ${remaining} remaining`);
  }
}
