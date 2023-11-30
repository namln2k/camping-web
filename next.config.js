/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MAGENTO_BASE_URL: process.env.MAGENTO_BASE_URL,
    MAGENTO_ADMIN_TOKEN: process.env.MAGENTO_ADMIN_TOKEN,
    MAGENTO_ADMIN_USERNAME: process.env.MAGENTO_ADMIN_USERNAME,
    MAGENTO_ADMIN_PASSWORD: process.env.MAGENTO_ADMIN_PASSWORD,
    MAGENTO_STYLESHEETS_BASE_URL: process.env.MAGENTO_STYLESHEETS_BASE_URL,
    BASE_URL: process.env.BASE_URL,
  },
}

module.exports = nextConfig
