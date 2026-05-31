"use client";

import { useState } from "react";

interface Props {
  price: number;
  minDown: number | null;
  baseInterestRate?: number; // 1. เพิ่ม Prop ตัวนี้เข้ามา (ใส่ ? เพื่อบอกว่าจะมีหรือไม่มีก็ได้)
}

// 2. รับค่า baseInterestRate เข้ามา และตั้งค่าเริ่มต้นไว้ที่ 1.59 เผื่อกรณีลืมส่งค่ามา
export default function FinanceCalculator({ price, minDown, baseInterestRate = 1.59 }: Props) {
  const defaultDown = minDown || 0;
  const [downPayment, setDownPayment] = useState<number>(defaultDown);
  const [months, setMonths] = useState<number>(36);
  
  // 3. นำค่า baseInterestRate มาใช้เป็นดอกเบี้ยตั้งต้น
  const [interestRate, setInterestRate] = useState<number>(baseInterestRate); 

  // สูตรคำนวณค่างวด (ใช้โค้ดเดิมได้เลยครับ)
  const principal = price - downPayment > 0 ? price - downPayment : 0; 
  const totalInterest = principal * (interestRate / 100) * months; 
  const monthlyPayment = principal > 0 ? (principal + totalInterest) / months : 0; 

 
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6 w-full">
      <h3 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center">
        <span className="bg-red-100 text-red-600 p-2 rounded-lg mr-3">🧮</span>
        ทดลองคำนวณค่างวด
      </h3>

      {/* ใส่เงินดาวน์ */}
      <div className="mb-5">
        <label className="block text-sm font-bold text-gray-700 mb-2">เงินดาวน์ (บาท)</label>
        <input 
          type="number" 
          value={downPayment}
          onChange={(e) => setDownPayment(Number(e.target.value))}
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-xl focus:ring-red-500 focus:border-red-500 block p-3 font-bold"
          min={defaultDown}
          max={price}
        />
        <p className="text-xs text-gray-500 mt-2">ดาวน์ขั้นต่ำ ฿{defaultDown.toLocaleString()} (ยอดจัด: ฿{principal.toLocaleString()})</p>
      </div>

      {/* เลือกระยะเวลาผ่อน */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-700 mb-2">ระยะเวลาผ่อน (งวด)</label>
        <div className="grid grid-cols-4 gap-2">
          {[12, 24, 36, 48].map((m) => (
            <button
              key={m}
              onClick={() => setMonths(m)}
              className={`py-2 rounded-lg font-bold border transition-all ${
                months === m 
                  ? "bg-red-600 text-white border-red-600 shadow-md" 
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* ผลลัพธ์การคำนวณ */}
      <div className="bg-gray-900 text-white p-6 rounded-xl text-center">
        <p className="text-gray-400 text-sm mb-1 font-medium">ยอดผ่อนชำระต่อเดือน (ประเมิน)</p>
        <p className="text-4xl font-extrabold text-red-500 drop-shadow-md">
          ฿{Math.ceil(monthlyPayment).toLocaleString()}
        </p>
        <p className="text-xs text-gray-500 mt-3 font-light">
          *ดอกเบี้ย {interestRate}%/เดือน การคำนวณนี้เป็นเพียงการประเมินเบื้องต้นเท่านั้น
        </p>
      </div>
    </div>
  );
}