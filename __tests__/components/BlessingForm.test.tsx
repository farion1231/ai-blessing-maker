import { render, screen, fireEvent } from '../setup/test-utils'
import BlessingForm from '@/components/BlessingForm'
import { BlessingOptions } from '@/lib/api-client'

describe('BlessingForm', () => {
  const mockOptions: BlessingOptions = {
    useSmartMode: false,
    scenario: '',
    festival: '',
    targetPerson: '',
    style: '',
    customDescription: ''
  }

  const mockOnOptionsChange = jest.fn()
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockOnSubmit.mockImplementation((e) => e.preventDefault())
  })

  it('renders with template mode by default', () => {
    render(
      <BlessingForm
        options={mockOptions}
        loading={false}
        onOptionsChange={mockOnOptionsChange}
        onSubmit={mockOnSubmit}
      />
    )
    
    expect(screen.getByText('🎯 快速模板')).toBeInTheDocument()
    expect(screen.getByText('💬 智能描述')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /根据选择的设置生成个性化祝福语/i })).toBeInTheDocument()
  })

  it('switches to smart mode when smart mode button is clicked', () => {
    render(
      <BlessingForm
        options={mockOptions}
        loading={false}
        onOptionsChange={mockOnOptionsChange}
        onSubmit={mockOnSubmit}
      />
    )
    
    const smartModeButton = screen.getByText('💬 智能描述')
    fireEvent.click(smartModeButton)
    
    expect(mockOnOptionsChange).toHaveBeenCalledWith({
      ...mockOptions,
      useSmartMode: true,
      scenario: '',
      festival: '',
      targetPerson: '',
      style: ''
    })
  })

  it('switches to template mode when template mode button is clicked', () => {
    const smartModeOptions = { ...mockOptions, useSmartMode: true, customDescription: '测试描述' }
    
    render(
      <BlessingForm
        options={smartModeOptions}
        loading={false}
        onOptionsChange={mockOnOptionsChange}
        onSubmit={mockOnSubmit}
      />
    )
    
    const templateModeButton = screen.getByText('🎯 快速模板')
    fireEvent.click(templateModeButton)
    
    expect(mockOnOptionsChange).toHaveBeenCalledWith({
      ...smartModeOptions,
      useSmartMode: false,
      customDescription: ''
    })
  })

  it('shows loading state correctly', () => {
    render(
      <BlessingForm
        options={mockOptions}
        loading={true}
        onOptionsChange={mockOnOptionsChange}
        onSubmit={mockOnSubmit}
      />
    )
    
    const submitButton = screen.getByRole('button', { name: /正在生成祝福语，请稍候/i })
    expect(submitButton).toBeDisabled()
    expect(screen.getByText('🎊 生成中，请稍候...')).toBeInTheDocument()
  })

  it('disables submit button when required fields are missing in template mode', () => {
    render(
      <BlessingForm
        options={mockOptions}
        loading={false}
        onOptionsChange={mockOnOptionsChange}
        onSubmit={mockOnSubmit}
      />
    )
    
    const submitButton = screen.getByRole('button', { name: /根据选择的设置生成个性化祝福语/i })
    expect(submitButton).toBeDisabled()
  })

  it('disables submit button when description is empty in smart mode', () => {
    const smartModeOptions = { ...mockOptions, useSmartMode: true }
    
    render(
      <BlessingForm
        options={smartModeOptions}
        loading={false}
        onOptionsChange={mockOnOptionsChange}
        onSubmit={mockOnSubmit}
      />
    )
    
    const submitButton = screen.getByRole('button', { name: /根据你的描述生成个性化祝福语/i })
    expect(submitButton).toBeDisabled()
  })

  it('calls onSubmit when form is submitted', () => {
    const validOptions = { ...mockOptions, scenario: '生日', targetPerson: '朋友' }
    
    render(
      <BlessingForm
        options={validOptions}
        loading={false}
        onOptionsChange={mockOnOptionsChange}
        onSubmit={mockOnSubmit}
      />
    )
    
    const form = screen.getByRole('form')
    fireEvent.submit(form)
    
    expect(mockOnSubmit).toHaveBeenCalled()
  })

  it('has proper accessibility attributes', () => {
    render(
      <BlessingForm
        options={mockOptions}
        loading={false}
        onOptionsChange={mockOnOptionsChange}
        onSubmit={mockOnSubmit}
      />
    )
    
    expect(screen.getByRole('form')).toHaveAttribute('aria-label', '祝福语生成器设置表单')
  })
})