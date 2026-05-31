import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // เปลี่ยน user เป็น root และ password เป็น rootpassword
    //url: "mysql://root:rootpassword@localhost:3306/rrmotor_db",
    // เปลี่ยนจากของเดิม ให้เป็นบรรทัดนี้ครับ
    url: "mysql://rrmotor_sinchai:RrM0t0r%40Gma1l@rrmotorbikes.com:3306/rrmotor_test",
  },
});