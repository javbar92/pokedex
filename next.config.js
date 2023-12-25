/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/'
      }
    ],
    domains: ['raw.githubusercontent.com']
  },
  reactStrictMode: false
}

module.exports = nextConfig
