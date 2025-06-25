# 🎊 AI祝福语生成器

基于 Next.js 15 + TypeScript 构建的智能祝福语生成应用，支持多AI供应商切换，为不同场景和节日生成个性化祝福语。

## ✨ 核心功能

### 🎯 智能生成模式
- **双模式支持**：智能模式（自由输入）+ 模板模式（预设场景）
- **多场景覆盖**：生日、婚礼、毕业、升职等12种生活场景
- **节日主题**：春节、中秋、圣诞节等16个传统和现代节日
- **目标人群定制**：朋友、家人、同事、恋人等15种关系类型
- **风格多样化**：温馨、正式、幽默、诗意等7种表达风格

### 🛡️ 企业级特性  
- **高可用性**：主力+备用AI故障转移机制
- **安全防护**：智能速率限制、输入验证、XSS防护
- **无障碍支持**：符合 WCAG 2.1 AA 标准，完整键盘导航
- **性能优化**：Edge Runtime、客户端缓存、响应式设计
- **智能推荐**：基于时间和场景的个性化推荐

## 🚀 技术栈

- **前端框架**：Next.js 15.3.4 with App Router
- **开发语言**：TypeScript 5.7.2（strict模式）
- **样式框架**：Tailwind CSS 3.4.17
- **HTTP客户端**：Axios 1.7.9
- **测试框架**：Jest 30 + React Testing Library 16
- **多AI支持**：支持 DeepSeek、OpenAI、通义千问、文心一言、Kimi 等
- **包管理器**：pnpm 8+
- **部署平台**：Vercel、Netlify 等 Edge Runtime 环境

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

## 📁 项目架构

```
ai-blessing-maker/
├── app/                      # Next.js 15 App Router
│   ├── api/blessing/        # API 路由 (Edge Runtime)
│   ├── layout.tsx           # 根布局 (无障碍优化)
│   ├── page.tsx            # 首页组件
│   └── globals.css         # Tailwind 全局样式
├── components/             # React 组件库 (10个组件)
│   ├── BlessingGenerator.tsx  # 主生成器组件
│   ├── SmartModeForm.tsx     # 智能模式表单
│   ├── TemplateModeForm.tsx  # 模板模式表单
│   ├── BlessingResult.tsx    # 结果展示组件
│   └── ...                   # 其他UI组件
├── lib/                    # 核心工具库
│   ├── ai-service.ts       # AI服务抽象层
│   ├── config/             # 配置管理模块
│   │   ├── index.ts        # 主配置导出
│   │   ├── occasions.ts    # 场景和节日配置
│   │   └── recommendations.ts # 智能推荐配置
│   ├── prompt-templates.ts # AI提示词模板
│   ├── validation.ts       # 输入验证和安全过滤
│   └── api-client.ts       # HTTP客户端封装
├── __tests__/              # 完整测试套件 (17个测试文件)
│   ├── api/                # API集成测试
│   ├── components/         # 组件单元测试 
│   └── lib/                # 工具函数测试
├── middleware.ts           # 安全中间件 (速率限制)
├── next.config.js          # Next.js配置 (安全响应头)
└── public/                 # 静态资源
```

### 🏗️ 架构特点

- **模块化设计**：清晰的关注点分离，每个模块职责单一
- **配置驱动**：业务逻辑通过配置文件管理，易于扩展
- **类型安全**：全量TypeScript覆盖，strict模式开发
- **测试完备**：17个测试文件，覆盖API、组件、工具函数
- **安全优先**：多层安全防护，从中间件到输入验证

## 🎯 使用方式

1. **选择场景**：从生日、婚礼、毕业等场景中选择
2. **设定节日**：可选择对应的节日主题
3. **确定对象**：选择祝福的目标人群
4. **挑选风格**：选择合适的表达风格
5. **生成祝福**：点击按钮即可获得个性化祝福语
6. **复制分享**：一键复制到剪贴板，便于分享

## 🧪 测试套件

项目包含**完整的测试覆盖**，确保代码质量和功能稳定性：

```bash
# 运行所有测试
pnpm test

# 监视模式开发
pnpm test:watch

# 生成覆盖率报告
pnpm test:coverage
```

### 测试架构
- **API测试**：完整的端到端API测试，包含错误处理
- **组件测试**：所有UI组件的交互测试和无障碍测试
- **工具函数测试**：核心业务逻辑的单元测试
- **集成测试**：多组件协作的集成场景测试

### 测试覆盖
- **17个测试文件**，覆盖项目核心功能
- **完整的边界情况**测试
- **无障碍功能**专项测试
- **AI服务故障转移**测试

## 🔧 自定义配置

### 添加新场景
在 `lib/config/occasions.ts` 中添加新的场景配置：

```typescript
{
  value: 'your-scenario',
  label: '🎯 你的场景',
  description: '场景描述'
}
```

### 添加新AI供应商
在 `lib/ai-service.ts` 中扩展AI服务配置：

```typescript
// 添加新的AI服务商配置
const newProvider = {
  baseURL: 'https://api.newprovider.com/v1',
  model: 'new-model-name'
}
```

### 修改推荐逻辑
在 `lib/config/recommendations.ts` 中自定义智能推荐算法。

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

## 🔐 安全特性

### 多层安全防护

**中间件层安全 (middleware.ts)**
- **智能速率限制**：每分钟8次，每天50次请求限制
- **IP级别控制**：基于真实IP进行限流统计
- **内存优化**：自动清理过期记录，防止内存泄漏
- **Edge Runtime兼容**：适配边缘计算环境

**输入验证安全 (lib/validation.ts)**
- **长度检查**：防止过长输入导致的性能问题
- **内容过滤**：危险词汇和恶意内容检测
- **文本清理**：输入标准化和特殊字符处理

**HTTP安全响应头 (next.config.js)**
- `X-Content-Type-Options: nosniff`：防止MIME类型嗅探攻击
- `X-Frame-Options: SAMEORIGIN`：防止点击劫持攻击
- `X-XSS-Protection: 1; mode=block`：内置XSS保护

### API安全设计
- **故障转移机制**：主力API失败自动切换备用API
- **请求验证**：严格的参数校验和类型检查
- **错误处理**：安全的错误信息返回，避免信息泄露

## 📈 性能优化

### 运行时优化
- **Edge Runtime**：API路由使用边缘计算，降低延迟
- **客户端缓存**：合理的浏览器缓存策略
- **代码分割**：按需加载，减少初始包体积
- **图片优化**：Next.js内置图片优化

### 开发体验优化
- **热重载**：开发环境快速反馈
- **类型检查**：编译时错误捕获
- **ESLint**：代码质量保证
- **测试覆盖**：持续集成质量保证

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