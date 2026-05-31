import prisma from "../../lib/prisma"; 
import AdminTable from "./AdminTable"; // 👈 ดึงคอมโพเนนต์ใหม่มาใช้

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // ดึงข้อมูลทั้งหมดจาก MySQL
  const bookings = await prisma.booking.findMany({
    include: { motorcycle: true }, 
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
          <span className="bg-blue-600 text-white p-2 rounded-lg mr-4 shadow-sm">📊</span>
          ระบบจัดการลูกค้า (Admin Dashboard)
        </h1>

        {/* 👈 โยนข้อมูลลงไปให้ตารางจัดการค้นหาและกรองต่อ */}
        <AdminTable bookings={bookings} />
        
      </div>
    </div>
  );
}