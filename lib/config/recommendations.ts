/**
 * 推荐项目接口
 * 定义了智能推荐功能中单个推荐项的数据结构
 */
export interface RecommendationItem {
  id: string; // 唯一标识符
  title: string; // 推荐项标题
  scenario: string; // 对应的场景类型
  targetPerson: string; // 对应的目标人群
  style: string; // 对应的祝福语风格
  type: "date" | "popular"; // 推荐类型：日期相关或热门组合
  description?: string; // 可选的描述信息
  emoji?: string; // 可选的表情符号
}

/**
 * 热门推荐组合列表
 * 预定义的热门祝福场景组合，用于快速选择
 * 按使用频率和实用性排序
 */
export const popularCombinations: RecommendationItem[] = [
  {
    id: "birthday-friend",
    title: "生日祝福",
    scenario: "生日",
    targetPerson: "朋友",
    style: "温馨",
    type: "popular",
    emoji: "🎂",
    description: "最受欢迎的祝福组合",
  },
  {
    id: "spring-festival-family",
    title: "春节家庭",
    scenario: "春节",
    targetPerson: "家人",
    style: "传统",
    type: "popular",
    emoji: "🧧",
    description: "传统节日经典选择",
  },
  {
    id: "promotion-colleague",
    title: "升职祝贺",
    scenario: "升职",
    targetPerson: "同事",
    style: "正式",
    type: "popular",
    emoji: "📈",
    description: "职场必备祝福",
  },
  {
    id: "wedding-family",
    title: "婚礼祝福",
    scenario: "婚礼",
    targetPerson: "朋友",
    style: "正式",
    type: "popular",
    emoji: "💒",
    description: "人生大事喜庆祝福",
  },
];

export function getDateBasedRecommendations(): RecommendationItem[] {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const recommendations: RecommendationItem[] = [];

  // 元旦推荐 (1月1日)
  if (month === 1 && day <= 7) {
    recommendations.push({
      id: "new-year-day",
      title: "元旦祝福",
      scenario: "元旦",
      targetPerson: "朋友",
      style: "现代",
      type: "date",
      emoji: "🎊",
      description: "新年新气象",
    });
  }

  // 春节推荐 (1-2月)
  if (month === 1 || month === 2) {
    recommendations.push({
      id: "spring-festival",
      title: "春节祝福",
      scenario: "春节",
      targetPerson: "家人",
      style: "传统",
      type: "date",
      emoji: "🧧",
      description: "阖家团圆迎新春",
    });
  }

  // 情人节推荐 (2月14日)
  if (month === 2 && day >= 10 && day <= 18) {
    recommendations.push({
      id: "valentines-day",
      title: "情人节祝福",
      scenario: "情人节",
      targetPerson: "恋人",
      style: "诗意",
      type: "date",
      emoji: "💝",
      description: "浪漫爱情表白",
    });
  }

  // 妇女节推荐 (3月8日)
  if (month === 3 && day >= 5 && day <= 10) {
    recommendations.push({
      id: "womens-day",
      title: "妇女节祝福",
      scenario: "妇女节",
      targetPerson: "妈妈",
      style: "感恩",
      type: "date",
      emoji: "👩",
      description: "向伟大女性致敬",
    });
  }

  // 清明节推荐 (4月)
  if (month === 4) {
    recommendations.push({
      id: "qingming-festival",
      title: "清明节祝福",
      scenario: "清明节",
      targetPerson: "家人",
      style: "传统",
      type: "date",
      emoji: "🌸",
      description: "缅怀追思传统节日",
    });
  }

  // 劳动节推荐 (5月1日)
  if (month === 5 && day <= 5) {
    recommendations.push({
      id: "labor-day",
      title: "劳动节祝福",
      scenario: "劳动节",
      targetPerson: "同事",
      style: "激励",
      type: "date",
      emoji: "⚒️",
      description: "向劳动者致敬",
    });
  }

  // 母亲节推荐 (5月第二个周日)
  if (month === 5) {
    recommendations.push({
      id: "mothers-day",
      title: "母亲节祝福",
      scenario: "母亲节",
      targetPerson: "妈妈",
      style: "感恩",
      type: "date",
      emoji: "🌹",
      description: "感恩母爱如山",
    });
  }

  // 端午节推荐 (农历五月初五，大概在公历6月)
  if (month === 6) {
    recommendations.push({
      id: "dragon-boat-festival",
      title: "端午节祝福",
      scenario: "端午节",
      targetPerson: "家人",
      style: "传统",
      type: "date",
      emoji: "🚣",
      description: "传统节日温馨祝福",
    });
  }

  // 儿童节推荐 (6月1日)
  if (month === 6 && day <= 5) {
    recommendations.push({
      id: "childrens-day",
      title: "儿童节祝福",
      scenario: "儿童节",
      targetPerson: "子女",
      style: "幽默",
      type: "date",
      emoji: "🧸",
      description: "童心未泯快乐成长",
    });
  }

  // 父亲节推荐 (6月第三个周日)
  if (month === 6) {
    recommendations.push({
      id: "fathers-day",
      title: "父亲节祝福",
      scenario: "父亲节",
      targetPerson: "爸爸",
      style: "感恩",
      type: "date",
      emoji: "👔",
      description: "感恩父爱如山",
    });
  }

  // 毕业季推荐 (6-7月)
  if (month >= 6 && month <= 7) {
    recommendations.push({
      id: "graduation-season",
      title: "毕业季祝福",
      scenario: "毕业",
      targetPerson: "同学",
      style: "诗意",
      type: "date",
      emoji: "🎓",
      description: "青春不散场",
    });
  }

  // 七夕节推荐 (农历七月初七，大概在公历8月)
  if (month === 8) {
    recommendations.push({
      id: "qixi-festival",
      title: "七夕节祝福",
      scenario: "七夕节",
      targetPerson: "恋人",
      style: "诗意",
      type: "date",
      emoji: "💕",
      description: "浪漫爱情专属",
    });
  }

  // 中元节推荐 (农历七月十五，大概在公历8月)
  if (month === 8) {
    recommendations.push({
      id: "zhongyuan-festival",
      title: "中元节祝福",
      scenario: "中元节",
      targetPerson: "家人",
      style: "传统",
      type: "date",
      emoji: "🕯️",
      description: "追思先人传统节日",
    });
  }

  // 中秋节推荐 (农历八月十五，大概在公历9月)
  if (month === 9) {
    recommendations.push({
      id: "mid-autumn-festival",
      title: "中秋节祝福",
      scenario: "中秋节",
      targetPerson: "家人",
      style: "传统",
      type: "date",
      emoji: "🌕",
      description: "团圆美满祝愿",
    });
  }

  // 教师节推荐 (9月10日)
  if (month === 9 && day >= 8 && day <= 12) {
    recommendations.push({
      id: "teachers-day",
      title: "教师节祝福",
      scenario: "教师节",
      targetPerson: "老师",
      style: "感恩",
      type: "date",
      emoji: "👨‍🏫",
      description: "师恩如海深似山",
    });
  }

  // 国庆节推荐 (10月)
  if (month === 10) {
    recommendations.push({
      id: "national-day",
      title: "国庆节祝福",
      scenario: "国庆节",
      targetPerson: "朋友",
      style: "正式",
      type: "date",
      emoji: "🇨🇳",
      description: "爱国情怀表达",
    });
  }

  // 重阳节推荐 (农历九月初九，大概在公历10月)
  if (month === 10) {
    recommendations.push({
      id: "chongyang-festival",
      title: "重阳节祝福",
      scenario: "重阳节",
      targetPerson: "爷爷",
      style: "传统",
      type: "date",
      emoji: "🏔️",
      description: "敬老爱老传统美德",
    });
  }

  // 圣诞节推荐 (12月)
  if (month === 12) {
    recommendations.push({
      id: "christmas",
      title: "圣诞节祝福",
      scenario: "圣诞节",
      targetPerson: "朋友",
      style: "现代",
      type: "date",
      emoji: "🎄",
      description: "温暖节日氛围",
    });
  }

  // 周末推荐日常问候
  const dayOfWeek = now.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    recommendations.push({
      id: "weekend-greeting",
      title: "周末问候",
      scenario: "日常",
      targetPerson: "朋友",
      style: "温馨",
      type: "date",
      emoji: "😊",
      description: "轻松愉快的周末",
    });
  }

  // 工作日早晨推荐
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    const hour = now.getHours();
    if (hour >= 6 && hour <= 10) {
      recommendations.push({
        id: "morning-greeting",
        title: "早安问候",
        scenario: "日常",
        targetPerson: "朋友",
        style: "激励",
        type: "date",
        emoji: "🌅",
        description: "美好一天从问候开始",
      });
    }
  }

  return recommendations;
}
