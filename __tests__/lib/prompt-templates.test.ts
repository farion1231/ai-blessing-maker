import { createSmartPrompt, createTemplatePrompt, createBlessingPrompt } from '@/lib/prompt-templates'

describe('prompt-templates', () => {
  describe('createSmartPrompt', () => {
    it('creates smart prompt with custom description', () => {
      const options = {
        scenario: '',
        festival: '',
        targetPerson: '',
        customDescription: '给室友小王发生日祝福，他是程序员'
      }
      
      const prompt = createSmartPrompt(options)
      
      expect(prompt).toContain('给室友小王发生日祝福，他是程序员')
      expect(prompt).toContain('请根据以下描述生成一段个性化的祝福语')
      expect(prompt).toContain('深度理解用户描述中的所有细节')
      expect(prompt).toContain('请直接返回祝福语内容，不需要其他说明')
    })

    it('includes all required guidance in smart prompt', () => {
      const options = {
        scenario: '',
        festival: '',
        targetPerson: '',
        customDescription: '简单描述'
      }
      
      const prompt = createSmartPrompt(options)
      
      expect(prompt).toContain('自动识别并恰当使用文中提到的姓名、称呼、关系')
      expect(prompt).toContain('根据描述的场景和情境选择最合适的语气和风格')
      expect(prompt).toContain('长度适中（50-100字）')
      expect(prompt).toContain('语言温暖有力，富有个人色彩和情感共鸣')
    })
  })

  describe('createTemplatePrompt', () => {
    it('creates template prompt with all specified options', () => {
      const options = {
        scenario: '生日',
        festival: '',
        targetPerson: '朋友',
        style: '温馨'
      }
      
      const prompt = createTemplatePrompt(options)
      
      expect(prompt).toContain('祝福场合：生日')
      expect(prompt).toContain('目标人群：朋友')
      expect(prompt).toContain('风格：温馨')
      expect(prompt).toContain('请为我生成一段祝福语')
    })

    it('uses default style when not provided', () => {
      const options = {
        scenario: '生日',
        festival: '',
        targetPerson: '朋友'
      }
      
      const prompt = createTemplatePrompt(options)
      
      expect(prompt).toContain('风格：温馨')
    })

    it('includes all template requirements', () => {
      const options = {
        scenario: '结婚',
        festival: '',
        targetPerson: '同事',
        style: '正式'
      }
      
      const prompt = createTemplatePrompt(options)
      
      expect(prompt).toContain('符合指定的祝福场合和氛围')
      expect(prompt).toContain('针对目标人群使用合适的称呼和语气')
      expect(prompt).toContain('内容积极正面，表达美好祝愿')
      expect(prompt).toContain('长度适中，大约50-80字')
      expect(prompt).toContain('请直接返回祝福语内容，不需要其他说明')
    })
  })

  describe('createBlessingPrompt', () => {
    it('returns smart prompt when useSmartMode is true and has description', () => {
      const options = {
        scenario: '生日',
        festival: '',
        targetPerson: '朋友',
        style: '温馨',
        customDescription: '给朋友的生日祝福',
        useSmartMode: true
      }
      
      const prompt = createBlessingPrompt(options)
      
      expect(prompt).toContain('请根据以下描述生成一段个性化的祝福语')
      expect(prompt).toContain('给朋友的生日祝福')
    })

    it('returns template prompt when useSmartMode is false', () => {
      const options = {
        scenario: '生日',
        festival: '',
        targetPerson: '朋友',
        style: '温馨',
        customDescription: '给朋友的生日祝福',
        useSmartMode: false
      }
      
      const prompt = createBlessingPrompt(options)
      
      expect(prompt).toContain('请为我生成一段祝福语')
      expect(prompt).toContain('祝福场合：生日')
      expect(prompt).toContain('目标人群：朋友')
    })

    it('returns template prompt when useSmartMode is true but no description', () => {
      const options = {
        scenario: '生日',
        festival: '',
        targetPerson: '朋友',
        style: '温馨',
        useSmartMode: true
      }
      
      const prompt = createBlessingPrompt(options)
      
      expect(prompt).toContain('请为我生成一段祝福语')
      expect(prompt).toContain('祝福场合：生日')
    })

    it('returns template prompt when description is empty string', () => {
      const options = {
        scenario: '生日',
        festival: '',
        targetPerson: '朋友',
        style: '温馨',
        customDescription: '',
        useSmartMode: true
      }
      
      const prompt = createBlessingPrompt(options)
      
      expect(prompt).toContain('请为我生成一段祝福语')
      expect(prompt).toContain('祝福场合：生日')
    })

    it('returns template prompt when description is whitespace only', () => {
      const options = {
        scenario: '生日',
        festival: '',
        targetPerson: '朋友',
        style: '温馨',
        customDescription: '   ',
        useSmartMode: true
      }
      
      const prompt = createBlessingPrompt(options)
      
      expect(prompt).toContain('请为我生成一段祝福语')
      expect(prompt).toContain('祝福场合：生日')
    })

    it('handles undefined useSmartMode', () => {
      const options = {
        scenario: '生日',
        festival: '',
        targetPerson: '朋友',
        style: '温馨',
        customDescription: '给朋友的生日祝福'
      }
      
      const prompt = createBlessingPrompt(options)
      
      expect(prompt).toContain('请为我生成一段祝福语')
      expect(prompt).toContain('祝福场合：生日')
    })
  })
})