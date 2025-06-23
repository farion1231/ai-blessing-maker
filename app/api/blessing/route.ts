import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

interface BlessingRequest {
  // 快速模板选项
  scenario: string;
  festival: string;
  targetPerson: string;
  style?: string;
  
  // 智能描述模式
  customDescription?: string;
  useSmartMode?: boolean;
}

interface AIConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
}

function createSmartPrompt(options: BlessingRequest): string {
  const { customDescription } = options;
  
  return `请根据以下描述生成一段个性化的祝福语：

用户描述：${customDescription}

请生成一段真诚、个性化、符合情境的祝福语。要求：
1. 深度理解用户描述中的所有细节：人物关系、具体情况、情感背景等
2. 自动识别并恰当使用文中提到的姓名、称呼、关系
3. 根据描述的场景和情境选择最合适的语气和风格
4. 体现对具体情况的理解和针对性关怀
5. 长度适中（50-100字），真诚自然，避免套话模板
6. 语言温暖有力，富有个人色彩和情感共鸣
7. 如果描述中包含特殊背景，要巧妙地体现出来

请直接返回祝福语内容，不需要其他说明。`;
}

function createTemplatePrompt(options: BlessingRequest): string {
  const { scenario, targetPerson, style = "温馨" } = options;

  return `请为我生成一段祝福语，要求如下：
- 祝福场合：${scenario}
- 目标人群：${targetPerson}
- 风格：${style}

请生成一段真诚、温暖、符合中文表达习惯的祝福语。祝福语应该：
1. 符合指定的祝福场合和氛围
2. 针对目标人群使用合适的称呼和语气
3. 内容积极正面，表达美好祝愿
4. 长度适中，大约50-80字
5. 语言流畅自然，避免过于华丽的辞藻

请直接返回祝福语内容，不需要其他说明。`;
}

function createBlessingPrompt(options: BlessingRequest): string {
  if (options.useSmartMode && options.customDescription?.trim()) {
    return createSmartPrompt(options);
  } else {
    return createTemplatePrompt(options);
  }
}

async function callAI(config: AIConfig, prompt: string): Promise<string> {
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

async function generateBlessing(prompt: string): Promise<string> {
  // 主力API配置
  const primaryConfig: AIConfig | null = process.env.PRIMARY_AI_API_KEY
    ? {
        apiKey: process.env.PRIMARY_AI_API_KEY,
        baseUrl: process.env.PRIMARY_AI_BASE_URL || "https://api.deepseek.com",
        model: process.env.PRIMARY_AI_MODEL || "deepseek-chat",
      }
    : null;

  // 备用API配置
  const fallbackConfig: AIConfig | null = process.env.FALLBACK_AI_API_KEY
    ? {
        apiKey: process.env.FALLBACK_AI_API_KEY,
        baseUrl: process.env.FALLBACK_AI_BASE_URL || "https://api.openai.com/v1",
        model: process.env.FALLBACK_AI_MODEL || "gpt-3.5-turbo",
      }
    : null;

  const enableFallback = process.env.ENABLE_FALLBACK === "true";

  // 检查是否有可用的API配置
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

export async function POST(req: NextRequest) {
  try {
    const body: BlessingRequest = await req.json();
    const prompt = createBlessingPrompt(body);
    const blessing = await generateBlessing(prompt);

    return NextResponse.json({ blessing });
  } catch (error) {
    console.error("生成祝福语失败:", error);

    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error?.message || 
                          error.message || 
                          "生成祝福语失败，请稍后重试";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    const errorMessage = error instanceof Error 
      ? error.message 
      : "生成祝福语失败，请稍后重试";

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
