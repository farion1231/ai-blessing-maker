// 导入主要的祝福语生成器组件
import BlessingGenerator from '@/components/BlessingGenerator'

/**
 * 首页组件
 * 应用的主页面，渲染祝福语生成器组件
 * 使用 Next.js App Router 的页面组件约定
 */
export default function Home() {
  return <BlessingGenerator />
}