'use client'

import { useState } from 'react'
import { scenarios, festivals, targetPersons, styles } from '@/lib/config'
import { generateBlessing, BlessingOptions } from '@/lib/api-client'

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
          {/* 选择器部分 */}
          <div className="festive-card p-6 relative">
            <div className="absolute top-4 left-4 text-2xl">🎯</div>
            <h2 className="text-2xl font-black text-center mb-6 festive-title">
              🎨 选择祝福场景 🎨
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4 relative z-20">
              <div className="form-group">
                <label className="form-label">🎭 场景类型</label>
                <select
                  className="form-select"
                  value={options.scenario}
                  onChange={(e) => setOptions({...options, scenario: e.target.value})}
                >
                  {scenarios.map((scenario) => (
                    <option key={scenario.value} value={scenario.value}>
                      {scenario.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">🎊 节日庆典</label>
                <select
                  className="form-select"
                  value={options.festival}
                  onChange={(e) => setOptions({...options, festival: e.target.value})}
                >
                  {festivals.map((festival) => (
                    <option key={festival.value} value={festival.value}>
                      {festival.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">👥 目标人群</label>
                <select
                  className="form-select"
                  value={options.targetPerson}
                  onChange={(e) => setOptions({...options, targetPerson: e.target.value})}
                >
                  {targetPersons.map((person) => (
                    <option key={person.value} value={person.value}>
                      {person.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">🎨 祝福风格</label>
                <select
                  className="form-select"
                  value={options.style}
                  onChange={(e) => setOptions({...options, style: e.target.value})}
                >
                  {styles.map((style) => (
                    <option key={style.value} value={style.value}>
                      {style.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn btn-primary flex items-center justify-center gap-3 text-lg"
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      🎊 生成中，请稍候...
                    </>
                  ) : (
                    <>
                      ✨ 生成祝福语 ✨
                    </>
                  )}
                </button>
                
                {blessing && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-secondary"
                  >
                    🔄 重置
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* 结果展示部分 */}
          <div className="festive-card p-6 relative">
            <div className="absolute top-4 right-4 text-2xl">🎁</div>
            <h2 className="text-2xl font-black text-center mb-6 festive-title">
              🎉 生成结果 🎉
            </h2>
            
            {error && (
              <div className="bg-red-50 border-2 border-red-300 text-red-700 px-6 py-4 rounded-2xl mb-6 relative">
                <div className="absolute top-2 left-2 text-xl">❌</div>
                <div className="ml-8 font-semibold">{error}</div>
              </div>
            )}

            {blessing ? (
              <div className="result-card fade-in">
                <div className="mb-6">
                  <div className="text-sm font-semibold text-orange-600 mb-4 text-center">
                    🎭 {options.scenario} • 🎊 {options.festival || '无特定节日'} • 👥 {options.targetPerson} • 🎨 {options.style}
                  </div>
                  <div className="result-text text-center">
                    {blessing}
                  </div>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleCopy}
                    className="btn btn-primary flex items-center gap-2"
                  >
                    📋 复制祝福语
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="btn btn-secondary flex items-center gap-2"
                  >
                    🔄 重新生成
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 relative">
                <div className="text-4xl mb-4">🎊</div>
                <div className="mb-4">
                  <span className="text-2xl">🎉</span>
                  <span className="text-2xl mx-2">🎈</span>
                  <span className="text-2xl">🎁</span>
                </div>
                <p className="text-xl font-bold text-orange-600 mb-2">选择选项后点击生成按钮</p>
                <p className="text-lg text-red-500 font-semibold">AI将为您生成专属的祝福语 ✨</p>
                <div className="mt-6">
                  <span className="text-xl">🌟</span>
                  <span className="text-xl mx-1">💫</span>
                  <span className="text-xl">⭐</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}