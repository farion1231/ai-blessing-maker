import { render, screen, fireEvent } from '../setup/test-utils'
import BlessingResult from '@/components/BlessingResult'

describe('BlessingResult', () => {
  const mockOnCopy = jest.fn()
  const mockOnRegenerate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders blessing text correctly', () => {
    const blessing = '祝你生日快乐，天天开心！'
    
    render(
      <BlessingResult
        blessing={blessing}
        loading={false}
        onCopy={mockOnCopy}
        onRegenerate={mockOnRegenerate}
      />
    )
    
    expect(screen.getByText(blessing)).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    render(
      <BlessingResult
        blessing="测试祝福语"
        loading={false}
        onCopy={mockOnCopy}
        onRegenerate={mockOnRegenerate}
      />
    )
    
    expect(screen.getByRole('button', { name: /复制生成的祝福语到剪贴板/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /重新生成祝福语/i })).toBeInTheDocument()
  })

  it('calls onCopy when copy button is clicked', () => {
    render(
      <BlessingResult
        blessing="测试祝福语"
        loading={false}
        onCopy={mockOnCopy}
        onRegenerate={mockOnRegenerate}
      />
    )
    
    const copyButton = screen.getByRole('button', { name: /复制生成的祝福语到剪贴板/i })
    fireEvent.click(copyButton)
    
    expect(mockOnCopy).toHaveBeenCalledTimes(1)
  })

  it('calls onRegenerate when regenerate button is clicked', () => {
    render(
      <BlessingResult
        blessing="测试祝福语"
        loading={false}
        onCopy={mockOnCopy}
        onRegenerate={mockOnRegenerate}
      />
    )
    
    const regenerateButton = screen.getByRole('button', { name: /重新生成祝福语/i })
    fireEvent.click(regenerateButton)
    
    expect(mockOnRegenerate).toHaveBeenCalledTimes(1)
  })

  it('disables regenerate button when loading', () => {
    render(
      <BlessingResult
        blessing="测试祝福语"
        loading={true}
        onCopy={mockOnCopy}
        onRegenerate={mockOnRegenerate}
      />
    )
    
    const regenerateButton = screen.getByRole('button', { name: /重新生成祝福语/i })
    expect(regenerateButton).toBeDisabled()
  })

  it('does not disable copy button when loading', () => {
    render(
      <BlessingResult
        blessing="测试祝福语"
        loading={true}
        onCopy={mockOnCopy}
        onRegenerate={mockOnRegenerate}
      />
    )
    
    const copyButton = screen.getByRole('button', { name: /复制生成的祝福语到剪贴板/i })
    expect(copyButton).not.toBeDisabled()
  })
})