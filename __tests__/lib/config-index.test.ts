import { 
  occasions, 
  targetPersons, 
  styles, 
  scenarios, 
  festivals,
  popularCombinations,
  getDateBasedRecommendations,
  type RecommendationItem
} from '@/lib/config'

describe('config/index', () => {
  describe('re-exports', () => {
    it('exports occasions from occasions.ts', () => {
      expect(occasions).toBeDefined()
      expect(Array.isArray(occasions)).toBe(true)
      expect(occasions.length).toBeGreaterThan(0)
    })

    it('exports targetPersons from occasions.ts', () => {
      expect(targetPersons).toBeDefined()
      expect(Array.isArray(targetPersons)).toBe(true)
      expect(targetPersons.length).toBeGreaterThan(0)
    })

    it('exports styles from occasions.ts', () => {
      expect(styles).toBeDefined()
      expect(Array.isArray(styles)).toBe(true)
      expect(styles.length).toBeGreaterThan(0)
    })

    it('exports popularCombinations from recommendations.ts', () => {
      expect(popularCombinations).toBeDefined()
      expect(Array.isArray(popularCombinations)).toBe(true)
    })

    it('exports getDateBasedRecommendations from recommendations.ts', () => {
      expect(getDateBasedRecommendations).toBeDefined()
      expect(typeof getDateBasedRecommendations).toBe('function')
    })
  })

  describe('scenarios filtering', () => {
    it('filters occasions by life moment categories', () => {
      expect(scenarios).toBeDefined()
      expect(Array.isArray(scenarios)).toBe(true)
      
      // All scenarios should be from the filtered categories
      scenarios.forEach(scenario => {
        expect(['人生时刻', '成就庆祝', '生活祝福']).toContain(scenario.category)
      })
    })

    it('excludes festival categories from scenarios', () => {
      scenarios.forEach(scenario => {
        expect(['传统节日', '现代节日']).not.toContain(scenario.category)
      })
    })

    it('contains expected structure for each scenario', () => {
      if (scenarios.length > 0) {
        const scenario = scenarios[0]
        expect(scenario).toHaveProperty('value')
        expect(scenario).toHaveProperty('label')
        expect(scenario).toHaveProperty('category')
        expect(typeof scenario.value).toBe('string')
        expect(typeof scenario.label).toBe('string')
        expect(typeof scenario.category).toBe('string')
      }
    })
  })

  describe('festivals filtering', () => {
    it('includes default "无特定节日" option', () => {
      expect(festivals).toBeDefined()
      expect(Array.isArray(festivals)).toBe(true)
      expect(festivals.length).toBeGreaterThan(0)
      
      const defaultOption = festivals[0]
      expect(defaultOption).toEqual({ value: "", label: "无特定节日" })
    })

    it('filters occasions by festival categories', () => {
      const festivalOccasions = festivals.slice(1) // Skip the default option
      
      festivalOccasions.forEach(festival => {
        expect(['传统节日', '现代节日']).toContain(festival.category)
      })
    })

    it('excludes non-festival categories from festivals', () => {
      const festivalOccasions = festivals.slice(1) // Skip the default option
      
      festivalOccasions.forEach(festival => {
        expect(['人生时刻', '成就庆祝', '生活祝福']).not.toContain(festival.category)
      })
    })

    it('contains expected structure for each festival', () => {
      if (festivals.length > 1) {
        const festival = festivals[1] // Skip default option
        expect(festival).toHaveProperty('value')
        expect(festival).toHaveProperty('label')
        expect(festival).toHaveProperty('category')
        expect(typeof festival.value).toBe('string')
        expect(typeof festival.label).toBe('string')
        expect(typeof festival.category).toBe('string')
      }
    })
  })

  describe('data consistency', () => {
    it('scenarios and festivals combined should cover all occasions', () => {
      const allFilteredOccasions = [...scenarios, ...festivals.slice(1)] // Exclude default option
      const originalOccasionValues = occasions.map(o => o.value).sort()
      const filteredOccasionValues = allFilteredOccasions.map(o => o.value).sort()
      
      expect(filteredOccasionValues).toEqual(originalOccasionValues)
    })

    it('scenarios and festivals should not overlap', () => {
      const scenarioValues = scenarios.map(s => s.value)
      const festivalValues = festivals.slice(1).map(f => f.value) // Exclude default option
      
      const overlap = scenarioValues.filter(value => festivalValues.includes(value))
      expect(overlap).toHaveLength(0)
    })
  })

  describe('function exports', () => {
    it('getDateBasedRecommendations returns array', () => {
      const result = getDateBasedRecommendations()
      expect(Array.isArray(result)).toBe(true)
    })

    it('getDateBasedRecommendations returns valid recommendation items', () => {
      const result = getDateBasedRecommendations()
      
      result.forEach((item: RecommendationItem) => {
        expect(item).toHaveProperty('id')
        expect(item).toHaveProperty('scenario')
        expect(item).toHaveProperty('targetPerson')
        expect(item).toHaveProperty('style')
        expect(item).toHaveProperty('emoji')
        expect(item).toHaveProperty('description')
        expect(typeof item.id).toBe('string')
        expect(typeof item.scenario).toBe('string')
        expect(typeof item.targetPerson).toBe('string')
        expect(typeof item.style).toBe('string')
        expect(typeof item.emoji).toBe('string')
        expect(typeof item.description).toBe('string')
      })
    })
  })
})