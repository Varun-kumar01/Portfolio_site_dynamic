require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  // Keeps connections healthy
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// Check PostgreSQL connection
pool.on("connect", () => {
  console.log("PostgreSQL database connected");
  console.log("///////////////////New PostgreSQL connection opened", {
    total: pool.totalCount,
    idle: pool.idleCount,
    waiting: pool.waitingCount,
  });
});

// Handle unexpected database errors
pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL error:", error);
});

// Test connection when server starts
const testDatabaseConnection = async () => {
  try {
    const client = await pool.connect();

    const result = await client.query("SELECT NOW()");

    console.log("Database connection successful");
    console.log("Database time:", result.rows[0].now);

    client.release();
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error.message);
  }
};

testDatabaseConnection();

module.exports = pool;