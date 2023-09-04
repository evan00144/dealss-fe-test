/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.dummyjson.com',
            port: '',
            // pathname: '/account123/**',
          },
        ],
      },
    
}

module.exports = nextConfig
