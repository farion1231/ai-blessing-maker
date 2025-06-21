'use client'

import { BlessingOptions } from '@/lib/api-client'

interface BlessingResultProps {
  blessing: string
  options: BlessingOptions
  loading: boolean
  onCopy: () => void
  onRegenerate: () => void
}

export default function BlessingResult({
  blessing,
  options,
  loading,
  onCopy,
  onRegenerate
}: BlessingResultProps) {
  return (
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
          onClick={onCopy}
          className="btn btn-primary flex items-center gap-2"
        >
          📋 复制祝福语
        </button>
        <button
          onClick={onRegenerate}
          disabled={loading}
          className="btn btn-secondary flex items-center gap-2"
        >
          🔄 重新生成
        </button>
      </div>
    </div>
  )
}