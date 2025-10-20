const sql = require('mssql');

const dbConfig = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true', // Use true for Azure SQL Database
    trustServerCertificate: true, // Change to true for local dev / self-signed certs
  },
};

let pool;

async function connectDb() {
  try {
    if (pool) return pool;
    pool = await new sql.ConnectionPool(dbConfig).connect();
    console.log('Connected to MSSQL Database.');
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit if DB connection fails on start
  }
}

async function getDbPool() {
    if (!pool) {
        throw new Error("Database not connected. Call connectDb() first.");
    }
    return pool;
}

module.exports = { connectDb, getDbPool };