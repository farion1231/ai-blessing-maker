'use client'

import { scenarios, festivals, targetPersons, styles } from '@/lib/config'
import { BlessingOptions } from '@/lib/api-client'

interface BlessingFormProps {
  options: BlessingOptions
  loading: boolean
  hasBlessing: boolean
  onOptionsChange: (options: BlessingOptions) => void
  onSubmit: (e: React.FormEvent) => void
  onReset: () => void
}

export default function BlessingForm({
  options,
  loading,
  hasBlessing,
  onOptionsChange,
  onSubmit,
  onReset
}: BlessingFormProps) {
  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-orange-50 rounded-3xl shadow-xl border-2 border-yellow-400 p-6 relative overflow-hidden backdrop-blur-sm">
      {/* 装饰元素 */}
      <div className="absolute top-4 left-4 text-2xl">🎯</div>
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-xl"></div>
      
      <h2 className="text-2xl font-black text-center mb-6 festive-title">
        🎨 选择祝福场景 🎨
      </h2>
      
      <form onSubmit={onSubmit} className="space-y-4 relative z-10">
        {/* 场景类型 */}
        <div className="space-y-2">
          <label className="block text-lg font-bold text-red-600 drop-shadow-sm">
            🎭 场景类型
          </label>
          <select
            className="w-full px-4 py-3 border-2 border-yellow-400 rounded-2xl text-base transition-all duration-300 bg-gradient-to-r from-yellow-50 to-white shadow-lg hover:shadow-xl focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/20 focus:-translate-y-0.5"
            value={options.scenario}
            onChange={(e) => onOptionsChange({...options, scenario: e.target.value})}
          >
            {scenarios.map((scenario) => (
              <option key={scenario.value} value={scenario.value} className="py-2">
                {scenario.label}
              </option>
            ))}
          </select>
        </div>

        {/* 节日庆典 */}
        <div className="space-y-2">
          <label className="block text-lg font-bold text-red-600 drop-shadow-sm">
            🎊 节日庆典
          </label>
          <select
            className="w-full px-4 py-3 border-2 border-yellow-400 rounded-2xl text-base transition-all duration-300 bg-gradient-to-r from-yellow-50 to-white shadow-lg hover:shadow-xl focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/20 focus:-translate-y-0.5"
            value={options.festival}
            onChange={(e) => onOptionsChange({...options, festival: e.target.value})}
          >
            {festivals.map((festival) => (
              <option key={festival.value} value={festival.value} className="py-2">
                {festival.label}
              </option>
            ))}
          </select>
        </div>

        {/* 目标人群 */}
        <div className="space-y-2">
          <label className="block text-lg font-bold text-red-600 drop-shadow-sm">
            👥 目标人群
          </label>
          <select
            className="w-full px-4 py-3 border-2 border-yellow-400 rounded-2xl text-base transition-all duration-300 bg-gradient-to-r from-yellow-50 to-white shadow-lg hover:shadow-xl focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/20 focus:-translate-y-0.5"
            value={options.targetPerson}
            onChange={(e) => onOptionsChange({...options, targetPerson: e.target.value})}
          >
            {targetPersons.map((person) => (
              <option key={person.value} value={person.value} className="py-2">
                {person.label}
              </option>
            ))}
          </select>
        </div>

        {/* 祝福风格 */}
        <div className="space-y-2">
          <label className="block text-lg font-bold text-red-600 drop-shadow-sm">
            🎨 祝福风格
          </label>
          <select
            className="w-full px-4 py-3 border-2 border-yellow-400 rounded-2xl text-base transition-all duration-300 bg-gradient-to-r from-yellow-50 to-white shadow-lg hover:shadow-xl focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/20 focus:-translate-y-0.5"
            value={options.style}
            onChange={(e) => onOptionsChange({...options, style: e.target.value})}
          >
            {styles.map((style) => (
              <option key={style.value} value={style.value} className="py-2">
                {style.label}
              </option>
            ))}
          </select>
        </div>

        {/* 按钮组 */}
        <div className="flex gap-4 mt-8 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white font-bold text-lg rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-600/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none overflow-hidden relative group"
          >
            {/* 闪光效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            <div className="relative flex items-center justify-center gap-3">
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
            </div>
          </button>
          
          {hasBlessing && (
            <button
              type="button"
              onClick={onReset}
              className="px-6 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-500/30"
            >
              🔄 重置
            </button>
          )}
        </div>
      </form>
    </div>
  )
}