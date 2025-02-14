/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb' // Set this to a higher value or '0' to remove the limit
    }
  },
  async rewrites() {
    return [
      {
        source: '/img/:path*',
        destination: '/api/staticimg/:path*',
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Konfigurasi untuk menangani file statis
    config.module.rules.push({
      test: /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '/_next/static/files',
            outputPath: 'static/files',
          },
        },
      ],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      'better-sqlite3': false,
      sqlite3: false,
      pg: false,
      tedious: false,
      oracledb: false,
    };


    return config;
  },
};

module.exports = nextConfig;