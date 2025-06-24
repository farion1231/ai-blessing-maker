import { NextRequest, NextResponse } from "next/server";

// 速率限制配置
const RATE_LIMIT_WINDOW = 60 * 1000; // 1分钟
const MAX_REQUESTS_PER_WINDOW = 10; // 每分钟最多10次请求
const MAX_REQUESTS_PER_DAY = 20; // 每天最多20次请求

// 内存存储（生产环境建议使用Redis）
const requestCounts = new Map<
  string,
  {
    count: number;
    firstRequest: number;
    dailyCount: number;
    dailyReset: number;
  }
>();

// 清理过期记录的函数
function cleanupExpiredRecords() {
  const now = Date.now();
  for (const [key, value] of requestCounts.entries()) {
    // 清理超过分钟窗口且超过日重置时间的记录
    if (
      now - value.firstRequest > RATE_LIMIT_WINDOW ||
      now >= value.dailyReset
    ) {
      requestCounts.delete(key);
    }
  }
}

function getClientIdentifier(req: NextRequest): string {
  // 获取真实IP（考虑代理）
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded
    ? forwarded.split(",")[0].trim()
    : req.headers.get("x-real-ip") || req.ip || "unknown";

  // 组合IP和User-Agent作为识别符
  const userAgent = req.headers.get("user-agent") || "unknown";
  const identifier = `${ip}:${userAgent.substring(0, 50)}`;

  return identifier;
}

export function middleware(req: NextRequest) {
  // 只对API路由进行限制
  if (!req.nextUrl.pathname.startsWith("/api/blessing")) {
    return NextResponse.next();
  }

  const identifier = getClientIdentifier(req);
  const now = Date.now();
  // 使用UTC时间避免时区问题
  const today = new Date();
  const todayStart = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const tomorrowStart = todayStart + 24 * 60 * 60 * 1000;

  // 清理过期记录（在每次请求时被动清理）
  cleanupExpiredRecords();

  // 获取或创建请求记录
  let record = requestCounts.get(identifier);

  if (!record) {
    record = {
      count: 0,
      firstRequest: now,
      dailyCount: 0,
      dailyReset: tomorrowStart,
    };
    requestCounts.set(identifier, record);
  }

  // 检查是否需要重置日计数
  if (now >= record.dailyReset) {
    record.dailyCount = 0;
    record.dailyReset = tomorrowStart;
  }

  // 检查是否需要重置分钟计数
  if (now - record.firstRequest > RATE_LIMIT_WINDOW) {
    record.count = 0;
    record.firstRequest = now;
  }

  // 检查日限制
  if (record.dailyCount >= MAX_REQUESTS_PER_DAY) {
    return NextResponse.json(
      {
        error: "今日请求次数已达上限，请明天再试",
        retryAfter: Math.ceil((record.dailyReset - now) / 1000),
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": MAX_REQUESTS_PER_DAY.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": new Date(record.dailyReset).toISOString(),
          "Retry-After": Math.ceil((record.dailyReset - now) / 1000).toString(),
        },
      }
    );
  }

  // 检查分钟限制
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil(
      (record.firstRequest + RATE_LIMIT_WINDOW - now) / 1000
    );
    return NextResponse.json(
      {
        error: "请求过于频繁，请稍后再试",
        retryAfter,
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": MAX_REQUESTS_PER_WINDOW.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": new Date(
            record.firstRequest + RATE_LIMIT_WINDOW
          ).toISOString(),
          "Retry-After": retryAfter.toString(),
        },
      }
    );
  }

  // 增加计数
  record.count++;
  record.dailyCount++;

  // 添加速率限制信息到响应头
  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Limit", MAX_REQUESTS_PER_WINDOW.toString());
  response.headers.set(
    "X-RateLimit-Remaining",
    (MAX_REQUESTS_PER_WINDOW - record.count).toString()
  );
  response.headers.set(
    "X-RateLimit-Reset",
    new Date(record.firstRequest + RATE_LIMIT_WINDOW).toISOString()
  );
  response.headers.set("X-Daily-Limit", MAX_REQUESTS_PER_DAY.toString());
  response.headers.set(
    "X-Daily-Remaining",
    (MAX_REQUESTS_PER_DAY - record.dailyCount).toString()
  );

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
