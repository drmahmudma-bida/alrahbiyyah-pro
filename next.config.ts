/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/poultry',
        destination: '/poultry.html',
      },
    ]
  },
}

module.exports = nextConfig