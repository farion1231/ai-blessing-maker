# 🚀 部署指南

本文档详细介绍如何部署 AI 祝福语生成器到各个平台。

## 📋 目录

- [环境要求](#环境要求)
- [环境变量配置](#环境变量配置)
- [Vercel 部署（推荐）](#vercel-部署推荐)
- [其他部署平台](#其他部署平台)
- [常见问题](#常见问题)

## 环境要求

- Node.js 18+ 
- pnpm 8+
- AI API 密钥（至少配置一个主力 API）

## 环境变量配置

### 必需的环境变量

```env
# 主力 AI API（必需）
PRIMARY_AI_API_KEY=sk-xxxxx
PRIMARY_AI_BASE_URL=https://api.deepseek.com
PRIMARY_AI_MODEL=deepseek-chat
```

### 可选的环境变量

```env
# 备用 AI API（可选，用于故障转移）
FALLBACK_AI_API_KEY=sk-xxxxx
FALLBACK_AI_BASE_URL=https://api.openai.com/v1
FALLBACK_AI_MODEL=gpt-3.5-turbo

# 故障转移设置
ENABLE_FALLBACK=true
```

### 支持的 AI 服务商配置示例

<details>
<summary>DeepSeek（推荐）</summary>

```env
PRIMARY_AI_API_KEY=sk-xxxxx
PRIMARY_AI_BASE_URL=https://api.deepseek.com
PRIMARY_AI_MODEL=deepseek-chat
```
</details>

<details>
<summary>OpenAI</summary>

```env
PRIMARY_AI_API_KEY=sk-xxxxx
PRIMARY_AI_BASE_URL=https://api.openai.com/v1
PRIMARY_AI_MODEL=gpt-3.5-turbo
```
</details>

<details>
<summary>通义千问</summary>

```env
PRIMARY_AI_API_KEY=sk-xxxxx
PRIMARY_AI_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
PRIMARY_AI_MODEL=qwen-turbo
```
</details>

<details>
<summary>文心一言</summary>

```env
PRIMARY_AI_API_KEY=sk-xxxxx
PRIMARY_AI_BASE_URL=https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop
PRIMARY_AI_MODEL=ERNIE-4.0-8K
```
</details>

<details>
<summary>Kimi</summary>

```env
PRIMARY_AI_API_KEY=sk-xxxxx
PRIMARY_AI_BASE_URL=https://api.moonshot.cn/v1
PRIMARY_AI_MODEL=moonshot-v1-8k
```
</details>

## Vercel 部署（推荐）

### 快速部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/ai-blessing-maker)

### 手动部署步骤

#### 1. 准备工作

1. 注册 [Vercel 账号](https://vercel.com)
2. Fork 本项目到你的 GitHub

#### 2. 导入项目

1. 登录 Vercel 控制台
2. 点击 "New Project"
3. 选择 "Import Git Repository"
4. 选择你 Fork 的仓库
5. 点击 "Import"

#### 3. 配置环境变量

在项目配置页面，添加以下环境变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `PRIMARY_AI_API_KEY` | `sk-xxxxx` | 你的 AI API 密钥 |
| `PRIMARY_AI_BASE_URL` | `https://api.deepseek.com` | AI 服务商的 API 地址 |
| `PRIMARY_AI_MODEL` | `deepseek-chat` | 使用的模型名称 |

#### 4. 配置 Vercel KV（速率限制）

##### 4.1 创建 KV 数据库

1. 在项目页面，点击顶部的 **"Storage"** 标签
2. 点击 **"Create Database"**
3. 选择 **"KV"** 作为数据库类型
4. 配置数据库：
   - **名称**：`blessing-rate-limit`（或自定义）
   - **区域**：选择离目标用户最近的区域
   - **主区域**：建议选择与项目部署相同的区域
5. 点击 **"Create"**

##### 4.2 连接到项目

1. 创建完成后，点击 **"Connect Project"**
2. 选择你的项目
3. 确认连接

##### 4.3 验证环境变量

连接成功后，Vercel 会自动添加以下环境变量：

- `KV_URL`：KV 数据库的连接 URL
- `KV_REST_API_URL`：REST API 端点
- `KV_REST_API_TOKEN`：访问令牌
- `KV_REST_API_READ_ONLY_TOKEN`：只读令牌

在 "Environment Variables" 页面确认这些变量已添加。

##### 4.4 Vercel KV 免费额度

免费套餐包含：
- **256MB** 存储空间
- **3,000** 个日请求
- **150,000** 个月请求

> 💡 对于个人使用的祝福语生成应用，免费额度完全足够。

#### 5. 部署项目

1. 确认所有配置无误
2. 点击 **"Deploy"**
3. 等待构建完成（通常需要 1-2 分钟）
4. 部署成功后，你会获得一个 `.vercel.app` 域名

#### 6. 自定义域名（可选）

1. 在项目设置中，选择 "Domains"
2. 添加你的自定义域名
3. 按照提示配置 DNS

### 部署后验证

1. 访问你的应用 URL
2. 尝试生成一条祝福语
3. 快速连续点击生成按钮，验证速率限制是否生效

## 其他部署平台

### Netlify

1. **注意事项**：
   - Netlify 不支持 Vercel KV
   - 需要修改速率限制实现或使用其他方案（如 Upstash Redis）

2. **部署步骤**：
   ```bash
   # 构建项目
   pnpm build
   
   # 使用 Netlify CLI
   netlify deploy --prod
   ```

### Cloudflare Pages

1. **优势**：
   - 全球 CDN
   - 支持 Edge Runtime
   - 可使用 Cloudflare KV 替代 Vercel KV

2. **部署配置**：
   - 构建命令：`pnpm build`
   - 输出目录：`.next`

### Docker 自托管

1. **创建 Dockerfile**：
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY . .
   RUN npm install -g pnpm
   RUN pnpm install
   RUN pnpm build
   EXPOSE 3000
   CMD ["pnpm", "start"]
   ```

2. **构建和运行**：
   ```bash
   docker build -t ai-blessing-maker .
   docker run -p 3000:3000 --env-file .env ai-blessing-maker
   ```

## 常见问题

### Q: 部署后速率限制不生效？

**A:** 检查以下几点：
1. 确认 Vercel KV 已正确连接
2. 检查环境变量中是否有 `KV_REST_API_URL` 和 `KV_REST_API_TOKEN`
3. 重新部署项目

### Q: API 调用失败？

**A:** 请检查：
1. API 密钥是否正确
2. API 服务商的地址是否正确
3. 模型名称是否支持
4. API 余额是否充足

### Q: 如何查看错误日志？

**A:** 在 Vercel 控制台：
1. 进入项目页面
2. 点击 "Functions" 标签
3. 查看 API 路由的日志

### Q: 如何更新部署？

**A:** 
- **自动更新**：推送代码到 GitHub，Vercel 会自动部署
- **手动更新**：在 Vercel 控制台点击 "Redeploy"

### Q: 如何监控使用情况？

**A:** 
1. **Vercel Analytics**：查看访问统计
2. **KV 使用量**：在 Storage 页面查看
3. **API 用量**：在各 AI 服务商的控制台查看

## 🆘 需要帮助？

如果遇到部署问题，请：

1. 查看 [项目 Issues](https://github.com/your-username/ai-blessing-maker/issues)
2. 提交新的 Issue，描述你的问题
3. 加入社区讨论

---

祝你部署顺利！🎉