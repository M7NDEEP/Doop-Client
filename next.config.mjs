/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DATABASE_URL: 'postgresql://postgres:2005@localhost:5432/doop',
    PORT: 5000,
  },
};

export default nextConfig;