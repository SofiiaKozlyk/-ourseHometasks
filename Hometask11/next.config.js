// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

// module.exports = {
//   reactStrictMode: true,
//   // Add any other configuration options here
// };

module.exports = {
  webpack(config, { isServer }) {
    // Уникаємо помилок з модулями, які використовують fs на клієнтській стороні
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }
    return config;
  },
};
