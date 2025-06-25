import { render, screen, fireEvent } from '../setup/test-utils'
import SelectInput from '@/components/SelectInput'

describe('SelectInput', () => {
  const mockOptions = [
    { value: 'option1', label: '选项1' },
    { value: 'option2', label: '选项2' },
    { value: 'option3', label: '选项3' }
  ]

  const defaultProps = {
    id: 'test-select',
    label: '测试标签',
    value: '',
    placeholder: '请选择选项',
    options: mockOptions,
    onChange: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders label and select element correctly', () => {
    render(<SelectInput {...defaultProps} />)
    
    expect(screen.getByLabelText('测试标签')).toBeInTheDocument()
    expect(screen.getByDisplayValue('请选择选项')).toBeInTheDocument()
  })

  it('renders all options including placeholder', () => {
    render(<SelectInput {...defaultProps} />)
    
    expect(screen.getByText('请选择选项')).toBeInTheDocument()
    expect(screen.getByText('选项1')).toBeInTheDocument()
    expect(screen.getByText('选项2')).toBeInTheDocument()
    expect(screen.getByText('选项3')).toBeInTheDocument()
  })

  it('displays selected value correctly', () => {
    render(
      <SelectInput
        {...defaultProps}
        value="option2"
      />
    )
    
    const select = screen.getByLabelText('测试标签')
    expect(select).toHaveValue('option2')
  })

  it('calls onChange when selection changes', () => {
    const onChange = jest.fn()
    
    render(
      <SelectInput
        {...defaultProps}
        onChange={onChange}
      />
    )
    
    const select = screen.getByLabelText('测试标签')
    fireEvent.change(select, { target: { value: 'option1' } })
    
    expect(onChange).toHaveBeenCalledWith('option1')
  })

  it('applies custom className when provided', () => {
    const { container } = render(
      <SelectInput
        {...defaultProps}
        className="custom-class"
      />
    )
    
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('custom-class')
  })

  it('has proper label-input association', () => {
    render(<SelectInput {...defaultProps} />)
    
    const label = screen.getByText('测试标签')
    const select = screen.getByLabelText('测试标签')
    
    expect(label).toHaveAttribute('for', 'test-select')
    expect(select).toHaveAttribute('id', 'test-select')
  })

  it('renders dropdown icon', () => {
    render(<SelectInput {...defaultProps} />)
    
    const icon = screen.getByRole('combobox').parentElement?.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('handles empty options array', () => {
    render(
      <SelectInput
        {...defaultProps}
        options={[]}
      />
    )
    
    expect(screen.getByText('请选择选项')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(1) // Only placeholder
  })

  it('triggers onChange with empty string when placeholder is selected', () => {
    const onChange = jest.fn()
    
    render(
      <SelectInput
        {...defaultProps}
        value="option1"
        onChange={onChange}
      />
    )
    
    const select = screen.getByLabelText('测试标签')
    fireEvent.change(select, { target: { value: '' } })
    
    expect(onChange).toHaveBeenCalledWith('')
  })
})