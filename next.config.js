/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  env: {
    LIVE_URL: process.env.LIVE_URL,
    STRIPE_BILLING_KEY: process.env.STRIPE_BILLING_KEY,
  },
};

module.exports = nextConfig;
