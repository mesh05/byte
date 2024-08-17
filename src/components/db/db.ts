import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // This is often required for SSL connections
  },
});

async function getConnection() {
  const conn = await pool.connect();
  return conn;
}

export default getConnection;
