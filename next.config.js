/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [['@swc-jotai/react-refresh', {}]], 
    optimizePackageImports: ['@mantine/core', '@mantine/hooks', '@heroicons/react']
  }
}

module.exports = nextConfig
