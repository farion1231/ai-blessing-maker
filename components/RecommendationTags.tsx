"use client";

import { RecommendationItem } from "@/lib/config";

interface RecommendationTagsProps {
  recommendations: RecommendationItem[];
  onApply: (recommendation: RecommendationItem) => void;
}

export default function RecommendationTags({
  recommendations,
  onApply,
}: RecommendationTagsProps) {
  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-3 mt-4">
      <h3 className="text-sm font-bold text-purple-600 drop-shadow-sm">
        <span aria-hidden="true">🌟</span> 智能推荐
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recommendations.slice(0, 6).map((recommendation) => (
          <button
            key={recommendation.id}
            type="button"
            onClick={() => onApply(recommendation)}
            className="group inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-full text-xs font-medium text-gray-700 transition-all duration-200 hover:from-purple-200 hover:to-pink-200 hover:border-purple-300 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-400/30"
            title={recommendation.description}
          >
            <span className="group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
              {recommendation.emoji}
            </span>
            <span className="truncate">
              {recommendation.scenario} · {recommendation.targetPerson} · {recommendation.style}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}