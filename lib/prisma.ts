import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const prismaClientSingleton = () => {
  // สร้าง Adapter สำหรับเชื่อมต่อ MySQL โดยระบุค่าให้ตรงกับใน Docker
  const adapter = new PrismaMariaDb({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootpassword',
    database: 'rrmotor_db',
  });
  
  // ส่ง Adapter เข้าไปใน PrismaClient ตามมาตรฐานเวอร์ชันล่าสุด
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;