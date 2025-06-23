import { POST } from '@/app/api/blessing/route'
import { NextRequest } from 'next/server'
import * as aiService from '@/lib/ai-service'
import * as promptTemplates from '@/lib/prompt-templates'

// Mock dependencies
jest.mock('@/lib/ai-service')
jest.mock('@/lib/prompt-templates')

const mockGenerateBlessing = aiService.generateBlessing as jest.MockedFunction<
  typeof aiService.generateBlessing
>

const mockCreateBlessingPrompt = promptTemplates.createBlessingPrompt as jest.MockedFunction<
  typeof promptTemplates.createBlessingPrompt
>

describe('/api/blessing', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('successfully generates blessing with smart mode', async () => {
    const requestBody = {
      scenario: '',
      festival: '',
      targetPerson: '',
      customDescription: '为朋友的生日祝福',
      useSmartMode: true
    }

    const mockPrompt = '请为朋友生成生日祝福语'
    const mockBlessing = '祝你生日快乐，健康快乐每一天！'

    mockCreateBlessingPrompt.mockReturnValue(mockPrompt)
    mockGenerateBlessing.mockResolvedValue(mockBlessing)

    const mockRequest = {
      json: jest.fn().mockResolvedValue(requestBody)
    } as unknown as NextRequest

    const response = await POST(mockRequest)
    const responseData = await response.json()

    expect(mockCreateBlessingPrompt).toHaveBeenCalledWith(requestBody)
    expect(mockGenerateBlessing).toHaveBeenCalledWith(mockPrompt)
    expect(response.status).toBe(200)
    expect(responseData).toEqual({ blessing: mockBlessing })
  })

  it('successfully generates blessing with template mode', async () => {
    const requestBody = {
      scenario: 'birthday',
      festival: 'spring-festival',
      targetPerson: 'colleague',
      style: 'formal',
      useSmartMode: false
    }

    const mockPrompt = '请生成正式的春节生日祝福语给同事'
    const mockBlessing = '祝您在新的一年里工作顺利，身体健康！'

    mockCreateBlessingPrompt.mockReturnValue(mockPrompt)
    mockGenerateBlessing.mockResolvedValue(mockBlessing)

    const mockRequest = {
      json: jest.fn().mockResolvedValue(requestBody)
    } as unknown as NextRequest

    const response = await POST(mockRequest)
    const responseData = await response.json()

    expect(mockCreateBlessingPrompt).toHaveBeenCalledWith(requestBody)
    expect(mockGenerateBlessing).toHaveBeenCalledWith(mockPrompt)
    expect(response.status).toBe(200)
    expect(responseData).toEqual({ blessing: mockBlessing })
  })

  it('handles AI service errors gracefully', async () => {
    const requestBody = {
      scenario: 'birthday',
      festival: '',
      targetPerson: 'friend',
      useSmartMode: false
    }

    const mockPrompt = '请生成生日祝福语'
    const aiError = new Error('AI服务暂时不可用')

    mockCreateBlessingPrompt.mockReturnValue(mockPrompt)
    mockGenerateBlessing.mockRejectedValue(aiError)

    const mockRequest = {
      json: jest.fn().mockResolvedValue(requestBody)
    } as unknown as NextRequest

    const response = await POST(mockRequest)
    const responseData = await response.json()

    expect(response.status).toBe(500)
    expect(responseData).toEqual({ error: 'AI服务暂时不可用' })
  })

  it('handles axios errors with custom error messages', async () => {
    const requestBody = {
      scenario: 'birthday',
      festival: '',
      targetPerson: 'friend',
      useSmartMode: false
    }

    const mockPrompt = '请生成生日祝福语'
    const axiosError = {
      isAxiosError: true,
      response: {
        data: {
          error: {
            message: 'API配额已用完'
          }
        }
      },
      message: 'Request failed'
    }

    // Mock axios.isAxiosError
    jest.doMock('axios', () => ({
      isAxiosError: jest.fn().mockReturnValue(true)
    }))

    mockCreateBlessingPrompt.mockReturnValue(mockPrompt)
    mockGenerateBlessing.mockRejectedValue(axiosError)

    const mockRequest = {
      json: jest.fn().mockResolvedValue(requestBody)
    } as unknown as NextRequest

    const response = await POST(mockRequest)
    const responseData = await response.json()

    expect(response.status).toBe(500)
    expect(responseData.error).toBe('API配额已用完')
  })

  it('handles generic axios errors', async () => {
    const requestBody = {
      scenario: 'birthday',
      festival: '',
      targetPerson: 'friend',
      useSmartMode: false
    }

    const mockPrompt = '请生成生日祝福语'
    const axiosError = {
      isAxiosError: true,
      message: '网络连接失败'
    }

    jest.doMock('axios', () => ({
      isAxiosError: jest.fn().mockReturnValue(true)
    }))

    mockCreateBlessingPrompt.mockReturnValue(mockPrompt)
    mockGenerateBlessing.mockRejectedValue(axiosError)

    const mockRequest = {
      json: jest.fn().mockResolvedValue(requestBody)
    } as unknown as NextRequest

    const response = await POST(mockRequest)
    const responseData = await response.json()

    expect(response.status).toBe(500)
    expect(responseData.error).toBe('网络连接失败')
  })

  it('handles request parsing errors', async () => {
    const mockRequest = {
      json: jest.fn().mockRejectedValue(new Error('Invalid JSON'))
    } as unknown as NextRequest

    const response = await POST(mockRequest)
    const responseData = await response.json()

    expect(response.status).toBe(500)
    expect(responseData.error).toBe('Invalid JSON')
  })

  it('logs errors to console', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    const requestBody = {
      scenario: 'birthday',
      festival: '',
      targetPerson: 'friend',
      useSmartMode: false
    }

    const mockPrompt = '请生成生日祝福语'
    const error = new Error('测试错误')

    mockCreateBlessingPrompt.mockReturnValue(mockPrompt)
    mockGenerateBlessing.mockRejectedValue(error)

    const mockRequest = {
      json: jest.fn().mockResolvedValue(requestBody)
    } as unknown as NextRequest

    await POST(mockRequest)

    expect(consoleSpy).toHaveBeenCalledWith('生成祝福语失败:', error)
    
    consoleSpy.mockRestore()
  })
})