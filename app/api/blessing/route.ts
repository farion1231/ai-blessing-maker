import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY
const DEEPSEEK_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com'

interface BlessingRequest {
  scenario: string
  festival: string
  targetPerson: string
  style?: string
}

function createBlessingPrompt(options: BlessingRequest): string {
  const { scenario, festival, targetPerson, style = "温馨" } = options
  
  return `请为我生成一段祝福语，要求如下：
- 场景：${scenario}
- 节日：${festival || "无特定节日"}
- 目标人群：${targetPerson}
- 风格：${style}

请生成一段真诚、温暖、符合中文表达习惯的祝福语。祝福语应该：
1. 符合指定的场景和节日氛围
2. 针对目标人群使用合适的称呼和语气
3. 内容积极正面，表达美好祝愿
4. 长度适中，大约50-100字
5. 语言流畅自然，避免过于华丽的辞藻

请直接返回祝福语内容，不需要其他说明。`
}

export async function POST(req: NextRequest) {
  try {
    const body: BlessingRequest = await req.json()
    
    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { error: 'API配置错误' },
        { status: 500 }
      )
    }

    const prompt = createBlessingPrompt(body)
    
    const response = await axios.post(
      `${DEEPSEEK_BASE_URL}/chat/completions`,
      {
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      },
      {
        headers: {
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    )

    const blessing = response.data.choices[0].message.content
    
    return NextResponse.json({ blessing })
  } catch (error) {
    console.error('API调用失败:', error)
    
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { 
          error: error.response?.data?.error?.message || '生成祝福语失败，请稍后重试' 
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: '生成祝福语失败，请稍后重试' },
      { status: 500 }
    )
  }
}