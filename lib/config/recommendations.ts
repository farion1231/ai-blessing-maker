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
    id: 'wedding-family',
    title: '婚礼祝福',
    scenario: '婚礼',
    targetPerson: '朋友',
    style: '正式',
    type: 'popular',
    emoji: '💒',
    description: '人生大事喜庆祝福'
  }
];

export function getDateBasedRecommendations(): RecommendationItem[] {
  const now = new Date();
  const month = now.getMonth() + 1;
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