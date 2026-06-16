import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
};

export default nextConfig;
