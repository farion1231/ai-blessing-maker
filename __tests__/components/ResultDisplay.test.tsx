import { render, screen, fireEvent } from '../setup/test-utils'
import ResultDisplay from '@/components/ResultDisplay'
import { BlessingOptions } from '@/lib/api-client'

describe('ResultDisplay', () => {
  const mockOptions: BlessingOptions = {
    useSmartMode: false,
    scenario: '生日',
    festival: '',
    targetPerson: '朋友',
    style: '温馨',
    customDescription: ''
  }

  const defaultProps = {
    blessing: '',
    error: '',
    options: mockOptions,
    loading: false,
    copySuccess: false,
    copyFading: false,
    onCopy: jest.fn(),
    onRegenerate: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders title correctly', () => {
    render(<ResultDisplay {...defaultProps} />)
    
    expect(screen.getByText('生成结果')).toBeInTheDocument()
  })

  it('shows empty state when no blessing is available', () => {
    render(<ResultDisplay {...defaultProps} />)
    
    expect(screen.getByText(/选择选项后点击生成按钮/i)).toBeInTheDocument()
  })

  it('shows error message when error exists', () => {
    render(
      <ResultDisplay
        {...defaultProps}
        error="API调用失败"
      />
    )
    
    expect(screen.getByRole('alert')).toHaveTextContent('API调用失败')
  })

  it('shows blessing result when blessing is available', () => {
    const blessing = '祝你生日快乐，天天开心！'
    
    render(
      <ResultDisplay
        {...defaultProps}
        blessing={blessing}
      />
    )
    
    expect(screen.getByText(blessing)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /复制生成的祝福语到剪贴板/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /重新生成祝福语/i })).toBeInTheDocument()
  })

  it('calls onCopy when copy button is clicked', () => {
    const onCopy = jest.fn()
    
    render(
      <ResultDisplay
        {...defaultProps}
        blessing="测试祝福语"
        onCopy={onCopy}
      />
    )
    
    const copyButton = screen.getByRole('button', { name: /复制生成的祝福语到剪贴板/i })
    fireEvent.click(copyButton)
    
    expect(onCopy).toHaveBeenCalledTimes(1)
  })

  it('calls onRegenerate when regenerate button is clicked', () => {
    const onRegenerate = jest.fn()
    
    render(
      <ResultDisplay
        {...defaultProps}
        blessing="测试祝福语"
        onRegenerate={onRegenerate}
      />
    )
    
    const regenerateButton = screen.getByRole('button', { name: /重新生成祝福语/i })
    fireEvent.click(regenerateButton)
    
    expect(onRegenerate).toHaveBeenCalledTimes(1)
  })

  it('shows copy success message when copySuccess is true', () => {
    render(
      <ResultDisplay
        {...defaultProps}
        blessing="测试祝福语"
        copySuccess={true}
      />
    )
    
    expect(screen.getByText(/祝福语已复制到剪贴板！快去分享这份温暖吧~/)).toBeInTheDocument()
  })

  it('applies fade-in class when copySuccess is true and not fading', () => {
    render(
      <ResultDisplay
        {...defaultProps}
        blessing="测试祝福语"
        copySuccess={true}
        copyFading={false}
      />
    )
    
    const successMessage = screen.getByText(/祝福语已复制到剪贴板！快去分享这份温暖吧~/).closest('.fade-in')
    expect(successMessage).toHaveClass('fade-in')
  })

  it('applies fade-out class when copySuccess is true and fading', () => {
    render(
      <ResultDisplay
        {...defaultProps}
        blessing="测试祝福语"
        copySuccess={true}
        copyFading={true}
      />
    )
    
    const successMessage = screen.getByText(/祝福语已复制到剪贴板！快去分享这份温暖吧~/).closest('.fade-out')
    expect(successMessage).toHaveClass('fade-out')
  })

  it('does not show copy success message when copySuccess is false', () => {
    render(
      <ResultDisplay
        {...defaultProps}
        blessing="测试祝福语"
        copySuccess={false}
      />
    )
    
    expect(screen.queryByText(/祝福语已复制到剪贴板！快去分享这份温暖吧~/)).not.toBeInTheDocument()
  })

  it('shows both error and blessing when both exist', () => {
    render(
      <ResultDisplay
        {...defaultProps}
        blessing="测试祝福语"
        error="警告信息"
      />
    )
    
    expect(screen.getByText('测试祝福语')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('警告信息')
  })
})