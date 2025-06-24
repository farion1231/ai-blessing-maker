/**
 * 配置模块统一导出入口文件
 * 聚合所有配置数据并提供统一的导出接口
 * 包括原始数据和为向后兼容性处理的数据
 */

// 直接重新导出核心配置数据
export { occasions, targetPersons, styles } from './occasions';
export type { RecommendationItem } from './recommendations';
export { 
  popularCombinations, 
  getDateBasedRecommendations 
} from './recommendations';

// 导入原始数据用于兼容性处理
import { occasions } from './occasions';

/**
 * 兼容性导出：场景类型筛选
 * 从全量 occasion 中筛选出非节日类的生活场景
 */
export const scenarios = occasions.filter(item => 
  item.category === "人生时刻" || 
  item.category === "成就庆祝" || 
  item.category === "生活祝福"
);

/**
 * 兼容性导出：节日类型筛选
 * 包含“无特定节日”选项和所有节日相关的 occasion
 */
export const festivals = [
  { value: "", label: "无特定节日" }, 
  ...occasions.filter(item => 
    item.category === "传统节日" || 
    item.category === "现代节日"
  )
];