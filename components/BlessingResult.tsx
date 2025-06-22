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
    <div className="bg-gradient-to-br from-yellow-50 via-white to-orange-50 rounded-xl p-6 relative overflow-hidden fade-in h-full flex flex-col">
      {/* 装饰星星 */}
      <div className="absolute top-4 right-4 text-2xl animate-pulse">✨</div>
      {/* 右下角装饰 */}
      <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-tl from-red-200/30 to-yellow-200/30 rounded-full blur-md"></div>
      
      <div className="flex-1 relative z-10 flex flex-col min-h-0">
        <div className="text-sm font-semibold text-orange-600 mb-4 text-center space-x-2 flex-shrink-0">
          <span>🎉 {options.scenario}</span>
          <span>•</span>
          <span>👥 {options.targetPerson}</span>
          <span>•</span>
          <span>🎨 {options.style}</span>
        </div>
        <div className="flex-1 flex items-center justify-center min-h-0">
          <div className="text-xl leading-relaxed text-center font-medium text-amber-900 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-sm max-h-full overflow-y-auto">
            {blessing}
          </div>
        </div>
      </div>
      
      <div className="flex gap-4 justify-center mt-6 flex-shrink-0">
        <button
          onClick={onCopy}
          className="px-6 py-3 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-600/30 flex items-center gap-2"
        >
          📋 复制祝福语
        </button>
        <button
          onClick={onRegenerate}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-500/30 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        >
          🔄 重新生成
        </button>
      </div>
    </div>
  )
}