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
    <div className="festive-card p-6 relative">
      <div className="absolute top-4 right-4 text-2xl">🎁</div>
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