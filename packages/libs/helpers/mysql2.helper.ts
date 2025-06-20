import mysql2 from 'mysql2/promise'

const pool = mysql2.createPool({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB as string,
  timezone: 'Z',
})

export default pool