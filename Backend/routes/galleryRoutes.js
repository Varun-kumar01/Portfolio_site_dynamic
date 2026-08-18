const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Pool } = require("pg");
require("dotenv").config();

const router = express.Router();

// =====================================================
// DATABASE
// =====================================================

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
});

// =====================================================
// UPLOAD DIRECTORY
// =====================================================

const uploadDir = path.join(__dirname, "../uploads/gallery");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// =====================================================
// MULTER STORAGE
// =====================================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);

    const filename =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1000000000) +
      extension;

    cb(null, filename);
  },
});

// =====================================================
// MULTER
// =====================================================

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: function (req, file, cb) {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// =====================================================
// GET ALL GALLERY IMAGES
// =====================================================

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        title,
        caption,
        category,
        image_filename,
        image_path,
        created_at,
        updated_at
      FROM gallery
      ORDER BY created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("GET GALLERY ERROR:", error);

    res.status(500).json({
      message: "Failed to load gallery images",
    });
  }
});

// =====================================================
// ADD NEW GALLERY IMAGE
// =====================================================

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, caption, category } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Please select an image",
      });
    }

    const imageFilename = req.file.filename;

    const imagePath = `/uploads/gallery/${imageFilename}`;

    const allowedCategories = [
      "Public Events",
      "Constituency",
      "Meetings",
      "Events",
    ];

    const selectedCategory = allowedCategories.includes(category)
      ? category
      : "Public Events";

    const result = await pool.query(
      `
      INSERT INTO gallery
      (
        title,
        caption,
        category,
        image_filename,
        image_path
      )
      VALUES
      ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        title || "",
        caption || "",
        selectedCategory,
        imageFilename,
        imagePath,
      ]
    );

    res.status(201).json({
      message: "Gallery image uploaded successfully",
      image: result.rows[0],
    });
  } catch (error) {
    console.error("POST GALLERY ERROR:", error);

    if (req.file && req.file.path) {
      try {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      } catch (deleteError) {
        console.error("Failed to delete uploaded file:", deleteError);
      }
    }

    res.status(500).json({
      message: error.message || "Failed to upload image",
    });
  }
});

// =====================================================
// UPDATE GALLERY IMAGE
// =====================================================

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, caption, category } = req.body;

    const existing = await pool.query(
      `SELECT * FROM gallery WHERE id = $1`,
      [id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({
        message: "Gallery image not found",
      });
    }

    const oldImage = existing.rows[0];

    let imageFilename = oldImage.image_filename;
    let imagePath = oldImage.image_path;

    if (req.file) {
      imageFilename = req.file.filename;
      imagePath = `/uploads/gallery/${imageFilename}`;
    }

    const allowedCategories = [
      "Public Events",
      "Constituency",
      "Meetings",
      "Events",
    ];

    const selectedCategory = allowedCategories.includes(category)
      ? category
      : oldImage.category || "Public Events";

    const result = await pool.query(
      `
      UPDATE gallery
      SET
        title = $1,
        caption = $2,
        category = $3,
        image_filename = $4,
        image_path = $5,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
      `,
      [
        title || "",
        caption || "",
        selectedCategory,
        imageFilename,
        imagePath,
        id,
      ]
    );

    // Delete old image only when a new image was uploaded
    if (req.file && oldImage.image_filename) {
      const oldFilePath = path.join(
        uploadDir,
        oldImage.image_filename
      );

      try {
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      } catch (deleteError) {
        console.error("Failed to delete old image:", deleteError);
      }
    }

    res.json({
      message: "Gallery image updated successfully",
      image: result.rows[0],
    });
  } catch (error) {
    console.error("PUT GALLERY ERROR:", error);

    res.status(500).json({
      message: error.message || "Failed to update image",
    });
  }
});

// =====================================================
// DELETE GALLERY IMAGE
// =====================================================

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await pool.query(
      `SELECT * FROM gallery WHERE id = $1`,
      [id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({
        message: "Gallery image not found",
      });
    }

    const image = existing.rows[0];

    await pool.query(
      `DELETE FROM gallery WHERE id = $1`,
      [id]
    );

    if (image.image_filename) {
      const imageFilePath = path.join(
        uploadDir,
        image.image_filename
      );

      try {
        if (fs.existsSync(imageFilePath)) {
          fs.unlinkSync(imageFilePath);
        }
      } catch (deleteError) {
        console.error("Failed to delete image file:", deleteError);
      }
    }

    res.json({
      message: "Gallery image deleted successfully",
    });
  } catch (error) {
    console.error("DELETE GALLERY ERROR:", error);

    res.status(500).json({
      message: error.message || "Failed to delete image",
    });
  }
});

module.exports = router;