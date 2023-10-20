/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: [
      'localhost',
      'localhost:3000',
      'www.themoviedb.org',
      'image.tmdb.org',
    ],
    formats: ['image/avif', 'image/webp'],
    loader: 'imgix',
    path: '',
    unoptimized: true,
  },
};

module.exports = nextConfig;
