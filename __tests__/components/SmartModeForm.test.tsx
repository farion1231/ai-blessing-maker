import { render, screen, fireEvent } from '../setup/test-utils'
import SmartModeForm from '@/components/SmartModeForm'
import { BlessingOptions } from '@/lib/api-client'

describe('SmartModeForm', () => {
  const mockOptions: BlessingOptions = {
    useSmartMode: true,
    scenario: '',
    festival: '',
    targetPerson: '',
    style: '',
    customDescription: ''
  }

  const mockOnOptionsChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders form elements correctly', () => {
    render(
      <SmartModeForm
        options={mockOptions}
        onOptionsChange={mockOnOptionsChange}
      />
    )
    
    expect(screen.getByLabelText(/描述你的祝福需求/)).toBeInTheDocument()
    expect(screen.getByText(/智能提示/)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/例如：给室友小王发生日祝福/i)).toBeInTheDocument()
  })

  it('displays current description value', () => {
    const optionsWithDescription = {
      ...mockOptions,
      customDescription: '给朋友的生日祝福'
    }
    
    render(
      <SmartModeForm
        options={optionsWithDescription}
        onOptionsChange={mockOnOptionsChange}
      />
    )
    
    const textarea = screen.getByLabelText(/描述你的祝福需求/)
    expect(textarea).toHaveValue('给朋友的生日祝福')
  })

  it('handles empty description gracefully', () => {
    render(
      <SmartModeForm
        options={mockOptions}
        onOptionsChange={mockOnOptionsChange}
      />
    )
    
    const textarea = screen.getByLabelText(/描述你的祝福需求/)
    expect(textarea).toHaveValue('')
  })

  it('calls onOptionsChange when description changes', () => {
    render(
      <SmartModeForm
        options={mockOptions}
        onOptionsChange={mockOnOptionsChange}
      />
    )
    
    const textarea = screen.getByLabelText(/描述你的祝福需求/)
    fireEvent.change(textarea, { target: { value: '新的描述内容' } })
    
    expect(mockOnOptionsChange).toHaveBeenCalledWith({
      ...mockOptions,
      customDescription: '新的描述内容'
    })
  })

  it('preserves other options when updating description', () => {
    const existingOptions = {
      ...mockOptions,
      scenario: '生日',
      targetPerson: '朋友'
    }
    
    render(
      <SmartModeForm
        options={existingOptions}
        onOptionsChange={mockOnOptionsChange}
      />
    )
    
    const textarea = screen.getByLabelText(/描述你的祝福需求/)
    fireEvent.change(textarea, { target: { value: '更新的描述' } })
    
    expect(mockOnOptionsChange).toHaveBeenCalledWith({
      ...existingOptions,
      customDescription: '更新的描述'
    })
  })

  it('has proper label-textarea association', () => {
    render(
      <SmartModeForm
        options={mockOptions}
        onOptionsChange={mockOnOptionsChange}
      />
    )
    
    const label = screen.getByText(/描述你的祝福需求/)
    const textarea = screen.getByLabelText(/描述你的祝福需求/)
    
    expect(label.closest('label')).toHaveAttribute('for', 'custom-description')
    expect(textarea).toHaveAttribute('id', 'custom-description')
  })

  it('shows intelligent tip section', () => {
    render(
      <SmartModeForm
        options={mockOptions}
        onOptionsChange={mockOnOptionsChange}
      />
    )
    
    expect(screen.getByText(/告诉我对象、关系、场景等信息，我会生成个性化祝福/)).toBeInTheDocument()
  })

  it('handles multiple onChange events correctly', () => {
    render(
      <SmartModeForm
        options={mockOptions}
        onOptionsChange={mockOnOptionsChange}
      />
    )
    
    const textarea = screen.getByLabelText(/描述你的祝福需求/)
    
    fireEvent.change(textarea, { target: { value: '第一次输入' } })
    fireEvent.change(textarea, { target: { value: '第二次输入' } })
    
    expect(mockOnOptionsChange).toHaveBeenCalledTimes(2)
    expect(mockOnOptionsChange).toHaveBeenLastCalledWith({
      ...mockOptions,
      customDescription: '第二次输入'
    })
  })
})