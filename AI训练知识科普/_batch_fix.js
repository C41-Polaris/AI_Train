const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/MarxC/Desktop/AI训练知识科普';

const CHAPTERS = {
  ch1: { num: '一', title: '从零理解神经网络' },
  ch2: { num: '二', title: 'Transformer 架构深度解析' },
  ch3: { num: '三', title: '训练流程全解析' },
  ch4: { num: '四', title: '分布式训练策略' },
  ch5: { num: '五', title: '微调与高效训练' },
  ch6: { num: '六', title: '推理优化' },
  ch7: { num: '七', title: '评估与实战' },
  ch8: { num: '八', title: '实战决策框架' },
};

const FFFD = '\uFFFD';
const FFFDQ = '\uFFFD?';

// For each file, build a comprehensive set of known fixes
// based on what the correct text should be

function fixFile(num) {
  const key = `ch${num}`;
  const info = CHAPTERS[key];
  const filepath = path.join(dir, `${key}.html`);
  let text = fs.readFileSync(filepath, 'utf-8');
  const original = text;
  
  const fixes = [];
  
  // =============== TITLE ===============
  fixes.push([`<title>第${info.num}${FFFDQ}${info.title.replace(/ /g,' ').substring(0,8)}`, 
               `<title>第${info.num}章${info.title}`]);
  
  // =============== SIDEBAR H3 ===============
  fixes.push([`第${info.num}${FFFDQ}</h3>`, `第${info.num}章</h3>`]);
  
  // =============== BACK LINK ===============
  fixes.push([`${FFFDQ}返回目录`, '← 返回目录']);
  
  // =============== MAIN H1 ===============
  // Replace the entire h1 line
  // Find the corrupted h1 and replace it
  const h1Regex = /<h1>[\s\S]*?<\/h1>/;
  const h1Match = text.match(h1Regex);
  if (h1Match) {
    // The h1 should be: <h1>第X章<span>·</span>Title</h1>
    const correctH1 = `<h1>第${info.num}章<span>·</span>${info.title}</h1>`;
    // Use replacement only if the match contains corruption
    if (h1Match[0].includes(FFFD)) {
      fixes.push([h1Match[0], correctH1]);
    }
  }
  
  // =============== CH1 SPECIFIC BODY FIXES ===============
  if (num === 1) {
    // TOC items
    fixes.push([`神经元与${FFFDQ}</a>`, '神经元与层</a>']);
    fixes.push([`激活函${FFFDQ}</a>`, '激活函数</a>']);
    fixes.push([`优化${FFFDQ}</a>`, '优化器</a>']);
    
    // Body text fix - find each corruption context and fix it
    // Pattern: Chinese char + FFFD? → Chinese char + 。(period)
    const bodyFixes = {
      '一': '层', '形': '成', '堆叠成"': '层', 
      '偏': '置', '容': '量', '梯': '度', 
      '损': '失', '优': '化', '非线': '性',
      '激': '活', '函': '数', '参': '数',
      '迭': '代', '流': '程', '消': '失',
      '概': '率', '预': '测', '公': '式',
      '动': '量', '全连': '接',
      // At end of sentence
      '层': '。', '好': '。', '稳': '。',
      '感': '。', '强': '。', '差': '。',
      '用': '。', '费': '。', '够': '。',
      '练': '。', '化': '。', '真': '。',
      '式': '。', '力': '。',
    };
    
    // Try to match each corruption context - search in text
    for (const [before, replace] of Object.entries(bodyFixes)) {
      const pattern = before + FFFDQ;
      if (text.includes(pattern)) {
        fixes.push([pattern, before + replace]);
      }
    }
    
    // Handle specific patterns for box-drawing / diagram corruptions
    // x₁, x₂, x₃, w₁, w₂, w₃ patterns
    const diagramFixes = [
      ['w₁·x₁', 'w₁·x₁'],
      ['w₂·x₂', 'w₂·x₂'],
      ['w₃·x₃', 'w₃·x₃'],
    ];
    // Corrupted subscripts in diagrams
    for (let j = 1; j <= 3; j++) {
      const pat1 = `x${FFFDQ}─`;
      const pat2 = `x${FFFDQ}。`;
      const pat3 = `w${FFFDQ}。`;
      if (text.includes(pat1)) fixes.push([pat1, `x${j}─`]);
      if (text.includes(pat2)) fixes.push([pat2, `x${j}。`]);
      if (text.includes(pat3)) fixes.push([pat3, `w${j}。`]);
    }
  }
  
  // =============== CH2 SPECIFIC ===============
  if (num === 2) {
    fixes.push([`${FFFDQ}RNN`, '从RNN']);
    fixes.push([`RNN ${FFFDQ}Trans`, 'RNN到Trans']);
    fixes.push([`RNN ${FFFDQ}Tran`, 'RNN到Tran']);
  }
  
  // =============== CH3 SPECIFIC ===============
  if (num === 3) {
    fixes.push([`预训${FFFDQ}`, '预训练']);
    fixes.push([`调${FFFDQ}`, '调度']);
    fixes.push([`简${FFFDQ}`, '简介']);
    fixes.push([`阶${FFFDQ}`, '阶段']);
    fixes.push([`本${FFFDQ}`, '预算']);
    fixes.push([`偏${FFFDQ}`, '偏好']);
    fixes.push([`回${FFFDQ}`, '回复']);
    fixes.push([`挑${FFFDQ}`, '挑战']);
    fixes.push([`加${FFFDQ}`, '加载']);
    fixes.push([`方${FFFDQ}`, '方案']);
    fixes.push([`训${FFFDQ}`, '训练']);
    fixes.push([`差${FFFDQ}`, '差距']);
    fixes.push([`过${FFFDQ}`, '过度']);
    fixes.push([`支${FFFDQ}`, '支持']);
    fixes.push([`过${FFFDQ}`, '过度']);
    // Diagram
    fixes.push(['预\uFFFD\?(Pretrain', '预训练(Pretrain']);
  }
  
  // =============== CH4 SPECIFIC ===============
  if (num === 4) {
    fixes.push([`优化${FFFDQ}`, '优化器']);
  }
  
  // =============== CH5 SPECIFIC ===============
  if (num === 5) {
    fixes.push([`需${FFFDQ}`, '需要']);
    fixes.push([`参${FFFDQ}`, '参数']);
    fixes.push([`梯${FFFDQ}`, '梯度']);
    fixes.push([`设${FFFDQ}`, '设置']);
    fixes.push([`开${FFFDQ}`, '开销']);
    fixes.push([`投${FFFDQ}`, '投影']);
    fixes.push([`压${FFFDQ}`, '压缩']);
  }
  
  // =============== CH7 SPECIFIC ===============
  if (num === 7) {
    fixes.push([`欠拟${FFFDQ}`, '欠拟合']);
  }
  
  // =============== CH8 SPECIFIC ===============
  if (num === 8) {
    fixes.push([`什${FFFDQ}`, '什么']);
    fixes.push([`路${FFFDQ}`, '路线']);
    fixes.push([`选${FFFDQ}`, '选择']);
  }
  
  // =============== APPLY ALL FIXES ===============
  for (const [from, to] of fixes) {
    text = text.split(from).join(to);
  }
  
  // Apply common pattern fixes for all files
  // A Chinese character followed by U+FFFD? at end of a sentence context
  // can often be fixed as "that char + 。"
  text = text.replace(/([层好稳感强差用费用练化式真力变])\uFFFD\?/g, '$1。');
  
  // Save
  if (text !== original) {
    fs.writeFileSync(filepath, text, 'utf-8');
  }
  
  const remaining = (text.match(/\uFFFD/g) || []).length;
  console.log(`ch${num}.html: ${remaining} remaining`);
}

for (let i = 1; i <= 8; i++) fixFile(i);
