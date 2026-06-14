import Image from "next/image";
import Link from "next/link"; 
import prisma from "../lib/prisma";
import PromoSlider from './components/PromoSlider'; 

export const dynamic = 'force-dynamic';

export default async function Home() {
  // 1. ดึงข้อมูลโปรโมชั่นทั้งหมดที่เปิดใช้งาน
  const promotions = await prisma.promotion.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  // 2. ดึงข้อมูลรถมอเตอร์ไซค์ทั้งหมดที่เปิดขาย
  const motorcycles = await prisma.motorcycle.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header (ส่วนหัวเว็บ) */}
      <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center z-20 relative">
        <h1 className="text-3xl font-extrabold text-red-600 tracking-tighter">
          รุ่งเรืองยานยนต์
        </h1>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-bold transition-all shadow-md">
          Line ID: @rrmotor
        </button>
      </header>

      {/* Hero Banner (ส่วนสไลด์โชว์โปรโมชั่นที่เราสร้างใหม่) */}
      <PromoSlider promotions={promotions} />

      {/* Motorcycle Catalog Section (ส่วนรายการรถมอเตอร์ไซค์ด้านล่าง) */}
      <section className="py-20 px-4 md:px-8 bg-gray-100 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-extrabold text-gray-900 mb-4">เลือกรถที่ใช่สำหรับคุณ</h3>
            <p className="text-lg text-gray-500">เลือกดูรุ่นรถจักรยานยนต์ที่คุณสนใจ พร้อมเช็คตารางผ่อนดาวน์ได้ทันที</p>
          </div>

          {/* Grid โชว์รถ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {motorcycles.map((bike: any) => (
              <div key={bike.id} className="bg-white rounded-3xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col">
                <div className="relative h-56 bg-white flex items-center justify-center p-4">
                  {bike.imageUrl ? (
                    <Image 
                      src={bike.imageUrl} 
                      alt={bike.modelName} 
                      fill 
                      className="object-contain p-4" 
                    />
                  ) : (
                    <div className="text-gray-300">ไม่มีรูปภาพ</div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{bike.brand}</span>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">{bike.modelName}</h4>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between items-end mb-6 bg-gray-50 p-4 rounded-2xl">
                      <span className="text-sm text-gray-500 font-medium">ราคาแนะนำ</span>
                      <span className="text-xl font-extrabold text-red-600">฿{bike.price.toLocaleString()}</span>
                    </div>
                    <Link href={`/motorcycle/${bike.id}`} className="block text-center w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-md">
                      ดูตารางผ่อน / จองรถ
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* กรณีที่ยังไม่มีข้อมูลรถ */}
          {motorcycles.length === 0 && (
            <div className="text-center text-gray-500 py-10 bg-white rounded-2xl border border-dashed border-gray-300">
              ยังไม่มีข้อมูลรถในระบบ กรุณาเพิ่มข้อมูลผ่าน Prisma Studio
            </div>
          )}

        </div>
      </section>
    </main>
  );
}