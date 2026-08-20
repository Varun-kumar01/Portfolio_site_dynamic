const bcrypt = require("bcrypt");
const pool = require("./config/db");

async function resetAdmin() {
  try {
    const email = "admin@example.com";
    const password = "345123";

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `UPDATE admins
       SET password_hash = $1,
           name = $2,
           email = $5,
           role = $3,
           is_active = $4
         WHERE email = $5
          OR name = $2`,
      [passwordHash, "admin", "admin", true, email]
    );

    if (result.rowCount === 0) {
      console.log("❌ No admin found with that email.");
    } else {
      console.log("✅ Admin password reset successfully");
      console.log("Email:", email);
      console.log("Password:", password);
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error resetting admin:", error);
    process.exit(1);
  }
}

resetAdmin();