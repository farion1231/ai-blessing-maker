'use client'

// React 状态管理 Hook
import { useState } from 'react'
// 业务配置数据（场景、人群、风格） - 这些导入在表单组件中使用
// API 调用函数和类型定义
import { generateBlessing, BlessingOptions } from '@/lib/api-client'
// 子组件导入
import BlessingForm from './BlessingForm'      // 表单组件
import ResultDisplay from './ResultDisplay'    // 结果展示组件

/**
 * 祝福语生成器主组件
 * 应用的核心组件，管理整个祝福语生成流程
 * 支持两种模式：经典模板选择和智能描述输入
 * 包含表单输入、结果展示、复制功能等
 */
export default function BlessingGenerator() {
  // 祝福语生成选项状态
  const [options, setOptions] = useState<BlessingOptions>({
    scenario: "",          // 场景类型
    festival: "",          // 节日类型
    targetPerson: "",      // 目标人群
    style: "",             // 祝福语风格
    // 智能模式字段
    customDescription: "", // 用户自定义描述
    useSmartMode: false,   // 是否启用智能模式
  })
  
  // 组件状态管理
  const [blessing, setBlessing] = useState<string>('')        // 生成的祝福语内容
  const [loading, setLoading] = useState(false)              // 加载状态
  const [error, setError] = useState<string>('')             // 错误信息
  const [copySuccess, setCopySuccess] = useState(false)      // 复制成功状态
  const [copyFading, setCopyFading] = useState(false)        // 复制提示淡出动画状态

  /**
   * 处理表单提交事件
   * 接收用户输入，调用 API 生成祝福语
   * @param e - 表单提交事件
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()  // 阻止表单默认提交行为
    setLoading(true)    // 设置加载状态
    setError('')        // 清除之前的错误信息
    
    try {
      // 调用 API 生成祝福语
      const result = await generateBlessing(options)
      setBlessing(result)
    } catch (err) {
      // 处理错误情况
      setError(err instanceof Error ? err.message : '生成失败，请重试')
    } finally {
      setLoading(false)  // 结束加载状态
    }
  }

  /**
   * 处理重新生成操作
   * 使用相同参数重新调用 API 生成祝福语
   */
  const handleRegenerate = async () => {
    setLoading(true)    // 设置加载状态
    setError('')        // 清除错误信息
    
    try {
      // 使用当前选项重新生成
      const result = await generateBlessing(options)
      setBlessing(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败，请重试')
    } finally {
      setLoading(false)  // 结束加载状态
    }
  }

  /**
   * 处理复制祝福语功能
   * 将生成的祝福语复制到系统剪贴板，并显示成功提示
   */
  const handleCopy = async () => {
    try {
      // 使用浏览器剪贴板 API 复制文本
      await navigator.clipboard.writeText(blessing)
      setCopySuccess(true)   // 显示复制成功提示
      setCopyFading(false)   // 重置淡出状态
      
      // 2.5秒后开始淡出动画
      setTimeout(() => {
        setCopyFading(true)
      }, 2500)
      
      // 3秒后完全隐藏提示
      setTimeout(() => {
        setCopySuccess(false)
        setCopyFading(false)
      }, 3000)
    } catch (err) {
      // 处理复制失败情况（如浏览器不支持或权限问题）
      console.error('复制失败:', err)
      setError('复制失败，请手动选择文字复制')
    }
  }


  return (
    <>
      {/* 无障碍支持：屏幕阅读器状态通知区域 */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {loading && "正在生成祝福语，请稍候..."}
        {error && `错误：${error}`}
        {copySuccess && "祝福语已成功复制到剪贴板"}
        {blessing && !loading && !error && "祝福语生成完成"}
      </div>
      
      {/* 主内容区域：响应式两列布局 */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* 左侧：表单输入区域 */}
        <BlessingForm
          options={options}
          loading={loading}
          onOptionsChange={setOptions}
          onSubmit={handleSubmit}
        />

        {/* 右侧：结果展示区域 */}
        <ResultDisplay
          blessing={blessing}
          error={error}
          loading={loading}
          copySuccess={copySuccess}
          copyFading={copyFading}
          onCopy={handleCopy}
          onRegenerate={handleRegenerate}
        />
      </div>
    </>
  )
}