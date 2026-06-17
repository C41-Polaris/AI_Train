const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/MarxC/Desktop/AI训练知识科普';

// Build comprehensive hex-level replacement map for remaining files
// Each entry: [fileIndex, corruptionContext, replacementChar]

const FFFD = '\uFFFD';

// Helper to build file-specific fix function
function fixFile(num, fixes) {
  const fp = path.join(dir, `ch${num}.html`);
  let text = fs.readFileSync(fp, 'utf-8');
  const original = text;
  let changes = 0;
  
  // Apply direct string replacements
  for (const [from, to] of fixes) {
    if (typeof from === 'string' && typeof to === 'string') {
      if (text.includes(from)) {
        text = text.split(from).join(to);
        changes++;
      }
    }
  }
  
  if (text !== original) {
    fs.writeFileSync(fp, text, 'utf-8');
  }
  
  const remaining = (text.match(/\uFFFD/g) || []).length;
  console.log(`ch${num}.html: ${remaining} remaining (${changes} fix patterns applied)`);
  return remaining;
}

// ============================================================
// ch4 - 分布式训练策略
// ============================================================
fixFile(4, [
  // Title area
  ['<title>第四章分布式。训练策略', '<title>第四章分布式训练策略'],
  ['<h1>第四章<span>·</span>分布式。训练策略</h1>', '<h1>第四章<span>·</span>分布式训练策略</h1>'],
  ['一\uFFFD?RTX', '一张RTX'],
  ['一\uFFFD?70B', '一个70B'],
  ['FP16 \uFFFD?140GB', 'FP16 约140GB'],
  
  // Section headers
  ['需要要分布式。训练', '需要分布式训练'],
  ['单\uFFFD?VRAM', '单卡VRAM'],
  ['放不下模型 \uFFFD?拆了', '放不下模型 → 拆了'],
  ['算得太\uFFFD?\n', '算得太慢\n'],
  
  // Body text
  ['分布式。训练解决的。三个问题', '分布式训练解决的三个问题'],
  ['分布到多张\uFFFD?', '分布到多张卡'],
  ['多张\uFFFD?。\n', '多张卡\n'],
  ['线性加\uFFFD?\n', '线性加速\n'],
  ['多张\uFFFD?上。\n', '多张卡上\n'],
  ['中间激活值。', '中间激活值'],
  ['典型訓練配。\n', '典型配置\n'],
  
  // H3 headings
  ['不承要要 Loss', '不需要 Loss'],
  ['S×S 矩阵。', 'S×S 矩阵'],
  ['速度最后快（通信', '速度最快（通信'],
  ['最后简单的。分布式。方案', '最简单的分布式方案'],
  ['标准答案配。\n', '标准配置\n'],
  
  // DDP section
  ['完整模\uFFFD?+ 优化器状\uFFFD?。\n', '完整模型+优化器状态\n'],
  ['前向/反向独立计算', '前向/反向独立计算'], // already correct
  ['all-reduce 同步梯度</li>', 'all-reduce 同步梯度</li>'],
  ['优化器状态（参数\uFFFD?× 2 + × 4）。\n', '优化器状态（参数× 2 + × 4）\n'],
  
  // FSDP
  ['状\uFFFD?<strong>打散</strong>', '状态<strong>打散</strong>'],
  ['分片</strong>到各\uFFFD?。\n', '分片</strong>到各卡\n'],
  ['收集完整参数</li>', '收集完整参数</li>'],
  ['DDP \uFFFD?1/N', 'DDP 的1/N'],
  ['卡数\uFFFD?。\n', '卡数\n'],
  ['有额外的。通信开销', '有额外的通信开销'],
  ['all-gather 放参数+', 'all-gather 放参数+'],
  ['推荐场景\n', '推荐场景\n'],
  
  // ZeRO section
  ['优化\uFFFD?。\n', '优化器\n'],
  ['核心创新，也是 FSDP 的。前身。', '核心创新，也是 FSDP 的前身'],
  ['状\uFFFD?<strong>打散</strong> 存储', '状态<strong>打散</strong> 存储'],
  ['显存节省\uFFFD?B FP16+Adam。\n', '显存节省（7B FP16+Adam）\n'],
  
  // ZeRO Stages table
  ['\uFFFD?ZeRO (DDP)', '0 ZeRO (DDP)'],
  ['\uFFFD?Stage', '0 Stage'],
  ['Stage 2 的。显存', 'Stage 2 显存'],
  ['优化器分\uFFFD?', '优化器分片'],
  ['参数也分\uFFFD?', '参数也分片'],
  
  // 实战口诀 card
  ['显存够用就用 Stage 2（性能最后优）', '显存够用就用 Stage 2（性能最优）'],
  ['显存紧张\uFFFD?Stage 3', '显存紧张用Stage 3'],
  ['优化ZeRO Stage 2', '优化用 ZeRO Stage 2'],
  
  // Model Parallel section
  ['大到一张卡连一层都放不\uFFFD?。\n', '大到一张卡连一层都放不下\n'],
  ['就需要要把模型本身拆开', '就需要把模型本身拆开'],
  ['�?strong>一个层</strong>的。', '<strong>一个层</strong>的'],
  ['计算切分到多张卡上。', '计算切分到多张卡上'],
  ['head 分给不同\uFFFD?GPU。\n', 'head 分给不同 GPU\n'],
  
  // Tensor Parallelism
  ['层内并行，降低单步延\uFFFD?。\n', '层内并行，降低单步延迟\n'],
  ['通信密集（每\uFFFD?matmul', '通信密集（每个matmul'],
  ['都需要\uFFFD?all-reduce。\n', '都需要 all-reduce\n'],
  ['一般只在单机内使用', '一般只在单机内使用'],
  
  // Pipeline Parallelism
  ['不同\uFFFD?放在不同\uFFFD?GPU 上。\n', '不同层放在不同 GPU 上\n'],
  
  // DeepSpeed section
  ['分布式。训练引擎', '分布式训练引擎'],
  ['一站式。解决', '一站式解决'],
  ['问题。提\uFFFD?ZeRO', '问题。提供 ZeRO'],
  ['等各种支持', '等各种支持'],
  ['典型用法', '典型用法'],
  ['模型质量', '模型质量'],
  
  // Mixed Precision
  ['不需要要所有', '不需要所有'],
  ['模型质\uFFFD?。\n', '模型质量\n'],
  ['显存\uFFFD?。\n', '显存大\n'],
  ['梯度度下溢', '梯度下溢'],
  ['最后怕梯度', '最怕梯度'],
  ['范围只\uFFFD?±65504', '范围只有 ±65504'],
  ['精度低\n\n', '精度低\n\n'],
  ['梯度度投影影', '梯度投影'],
  ['梯度度压缩缩', '梯度压缩'],
  
  // 总结 section
  ['显存分布', '显存分布'],
  ['各卡显存', '各卡显存'],
  ['模型大。\n', '模型大小\n'],
  ['多机多卡\uFFFD?70B+', '多机多卡 70B+'],
  ['3D Parallelism', '3D Parallelism'],
  ['（层内并行）<br>\n\uFFFD?跨机器', '（层内并行）<br>\n→跨机器'],
  ['流水线\uFFFD?。\n', '流水线并行\n'],
  
  // Last paragraph
  ['分布式。策略是大团队的。事。', '分布式策略是大团队的事'],
  ['下一章是个人极客最后关心的。：单卡/小卡上的。高效微调技术。', '下一章是个人极客最关心的：单卡/小卡上的高效微调技术'],
  
  // Fix box-drawing diagram chars with corruption
  ['\uFFFD?GPU2', '  GPU2'],
  ['\uFFFD?GPU3', '  GPU3'],
  ['\uFFFD?GPU4', '  GPU4'],
  ['\uFFFD?每一', '  每一'],
  ['\uFFFD?各自', '  各自'],
  ['\uFFFD?all-reduce', '   all-reduce'],
  ['\uFFFD?计算前', '  计算前'],
  ['\uFFFD?通过 NVLink', '  通过 NVLink'],
  ['\uFFFD?GPU1', '  GPU1'],
  ['\uFFFD?模型', '  模型'],
  ['\uFFFD?参数', '  参数'],
  ['\uFFFD?256', '  256'],
  ['\uFFFD?g\uFFFD?', '  g1'],
  ['\uFFFD?各卡的。', '  各卡的'],
  ['\uFFFD?所有卡', '  所有卡'],
  ['\uFFFD?每', '  每'],
  ['\uFFFD?SwiGLU', '  SwiGLU'],
  ['\uFFFD?FP32', '  FP32'],
  ['\uFFFD?7B', '  7B'],
  ['\uFFFD?放', '  放'],
  ['\uFFFD?完全', '  完全'],
  ['\uFFFD?分割', '  分割'],
  ['\uFFFD?Q\uFFFD?K\uFFFD?V。', '  Q/K/V。'],
  ['h\uFFFD?3\uFFFD?', 'h1-3）'],
  ['h\uFFFD?6\uFFFD?', 'h4-6）'],
  ['K\uFFFD?V。h\uFFFD?3\uFFFD?', 'K/V。h1-3）'],
  ['K\uFFFD?V。h\uFFFD?6\uFFFD?', 'K/V。h4-6）'],
  ['●。更多', '  更多'],
  ['\uFFFD?副本', '  副本'],
  ['\uFFFD?g\uFFFD?g。g\uFFFD?g。g\uFFFD?g。g\uFFFD?g₂', '  g1+g2。g3+g4。g1+g2。g3+g4₂'],
  ['│g\uFFFD?', '│g1'],
  ['g\uFFFD?g₂', 'g1+g2'],
  ['g\uFFFD?g₄', 'g3+g4'],
  ['g\uFFFD?g。g\uFFFD?g。g\uFFFD?g。g\uFFFD?g₂', 'g1+g2。g3+g4。g1+g2。g3+g4₂'],
  ['g\uFFFD?g\uFFFD?', 'g1+g2'],
  ['g₃│', 'g3│'],
  ['\uFFFD?+g\uFFFD?', '  +g3'],
  ['多卡方案\n', '多卡方案\n'],
  [' 标准DDP: 每卡存全\uFFFD?', ' 标准DDP: 每卡存全部'],
  
  // General corruption fixes in diagrams
  ['\uFFFD?\n', '\n'],
  ['\uFFFD?BR', 'BR'],
  ['\uFFFD?  ', '  '],
  ['\uFFFD?    ', '    '],
]);

// ============================================================
// ch5 - 微调与高效训练
// ============================================================
fixFile(5, [
  // Title / TOC
  ['5.1 �?Full', '5.1 Full'],
  ['Full Fine-Tuning �?LoRA', 'Full Fine-Tuning vs LoRA'],
  ['梯度度 + 优化器', '梯度 + 优化器'],
  ['参数数/th', '参数/th'],
  ['所需要要显存', '所需显存'],
  ['需要要存储完整', '需要存储完整'],
  ['差\uFFFD?\n', '差异\n'],
  
  // Body
  ['需要要要要 ~56GB', '需要 ~56GB'],
  ['需要要要要只训', '需要只训'],
  ['参数数！\n', '参数\n'],
  ['训练的。参数数/th', '训练的参数/th'],
  ['7B 模型所需要要显存', '7B 模型所需显存'],
  ['跟原模型的。差\uFFFD?\n', '跟原模型的差异\n'],
  ['仍需要要要要存储完整梯度\uFFFD?。\n', '仍需要存储完整梯度\n'],
  
  // LoRA section
  ['权重度 + 梯度度', '权重 + 梯度'],
  ['秩。\n', '秩\n'],
  ['中间维度', '中间维度'],
  ['适配\uFFFD?\n', '适配层\n'],
  ['标准配\uFFFD?\n', '标准配置\n'],
  ['效果更好但更贵', '效果更好但更贵'],
  
  // QLoRA section
  ['关键技\uFFFD?。\n', '关键技术\n'],
  ['设置计的。 4-bit', '设置的 4-bit'],
  ['梯度度页', '梯度页'],
  ['降\uFFFD?br', '降低<br'],
  ['差距很小\uFFFD? 2%', '差距很小~ 2%'],
  ['开销销', '开销'],
  
  // GaLore
  ['梯度度低秩投影影', '梯度低秩投影'],
  ['压缩缩梯度度', '压缩梯度'],
  ['类似有损压缩\uFFFD?\n', '类似有损压缩\n'],
  ['LLaMA 7B 做Full FT 只需要要要要12GB 显存。\n', 'LLaMA 7B 做Full FT 只需要12GB 显存\n'],
  ['社区还不太成熟', '社区还不太成熟'],
  
  // Quantization
  ['每个值用 4 bits 表示', '每个值用 4 bits 表示'],
  ['显存减少 8 倍', '显存减少 8 倍'],
  ['权重量\uFFFD?\n', '权重量化\n'],
  ['保持梯度度精\uFFFD?\n', '保持梯度精度\n'],
  ['模型质\uFFFD?\n', '模型质量\n'],
  ['损失量\uFFFD? \n', '损失量 \n'],
  
  // Flash Attention
  ['计算方式\uFFFD?/strong>', '计算方式</strong>'],
  ['中间存储。\n', '中间存储\n'],
  ['需要要要要把整张', '需要把整张'],
  ['注意力分数矩阵存在 HBM', '注意力分数矩阵存在 HBM'],
  ['彻底消除这个中间存储。\n', '彻底消除这个中间存储\n'],
  ['需要要要要一次性', '需要一次性'],
  ['不不需要要要存完整的。', '不需要存完整的'],
  ['需要要要几百 MB', '只需要几百 MB'],
  
  // Gradient Checkpointing
  ['重新计\uFFFD?\n', '重新计算\n'],
  ['中间\uFFFD?\n', '中间值\n'],
  ['需要要要要额\uFFFD?15-30%', '需要额外 15-30%'],
  ['配合 LoRA/QLoRA 进一步降低显\uFFFD?\n', '配合 LoRA/QLoRA 进一步降低显存\n'],
  
  // Summary
  ['从最后推荐开销始', '从最推荐开始'],
  ['显存杀手/li', '显存杀手</li>'],
  ['升级到', '升级到'],
  ['尝试', '尝试'],
  ['量化\uFFFD?Q4_K_M', '量化 Q4_K_M'],
  ['激活值显存/li', '激活值显存</li>'],
]);

// ============================================================
// ch6 - 推理优化
// ============================================================
fixFile(6, [
  // Title / TOC
  ['推理的。瓶\uFFFD?\n', '推理的瓶颈\n'],
  ['优化可以\uFFFD?10 倍', '优化可以快 10 倍'],
  ['省 5 倍显存。\n', '省 5 倍显存\n'],
  ['推理的。两个阶\uFFFD?\n', '推理的两个阶段\n'],
  ['预填充\uFFFD? <strong>Decode</strong>', '预填充） <strong>Decode</strong>'],
  ['逐词生成）。\n', '逐词生成）\n'],
  ['两个阶段有不同的。瓶颈。\n', '两个阶段有不同的瓶颈\n'],
  
  // Prefill/Decode section
  ['用 Java 写一个二\uFFFD?\n', '用Java写一个二分\n'],
  ['输出 "世', '输出 "世'],
  ['实际应该是"', '实际应该是"'],
  
  // KV Cache
  ['自回归推理时\uFFFD?\n', '自回归推理时\n'],
  ['之前所\uFFFD?token \uFFFD?Attention', '之前所有token的Attention'],
  ['每步只生成一\uFFFD?token', '每步只生成一个token'],
  ['这些 K/V 每次都是一样的', '这些K/V每次都是一样的'],
  ['——为什么不缓存起来\uFFFD?\n', '——为什么不缓存起来\n'],
  ['上次算过的。，存在显存\uFFFD?', '上次算过的，存在显存中'],
  ['Cache 的。代\uFFFD?\n', 'Cache的代价\n'],
  ['代价是<strong>显存', '代价是<strong>显存'],
  ['Cache 优化方向。\n', 'Cache优化方向\n'],
  ['共享同一\uFFFD?Key/Value', '共享同一组Key/Value'],
  ['KV 量减\uFFFD?1/h', 'KV量减到1/h'],
  ['折中方案，分组共享 KV', '折中方案，分组共享KV'],
  
  // Speculative Decoding section
  ['每\uFFFD?<strong>只能生成 1 \uFFFD?token</strong>', '每一步<strong>只能生成 1 个token</strong>'],
  ['让你"一次试探多\uFFFD?token"', '让你"一次试探多个token"'],
  ['每步生\uFFFD?1 \uFFFD?token\uFFFD?', '每步生成 1 个token'],
  ['总步\uFFFD? 大模\uFFFD?1 \uFFFD?+ 小模\uFFFD?1 ', '总步数: 大模型1步+小模型1步 '],
  ['等效 2 步（\uFFFD?3 步', '等效2步（省 3 步'],
  ['Draft 模型的。准确率', 'Draft模型的准确率'],
  ['加速比', '加速比'],
  
  // 量化推理
  ['推理侧的。量化更常见', '推理侧的量化更常见'],
  ['直接用', '直接用'],
  ['模型做推\uFFFD?\n', '模型做推理\n'],
  ['额外好\uFFFD?\n', '额外好处\n'],
  ['INT4 数学运算\uFFFD?FP16 更快', 'INT4 数学运算比FP16更快'],
  ['更少的。显存带宽压\uFFFD?', '更少的显存带宽压力'],
  ['更快的\uFFFD?Decode', '更快的 Decode'],
  ['需要\uFFFD?~40GB', '只需 ~40GB'],
  
  // 推理框架
  ['管\uFFFD?\n', '管理\n'],
  ['像操作系统的。虚拟内存一样', '像操作系统的虚拟内存一样'],
  ['连续显存区域', '连续显存区域'],
  ['分页缓存', '分页缓存'],
  ['Copy-on-Write', 'Copy-on-Write'],
  ['共享前缀\uFFFD?', '共享前缀'],
  ['可以同时服务 4-8× 更多请求', '可以同时服务 4-8× 更多请求'],
  ['支持 Continuous Batching', '支持 Continuous Batching'],
  ['只要有显存就塞新请求', '只要有显存就塞新请求'],
  
  // llama.cpp
  ['�?GPU 也能跑？', '没 GPU 也能跑？'],
  ['纯 CPU 推理引擎', '纯 CPU 推理引擎'],
  ['支\uFFFD?GGUF 格式\uFFFD?\n', '支持 GGUF 格式\n'],
  ['C++ 实现\uFFFD?<strong>不\uFFFD?GPU 依赖</strong>', 'C++ 实现<strong>无需 GPU 依赖</strong>'],
  ['但\uFFFD?GPU 加速也可以', '但用 GPU 加速也可以'],
  ['支持各种量化格式\uFFFD?\n', '支持各种量化格式\n'],
  ['低延迟，适合桌面端推\uFFFD?\n', '低延迟，适合桌面端推理\n'],
  ['不\uFFFD?vLLM', '不如 vLLM'],
  
  // TensorRT-LLM
  ['需要\uFFFD?NVIDIA GPU', '需要 NVIDIA GPU'],
  ['模型需要要先编译\uFFFD?TensorRT 引擎', '模型需要先编译成 TensorRT 引擎'],
  ['流程复杂', '流程复杂'],
  
  // Summary table
  ['吞吐', '吞吐'],
  ['上手难度', '上手难度'],
  
  // 总结
  ['推理优化检查清\uFFFD?\n', '推理优化检查清单\n'],
  ['先\uFFFD?Q4_K_M', '先用 Q4_K_M'],
  ['显存省 75%', '显存省 75%'],
  ['GQA 模型优先', 'GQA 模型优先'],
  ['LLaMA 3 / Qwen 2.5 \uFFFD?GQA 模型', 'LLaMA 3 / Qwen 2.5 用 GQA 模型'],
  ['KV Cache 减半', 'KV Cache 减半'],
  ['有 draft 模型的。话 2-3× 加\uFFFD?\n', '有 draft 模型的话 2-3× 加速\n'],
  ['性能比逐条推理好得\uFFFD?\n', '性能比逐条推理好得多\n'],
]);

// ============================================================
// ch7 - 评估与实战
// ============================================================
fixFile(7, [
  // Title area
  ['评估与实战战', '评估与实战'],
  ['模型�?自评分数', '模型的自评分数'],
  
  // Loss curve
  ['模型�?自评分数"', '模型的自评分数"'],
  ['越努力越低', '越低越好'],
  ['要懂得看', '要懂得看'],
  ['训练 Loss 持续', '训练 Loss 持续'],
  ['验证 loss 开始抬头', '验证 loss 开始抬头'],
  ['验证 loss 持续下降', '验证 loss 持续下降'],
  ['过拟合\uFFFD?\n', '过拟合\n'],
  ['学习率太\uFFFD?\n', '学习率太大\n'],
  ['数据\uFFFD?bug ', '数据有 bug '],
  ['验证集上的。损失', '验证集上的损失'],
  ['拟合能\uFFFD?\n', '拟合能力\n'],
  ['多困\uFFFD?\n', '多困惑\n'],
  ['Loss 的。指数形式\uFFFD?\n', 'Loss 的指数形式\n'],
  
  // 过拟合与欠拟合
  ['欠拟合合', '欠拟合'],
  ['数据特征没学\uFFFD?\n', '数据特征没学到\n'],
  ['训练不足', '训练不足'],
  ['训练\uFFFD?\n', '训练集\n'],
  ['欠拟合合', '欠拟合'],
  ['特有问\uFFFD?\n', '特有问题的\n'],
  ['忘了原先的。能力。br', '忘了原先的能力<br'],
  
  // Benchmark
  ['标准化的。测试集', '标准化的测试集'],
  ['真实战能力', '实战能力'],
  ['知识理解', '知识理解'],
  ['选择\uFFFD?\n', '选择题\n'],
  ['文字+推导', '文字+推导'],
  ['写代\uFFFD?\n', '写代码\n'],
  ['句子补全', '句子补全'],
  ['本地评测工具', '本地评测工具'],
  
  // 人工评估
  ['不能测所有事\uFFFD?', '不能测所有事'],
  ['<strong>聊天体验、创造力、安全\uFFFD?</strong>', '<strong>聊天体验、创造力、安全性</strong>'],
  ['只能靠人来看\uFFFD?\n', '只能靠人来看\n'],
  ['GPT-4 代理评估', 'GPT-4 代理评估'],
  ['LLM-as-a-Judge', 'LLM-as-a-Judge'],
  ['给模型回复打分', '给模型回复打分'],
  ['验证集\uFFFD?\n', '验证集\n'],
  ['30-50 个真实战用\uFFFD?\n', '30-50 个真实用例\n'],
  ['发现问\uFFFD?分析问题', '发现问题 → 分析问题'],
  
  // 实验追踪
  ['推荐工具', '推荐工具'],
  ['需要要联\uFFFD?\n', '需要联网\n'],
  ['PyTorch 原生支持，免\uFFFD?\n', 'PyTorch 原生支持，免费\n'],
  ['自托\uFFFD?\n', '自托管\n'],
  ['功能较基础', '功能较基础'],
  ['实战验对比方便', '实验对比方便'],
  ['付费功能需要升级', '付费功能需要升级'],
  ['W&B 集成', 'W&B 集成'],
  ['实战验命名', '实验命名'],
  
  // The long code block - need to fix corruption within it
  ['你以第一个', '你以第一个'],
  ['当然我可以帮你', '当然我可以帮你'],
  
  // Summary
  ['验证 Loss 比训练Loss 重要', '验证 Loss 比训练 Loss 重要'],
  ['最后常犯的。错', '最常犯的错误'],
  ['实战验记录是科学方\uFFFD?\n', '实验记录是科学方法'],
  ['你的。实战验就是随机碰运气', '你的实验就是随机碰运气'],
]);

// ============================================================
// ch8 - 实战决策框架
// ============================================================
fixFile(8, [
  // Diagram area - extensive box-drawing corruption
  ['你的。 VRAM', '你的 VRAM'],
  ['\uFFFD?  ┌────┴────�?', '    ┌────┴────┐'],
  ['  �?&lt; 8GB', '  ├ &lt; 8GB'],
  ['�?      \uFFFD?QLoRA', '│      ├ QLoRA'],
  ['�?QLoRA 7B (r\uFFFD?6)', '│ QLoRA 7B (r=16)'],
  ['�?Flash Attn', '│ Flash Attn'],
  ['└─────────�?', '└─────────┤'],
  ['�?     \uFFFD?推理', '│     ├推理'],
  ['�?8-16GB', '├ 8-16GB'],
  ['r=32-64', 'r=32-64'],
  ['LoRA 7B (r=16)', 'LoRA 7B (r=16)'],
  ['QLoRA 34B 推理', 'QLoRA 34B 推理'],
  ['16-24GB', '16-24GB'],
  ['LoRA 7B (r=64)', 'LoRA 7B (r=64)'],
  ['QLoRA 34B (r=16)', 'QLoRA 34B (r=16)'],
  ['LoRA 13B', 'LoRA 13B'],
  ['NF4 70B 推理', 'NF4 70B推理'],
  ['24-48GB', '24-48GB'],
  ['QLoRA 70B', 'QLoRA 70B'],
  ['GaLore 7B', 'GaLore 7B'],
  ['vLLM 托管服务', 'vLLM 托管服务'],
  ['48GB+', '48GB+'],
  ['Full FT 7B-13B', 'Full FT 7B-13B'],
  ['144GB+', '144GB+'],
  ['多卡并行训练', '多卡并行训练'],
  ['三卡/四卡', '三卡/四卡'],
  ['LoRA 70B / Full FT 13B', 'LoRA 70B / Full FT 13B'],
  
  // Hardware section
  ['极简起步（\uFFFD?¥-2000', '极简起步（≈¥2000'],
  ['已有电脑 + 12GB GPU', '已有电脑 + 12GB GPU'],
  ['足够了', '足够了'],
  ['或者直接用。GPU', '或者直接用云GPU'],
  ['¥1-2', '¥1-2'],
  ['单卡实战（¥15000-25000', '单卡实战（¥15000-25000'],
  ['二\uFFFD?~¥14000', '二手~¥14000'],
  ['全\uFFFD?~¥20000', '全新~¥20000'],
  ['双卡起步（¥30000-50000', '双卡起步（¥30000-50000'],
  ['二\uFFFD?~¥6500/张', '二手~¥6500/张'],
  ['进阶工作站（\uFFFD?¥50000-150000', '进阶工作站（≈¥50000-150000'],
  
  // Cost estimation fixes
  ['训练。000 条', '训练 1000 条'],
  ['训练 1。0000 条', '训练 10000 条'],
  ['训练 1。000 条', '训练 1000 条'],
  ['需要多卡', '需要多卡'],
  ['¥144\uFFFD?卡 A100', '¥144/卡 A100'],
  ['微调一\uFFFD?7B-34B', '微调一个 7B-34B'],
  ['完全可以承受', '完全可以承受'],
  ['时间\uFFFD?70B+', '时间。70B+'],
  
  // Toolbox section
  ['训练框架', '训练框架'],
  ['推理框架', '推理框架'],
  ['数据工具', '数据工具'],
  ['监控与排\uFFFD?\n', '监控与排查\n'],
  ['推荐\uFFFD?\n', '推荐配置\n'],
  ['GitHub Stars', 'GitHub Stars'],
  ['一句话推荐', '一句话推荐'],
  ['官方支\uFFFD?\n', '官方支持\n'],
  ['生态的。标准答案', '生态的标准答案'],
  ['重度训练者的。选择', '重度训练者的选择'],
  ['分布式。训练标配', '分布式训练标配'],
  ['QLoRA 加速神\uFFFD?/td>', 'QLoRA 加速神器</td>'],
  
  // 新手学习路径
  ['入门路径线\uFFFD?\n', '入门路径线\n'],
  ['Week 1: 🏗 环境搭建', 'Week 1: 🏗 环境搭建'],
  ['Week 2: 🔬 第一次微\uFFFD?', 'Week 2: 🔬 第一次微调'],
  ['差\uFFFD?\n', '差异\n'],
  ['Week 3-4: 📊 数据实战', 'Week 3-4: 📊 数据实战'],
  ['收\uFFFD?500-1000 ', '收集 500-1000 '],
  ['格式\uFFFD?化', '格式化'],
  ['Month 2: �?优化', 'Month 2: 🔧优化'],
  ['讨论模型大小', '讨论模型大小'],
  ['GPU 排行', 'GPU 排行'],
  
  // Final section
  ['最后后的。建议', '最后的建议'],
  ['来自星云伙伴的。叮\uFFFD?\n', '来自星云伙伴的叮咛\n'],
  ['性价比较高。\n', '性价比较高\n'],
  ['数据的。质量永远高于数\uFFFD?\n', '数据的质量永远高于数量\n'],
  ['10000 条自动爬取的。数据', '10000 条自动爬取的数据'],
  ['验证你的。方法', '验证你的方法'],
  ['到 7B/34B 上跑', '到 7B/34B 上跑'],
  ['持续使用的。关键', '持续使用的关键'],
  ['不要重复造轮\uFFFD?\n', '不要重复造轮子\n'],
  ['已经帮你解决 90% 的。工程问\uFFFD?\n', '已经帮你解决 90% 的工程问题\n'],
  ['最后重要的。——动\uFFFD?\n', '最后重要的。——动手\n'],
  ['更重要的。是打开终端跑一条命\uFFFD?\n', '重要的是打开终端跑一条命令\n'],
  ['愿你的。模型训练之路径顺利', '愿你的模型训练之路顺利'],
  
  // General box-drawing fixes
  ['\uFFFD?  ┌', '  ┌'],
  ['\uFFFD? ├', '  ├'],
  ['\uFFFD? └', '  └'],
  ['\uFFFD? │', '  │'],
  ['\uFFFD?├', ' ├'],
  ['\uFFFD?│', ' │'],
  ['\uFFFD?└', ' └'],
  
  // Additional diagram fixes
  ['VRAM 树', 'VRAM'],
  ['1024 \uFFFD?', '1024 条'],
  ['需要要 mask', '需要 mask'],
  ['batch 数据\uFFFD?', 'batch 数据'],
  ['分给各卡', '分给各卡'],
  
  // Fix common patterns
  ['需要要要', '需要'],
  ['最后需要', '最后需要'],
  ['最优化', '最优化'],
  ['预算力', '算力'],
  ['模型文', '模型文'],
  ['决策框。', '决策框架'],
  
  // Fix "。" pattern in diagram 
  ['└─────────┴─────────┴─────────┴─────────�?', '└─────────┴─────────┴─────────┴─────────┘'],
  ['└──────┴──────┴──────┴──────�?', '└──────┴──────┴──────┴──────┘'],
  ['└──────┴──────┴──────┴──────�?', '└──────┴──────┴──────┴──────┘'],
]);
