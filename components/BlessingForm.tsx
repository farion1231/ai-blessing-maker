"use client";

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
  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-orange-50 rounded-3xl shadow-xl border-2 border-yellow-400 p-6 relative overflow-hidden backdrop-blur-sm h-[500px] flex flex-col">
      {/* 装饰元素 */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-xl"></div>

      <h2 className="text-2xl font-black text-center mb-6 festive-title">
        <span aria-hidden="true">🎨</span> 选择祝福设置{" "}
        <span aria-hidden="true">🎨</span>
      </h2>

      <form
        onSubmit={onSubmit}
        className="space-y-4 relative z-10 flex-1 flex flex-col"
        role="form"
        aria-label="祝福语生成器设置表单"
      >
        {/* 祝福场合 */}
        <div className="space-y-2">
          <label
            htmlFor="scenario-select"
            className="block text-lg font-bold text-red-600 drop-shadow-sm"
          >
            <span aria-hidden="true">🎉</span> 祝福场合
          </label>
          <div className="relative">
            <select
              id="scenario-select"
              className="w-full pl-4 pr-12 py-3 border-2 border-yellow-400 rounded-2xl text-base transition-all duration-300 bg-gradient-to-r from-yellow-50 to-white shadow-lg hover:shadow-xl focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/20 focus:-translate-y-0.5 appearance-none"
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
              <option value="">请选择场合</option>
            <optgroup label="传统节日">
              {occasions
                .filter((o) => o.category === "传统节日")
                .map((occasion) => (
                  <option
                    key={occasion.value}
                    value={occasion.value}
                    className="py-2"
                  >
                    {occasion.label}
                  </option>
                ))}
            </optgroup>
            <optgroup label="现代节日">
              {occasions
                .filter((o) => o.category === "现代节日")
                .map((occasion) => (
                  <option
                    key={occasion.value}
                    value={occasion.value}
                    className="py-2"
                  >
                    {occasion.label}
                  </option>
                ))}
            </optgroup>
            <optgroup label="人生时刻">
              {occasions
                .filter((o) => o.category === "人生时刻")
                .map((occasion) => (
                  <option
                    key={occasion.value}
                    value={occasion.value}
                    className="py-2"
                  >
                    {occasion.label}
                  </option>
                ))}
            </optgroup>
            <optgroup label="成就庆祝">
              {occasions
                .filter((o) => o.category === "成就庆祝")
                .map((occasion) => (
                  <option
                    key={occasion.value}
                    value={occasion.value}
                    className="py-2"
                  >
                    {occasion.label}
                  </option>
                ))}
            </optgroup>
            <optgroup label="生活祝福">
              {occasions
                .filter((o) => o.category === "生活祝福")
                .map((occasion) => (
                  <option
                    key={occasion.value}
                    value={occasion.value}
                    className="py-2"
                  >
                    {occasion.label}
                  </option>
                ))}
            </optgroup>
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* 目标人群 */}
        <div className="space-y-2">
          <label
            htmlFor="target-person-select"
            className="block text-lg font-bold text-red-600 drop-shadow-sm"
          >
            <span aria-hidden="true">👥</span> 目标人群
          </label>
          <div className="relative">
            <select
              id="target-person-select"
              className="w-full pl-4 pr-12 py-3 border-2 border-yellow-400 rounded-2xl text-base transition-all duration-300 bg-gradient-to-r from-yellow-50 to-white shadow-lg hover:shadow-xl focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/20 focus:-translate-y-0.5 appearance-none"
              value={options.targetPerson}
              aria-label="选择目标人群"
              onChange={(e) =>
                onOptionsChange({ ...options, targetPerson: e.target.value })
              }
            >
              <option value="">请选择目标人群</option>
              {targetPersons.map((person) => (
                <option key={person.value} value={person.value} className="py-2">
                  {person.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* 祝福风格 */}
        <div className="space-y-2">
          <label
            htmlFor="style-select"
            className="block text-lg font-bold text-red-600 drop-shadow-sm"
          >
            <span aria-hidden="true">🎨</span> 祝福风格
          </label>
          <div className="relative">
            <select
              id="style-select"
              className="w-full pl-4 pr-12 py-3 border-2 border-yellow-400 rounded-2xl text-base transition-all duration-300 bg-gradient-to-r from-yellow-50 to-white shadow-lg hover:shadow-xl focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/20 focus:-translate-y-0.5 appearance-none"
              value={options.style}
              aria-label="选择祝福风格"
              onChange={(e) =>
                onOptionsChange({ ...options, style: e.target.value })
              }
            >
              <option value="">请选择风格</option>
              {styles.map((style) => (
                <option key={style.value} value={style.value} className="py-2">
                  {style.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* 生成按钮 */}
        <div className="mt-auto pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white font-bold text-lg rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-600/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none overflow-hidden relative group"
            aria-label={
              loading
                ? "正在生成祝福语，请稍候"
                : "根据选择的设置生成个性化祝福语"
            }
          >
            {/* 闪光效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

            <div className="relative flex items-center justify-center gap-3 min-h-[1.75rem]">
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  🎊 生成中，请稍候...
                </>
              ) : (
                <>✨ 生成祝福语 ✨</>
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
