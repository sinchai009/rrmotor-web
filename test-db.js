const mysql = require('mysql2');

console.log('กำลังทดสอบเชื่อมต่อ...');

const connection = mysql.createConnection({
  host: '147.50.227.17',
  user: 'rrmotor_sinchai',
  password: 'RrMotorDB2026', 
  database: 'rrmotor_test'
});

connection.query('SELECT 1 + 1 AS solution', (err, results) => {
  if (err) {
    console.error('❌ พัง! สาเหตุที่แท้จริงคือ:', err);
  } else {
    console.log('✅ เชื่อมต่อสำเร็จ 100%! ผลลัพธ์:', results[0].solution);
  }
  process.exit();
});