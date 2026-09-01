require("dotenv").config();

const { Pool } = require("pg");
const pool = require("./config/db");

/**
 * Create database if it doesn't exist
 * This connects with minimal credentials to create the target database
 */
const createDatabaseIfNotExists = async () => {
  const adminPool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    database: "postgres", // Connect to default postgres database
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
  });

  try {
    const dbName = process.env.DB_NAME || "final_adluri";
    
    // Check if database exists
    const result = await adminPool.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (result.rows.length === 0) {
      console.log(`📦 Creating database: ${dbName}`);
      await adminPool.query(`CREATE DATABASE ${dbName}`);
      console.log(`✅ Database created: ${dbName}`);
    } else {
      console.log(`✅ Database already exists: ${dbName}`);
    }
  } catch (error) {
    console.error("⚠️  Could not create database:", error.message);
  } finally {
    await adminPool.end();
  }
};

/**
 * Initialize database tables
 * This script creates all necessary tables if they don't exist
 */

const initializeDatabase = async () => {
  try {
    // First, try to create the database if it doesn't exist
    await createDatabaseIfNotExists();

    // Give the connection pool a moment to reconnect to the new database
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("🔧 Initializing database tables...");

    // ============================================================
    // ADMINS TABLE
    // ============================================================

    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Admins table ready");

    // ============================================================
    // VIDEOS TABLE
    // ============================================================

    await pool.query(`
      CREATE TABLE IF NOT EXISTS videos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        video_url VARCHAR(500) NOT NULL,
        thumbnail_url VARCHAR(500),
        category VARCHAR(100) DEFAULT 'Video',
        published_date DATE,
        link VARCHAR(500),
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Videos table ready");

    // Create indexes for videos table
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_videos_display_order
      ON videos(display_order ASC);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_videos_category
      ON videos(category);
    `);

    // ============================================================
    // POLITICAL CAREER TABLE
    // ============================================================

    await pool.query(`
      CREATE TABLE IF NOT EXISTS political_career (
        id SERIAL PRIMARY KEY,
        year VARCHAR(50) NOT NULL,
        position VARCHAR(255) NOT NULL,
        organization VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100) DEFAULT 'Political Career',
        display_order INTEGER DEFAULT 0,
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Political Career table ready");

    // Create indexes for political career table
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_political_career_display_order
      ON political_career(display_order ASC);
    `);

    // ============================================================
    // INSERT DEFAULT ADMIN (if doesn't exist)
    // ============================================================

    const adminCheck = await pool.query(
      "SELECT id FROM admins WHERE name = $1 LIMIT 1",
      ["admin"]
    );

    if (adminCheck.rows.length === 0) {
      const bcrypt = require("bcrypt");
      const passwordHash = await bcrypt.hash(
        process.env.ADMIN_PASSWORD || "admin123",
        10
      );

      await pool.query(
        `
        INSERT INTO admins (name, email, password_hash, role, is_active)
        VALUES ($1, $2, $3, $4, $5)
        `,
        [
          "admin",
          process.env.ADMIN_EMAIL || "admin@example.com",
          passwordHash,
          "admin",
          true,
        ]
      );

      console.log("✅ Default admin user created");
      console.log("   Username: admin");
      console.log(
        `   Password: ${process.env.ADMIN_PASSWORD || "admin123"}`
      );
    } else {
      console.log("✅ Admin user already exists");
    }

    console.log("");
    console.log("✅ Database initialization complete!");
    console.log("");

  } catch (error) {
    console.error("❌ Database initialization failed:");
    console.error(error.message);
    process.exit(1);
  }
};

// Run initialization if called directly
if (require.main === module) {
  initializeDatabase().then(() => {
    process.exit(0);
  });
}

module.exports = initializeDatabase;
