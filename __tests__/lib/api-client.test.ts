import { generateBlessing } from '@/lib/api-client'

// Mock fetch globally
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>

describe('api-client', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('generateBlessing', () => {
    it('successfully generates blessing with smart mode options', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          blessing: '祝你生日快乐，身体健康！'
        })
      }
      mockFetch.mockResolvedValue(mockResponse as any)

      const options = {
        scenario: '',
        festival: '',
        targetPerson: '',
        customDescription: '为朋友的生日祝福',
        useSmartMode: true
      }

      const result = await generateBlessing(options)

      expect(mockFetch).toHaveBeenCalledWith('/api/blessing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      })

      expect(result).toBe('祝你生日快乐，身体健康！')
    })

    it('successfully generates blessing with template mode options', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          blessing: '祝你在新的一年里工作顺利！'
        })
      }
      mockFetch.mockResolvedValue(mockResponse as any)

      const options = {
        scenario: 'birthday',
        festival: 'spring-festival',
        targetPerson: 'colleague',
        style: 'formal',
        useSmartMode: false
      }

      const result = await generateBlessing(options)

      expect(mockFetch).toHaveBeenCalledWith('/api/blessing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      })

      expect(result).toBe('祝你在新的一年里工作顺利！')
    })

    it('throws error when API returns error response', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        json: jest.fn().mockResolvedValue({
          error: 'AI服务暂时不可用'
        })
      }
      mockFetch.mockResolvedValue(mockResponse as any)

      const options = {
        scenario: 'birthday',
        festival: '',
        targetPerson: 'friend',
        customDescription: '生日祝福',
        useSmartMode: true
      }

      await expect(generateBlessing(options)).rejects.toThrow('AI服务暂时不可用')
    })

    it('throws generic error when API response has no error message', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        json: jest.fn().mockResolvedValue({})
      }
      mockFetch.mockResolvedValue(mockResponse as any)

      const options = {
        scenario: 'birthday',
        festival: '',
        targetPerson: 'friend',
        useSmartMode: false
      }

      await expect(generateBlessing(options)).rejects.toThrow('生成祝福语失败')
    })

    it('handles network errors', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'))

      const options = {
        scenario: 'birthday',
        festival: '',
        targetPerson: 'friend',
        useSmartMode: false
      }

      await expect(generateBlessing(options)).rejects.toThrow('Network error')
    })

    it('handles JSON parsing errors', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON'))
      }
      mockFetch.mockResolvedValue(mockResponse as any)

      const options = {
        scenario: 'birthday',
        festival: '',
        targetPerson: 'friend',
        useSmartMode: false
      }

      await expect(generateBlessing(options)).rejects.toThrow('Invalid JSON')
    })

    it('logs API call failures to console', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      mockFetch.mockRejectedValue(new Error('Network error'))

      const options = {
        scenario: 'birthday',
        festival: '',
        targetPerson: 'friend',
        useSmartMode: false
      }

      try {
        await generateBlessing(options)
      } catch (error) {
        // Expected to throw
      }

      expect(consoleSpy).toHaveBeenCalledWith('API调用失败:', new Error('Network error'))
      
      consoleSpy.mockRestore()
    })
  })
})