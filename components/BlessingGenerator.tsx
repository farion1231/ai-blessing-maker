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


  return (
    <>
      {/* 屏幕阅读器状态通知区域 */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {loading && "正在生成祝福语，请稍候..."}
        {error && `错误：${error}`}
        {copySuccess && "祝福语已成功复制到剪贴板"}
        {blessing && !loading && !error && "祝福语生成完成"}
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <BlessingForm
          options={options}
          loading={loading}
          onOptionsChange={setOptions}
          onSubmit={handleSubmit}
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
    </>
  )
}