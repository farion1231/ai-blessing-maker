/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,
    CLAUDE_BASE_URL: process.env.CLAUDE_BASE_URL,
  }
}

module.exports = nextConfig