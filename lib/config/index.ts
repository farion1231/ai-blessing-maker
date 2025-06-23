export { occasions, targetPersons, styles } from './occasions';
export type { RecommendationItem } from './recommendations';
export { 
  popularCombinations, 
  getDateBasedRecommendations 
} from './recommendations';

// 兼容性导出 - 需要导入occasions进行处理
import { occasions } from './occasions';

export const scenarios = occasions.filter(item => 
  item.category === "人生时刻" || 
  item.category === "成就庆祝" || 
  item.category === "生活祝福"
);

export const festivals = [
  { value: "", label: "无特定节日" }, 
  ...occasions.filter(item => 
    item.category === "传统节日" || 
    item.category === "现代节日"
  )
];