# CLAUDE.md

此文件为 Claude Code (claude.ai/code) 在本代码库中工作时提供指导。
使用中文交互
不要自动 commit

## 项目概述

这是一个基于 Next.js 14 + TypeScript 的 AI 祝福语生成器应用。用户可以通过选择场景、节日、目标人群和风格来生成个性化的祝福语。项目采用 App Router 结构，支持 SEO 优化。

## 常用命令

```bash
# 开发服务器
pnpm dev

# 生产环境构建
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint
```

## 架构

- **前端框架**: Next.js 14 with App Router + TypeScript
- **样式框架**: Tailwind CSS
- **HTTP 客户端**: Fetch API 和 Axios (服务端)
- **API**: Next.js API Routes

### 项目结构

```
├── app/                    # Next.js App Router
│   ├── api/blessing/       # API 路由 (祝福语生成)
│   ├── layout.tsx          # 根布局
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   └── BlessingGenerator.tsx  # 主要祝福语生成器组件
├── lib/                   # 工具函数和配置
│   ├── api-client.ts      # 客户端 API 调用
│   └── config.ts          # 选项配置 (场景、节日等)
```

### 核心功能

**祝福语生成器**：

- 场景选择：生日、婚礼、毕业、升职等 12 种场景
- 节日选择：春节、中秋、圣诞等 16 个节日选项
- 目标人群：朋友、家人、同事等 15 种关系
- 风格选择：温馨、正式、幽默等 7 种风格

**用户体验**：

- 响应式设计，支持移动端
- 实时加载状态显示
- 一键复制功能
- 重新生成功能

### API 集成

**服务端路由** (`/api/blessing`):

- 使用 DeepSeek Chat 模型
- 结构化提示词模板
- 错误处理和重试机制

**客户端调用**:

- 通过 `/api/blessing` 路由调用
- 使用 fetch API
- 自动错误处理

### 环境变量

必需的环境变量：

- `DEEPSEEK_API_KEY` - DeepSeek API 密钥
- `DEEPSEEK_BASE_URL` - DeepSeek API 基础 URL (默认: https://api.deepseek.com/v1)

创建 `.env.local` 文件配置这些变量。

### SEO 优化

- 使用 Next.js Metadata API
- 配置了页面标题、描述和关键词
- 支持服务端渲染 (SSR)
- 语言设置为中文 (zh-CN)
