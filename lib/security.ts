import { BlessingRequest } from './types'

// 输入验证配置
const MAX_DESCRIPTION_LENGTH = 500
const MAX_ADDITIONAL_INFO_LENGTH = 200
const MIN_DESCRIPTION_LENGTH = 10

// 危险关键词黑名单（防止提示词注入）
const DANGEROUS_KEYWORDS = [
  'ignore previous',
  'disregard above',
  'forget everything',
  '忽略之前',
  '忘记上面',
  'system prompt',
  'role:',
  'assistant:',
  '\\n\\n\\n', // 多个换行符
  '<script',
  'javascript:',
  'onclick',
  'onerror'
]

// 敏感词过滤（可选）
const SENSITIVE_WORDS = [
  // 可以根据需要添加敏感词
]

export interface ValidationResult {
  isValid: boolean
  error?: string
}

// 验证和清理用户输入
export function validateAndSanitizeInput(request: BlessingRequest): ValidationResult {
  // 验证模式
  if (request.mode === 'smart') {
    // 智能模式验证
    if (!request.customDescription) {
      return { isValid: false, error: '请输入场景描述' }
    }

    const description = request.customDescription.trim()
    
    // 长度验证
    if (description.length < MIN_DESCRIPTION_LENGTH) {
      return { isValid: false, error: `描述至少需要${MIN_DESCRIPTION_LENGTH}个字符` }
    }
    
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return { isValid: false, error: `描述不能超过${MAX_DESCRIPTION_LENGTH}个字符` }
    }

    // 危险关键词检测
    const lowerDescription = description.toLowerCase()
    for (const keyword of DANGEROUS_KEYWORDS) {
      if (lowerDescription.includes(keyword.toLowerCase())) {
        return { isValid: false, error: '输入包含不允许的内容' }
      }
    }

  } else if (request.mode === 'classic') {
    // 经典模式验证
    if (!request.scene || !request.holiday || !request.recipient || !request.style) {
      return { isValid: false, error: '请完整选择所有选项' }
    }

    // 验证选项值是否合法（防止注入非法选项）
    const validScenes = ['birthday', 'wedding', 'graduation', 'promotion', 'moving', 'opening', 'anniversary', 'recovery', 'retirement', 'exam', 'interview', 'general']
    const validHolidays = ['none', 'spring_festival', 'lantern', 'qingming', 'dragon_boat', 'qixi', 'mid_autumn', 'national_day', 'new_year', 'christmas', 'valentines', 'womens_day', 'labor_day', 'childrens_day', 'teachers_day', 'thanksgiving']
    const validRecipients = ['friend', 'parent', 'grandparent', 'sibling', 'lover', 'spouse', 'child', 'teacher', 'student', 'colleague', 'boss', 'client', 'elder', 'peer', 'general']
    const validStyles = ['warm', 'formal', 'humorous', 'literary', 'traditional', 'modern', 'concise']

    if (!validScenes.includes(request.scene)) {
      return { isValid: false, error: '无效的场景选择' }
    }
    if (!validHolidays.includes(request.holiday)) {
      return { isValid: false, error: '无效的节日选择' }
    }
    if (!validRecipients.includes(request.recipient)) {
      return { isValid: false, error: '无效的接收对象选择' }
    }
    if (!validStyles.includes(request.style)) {
      return { isValid: false, error: '无效的风格选择' }
    }

    // 验证附加信息
    if (request.additionalInfo) {
      const info = request.additionalInfo.trim()
      if (info.length > MAX_ADDITIONAL_INFO_LENGTH) {
        return { isValid: false, error: `附加信息不能超过${MAX_ADDITIONAL_INFO_LENGTH}个字符` }
      }

      // 对附加信息也进行危险关键词检测
      const lowerInfo = info.toLowerCase()
      for (const keyword of DANGEROUS_KEYWORDS) {
        if (lowerInfo.includes(keyword.toLowerCase())) {
          return { isValid: false, error: '附加信息包含不允许的内容' }
        }
      }
    }
  } else {
    return { isValid: false, error: '无效的模式选择' }
  }

  return { isValid: true }
}

// 清理文本（移除潜在的危险字符）
export function sanitizeText(text: string): string {
  // 移除控制字符
  let cleaned = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
  
  // 限制连续空白字符
  cleaned = cleaned.replace(/\s{3,}/g, '  ')
  
  // 移除潜在的HTML/脚本标签
  cleaned = cleaned.replace(/<[^>]*>/g, '')
  
  // 移除零宽字符
  cleaned = cleaned.replace(/[\u200B-\u200D\uFEFF]/g, '')
  
  return cleaned.trim()
}

// 生成请求指纹（用于更精确的识别）
export function generateRequestFingerprint(
  ip: string,
  userAgent: string,
  acceptLanguage?: string,
  acceptEncoding?: string
): string {
  // 组合多个特征生成指纹
  const features = [
    ip,
    userAgent.substring(0, 100),
    acceptLanguage || 'unknown',
    acceptEncoding || 'unknown'
  ]
  
  // 简单的哈希（实际生产环境可以使用crypto）
  const fingerprint = features.join('|')
  return Buffer.from(fingerprint).toString('base64').substring(0, 32)
}

// 检查请求频率模式（检测自动化脚本）
export function detectSuspiciousPattern(
  requestTimes: number[],
  threshold: number = 5
): boolean {
  if (requestTimes.length < threshold) {
    return false
  }

  // 检查请求间隔是否过于规律（可能是脚本）
  const intervals: number[] = []
  for (let i = 1; i < requestTimes.length; i++) {
    intervals.push(requestTimes[i] - requestTimes[i - 1])
  }

  // 计算间隔的标准差
  const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
  const variance = intervals.reduce((sum, interval) => {
    return sum + Math.pow(interval - avgInterval, 2)
  }, 0) / intervals.length
  const stdDev = Math.sqrt(variance)

  // 如果标准差很小，说明请求间隔很规律，可能是脚本
  return stdDev < 100 // 100毫秒的容差
}

// 生成安全的错误信息（不暴露内部细节）
export function getSafeErrorMessage(error: any): string {
  // 不要暴露具体的错误信息给用户
  if (error?.response?.status === 429) {
    return '请求过于频繁，请稍后再试'
  }
  
  if (error?.response?.status >= 500) {
    return '服务暂时不可用，请稍后再试'
  }
  
  if (error?.code === 'ECONNABORTED' || error?.code === 'ETIMEDOUT') {
    return '请求超时，请重试'
  }
  
  // 默认错误信息
  return '生成祝福语失败，请稍后重试'
}