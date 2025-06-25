# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 快速开始

**开发环境要求**:
- Node.js 18+ 
- pnpm 8+
- 必须配置 AI API 密钥才能正常运行

**核心开发命令**:
```bash
pnpm dev          # 启动开发服务器 (http://localhost:3000)
pnpm build        # 生产环境构建
pnpm start        # 启动生产服务器
pnpm lint         # ESLint 代码检查
pnpm test         # 运行所有测试 (17个测试文件)
pnpm test:watch   # 监视模式运行测试
pnpm test:coverage # 运行测试并生成覆盖率报告
```

**测试命令详解**:
```bash
# 运行指定组件测试
pnpm test -- __tests__/components/BlessingGenerator.test.tsx

# 运行API测试
pnpm test -- __tests__/api/blessing.test.ts

# 运行特定测试套件
pnpm test -- --testNamePattern="BlessingGenerator"

# 生成HTML覆盖率报告
pnpm test:coverage  # 查看 coverage/lcov-report/index.html
```

## 🏗️ 项目架构

### 技术栈 (生产级别)
- **框架**: Next.js 15.3.4 with App Router + TypeScript 5.7.2 (strict模式)
- **样式**: Tailwind CSS 3.4.17 + PostCSS
- **测试**: Jest 30 + React Testing Library 16 + jsdom
- **HTTP客户端**: Axios 1.7.9
- **包管理**: pnpm 8+
- **运行时**: Edge Runtime (API路由)

### 核心架构特点
1. **双模式设计**: 智能模式(自由输入) + 模板模式(预设场景)，满足不同用户需求
2. **多AI供应商支持**: 通过 `lib/ai-service.ts` 实现主力+备用API故障转移机制
3. **配置驱动**: `lib/config/` 目录包含所有业务配置（场景、节日、目标人群等）
4. **安全优先**: 三层安全防护 - middleware速率限制 + 输入验证 + 安全响应头
5. **无障碍支持**: 遵循 WCAG 2.1 AA 标准，完整的ARIA标签和键盘导航
6. **测试完备**: 17个测试文件，覆盖API、组件、工具函数，确保代码质量
7. **智能推荐**: 基于时间和场景的个性化推荐系统

### 目录结构说明 (完整架构)
```
app/
├── api/blessing/         # 主要API端点 (Edge Runtime)
├── layout.tsx            # 全局布局，无障碍优化
├── page.tsx             # 首页组件
└── globals.css          # Tailwind全局样式

components/ (10个组件)
├── BlessingGenerator.tsx   # 主生成器组件（客户端渲染）
├── SmartModeForm.tsx      # 智能模式表单
├── TemplateModeForm.tsx   # 模板模式表单
├── BlessingResult.tsx     # 结果展示组件
├── RecommendationTags.tsx # 智能推荐标签
├── SelectInput.tsx        # 自定义选择器
├── ErrorMessage.tsx       # 错误信息组件
├── EmptyState.tsx         # 空状态组件
├── BlessingForm.tsx       # 统一表单组件
└── ResultDisplay.tsx      # 结果展示封装

lib/ (核心工具库)
├── ai-service.ts          # AI服务抽象层
├── api-client.ts          # HTTP客户端封装
├── config/               # 配置管理模块
│   ├── index.ts          # 主配置导出
│   ├── occasions.ts      # 场景和节日配置
│   └── recommendations.ts # 智能推荐配置
├── prompt-templates.ts   # AI提示词模板
├── validation.ts         # 输入验证和安全过滤
└── config.ts            # 业务配置统一导出

__tests__/ (17个测试文件)
├── api/                 # API集成测试
├── components/          # 组件单元测试
└── lib/                # 工具函数测试

middleware.ts            # 安全中间件 (速率限制)
next.config.js           # Next.js配置 (安全响应头)
```

### API架构 (Edge Runtime)
- **单一端点设计**: `/api/blessing` 处理所有祝福语生成请求
- **双模式支持**: 智能模式和模板模式统一处理
- **故障转移**: 主力API失败时自动切换到备用API，确保高可用
- **请求验证**: 通过 `lib/validation.ts` 进行输入验证和安全过滤
- **边缘计算**: 使用Edge Runtime，全球低延迟访问

### 状态管理
- 使用 React Hooks (useState) 进行本地状态管理
- 没有使用复杂的状态管理库，保持简洁

### 测试架构 (完整覆盖)
- **Jest配置**: 支持模块别名(@/)，收集components/、lib/、app/目录覆盖率
- **测试环境**: jsdom模拟浏览器环境
- **测试文件**: 17个测试文件，覆盖所有核心功能
- **测试类型**:
  - **API集成测试**: 端到端API测试，包含错误处理
  - **组件单元测试**: 所有UI组件交互测试和无障碍测试
  - **工具函数测试**: 核心业务逻辑单元测试
  - **边界情况测试**: 异常输入和故障转移测试
- **覆盖率报告**: HTML + JSON + LCOV格式完整覆盖率报告

## 🔧 开发重点

### 📝 环境配置 (必需)
项目支持多种AI供应商，必须配置以下环境变量才能正常运行：

**基础配置 (必需)**:
```env
# 主力AI API (必需)
PRIMARY_AI_API_KEY=sk-xxxxx
PRIMARY_AI_BASE_URL=https://api.deepseek.com
PRIMARY_AI_MODEL=deepseek-chat

# 备用AI API (可选)
FALLBACK_AI_API_KEY=sk-xxxxx
FALLBACK_AI_BASE_URL=https://api.openai.com/v1
FALLBACK_AI_MODEL=gpt-3.5-turbo
ENABLE_FALLBACK=true
```

**支持的AI服务商**:
- **DeepSeek** (推荐): `https://api.deepseek.com`
- **OpenAI**: `https://api.openai.com/v1`
- **通义千问**: `https://dashscope.aliyuncs.com/compatible-mode/v1`
- **文心一言**: `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop`
- **Kimi**: `https://api.moonshot.cn/v1`

### 🔧 扩展配置

**添加新场景/节日**:
```typescript
// 在 lib/config/occasions.ts 中添加
{
  value: 'new-occasion',
  label: '🎉 新场景',
  description: '场景描述'
}
```

**添加新目标人群**:
```typescript
// 在 lib/config/index.ts 中的 relationships 数组添加
{
  value: 'new-relationship',
  label: '👥 新关系'
}
```

**添加新AI供应商**:
```typescript
// 在 lib/ai-service.ts 中扩展配置
const newProvider = {
  baseURL: 'https://api.newprovider.com/v1',
  model: 'new-model-name',
  headers: { /* 自定义请求头 */ }
}
```

**修改推荐逻辑**:
```typescript
// 在 lib/config/recommendations.ts 中自定义算法
```

### 🔒 安全特性 (三层防护)

**中间件层安全** (`middleware.ts`):
- 智能速率限制: 每分钟8次，每天50次
- IP级别控制: 基于真实IP进行限流
- 内存优化: 自动清理过期记录
- Edge Runtime兼容: 适配边缘计算环境

**输入验证层** (`lib/validation.ts`):
- 长度检查: 防止过长输入导致性能问题
- 内容过滤: 危险词汇和恶意内容检测
- 文本清理: 输入标准化和特殊字符处理

**HTTP安全响应头** (`next.config.js`):
- `X-Content-Type-Options: nosniff`: 防止MIME类型嗅探攻击
- `X-Frame-Options: SAMEORIGIN`: 防止点击劫持攻击
- `X-XSS-Protection: 1; mode=block`: 内置XSS保护

**API安全设计**:
- 故障转移机制: 主力API失败自动切换备用API
- 请求验证: 严格的参数校验和类型检查
- 错误处理: 安全的错误信息返回，避免信息泄露

### ♿ 无障碍开发 (WCAG 2.1 AA)

**核心要求**:
- 所有交互元素必须有proper focus管理
- 新组件需要添加适当的ARIA标签
- 使用语义化HTML结构 (不使用div做按钮)
- 支持键盘导航和屏幕阅读器

**具体实现**:
- 表单关联: `htmlFor` 和 `id` 正确对应
- 状态通知: `role="alert"` 和 `aria-live` 区域
- 装饰隐藏: 装饰性元素使用 `aria-hidden="true"`
- 动画偏好: 支持 `prefers-reduced-motion` 媒体查询
- 屏幕阅读器专用: `sr-only` 样式类提供额外上下文

**键盘操作支持**:
- `Tab/Shift+Tab`: 在可交互元素间导航
- `Enter/Space`: 激活按钮和提交表单
- `↑/↓`: 在下拉选项中导航
- `Esc`: 关闭弹出内容

### 🚀 性能优化

**运行时优化**:
- **组件渲染**: 采用客户端渲染 (`"use client"`)，支持交互功能
- **API路由**: 使用Edge Runtime，全球低延迟访问
- **布局优化**: 已解决布局抖动(CLS)问题
- **资源管理**: 图片和静态资源放在 `public/` 目录
- **代码分割**: 按需加载，减少初始包体积
- **客户端缓存**: 合理的浏览器缓存策略

**开发体验优化**:
- **热重载**: 开发环境快速反馈
- **类型检查**: 编译时错误捕获，strict模式开发
- **代码质量**: ESLint保证代码风格一致性
- **测试覆盖**: 持续集成质量保证

**Edge Runtime 注意事项**:
- 使用原生 `Map` 而非 `Object` 进行存储
- 不支持Node.js特定的API(如 `fs`, `path`)
- 不能使用某些第三方包，需要检查兼容性

## 📋 重要开发指南

### 🚨 关键原则
- **不要过度创建**: 除非绝对必要，否则不要创建新文件
- **优先编辑**: 始终优先编辑现有文件而非创建新文件
- **不主动创建文档**: 禁止主动创建文档文件（*.md）或README文件
- **代码质量**: 始终遵循TypeScript strict模式和项目的ESLint规则
- **测试优先**: 任何新功能都必须编写相应测试

### 🔍 开发流程
1. **先读代码**: 理解现有架构和代码风格
2. **遵循约定**: 使用现有的组件模式和命名约定
3. **先测试**: 先写测试或更新现有测试，再实现功能
4. **安全优先**: 所有用户输入都必须通过 `lib/validation.ts` 验证
5. **无障碍检查**: 新组件必须包含适当的ARIA标签和键盘支持

### 🔧 常用维护命令
```bash
# 开发前检查
pnpm lint
pnpm test

# 测试驱动开发
pnpm test:watch

# 代码质量检查
pnpm test:coverage

# 生产构建验证
pnpm build
```