/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/pro',
        destination: '/pro.html',
      },
    ]
  },
}

module.exports = nextConfig