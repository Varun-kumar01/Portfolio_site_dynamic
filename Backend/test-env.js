require("dotenv").config();

console.log("Environment Variables Check:");
console.log("===============================");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "✅ Set" : "❌ Not Set");
console.log("DB_PASSWORD length:", process.env.DB_PASSWORD ? process.env.DB_PASSWORD.length : 0);
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ Set" : "❌ Not Set");
console.log("===============================");

// Try to connect with the loaded env vars
const { Pool } = require("pg");

const testPool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  database: "postgres",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
});

testPool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log("\n❌ Connection Failed:");
    console.log(err.message);
  } else {
    console.log("\n✅ Connection Successful!");
    console.log("Database time:", res.rows[0].now);
  }
  testPool.end();
});
