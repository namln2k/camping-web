/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MAGENTO_GRAPHQL_ENDPOINT: process.env.MAGENTO_GRAPHQL_ENDPOINT,
    MAGENTO_BASE_URL: process.env.MAGENTO_BASE_URL,
    MAGENTO_STYLESHEETS_BASE_URL: process.env.MAGENTO_STYLESHEETS_BASE_URL,
    BASE_URL: process.env.BASE_URL,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
