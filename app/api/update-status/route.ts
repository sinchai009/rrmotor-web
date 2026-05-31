import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // เช็ค path ของ prisma ให้ตรงกับโปรเจกต์คุณนะครับ

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // อัปเดตสถานะในตาราง Booking ตาม ID ที่ส่งมา
    const updatedBooking = await prisma.booking.update({
      where: { id: Number(body.id) },
      data: { status: body.status }
    });

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "เกิดข้อผิดพลาดในการอัปเดต" }, { status: 500 });
  }
}