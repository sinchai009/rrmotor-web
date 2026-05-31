"use client";

import { useState } from "react";

interface Props {
  bikeId: number;
}

export default function BookingForm({ bikeId }: Props) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [lineId, setLineId] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        customerName, 
        phone, 
        lineId, 
        motorcycleId: bikeId 
      }),
    });

    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("idle");
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้งครับ");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center mt-6 shadow-sm">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">ส่งข้อมูลสำเร็จ!</h3>
        <p className="text-green-600 font-medium">เจ้าหน้าที่จะรีบติดต่อกลับไปโดยเร็วที่สุดครับ</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6 w-full">
      <h3 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center">
        <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">📝</span>
        ลงทะเบียนจอง / ให้เซลล์ติดต่อกลับ
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">ชื่อ-นามสกุล <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3"
            placeholder="เช่น สมชาย ใจดี"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">เบอร์โทรศัพท์ <span className="text-red-500">*</span></label>
          <input 
            type="tel" 
            required
            pattern="[0-9]{10}"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3"
            placeholder="เช่น 0812345678"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Line ID (ตัวเลือก)</label>
          <input 
            type="text" 
            value={lineId}
            onChange={(e) => setLineId(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3"
            placeholder="เช่น somchai_123"
          />
        </div>
        <button 
        type="submit" 
        disabled={status === "loading"}
        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-md mt-4 flex justify-center items-center"
        >
        {status === "loading" ? "กำลังส่งข้อมูล..." : "ยืนยันการส่งข้อมูล"}
        </button>
      </form>
    </div>
  );
}