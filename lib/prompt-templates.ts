interface BlessingRequest {
  scenario: string;
  festival: string;
  targetPerson: string;
  style?: string;
  customDescription?: string;
  useSmartMode?: boolean;
}

export function createSmartPrompt(options: BlessingRequest): string {
  const { customDescription } = options;
  
  return `请根据以下描述生成一段个性化的祝福语：

用户描述：${customDescription}

请生成一段真诚、个性化、符合情境的祝福语。要求：
1. 深度理解用户描述中的所有细节：人物关系、具体情况、情感背景等
2. 自动识别并恰当使用文中提到的姓名、称呼、关系
3. 根据描述的场景和情境选择最合适的语气和风格
4. 体现对具体情况的理解和针对性关怀
5. 长度适中（50-100字），真诚自然，避免套话模板
6. 语言温暖有力，富有个人色彩和情感共鸣
7. 如果描述中包含特殊背景，要巧妙地体现出来

请直接返回祝福语内容，不需要其他说明。`;
}

export function createTemplatePrompt(options: BlessingRequest): string {
  const { scenario, targetPerson, style = "温馨" } = options;

  return `请为我生成一段祝福语，要求如下：
- 祝福场合：${scenario}
- 目标人群：${targetPerson}
- 风格：${style}

请生成一段真诚、温暖、符合中文表达习惯的祝福语。祝福语应该：
1. 符合指定的祝福场合和氛围
2. 针对目标人群使用合适的称呼和语气
3. 内容积极正面，表达美好祝愿
4. 长度适中，大约50-80字
5. 语言流畅自然，避免过于华丽的辞藻

请直接返回祝福语内容，不需要其他说明。`;
}

export function createBlessingPrompt(options: BlessingRequest): string {
  if (options.useSmartMode && options.customDescription?.trim()) {
    return createSmartPrompt(options);
  } else {
    return createTemplatePrompt(options);
  }
}