// 合并祝福场合 - 按类别分组
export const occasions = [
  // 传统节日
  { value: "春节", label: "🧧 春节", category: "传统节日" },
  { value: "元宵节", label: "🏮 元宵节", category: "传统节日" },
  { value: "清明节", label: "🌸 清明节", category: "传统节日" },
  { value: "端午节", label: "🚣 端午节", category: "传统节日" },
  { value: "七夕节", label: "💕 七夕节", category: "传统节日" },
  { value: "中秋节", label: "🌕 中秋节", category: "传统节日" },
  { value: "重阳节", label: "🏔️ 重阳节", category: "传统节日" },
  
  // 现代节日
  { value: "元旦", label: "🎊 元旦", category: "现代节日" },
  { value: "情人节", label: "💝 情人节", category: "现代节日" },
  { value: "妇女节", label: "👩 妇女节", category: "现代节日" },
  { value: "劳动节", label: "⚒️ 劳动节", category: "现代节日" },
  { value: "儿童节", label: "🧸 儿童节", category: "现代节日" },
  { value: "教师节", label: "👨‍🏫 教师节", category: "现代节日" },
  { value: "国庆节", label: "🇨🇳 国庆节", category: "现代节日" },
  { value: "圣诞节", label: "🎄 圣诞节", category: "现代节日" },
  
  // 人生重要时刻
  { value: "生日", label: "🎂 生日庆祝", category: "人生时刻" },
  { value: "婚礼", label: "💒 婚礼庆典", category: "人生时刻" },
  { value: "毕业", label: "🎓 毕业典礼", category: "人生时刻" },
  { value: "生子", label: "👶 喜得贵子", category: "人生时刻" },
  { value: "周年", label: "💖 周年纪念", category: "人生时刻" },
  
  // 成就庆祝
  { value: "升职", label: "📈 升职加薪", category: "成就庆祝" },
  { value: "开业", label: "🏪 开业大吉", category: "成就庆祝" },
  { value: "获奖", label: "🏆 获奖祝贺", category: "成就庆祝" },
  { value: "考试", label: "📝 考试成功", category: "成就庆祝" },
  
  // 生活祝福
  { value: "搬家", label: "🏠 乔迁新居", category: "生活祝福" },
  { value: "康复", label: "💪 康复祝福", category: "生活祝福" },
  { value: "退休", label: "🌅 退休庆祝", category: "生活祝福" },
  { value: "日常", label: "😊 日常问候", category: "生活祝福" }
];

// 保留原有的 scenarios 和 festivals 以兼容性，但标记为废弃
export const scenarios = occasions.filter(item => item.category === "人生时刻" || item.category === "成就庆祝" || item.category === "生活祝福");
export const festivals = [{ value: "", label: "无特定节日" }, ...occasions.filter(item => item.category === "传统节日" || item.category === "现代节日")];

export const targetPersons = [
  { value: "朋友", label: "朋友" },
  { value: "家人", label: "家人" },
  { value: "父母", label: "父母" },
  { value: "兄弟姐妹", label: "兄弟姐妹" },
  { value: "祖父母", label: "祖父母/外祖父母" },
  { value: "同事", label: "同事" },
  { value: "领导", label: "领导/上司" },
  { value: "老师", label: "老师" },
  { value: "学生", label: "学生" },
  { value: "恋人", label: "恋人" },
  { value: "夫妻", label: "夫妻" },
  { value: "子女", label: "子女" },
  { value: "客户", label: "客户/合作伙伴" },
  { value: "长辈", label: "长辈" },
  { value: "晚辈", label: "晚辈" }
];

export const styles = [
  { value: "温馨", label: "温馨亲切" },
  { value: "正式", label: "正式庄重" },
  { value: "幽默", label: "幽默风趣" },
  { value: "简洁", label: "简洁明了" },
  { value: "诗意", label: "诗意优美" },
  { value: "传统", label: "传统经典" },
  { value: "现代", label: "现代时尚" }
];

// 推荐配置
export interface RecommendationItem {
  id: string;
  title: string;
  scenario: string;
  targetPerson: string;
  style: string;
  type: 'date' | 'popular';
  description?: string;
  emoji?: string;
}

// 爆款组合配置
export const popularCombinations: RecommendationItem[] = [
  {
    id: 'birthday-friend',
    title: '生日祝福',
    scenario: '生日',
    targetPerson: '朋友',
    style: '温馨',
    type: 'popular',
    emoji: '🎂',
    description: '最受欢迎的祝福组合'
  },
  {
    id: 'spring-festival-family',
    title: '春节家庭',
    scenario: '春节',
    targetPerson: '家人',
    style: '传统',
    type: 'popular',
    emoji: '🧧',
    description: '传统节日经典选择'
  },
  {
    id: 'promotion-colleague',
    title: '升职祝贺',
    scenario: '升职',
    targetPerson: '同事',
    style: '正式',
    type: 'popular',
    emoji: '📈',
    description: '职场必备祝福'
  },
  {
    id: 'graduation-friend',
    title: '毕业祝福',
    scenario: '毕业',
    targetPerson: '朋友',
    style: '诗意',
    type: 'popular',
    emoji: '🎓',
    description: '青春记忆珍藏'
  }
];

// 根据日期获取推荐
export function getDateBasedRecommendations(): RecommendationItem[] {
  const now = new Date();
  const month = now.getMonth() + 1; // 0-based to 1-based
  const day = now.getDate();
  const recommendations: RecommendationItem[] = [];

  // 端午节推荐 (农历五月初五，大概在公历6月)
  if (month === 6) {
    recommendations.push({
      id: 'dragon-boat-festival',
      title: '端午节祝福',
      scenario: '端午节',
      targetPerson: '家人',
      style: '传统',
      type: 'date',
      emoji: '🚣',
      description: '传统节日温馨祝福'
    });
  }

  // 七夕节推荐 (农历七月初七，大概在公历8月)
  if (month === 8) {
    recommendations.push({
      id: 'qixi-festival',
      title: '七夕节祝福',
      scenario: '七夕节',
      targetPerson: '恋人',
      style: '诗意',
      type: 'date',
      emoji: '💕',
      description: '浪漫爱情专属'
    });
  }

  // 中秋节推荐 (农历八月十五，大概在公历9月)
  if (month === 9) {
    recommendations.push({
      id: 'mid-autumn-festival',
      title: '中秋节祝福',
      scenario: '中秋节',
      targetPerson: '家人',
      style: '传统',
      type: 'date',
      emoji: '🌕',
      description: '团圆美满祝愿'
    });
  }

  // 毕业季推荐 (6-7月)
  if (month >= 6 && month <= 7) {
    recommendations.push({
      id: 'graduation-season',
      title: '毕业季祝福',
      scenario: '毕业',
      targetPerson: '朋友',
      style: '诗意',
      type: 'date',
      emoji: '🎓',
      description: '青春不散场'
    });
  }

  // 国庆节推荐 (10月)
  if (month === 10) {
    recommendations.push({
      id: 'national-day',
      title: '国庆节祝福',
      scenario: '国庆节',
      targetPerson: '朋友',
      style: '正式',
      type: 'date',
      emoji: '🇨🇳',
      description: '爱国情怀表达'
    });
  }

  // 周末推荐日常问候
  const dayOfWeek = now.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    recommendations.push({
      id: 'weekend-greeting',
      title: '周末问候',
      scenario: '日常',
      targetPerson: '朋友',
      style: '温馨',
      type: 'date',
      emoji: '😊',
      description: '轻松愉快的周末'
    });
  }

  return recommendations;
}