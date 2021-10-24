import { Pool } from 'pg';

const dbHelper = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'node-complete',
  password: 'postgres',
  port: 5432
})


export default dbHelper
