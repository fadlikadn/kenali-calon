/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'infopemilu.kpu.go.id',
        port: '',
      }
    ]
  }
}

module.exports = nextConfig
