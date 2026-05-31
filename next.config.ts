import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.rrmotorbikes.com', // อนุญาตให้ดึงรูปจากเว็บนี้ได้
        pathname: '/**', // อนุญาตทุกโฟลเดอร์ย่อยในเว็บนี้
      },
    ],
  },
};

export default nextConfig;