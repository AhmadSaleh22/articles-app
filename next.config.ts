import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['@prisma/client', 'prisma'],
  experimental: {
    outputFileTracingIncludes: {
      '/api/**/*': ['./node_modules/.prisma/client/**/*'],
      '/*': ['./node_modules/.prisma/client/**/*'],
    },
  },
};

export default nextConfig;
