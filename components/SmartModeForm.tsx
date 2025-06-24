"use client";

import { BlessingOptions } from "@/lib/api-client";

interface SmartModeFormProps {
  options: BlessingOptions;
  onOptionsChange: (options: BlessingOptions) => void;
}

export default function SmartModeForm({
  options,
  onOptionsChange,
}: SmartModeFormProps) {
  return (
    <div className="space-y-3 flex-1 flex flex-col animate-fadeIn overflow-hidden">
      <label
        htmlFor="custom-description"
        className="block text-lg font-bold text-purple-600 drop-shadow-sm flex-shrink-0"
      >
        <span aria-hidden="true">🧠</span> 描述你的祝福需求
      </label>
      <div className="text-sm text-gray-600 bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-xl border border-purple-200 flex-shrink-0">
        💡 <strong>智能提示：</strong>
        告诉我对象、关系、场景等信息，我会生成个性化祝福
      </div>
      <textarea
        id="custom-description"
        className="form-textarea flex-1 min-h-0 overflow-y-auto"
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
  );
}
