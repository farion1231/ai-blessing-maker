# 🎊 AI祝福语生成器

基于 Next.js 14 + TypeScript 构建的智能祝福语生成应用，支持多AI供应商切换，为不同场景和节日生成个性化祝福语。

## ✨ 主要功能

- **多场景支持**：生日、婚礼、毕业、升职等12种生活场景
- **节日主题**：春节、中秋、圣诞节等16个传统和现代节日
- **目标人群定制**：朋友、家人、同事、恋人等15种关系类型
- **风格多样化**：温馨、正式、幽默、诗意等7种表达风格
- **响应式设计**：完美适配桌面端和移动端
- **一键复制**：生成后可直接复制分享
- **实时生成**：基于AI的即时祝福语创作
- **无障碍支持**：符合 WCAG 2.1 AA 标准，支持屏幕阅读器和键盘导航

## 🚀 技术栈

- **前端框架**：Next.js 14 with App Router
- **开发语言**：TypeScript
- **样式框架**：Tailwind CSS
- **多AI支持**：支持 DeepSeek、OpenAI、通义千问、文心一言、Kimi 等
- **包管理器**：pnpm
- **部署平台**：支持 Vercel、Netlify 等

## 🛠️ 本地开发

### 环境要求

- Node.js 18+ 
- pnpm 8+

### 安装依赖

```bash
pnpm install
```

### 环境配置

1. 复制环境变量模板：
```bash
cp .env.example .env.local
```

2. 配置 AI API（必填主力API，可选备用API）：
```env
# 主力AI API（必需）
PRIMARY_AI_API_KEY=sk-xxxxx
PRIMARY_AI_BASE_URL=https://api.deepseek.com
PRIMARY_AI_MODEL=deepseek-chat

# 备用AI API（可选，用于故障转移）
FALLBACK_AI_API_KEY=sk-xxxxx
FALLBACK_AI_BASE_URL=https://api.openai.com/v1
FALLBACK_AI_MODEL=gpt-3.5-turbo

# 故障转移设置
ENABLE_FALLBACK=true
```

### 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
pnpm build
pnpm start
```

## 📁 项目结构

```
ai-blessing-maker/
├── app/                    # Next.js App Router
│   ├── api/blessing/      # API 路由
│   ├── layout.tsx         # 根布局
│   ├── page.tsx          # 首页
│   └── globals.css       # 全局样式
├── components/           # React 组件
│   └── BlessingGenerator.tsx
├── lib/                 # 工具函数
│   ├── api-client.ts    # API 客户端
│   └── config.ts        # 配置选项
└── public/             # 静态资源
```

## 🎯 使用方式

1. **选择场景**：从生日、婚礼、毕业等场景中选择
2. **设定节日**：可选择对应的节日主题
3. **确定对象**：选择祝福的目标人群
4. **挑选风格**：选择合适的表达风格
5. **生成祝福**：点击按钮即可获得个性化祝福语
6. **复制分享**：一键复制到剪贴板，便于分享

## 🔧 自定义配置

### 添加新场景

在 `lib/config.ts` 中的 `scenarios` 数组添加新选项：

```typescript
{
  value: 'your-scenario',
  label: '🎯 你的场景'
}
```

### 修改AI提示词

在 `app/api/blessing/route.ts` 中修改 `createBlessingPrompt` 函数。

## 🔄 多AI供应商支持

### 支持的AI服务商

- **DeepSeek**：高性价比，中文理解优秀
- **OpenAI**：GPT系列，全球领先
- **通义千问**：阿里云，中文场景优化
- **文心一言**：百度，本土化强
- **Kimi**：月之暗面，长文本处理

### 配置示例

**DeepSeek（推荐）**
```env
PRIMARY_AI_API_KEY=sk-xxxxx
PRIMARY_AI_BASE_URL=https://api.deepseek.com
PRIMARY_AI_MODEL=deepseek-chat
```

**OpenAI**
```env
PRIMARY_AI_API_KEY=sk-xxxxx
PRIMARY_AI_BASE_URL=https://api.openai.com/v1
PRIMARY_AI_MODEL=gpt-3.5-turbo
```

**通义千问**
```env
PRIMARY_AI_API_KEY=sk-xxxxx
PRIMARY_AI_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
PRIMARY_AI_MODEL=qwen-turbo
```

**Kimi**
```env
PRIMARY_AI_API_KEY=sk-xxxxx
PRIMARY_AI_BASE_URL=https://api.moonshot.cn/v1
PRIMARY_AI_MODEL=moonshot-v1-8k
```

### 故障转移

系统支持主力API+备用API配置，当主力API失败时自动切换到备用API，确保服务稳定性。

## ♿ 无障碍支持

本应用严格遵循 **WCAG 2.1 AA 级别**无障碍标准，为所有用户提供平等的使用体验：

### 🎯 核心特性

- **键盘导航**：所有功能都可以通过键盘完成操作
- **屏幕阅读器支持**：完整的 ARIA 标签和语义化 HTML
- **焦点管理**：清晰的焦点指示，优化的视觉效果
- **状态通知**：实时的加载、成功、错误状态播报
- **颜色对比度**：文字与背景达到 AA 级别对比度要求

### 🛠️ 技术实现

- **语义化结构**：proper HTML5 语义标签和 ARIA roles
- **表单关联**：label 与 input 的正确关联（htmlFor/id）
- **错误处理**：role="alert" 和 aria-live 区域
- **装饰隐藏**：装饰性元素使用 aria-hidden="true"
- **动画偏好**：支持 prefers-reduced-motion 媒体查询
- **屏幕阅读器专用内容**：sr-only 样式类提供额外上下文

### 🎮 键盘操作指南

- `Tab` / `Shift+Tab`：在可交互元素间导航
- `Enter` / `Space`：激活按钮和提交表单
- `↑` / `↓`：在下拉选项中导航
- `Esc`：关闭弹出内容（如适用）

## 📝 开发说明

- 项目使用 App Router 架构，支持服务端渲染
- API 路由位于 `app/api` 目录
- 组件采用客户端渲染，支持交互功能
- 样式使用 Tailwind CSS，响应式设计
- 已优化页面性能，解决了布局抖动问题
- **无障碍优先**：开发过程中始终考虑可访问性

## 🚀 部署

### Vercel 部署（推荐）

1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量（PRIMARY_AI_API_KEY 等）
3. 自动部署

### 其他平台

项目支持所有支持 Next.js 的部署平台。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 📞 联系

如有问题，请通过 GitHub Issues 联系。