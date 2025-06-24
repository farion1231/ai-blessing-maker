/** @type {import('next').NextConfig} */
// Next.js 配置文件
// 用于配置 Next.js 应用的各种构建和运行时选项
const nextConfig = {
  // 安全响应头配置
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      },
      {
        // API 特定的安全头
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0'
          }
        ]
      }
    ]
  },
  
  
  // 生产环境优化
  poweredByHeader: false, // 移除 X-Powered-By 头
  compress: true, // 启用压缩
  
  // 限制日志输出（避免敏感信息泄露）
  productionBrowserSourceMaps: false
}

module.exports = nextConfig