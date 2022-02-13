/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['s3.us-west-2.amazonaws.com', 'pigooosuke-portfolio.s3.ap-northeast-1.amazonaws.com'],
  },
}

module.exports = nextConfig
