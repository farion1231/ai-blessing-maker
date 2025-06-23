import { render, screen } from '../setup/test-utils'
import EmptyState from '@/components/EmptyState'

describe('EmptyState', () => {
  it('renders empty state message', () => {
    render(<EmptyState />)
    
    expect(screen.getByText('选择选项后点击生成按钮')).toBeInTheDocument()
    expect(screen.getByText(/AI将为您生成专属的祝福语/)).toBeInTheDocument()
  })

  it('applies correct CSS classes for styling', () => {
    render(<EmptyState />)
    
    const container = screen.getByText('选择选项后点击生成按钮').closest('div')
    expect(container).toHaveClass('text-center', 'py-8', 'relative')
  })

  it('renders decorative emojis', () => {
    render(<EmptyState />)
    
    // Check for various emojis in the component
    expect(screen.getByText('🎊')).toBeInTheDocument()
    expect(screen.getByText('🎉')).toBeInTheDocument()
    expect(screen.getByText('🎈')).toBeInTheDocument()
    expect(screen.getByText('🎁')).toBeInTheDocument()
  })

  it('has proper accessibility attributes for decorative elements', () => {
    render(<EmptyState />)
    
    // Decorative elements should have aria-hidden
    const decorativeEmojis = screen.getAllByText('🎊')[0].closest('div')
    expect(decorativeEmojis).toHaveAttribute('aria-hidden', 'true')
  })
})