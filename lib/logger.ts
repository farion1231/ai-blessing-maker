// 简单的日志系统
// 生产环境建议使用专业的日志服务如 Winston、Pino 或云服务

export enum LogLevel {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG'
}

export interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: Record<string, any>
  error?: Error
}

// 日志存储（生产环境应使用持久化存储）
const logs: LogEntry[] = []
const MAX_LOGS = 1000 // 内存中最多保存的日志条数

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  private log(level: LogLevel, message: string, context?: Record<string, any>, error?: Error) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      error
    }

    // 开发环境输出到控制台
    if (this.isDevelopment) {
      const color = this.getColor(level)
      console.log(`${color}[${entry.timestamp}] ${level}: ${message}`, context || '', error || '')
    }

    // 存储日志（限制数量）
    logs.push(entry)
    if (logs.length > MAX_LOGS) {
      logs.shift()
    }

    // 生产环境可以发送到日志服务
    if (!this.isDevelopment && level === LogLevel.ERROR) {
      // 这里可以集成 Sentry、LogRocket 等错误追踪服务
      // sendToErrorTracking(entry)
    }
  }

  private getColor(level: LogLevel): string {
    switch (level) {
      case LogLevel.ERROR: return '\x1b[31m' // 红色
      case LogLevel.WARN: return '\x1b[33m'  // 黄色
      case LogLevel.INFO: return '\x1b[36m'  // 青色
      case LogLevel.DEBUG: return '\x1b[90m' // 灰色
      default: return '\x1b[0m'
    }
  }

  error(message: string, error?: Error, context?: Record<string, any>) {
    this.log(LogLevel.ERROR, message, context, error)
  }

  warn(message: string, context?: Record<string, any>) {
    this.log(LogLevel.WARN, message, context)
  }

  info(message: string, context?: Record<string, any>) {
    this.log(LogLevel.INFO, message, context)
  }

  debug(message: string, context?: Record<string, any>) {
    if (this.isDevelopment) {
      this.log(LogLevel.DEBUG, message, context)
    }
  }

  // API 请求日志
  logAPIRequest(
    method: string,
    path: string,
    statusCode: number,
    duration: number,
    clientId: string,
    error?: Error
  ) {
    const level = error ? LogLevel.ERROR : LogLevel.INFO
    const message = `${method} ${path} ${statusCode} ${duration}ms`
    
    this.log(level, message, {
      method,
      path,
      statusCode,
      duration,
      clientId,
      error: error?.message
    }, error)
  }

  // 获取日志统计
  getStats() {
    const stats = {
      total: logs.length,
      errors: logs.filter(l => l.level === LogLevel.ERROR).length,
      warnings: logs.filter(l => l.level === LogLevel.WARN).length,
      lastError: logs.filter(l => l.level === LogLevel.ERROR).pop(),
      recentLogs: logs.slice(-100)
    }
    return stats
  }

  // 获取特定级别的日志
  getLogs(level?: LogLevel, limit: number = 100): LogEntry[] {
    const filtered = level 
      ? logs.filter(l => l.level === level)
      : logs
    
    return filtered.slice(-limit)
  }

  // 清空日志
  clear() {
    logs.length = 0
  }
}

// 导出单例
export const logger = new Logger()

// 监控 API 使用情况
export class APIUsageMonitor {
  private usage = new Map<string, {
    requests: number
    errors: number
    lastRequest: number
    totalDuration: number
  }>()

  track(clientId: string, duration: number, isError: boolean = false) {
    const existing = this.usage.get(clientId) || {
      requests: 0,
      errors: 0,
      lastRequest: 0,
      totalDuration: 0
    }

    existing.requests++
    existing.lastRequest = Date.now()
    existing.totalDuration += duration
    if (isError) existing.errors++

    this.usage.set(clientId, existing)
  }

  getUsageStats(clientId: string) {
    return this.usage.get(clientId)
  }

  getAllStats() {
    const stats: any[] = []
    for (const [clientId, data] of this.usage.entries()) {
      stats.push({
        clientId,
        ...data,
        avgDuration: data.totalDuration / data.requests,
        errorRate: data.errors / data.requests
      })
    }
    return stats.sort((a, b) => b.requests - a.requests)
  }

  // 清理长时间未使用的记录
  cleanup(maxAge: number = 24 * 60 * 60 * 1000) {
    const cutoff = Date.now() - maxAge
    for (const [clientId, data] of this.usage.entries()) {
      if (data.lastRequest < cutoff) {
        this.usage.delete(clientId)
      }
    }
  }
}

export const apiMonitor = new APIUsageMonitor()