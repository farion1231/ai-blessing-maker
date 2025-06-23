import axios from 'axios'
import { callAI, generateBlessing } from '@/lib/ai-service'

// Mock axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('ai-service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Clear environment variables
    delete process.env.PRIMARY_AI_API_KEY
    delete process.env.PRIMARY_AI_BASE_URL
    delete process.env.PRIMARY_AI_MODEL
    delete process.env.FALLBACK_AI_API_KEY
    delete process.env.FALLBACK_AI_BASE_URL
    delete process.env.FALLBACK_AI_MODEL
    delete process.env.ENABLE_FALLBACK
    delete process.env.AI_MAX_TOKENS
    delete process.env.AI_TEMPERATURE
    delete process.env.AI_TIMEOUT
  })

  describe('callAI', () => {
    it('successfully calls AI API with correct parameters', async () => {
      const config = {
        apiKey: 'test-api-key',
        baseUrl: 'https://api.test.com',
        model: 'test-model'
      }
      const prompt = '生成一个生日祝福语'
      const expectedResponse = '祝你生日快乐！'

      mockedAxios.post.mockResolvedValue({
        data: {
          choices: [
            {
              message: {
                content: expectedResponse
              }
            }
          ]
        }
      })

      const result = await callAI(config, prompt)

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://api.test.com/chat/completions',
        {
          model: 'test-model',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1000, // default value
          temperature: 0.7, // default value
          stream: false,
        },
        {
          headers: {
            Authorization: 'Bearer test-api-key',
            'Content-Type': 'application/json',
          },
          timeout: 30000, // default value
        }
      )

      expect(result).toBe(expectedResponse)
    })

    it('uses environment variable values for AI parameters', async () => {
      process.env.AI_MAX_TOKENS = '1500'
      process.env.AI_TEMPERATURE = '0.9'
      process.env.AI_TIMEOUT = '60000'

      const config = {
        apiKey: 'test-api-key',
        baseUrl: 'https://api.test.com',
        model: 'test-model'
      }
      const prompt = '测试提示'

      mockedAxios.post.mockResolvedValue({
        data: {
          choices: [{ message: { content: '测试回复' } }]
        }
      })

      await callAI(config, prompt)

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          max_tokens: 1500,
          temperature: 0.9,
        }),
        expect.objectContaining({
          timeout: 60000,
        })
      )
    })

    it('throws error when API call fails', async () => {
      const config = {
        apiKey: 'test-api-key',
        baseUrl: 'https://api.test.com',
        model: 'test-model'
      }
      const prompt = '测试提示'

      mockedAxios.post.mockRejectedValue(new Error('API调用失败'))

      await expect(callAI(config, prompt)).rejects.toThrow('API调用失败')
    })
  })

  describe('generateBlessing', () => {
    it('successfully generates blessing with primary API', async () => {
      process.env.PRIMARY_AI_API_KEY = 'primary-key'
      process.env.PRIMARY_AI_BASE_URL = 'https://api.primary.com'
      process.env.PRIMARY_AI_MODEL = 'primary-model'

      const prompt = '生成祝福语'
      const expectedBlessing = '祝福语内容'

      mockedAxios.post.mockResolvedValue({
        data: {
          choices: [{ message: { content: expectedBlessing } }]
        }
      })

      const result = await generateBlessing(prompt)

      expect(result).toBe(expectedBlessing)
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://api.primary.com/chat/completions',
        expect.any(Object),
        expect.any(Object)
      )
    })

    it('falls back to secondary API when primary fails and fallback is enabled', async () => {
      process.env.PRIMARY_AI_API_KEY = 'primary-key'
      process.env.PRIMARY_AI_BASE_URL = 'https://api.primary.com'
      process.env.PRIMARY_AI_MODEL = 'primary-model'
      process.env.FALLBACK_AI_API_KEY = 'fallback-key'
      process.env.FALLBACK_AI_BASE_URL = 'https://api.fallback.com'
      process.env.FALLBACK_AI_MODEL = 'fallback-model'
      process.env.ENABLE_FALLBACK = 'true'

      const prompt = '生成祝福语'
      const expectedBlessing = '备用API祝福语'

      mockedAxios.post
        .mockRejectedValueOnce(new Error('Primary API failed'))
        .mockResolvedValueOnce({
          data: {
            choices: [{ message: { content: expectedBlessing } }]
          }
        })

      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

      const result = await generateBlessing(prompt)

      expect(result).toBe(expectedBlessing)
      expect(mockedAxios.post).toHaveBeenCalledTimes(2)
      expect(consoleSpy).toHaveBeenCalledWith('主力API调用失败:', expect.any(Error))
      
      consoleSpy.mockRestore()
    })

    it('throws error when primary fails and fallback is disabled', async () => {
      process.env.PRIMARY_AI_API_KEY = 'primary-key'
      process.env.FALLBACK_AI_API_KEY = 'fallback-key'
      process.env.ENABLE_FALLBACK = 'false'

      const prompt = '生成祝福语'
      const primaryError = new Error('Primary API failed')

      mockedAxios.post.mockRejectedValue(primaryError)

      await expect(generateBlessing(prompt)).rejects.toThrow('Primary API failed')
    })

    it('throws error when no API is configured', async () => {
      const prompt = '生成祝福语'

      await expect(generateBlessing(prompt)).rejects.toThrow('未配置任何AI API，请检查环境变量')
    })

    it('throws error when both APIs fail', async () => {
      process.env.PRIMARY_AI_API_KEY = 'primary-key'
      process.env.FALLBACK_AI_API_KEY = 'fallback-key'
      process.env.ENABLE_FALLBACK = 'true'

      const prompt = '生成祝福语'

      mockedAxios.post
        .mockRejectedValueOnce(new Error('Primary API failed'))
        .mockRejectedValueOnce(new Error('Fallback API failed'))

      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

      await expect(generateBlessing(prompt)).rejects.toThrow('Fallback API failed')
      
      expect(consoleSpy).toHaveBeenCalledWith('主力API调用失败:', expect.any(Error))
      expect(consoleErrorSpy).toHaveBeenCalledWith('备用API调用失败:', expect.any(Error))
      
      consoleSpy.mockRestore()
      consoleErrorSpy.mockRestore()
    })

    it('uses default URLs when not specified', async () => {
      process.env.PRIMARY_AI_API_KEY = 'primary-key'
      // No BASE_URL specified, should use default

      const prompt = '生成祝福语'

      mockedAxios.post.mockResolvedValue({
        data: {
          choices: [{ message: { content: '祝福语' } }]
        }
      })

      await generateBlessing(prompt)

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://api.deepseek.com/chat/completions',
        expect.any(Object),
        expect.any(Object)
      )
    })

    it('uses default models when not specified', async () => {
      process.env.PRIMARY_AI_API_KEY = 'primary-key'
      // No MODEL specified, should use default

      const prompt = '生成祝福语'

      mockedAxios.post.mockResolvedValue({
        data: {
          choices: [{ message: { content: '祝福语' } }]
        }
      })

      await generateBlessing(prompt)

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          model: 'deepseek-chat'
        }),
        expect.any(Object)
      )
    })
  })
})