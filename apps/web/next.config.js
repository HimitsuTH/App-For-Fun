/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 300,
  transpilePackages: ["ui"], 

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/:path*",
      },
    ];
  },
  compiler: {
    styledComponents: true,
  },
};

// Export nextConfig directly
export default nextConfig;