export default function EmptyState() {
  return (
    <div className="text-center py-8 relative">
      <div className="text-4xl mb-4">🎊</div>
      <div className="mb-4 space-x-2">
        <span className="text-2xl">🎉</span>
        <span className="text-2xl">🎈</span>
        <span className="text-2xl">🎁</span>
      </div>
      <p className="text-xl font-bold text-orange-600 mb-2">选择选项后点击生成按钮</p>
      <p className="text-lg text-red-500 font-semibold">AI将为您生成专属的祝福语 ✨</p>
      <div className="mt-6 space-x-1">
        <span className="text-xl">🌟</span>
        <span className="text-xl">💫</span>
        <span className="text-xl">⭐</span>
      </div>
    </div>
  )
}