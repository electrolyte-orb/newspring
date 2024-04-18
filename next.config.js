/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '**'
      },
    ]
  },
  experimental: {
    swcPlugins: [['@swc-jotai/react-refresh', {}]], 
    optimizePackageImports: ['@mantine/core', '@mantine/hooks', '@heroicons/react']
  }
}

module.exports = nextConfig
