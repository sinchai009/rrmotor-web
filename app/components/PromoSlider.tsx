'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Promotion {
  id: string | number;
  title: string;
  description?: string | null;
  bannerUrl: string;
  startDate: Date | string;
  endDate: Date | string;
}

export default function PromoSlider({ promotions }: { promotions: Promotion[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (promotions.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promotions.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [promotions.length]);

  if (!promotions || promotions.length === 0) {
    return (
      <div className="w-full h-[60vh] min-h-[450px] flex items-center justify-center bg-gray-900 text-white text-xl font-bold">
        ขณะนี้ยังไม่มีโปรโมชั่นพิเศษประจำช่วงเวลานี้
      </div>
    );
  }

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden bg-gray-900 text-white">
      {promotions.map((promo, index) => (
        <div
          key={promo.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* รูปภาพพื้นหลัง */}
          <div className="absolute inset-0">
            {promo.bannerUrl && (
              <Image
                src={promo.bannerUrl}
                alt={promo.title}
                fill
                className="object-cover opacity-60"
                priority={index === 0}
              />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

          {/* ข้อความโปรโมชั่น */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 max-w-4xl mx-auto mt-10">
            <span className="bg-red-600 text-white text-sm font-bold px-4 py-1 rounded-full mb-4 shadow-lg">
              🔥 โปรโมชั่นพิเศษเดือนนี้
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-lg">
              {promo.title}
            </h1>
            {promo.description && (
              <p className="text-xl md:text-2xl mb-4 text-gray-200 drop-shadow-md">
                {promo.description}
              </p>
            )}
            
            {/* ⏰ ป้ายแสดงเวลาหมดโปรโมชั่นแปลงเป็นภาษาไทยแบบพรีเมียม */}
            <p className="text-base font-semibold text-red-400 bg-black/60 px-5 py-2 rounded-full mb-8 border border-red-500/30 backdrop-blur-sm shadow-md">
              ⏰ หมดโปรโมชั่นวันที่: {new Date(promo.endDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>

            <a 
              href="#" 
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-red-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 hover:bg-red-700 hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.6)]"
            >
              ทักแชทสอบถามโปรโมชั่น
              <svg className="w-6 h-6 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
      ))}

      {/* จุดไข่ปลาควบคุมสไลด์ */}
      {promotions.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20">
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-red-600 scale-125' : 'bg-gray-400 hover:bg-gray-200'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}