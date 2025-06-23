import { render, screen, fireEvent } from '../setup/test-utils'
import ErrorMessage from '@/components/ErrorMessage'

describe('ErrorMessage', () => {
  it('renders error message', () => {
    const errorMessage = '生成祝福语失败，请重试'
    
    render(<ErrorMessage message={errorMessage} />)
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const errorMessage = '网络连接失败'
    
    render(<ErrorMessage message={errorMessage} />)
    
    const container = screen.getByRole('alert')
    expect(container).toBeInTheDocument()
    expect(container).toHaveAttribute('aria-live', 'assertive')
  })

  it('applies error styling classes', () => {
    const errorMessage = '测试错误信息'
    
    render(<ErrorMessage message={errorMessage} />)
    
    const container = screen.getByRole('alert')
    expect(container).toHaveClass('bg-red-50', 'border-red-300', 'text-red-700')
  })

  it('renders error icon', () => {
    const errorMessage = '测试错误'
    
    render(<ErrorMessage message={errorMessage} />)
    
    // Look for the actual error icon used in the component
    expect(screen.getByText('❌')).toBeInTheDocument()
  })

  it('does not render any buttons in current implementation', () => {
    const errorMessage = '操作失败'
    
    render(<ErrorMessage message={errorMessage} />)
    
    // Current implementation doesn't have buttons
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})