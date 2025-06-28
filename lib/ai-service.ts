// 导入 HTTP 客户端库
import axios from "axios";

/**
 * AI 服务配置接口
 * 定义连接不同 AI 提供商所需的基本信息
 */
interface AIConfig {
  apiKey: string;   // API 密钥
  baseUrl: string;  // API 基础 URL
  model: string;    // 使用的模型名称
}

/**
 * 调用 AI API 的核心函数
 * 支持多种 AI 提供商（DeepSeek、OpenAI、通义千问等）
 * @param config - AI 服务配置信息
 * @param prompt - 发送给 AI 的提示词
 * @returns Promise<string> - AI 生成的回复内容
 * @throws Error - 当 API 调用失败时抛出异常
 */
export async function callAI(config: AIConfig, prompt: string): Promise<string> {
  // 发送 OpenAI 兼容格式的聊天请求
  const response = await axios.post(
    `${config.baseUrl}/chat/completions`,
    {
      model: config.model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: Number(process.env.AI_MAX_TOKENS) || 1000,  // 最大生成 token 数
      temperature: Number(process.env.AI_TEMPERATURE) || 0.7,  // 生成随机性（0-1）
      stream: false,  // 不使用流式输出
    },
    {
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      timeout: Number(process.env.AI_TIMEOUT) || 30000,  // 请求超时时间（毫秒）
    }
  );

  // 返回 AI 生成的文本内容
  return response.data.choices[0].message.content;
}

/**
 * 祝福语生成主函数
 * 实现双重容错机制：主力 API + 备用 API
 * 支持多种 AI 提供商的自动切换
 * @param prompt - 完整的提示词内容
 * @returns Promise<string> - 生成的祝福语文本
 * @throws Error - 当所有 API 都不可用时抛出异常
 */
export async function generateBlessing(prompt: string): Promise<string> {
  // 主力 AI 配置（优先使用）
  const primaryConfig: AIConfig | null = process.env.PRIMARY_AI_API_KEY
    ? {
        apiKey: process.env.PRIMARY_AI_API_KEY,
        baseUrl: process.env.PRIMARY_AI_BASE_URL || "https://api.deepseek.com",
        model: process.env.PRIMARY_AI_MODEL || "deepseek-chat",
      }
    : null;

  // 备用 AI 配置（主力失败时使用）
  const fallbackConfig: AIConfig | null = process.env.FALLBACK_AI_API_KEY
    ? {
        apiKey: process.env.FALLBACK_AI_API_KEY,
        baseUrl: process.env.FALLBACK_AI_BASE_URL || "https://api.openai.com/v1",
        model: process.env.FALLBACK_AI_MODEL || "gpt-3.5-turbo",
      }
    : null;

  // 是否启用容错机制
  const enableFallback = process.env.ENABLE_FALLBACK === "true";

  // 检查是否至少配置了一个 API
  if (!primaryConfig && !fallbackConfig) {
    throw new Error("未配置任何AI API，请检查环境变量");
  }

  // 尝试主力 API
  if (primaryConfig) {
    try {
      return await callAI(primaryConfig, prompt);
    } catch (error) {
      console.warn("主力API调用失败:", error);
      
      // 如果未启用容错或没有备用配置，直接抛出错误
      if (!enableFallback || !fallbackConfig) {
        throw error;
      }
    }
  }

  // 尝试备用 API
  if (fallbackConfig) {
    try {
      return await callAI(fallbackConfig, prompt);
    } catch (error) {
      console.error("备用API调用失败:", error);
      throw error;
    }
  }

  throw new Error("所有API都不可用");
}