/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.wikipedia.org", "upload.wikimedia.org"],
  },
};

module.exports = nextConfig;
