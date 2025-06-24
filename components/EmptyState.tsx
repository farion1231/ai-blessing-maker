/**
 * 空状态组件
 * 在用户还未生成祝福语时显示的引导界面
 * 包含装饰性元素和友好的提示信息
 */
export default function EmptyState() {
  return (
    <div className="text-center py-8 relative">
      {/* 主要装饰图标 */}
      <div className="text-4xl mb-4" aria-hidden="true">🎊</div>
      
      {/* 装饰性表情组合 */}
      <div className="mb-4 space-x-2" aria-hidden="true">
        <span className="text-2xl">🎉</span>
        <span className="text-2xl">🎈</span>
        <span className="text-2xl">🎁</span>
      </div>
      
      {/* 操作指引文本 */}
      <p className="text-xl font-bold text-orange-700 mb-2">选择选项后点击生成按钮</p>
      <p className="text-lg text-red-600 font-semibold">
        AI将为您生成专属的祝福语 <span aria-hidden="true">✨</span>
      </p>
      
      {/* 底部装饰星星 */}
      <div className="mt-6 space-x-1" aria-hidden="true">
        <span className="text-xl">🌟</span>
        <span className="text-xl">💫</span>
        <span className="text-xl">⭐</span>
      </div>
    </div>
  )
}