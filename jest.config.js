// Jest 测试框架配置文件
// 使用 Next.js 集成的 Jest 配置，支持 TypeScript 和模块别名
const nextJest = require('next/jest')

// 创建 Next.js 特定的 Jest 配置
const createJestConfig = nextJest({
  // 提供 Next.js 应用路径，用于加载 next.config.js 和 .env 文件
  dir: './',
})

// 自定义 Jest 配置选项
const customJestConfig = {
  // 测试环境初始化文件
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // 模块别名映射（基于 tsconfig.json 中的 paths 配置）
  moduleNameMapper: {
    // 处理 @ 别名，指向项目根目录
    '^@/(.*)$': '<rootDir>/$1',
  },
  
  // 使用 jsdom 环境模拟浏览器环境
  testEnvironment: 'jest-environment-jsdom',
  
  // 代码覆盖率收集配置
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',  // 组件文件
    'lib/**/*.{js,jsx,ts,tsx}',         // 工具函数文件
    'app/**/*.{js,jsx,ts,tsx}',         // 应用文件
    '!**/*.d.ts',                       // 排除类型定义文件
    '!**/node_modules/**',              // 排除依赖包
  ],
  
  // 测试路径忽略配置
  testPathIgnorePatterns: [
    '<rootDir>/.next/',           // 排除 Next.js 构建目录
    '<rootDir>/node_modules/',    // 排除依赖包
    '<rootDir>/__tests__/setup/', // 排除测试设置文件
  ],
  
  // 模块查找目录
  moduleDirectories: ['node_modules', '<rootDir>/'],
  
  // 测试环境特定选项
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
}

// 导出配置函数，确保 next/jest 能够加载 Next.js 的异步配置
module.exports = createJestConfig(customJestConfig)