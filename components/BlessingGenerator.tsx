'use client'

import { useState } from 'react'
import { scenarios, festivals, targetPersons, styles } from '@/lib/config'
import { generateBlessing, BlessingOptions } from '@/lib/api-client'
import BlessingForm from './BlessingForm'
import ResultDisplay from './ResultDisplay'

export default function BlessingGenerator() {
  const [options, setOptions] = useState<BlessingOptions>({
    scenario: scenarios[0].value,
    festival: festivals[0].value,
    targetPerson: targetPersons[0].value,
    style: styles[0].value,
  })
  
  const [blessing, setBlessing] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const result = await generateBlessing(options)
      setBlessing(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(blessing)
      alert('🎉 祝福语已复制到剪贴板！快去分享这份温暖吧~ ✨')
    } catch (err) {
      console.error('复制失败:', err)
      alert('❌ 复制失败，请手动选择文字复制')
    }
  }

  const handleReset = () => {
    setBlessing('')
    setError('')
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <BlessingForm
            options={options}
            loading={loading}
            hasBlessing={!!blessing}
            onOptionsChange={setOptions}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />

          <ResultDisplay
            blessing={blessing}
            error={error}
            options={options}
            loading={loading}
            onCopy={handleCopy}
            onRegenerate={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}