/** @type {import('tailwindcss').Config} */
// Tailwind CSS 配置文件
// 定义项目的样式主题、内容扫描路径和插件
module.exports = {
  // 内容扫描路径，告诉 Tailwind 哪些文件中使用了样式类
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // 主题配置
  theme: {
    extend: {
      // 字体系列配置
      fontFamily: {
        // 无衣线字体，优先使用 Inter 字体
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  // 插件列表（当前为空）
  plugins: [],
}