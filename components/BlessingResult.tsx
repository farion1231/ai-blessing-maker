"use client";

import { BlessingOptions } from "@/lib/api-client";

interface BlessingResultProps {
  blessing: string;
  options: BlessingOptions;
  loading: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
}

export default function BlessingResult({
  blessing,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options,
  loading,
  onCopy,
  onRegenerate,
}: BlessingResultProps) {
  return (
    <div className="card-result">
      {/* 右下角装饰 */}
      <div className="decoration-br"></div>

      <div className="flex-1 relative z-10 flex items-center justify-center">
        <div className="text-xl leading-relaxed text-center font-medium text-amber-900 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-sm">
          {blessing}
        </div>
      </div>

      <div className="flex gap-4 justify-center mt-6 flex-shrink-0">
        <button
          onClick={onCopy}
          className="btn-primary"
          aria-label="复制生成的祝福语到剪贴板"
        >
          📋 复制祝福语
        </button>
        <button
          onClick={onRegenerate}
          disabled={loading}
          className="btn-secondary disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          aria-label="重新生成祝福语"
        >
          🔄 重新生成
        </button>
      </div>
    </div>
  );
}
