"use client";

import { BlessingOptions } from "@/lib/api-client";
import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";
import BlessingResult from "./BlessingResult";

interface ResultDisplayProps {
  blessing: string;
  error: string;
  options: BlessingOptions;
  loading: boolean;
  copySuccess: boolean;
  copyFading: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
}

export default function ResultDisplay({
  blessing,
  error,
  options,
  loading,
  copySuccess,
  copyFading,
  onCopy,
  onRegenerate,
}: ResultDisplayProps) {
  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-orange-50 rounded-3xl shadow-xl border-2 border-yellow-400 p-6 relative overflow-hidden backdrop-blur-sm h-[500px] flex flex-col">
      {/* 装饰元素 */}
      <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-xl"></div>

      <h2 className="text-2xl font-black text-center mb-6 festive-title">
        🎉 生成结果 🎉
      </h2>

      {error && <ErrorMessage message={error} />}

      {blessing ? (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-hidden">
            <BlessingResult
              blessing={blessing}
              options={options}
              loading={loading}
              onCopy={onCopy}
              onRegenerate={onRegenerate}
            />
          </div>

          {/* 复制成功提示区域 - 预留固定空间 */}
          <div className="h-20 flex items-center justify-center flex-shrink-0">
            {copySuccess && (
              <div
                className={`bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-4 text-center font-semibold shadow-lg ${
                  copyFading ? "fade-out" : "slide-in-up"
                } w-full`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">🎉</span>
                  <span>祝福语已复制到剪贴板！快去分享这份温暖吧~</span>
                  <span className="text-2xl">✨</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <EmptyState />
        </div>
      )}
    </div>
  );
}
