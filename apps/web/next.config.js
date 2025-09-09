const { createSecureHeaders } = require('next-secure-headers');

/** @type {import('next').Config} */
const nextConfig = {
  // Configure headers for security
  headers: () => createSecureHeaders(),
  
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
