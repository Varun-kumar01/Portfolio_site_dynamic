/**
 * Database Setup Script
 * 
 * This script creates the PostgreSQL database and tables automatically.
 * Run this ONCE before starting the server.
 * 
 * Usage:
 *   node setup-db.js
 */

require("dotenv").config();

const { Pool } = require("pg");

const setupDatabase = async () => {
  console.log("\n========================================");
  console.log("🔧 DATABASE SETUP STARTING");
  console.log("========================================\n");

  const adminPool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    database: "postgres",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
  });

  try {
    const dbName = process.env.DB_NAME || "final_adluri";

    console.log(`📝 Configuration:`);
    console.log(`   Host: ${process.env.DB_HOST || "localhost"}`);
    console.log(`   Port: ${process.env.DB_PORT || 5432}`);
    console.log(`   Database: ${dbName}`);
    console.log(`   User: ${process.env.DB_USER || "postgres"}\n`);

    // Step 1: Check if database exists
    console.log("📌 Step 1: Checking if database exists...");
    const dbCheckResult = await adminPool.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (dbCheckResult.rows.length === 0) {
      console.log(`❌ Database not found. Creating...`);
      await adminPool.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ Database created: ${dbName}\n`);
    } else {
      console.log(`✅ Database already exists: ${dbName}\n`);
    }

    // Close admin connection and create new pool for target database
    await adminPool.end();

    // Step 2: Connect to target database
    console.log("📌 Step 2: Connecting to target database...");
    const targetPool = new Pool({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 5432,
      database: dbName,
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD,
    });

    // Step 3: Create tables
    console.log("📌 Step 3: Creating tables...\n");

    // Admins table
    await targetPool.query(`
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
    console.log("   ✅ Admins table created");

    // Videos table
    await targetPool.query(`
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
    console.log("   ✅ Videos table created");

    // Create indexes for videos
    await targetPool.query(`
      CREATE INDEX IF NOT EXISTS idx_videos_display_order
      ON videos(display_order ASC);
    `);

    await targetPool.query(`
      CREATE INDEX IF NOT EXISTS idx_videos_category
      ON videos(category);
    `);
    console.log("   ✅ Videos indexes created");

    // Political Career table
    await targetPool.query(`
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
    console.log("   ✅ Political Career table created");

    // Create indexes for political career
    await targetPool.query(`
      CREATE INDEX IF NOT EXISTS idx_political_career_display_order
      ON political_career(display_order ASC);
    `);
    console.log("   ✅ Political Career indexes created\n");

    // Step 4: Insert default admin
    console.log("📌 Step 4: Setting up admin user...\n");

    const bcrypt = require("bcrypt");
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    const adminCheckResult = await targetPool.query(
      `SELECT id FROM admins WHERE name = $1 LIMIT 1`,
      ["admin"]
    );

    if (adminCheckResult.rows.length === 0) {
      await targetPool.query(
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

      console.log("   ✅ Default admin user created");
      console.log(`      Username: admin`);
      console.log(`      Password: ${adminPassword}`);
      console.log(`      Email: ${process.env.ADMIN_EMAIL || "admin@example.com"}\n`);
    } else {
      console.log("   ✅ Admin user already exists\n");
    }

    // Verify tables
    console.log("📌 Step 5: Verifying tables...\n");

    const tablesResult = await targetPool.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    );

    const tables = tablesResult.rows.map((r) => r.table_name);
    console.log("   📊 Tables in database:");
    tables.forEach((table) => console.log(`      ✅ ${table}`));

    await targetPool.end();

    console.log("\n========================================");
    console.log("✅ DATABASE SETUP COMPLETE!");
    console.log("========================================");
    console.log("\n🚀 You can now start the server:");
    console.log("   node server.js\n");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ DATABASE SETUP FAILED!");
    console.error("Error:", error.message);
    console.error("\n⚠️  Make sure:");
    console.error("   1. PostgreSQL is installed and running");
    console.error("   2. PostgreSQL is accessible at " + (process.env.DB_HOST || "localhost") + ":" + (process.env.DB_PORT || 5432));
    console.error("   3. User '" + (process.env.DB_USER || "postgres") + "' exists in PostgreSQL");
    console.error("   4. .env file has correct DB_PASSWORD\n");

    process.exit(1);
  }
};

setupDatabase();
