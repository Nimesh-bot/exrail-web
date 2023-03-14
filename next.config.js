/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  compiler: {
    styledComponents: true,
  }
  // swcMinify: true,
}

module.exports = nextConfig
