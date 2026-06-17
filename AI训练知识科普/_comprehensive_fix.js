const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/MarxC/Desktop/AI训练知识科普';

const REPLACEMENTS = new Map();

function add(src, dst) {
  REPLACEMENTS.set(src, dst);
}

// ============== TITLE tags ==============
add('<title>第一\uFFFD?从零理解神经网络', '<title>第一章从零理解神经网络');
add('<title>第二\uFFFD?Transformer 架构', '<title>第二章Transformer 架构');
add('<title>第三\uFFFD?训练流程全解\uFFFD?', '<title>第三章训练流程全解');
add('<title>第四\uFFFD?分布式训练策\uFFFD?', '<title>第四章分布式训练策略');
add('<title>第五\uFFFD?微调与高效训\uFFFD?', '<title>第五章微调与高效训练');
add('<title>第六\uFFFD?推理优化', '<title>第六章推理优化');
add('<title>第七\uFFFD?评估与实\uFFFD?', '<title>第七章评估与实战');
add('<title>第八\uFFFD?实战决策', '<title>第八章实战决策');

// ============== Sidebar ==============
add('\uFFFD?返回目录', '← 返回目录');

// Sidebar h3
add('">\n    <h3>第一\uFFFD?</h3>\n  </div>', '">\n    <h3>第一章</h3>\n  </div>');
add('"><h3>第二\uFFFD?</h3></div>', '"><h3>第二章</h3></div>');
add('"><h3>第三\uFFFD?</h3></div>', '"><h3>第三章</h3></div>');
add('"><h3>第四\uFFFD?</h3></div>', '"><h3>第四章</h3></div>');
add('"><h3>第五\uFFFD?</h3></div>', '"><h3>第五章</h3></div>');
add('"><h3>第六\uFFFD?</h3></div>', '"><h3>第六章</h3></div>');
add('"><h3>第七\uFFFD?</h3></div>', '"><h3>第七章</h3></div>');
add('"><h3>第八\uFFFD?</h3></div>', '"><h3>第八章</h3></div>');

// ============== TOC items ==============
add('神经元与\uFFFD?</a>', '神经元与层</a>');
add('激活函\uFFFD?</a>', '激活函数</a>');
add('优化\uFFFD?</a>', '优化器</a>');
add('2.1 \uFFFD?RNN \uFFFD?Transformer</a>', '2.1 从RNN到Transformer</a>');
add('3.3 预训\uFFFD?</a>', '3.3 预训练</a>');
add('学习率调\uFFFD?</a>', '学习率调度</a>');
add('DPO 简\uFFFD?</a>', 'DPO 简介</a>');
add('ZeRO 优化\uFFFD?</a>', 'ZeRO 优化器</a>');
add('推理的瓶\uFFFD?</a>', '推理的瓶颈</a>');
add('过拟合与欠拟\uFFFD?</a>', '过拟合与欠拟合</a>');
add('电脑能训什\uFFFD?</a>', '电脑能训什么</a>');
add('入门路线\uFFFD?</a>', '入门路线图</a>');
add('总结与对\uFFFD?</a>', '总结与对比</a>');

// ============== Main h1 ==============
// ch1: 第一章·从零理解神经网络  
// The h1 line contains corrupted chars between <h1> and </h1>
// We need to handle the entire h1 line for each chapter

// ch1 h1
add('  <h1>第一\uFFFD?<span>\uFFFD?</span>从零理解神经网络</h1>', '  <h1>第一章<span>·</span>从零理解神经网络</h1>');
add('\n<h1>第一\uFFFD?<span>\uFFFD?</span>从零理解神经网络</h1>', '\n<h1>第一章<span>·</span>从零理解神经网络</h1>');

// Back-link before h1
add('<a href="index.html" class="back-link">\uFFFD?返回目录</a>\n  <h1>', '<a href="index.html" class="back-link">← 返回目录</a>\n  <h1>');
add('<a href="index.html" class="back-link">\uFFFD?返回目录</a>\n<h1>', '<a href="index.html" class="back-link">← 返回目录</a>\n<h1>');

// ============== File-specific body fixes ==============
// ch3
add('的完整流水线\uFFFD?</p>', '的完整流水线。</p>');
add('同的目标、数据和计算需求\uFFFD?</p>', '同的目标、数据和计算需求。</p>');
add('大模型的所有技巧\uFFFD?</p>', '大模型的所有技巧。</p>');
add('5 倍显存\uFFFD?</p>', '5 倍显存。</p>');
add('方方面面\uFFFD?</p>', '方方面面。</p>');
add('正确的选择\uFFFD?</p>', '正确的选择。</p>');

// ch3 training diagram
add('      \uFFFD?  预训\uFFFD?(Pretrain)', '      ↓  预训练(Pretrain)');
add('    \uFFFD?  预训\uFFFD?(Pretrain)', '    ↓  预训练(Pretrain)');
add('成本: \uFFFD?100% 的总训练预\uFFFD?', '成本: ≈100% 的总训练预算');
add('训练预\uFFFD?        \uFFFD?  Base', '训练预算        ↓  Base');
add('      \uFFFD?  监督微调 (SFT)', '      ↓  监督微调 (SFT)');
add('"教模型学会对话格\uFFFD?"', '"教模型学会对话格式"');
add('对话格\uFFFD?\n  成本: \uFFFD?0.1% 的总', '对话格式"\n  成本: ≈0.1% 的总');
add('训练预\uFFFD?        \uFFFD?  Instru', '训练预算        ↓  Instru');
add('（会遵循指令\uFFFD?        \uFFFD?', '（会遵循指令）        ↓');
add('      \uFFFD?  对齐 (RLHF / DPO)', '      ↓  对齐 (RLHF / DPO)');
add('指令\uFFFD?        \uFFFD?  对齐', '指令）        ↓  对齐');
add('"让模型符合人类偏\uFFFD?"', '"让模型符合人类偏好"');
add('人类偏\uFFFD?\n  成本: \uFFFD?0.01% 的总', '人类偏好"\n  成本: ≈0.01% 的总');
add('训练预\uFFFD?        \uFFFD?  \uD83C\uDF89', '训练预算        ↓  🎉');
add('\uD83C\uDF89 Aligned Model（可用！\uFFFD?', '🎉 Aligned Model（可用！');

// ch3 - body text
add('最重要也最容易被低\uFFFD?', '最重要也最容易被低估');
add('一个好的模\uFFFD?= 70%', '一个好的模型 = 70%');
add('社交媒体、论\uFFFD?', '社交媒体、论坛');
add('人工标注数\uFFFD?', '人工标注数据');
add('经过严格清洗\uFFFD?', '经过严格清洗。');
add('近似重复文\uFFFD?', '近似重复文本');
add('FastText 分类\uFFFD?', 'FastText 分类器');
add('PII 去\uFFFD?', 'PII 去除');
add('个人身份信息（邮箱、电话、ID）脱\uFFFD?', '个人身份信息（邮箱、电话、ID）脱敏');
add('各语言比例控制（中\uFFFD?LLM', '各语言比例控制（中文LLM');
add('中文语料要充足）', '中文语料要充足）');
add('毒性过\uFFFD?', '毒性过滤');
add('代码数据不足\uFFFD?', '代码数据不足。');
add('Tokenization——分\uFFFD?', 'Tokenization——分词');
add('Unicode 字节', 'Unicode 字节');
add('例子: "\uFFFD? "成本" "', '例子: "低" "成本" "');
add('合并\uFFFD?[低_cost]', '合并为[低_cost]');
add('合并\uFFFD?[微_tune]', '合并为[微_tune]');
add('词表里有 [低_cost] \uFFFD?[微_tune]', '词表里有 [低_cost] 和[微_tune]');
add('句子开\uFFFD?结束', '句子开始/结束');
add('未知\uFFFD?', '未知词');
add('未录入词表的\uFFFD?', '未录入词表的词');
add('批次组\uFFFD?', '批次组织');
add('随机打乱（shuffle\uFFFD?', '随机打乱（shuffle）');
add('将\uFFFD?batch_size', '按batch_size');
add('对每条做 tokenize', '对每条做 tokenize');
add('短的补到和最长的对齐\uFFFD?', '短的补到和最长的对齐）');
add('关键参数\uFFFD?', '关键参数：');
add('喂多少条数\uFFFD?', '喂多少条数据');
add('累\uFFFD?n \uFFFD?batch', '累积 n 个batch');
add('等效于增\uFFFD?batch_size', '等效于增大batch_size');
add('超过的被截断\uFFFD?', '超过的被截断）');
add('预训\uFFFD?= 让模型', '预训练 = 让模型');
add('预测下一\uFFFD?Token', '预测下一个Token');
add('万亿）级别\uFFFD?tokens', '万亿）级别的tokens');
add('学习率调\uFFFD?', '学习率调度');
add('达到目\uFFFD?LR 后', '达到目标LR 后');
add('\uFFFD?教它如何对话', '→ 教它如何对话');
add('继续微调模型\uFFFD?', '继续微调模型。');
add('\uFFFD?Python 写一个快速排\uFFFD?', '"用Python 写一个快速排序"');
add('只\uFFFD?assistant 回复部分', '只对assistant 回复部分');
add('system prompt 不参\uFFFD?loss', 'system prompt 不参与loss');
add('防止灾难性遗\uFFFD?', '防止灾难性遗忘');
add('一条高质量标注 \uFFFD?100 条', '一条高质量标注 > 100 条');
add('Reward Model（奖励模型）', 'Reward Model（奖励模型）');
add('对同一 prompt，让模型生成 N 个回\uFFFD?', '对同一 prompt，让模型生成 N 个回复');
add('N 个回\uFFFD?    ', 'N 个回复    ');
add('对每个回\uFFFD?', '对每个回复');
add('RLHF 的挑\uFFFD?', 'RLHF 的挑战');
add('同时在内存中加\uFFFD?4 个模型', '同时在内存中加载4 个模型');
add('Reward Hacking 问题\uFFFD?', 'Reward Hacking 问题）');
add('DPO \uFFFD?RLHF \uFFFD?简化替代方\uFFFD?', 'DPO 是RLHF 的简化替代方案');
add('不需要训\uFFFD?Reward Model', '不需要训练Reward Model');
add('对每\uFFFD?prompt', '对每个prompt');
add('拉\uFFFD?好回\uFFFD?\uFFFD?差回\uFFFD?之间的差\uFFFD?', '拉大好回复和差回复之间的差距');
add('防止偏离过\uFFFD?', '防止偏离过度');
add('都可以原生支\uFFFD?DPO', '都可以原生支持DPO');
add('决定模型上\uFFFD?', '决定模型上限');
add('预测下一\uFFFD?token', '预测下一个token');
add('数据质量比数量重\uFFFD?', '数据质量比数量重要');
add('不需要训\uFFFD?Reward Model', '不需要训练Reward Model');
add('普通人从这\uFFFD?绕行', '普通人从这里绕行');

// ============== ch5 body fixes ==============
add('全量微调需\uFFFD?~56GB VRAM', '全量微调需要~56GB VRAM');
add('一\uFFFD?RTX 4090 24G', '一张RTX 4090 24G');
add('需\uFFFD?只训一小部分参\uFFFD?\uFFFD?', '需要只训一小部分参数。</p>');
add('训练的参\uFFFD?', '训练的参数');
add('部分\uFFFD?', '部分层');
add('仍需存储完整梯\uFFFD?', '仍需存储完整梯度');
add('模型本身量化\uFFFD?4-bit', '模型本身量化为4-bit');
add('权重\uFFFD?更新\uFFFD?', '权重的"更新"');
add('\uFFFD?低秩\uFFFD?', '具有低秩性');
add('完整矩\uFFFD?ΔW', '完整矩阵ΔW');
add('缩放因子，控\uFFFD?adapter', '缩放因子，控制adapter');
add('防止过拟\uFFFD?', '防止过拟合');
add('数据集可以稍\uFFFD?', '数据集可以稍大');
add('哪些模块上\uFFFD?LoRA', '哪些模块上加LoRA');
add('最少）；加\uFFFD?k_proj', '最少）；再加上k_proj');
add('\uFFFD?标准配\uFFFD?', '→ 标准配置');
add('把模型量化\uFFFD?4-bit', '把模型量化为4-bit');
add('显存直接降\uFFFD?1/4', '显存直接降到1/4');
add('省显卡：一\uFFFD?RTX 3060 12G', '省显卡：一张RTX 3060 12G');
add('可以\uFFFD?7B', '可以跑7B');
add('一\uFFFD?4090 可以\uFFFD?34B', '一张4090 可以跑34B');
add('一张卡\uFFFD?DPO', '一张卡跑DPO');
add('量\uFFFD?反量化开\uFFFD?', '量化/反量化开销');
add('差距很小（\uFFFD?2%\uFFFD?', '差距很小（约2%）');
add('在梯度上做低秩投\uFFFD?', '在梯度上做低秩投影');
add('\uFFFD?存完整梯\uFFFD?', '→ 存完整梯度');
add('显存和全\uFFFD?BF16 LoRA 差不\uFFFD?', '显存和全参数BF16 LoRA 差不多');
add('Llama 7B \uFFFD?Full FT', 'Llama 7B 做Full FT');
add('只需\uFFFD?12GB 显存\uFFFD?', '只需要12GB 显存。');
add('\uFFFD?QLoRA 更\uFFFD?', '比QLoRA更新');
add('模型权重)\uFFFD?', '模型权重）');
add('每次值\uFFFD?4 bits', '每个值用4 bits');
add('可以\uFFFD?CPU 上高效运行', '可以在CPU 上高效运行');
add('优化 Attention 的计算方\uFFFD?', '优化 Attention 的计算方式');
add('把整张 S × S 的注意力分数矩阵存在 HBM（高带宽显存）', '把整张 S × S 的注意力分数矩阵存在 HBM（高带宽显存）');
add('需要存完整\uFFFD?S×S 矩阵\uFFFD?', '不需要存完整的S×S 矩阵。');
add('（减\uFFFD?HBM 读写\uFFFD?', '（减少HBM 读写）');
add('序列越长越恐怖', '序列越长越恐怖');
add('显存减少 50-70%', '显存减少 50-70%');
add('训练时间增加 15-25%', '训练时间增加 15-25%');
add('配合 LoRA/QLoRA \uFFFD?一步降低显\uFFFD?', '配合 LoRA/QLoRA 进一步降低显存');
add('三件套，显存杀\uFFFD?', '三件套，显存杀手');
add('推理\uFFFD?量化\uFFFD?Q4_K_M', '推理时量化到Q4_K_M');
add('只\uFFFD?adapter，参数量降到 0.1%', '只用adapter，参数量降到 0.1%');
add('显存从 56G \uFFFD?16G', '显存从 56G 降到16G');
add('显存降\uFFFD?6-8G', '显存降到6-8G');
add('减少 O(S²) \uFFFD?Attention 显存\uFFFD?O(S)', '减少 O(S²) 的Attention 显存到O(S)');
add('减少激活值显\uFFFD?', '减少激活值显存');
add('4GB \uFFFD?7B 模型', '4GB 跑7B 模型');

// Generic: period and punctuation fixes
add('\uFFFD?\uFFFD?', '。');
add('\uFFFD?/p>', '。</p>');

// ============== Apply ==============
for (let i = 1; i <= 8; i++) {
  const filepath = path.join(dir, `ch${i}.html`);
  let text = fs.readFileSync(filepath, 'utf-8');
  const original = text;
  
  for (const [from, to] of REPLACEMENTS) {
    text = text.split(from).join(to);
  }
  
  if (text !== original) {
    fs.writeFileSync(filepath, text, 'utf-8');
    const remaining = (text.match(/\uFFFD/g) || []).length;
    console.log(`${path.basename(filepath)}: fixed some, ${remaining} U+FFFD remaining`);
  } else {
    const remaining = (text.match(/\uFFFD/g) || []).length;
    console.log(`${path.basename(filepath)}: no changes, ${remaining} U+FFFD remaining`);
  }
}
