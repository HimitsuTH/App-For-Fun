import mysql2 from 'mysql2/promise'
// import { ENVIRONMENT } from '../config/config'

const pool = mysql2.createPool({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB as string,
  port: Number(process.env.DB_PORT) as number, 
  timezone: 'Z',
})

export default pool