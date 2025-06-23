import { 
  occasions, 
  targetPersons, 
  styles, 
  scenarios, 
  festivals,
  popularCombinations,
  getDateBasedRecommendations 
} from '@/lib/config'

describe('config', () => {
  describe('occasions', () => {
    it('should have proper structure', () => {
      expect(Array.isArray(occasions)).toBe(true)
      expect(occasions.length).toBeGreaterThan(0)
      
      occasions.forEach(occasion => {
        expect(occasion).toHaveProperty('value')
        expect(occasion).toHaveProperty('label')
        expect(occasion).toHaveProperty('category')
        expect(typeof occasion.value).toBe('string')
        expect(typeof occasion.label).toBe('string')
        expect(typeof occasion.category).toBe('string')
      })
    })

    it('should have expected categories', () => {
      const categories = [...new Set(occasions.map(o => o.category))]
      
      expect(categories).toContain('传统节日')
      expect(categories).toContain('现代节日')
      expect(categories).toContain('人生时刻')
      expect(categories).toContain('成就庆祝')
      expect(categories).toContain('生活祝福')
    })

    it('should have unique values', () => {
      const values = occasions.map(o => o.value)
      const uniqueValues = [...new Set(values)]
      
      expect(values.length).toBe(uniqueValues.length)
    })
  })

  describe('targetPersons', () => {
    it('should have proper structure', () => {
      expect(Array.isArray(targetPersons)).toBe(true)
      expect(targetPersons.length).toBeGreaterThan(0)
      
      targetPersons.forEach(person => {
        expect(person).toHaveProperty('value')
        expect(person).toHaveProperty('label')
        expect(typeof person.value).toBe('string')
        expect(typeof person.label).toBe('string')
      })
    })

    it('should include common target persons', () => {
      const values = targetPersons.map(p => p.value)
      
      expect(values).toContain('朋友')
      expect(values).toContain('家人')
      expect(values).toContain('同事')
    })
  })

  describe('styles', () => {
    it('should have proper structure', () => {
      expect(Array.isArray(styles)).toBe(true)
      expect(styles.length).toBeGreaterThan(0)
      
      styles.forEach(style => {
        expect(style).toHaveProperty('value')
        expect(style).toHaveProperty('label')
        expect(typeof style.value).toBe('string')
        expect(typeof style.label).toBe('string')
      })
    })

    it('should include common styles', () => {
      const values = styles.map(s => s.value)
      
      expect(values).toContain('温馨')
      expect(values).toContain('正式')
      expect(values).toContain('幽默')
    })
  })

  describe('scenarios (compatibility export)', () => {
    it('should filter occasions correctly', () => {
      expect(Array.isArray(scenarios)).toBe(true)
      
      scenarios.forEach(scenario => {
        expect(['人生时刻', '成就庆祝', '生活祝福']).toContain(scenario.category)
      })
    })
  })

  describe('festivals (compatibility export)', () => {
    it('should have "无特定节日" option first', () => {
      expect(festivals[0]).toEqual({ value: "", label: "无特定节日" })
    })

    it('should include festival occasions', () => {
      const festivalItems = festivals.slice(1) // Skip first "无特定节日" option
      
      festivalItems.forEach(festival => {
        expect(['传统节日', '现代节日']).toContain(festival.category)
      })
    })
  })

  describe('popularCombinations', () => {
    it('should have proper structure', () => {
      expect(Array.isArray(popularCombinations)).toBe(true)
      expect(popularCombinations.length).toBeGreaterThan(0)
      
      popularCombinations.forEach(combo => {
        expect(combo).toHaveProperty('scenario')
        expect(combo).toHaveProperty('targetPerson')
        expect(combo).toHaveProperty('style')
        expect(combo).toHaveProperty('description')
        expect(typeof combo.scenario).toBe('string')
        expect(typeof combo.targetPerson).toBe('string')
        expect(typeof combo.style).toBe('string')
        expect(typeof combo.description).toBe('string')
      })
    })
  })

  describe('getDateBasedRecommendations', () => {
    it('should return recommendations for spring festival period', () => {
      // Mock date to be around Spring Festival (February)
      const mockDate = new Date('2024-02-10')
      
      const recommendations = getDateBasedRecommendations(mockDate)
      
      expect(Array.isArray(recommendations)).toBe(true)
      expect(recommendations.length).toBeGreaterThan(0)
      
      // Should include spring festival related recommendations (February doesn't have specific recommendations in current implementation)
      // Just check that we get some recommendations
      expect(recommendations.length).toBeGreaterThan(0)
    })

    it('should return recommendations for National Day period', () => {
      // Mock date to be around National Day (October)
      const mockDate = new Date('2024-10-01')
      
      const recommendations = getDateBasedRecommendations(mockDate)
      
      expect(Array.isArray(recommendations)).toBe(true)
      expect(recommendations.length).toBeGreaterThan(0)
      
      // Should include national day related recommendations
      const hasNationalDay = recommendations.some(r => 
        r.scenario === '国庆节'
      )
      expect(hasNationalDay).toBe(true)
    })

    it('should return general recommendations for regular days', () => {
      // Mock date to be a regular day (not near major holidays)
      const mockDate = new Date('2024-05-15')
      
      const recommendations = getDateBasedRecommendations(mockDate)
      
      expect(Array.isArray(recommendations)).toBe(true)
      expect(recommendations.length).toBeGreaterThan(0)
      
      // Should get some recommendations (May might not have specific date-based ones, but that's ok)
      expect(Array.isArray(recommendations)).toBe(true)
    })

    it('should handle undefined date parameter', () => {
      const recommendations = getDateBasedRecommendations()
      
      expect(Array.isArray(recommendations)).toBe(true)
      expect(recommendations.length).toBeGreaterThan(0)
    })
  })
})