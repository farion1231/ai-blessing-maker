// Next.js API 路由相关导入
import { NextRequest, NextResponse } from "next/server";
// HTTP 请求库，用于错误处理
import axios from "axios";
// AI 服务函数，用于调用外部 AI API
import { generateBlessing } from "@/lib/ai-service";
// 提示词模板生成器
import { createBlessingPrompt } from "@/lib/prompt-templates";
// 输入验证和清理函数
import { validateInput, cleanText } from "@/lib/validation";

/**
 * API 请求体接口
 * 定义了前端发送的祝福语生成请求的数据结构
 */
interface BlessingRequest {
  scenario: string;           // 场景类型（经典模式）
  festival: string;           // 节日类型（经典模式）
  targetPerson: string;       // 目标人群（经典模式）
  style?: string;             // 祝福语风格（可选）
  customDescription?: string; // 自定义描述（智能模式）
  useSmartMode?: boolean;     // 是否使用智能模式
}

/**
 * 祝福语生成 API 路由处理函数
 * 处理 POST 请求，接收用户参数并调用 AI 服务生成祝福语
 * 支持两种模式：经典模板模式和智能描述模式
 * @param req - Next.js 请求对象，包含用户发送的数据
 * @returns JSON 响应，包含生成的祝福语或错误信息
 */
export async function POST(req: NextRequest) {
  try {
    // 解析请求体中的 JSON 数据
    const body: BlessingRequest = await req.json();
    
    // 基础验证
    const validation = validateInput(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }
    
    // 清理输入
    if (body.customDescription) {
      body.customDescription = cleanText(body.customDescription);
    }
    
    // 根据请求参数生成相应的 AI 提示词
    const prompt = createBlessingPrompt(body);
    
    // 调用 AI 服务生成祝福语
    const blessing = await generateBlessing(prompt);

    // 返回成功结果
    return NextResponse.json({ blessing });
  } catch (error) {
    // 记录错误信息用于调试
    console.error("生成祝福语失败:", error);

    // 简化错误处理
    const errorMessage = error instanceof Error && error.message.includes('429')
      ? "请求太频繁，请稍后再试"
      : "生成失败，请重试";

    // 返回错误响应
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
