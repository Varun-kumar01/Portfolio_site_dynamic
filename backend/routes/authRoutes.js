const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Admin credentials
  if (username !== "admin" || password !== "admin123") {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }

  // Create JWT
  const token = jwt.sign(
    {
      username: "admin",
      role: "admin",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  res.json({
    success: true,
    message: "Login successful",
    token,
  });
});

module.exports = router;