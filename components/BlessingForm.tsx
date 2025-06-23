"use client";

import { useState } from "react";
import { occasions, targetPersons, styles } from "@/lib/config";
import { BlessingOptions } from "@/lib/api-client";

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
      // 清空相关字段
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
    <div className="bg-gradient-to-br from-yellow-50 via-white to-orange-50 rounded-3xl shadow-xl border-2 border-yellow-400 p-6 relative overflow-hidden backdrop-blur-sm h-[380px] sm:h-[420px] md:h-[480px] lg:h-[520px] xl:h-[560px] flex flex-col transition-all duration-500 ease-in-out">
      {/* 装饰元素 */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-xl"></div>

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
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              !isSmartMode
                ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            🎯 快速模板
          </button>
          <button
            type="button"
            onClick={() => toggleMode(true)}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              isSmartMode
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "text-gray-600 hover:text-gray-800"
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
            /* 智能描述模式 - 可滚动版 */
            <div className="space-y-3 flex-1 flex flex-col animate-fadeIn overflow-hidden">
              <label
                htmlFor="custom-description"
                className="block text-lg font-bold text-blue-600 drop-shadow-sm flex-shrink-0"
              >
                <span aria-hidden="true">🧠</span> 描述你的祝福需求
              </label>
              <div className="text-sm text-gray-600 bg-blue-50/50 p-3 rounded-xl border border-blue-200 flex-shrink-0">
                💡 <strong>智能提示：</strong>
                告诉我对象、关系、场景等信息，AI会生成个性化祝福
              </div>
              <textarea
                id="custom-description"
                className="w-full p-4 border-2 border-blue-300 rounded-2xl text-base resize-none transition-all duration-300 bg-gradient-to-br from-blue-50 to-white shadow-lg hover:shadow-xl focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 placeholder-gray-500 flex-1 min-h-0 overflow-y-auto"
                placeholder="🌟 例如：给室友小王发生日祝福，他是程序员，刚跳槽，性格内向但靠谱，认识10年了..."
                value={options.customDescription || ""}
                onChange={(e) =>
                  onOptionsChange({
                    ...options,
                    customDescription: e.target.value,
                  })
                }
              />
            </div>
          )}
        </div>

        <div className={`transition-all duration-500 ease-in-out flex-1 overflow-hidden ${!isSmartMode ? 'opacity-100' : 'opacity-0 max-h-0'}`}>
          {!isSmartMode && (
            /* 快速模板模式 - 可滚动版 */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn overflow-y-auto pr-2">
            {/* 祝福场合 */}
            <div className="space-y-2">
              <label
                htmlFor="scenario-select"
                className="block text-sm font-bold text-red-600 drop-shadow-sm"
              >
                <span aria-hidden="true">🎉</span> 场合
              </label>
              <div className="relative">
                <select
                  id="scenario-select"
                  className="w-full px-3 py-2 border-2 border-yellow-400 rounded-xl text-sm transition-all duration-300 bg-gradient-to-r from-yellow-50 to-white shadow-md hover:shadow-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 appearance-none"
                  value={options.scenario}
                  aria-label="选择祝福场合"
                  onChange={(e) =>
                    onOptionsChange({
                      ...options,
                      scenario: e.target.value,
                      festival: "",
                    })
                  }
                >
                  <option value="">选择场合</option>
                  {occasions.map((occasion) => (
                    <option key={occasion.value} value={occasion.value}>
                      {occasion.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* 目标人群 */}
            <div className="space-y-2">
              <label
                htmlFor="target-person-select"
                className="block text-sm font-bold text-red-600 drop-shadow-sm"
              >
                <span aria-hidden="true">👥</span> 对象
              </label>
              <div className="relative">
                <select
                  id="target-person-select"
                  className="w-full px-3 py-2 border-2 border-yellow-400 rounded-xl text-sm transition-all duration-300 bg-gradient-to-r from-yellow-50 to-white shadow-md hover:shadow-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 appearance-none"
                  value={options.targetPerson}
                  aria-label="选择目标人群"
                  onChange={(e) =>
                    onOptionsChange({
                      ...options,
                      targetPerson: e.target.value,
                    })
                  }
                >
                  <option value="">选择对象</option>
                  {targetPersons.map((person) => (
                    <option key={person.value} value={person.value}>
                      {person.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* 祝福风格 */}
            <div className="space-y-2">
              <label
                htmlFor="style-select"
                className="block text-sm font-bold text-red-600 drop-shadow-sm"
              >
                <span aria-hidden="true">🎨</span> 风格
              </label>
              <div className="relative">
                <select
                  id="style-select"
                  className="w-full px-3 py-2 border-2 border-yellow-400 rounded-xl text-sm transition-all duration-300 bg-gradient-to-r from-yellow-50 to-white shadow-md hover:shadow-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 appearance-none"
                  value={options.style}
                  aria-label="选择祝福风格"
                  onChange={(e) =>
                    onOptionsChange({ ...options, style: e.target.value })
                  }
                >
                  <option value="">选择风格</option>
                  {styles.map((style) => (
                    <option key={style.value} value={style.value}>
                      {style.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            </div>
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
            className="w-full px-6 py-4 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white font-bold text-lg rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-600/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none overflow-hidden relative group"
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
