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
    <div className="festive-card p-6 relative">
      <div className="absolute top-4 left-4 text-2xl">🎯</div>
      <h2 className="text-2xl font-black text-center mb-6 festive-title">
        🎨 选择祝福场景 🎨
      </h2>
      
      <form onSubmit={onSubmit} className="space-y-4 relative z-20">
        <div className="form-group">
          <label className="form-label">🎭 场景类型</label>
          <select
            className="form-select"
            value={options.scenario}
            onChange={(e) => onOptionsChange({...options, scenario: e.target.value})}
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
            onChange={(e) => onOptionsChange({...options, festival: e.target.value})}
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
            onChange={(e) => onOptionsChange({...options, targetPerson: e.target.value})}
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
            onChange={(e) => onOptionsChange({...options, style: e.target.value})}
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
          
          {hasBlessing && (
            <button
              type="button"
              onClick={onReset}
              className="btn btn-secondary"
            >
              🔄 重置
            </button>
          )}
        </div>
      </form>
    </div>
  )
}