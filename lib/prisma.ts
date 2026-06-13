import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const prismaClientSingleton = () => {
  // ใช้ MariaDB Adapter ซึ่งเป็นตัวมาตรฐานของ Prisma ในการต่อ MySQL
  const adapter = new PrismaMariaDb({
    host: '147.50.227.17',
    port: 3306,
    user: 'rrmotor_sinchai',
    password: 'RrMotorDB2026',
    database: 'rrmotor_test',
  });
  
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;