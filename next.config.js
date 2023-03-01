/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['emoji.slack-edge.com', 'a.slack-edge.com']
  }
}

module.exports = nextConfig
