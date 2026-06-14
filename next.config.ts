/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // ใส่ ** เพื่ออนุญาตให้ดึงรูปจากเว็บไหนก็ได้ (สะดวกสุดครับ)
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;