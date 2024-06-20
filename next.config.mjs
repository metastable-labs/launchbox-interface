/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: ['res.cloudinary.com', 'imgur.com', 'imagedelivery.net', 'i.imgur.com'],
  },
};

export default nextConfig;
