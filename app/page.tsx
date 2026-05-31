import Image from "next/image";
import Link from "next/link"; 
import prisma from "../lib/prisma";

export default async function Home() {
  // ดึงข้อมูลโปรโมชั่น
  const promotions = await prisma.promotion.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 1,
  });

  // ดึงข้อมูลรถมอเตอร์ไซค์ทั้งหมดที่เปิดขาย
  const motorcycles = await prisma.motorcycle.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  const mainPromo = promotions[0];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center z-20 relative">
        <h1 className="text-3xl font-extrabold text-red-600 tracking-tighter">
          รุ่งเรืองยานยนต์
        </h1>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-bold transition-all shadow-md">
          Line ID: @rrmotor
        </button>
      </header>

      {/* Hero Banner */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gray-900">
        {mainPromo ? (
          <>
            {mainPromo.bannerUrl && (
              <Image
                src={mainPromo.bannerUrl}
                alt={mainPromo.title}
                fill
                className="object-cover opacity-60"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto flex flex-col items-center mt-10">
              <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block shadow-lg">
                🔥 โปรโมชั่นพิเศษเดือนนี้
              </span>
              <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
                {mainPromo.title}
              </h2>
              {mainPromo.description && (
                <p className="text-xl md:text-2xl mb-10 text-gray-200 drop-shadow-md">
                  {mainPromo.description}
                </p>
              )}
              <a 
                href="#" 
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-red-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 hover:bg-red-700 hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.6)]"
              >
                ทักแชทสอบถามโปรโมชั่น
                <svg className="w-6 h-6 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            </div>
          </>
        ) : (
          <div className="text-white text-2xl font-bold z-10">กำลังโหลดโปรโมชั่น...</div>
        )}
      </section>

      {/* Motorcycle Catalog Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-100 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-extrabold text-gray-900 mb-4">เลือกรถที่ใช่สำหรับคุณ</h3>
            <p className="text-lg text-gray-500">เลือกดูรุ่นรถจักรยานยนต์ที่คุณสนใจ พร้อมเช็คตารางผ่อนดาวน์ได้ทันที</p>
          </div>

          {/* Grid โชว์รถ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {motorcycles.map((bike) => (
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