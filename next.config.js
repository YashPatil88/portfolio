/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Disable experimental features
  experimental: {
    turbo: false,
  },
}

module.exports = nextConfig
