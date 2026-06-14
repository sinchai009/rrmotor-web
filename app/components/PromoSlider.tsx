'use client'; // คำสั่งนี้บอก Next.js ว่าหน้านี้ต้องขยับได้ (Client Component)

import { useState, useEffect } from 'react';
import Image from 'next/image';

// กำหนดหน้าตาของข้อมูลโปรโมชั่น
interface Promotion {
  id: string | number;
  title: string;
  description?: string | null;  // <--- เติม | null เข้าไปตรงนี้ครับ
  bannerUrl: string;
}

export default function PromoSlider({ promotions }: { promotions: Promotion[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // ถ้ามีโปรโมชั่นแค่อันเดียว ไม่ต้องสลับ
    if (promotions.length <= 1) return;

    // ตั้งเวลาสลับรูปทุกๆ 5 วินาที (5000 มิลลิวินาที)
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promotions.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [promotions.length]);

  if (!promotions || promotions.length === 0) {
    return <div className="text-center py-10">ยังไม่มีโปรโมชั่นในขณะนี้</div>;
  }

  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-gray-900 text-white">
      {promotions.map((promo, index) => (
        <div
          key={promo.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* รูปภาพพื้นหลัง */}
          <div className="absolute inset-0">
            {promo.bannerUrl && ( // <--- เปลี่ยนตรงนี้เป็น promo.bannerUrl
              <Image
                src={promo.bannerUrl} // <--- เปลี่ยนตรงนี้เป็น promo.bannerUrl
                alt={promo.title}
                fill
                className="object-cover opacity-60"
                priority={index === 0}
              />
            )}
          </div>

          {/* ข้อความโปรโมชั่น */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
              🔥 โปรโมชั่นพิเศษเดือนนี้
            </span>
            <h1 className="text-5xl font-extrabold mb-2 drop-shadow-lg">{promo.title}</h1>
            {promo.description && (
              <p className="text-lg uppercase tracking-widest drop-shadow-md">
                {promo.description}
              </p>
            )}
            <button className="mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300">
              ทักแชทสอบถามโปรโมชั่น →
            </button>
          </div>
        </div>
      ))}

      {/* จุดไข่ปลาด้างล่าง (Indicators) */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20">
        {promotions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-red-600' : 'bg-gray-400 hover:bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}