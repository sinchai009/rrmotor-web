"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 👈 เพิ่มบรรทัดนี้

interface Props {
  bookingId: number;
  currentStatus: string;
}

export default function StatusDropdown({ bookingId, currentStatus }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // 👈 เพิ่มบรรทัดนี้

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setIsLoading(true);

    try {
      const res = await fetch("/api/update-status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: bookingId, status: newStatus }),
      });

      if (!res.ok) throw new Error("Update failed");
      
      router.refresh(); // 👈 สั่งให้ Next.js ดึงข้อมูลใหม่เงียบๆ หลังบ้าน
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการบันทึกสถานะ");
      setStatus(currentStatus);
    } finally {
      setIsLoading(false);
    }
  };

  const getColor = (s: string) => {
    switch (s) {
      case "PENDING": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "CONTACTED": return "bg-blue-100 text-blue-800 border-blue-300";
      case "SUCCESS": return "bg-green-100 text-green-800 border-green-300";
      case "CANCELLED": return "bg-gray-100 text-gray-800 border-gray-300";
      default: return "bg-white";
    }
  };

  return (
    <select
      value={status}
      onChange={handleStatusChange}
      disabled={isLoading}
      suppressHydrationWarning={true}
      className={`p-2 rounded-lg text-sm font-bold border outline-none cursor-pointer ${getColor(status)}`}
    >
      <option value="PENDING">รอติดต่อ 🕒</option>
      <option value="CONTACTED">ติดต่อแล้ว 📞</option>
      <option value="SUCCESS">ปิดการขาย 🎉</option>
      <option value="CANCELLED">ยกเลิก ❌</option>
    </select>
  );
}