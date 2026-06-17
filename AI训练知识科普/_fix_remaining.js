const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/MarxC/Desktop/AI训练知识科普';

const FFFD = '\uFFFD';

// ch7 fixes - remaining corruption
function fixCh7() {
  const fp = path.join(dir, 'ch7.html');
  let text = fs.readFileSync(fp, 'utf-8');
  const original = text;
  
  // === Diagram areas: Loss curve ===
  // Fix ASCII diagram box-drawing suffix  _corruptions in the loss curve diagram
  
  // The "在某个任务上模型多困惑" part
  text = text.replace(/模\uFFFD?多困/g, '模型多困惑');
  
  // Fix exclamation marks and arrows that became corrupted
  text = text.replace(/⚠\uFFFD?/g, '⚠️');
  text = text.replace(/─\uFFFD?/g, '─→');
  text = text.replace(/下\uFFFD?─/g, '下降─');
  text = text.replace(/太\uFFFD?/g, '太大');
  text = text.replace(/太\uFFFD?。\/\n/g, '太小。\n');
  
  // Fix diagram content
  text = text.replace(/跑评\uFFFD?/g, '跑评测');
  text = text.replace(/PPL\uFFFD?0/g, 'PPL≈10');
  text = text.replace(/PPL\uFFFD?\n/g, 'PPL≈5\n');
  text = text.replace(/PPL\uFFFD?\n/g, 'PPL≈5\n');
  text = text.replace(/GL\uFFFD?\n/g, 'GL≈5\n');
  text = text.replace(/准确率\uFFFD?-/g, '准确率（-');
  text = text.replace(/级别\uFFFD?<div/g, '级别。</div');
  
  // Fix the Loss diagram
  text = text.replace(/PPL\uFFFD?0/g, 'PPL≈10');
  text = text.replace(/PPL\uFFFD?\(/g, 'PPL≈5（');
  text = text.replace(/模\uFFFD?多困/g, '模型多困惑');
  
  // Fix arrow symbols
  text = text.replace(/─\uFFFD?过/g, '─→过');
  text = text.replace(/─\uFFFD?学/g, '─→学');
  text = text.replace(/─\uFFFD?验/g, '─→验');
  text = text.replace(/─\uFFFD?训/g, '─→训');
  
  // Fix "泄�?" → "泄漏"
  text = text.replace(/泄\uFFFD?/g, '泄漏');
  
  // Fix "降�?LoRA" → "降低 LoRA"
  text = text.replace(/降\uFFFD?LoRA/g, '降低 LoRA');
  
  // Fix "混�?5-20%" → "混入 5-20%"
  text = text.replace(/混\uFFFD?5-/g, '混入 5-');
  
  // Fix "最后可靠�?LLM" → "最可靠的 LLM"
  text = text.replace(/可靠\uFFFD?LLM/g, '可靠的 LLM');
  
  // Fix code comments
  text = text.replace(/保\uFFFD?checkpoint/g, '保存 checkpoint');
  text = text.replace(/记录一\uFFFD?/g, '记录一次');
  text = text.replace(/跑评\uFFFD?/g, '跑评测');
  text = text.replace(/跑验\uFFFD?/g, '跑验证');
  
  // Fix 步 record
  text = text.replace(/步记录一\uFFFD?/g, '步记录一次');
  text = text.replace(/步保\uFFFD?checkpoint/g, '步保存 checkpoint');
  text = text.replace(/步跑验证/g, '步跑验证');
  
  // Fix 验证 section
  text = text.replace(/只保留验\uFFFD?loss/g, '只保留验证 loss');
  text = text.replace(/最后好的。模型/g, '最好的模型');
  
  // Fix list items
  text = text.replace(/最后一个\text/g, '最后一个text');
  
  // Fix Python code comment
  text = text.replace(/# \uFFFD?MMLU/g, '# 跑 MMLU');
  text = text.replace(/# \uFFFD?GSM8K/g, '# 跑 GSM8K');
  
  // Fix "得\uFFFD?\n" → "得分\n"
  text = text.replace(/得\uFFFD?\n/g, '得分\n');
  
  // Fix "降\uFFFD?LoRA rank" → "降低 LoRA rank"
  text = text.replace(/降\uFFFD?LoRA/g, '降低 LoRA');
  
  // Fix card text
  text = text.replace(/极客的。最后小可行评估流\uFFFD?\n/g, '极客的最小可行评估流程\n');
  
  // Fix "跑通一\uFFFD?" → "跑通一个"
  text = text.replace(/跑通一\uFFFD?/g, '跑通一个');
  
  // Fix "做一\uFFFD?QLoRA" → "做一个 QLoRA"
  text = text.replace(/做一\uFFFD?QLoRA/g, '做一个 QLoRA');
  
  // Fix "对比一\uFFFD?" → "对比一个"
  text = text.replace(/对比一\uFFFD?/g, '对比一个');
  
  // Fix W&B code
  text = text.replace(/记录\uFFFD?W&B/g, '记录到 W&B');
  text = text.replace(/名结\uFFFD?/g, '命名');
  
  // Fix the code block quotes in HTML
  text = text.replace(/'trunc/g, 'trunc');
  
  // Various one-off fixes
  text = text.replace(/化能力（更关键\uFFFD?\n/g, '化能力（更关键）\n');
  text = text.replace(/证明\uFFFD?\n/g, '证明\n');
  text = text.replace(/过拟合了\uFFFD?\n/g, '过拟合了\n');
  text = text.replace(/标准化的。测试集/g, '标准化的测试集');
  
  // Loss diagram corruption - the diagram has various corrupted characters
  // "3.5。" → "3.5\n"
  text = text.replace(/3\uFFFD?5\uFFFD?/g, '3.5%');
  text = text.replace(/3\uFFFD?0/g, '3.0');
  text = text.replace(/2\uFFFD?5/g, '2.5');
  text = text.replace(/2\uFFFD?0/g, '2.0');
  text = text.replace(/1\uFFFD?5/g, '1.5');
  text = text.replace(/1\uFFFD?0/g, '1.0');
  text = text.replace(/0\uFFFD?5/g, '0.5');
  
  // Fix diagram colons
  text = text.replace(/\uFFFD?⚠/g, '  ⚠');
  text = text.replace(/\uFFFD?训/g, '  训');
  text = text.replace(/\uFFFD?验/g, '  验');
  text = text.replace(/\uFFFD?学/g, '  学');
  text = text.replace(/\uFFFD?过/g, '  过');
  text = text.replace(/\uFFFD?-\n/g, '\n');
  
  // Fix formula PPL
  text = text.replace(/PPL\uFFFD?0/g, 'PPL≈10');
  text = text.replace(/PPL\uFFFD?\n/g, 'PPL≈5\n');
  
  // Fix the diagram text area  
  text = text.replace(/Loss\n   \uFFFD?  3/g, 'Loss\n    3');
  text = text.replace(/\uFFFD?\n  第一步/g, '\n  第一步');
  
  // Generic fix for diagram corruptions
  text = text.replace(/\uFFFD?训/g, '训练');
  text = text.replace(/\uFFFD?好/g, '好');
  
  // Fix remaining "Loss＝" pattern corruption
  text = text.replace(/\uFFFD?[\)]\n/g, '）。\n');
  
  if (text !== original) {
    fs.writeFileSync(fp, text, 'utf-8');
  }
  const remaining = (text.match(/\uFFFD/g) || []).length;
  console.log('ch7.html: ' + remaining + ' remaining');
}

// ch8 fixes - remaining corruption
function fixCh8() {
  const fp = path.join(dir, 'ch8.html');
  let text = fs.readFileSync(fp, 'utf-8');
  const original = text;
  
  // === Decision tree diagram ===
  // The main diagram with box-drawing characters
  // Replace entire known corrupted diagram chunks
  
  // Fix "r\uFFFD?6" → "r=16"
  text = text.replace(/r\uFFFD?6/g, 'r=16');
  
  // Fix "r\uFFFD?=32-64" → "r=32-64"
  text = text.replace(/r\uFFFD?/g, 'r=');
  
  // Fix the decision tree bullet icons
  text = text.replace(/¥\uFFFD?/g, '≈¥');
  
  // Fix card text
  text = text.replace(/半张卡的\uFFFD?= 一/g, '半张卡的钱 = 一');
  text = text.replace(/¥144\uFFFD?卡 A100/g, '¥144/卡 A100');
  
  // Fix 费用
  text = text.replace(/云GPU 费用/g, '云 GPU 费用');
  text = text.replace(/（A100-80G\uFFFD?/g, '（A100-80G）');
  
  // Fix 时间
  text = text.replace(/时间\uFFFD?70B/g, '时间。70B');
  
  // Fix 方案 headers
  text = text.replace(/方案 A：极简起步（\uFFFD?¥-2000/g, '方案 A：极简起步（≈¥2000');
  text = text.replace(/方案 D：进阶工作站（\uFFFD?0000/g, '方案 D：进阶工作站（≈¥50000');
  text = text.replace(/（\uFFFD?-2/g, '（¥1-2');
  
  // Fix 收集
  text = text.replace(/收集 500-1000 条数\uFFFD?/g, '收集 500-1000 条数据');
  
  // Fix 格式
  text = text.replace(/格式\uFFFD?化/g, '格式化');
  
  // Fix 微调
  text = text.replace(/第一次微\uFFFD?/g, '第一次微调');
  text = text.replace(/QLoRA 微调\uFFFD?B/g, 'QLoRA 微调 7B');
  text = text.replace(/自己做一\uFFFD?/g, '自己做一个');
  
  // Fix 路径
  text = text.replace(/入门路径线\uFFFD?/g, '入门路径线');
  
  // Fix 环境搭建
  text = text.replace(/搭建\n  ├─ \uFFFD?Conda/g, '搭建\n  ├─ 装 Conda');
  
  // Fix "跑一\uFFFD?7B" → "跑一个 7B"
  text = text.replace(/跑一\uFFFD?7B/g, '跑一个 7B');
  
  // Fix "跑通一\uFFFD?LLaMA-Factory"
  text = text.replace(/跑通一\uFFFD?LLaMA-Factory/g, '跑通一个 LLaMA-Factory');
  
  // Fix "找一个公开数据\uFFFD?"
  text = text.replace(/找一个公开数据\uFFFD?/g, '找一个公开数据集');
  
  // Fix "找\uFFFD?" patterns
  text = text.replace(/找\uFFFD?/g, '找');
  
  // Fix diagram area box-drawing corner corruption
  text = text.replace(/选择\uFFFD?/g, '选择');
  text = text.replace(/数据\uFFFD?\n/g, '数据\n');
  text = text.replace(/自行\uFFFD?/g, '自行');
  text = text.replace(/格式\uFFFD?/g, '格式');
  text = text.replace(/效果\uFFFD?/g, '效果');
  text = text.replace(/成本\uFFFD?/g, '成本');
  
  // Fix 树 diagram
  text = text.replace(/  树\n       \uFFFD?  ┌/g, '  树\n       ├ ┌');
  
  // Fix bullet icons in diagram  
  text = text.replace(/\uFFFD?├/g, ' ├');
  text = text.replace(/\uFFFD?└/g, ' └');
  
  // Fix the recommendation header
  text = text.replace(/来自星云伙伴的。叮\uFFFD?\n/g, '来自星云伙伴的叮咛\n');
  
  // Fix 数据 header
  text = text.replace(/数据的。质量永远高于数\uFFFD?\n/g, '数据的质量永远高于数量\n');
  
  // Fix "⏺" (bullet point) corruption
  text = text.replace(/\uFFFD?M51/g, '→ M51');
  
  // Fix the final stargaze
  text = text.replace(/🧠 \uFFFD?M51/g, '🧠 → M51');
  
  // Fix "10000 条自动爬取的。数据"
  text = text.replace(/自动爬取的。数据/g, '自动爬取的数据');
  
  // Fix card pricing
  text = text.replace(/QLoRA\uFFFD?3B/g, 'QLoRA 13B');
  
  // Fix "LoRA 70B\uFFFD?3B" → "LoRA 70B / 13B"
  text = text.replace(/70B QLoRA\uFFFD?3B/g, '70B QLoRA / 13B');
  text = text.replace(/70B LoRA\uFFFD?4B/g, '70B LoRA / 34B');
  
  // Fix "7B-13B\n  └──\n     \uFFFD?多卡"
  text = text.replace(/\uFFFD?多卡/g, '  多卡');
  
  // Fix 排
  text = text.replace(/排\uFFFD?\n/g, '排查\n');
  
  // Fix bits/label in table
  text = text.replace(/参数数\/th/g, '参数/th');
  
  // Fix diagram area - remaining box-draw corruptions
  text = text.replace(/训练。000 条/g, '训练 1000 条');
  
  // Fix "自有 Pipeline"
  text = text.replace(/自己的。Pipeline/g, '自己的 Pipeline');
  text = text.replace(/自己\uFFFD?Pipeline/g, '自己的 Pipeline');
  
  // Fix the 成本 table
  text = text.replace(/¥144\uFFFD?卡/g, '¥144/卡');
  
  // Fix the hardware advice 
  text = text.replace(/q4_K_M \uFFFD?7B/g, 'q4_K_M 跑 7B');
  
  // Fix the learning path diagram
  text = text.replace(/Week 1: 🏗 环境搭建\n  ├─ \uFFFD?Conda/g, 'Week 1: 🏗 环境搭建\n  ├─ 装 Conda');
  
  // Fix table row content
  text = text.replace(/首\uFFFD?🏆/g, '首选 🏆');
  text = text.replace(/本地微调的。首/g, '本地微调的首');
  
  // Fix diagram bullet
  text = text.replace(/训练（\uFFFD?参数、/g, '训练（参数、');
  
  // Generic trailing dot fix
  text = text.replace(/最后重要的。——动\uFFFD?/g, '最重要的。——动手');
  
  // Fix the final line
  text = text.replace(/原的。模型训练之路径顺利/g, '模型的训练之路顺利');
  text = text.replace(/愿你的。模型/g, '愿你的模型');
  text = text.replace(/更重要的。是打开终端/g, '重要的是打开终端');
  text = text.replace(/最后重要的。——动/g, '最重要的。——动');
  
  if (text !== original) {
    fs.writeFileSync(fp, text, 'utf-8');
  }
  const remaining = (text.match(/\uFFFD/g) || []).length;
  console.log('ch8.html: ' + remaining + ' remaining');
}

fixCh7();
fixCh8();
