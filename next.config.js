/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
}

module.exports = nextConfig
