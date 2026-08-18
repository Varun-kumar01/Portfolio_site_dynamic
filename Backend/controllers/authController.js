const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");


// =====================================================
// ADMIN LOGIN
// =====================================================

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // -------------------------------------------------
    // VALIDATION
    // -------------------------------------------------

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }


    // -------------------------------------------------
    // FIND ADMIN FROM POSTGRESQL
    // -------------------------------------------------

    const result = await pool.query(
      `
      SELECT
        id,
        username,
        password,
        role
      FROM admins
      WHERE username = $1
      LIMIT 1
      `,
      [username]
    );


    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }


    const admin = result.rows[0];


    // -------------------------------------------------
    // CHECK PASSWORD
    // -------------------------------------------------

    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin.password
    );


    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }


    // -------------------------------------------------
    // CREATE JWT TOKEN
    // -------------------------------------------------

    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );


    // -------------------------------------------------
    // SUCCESS RESPONSE
    // -------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Login successful",

      token,

      admin: {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
    });

  } catch (error) {

    console.error(
      "ADMIN LOGIN ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};


module.exports = {
  login,
};