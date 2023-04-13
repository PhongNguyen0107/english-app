/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
  },
  experimental: {
    appDir: true,
    nftTracing: true,
    outputFileTracing: true
  },
}

module.exports = nextConfig