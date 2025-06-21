# 🎊 AI祝福语生成器

基于 Next.js 14 + TypeScript 构建的智能祝福语生成应用，集成 DeepSeek AI，为不同场景和节日生成个性化祝福语。

## ✨ 主要功能

- **多场景支持**：生日、婚礼、毕业、升职等12种生活场景
- **节日主题**：春节、中秋、圣诞节等16个传统和现代节日
- **目标人群定制**：朋友、家人、同事、恋人等15种关系类型
- **风格多样化**：温馨、正式、幽默、诗意等7种表达风格
- **响应式设计**：完美适配桌面端和移动端
- **一键复制**：生成后可直接复制分享
- **实时生成**：基于AI的即时祝福语创作

## 🚀 技术栈

- **前端框架**：Next.js 14 with App Router
- **开发语言**：TypeScript
- **样式框架**：Tailwind CSS
- **AI集成**：DeepSeek Chat API
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

2. 配置 DeepSeek API：
```env
DEEPSEEK_API_KEY=your_deepseek_api_key_here
DEEPSEEK_BASE_URL=https://api.deepseek.com/v1
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

在 `app/api/blessing/route.ts` 中修改 `generatePrompt` 函数。

## 📝 开发说明

- 项目使用 App Router 架构，支持服务端渲染
- API 路由位于 `app/api` 目录
- 组件采用客户端渲染，支持交互功能
- 样式使用 Tailwind CSS，响应式设计
- 已优化页面性能，解决了布局抖动问题

## 🚀 部署

### Vercel 部署（推荐）

1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量（DEEPSEEK_API_KEY 等）
3. 自动部署

### 其他平台

项目支持所有支持 Next.js 的部署平台。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 📞 联系

如有问题，请通过 GitHub Issues 联系。