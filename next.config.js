/** @type {import('next').NextConfig} */
// Next.js 配置文件
// 用于配置 Next.js 应用的各种构建和运行时选项
const nextConfig = {
  // 基础安全响应头配置
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' }
        ]
      }
    ]
  }
}

module.exports = nextConfig