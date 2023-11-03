const { withUniformConfig } = require('@uniformdev/canvas-next-rsc/config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
  },
  publicRuntimeConfig: {
    projectId: process.env.UNIFORM_PROJECT_ID,
    applicationId: process.env.ALGOLIA_APPLICATION_ID,
    algoliaApiKey: process.env.ALGOLIA_API_KEY,
  },
  serverRuntimeConfig: {
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiKey: process.env.UNIFORM_API_KEY,
    apiHost: process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app',
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version,
    NEXT_PUBLIC_BUILD_TIMESTAMP: new Date().valueOf(),
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL, // change to your domain name
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*' }, // any image hosts are welcome
      { protocol: 'https', hostname: 'unresolved' }, // For cases where the data obtained are unresolved
    ],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
  },
  i18n: {
    locales: ['en', 'es', 'de', 'fr'],
    defaultLocale: 'en',
  },
  rewrites: async () => {
    return [
      {
        source: '/:slug*',
        destination: '/:slug*',
        has: [{ type: 'query', key: 'locale' }],
      },
    ];
  },
}

module.exports = withUniformConfig(nextConfig);
