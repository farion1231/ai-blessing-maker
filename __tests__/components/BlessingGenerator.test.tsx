import { render, screen, fireEvent, waitFor } from '../setup/test-utils'
import BlessingGenerator from '@/components/BlessingGenerator'
import * as apiClient from '@/lib/api-client'

// Mock the API client
jest.mock('@/lib/api-client', () => ({
  generateBlessing: jest.fn(),
}))

const mockGenerateBlessing = apiClient.generateBlessing as jest.MockedFunction<
  typeof apiClient.generateBlessing
>

describe('BlessingGenerator', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset clipboard mock
    navigator.clipboard.writeText = jest.fn(() => Promise.resolve())
  })

  it('renders both form and result sections', () => {
    render(<BlessingGenerator />)
    
    // Should have the form section with mode toggles
    expect(screen.getByText('🎯 快速模板')).toBeInTheDocument()
    expect(screen.getByText('💬 智能描述')).toBeInTheDocument()
    
    // Should have the result section (initially empty)
    expect(screen.getByText(/选择选项后点击生成按钮/i)).toBeInTheDocument()
  })

  it('shows loading state when generating blessing', async () => {
    mockGenerateBlessing.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve('测试祝福语'), 100))
    )

    render(<BlessingGenerator />)
    
    // Switch to smart mode and fill the form
    const smartModeTab = screen.getByText('💬 智能描述')
    fireEvent.click(smartModeTab)
    
    const textarea = screen.getByPlaceholderText(/例如：给室友小王发生日祝福/i)
    fireEvent.change(textarea, { target: { value: '生日祝福' } })
    
    const submitButton = screen.getByRole('button', { name: /根据你的描述生成个性化祝福语/i })
    fireEvent.click(submitButton)
    
    // Should show loading state
    expect(screen.getByText(/AI思考中.../i)).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
    
    // Wait for completion
    await waitFor(() => {
      expect(screen.getByText('测试祝福语')).toBeInTheDocument()
    })
  })

  it('displays error message when API call fails', async () => {
    mockGenerateBlessing.mockRejectedValue(new Error('API错误'))

    render(<BlessingGenerator />)
    
    // Switch to smart mode and submit
    const smartModeTab = screen.getByText('💬 智能描述')
    fireEvent.click(smartModeTab)
    
    const textarea = screen.getByPlaceholderText(/例如：给室友小王发生日祝福/i)
    fireEvent.change(textarea, { target: { value: '生日祝福' } })
    
    const submitButton = screen.getByRole('button', { name: /根据你的描述生成个性化祝福语/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/API错误/i)
    })
  })

  it('successfully copies blessing to clipboard', async () => {
    mockGenerateBlessing.mockResolvedValue('测试祝福语内容')

    render(<BlessingGenerator />)
    
    // Generate a blessing first
    const smartModeTab = screen.getByText('💬 智能描述')
    fireEvent.click(smartModeTab)
    
    const textarea = screen.getByPlaceholderText(/例如：给室友小王发生日祝福/i)
    fireEvent.change(textarea, { target: { value: '生日祝福' } })
    
    const submitButton = screen.getByRole('button', { name: /根据你的描述生成个性化祝福语/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('测试祝福语内容')).toBeInTheDocument()
    })
    
    // Click copy button
    const copyButton = screen.getByRole('button', { name: /复制生成的祝福语到剪贴板/i })
    fireEvent.click(copyButton)
    
    // Verify clipboard was called
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('测试祝福语内容')
    
    // Should show success message
    await waitFor(() => {
      expect(screen.getByText(/已复制到剪贴板/i)).toBeInTheDocument()
    })
  })

  it('handles clipboard copy failure gracefully', async () => {
    mockGenerateBlessing.mockResolvedValue('测试祝福语内容')
    // Mock clipboard failure
    navigator.clipboard.writeText = jest.fn(() => Promise.reject(new Error('复制失败')))

    render(<BlessingGenerator />)
    
    // Generate a blessing first
    const smartModeTab = screen.getByText('💬 智能描述')
    fireEvent.click(smartModeTab)
    
    const textarea = screen.getByPlaceholderText(/例如：给室友小王发生日祝福/i)
    fireEvent.change(textarea, { target: { value: '生日祝福' } })
    
    const submitButton = screen.getByRole('button', { name: /根据你的描述生成个性化祝福语/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('测试祝福语内容')).toBeInTheDocument()
    })
    
    // Click copy button
    const copyButton = screen.getByRole('button', { name: /复制生成的祝福语到剪贴板/i })
    fireEvent.click(copyButton)
    
    // Should show error message
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/复制失败，请手动选择文字复制/i)
    })
  })

  it('regenerates blessing when regenerate button is clicked', async () => {
    mockGenerateBlessing
      .mockResolvedValueOnce('第一次生成的祝福语')
      .mockResolvedValueOnce('重新生成的祝福语')

    render(<BlessingGenerator />)
    
    // Generate initial blessing
    const smartModeTab = screen.getByText('💬 智能描述')
    fireEvent.click(smartModeTab)
    
    const textarea = screen.getByPlaceholderText(/例如：给室友小王发生日祝福/i)
    fireEvent.change(textarea, { target: { value: '生日祝福' } })
    
    const submitButton = screen.getByRole('button', { name: /根据你的描述生成个性化祝福语/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('第一次生成的祝福语')).toBeInTheDocument()
    })
    
    // Click regenerate
    const regenerateButton = screen.getByRole('button', { name: /重新生成祝福语/i })
    fireEvent.click(regenerateButton)
    
    await waitFor(() => {
      expect(screen.getByText('重新生成的祝福语')).toBeInTheDocument()
    })
    
    expect(mockGenerateBlessing).toHaveBeenCalledTimes(2)
  })

  it('provides accessibility features', () => {
    render(<BlessingGenerator />)
    
    // Should have aria-live region for screen readers (it's a div with sr-only class)
    const ariaLiveRegion = document.querySelector('[aria-live="polite"]')
    expect(ariaLiveRegion).toBeInTheDocument()
  })
})