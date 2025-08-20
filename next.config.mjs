/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }] },
  output: 'standalone',
};
export default nextConfig;
