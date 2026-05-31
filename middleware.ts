import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. ถ้ากำลังเข้าหน้า /admin/login ให้ปล่อยผ่านได้เลย ไม่ต้องเช็คบัตร
  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  // 2. ถ้าเข้าหน้า /admin อื่นๆ ให้ตรวจหาบัตรผ่าน (Cookie)
  const adminToken = request.cookies.get('admin_token');

  // 3. ถ้าไม่มีบัตรผ่าน ให้เตะกลับไปหน้า Login
  if (!adminToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // 4. ถ้ามีบัตรผ่านแล้ว อนุญาตให้เข้าได้
  return NextResponse.next();
}

// กำหนดให้ยามคนนี้เฝ้าหน้าเว็บที่ขึ้นต้นด้วย /admin ทั้งหมด
export const config = {
  matcher: ['/admin/:path*'], 
};