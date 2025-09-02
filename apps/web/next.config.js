// apps/web/next.config.js

// Remove the import for next-transpile-modules
// import withTM from "next-transpile-modules";

// No longer needed:
// const withTranspileModules = withTM(["ui"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 300,
  // Add transpilePackages directly to your nextConfig object
  transpilePackages: ["ui"], // <--- This is the key change!

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