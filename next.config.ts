import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Subdomain: gift.sundayswithlj.rocks/galeria -> /galeria
        {
          source: "/galeria",
          has: [
            {
              type: "host",
              value: "gift.sundayswithlj.rocks",
            },
          ],
          destination: "/galeria",
        },
        // Subdomain: gift.sundayswithlj.rocks/:slug -> /cartas/:slug
        {
          source: "/:slug",
          has: [
            {
              type: "host",
              value: "gift.sundayswithlj.rocks",
            },
          ],
          destination: "/cartas/:slug",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
