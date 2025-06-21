'use client'

import { useState } from 'react'
import { occasions, targetPersons, styles } from '@/lib/config'
import { generateBlessing, BlessingOptions } from '@/lib/api-client'
import BlessingForm from './BlessingForm'
import ResultDisplay from './ResultDisplay'

export default function BlessingGenerator() {
  const [options, setOptions] = useState<BlessingOptions>({
    scenario: occasions[0].value,
    festival: "",
    targetPerson: targetPersons[0].value,
    style: styles[0].value,
  })
  
  const [blessing, setBlessing] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [copySuccess, setCopySuccess] = useState(false)
  const [copyFading, setCopyFading] = useState(false)

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

  const handleRegenerate = async () => {
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
      setCopySuccess(true)
      setCopyFading(false)
      
      // 2.5秒后开始消失动画
      setTimeout(() => {
        setCopyFading(true)
      }, 2500)
      
      // 3秒后完全隐藏
      setTimeout(() => {
        setCopySuccess(false)
        setCopyFading(false)
      }, 3000)
    } catch (err) {
      console.error('复制失败:', err)
      setError('复制失败，请手动选择文字复制')
    }
  }

  const handleReset = () => {
    setBlessing('')
    setError('')
    setCopySuccess(false)
    setCopyFading(false)
  }

  return (
    <div className="w-full max-w-6xl">
      <div className="grid lg:grid-cols-2 gap-8">
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
          copySuccess={copySuccess}
          copyFading={copyFading}
          onCopy={handleCopy}
          onRegenerate={handleRegenerate}
        />
      </div>
    </div>
  )
}