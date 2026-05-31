"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 👈 เพิ่ม useRouter
import StatusDropdown from "./StatusDropdown";

export default function AdminTable({ bookings }: { bookings: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const router = useRouter(); // 👈 เรียกใช้งาน router

  // ฟังก์ชั่นกดปุ่มออกจากระบบ
  const handleLogout = async () => {
    if (confirm("คุณต้องการออกจากระบบใช่หรือไม่?")) {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchSearch = 
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      booking.phone.includes(searchTerm);
    const matchStatus = filterStatus === "ALL" || booking.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* 🔴 เพิ่มปุ่ม Logout ไว้ตรงแถบเครื่องมือด้านบนสุด */}
      <div className="p-4 border-b bg-white flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">ข้อมูลการจองทั้งหมด</h2>
        <button 
          onClick={handleLogout}
          className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg font-bold text-sm transition-colors border border-red-200"
        >
          🚪 ออกจากระบบ
        </button>
      </div>
 
          
      {/* 🟢 ส่วนบน: แถบเครื่องมือค้นหา & กรองสถานะ */}
      <div className="p-4 border-b bg-gray-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
        
        {/* ช่องค้นหาชื่อ/เบอร์โทร */}
        <div className="relative w-full sm:w-1/2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">🔍</span>
          <input
            type="text"
            placeholder="ค้นหาชื่อลูกค้า หรือ เบอร์โทรศัพท์..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* เมนูกรองสถานะ */}
        <div className="w-full sm:w-auto flex items-center gap-2">
          <label className="font-bold text-gray-700 text-sm whitespace-nowrap">จัดกลุ่มสถานะ:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded-xl outline-none focus:ring-blue-500 bg-white"
          >
            <option value="ALL">รวมทุกสถานะ 📑</option>
            <option value="PENDING">รอติดต่อ 🕒</option>
            <option value="CONTACTED">ติดต่อแล้ว 📞</option>
            <option value="SUCCESS">ปิดการขาย 🎉</option>
            <option value="CANCELLED">ยกเลิก ❌</option>
          </select>
        </div>
      </div>

      {/* 🟢 ส่วนล่าง: ตารางข้อมูล */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="p-4 font-bold border-b">วันที่จอง</th>
              <th className="p-4 font-bold border-b">ข้อมูลลูกค้า</th>
              <th className="p-4 font-bold border-b">รถที่สนใจ</th>
              <th className="p-4 font-bold border-b">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500 font-medium">
                  ไม่มีข้อมูลที่ตรงกับการค้นหา 🧐
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors border-b last:border-b-0">
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(booking.createdAt).toLocaleString("th-TH")}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{booking.customerName}</div>
                    <div className="text-sm text-gray-600">📞 {booking.phone}</div>
                    {booking.lineId && (
                      <div className="text-sm text-green-600">💬 {booking.lineId}</div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-blue-600">
                      {booking.motorcycle?.brand} {booking.motorcycle?.modelName}
                    </div>
                  </td>
                  <td className="p-4">
                    <StatusDropdown 
                      bookingId={booking.id} 
                      currentStatus={booking.status} 
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}