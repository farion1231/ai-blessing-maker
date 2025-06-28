// 简化的验证规则
const LIMITS = {
  customDescription: { min: 5, max: 300 },
  additionalInfo: { max: 100 }
};

// 基础危险词过滤（只过滤明显的提示词注入）
const BLOCKED_PATTERNS = [
  /ignore.{0,10}(previous|above|instruction)/i,
  /forget.{0,10}(everything|above|instruction)/i,
  /(system|assistant|user):/i,
  /<script/i,
  /javascript:/i
];

export function validateInput(data: unknown): { valid: boolean; error?: string } {
  // 空值检查
  if (!data) {
    return { valid: false, error: "请选择场合和对象" };
  }
  
  // 类型断言
  const inputData = data as Record<string, unknown>;
  
  // 智能模式验证
  if (inputData.useSmartMode || inputData.mode === 'smart') {
    const desc = (inputData.customDescription as string)?.trim();
    
    if (!desc) return { valid: false, error: "请输入场景描述" };
    if (desc.length < LIMITS.customDescription.min) {
      return { valid: false, error: "描述太短，请详细一些" };
    }
    if (desc.length > LIMITS.customDescription.max) {
      return { valid: false, error: "描述太长，请简化一下" };
    }
    
    // 检查危险模式
    if (BLOCKED_PATTERNS.some(pattern => pattern.test(desc))) {
      return { valid: false, error: "输入内容不符合要求" };
    }
  }
  
  // 经典模式验证（简单非空检查）
  else {
    if (!inputData.scenario || !inputData.targetPerson) {
      return { valid: false, error: "请选择场合和对象" };
    }
  }
  
  return { valid: true };
}

// 简单文本清理（移除控制字符）
export function cleanText(text: string): string {
  return text.replace(/[\x00-\x1F\x7F]/g, '').trim();
}