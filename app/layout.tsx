import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

// 1. นำเข้าฟอนต์ Prompt และตั้งค่าภาษา/ความหนา
const prompt = Prompt({
  subsets: ["latin", "thai"], // โหลดทั้งภาษาอังกฤษและไทย
  weight: ["300", "400", "500", "600", "700"], // ความหนาของตัวอักษร (บาง -> หนา)
  display: "swap",
});

export const metadata: Metadata = {
  title: "รุ่งเรืองยานยนต์",
  description: "ตัวแทนจำหน่ายรถจักรยานยนต์",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      {/* 2. นำคลาสของฟอนต์มาใส่ที่ body เพื่อให้มีผลทั้งเว็บ */}
      <body className={prompt.className}>
        {children}
      </body>
    </html>
  );
}