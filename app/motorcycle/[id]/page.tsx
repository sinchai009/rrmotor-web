import BookingForm from "./BookingForm";
import FinanceCalculator from "./FinanceCalculator";
import Image from "next/image";
import Link from "next/link";
import prisma from "../../../lib/prisma";
import { notFound } from "next/navigation";

export default async function MotorcycleDetail({ params }: { params: { id: string } }) {
  // ดึงข้อมูลรถจากฐานข้อมูลโดยใช้ ID จาก URL
  // หมายเหตุ: หากตั้งค่า id ใน Prisma เป็น Int (ตัวเลข) ให้ใช้ Number(params.id)
  // แต่ถ้าใช้เป็น String (เช่น UUID/CUID) ให้ใช้ params.id ได้เลย
  const resolvedParams = await params;
  const bike = await prisma.motorcycle.findUnique({
    where: { 
      id: Number(resolvedParams.id) // สมมติว่าใช้ระบบ Auto-increment ID แบบตัวเลข
    },
  });

  // ถ้าระบุ ID ผิด หรือหารถไม่เจอ ให้เด้งไปหน้า 404 Not Found
  if (!bike) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar แบบย่อ */}
      <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center sticky top-0 z-50">
        <Link href="/" className="text-2xl font-extrabold text-red-600 tracking-tighter hover:scale-105 transition-transform">
          ← กลับหน้าแรก
        </Link>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-12 w-full">
        {/* ส่วนรูปภาพ */}
        <div className="w-full md:w-1/2 bg-white rounded-3xl shadow-lg flex items-center justify-center p-8 relative min-h-[400px]">
          {bike.imageUrl ? (
            <Image 
              src={bike.imageUrl} 
              alt={bike.modelName} 
              fill 
              className="object-contain p-8" 
              priority
            />
          ) : (
            <div className="text-gray-300">ไม่มีรูปภาพ</div>
          )}
        </div>

        {/* ส่วนข้อมูลและปุ่ม Call-to-action */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">{bike.brand}</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{bike.modelName}</h1>
          
          <div className="bg-gray-100 p-6 rounded-2xl mb-8 border border-gray-200">
            <p className="text-gray-500 font-medium mb-1">ราคาแนะนำเริ่มต้น</p>
            <p className="text-4xl font-extrabold text-red-600">฿{bike.price.toLocaleString()}</p>
            {bike.minDown !== null && (
              <p className="text-sm text-gray-600 mt-2 font-medium bg-green-100 inline-block px-3 py-1 rounded-full">
                ดาวน์เริ่มต้นเพียง ฿{bike.minDown.toLocaleString()}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <a 
              href={`https://line.me/ti/p/~@rrmotor?text=สนใจสอบถามโปรโมชั่นรุ่น ${bike.modelName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center bg-[#06C755] hover:bg-[#05b34c] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:-translate-y-1"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.961 8.918 9.544 9.601.378.077.893.238 1.023.541.118.275.038.706.018.986-.025.32-.12.784-.15.932-.07.35-.333 1.637 1.436.893 1.766-.744 9.531-5.617 11.239-9.155.589-1.226.89-2.5.89-3.798zM7.228 13.56H4.218a.63.63 0 01-.63-.63V8.675a.63.63 0 01.63-.63h3.01a.63.63 0 010 1.26H4.848v3.626h2.38a.63.63 0 010 1.259h.001zm3.624-.63a.63.63 0 01-.63.63H9.255a.63.63 0 01-.63-.63V8.675a.63.63 0 111.26 0v4.256h.967a.63.63 0 01.63.63h.001zm2.716 0a.63.63 0 01-.63.63h-.967a.63.63 0 01-.63-.63V8.675a.63.63 0 011.26 0v4.255h.337a.63.63 0 01.63.63zm4.254-2.836l-2.025 2.721a.627.627 0 01-.504.251.62.62 0 01-.62-.62V8.675a.63.63 0 111.26 0v2.443l1.83-2.585a.625.625 0 011.144.337v4.256a.63.63 0 11-1.26 0v-2.128h.001z"/></svg>
              ทักแชทสอบถามรุ่นนี้ (Line)
            </a>
                       
            {/* เพิ่ม baseInterestRate={1.25} เพื่อกำหนดดอกเบี้ยของรถคันนี้เป็น 1.25% */}
            <FinanceCalculator 
              price={bike.price} 
              minDown={bike.minDown} 
              baseInterestRate={1.25} 
            />

            <BookingForm bikeId={bike.id} />
            
          </div>
        </div>
      </section>
    </main>
  );
}