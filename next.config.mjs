/** @type {import('next').NextConfig} */

!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'));

const nextConfig = {
  reactStrictMode: false,
};

export default nextConfig;
