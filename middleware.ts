import { NextRequest, NextResponse } from "next/server";
import { getClientIP, checkRateLimit } from "@/lib/rate-limit";

export async function middleware(req: NextRequest) {
  // 只对祝福API进行速率限制
  if (!req.nextUrl.pathname.startsWith("/api/blessing")) {
    return NextResponse.next();
  }

  try {
    // 获取客户端真实IP（适配Vercel环境）
    const clientIP = getClientIP(req);
    
    // 使用Redis进行速率限制检查
    const limitResult = await checkRateLimit(clientIP);
    
    if (!limitResult.success) {
      // 返回速率限制错误，包含更多有用信息
      const response = NextResponse.json(
        { 
          error: limitResult.error || "请求太频繁",
          resetTime: limitResult.resetTime,
          limit: limitResult.limit
        },
        { status: 429 }
      );
      
      // 添加标准的速率限制响应头
      response.headers.set('X-RateLimit-Limit', limitResult.limit.toString());
      response.headers.set('X-RateLimit-Remaining', limitResult.remaining.toString());
      response.headers.set('X-RateLimit-Reset', limitResult.resetTime.toString());
      
      return response;
    }
    
    // 创建响应并添加速率限制信息头
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', limitResult.limit.toString());
    response.headers.set('X-RateLimit-Remaining', limitResult.remaining.toString());
    response.headers.set('X-RateLimit-Reset', limitResult.resetTime.toString());
    
    return response;
    
  } catch (error) {
    console.error('中间件错误:', error);
    
    // 当速率限制服务出现问题时，采用保守策略：拒绝请求
    // 这比允许无限制访问更安全
    return NextResponse.json(
      { error: "服务暂时不可用，请稍后重试" },
      { status: 503 }
    );
  }
}

export const config = {
  matcher: "/api/:path*",
};