import { render, screen, fireEvent } from '../setup/test-utils'
import RecommendationTags from '@/components/RecommendationTags'
import { RecommendationItem } from '@/lib/config'

describe('RecommendationTags', () => {
  const mockRecommendations: RecommendationItem[] = [
    {
      id: '1',
      scenario: '生日',
      targetPerson: '朋友',
      style: '温馨',
      emoji: '🎂',
      description: '温馨的生日祝福'
    },
    {
      id: '2',
      scenario: '结婚',
      targetPerson: '同事',
      style: '正式',
      emoji: '💒',
      description: '正式的结婚祝福'
    },
    {
      id: '3',
      scenario: '升职',
      targetPerson: '老板',
      style: '恭敬',
      emoji: '🎉',
      description: '恭敬的升职祝福'
    }
  ]

  const mockOnApply = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders nothing when recommendations array is empty', () => {
    const { container } = render(
      <RecommendationTags
        recommendations={[]}
        onApply={mockOnApply}
      />
    )
    
    expect(container.firstChild).toBeNull()
  })

  it('renders recommendation title and buttons', () => {
    render(
      <RecommendationTags
        recommendations={mockRecommendations}
        onApply={mockOnApply}
      />
    )
    
    expect(screen.getByText('🌟 智能推荐')).toBeInTheDocument()
    expect(screen.getByText('生日 · 朋友 · 温馨')).toBeInTheDocument()
    expect(screen.getByText('结婚 · 同事 · 正式')).toBeInTheDocument()
    expect(screen.getByText('升职 · 老板 · 恭敬')).toBeInTheDocument()
  })

  it('displays emoji for each recommendation', () => {
    render(
      <RecommendationTags
        recommendations={mockRecommendations}
        onApply={mockOnApply}
      />
    )
    
    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toHaveTextContent('🎂')
    expect(buttons[1]).toHaveTextContent('💒')
    expect(buttons[2]).toHaveTextContent('🎉')
  })

  it('calls onApply when recommendation button is clicked', () => {
    render(
      <RecommendationTags
        recommendations={mockRecommendations}
        onApply={mockOnApply}
      />
    )
    
    const firstButton = screen.getByText('生日 · 朋友 · 温馨').closest('button')
    fireEvent.click(firstButton!)
    
    expect(mockOnApply).toHaveBeenCalledWith(mockRecommendations[0])
  })

  it('sets title attribute with description', () => {
    render(
      <RecommendationTags
        recommendations={mockRecommendations}
        onApply={mockOnApply}
      />
    )
    
    const firstButton = screen.getByText('生日 · 朋友 · 温馨').closest('button')
    expect(firstButton).toHaveAttribute('title', '温馨的生日祝福')
  })

  it('limits display to maximum 6 recommendations', () => {
    const manyRecommendations = Array.from({ length: 10 }, (_, i) => ({
      id: String(i + 1),
      scenario: `场景${i + 1}`,
      targetPerson: `对象${i + 1}`,
      style: `风格${i + 1}`,
      emoji: '🎯',
      description: `描述${i + 1}`
    }))
    
    render(
      <RecommendationTags
        recommendations={manyRecommendations}
        onApply={mockOnApply}
      />
    )
    
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(6)
  })

  it('handles click events for multiple recommendations', () => {
    render(
      <RecommendationTags
        recommendations={mockRecommendations}
        onApply={mockOnApply}
      />
    )
    
    const buttons = screen.getAllByRole('button')
    
    fireEvent.click(buttons[0])
    expect(mockOnApply).toHaveBeenCalledWith(mockRecommendations[0])
    
    fireEvent.click(buttons[1])
    expect(mockOnApply).toHaveBeenCalledWith(mockRecommendations[1])
    
    expect(mockOnApply).toHaveBeenCalledTimes(2)
  })
})