'use client'

import { BlessingOptions } from '@/lib/api-client'
import ErrorMessage from './ErrorMessage'
import EmptyState from './EmptyState'
import BlessingResult from './BlessingResult'

interface ResultDisplayProps {
  blessing: string
  error: string
  options: BlessingOptions
  loading: boolean
  onCopy: () => void
  onRegenerate: () => void
}

export default function ResultDisplay({
  blessing,
  error,
  options,
  loading,
  onCopy,
  onRegenerate
}: ResultDisplayProps) {
  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-orange-50 rounded-3xl shadow-xl border-2 border-yellow-400 p-6 relative overflow-hidden backdrop-blur-sm">
      {/* 装饰元素 */}
      <div className="absolute top-4 right-4 text-2xl">🎁</div>
      <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-xl"></div>
      
      <h2 className="text-2xl font-black text-center mb-6 festive-title">
        🎉 生成结果 🎉
      </h2>
      
      {error && <ErrorMessage message={error} />}

      {blessing ? (
        <BlessingResult
          blessing={blessing}
          options={options}
          loading={loading}
          onCopy={onCopy}
          onRegenerate={onRegenerate}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  )
}