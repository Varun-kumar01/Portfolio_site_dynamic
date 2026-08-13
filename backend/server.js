const { Pool } = require("pg");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// ======================================================
// POSTGRESQL DATABASE CONNECTION
// ======================================================

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

pool
  .connect()
  .then((client) => {
    console.log("=================================");
    console.log("PostgreSQL connected successfully");
    console.log("=================================");
    client.release();
  })
  .catch((error) => {
    console.error(
      "PostgreSQL connection error:",
      error.message
    );
  });

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================================================
// FOLDERS
// ======================================================

const dataFolder = path.join(
  __dirname,
  "data"
);

const uploadFolder = path.join(
  __dirname,
  "uploads"
);

const videoFolder = path.join(
  uploadFolder,
  "videos"
);

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder, {
    recursive: true,
  });
}

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, {
    recursive: true,
  });
}

if (!fs.existsSync(videoFolder)) {
  fs.mkdirSync(videoFolder, {
    recursive: true,
  });
}

// ======================================================
// SERVE UPLOADED FILES
// ======================================================

app.use(
  "/uploads",
  express.static(uploadFolder)
);

app.use(
  "/uploads/videos",
  express.static(videoFolder)
);

// ======================================================
// IMAGE MULTER CONFIGURATION
// ======================================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },

  filename: (req, file, cb) => {
    const extension =
      path.extname(
        file.originalname
      );

    const originalName =
      path
        .basename(
          file.originalname,
          extension
        )
        .replace(/\s+/g, "-")
        .replace(
          /[^a-zA-Z0-9-_]/g,
          ""
        );

    const filename =
      Date.now() +
      "-" +
      originalName +
      extension;

    cb(null, filename);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize:
      5 * 1024 * 1024,
  },

  fileFilter: (
    req,
    file,
    cb
  ) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (
      allowedTypes.includes(
        file.mimetype
      )
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only JPG, JPEG, PNG and WEBP images are allowed"
        )
      );
    }
  },
});

// ======================================================
// VIDEO MULTER CONFIGURATION
// ======================================================

const videoStorage =
  multer.diskStorage({
    destination: (
      req,
      file,
      cb
    ) => {
      cb(null, videoFolder);
    },

    filename: (
      req,
      file,
      cb
    ) => {
      const extension =
        path.extname(
          file.originalname
        );

      const originalName =
        path
          .basename(
            file.originalname,
            extension
          )
          .replace(
            /\s+/g,
            "-"
          )
          .replace(
            /[^a-zA-Z0-9-_]/g,
            ""
          );

      const filename =
        Date.now() +
        "-" +
        originalName +
        extension;

      cb(
        null,
        filename
      );
    },
  });

const videoUpload =
  multer({
    storage:
      videoStorage,

    limits: {
      fileSize:
        500 *
        1024 *
        1024,
    },

    fileFilter: (
      req,
      file,
      cb
    ) => {
      /*
       * Accept ANY video MIME type:
       *
       * video/mp4
       * video/webm
       * video/quicktime
       * video/x-msvideo
       * video/x-matroska
       * video/mpeg
       * video/ogg
       * video/3gpp
       * etc.
       */

      if (
        file.mimetype &&
        file.mimetype.startsWith(
          "video/"
        )
      ) {
        return cb(
          null,
          true
        );
      }

      /*
       * Some browsers send
       * unknown video files as
       * application/octet-stream.
       */

      if (
        file.mimetype ===
        "application/octet-stream"
      ) {
        return cb(
          null,
          true
        );
      }

      /*
       * Fallback by extension.
       */

      const videoExtensions = [
        ".mp4",
        ".m4v",
        ".webm",
        ".mov",
        ".qt",
        ".avi",
        ".mkv",
        ".wmv",
        ".flv",
        ".f4v",
        ".mpeg",
        ".mpg",
        ".mpe",
        ".mpv",
        ".3gp",
        ".3g2",
        ".ts",
        ".mts",
        ".m2ts",
        ".vob",
        ".ogv",
        ".ogg",
        ".rm",
        ".rmvb",
        ".asf",
        ".amv",
        ".divx",
        ".mxf",
        ".m2v",
        ".m4p",
        ".m4b",
        ".m4a",
      ];

      const extension =
        path
          .extname(
            file.originalname
          )
          .toLowerCase();

      if (
        videoExtensions.includes(
          extension
        )
      ) {
        return cb(
          null,
          true
        );
      }

      cb(
        new Error(
          "The selected file is not recognized as a video."
        )
      );
    },
  });

// ======================================================
// HOME JSON
// ======================================================

const homeFile = path.join(
  dataFolder,
  "home.json"
);

if (!fs.existsSync(homeFile)) {
  const defaultHomeData = {
    name: "Adluri Laxman Kumar",
    designation:
      "Member of Legislative Assembly",
    badge:
      "CABINET MINISTER • TELANGANA",
    title: "LAXMAN KUMAR",
    tagline:
      "Building a Better Telangana",
    description:
      "Committed to transparent governance, inclusive growth, stronger infrastructure, quality education and public welfare.",
    electionYear: "2023",
    constituency: "Dharmapuri",
    yearsOfService: "25+",
    heroImage: "",
    updatedAt:
      new Date().toISOString(),
  };

  fs.writeFileSync(
    homeFile,
    JSON.stringify(
      defaultHomeData,
      null,
      2
    )
  );
}

// ======================================================
// TEST BACKEND
// ======================================================

app.get(
  "/",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Adluri Laxman Kumar Portfolio Backend is running",
    });
  }
);

// ======================================================
// TEST DATABASE
// ======================================================

app.get(
  "/api/db-test",
  async (
    req,
    res
  ) => {
    try {
      const result =
        await pool.query(
          "SELECT NOW()"
        );

      res.json({
        success: true,
        message:
          "PostgreSQL is connected",
        time:
          result.rows[0]
            .now,
      });
    } catch (error) {
      console.error(
        "DATABASE TEST ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "PostgreSQL connection failed",
        error:
          error.message,
      });
    }
  }
);

// ======================================================
// HOME API
// ======================================================

// GET HOME

app.get(
  "/api/home",
  (req, res) => {
    try {
      const data =
        JSON.parse(
          fs.readFileSync(
            homeFile,
            "utf8"
          )
        );

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      console.error(
        "GET HOME ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to load home information",
      });
    }
  }
);

// UPDATE HOME

app.put(
  "/api/home",
  (req, res) => {
    try {
      const oldData =
        JSON.parse(
          fs.readFileSync(
            homeFile,
            "utf8"
          )
        );

      const updatedData = {
        ...oldData,
        ...req.body,
        updatedAt:
          new Date().toISOString(),
      };

      fs.writeFileSync(
        homeFile,
        JSON.stringify(
          updatedData,
          null,
          2
        )
      );

      res.json({
        success: true,
        message:
          "Home information updated successfully",
        data:
          updatedData,
      });
    } catch (error) {
      console.error(
        "UPDATE HOME ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to update home information",
      });
    }
  }
);

// ======================================================
// POLITICAL CAREER API
// ======================================================

// GET ALL

app.get(
  "/api/political-career",
  async (
    req,
    res
  ) => {
    try {
      const result =
        await pool.query(`
          SELECT
            id,
            year,
            position,
            organization,
            location,
            description,
            category,
            display_order,
            image_url,
            created_at,
            updated_at
          FROM political_career
          ORDER BY
            display_order ASC,
            id ASC
        `);

      res.json({
        success: true,
        data:
          result.rows,
      });
    } catch (error) {
      console.error(
        "GET POLITICAL CAREER ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to load political career entries",
        error:
          error.message,
      });
    }
  }
);

// GET ONE

app.get(
  "/api/political-career/:id",
  async (
    req,
    res
  ) => {
    try {
      const {
        id,
      } = req.params;

      const result =
        await pool.query(
          `
          SELECT
            id,
            year,
            position,
            organization,
            location,
            description,
            category,
            display_order,
            image_url,
            created_at,
            updated_at
          FROM political_career
          WHERE id = $1
          `,
          [id]
        );

      if (
        result.rows.length ===
        0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Political career entry not found",
        });
      }

      res.json({
        success: true,
        data:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "GET POLITICAL CAREER BY ID ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to load political career entry",
        error:
          error.message,
      });
    }
  }
);

// ADD

app.post(
  "/api/political-career",
  upload.single("image"),
  async (
    req,
    res
  ) => {
    try {
      const {
        year,
        position,
        organization,
        location,
        description,
        category,
        display_order,
      } = req.body;

      if (
        !year ||
        !position ||
        !organization ||
        !location
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Year, position, organization and location are required",
        });
      }

      let imageUrl = "";

      if (req.file) {
        imageUrl =
          `${req.protocol}://${req.get(
            "host"
          )}/uploads/${req.file.filename}`;
      }

      let orderValue;

      if (
        display_order !==
          undefined &&
        display_order !==
          ""
      ) {
        orderValue =
          Number(
            display_order
          );
      } else {
        const orderResult =
          await pool.query(`
            SELECT COALESCE(
              MAX(display_order),
              -1
            ) + 1 AS next_order
            FROM political_career
          `);

        orderValue =
          Number(
            orderResult.rows[0]
              .next_order
          );
      }

      const result =
        await pool.query(
          `
          INSERT INTO political_career
          (
            year,
            position,
            organization,
            location,
            description,
            category,
            display_order,
            image_url
          )
          VALUES
          ($1,$2,$3,$4,$5,$6,$7,$8)
          RETURNING
            id,
            year,
            position,
            organization,
            location,
            description,
            category,
            display_order,
            image_url,
            created_at,
            updated_at
          `,
          [
            year,
            position,
            organization,
            location,
            description || "",
            category ||
              "Political Career",
            orderValue,
            imageUrl,
          ]
        );

      res.status(201).json({
        success: true,
        message:
          "Political career entry added successfully",
        data:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "ADD POLITICAL CAREER ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to add political career entry",
        error:
          error.message,
      });
    }
  }
);

// UPDATE

app.put(
  "/api/political-career/:id",
  upload.single("image"),
  async (
    req,
    res
  ) => {
    try {
      const {
        id,
      } = req.params;

      const {
        year,
        position,
        organization,
        location,
        description,
        category,
        display_order,
      } = req.body;

      if (
        !year ||
        !position ||
        !organization ||
        !location
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Year, position, organization and location are required",
        });
      }

      const existing =
        await pool.query(
          `
          SELECT
            image_url,
            display_order
          FROM political_career
          WHERE id = $1
          `,
          [id]
        );

      if (
        existing.rows.length ===
        0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Political career entry not found",
        });
      }

      let imageUrl =
        existing.rows[0]
          .image_url || "";

      if (req.file) {
        imageUrl =
          `${req.protocol}://${req.get(
            "host"
          )}/uploads/${req.file.filename}`;
      }

      let orderValue =
        existing.rows[0]
          .display_order;

      if (
        display_order !==
          undefined &&
        display_order !==
          ""
      ) {
        orderValue =
          Number(
            display_order
          );
      }

      const result =
        await pool.query(
          `
          UPDATE political_career
          SET
            year = $1,
            position = $2,
            organization = $3,
            location = $4,
            description = $5,
            category = $6,
            display_order = $7,
            image_url = $8,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = $9
          RETURNING
            id,
            year,
            position,
            organization,
            location,
            description,
            category,
            display_order,
            image_url,
            created_at,
            updated_at
          `,
          [
            year,
            position,
            organization,
            location,
            description || "",
            category ||
              "Political Career",
            orderValue,
            imageUrl,
            id,
          ]
        );

      res.json({
        success: true,
        message:
          "Political career entry updated successfully",
        data:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "UPDATE POLITICAL CAREER ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to update political career entry",
        error:
          error.message,
      });
    }
  }
);

// DELETE

app.delete(
  "/api/political-career/:id",
  async (
    req,
    res
  ) => {
    try {
      const {
        id,
      } = req.params;

      const existing =
        await pool.query(
          `
          SELECT
            image_url
          FROM political_career
          WHERE id = $1
          `,
          [id]
        );

      if (
        existing.rows.length ===
        0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Political career entry not found",
        });
      }

      const imageUrl =
        existing.rows[0]
          .image_url || "";

      await pool.query(
        `
        DELETE FROM political_career
        WHERE id = $1
        `,
        [id]
      );

      if (imageUrl) {
        try {
          const filename =
            path.basename(
              imageUrl
            );

          const filePath =
            path.join(
              uploadFolder,
              filename
            );

          if (
            fs.existsSync(
              filePath
            )
          ) {
            fs.unlinkSync(
              filePath
            );
          }
        } catch (imageError) {
          console.error(
            "IMAGE DELETE WARNING:",
            imageError.message
          );
        }
      }

      res.json({
        success: true,
        message:
          "Political career entry deleted successfully",
      });
    } catch (error) {
      console.error(
        "DELETE POLITICAL CAREER ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to delete political career entry",
        error:
          error.message,
      });
    }
  }
);

// ======================================================
// NEWS API
// ======================================================

// GET ALL NEWS

app.get(
  "/api/news",
  async (
    req,
    res
  ) => {
    try {
      const result =
        await pool.query(`
          SELECT
            id,
            title,
            description,
            content,
            category,
            image_url,
            published_date,
            display_order,
            link,
            created_at,
            updated_at
          FROM news
          ORDER BY
            display_order ASC,
            id ASC
        `);

      res.json({
        success: true,
        data:
          result.rows,
      });
    } catch (error) {
      console.error(
        "GET NEWS ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to load news",
        error:
          error.message,
      });
    }
  }
);

// GET ONE NEWS

app.get(
  "/api/news/:id",
  async (
    req,
    res
  ) => {
    try {
      const {
        id,
      } = req.params;

      const result =
        await pool.query(
          `
          SELECT
            id,
            title,
            description,
            content,
            category,
            image_url,
            published_date,
            display_order,
            link,
            created_at,
            updated_at
          FROM news
          WHERE id = $1
          `,
          [id]
        );

      if (
        result.rows.length ===
        0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "News not found",
        });
      }

      res.json({
        success: true,
        data:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "GET NEWS BY ID ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to load news",
        error:
          error.message,
      });
    }
  }
);

// ADD NEWS

app.post(
  "/api/news",
  upload.single("image"),
  async (
    req,
    res
  ) => {
    try {
      const {
        title,
        description,
        content,
        category,
        published_date,
        display_order,
        link,
      } = req.body;

      if (
        !title ||
        !title.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Title is required",
        });
      }

      let imageUrl = "";

      if (req.file) {
        imageUrl =
          `${req.protocol}://${req.get(
            "host"
          )}/uploads/${req.file.filename}`;
      }

      let orderValue;

      if (
        display_order !==
          undefined &&
        display_order !==
          ""
      ) {
        orderValue =
          Number(
            display_order
          );
      } else {
        const orderResult =
          await pool.query(`
            SELECT COALESCE(
              MAX(display_order),
              -1
            ) + 1 AS next_order
            FROM news
          `);

        orderValue =
          Number(
            orderResult.rows[0]
              .next_order
          );
      }

      const result =
        await pool.query(
          `
          INSERT INTO news
          (
            title,
            description,
            content,
            category,
            image_url,
            published_date,
            display_order,
            link
          )
          VALUES
          ($1,$2,$3,$4,$5,$6,$7,$8)
          RETURNING
            id,
            title,
            description,
            content,
            category,
            image_url,
            published_date,
            display_order,
            link,
            created_at,
            updated_at
          `,
          [
            title.trim(),
            description || "",
            content || "",
            category ||
              "News",
            imageUrl,
            published_date ||
              null,
            orderValue,
            link || "",
          ]
        );

      res.status(201).json({
        success: true,
        message:
          "News added successfully",
        data:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "ADD NEWS ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to add news",
        error:
          error.message,
      });
    }
  }
);

// UPDATE NEWS

app.put(
  "/api/news/:id",
  upload.single("image"),
  async (
    req,
    res
  ) => {
    try {
      const {
        id,
      } = req.params;

      const {
        title,
        description,
        content,
        category,
        published_date,
        display_order,
        link,
      } = req.body;

      if (
        !title ||
        !title.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Title is required",
        });
      }

      const existing =
        await pool.query(
          `
          SELECT
            image_url,
            display_order,
            link
          FROM news
          WHERE id = $1
          `,
          [id]
        );

      if (
        existing.rows.length ===
        0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "News not found",
        });
      }

      let imageUrl =
        existing.rows[0]
          .image_url || "";

      if (req.file) {
        imageUrl =
          `${req.protocol}://${req.get(
            "host"
          )}/uploads/${req.file.filename}`;
      }

      let orderValue =
        existing.rows[0]
          .display_order;

      if (
        display_order !==
          undefined &&
        display_order !==
          ""
      ) {
        const parsedOrder =
          Number(
            display_order
          );

        if (
          Number.isFinite(
            parsedOrder
          )
        ) {
          orderValue =
            parsedOrder;
        }
      }

      const linkValue =
        link !== undefined
          ? link || ""
          : existing.rows[0]
              .link || "";

      const result =
        await pool.query(
          `
          UPDATE news
          SET
            title = $1,
            description = $2,
            content = $3,
            category = $4,
            image_url = $5,
            published_date = $6,
            display_order = $7,
            link = $8,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = $9
          RETURNING
            id,
            title,
            description,
            content,
            category,
            image_url,
            published_date,
            display_order,
            link,
            created_at,
            updated_at
          `,
          [
            title.trim(),
            description || "",
            content || "",
            category ||
              "News",
            imageUrl,
            published_date ||
              null,
            orderValue,
            linkValue,
            id,
          ]
        );

      res.json({
        success: true,
        message:
          "News updated successfully",
        data:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "UPDATE NEWS ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to update news",
        error:
          error.message,
      });
    }
  }
);

// DELETE NEWS

app.delete(
  "/api/news/:id",
  async (
    req,
    res
  ) => {
    try {
      const {
        id,
      } = req.params;

      const existing =
        await pool.query(
          `
          SELECT
            image_url
          FROM news
          WHERE id = $1
          `,
          [id]
        );

      if (
        existing.rows.length ===
        0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "News not found",
        });
      }

      const imageUrl =
        existing.rows[0]
          .image_url || "";

      await pool.query(
        `
        DELETE FROM news
        WHERE id = $1
        `,
        [id]
      );

      if (imageUrl) {
        try {
          const filename =
            path.basename(
              imageUrl
            );

          const filePath =
            path.join(
              uploadFolder,
              filename
            );

          if (
            fs.existsSync(
              filePath
            )
          ) {
            fs.unlinkSync(
              filePath
            );
          }
        } catch (imageError) {
          console.error(
            "NEWS IMAGE DELETE WARNING:",
            imageError.message
          );
        }
      }

      res.json({
        success: true,
        message:
          "News deleted successfully",
      });
    } catch (error) {
      console.error(
        "DELETE NEWS ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to delete news",
        error:
          error.message,
      });
    }
  }
);

// ======================================================
// ARTICLES API
// ======================================================

// GET ALL ARTICLES

app.get(
  "/api/articles",
  async (
    req,
    res
  ) => {
    try {
      const result =
        await pool.query(`
          SELECT
            id,
            title,
            summary,
            content,
            category,
            image_url,
            published_date,
            link,
            created_at,
            updated_at
          FROM articles
          ORDER BY
            published_date DESC,
            id DESC
        `);

      res.json({
        success: true,
        data:
          result.rows,
      });
    } catch (error) {
      console.error(
        "GET ARTICLES ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to load articles",
        error:
          error.message,
      });
    }
  }
);

// GET ONE ARTICLE

app.get(
  "/api/articles/:id",
  async (
    req,
    res
  ) => {
    try {
      const {
        id,
      } = req.params;

      const result =
        await pool.query(
          `
          SELECT
            id,
            title,
            summary,
            content,
            category,
            image_url,
            published_date,
            link,
            created_at,
            updated_at
          FROM articles
          WHERE id = $1
          `,
          [id]
        );

      if (
        result.rows.length ===
        0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Article not found",
        });
      }

      res.json({
        success: true,
        data:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "GET ARTICLE BY ID ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to load article",
        error:
          error.message,
      });
    }
  }
);

// ADD ARTICLE

app.post(
  "/api/articles",
  upload.single("image"),
  async (
    req,
    res
  ) => {
    try {
      const {
        title,
        summary,
        content,
        category,
        published_date,
        link,
      } = req.body;

      if (
        !title ||
        !title.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Title is required",
        });
      }

      let imageUrl = "";

      if (req.file) {
        imageUrl =
          `${req.protocol}://${req.get(
            "host"
          )}/uploads/${req.file.filename}`;
      }

      const result =
        await pool.query(
          `
          INSERT INTO articles
          (
            title,
            summary,
            content,
            category,
            image_url,
            published_date,
            link
          )
          VALUES
          ($1,$2,$3,$4,$5,$6,$7)
          RETURNING
            id,
            title,
            summary,
            content,
            category,
            image_url,
            published_date,
            link,
            created_at,
            updated_at
          `,
          [
            title.trim(),
            summary || "",
            content || "",
            category ||
              "Article",
            imageUrl,
            published_date ||
              null,
            link || "",
          ]
        );

      res.status(201).json({
        success: true,
        message:
          "Article added successfully",
        data:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "ADD ARTICLE ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to add article",
        error:
          error.message,
      });
    }
  }
);

// UPDATE ARTICLE

app.put(
  "/api/articles/:id",
  upload.single("image"),
  async (
    req,
    res
  ) => {
    try {
      const {
        id,
      } = req.params;

      const {
        title,
        summary,
        content,
        category,
        published_date,
        link,
      } = req.body;

      if (
        !title ||
        !title.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Title is required",
        });
      }

      const existing =
        await pool.query(
          `
          SELECT
            image_url
          FROM articles
          WHERE id = $1
          `,
          [id]
        );

      if (
        existing.rows.length ===
        0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Article not found",
        });
      }

      let imageUrl =
        existing.rows[0]
          .image_url || "";

      if (req.file) {
        imageUrl =
          `${req.protocol}://${req.get(
            "host"
          )}/uploads/${req.file.filename}`;
      }

      const result =
        await pool.query(
          `
          UPDATE articles
          SET
            title = $1,
            summary = $2,
            content = $3,
            category = $4,
            image_url = $5,
            published_date = $6,
            link = $7,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = $8
          RETURNING
            id,
            title,
            summary,
            content,
            category,
            image_url,
            published_date,
            link,
            created_at,
            updated_at
          `,
          [
            title.trim(),
            summary || "",
            content || "",
            category ||
              "Article",
            imageUrl,
            published_date ||
              null,
            link || "",
            id,
          ]
        );

      res.json({
        success: true,
        message:
          "Article updated successfully",
        data:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "UPDATE ARTICLE ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to update article",
        error:
          error.message,
      });
    }
  }
);

// DELETE ARTICLE

app.delete(
  "/api/articles/:id",
  async (
    req,
    res
  ) => {
    try {
      const {
        id,
      } = req.params;

      const existing =
        await pool.query(
          `
          SELECT
            image_url
          FROM articles
          WHERE id = $1
          `,
          [id]
        );

      if (
        existing.rows.length ===
        0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Article not found",
        });
      }

      const imageUrl =
        existing.rows[0]
          .image_url || "";

      await pool.query(
        `
        DELETE FROM articles
        WHERE id = $1
        `,
        [id]
      );

      if (imageUrl) {
        try {
          const filename =
            path.basename(
              imageUrl
            );

          const filePath =
            path.join(
              uploadFolder,
              filename
            );

          if (
            fs.existsSync(
              filePath
            )
          ) {
            fs.unlinkSync(
              filePath
            );
          }
        } catch (imageError) {
          console.error(
            "ARTICLE IMAGE DELETE WARNING:",
            imageError.message
          );
        }
      }

      res.json({
        success: true,
        message:
          "Article deleted successfully",
      });
    } catch (error) {
      console.error(
        "DELETE ARTICLE ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to delete article",
        error:
          error.message,
      });
    }
  }
);

// ======================================================
// VIDEOS API
// ======================================================

// GET ALL VIDEOS

app.get(
  "/api/videos",
  async (
    req,
    res
  ) => {
    try {
      const result =
        await pool.query(`
          SELECT
            id,
            title,
            description,
            video_url,
            thumbnail_url,
            category,
            published_date,
            link,
            display_order,
            created_at,
            updated_at
          FROM videos
          ORDER BY
            display_order ASC,
            id ASC
        `);

      return res.status(200).json({
        success: true,
        data:
          result.rows,
      });
    } catch (error) {
      console.error(
        "GET VIDEOS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to load videos",
        error:
          error.message,
      });
    }
  }
);

// GET ONE VIDEO

app.get(
  "/api/videos/:id",
  async (
    req,
    res
  ) => {
    try {
      const {
        id,
      } = req.params;

      const result =
        await pool.query(
          `
          SELECT
            id,
            title,
            description,
            video_url,
            thumbnail_url,
            category,
            published_date,
            link,
            display_order,
            created_at,
            updated_at
          FROM videos
          WHERE id = $1
          `,
          [id]
        );

      if (
        result.rows.length ===
        0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Video not found",
        });
      }

      return res.json({
        success: true,
        data:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "GET VIDEO ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to load video",
        error:
          error.message,
      });
    }
  }
);

// ADD VIDEO

app.post(
  "/api/videos",
  videoUpload.single(
    "video"
  ),
  async (
    req,
    res
  ) => {
    try {
      const {
        title,
        description,
        thumbnail_url,
        category,
        published_date,
        link,
        display_order,
      } = req.body;

      if (
        !title ||
        !title.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Video title is required",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "Please select a video file",
        });
      }

      const videoUrl =
        `${req.protocol}://${req.get(
          "host"
        )}/uploads/videos/${req.file.filename}`;

      let orderValue;

      if (
        display_order !==
          undefined &&
        display_order !==
          ""
      ) {
        orderValue =
          Number(
            display_order
          );
      } else {
        const orderResult =
          await pool.query(`
            SELECT COALESCE(
              MAX(display_order),
              -1
            ) + 1 AS next_order
            FROM videos
          `);

        orderValue =
          Number(
            orderResult.rows[0]
              .next_order
          );
      }

      const result =
        await pool.query(
          `
          INSERT INTO videos
          (
            title,
            description,
            video_url,
            thumbnail_url,
            category,
            published_date,
            link,
            display_order
          )
          VALUES
          ($1,$2,$3,$4,$5,$6,$7,$8)
          RETURNING
            id,
            title,
            description,
            video_url,
            thumbnail_url,
            category,
            published_date,
            link,
            display_order,
            created_at,
            updated_at
          `,
          [
            title.trim(),
            description || "",
            videoUrl,
            thumbnail_url || "",
            category ||
              "Video",
            published_date ||
              null,
            link || "",
            orderValue,
          ]
        );

      return res.status(201).json({
        success: true,
        message:
          "Video added successfully",
        data:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "ADD VIDEO ERROR:",
        error
      );

      /*
       * If database insert fails after
       * file upload, remove uploaded file.
       */

      if (req.file) {
        try {
          const filePath =
            path.join(
              videoFolder,
              req.file.filename
            );

          if (
            fs.existsSync(
              filePath
            )
          ) {
            fs.unlinkSync(
              filePath
            );
          }
        } catch (fileError) {
          console.error(
            "VIDEO CLEANUP ERROR:",
            fileError.message
          );
        }
      }

      return res.status(500).json({
        success: false,
        message:
          "Unable to add video",
        error:
          error.message,
      });
    }
  }
);

// UPDATE VIDEO

app.put(
  "/api/videos/:id",
  videoUpload.single(
    "video"
  ),
  async (
    req,
    res
  ) => {
    try {
      const {
        id,
      } = req.params;

      const {
        title,
        description,
        thumbnail_url,
        category,
        published_date,
        link,
        display_order,
      } = req.body;

      if (
        !title ||
        !title.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Video title is required",
        });
      }

      const existing =
        await pool.query(
          `
          SELECT
            video_url,
            display_order
          FROM videos
          WHERE id = $1
          `,
          [id]
        );

      if (
        existing.rows.length ===
        0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Video not found",
        });
      }

      let videoUrl =
        existing.rows[0]
          .video_url || "";

      if (req.file) {
        videoUrl =
          `${req.protocol}://${req.get(
            "host"
          )}/uploads/videos/${req.file.filename}`;
      }

      let orderValue =
        existing.rows[0]
          .display_order;

      if (
        display_order !==
          undefined &&
        display_order !==
          ""
      ) {
        const parsedOrder =
          Number(
            display_order
          );

        if (
          Number.isFinite(
            parsedOrder
          )
        ) {
          orderValue =
            parsedOrder;
        }
      }

      const result =
        await pool.query(
          `
          UPDATE videos
          SET
            title = $1,
            description = $2,
            video_url = $3,
            thumbnail_url = $4,
            category = $5,
            published_date = $6,
            link = $7,
            display_order = $8,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = $9
          RETURNING
            id,
            title,
            description,
            video_url,
            thumbnail_url,
            category,
            published_date,
            link,
            display_order,
            created_at,
            updated_at
          `,
          [
            title.trim(),
            description || "",
            videoUrl,
            thumbnail_url || "",
            category ||
              "Video",
            published_date ||
              null,
            link || "",
            orderValue,
            id,
          ]
        );

      /*
       * Delete old video only after
       * successful database update.
       */

      if (
        req.file &&
        existing.rows[0]
          .video_url
      ) {
        try {
          const oldFilename =
            path.basename(
              existing.rows[0]
                .video_url
            );

          const oldPath =
            path.join(
              videoFolder,
              oldFilename
            );

          if (
            fs.existsSync(
              oldPath
            )
          ) {
            fs.unlinkSync(
              oldPath
            );
          }
        } catch (fileError) {
          console.error(
            "OLD VIDEO DELETE WARNING:",
            fileError.message
          );
        }
      }

      return res.json({
        success: true,
        message:
          "Video updated successfully",
        data:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "UPDATE VIDEO ERROR:",
        error
      );

      if (req.file) {
        try {
          const filePath =
            path.join(
              videoFolder,
              req.file.filename
            );

          if (
            fs.existsSync(
              filePath
            )
          ) {
            fs.unlinkSync(
              filePath
            );
          }
        } catch (fileError) {
          console.error(
            "VIDEO CLEANUP ERROR:",
            fileError.message
          );
        }
      }

      return res.status(500).json({
        success: false,
        message:
          "Unable to update video",
        error:
          error.message,
      });
    }
  }
);

// DELETE VIDEO

app.delete(
  "/api/videos/:id",
  async (
    req,
    res
  ) => {
    try {
      const {
        id,
      } = req.params;

      const existing =
        await pool.query(
          `
          SELECT
            video_url
          FROM videos
          WHERE id = $1
          `,
          [id]
        );

      if (
        existing.rows.length ===
        0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Video not found",
        });
      }

      const videoUrl =
        existing.rows[0]
          .video_url || "";

      await pool.query(
        `
        DELETE FROM videos
        WHERE id = $1
        `,
        [id]
      );

      if (videoUrl) {
        try {
          const filename =
            path.basename(
              videoUrl
            );

          const filePath =
            path.join(
              videoFolder,
              filename
            );

          if (
            fs.existsSync(
              filePath
            )
          ) {
            fs.unlinkSync(
              filePath
            );
          }
        } catch (fileError) {
          console.error(
            "VIDEO FILE DELETE WARNING:",
            fileError.message
          );
        }
      }

      return res.json({
        success: true,
        message:
          "Video deleted successfully",
      });
    } catch (error) {
      console.error(
        "DELETE VIDEO ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to delete video",
        error:
          error.message,
      });
    }
  }
);

// ======================================================
// GENERAL IMAGE UPLOAD
// ======================================================

app.post(
  "/api/upload",
  upload.single("image"),
  (
    req,
    res
  ) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "No image uploaded",
        });
      }

      const imageUrl =
        `${req.protocol}://${req.get(
          "host"
        )}/uploads/${req.file.filename}`;

      res.json({
        success: true,
        message:
          "Image uploaded successfully",
        imageUrl,
        filename:
          req.file.filename,
      });
    } catch (error) {
      console.error(
        "UPLOAD ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Image upload failed",
      });
    }
  }
);

// ======================================================
// DELETE IMAGE
// ======================================================

app.delete(
  "/api/upload/:filename",
  (
    req,
    res
  ) => {
    try {
      const safeFilename =
        path.basename(
          req.params.filename
        );

      const filePath =
        path.join(
          uploadFolder,
          safeFilename
        );

      if (
        !fs.existsSync(
          filePath
        )
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Image not found",
        });
      }

      fs.unlinkSync(
        filePath
      );

      res.json({
        success: true,
        message:
          "Image deleted successfully",
      });
    } catch (error) {
      console.error(
        "DELETE IMAGE ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to delete image",
      });
    }
  }
);

// ======================================================
// MULTER / SERVER ERROR HANDLER
// ======================================================

app.use(
  (
    error,
    req,
    res,
    next
  ) => {
    console.error(
      "SERVER ERROR:",
      error
    );

    if (
      error instanceof
      multer.MulterError
    ) {
      return res.status(400).json({
        success: false,
        message:
          `Upload error: ${error.message}`,
      });
    }

    return res.status(400).json({
      success: false,
      message:
        error.message ||
        "Something went wrong",
    });
  }
);

// ======================================================
// START SERVER
// ======================================================

app.listen(
  PORT,
  () => {
    console.log(
      "================================="
    );

    console.log(
      "Backend server is running"
    );

    console.log(
      `http://localhost:${PORT}`
    );

    console.log(
      "================================="
    );
  }
);