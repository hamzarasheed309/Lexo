/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['vercel-blob.com'],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
