/**
 * 错误信息组件属性接口
 */
interface ErrorMessageProps {
  message: string  // 要显示的错误信息文本
}

/**
 * 错误信息显示组件
 * 用于显示系统错误信息，具有无障碍支持
 * 支持屏幕阅读器并可自动触发通知
 */
export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div 
      className="bg-red-50 border-2 border-red-300 text-red-700 px-6 py-4 rounded-2xl mb-6 relative shadow-lg"
      role="alert"           // ARIA 角色，表明这是一个警告区域
      aria-live="assertive"  // 屏幕阅读器会立即通知用户
    >
      {/* 装饰性错误图标，不参与屏幕阅读 */}
      <div className="absolute top-2 left-2 text-xl" aria-hidden="true">❌</div>
      {/* 错误信息文本内容 */}
      <div className="ml-8 font-semibold">{message}</div>
    </div>
  )
}