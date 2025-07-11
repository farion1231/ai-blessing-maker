/**
 * 场景配置数据
 * 包含所有可选的祝福场景，按类别组织
 * 每个项目包含值、显示标签和分类信息
 */
export const occasions = [
  // 传统节日分类
  { value: "春节", label: "🧧 春节", category: "传统节日" },
  { value: "元宵节", label: "🏮 元宵节", category: "传统节日" },
  { value: "清明节", label: "🌸 清明节", category: "传统节日" },
  { value: "端午节", label: "🚣 端午节", category: "传统节日" },
  { value: "七夕节", label: "💕 七夕节", category: "传统节日" },
  { value: "中元节", label: "🕯️ 中元节", category: "传统节日" },
  { value: "中秋节", label: "🌕 中秋节", category: "传统节日" },
  { value: "重阳节", label: "🏔️ 重阳节", category: "传统节日" },

  // 现代节日分类
  { value: "元旦", label: "🎊 元旦", category: "现代节日" },
  { value: "情人节", label: "💝 情人节", category: "现代节日" },
  { value: "白色情人节", label: "🤍 白色情人节", category: "现代节日" },
  { value: "妇女节", label: "👩 妇女节", category: "现代节日" },
  { value: "劳动节", label: "⚒️ 劳动节", category: "现代节日" },
  { value: "母亲节", label: "🌹 母亲节", category: "现代节日" },
  { value: "儿童节", label: "🧸 儿童节", category: "现代节日" },
  { value: "父亲节", label: "👔 父亲节", category: "现代节日" },
  { value: "教师节", label: "👨‍🏫 教师节", category: "现代节日" },
  { value: "国庆节", label: "🇨🇳 国庆节", category: "现代节日" },
  { value: "圣诞节", label: "🎄 圣诞节", category: "现代节日" },

  // 人生重要时刻分类
  { value: "生日", label: "🎂 生日庆祝", category: "人生时刻" },
  { value: "婚礼", label: "💒 婚礼庆典", category: "人生时刻" },
  { value: "毕业", label: "🎓 毕业典礼", category: "人生时刻" },
  { value: "生子", label: "👶 喜得贵子", category: "人生时刻" },
  { value: "周年", label: "💖 周年纪念", category: "人生时刻" },

  // 成就庆祝分类
  { value: "升职", label: "📈 升职加薪", category: "成就庆祝" },
  { value: "开业", label: "🏪 开业大吉", category: "成就庆祝" },
  { value: "获奖", label: "🏆 获奖祝贺", category: "成就庆祝" },
  { value: "考试", label: "📝 考试成功", category: "成就庆祝" },

  // 生活祝福分类
  { value: "搬家", label: "🏠 乔迁新居", category: "生活祝福" },
  { value: "康复", label: "💪 康复祝福", category: "生活祝福" },
  { value: "退休", label: "🌅 退休庆祝", category: "生活祝福" },
  { value: "日常", label: "😊 日常问候", category: "生活祝福" },
];

/**
 * 目标人群配置数据
 * 定义了所有可选的祝福对象，包括家人、朋友、同事等
 * 用于生成针对性更强的祝福语
 */
export const targetPersons = [
  { value: "朋友", label: "朋友" },
  { value: "家人", label: "家人" },
  { value: "爸爸", label: "爸爸" },
  { value: "妈妈", label: "妈妈" },
  { value: "哥哥", label: "哥哥" },
  { value: "姐姐", label: "姐姐" },
  { value: "弟弟", label: "弟弟" },
  { value: "妹妹", label: "妹妹" },
  { value: "爷爷", label: "爷爷" },
  { value: "奶奶", label: "奶奶" },
  { value: "外公", label: "外公" },
  { value: "外婆", label: "外婆" },
  { value: "同事", label: "同事" },
  { value: "领导", label: "领导" },
  { value: "老师", label: "老师" },
  { value: "学生", label: "学生" },
  { value: "同学", label: "同学" },
  { value: "恋人", label: "恋人" },
  { value: "夫妻", label: "夫妻" },
  { value: "老婆", label: "老婆" },
  { value: "老公", label: "老公" },
  { value: "子女", label: "子女" },
  { value: "客户", label: "客户/合作伙伴" },
  { value: "长辈", label: "长辈" },
  { value: "晚辈", label: "晚辈" },
];

/**
 * 祝福语风格配置数据
 * 定义了不同的祝福语表达风格，从温馨亲切到正式庄重
 * 根据不同场景和关系选择合适的表达方式
 */
export const styles = [
  { value: "温馨", label: "温馨亲切" },
  { value: "正式", label: "正式庄重" },
  { value: "幽默", label: "幽默风趣" },
  { value: "简洁", label: "简洁明了" },
  { value: "诗意", label: "诗意优美" },
  { value: "传统", label: "传统经典" },
  { value: "现代", label: "现代时尚" },
  { value: "感恩", label: "感恩感谢" },
  { value: "激励", label: "激励鼓舞" },
];
