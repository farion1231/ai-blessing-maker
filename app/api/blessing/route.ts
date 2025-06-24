// Next.js API 路由相关导入
import { NextRequest, NextResponse } from "next/server";
// HTTP 请求库，用于错误处理
import axios from "axios";
// AI 服务函数，用于调用外部 AI API
import { generateBlessing } from "@/lib/ai-service";
// 提示词模板生成器
import { createBlessingPrompt } from "@/lib/prompt-templates";
// 安全验证和清理函数
import { validateAndSanitizeInput, sanitizeText, getSafeErrorMessage, generateRequestFingerprint } from "@/lib/security";
// 类型导入
import { BlessingRequest } from "@/lib/types";
// 日志和监控
import { logger, apiMonitor } from "@/lib/logger";

/**
 * 祝福语生成 API 路由处理函数
 * 处理 POST 请求，接收用户参数并调用 AI 服务生成祝福语
 * 支持两种模式：经典模板模式和智能描述模式
 * @param req - Next.js 请求对象，包含用户发送的数据
 * @returns JSON 响应，包含生成的祝福语或错误信息
 */
export async function POST(req: NextRequest) {
  const startTime = Date.now();
  
  // 生成客户端标识
  const clientId = generateRequestFingerprint(
    req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
    req.headers.get('user-agent') || 'unknown',
    req.headers.get('accept-language'),
    req.headers.get('accept-encoding')
  );
  
  try {
    // 解析请求体中的 JSON 数据
    const body: BlessingRequest = await req.json();
    
    // 记录请求
    logger.info('API请求接收', {
      clientId,
      mode: body.mode || body.useSmartMode ? 'smart' : 'classic',
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
    });
    
    // 验证和清理输入
    const validation = validateAndSanitizeInput(body);
    if (!validation.isValid) {
      const duration = Date.now() - startTime;
      logger.warn('请求验证失败', { clientId, error: validation.error, duration });
      apiMonitor.track(clientId, duration, true);
      
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }
    
    // 清理文本输入
    if (body.customDescription) {
      body.customDescription = sanitizeText(body.customDescription);
    }
    if (body.additionalInfo) {
      body.additionalInfo = sanitizeText(body.additionalInfo);
    }
    
    // 根据请求参数生成相应的 AI 提示词
    const prompt = createBlessingPrompt(body);
    
    // 调用 AI 服务生成祝福语
    const blessing = await generateBlessing(prompt);
    
    // 记录成功
    const duration = Date.now() - startTime;
    logger.info('祝福语生成成功', { clientId, duration });
    apiMonitor.track(clientId, duration);

    // 返回成功结果，添加安全响应头
    const response = NextResponse.json({ blessing });
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    return response;
  } catch (error) {
    const duration = Date.now() - startTime;
    
    // 记录错误
    logger.error('生成祝福语失败', error instanceof Error ? error : new Error(String(error)), {
      clientId,
      duration
    });
    apiMonitor.track(clientId, duration, true);

    // 使用安全的错误信息，不暴露内部细节
    const errorMessage = getSafeErrorMessage(error);

    // 返回错误响应
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
