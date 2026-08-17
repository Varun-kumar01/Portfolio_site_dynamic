
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

const authRoutes = require("./routes/authRoutes");
const leaderRoutes = require("./routes/leaderRoutes");
const galleryRoutes = require("./routes/galleryRoutes");

const protect = require("./middleware/authMiddleware");


// =====================================================
// CORS
// =====================================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


// =====================================================
// BODY PARSER
// =====================================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// =====================================================
// UPLOADED FILES
// =====================================================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);


// =====================================================
// ADMIN LOGIN
// =====================================================

app.use(
  "/api/admin",
  authRoutes
);


// =====================================================
// PROTECTED ADMIN LEADER ROUTES
// =====================================================

app.use(
  "/api/admin/leader",
  protect,
  leaderRoutes
);


// =====================================================
// PUBLIC GALLERY - GET IMAGES
// =====================================================
//
// IMPORTANT:
// The public Gallery.jsx will use:
//
// http://localhost:5000/api/gallery
//
// This route does NOT require admin login.
//

app.get(
  "/api/gallery",
  async (req, res, next) => {
    try {
      // Reuse the GET logic from galleryRoutes
      req.url = "/";
      galleryRoutes.handle(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);


// =====================================================
// PROTECTED ADMIN GALLERY ROUTES
// =====================================================
//
// Dashboard can continue using:
//
// /api/admin/gallery
//
// POST  -> upload
// PUT   -> edit
// DELETE -> delete
//

app.use(
  "/api/admin/gallery",
  protect,
  galleryRoutes
);


// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio backend server is running",
  });
});


// =====================================================
// 404
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


// =====================================================
// ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message:
      err.message ||
      "Internal server error",
  });
});


// =====================================================
// SERVER
// =====================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log("=================================");
  console.log(
    "Backend server running on port " + PORT
  );
  console.log(
    "http://localhost:" + PORT
  );
  console.log("=================================");
});

