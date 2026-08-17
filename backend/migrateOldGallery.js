const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

// ===============================
// DATABASE
// ===============================

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
});

// ===============================
// PATHS
// ===============================

// Old images
const oldGalleryDir = path.join(
  __dirname,
  "../frontend/public/gallery"
);

// New upload directory
const newGalleryDir = path.join(
  __dirname,
  "uploads/gallery"
);

// Create upload directory if needed
if (!fs.existsSync(newGalleryDir)) {
  fs.mkdirSync(newGalleryDir, { recursive: true });
}

// ===============================
// OLD IMAGES
// ===============================

const images = [
  {
    file: "1.png",
    title: "Public Meeting",
    caption: "Public service programme",
    category: "Public Events",
  },
  {
    file: "2.png",
    title: "Public Interaction",
    caption: "Interaction with the public",
    category: "Public Events",
  },
  {
    file: "3.png",
    title: "Constituency Visit",
    caption: "Visit to the constituency",
    category: "Constituency",
  },
  {
    file: "4.png",
    title: "Public Programme",
    caption: "Participation in a public programme",
    category: "Events",
  },
  {
    file: "5.png",
    title: "Community Interaction",
    caption: "Interaction with community members",
    category: "Public Events",
  },
  {
    file: "6.png",
    title: "Official Meeting",
    caption: "Official meeting",
    category: "Meetings",
  },
  {
    file: "7.png",
    title: "Public Event",
    caption: "Participation in a public event",
    category: "Public Events",
  },
  {
    file: "8.png",
    title: "Leadership Meeting",
    caption: "Leadership meeting",
    category: "Meetings",
  },
  {
    file: "9.png",
    title: "Constituency Visit",
    caption: "Constituency visit",
    category: "Constituency",
  },
  {
    file: "10.png",
    title: "Public Programme",
    caption: "Public programme",
    category: "Events",
  },
  {
    file: "11.png",
    title: "Community Programme",
    caption: "Community interaction",
    category: "Public Events",
  },
  {
    file: "12.png",
    title: "Official Meeting",
    caption: "Official meeting",
    category: "Meetings",
  },
  {
    file: "gallery1.jpg",
    title: "Public Service",
    caption: "Public service activity",
    category: "Public Events",
  },
  {
    file: "gallery2.jpg",
    title: "Constituency Programme",
    caption: "Constituency programme",
    category: "Constituency",
  },
  {
    file: "gallery3.jpg",
    title: "Public Event",
    caption: "Important public event",
    category: "Events",
  },
];

// ===============================
// MIGRATION
// ===============================

async function migrateGallery() {
  try {
    console.log("Connecting to PostgreSQL...");

    await pool.query(`
      ALTER TABLE gallery
      ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'Public Events'
    `);

    console.log("Category column checked.");

    for (const item of images) {
      const oldPath = path.join(oldGalleryDir, item.file);
      const newPath = path.join(newGalleryDir, item.file);

      // Check old image exists
      if (!fs.existsSync(oldPath)) {
        console.log(`SKIPPED - File not found: ${item.file}`);
        continue;
      }

      // Copy image
      if (!fs.existsSync(newPath)) {
        fs.copyFileSync(oldPath, newPath);
        console.log(`COPIED: ${item.file}`);
      } else {
        console.log(`ALREADY EXISTS: ${item.file}`);
      }

      const imagePath = `/uploads/gallery/${item.file}`;

      // Check if already in database
      const existing = await pool.query(
        `SELECT id FROM gallery WHERE image_filename = $1`,
        [item.file]
      );

      if (existing.rows.length > 0) {
        console.log(`DATABASE ALREADY HAS: ${item.file}`);

        // Make sure category is updated
        await pool.query(
          `
          UPDATE gallery
          SET
            title = $1,
            caption = $2,
            category = $3,
            image_path = $4,
            updated_at = CURRENT_TIMESTAMP
          WHERE image_filename = $5
          `,
          [
            item.title,
            item.caption,
            item.category,
            imagePath,
            item.file,
          ]
        );

        continue;
      }

      // Insert into database
      await pool.query(
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
        `,
        [
          item.title,
          item.caption,
          item.category,
          item.file,
          imagePath,
        ]
      );

      console.log(`DATABASE INSERTED: ${item.file}`);
    }

    console.log("");
    console.log("====================================");
    console.log("GALLERY MIGRATION COMPLETED");
    console.log("====================================");

    const result = await pool.query(
      `SELECT * FROM gallery ORDER BY id`
    );

    console.table(result.rows);

  } catch (error) {
    console.error("MIGRATION ERROR:", error);
  } finally {
    await pool.end();
  }
}

migrateGallery();