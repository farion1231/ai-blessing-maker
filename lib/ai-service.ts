import axios from "axios";

interface AIConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
}

export async function callAI(config: AIConfig, prompt: string): Promise<string> {
  const response = await axios.post(
    `${config.baseUrl}/chat/completions`,
    {
      model: config.model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: Number(process.env.AI_MAX_TOKENS) || 1000,
      temperature: Number(process.env.AI_TEMPERATURE) || 0.7,
      stream: false,
    },
    {
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      timeout: Number(process.env.AI_TIMEOUT) || 30000,
    }
  );

  return response.data.choices[0].message.content;
}

export async function generateBlessing(prompt: string): Promise<string> {
  const primaryConfig: AIConfig | null = process.env.PRIMARY_AI_API_KEY
    ? {
        apiKey: process.env.PRIMARY_AI_API_KEY,
        baseUrl: process.env.PRIMARY_AI_BASE_URL || "https://api.deepseek.com",
        model: process.env.PRIMARY_AI_MODEL || "deepseek-chat",
      }
    : null;

  const fallbackConfig: AIConfig | null = process.env.FALLBACK_AI_API_KEY
    ? {
        apiKey: process.env.FALLBACK_AI_API_KEY,
        baseUrl: process.env.FALLBACK_AI_BASE_URL || "https://api.openai.com/v1",
        model: process.env.FALLBACK_AI_MODEL || "gpt-3.5-turbo",
      }
    : null;

  const enableFallback = process.env.ENABLE_FALLBACK === "true";

  if (!primaryConfig && !fallbackConfig) {
    throw new Error("未配置任何AI API，请检查环境变量");
  }

  // 尝试主力API
  if (primaryConfig) {
    try {
      return await callAI(primaryConfig, prompt);
    } catch (error) {
      console.warn("主力API调用失败:", error);
      
      if (!enableFallback || !fallbackConfig) {
        throw error;
      }
    }
  }

  // 尝试备用API
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