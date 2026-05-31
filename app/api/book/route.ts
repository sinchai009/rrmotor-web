import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. บันทึกข้อมูลลงฐานข้อมูล MySQL
    const booking = await prisma.booking.create({
      data: {
        customerName: body.customerName,
        phone: body.phone,
        lineId: body.lineId || null,
        motorcycleId: body.motorcycleId,
      },
      // สั่งให้ดึงชื่อยี่ห้อและรุ่นรถมาด้วยเพื่อใช้ส่งเข้า Telegram
      include: {
        motorcycle: true 
      }
    });

    // 2. ส่งแจ้งเตือนผ่าน Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // --- เพิ่ม 2 บรรทัดนี้เพื่อเช็คว่าระบบอ่านค่าได้เป๊ะไหม ---
    console.log("👉 อ่าน Token ได้คือ:", botToken);
    console.log("👉 อ่าน Chat ID ได้คือ:", chatId);
    // ---------------------------------------------

    if (botToken && chatId) {
      const message = `🔥 มีลูกค้าสนใจจองรถใหม่!\n👤 ชื่อ: ${booking.customerName}\n📱 เบอร์โทร: ${booking.phone}\n💬 Line ID: ${booking.lineId || '-'}\n🏍️ รถที่สนใจ: ${booking.motorcycle.brand} ${booking.motorcycle.modelName}`;

      // ยิง API ไปที่ Telegram และเก็บผลลัพธ์ไว้
      const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });

      // ปริ้นท์ผลลัพธ์จาก Telegram ออกมาดูในหน้าจอ Terminal
      const telegramData = await telegramRes.json();
      console.log("👉 ผลลัพธ์จาก Telegram:", telegramData);
    } else {
      console.log("❌ ขาด Token หรือ Chat ID ในไฟล์ .env");
    }

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" }, { status: 500 });
  }
}