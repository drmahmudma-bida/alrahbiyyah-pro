/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/pro',
        destination: '/pro.html',
      },
      {
        source: '/poultry',
        destination: '/poultry.html',
      },
    ]
  },
}

module.exports = nextConfig