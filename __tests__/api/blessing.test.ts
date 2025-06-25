import { POST } from '@/app/api/blessing/route'
import { NextRequest } from 'next/server'
import * as aiService from '@/lib/ai-service'
import * as promptTemplates from '@/lib/prompt-templates'
import axios from 'axios'

// Mock dependencies
jest.mock('@/lib/ai-service')
jest.mock('@/lib/prompt-templates')
jest.mock('axios', () => ({
  isAxiosError: jest.fn()
}))

const mockGenerateBlessing = aiService.generateBlessing as jest.MockedFunction<
  typeof aiService.generateBlessing
>

const mockCreateBlessingPrompt = promptTemplates.createBlessingPrompt as jest.MockedFunction<
  typeof promptTemplates.createBlessingPrompt
>

const mockIsAxiosError = axios.isAxiosError as jest.MockedFunction<typeof axios.isAxiosError>

describe('/api/blessing', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset axios.isAxiosError to default behavior
    mockIsAxiosError.mockReturnValue(false)
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
    expect(responseData).toEqual({ error: '生成失败，请重试' })
  })

  it('handles axios 429 errors with rate limit message', async () => {
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
        status: 429,
        data: {
          error: {
            message: 'Rate limit exceeded'
          }
        }
      },
      message: 'Request failed'
    }

    // Mock axios.isAxiosError to return true
    mockIsAxiosError.mockReturnValue(true)

    mockCreateBlessingPrompt.mockReturnValue(mockPrompt)
    mockGenerateBlessing.mockRejectedValue(axiosError)

    const mockRequest = {
      json: jest.fn().mockResolvedValue(requestBody)
    } as unknown as NextRequest

    const response = await POST(mockRequest)
    const responseData = await response.json()

    expect(response.status).toBe(500)
    expect(responseData.error).toBe('请求太频繁，请稍后再试')
  })

  it('handles generic axios errors with default message', async () => {
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
        status: 500
      },
      message: '网络连接失败'
    }

    // Mock axios.isAxiosError to return true
    mockIsAxiosError.mockReturnValue(true)

    mockCreateBlessingPrompt.mockReturnValue(mockPrompt)
    mockGenerateBlessing.mockRejectedValue(axiosError)

    const mockRequest = {
      json: jest.fn().mockResolvedValue(requestBody)
    } as unknown as NextRequest

    const response = await POST(mockRequest)
    const responseData = await response.json()

    expect(response.status).toBe(500)
    expect(responseData.error).toBe('生成失败，请重试')
  })

  it('handles request parsing errors', async () => {
    const mockRequest = {
      json: jest.fn().mockRejectedValue(new Error('Invalid JSON'))
    } as unknown as NextRequest

    const response = await POST(mockRequest)
    const responseData = await response.json()

    expect(response.status).toBe(500)
    expect(responseData.error).toBe('生成失败，请重试')
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