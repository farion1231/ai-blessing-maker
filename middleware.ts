import { NextRequest, NextResponse } from "next/server";

// 简单配置
const RATE_LIMIT = {
  window: 60 * 1000,    // 1分钟窗口
  maxRequests: 8,       // 每分钟8次（比之前的10次更宽松）
  dailyLimit: 50        // 每天50次（比之前的20次更宽松）
};

// 使用原生Map，但只存储必要信息
const requestLog = new Map<string, { 
  count: number; 
  resetTime: number; 
  dailyCount: number; 
  dailyReset: number 
}>();

export function middleware(req: NextRequest) {
  // 只对祝福API限流
  if (!req.nextUrl.pathname.startsWith("/api/blessing")) {
    return NextResponse.next();
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || 
             req.headers.get("x-real-ip") || 
             "unknown";
  
  const now = Date.now();
  const todayEnd = new Date().setHours(23, 59, 59, 999);
  
  let record = requestLog.get(ip);
  
  if (!record || now > record.resetTime) {
    record = { 
      count: 0, 
      resetTime: now + RATE_LIMIT.window,
      dailyCount: record?.dailyCount || 0,
      dailyReset: record?.dailyReset || todayEnd
    };
  }
  
  if (now > record.dailyReset) {
    record.dailyCount = 0;
    record.dailyReset = todayEnd;
  }
  
  // 检查限制
  if (record.count >= RATE_LIMIT.maxRequests) {
    return NextResponse.json(
      { error: "请求太频繁，请稍后再试" },
      { status: 429 }
    );
  }
  
  if (record.dailyCount >= RATE_LIMIT.dailyLimit) {
    return NextResponse.json(
      { error: "今日使用次数已达上限" },
      { status: 429 }
    );
  }
  
  // 更新计数
  record.count++;
  record.dailyCount++;
  requestLog.set(ip, record);
  
  // 简单清理（只在Map过大时）
  if (requestLog.size > 1000) {
    const oldEntries = Array.from(requestLog.entries())
      .filter(([_, data]) => now > data.resetTime)
      .slice(0, 500);
    oldEntries.forEach(([key]) => requestLog.delete(key));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};