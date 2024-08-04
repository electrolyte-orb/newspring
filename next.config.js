/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["geist"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  experimental: {
    swcPlugins: [["@swc-jotai/react-refresh", {}]],
  },
};

module.exports = nextConfig;
