"use client";

import { useState } from "react";
import { BlessingOptions } from "@/lib/api-client";
import SmartModeForm from "./SmartModeForm";
import TemplateModeForm from "./TemplateModeForm";

interface BlessingFormProps {
  options: BlessingOptions;
  loading: boolean;
  onOptionsChange: (options: BlessingOptions) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function BlessingForm({
  options,
  loading,
  onOptionsChange,
  onSubmit,
}: BlessingFormProps) {
  const [isSmartMode, setIsSmartMode] = useState(options.useSmartMode || false);

  const toggleMode = (useSmartMode: boolean) => {
    setIsSmartMode(useSmartMode);
    onOptionsChange({
      ...options,
      useSmartMode,
      ...(useSmartMode
        ? {
            scenario: "",
            festival: "",
            targetPerson: "",
            style: "",
          }
        : {
            customDescription: "",
          }),
    });
  };

  return (
    <div className="card-primary min-h-[400px] flex flex-col transition-all duration-500 ease-in-out">
      {/* 装饰元素 */}
      <div className="decoration-tr"></div>

      {/* 模式选择 */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black mb-4 festive-title">
          <span aria-hidden="true">🤖</span> 智能祝福生成器{" "}
          <span aria-hidden="true">✨</span>
        </h2>

        <div className="inline-flex rounded-2xl bg-white/80 p-1 shadow-lg border border-yellow-300">
          <button
            type="button"
            onClick={() => toggleMode(false)}
            className={`btn-mode ${
              !isSmartMode
                ? "btn-mode-active from-red-500 to-orange-500"
                : "btn-mode-inactive"
            }`}
          >
            🎯 快速模板
          </button>
          <button
            type="button"
            onClick={() => toggleMode(true)}
            className={`btn-mode ${
              isSmartMode
                ? "btn-mode-active from-blue-500 to-purple-500"
                : "btn-mode-inactive"
            }`}
          >
            💬 智能描述
          </button>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 relative z-10 flex-1 flex flex-col"
        role="form"
        aria-label="祝福语生成器设置表单"
      >
        <div className={`transition-all duration-500 ease-in-out flex-1 flex flex-col overflow-hidden ${isSmartMode ? 'opacity-100' : 'opacity-0 max-h-0'}`}>
          {isSmartMode && (
            <SmartModeForm
              options={options}
              onOptionsChange={onOptionsChange}
            />
          )}
        </div>

        <div className={`transition-all duration-500 ease-in-out flex-1 overflow-hidden ${!isSmartMode ? 'opacity-100' : 'opacity-0 max-h-0'}`}>
          {!isSmartMode && (
            <TemplateModeForm
              options={options}
              onOptionsChange={onOptionsChange}
            />
          )}
        </div>

        {/* 生成按钮 */}
        <div className="mt-auto pt-4">
          <button
            type="submit"
            disabled={
              loading ||
              (!isSmartMode && (!options.scenario || !options.targetPerson)) ||
              (isSmartMode && !options.customDescription?.trim())
            }
            className="btn-generate group"
            aria-label={
              loading
                ? "正在生成祝福语，请稍候"
                : isSmartMode
                ? "根据你的描述生成个性化祝福语"
                : "根据选择的设置生成个性化祝福语"
            }
          >
            {/* 闪光效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

            <div className="relative flex items-center justify-center gap-3 min-h-[1.75rem]">
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  {isSmartMode ? "🧠 AI思考中..." : "🎊 生成中，请稍候..."}
                </>
              ) : (
                <>{isSmartMode ? "🧠 智能生成" : "✨ 快速生成"}</>
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
