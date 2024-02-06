/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
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
