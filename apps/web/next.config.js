/** @type {import('next').Config} */
const nextConfig = {
  // Configure headers for security
  headers: () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000',
        },
        {
          key: 'X-Frame-Options',
          value: 'deny',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-XSS-Protection',
          value: '1',
        }
      ]
    }
  ],
  
  // TypeScript will handle type checking
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Transpilation settings
  transpilePackages: ['shared'],
  
  // Enable React strict mode for better development
  reactStrictMode: true,
};

module.exports = nextConfig;
