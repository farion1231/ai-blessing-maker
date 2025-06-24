/**
 * 配置模块统一导出文件
 * 统一管理所有业务配置项，包括场景、节日、目标人群等
 * 保持向后兼容性，支持旧版本 API 的调用方式
 */

// 重新导出所有核心配置，保持向后兼容性
export { occasions, targetPersons, styles } from './config/occasions';
export type { RecommendationItem } from './config/recommendations';
export { 
  popularCombinations, 
  getDateBasedRecommendations 
} from './config/recommendations';

// 导入场景配置用于兼容性处理
import { occasions } from './config/occasions';

/**
 * 兼容性导出：场景选项
 * 从全量场景中筛选出与人生事件相关的场景
 */
export const scenarios = occasions.filter(item => 
  item.category === "人生时刻" || 
  item.category === "成就庆祝" || 
  item.category === "生活祝福"
);

/**
 * 兼容性导出：节日选项
 * 包含“无特定节日”选项和所有节日类型
 */
export const festivals = [
  { value: "", label: "无特定节日" }, 
  ...occasions.filter(item => 
    item.category === "传统节日" || 
    item.category === "现代节日"
  )
];