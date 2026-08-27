require("dotenv").config();

const express = require("express");
const pool = require("./config/db");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();

app.set("trust proxy", true);

const PORT = process.env.PORT || 5000;

// ============================================================
// ROUTES
// ============================================================

const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/ContactRoutes");

// ============================================================
// MIDDLEWARE
// ============================================================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "20mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "20mb",
  })
);

// ============================================================
// AUTH ROUTES
// ============================================================

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

// ============================================================
// PATHS
// ============================================================

const dataFolder = path.join(__dirname, "data");

const dataFile = path.join(
  dataFolder,
  "leader.json"
);

const uploadFolder = path.join(
  __dirname,
  "uploads"
);

const uploadsFolder = uploadFolder;

const politicalCareerFolder = path.join(
  uploadFolder,
  "political_career"
);

const newsFolder = path.join(
  uploadFolder,
  "news"
);

const galleryFolder = path.join(
  uploadFolder,
  "gallery"
);

const videoFolder = path.join(
  uploadFolder,
  "videos"
);

const articleFolder = path.join(
  uploadFolder,
  "articles"
);

const homeFolder = path.join(
  uploadFolder,
  "home"
);

// ============================================================
// CREATE REQUIRED FOLDERS
// ============================================================

[
  dataFolder,
  uploadFolder,
  politicalCareerFolder,
  newsFolder,
  galleryFolder,
  videoFolder,
  articleFolder,
  homeFolder,
].forEach((folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, {
      recursive: true,
    });
  }
});

// ============================================================
// SERVE UPLOADED FILES
// ============================================================

app.use(
  "/uploads",
  express.static(uploadFolder)
);

// ============================================================
// HELPER - SAFE FILENAME
// ============================================================

const createSafeFilename = (originalName) => {
  const extension = path
    .extname(originalName || "")
    .toLowerCase();

  const originalBaseName = path.basename(
    originalName || "file",
    path.extname(originalName || "")
  );

  const baseName = originalBaseName
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "")
    .replace(/-+/g, "-")
    .replace(/_+/g, "_")
    .slice(0, 100);

  return `${Date.now()}-${baseName || "file"}${extension}`;
};

// ============================================================
// GENERIC STORAGE
// ============================================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },

  filename: (req, file, cb) => {
    cb(
      null,
      createSafeFilename(file.originalname)
    );
  },
});

// ============================================================
// GENERIC UPLOAD
// ============================================================

const upload = multer({
  storage,

  limits: {
    fileSize: 50 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

// ============================================================
// POLITICAL CAREER STORAGE
// ============================================================

const politicalCareerStorage =
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, politicalCareerFolder);
    },

    filename: (req, file, cb) => {
      cb(
        null,
        createSafeFilename(
          file.originalname
        )
      );
    },
  });

// ============================================================
// POLITICAL CAREER UPLOAD
// ============================================================

const politicalCareerUpload = multer({
  storage: politicalCareerStorage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
    ];

    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    if (
      allowedExtensions.includes(
        extension
      )
    ) {
      return cb(null, true);
    }

    cb(
      new Error(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      )
    );
  },
});

// ============================================================
// VIDEO STORAGE
// ============================================================

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videoFolder);
  },

  filename: (req, file, cb) => {
    cb(
      null,
      createSafeFilename(
        file.originalname
      )
    );
  },
});

// ============================================================
// VIDEO UPLOAD
// ============================================================

const videoUpload = multer({
  storage: videoStorage,

  limits: {
    fileSize: 200 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedExtensions = [
      ".mp4",
      ".webm",
      ".ogg",
      ".mov",
      ".m4v",
    ];

    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    if (
      allowedExtensions.includes(
        extension
      )
    ) {
      return cb(null, true);
    }

    cb(
      new Error(
        "Only MP4, WEBM, OGG, MOV and M4V videos are allowed."
      )
    );
  },
});

// ============================================================
// IMAGE STORAGE FACTORY
// ============================================================

const createImageStorage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folder);
    },

    filename: (req, file, cb) => {
      cb(
        null,
        createSafeFilename(
          file.originalname
        )
      );
    },
  });

// ============================================================
// IMAGE UPLOAD FACTORY
// ============================================================

const createImageUpload = (
  folder,
  maxSize = 10
) =>
  multer({
    storage: createImageStorage(folder),

    limits: {
      fileSize:
        maxSize * 1024 * 1024,
    },

    fileFilter: (req, file, cb) => {
      const allowedExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".gif",
      ];

      const extension = path
        .extname(file.originalname)
        .toLowerCase();

      if (
        allowedExtensions.includes(
          extension
        )
      ) {
        return cb(null, true);
      }

      cb(
        new Error(
          "Only JPG, JPEG, PNG, WEBP and GIF images are allowed."
        )
      );
    },
  });

// ============================================================
// SECTION-SPECIFIC IMAGE UPLOADS
// ============================================================

const newsUpload = createImageUpload(
  newsFolder,
  10
);

const galleryUpload =
  createImageUpload(
    galleryFolder,
    10
  );

const articleUpload =
  createImageUpload(
    articleFolder,
    10
  );

const homeUpload =
  createImageUpload(
    homeFolder,
    10
  );

// ============================================================
// DEFAULT CONTENT
// ============================================================

const getDefaultContent = () => ({
  profile: {},
  contact: {},
  social: {},
  home: {},
  about: {},
  biography: {},
  development: {},
});

// ============================================================
// READ CONTENT
// ============================================================

const readContent = () => {
  try {
    if (!fs.existsSync(dataFile)) {
      return getDefaultContent();
    }

    const data =
      fs.readFileSync(
        dataFile,
        "utf8"
      );

    if (!data.trim()) {
      return getDefaultContent();
    }

    return JSON.parse(data);
  } catch (error) {
    console.error(
      "ERROR READING CONTENT:",
      error
    );

    return getDefaultContent();
  }
};

// ============================================================
// SAVE CONTENT
// ============================================================

const saveContent = (content) => {
  fs.writeFileSync(
    dataFile,
    JSON.stringify(
      content,
      null,
      2
    ),
    "utf8"
  );
};

// ============================================================
// NORMALIZE UPLOAD PATH
// ============================================================

const normalizeUploadPath = (
  imageUrl
) => {
  if (!imageUrl) {
    return "";
  }

  let value = String(imageUrl).trim();

  if (!value) {
    return "";
  }

  // Convert complete URL into path
  value = value.replace(
    /^https?:\/\/[^/]+/i,
    ""
  );

  // Remove leading slash temporarily
  value = value.replace(/^\/+/, "");

  // Make sure uploads prefix exists
  if (!value.startsWith("uploads/")) {
    value = `uploads/${value}`;
  }

  return `/${value}`;
};

// ============================================================
// RESOLVE CONTENT URLS
// ============================================================

const resolveContentUrls = (
  value,
  req
) => {
  if (Array.isArray(value)) {
    return value.map((item) =>
      resolveContentUrls(
        item,
        req
      )
    );
  }

  if (
    value &&
    typeof value === "object"
  ) {
    return Object.fromEntries(
      Object.entries(value).map(
        ([key, item]) => [
          key,
          resolveContentUrls(
            item,
            req
          ),
        ]
      )
    );
  }

  if (
    typeof value === "string" &&
    value.startsWith("/uploads/")
  ) {
    return `${req.protocol}://${req.get(
      "host"
    )}${value}`;
  }

  return value;
};

// ============================================================
// LOCALIZED CONTENT
// ============================================================

const resolveLocalizedContent = (
  value,
  language = "en"
) => {
  if (Array.isArray(value)) {
    return value.map((item) =>
      resolveLocalizedContent(
        item,
        language
      )
    );
  }

  if (
    value &&
    typeof value === "object"
  ) {
    const keys =
      Object.keys(value);

    if (
      keys.includes("en") ||
      keys.includes("te")
    ) {
      return resolveLocalizedContent(
        value[language] ??
          value.en ??
          value.te ??
          "",
        language
      );
    }

    return Object.fromEntries(
      Object.entries(value).map(
        ([key, item]) => [
          key,
          resolveLocalizedContent(
            item,
            language
          ),
        ]
      )
    );
  }

  return value;
};

// ============================================================
// IMAGE HELPER
// ============================================================

const getUploadedImage = (
  files,
  fieldName,
  existingImage = ""
) => {
  if (
    files &&
    files[fieldName] &&
    files[fieldName][0]
  ) {
    return `/uploads/${files[fieldName][0].filename}`;
  }

  return existingImage || "";
};

// ============================================================
// DELETE FILE SAFELY
// ============================================================

const deleteFileIfExists = (
  filePath
) => {
  try {
    if (
      filePath &&
      fs.existsSync(filePath)
    ) {
      fs.unlinkSync(filePath);
      return true;
    }
  } catch (error) {
    console.error(
      "FILE DELETE ERROR:",
      error.message
    );
  }

  return false;
};

// ============================================================
// DELETE UPLOAD FROM URL
// ============================================================

const deleteUploadByUrl = (
  fileUrl
) => {
  if (!fileUrl) {
    return false;
  }

  try {
    const normalized =
      normalizeUploadPath(
        fileUrl
      );

    if (!normalized) {
      return false;
    }

    const relativePath =
      normalized.replace(
        /^\/uploads\//,
        ""
      );

    const absolutePath =
      path.join(
        uploadFolder,
        relativePath
      );

    return deleteFileIfExists(
      absolutePath
    );
  } catch (error) {
    console.error(
      "DELETE UPLOAD ERROR:",
      error.message
    );

    return false;
  }
};

// ============================================================
// GET PUBLIC IMAGE URL
// ============================================================

const getPublicUploadPath = (
  fileUrl
) => {
  return normalizeUploadPath(
    fileUrl
  );
};

// ============================================================
// ADMIN JWT AUTHENTICATION
// ============================================================

const authenticateAdmin = (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith(
        "Bearer "
      )
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
    }

    const token =
      authHeader
        .slice(7)
        .trim();

    if (
      !token ||
      !process.env.JWT_SECRET
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid authentication configuration",
      });
    }

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    if (
      !decoded ||
      decoded.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Admin access required",
      });
    }

    req.admin = decoded;

    next();
  } catch (error) {
    console.error(
      "JWT AUTH ERROR:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired token",
    });
  }
};

// ============================================================
// ADMIN LOGIN
// ============================================================

app.post(
  "/api/secure/admin/login",
  async (req, res) => {
    try {
      const username = String(
        req.body.username || ""
      ).trim();

      const password = String(
        req.body.password || ""
      );

      if (
        !username ||
        !password
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Username and password are required",
        });
      }

      const result =
        await pool.query(
          `
          SELECT
            id,
            name,
            email,
            password_hash,
            role,
            is_active
          FROM admins
          WHERE name = $1
          LIMIT 1
          `,
          [username]
        );

      if (
        result.rows.length === 0
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid username or password",
        });
      }

      const admin =
        result.rows[0];

      if (!admin.is_active) {
        return res.status(403).json({
          success: false,
          message:
            "Admin account is inactive",
        });
      }

      const passwordValid =
        await bcrypt.compare(
          password,
          admin.password_hash
        );

      if (!passwordValid) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid username or password",
        });
      }

      if (
        !process.env.JWT_SECRET
      ) {
        return res.status(500).json({
          success: false,
          message:
            "JWT_SECRET is not configured",
        });
      }

      const token =
        jwt.sign(
          {
            id: admin.id,
            name: admin.name,
            role: admin.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

      return res.status(200).json({
        success: true,
        message:
          "Login successful",

        token,

        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
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
        message:
          "Unable to login",
      });
    }
  }
);

// ============================================================
// TEST ROUTE
// ============================================================

app.get(
  "/",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Server is running successfully",
    });
  }
);

// ============================================================
// GET ALL WEBSITE CONTENT
// ============================================================

app.get(
  "/api/content",
  (req, res) => {
    try {
      const language =
        req.query.lang === "te"
          ? "te"
          : "en";

      const content =
        resolveLocalizedContent(
          readContent(),
          language
        );

      res.status(200).json(
        resolveContentUrls(
          content,
          req
        )
      );
    } catch (error) {
      console.error(
        "GET CONTENT ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to load website content",
      });
    }
  }
);

// ============================================================
// CONTACT DETAILS
// ============================================================

app.get(
  "/api/contacts/details",
  (req, res) => {
    try {
      const content =
        readContent();

      const contact =
        content.contact || {};

      const social =
        content.social || {};

      res.json({
        success: true,

        data: {
          email:
            contact.email || "",

          phone:
            contact.phone || "",

          office_address:
            contact.address || "",

          office_timings:
            contact.officeHours || "",

          facebook:
            social.facebook || "",

          instagram:
            social.instagram || "",

          twitter:
            social.twitter || "",

          youtube:
            social.youtube || "",

          linkedin:
            social.linkedin || "",
        },
      });
    } catch (error) {
      console.error(
        "GET CONTACT DETAILS ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to load contact information",
      });
    }
  }
);

// ============================================================
// UPDATE CONTACT DETAILS
// ============================================================

app.put(
  "/api/contacts/details",
  authenticateAdmin,
  (req, res) => {
    try {
      const content =
        readContent();

      if (!content.contact) {
        content.contact = {};
      }

      if (!content.social) {
        content.social = {};
      }

      content.contact.email =
        req.body.email || "";

      content.contact.phone =
        req.body.phone || "";

      content.contact.address =
        req.body.office_address ||
        "";

      content.contact.officeHours =
        req.body.office_timings ||
        "";

      content.social.facebook =
        req.body.facebook || "";

      content.social.instagram =
        req.body.instagram || "";

      content.social.twitter =
        req.body.twitter || "";

      content.social.youtube =
        req.body.youtube || "";

      content.social.linkedin =
        req.body.linkedin || "";

      saveContent(content);

      res.json({
        success: true,
        message:
          "Contact information updated successfully!",

        data: {
          email:
            content.contact.email,

          phone:
            content.contact.phone,

          office_address:
            content.contact.address,

          office_timings:
            content.contact.officeHours,

          facebook:
            content.social.facebook,

          instagram:
            content.social.instagram,

          twitter:
            content.social.twitter,

          youtube:
            content.social.youtube,

          linkedin:
            content.social.linkedin,
        },
      });
    } catch (error) {
      console.error(
        "UPDATE CONTACT ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update contact information",
      });
    }
  }
);

// ============================================================
// UPDATE HOME
// ============================================================

app.put(
  "/api/content/home",
  authenticateAdmin,

  homeUpload.fields([
    {
      name: "heroImage",
      maxCount: 1,
    },
    {
      name: "aboutImage",
      maxCount: 1,
    },
    {
      name: "development1Image",
      maxCount: 1,
    },
    {
      name: "development2Image",
      maxCount: 1,
    },
    {
      name: "development3Image",
      maxCount: 1,
    },
    {
      name: "development4Image",
      maxCount: 1,
    },
    {
      name: "galleryImage1",
      maxCount: 1,
    },
    {
      name: "galleryImage2",
      maxCount: 1,
    },
    {
      name: "galleryImage3",
      maxCount: 1,
    },
    {
      name: "galleryImage4",
      maxCount: 1,
    },
    {
      name: "galleryImage5",
      maxCount: 1,
    },
    {
      name: "newsFeaturedImage",
      maxCount: 1,
    },
    {
      name: "newsImage1",
      maxCount: 1,
    },
    {
      name: "newsImage2",
      maxCount: 1,
    },
  ]),

  (req, res) => {
    try {
      const content =
        readContent();

      if (!content.home) {
        content.home = {};
      }

      // HERO
      content.home.heroTitle =
        req.body.heroTitle || "";

      content.home.heroSubtitle =
        req.body.heroSubtitle || "";

      content.home.heroDescription =
        req.body.heroDescription || "";

      content.home.heroImage =
        getUploadedImage(
          req.files,
          "heroImage",
          content.home.heroImage
        );

      // ABOUT
      content.home.aboutHeading =
        req.body.aboutHeading || "";

      content.home.aboutDescription =
        req.body.aboutDescription || "";

      content.home.aboutImage =
        getUploadedImage(
          req.files,
          "aboutImage",
          content.home.aboutImage
        );

      // FEATURES
      content.home.features = [
        req.body.feature1 || "",
        req.body.feature2 || "",
        req.body.feature3 || "",
        req.body.feature4 || "",
      ];

      // STATS
      content.home.stats = [
        {
          number:
            req.body.stat1Number || "",
          text:
            req.body.stat1Text || "",
        },
        {
          number:
            req.body.stat2Number || "",
          text:
            req.body.stat2Text || "",
        },
      ];

      // FOCUS AREAS
      content.home.focusAreas = {
        label:
          req.body.focusLabel || "",

        heading:
          req.body.focusHeading || "",

        description:
          req.body.focusDescription ||
          "",

        items: [
          {
            title:
              req.body.focus1Title || "",
            description:
              req.body.focus1Description ||
              "",
          },
          {
            title:
              req.body.focus2Title || "",
            description:
              req.body.focus2Description ||
              "",
          },
          {
            title:
              req.body.focus3Title || "",
            description:
              req.body.focus3Description ||
              "",
          },
          {
            title:
              req.body.focus4Title || "",
            description:
              req.body.focus4Description ||
              "",
          },
        ],
      };

      // DEVELOPMENT
      const existingDevelopments =
        content.home
          .developmentHighlights
          ?.items || [];

      content.home.developmentHighlights = {
        label:
          req.body.developmentLabel ||
          "",

        heading:
          req.body.developmentHeading ||
          "",

        description:
          req.body.developmentDescription ||
          "",

        items: [
          {
            title:
              req.body.development1Title ||
              "",

            description:
              req.body.development1Description ||
              "",

            image:
              getUploadedImage(
                req.files,
                "development1Image",
                existingDevelopments[0]
                  ?.image || ""
              ),
          },

          {
            title:
              req.body.development2Title ||
              "",

            description:
              req.body.development2Description ||
              "",

            image:
              getUploadedImage(
                req.files,
                "development2Image",
                existingDevelopments[1]
                  ?.image || ""
              ),
          },

          {
            title:
              req.body.development3Title ||
              "",

            description:
              req.body.development3Description ||
              "",

            image:
              getUploadedImage(
                req.files,
                "development3Image",
                existingDevelopments[2]
                  ?.image || ""
              ),
          },

          {
            title:
              req.body.development4Title ||
              "",

            description:
              req.body.development4Description ||
              "",

            image:
              getUploadedImage(
                req.files,
                "development4Image",
                existingDevelopments[3]
                  ?.image || ""
              ),
          },
        ],
      };

      // GALLERY PREVIEW
      const existingGalleryImages =
        content.home
          .galleryPreview
          ?.images || [];

      content.home.galleryPreview = {
        label:
          req.body.galleryLabel || "",

        heading:
          req.body.galleryHeading || "",

        description:
          req.body.galleryDescription ||
          "",

        mainTitle:
          req.body.galleryMainTitle ||
          "",

        momentsNumber:
          req.body.galleryMomentsNumber ||
          "",

        momentsText:
          req.body.galleryMomentsText ||
          "",

        images: [
          getUploadedImage(
            req.files,
            "galleryImage1",
            existingGalleryImages[0] || ""
          ),

          getUploadedImage(
            req.files,
            "galleryImage2",
            existingGalleryImages[1] || ""
          ),

          getUploadedImage(
            req.files,
            "galleryImage3",
            existingGalleryImages[2] || ""
          ),

          getUploadedImage(
            req.files,
            "galleryImage4",
            existingGalleryImages[3] || ""
          ),

          getUploadedImage(
            req.files,
            "galleryImage5",
            existingGalleryImages[4] || ""
          ),
        ],
      };

      // NEWS PREVIEW
      const existingNews =
        content.home.newsPreview ||
        {};

      const existingNewsItems =
        existingNews.news || [];

      content.home.newsPreview = {
        label:
          req.body.newsLabel ||
          existingNews.label ||
          "Latest News",

        heading:
          req.body.newsHeading ||
          existingNews.heading ||
          "",

        description:
          req.body.newsDescription ||
          existingNews.description ||
          "",

        featured: {
          image:
            getUploadedImage(
              req.files,
              "newsFeaturedImage",
              existingNews.featured
                ?.image || ""
            ),

          date:
            req.body.newsFeaturedDate ||
            existingNews.featured
              ?.date ||
            "",

          title:
            req.body.newsFeaturedTitle ||
            existingNews.featured
              ?.title ||
            "",

          description:
            req.body.newsFeaturedDescription ||
            existingNews.featured
              ?.description ||
            "",
        },

        news: [
          {
            image:
              getUploadedImage(
                req.files,
                "newsImage1",
                existingNewsItems[0]
                  ?.image || ""
              ),

            date:
              req.body.news1Date ||
              existingNewsItems[0]
                ?.date ||
              "",

            title:
              req.body.news1Title ||
              existingNewsItems[0]
                ?.title ||
              "",
          },

          {
            image:
              getUploadedImage(
                req.files,
                "newsImage2",
                existingNewsItems[1]
                  ?.image || ""
              ),

            date:
              req.body.news2Date ||
              existingNewsItems[1]
                ?.date ||
              "",

            title:
              req.body.news2Title ||
              existingNewsItems[1]
                ?.title ||
              "",
          },
        ],
      };

      // CONTACT CTA
      content.home.contactCTA = {
        label:
          req.body.contactCTALabel ||
          content.home.contactCTA
            ?.label ||
          "Get In Touch",

        heading:
          req.body.contactCTAHeading ||
          content.home.contactCTA
            ?.heading ||
          "",

        description:
          req.body.contactCTADescription ||
          content.home.contactCTA
            ?.description ||
          "",

        buttonText:
          req.body.contactCTAButtonText ||
          content.home.contactCTA
            ?.buttonText ||
          "Contact Office",
      };

      saveContent(content);

      res.json({
        success: true,
        message:
          "Home content updated successfully!",
        home:
          content.home,
      });
    } catch (error) {
      console.error(
        "UPDATE HOME ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update Home content",
        error:
          error.message,
      });
    }
  }
);

// ============================================================
// UPDATE ABOUT
// ============================================================

app.put(
  "/api/content/about",
  authenticateAdmin,
  (req, res) => {
    try {
      const content =
        readContent();

      content.about = {
        ...(content.about || {}),

        aboutName:
          req.body.aboutName || "",

        aboutPosition:
          req.body.aboutPosition || "",

        aboutDescription:
          req.body.aboutDescription ||
          "",
      };

      saveContent(content);

      res.json({
        success: true,
        message:
          "About content updated successfully!",
        about:
          content.about,
      });
    } catch (error) {
      console.error(
        "UPDATE ABOUT ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update About content",
      });
    }
  }
);

// ============================================================
// UPDATE BIOGRAPHY
// ============================================================

app.put(
  "/api/content/biography",
  authenticateAdmin,
  (req, res) => {
    try {
      const content =
        readContent();

      content.biography = {
        ...(content.biography || {}),

        biographyContent:
          req.body.biographyContent ||
          "",
      };

      saveContent(content);

      res.json({
        success: true,
        message:
          "Biography updated successfully!",
        biography:
          content.biography,
      });
    } catch (error) {
      console.error(
        "UPDATE BIOGRAPHY ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update biography",
      });
    }
  }
);

// ============================================================
// UPDATE DEVELOPMENT
// ============================================================

app.put(
  "/api/content/development",
  authenticateAdmin,
  (req, res) => {
    try {
      const content =
        readContent();

      content.development = {
        ...(content.development || {}),

        title:
          req.body.developmentTitle ||
          "",

        description:
          req.body.developmentDescription ||
          "",
      };

      saveContent(content);

      res.json({
        success: true,
        message:
          "Development content updated successfully!",
        development:
          content.development,
      });
    } catch (error) {
      console.error(
        "UPDATE DEVELOPMENT ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update development content",
      });
    }
  }
);

// ============================================================
// OLD CONTACT ROUTE
// ============================================================

app.put(
  "/api/content/contact",
  authenticateAdmin,
  (req, res) => {
    try {
      const content =
        readContent();

      if (!content.contact) {
        content.contact = {};
      }

      if (!content.social) {
        content.social = {};
      }

      content.contact.email =
        req.body.email || "";

      content.contact.phone =
        req.body.phone || "";

      content.contact.address =
        req.body.address || "";

      content.contact.officeHours =
        req.body.officeHours || "";

      content.social.facebook =
        req.body.facebook || "";

      content.social.instagram =
        req.body.instagram || "";

      content.social.twitter =
        req.body.twitter || "";

      content.social.youtube =
        req.body.youtube || "";

      content.social.linkedin =
        req.body.linkedin || "";

      saveContent(content);

      res.json({
        success: true,
        message:
          "Contact information updated successfully!",
        contact:
          content.contact,
        social:
          content.social,
      });
    } catch (error) {
      console.error(
        "UPDATE CONTACT ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update contact information",
      });
    }
  }
);

// ============================================================
// POLITICAL CAREER
// ============================================================

// GET ALL POLITICAL CAREER
app.get(
  "/api/political-career",
  async (req, res) => {
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

        console.log("//////////////// from politi")
        console.log(result.rows[0].image_url)

      const data =
        result.rows.map(
          (row) => ({
            ...row,

            image_url:
              getPublicUploadPath(
                row.image_url
              ),
          })
        );

      res.json({
        success: true,
        data,
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

// ADD POLITICAL CAREER
app.post(
  "/api/political-career",
  authenticateAdmin,
  politicalCareerUpload.single(
    "image"
  ),
  async (req, res) => {
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
          `/uploads/political_career/${req.file.filename}`;
      }

      let orderValue;

      if (
        display_order !==
          undefined &&
        display_order !== ""
      ) {
        const parsed =
          Number(display_order);

        if (
          !Number.isFinite(parsed)
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Display order must be a valid number",
          });
        }

        orderValue = parsed;
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
          RETURNING *
          `,
          [
            year.trim(),
            position.trim(),
            organization.trim(),
            location.trim(),
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

        data: {
          ...result.rows[0],
          image_url:
            getPublicUploadPath(
              result.rows[0]
                .image_url
            ),
        },
      });
    } catch (error) {
      console.error(
        "ADD POLITICAL CAREER ERROR:",
        error
      );

      if (req.file) {
        deleteFileIfExists(
          path.join(
            politicalCareerFolder,
            req.file.filename
          )
        );
      }

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

// UPDATE POLITICAL CAREER
app.put(
  "/api/political-career/:id",
  authenticateAdmin,
  politicalCareerUpload.single(
    "image"
  ),
  async (req, res) => {
    try {
      const { id } =
        req.params;

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

      const oldImageUrl =
        existing.rows[0]
          .image_url || "";

      let imageUrl =
        normalizeUploadPath(
          oldImageUrl
        );

      if (req.file) {
        imageUrl =
          `/uploads/political_career/${req.file.filename}`;
      }

      let orderValue =
        existing.rows[0]
          .display_order;

      if (
        display_order !==
          undefined &&
        display_order !== ""
      ) {
        const parsed =
          Number(display_order);

        if (
          !Number.isFinite(parsed)
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Display order must be a valid number",
          });
        }

        orderValue = parsed;
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
          RETURNING *
          `,
          [
            year.trim(),
            position.trim(),
            organization.trim(),
            location.trim(),
            description || "",
            category ||
              "Political Career",
            orderValue,
            imageUrl,
            id,
          ]
        );

      if (
        req.file &&
        oldImageUrl
      ) {
        deleteUploadByUrl(
          oldImageUrl
        );
      }

      res.json({
        success: true,
        message:
          "Political career entry updated successfully",

        data: {
          ...result.rows[0],
          image_url:
            getPublicUploadPath(
              result.rows[0]
                .image_url
            ),
        },
      });
    } catch (error) {
      console.error(
        "UPDATE POLITICAL CAREER ERROR:",
        error
      );

      if (req.file) {
        deleteFileIfExists(
          path.join(
            politicalCareerFolder,
            req.file.filename
          )
        );
      }

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

// DELETE POLITICAL CAREER
app.delete(
  "/api/political-career/:id",
  authenticateAdmin,
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const existing =
        await pool.query(
          `
          SELECT image_url
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
        deleteUploadByUrl(
          imageUrl
        );
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

// ============================================================
// VIDEOS
// ============================================================

// GET ALL VIDEOS
app.get(
  "/api/videos",
  async (req, res) => {
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

      const data =
        result.rows.map(
          (row) => ({
            ...row,

            video_url:
              getPublicUploadPath(
                row.video_url
              ),

            thumbnail_url:
              row.thumbnail_url
                ? getPublicUploadPath(
                    row.thumbnail_url
                  )
                : "",
          })
        );

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      console.error(
        "GET VIDEOS ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to load videos",
        error:
          error.message,
      });
    }
  }
);

// GET VIDEO
app.get(
  "/api/videos/:id",
  async (req, res) => {
    try {
      const result =
        await pool.query(
          `
          SELECT *
          FROM videos
          WHERE id = $1
          `,
          [req.params.id]
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

      const video = {
        ...result.rows[0],

        video_url:
          getPublicUploadPath(
            result.rows[0]
              .video_url
          ),

        thumbnail_url:
          result.rows[0]
            .thumbnail_url
            ? getPublicUploadPath(
                result.rows[0]
                  .thumbnail_url
              )
            : "",
      };

      res.json({
        success: true,
        data: video,
      });
    } catch (error) {
      console.error(
        "GET VIDEO ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to load video",
      });
    }
  }
);

// ADD VIDEO
app.post(
  "/api/videos",
  authenticateAdmin,
  videoUpload.single(
    "video"
  ),
  async (req, res) => {
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
        `/uploads/videos/${req.file.filename}`;

      let orderValue;

      if (
        display_order !==
          undefined &&
        display_order !== ""
      ) {
        const parsed =
          Number(display_order);

        if (
          !Number.isFinite(parsed)
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Display order must be a valid number",
          });
        }

        orderValue = parsed;
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
          RETURNING *
          `,
          [
            title.trim(),
            description || "",
            videoUrl,
            thumbnail_url || "",
            category || "Video",
            published_date ||
              null,
            link || "",
            orderValue,
          ]
        );

      res.status(201).json({
        success: true,
        message:
          "Video added successfully",

        data: {
          ...result.rows[0],
          video_url:
            getPublicUploadPath(
              result.rows[0]
                .video_url
            ),
        },
      });
    } catch (error) {
      console.error(
        "ADD VIDEO ERROR:",
        error
      );

      if (req.file) {
        deleteFileIfExists(
          path.join(
            videoFolder,
            req.file.filename
          )
        );
      }

      res.status(500).json({
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
  authenticateAdmin,
  videoUpload.single(
    "video"
  ),
  async (req, res) => {
    try {
      const { id } =
        req.params;

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
          `/uploads/videos/${req.file.filename}`;
      }

      let orderValue =
        existing.rows[0]
          .display_order;

      if (
        display_order !==
          undefined &&
        display_order !== ""
      ) {
        const parsed =
          Number(display_order);

        if (
          !Number.isFinite(parsed)
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Display order must be a valid number",
          });
        }

        orderValue = parsed;
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
          RETURNING *
          `,
          [
            title.trim(),
            description || "",
            videoUrl,
            thumbnail_url || "",
            category || "Video",
            published_date ||
              null,
            link || "",
            orderValue,
            id,
          ]
        );

      if (
        req.file &&
        existing.rows[0]
          .video_url
      ) {
        deleteUploadByUrl(
          existing.rows[0]
            .video_url
        );
      }

      res.json({
        success: true,
        message:
          "Video updated successfully",

        data: {
          ...result.rows[0],
          video_url:
            getPublicUploadPath(
              result.rows[0]
                .video_url
            ),
        },
      });
    } catch (error) {
      console.error(
        "UPDATE VIDEO ERROR:",
        error
      );

      if (req.file) {
        deleteFileIfExists(
          path.join(
            videoFolder,
            req.file.filename
          )
        );
      }

      res.status(500).json({
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
  authenticateAdmin,
  async (req, res) => {
    try {
      const existing =
        await pool.query(
          `
          SELECT video_url
          FROM videos
          WHERE id = $1
          `,
          [req.params.id]
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
        [req.params.id]
      );

      if (videoUrl) {
        deleteUploadByUrl(
          videoUrl
        );
      }

      res.json({
        success: true,
        message:
          "Video deleted successfully",
      });
    } catch (error) {
      console.error(
        "DELETE VIDEO ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to delete video",
        error:
          error.message,
      });
    }
  }
);

// ============================================================
// ARTICLES
// ============================================================

// GET ARTICLES
app.get(
  "/api/articles",
  async (req, res) => {
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
            published_date DESC NULLS LAST,
            id DESC
        `);

      const data =
        result.rows.map(
          (row) => ({
            ...row,

            image_url:
              getPublicUploadPath(
                row.image_url
              ),
          })
        );

      res.json({
        success: true,
        data,
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

// ADD ARTICLE
app.post(
  "/api/articles",
  authenticateAdmin,
  articleUpload.single(
    "image"
  ),
  async (req, res) => {
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
            "Article title is required",
        });
      }

      const imageUrl =
        req.file
          ? `/uploads/articles/${req.file.filename}`
          : "";

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
          RETURNING *
          `,
          [
            title.trim(),
            summary || "",
            content || "",
            category || "Article",
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

        data: {
          ...result.rows[0],
          image_url:
            getPublicUploadPath(
              result.rows[0]
                .image_url
            ),
        },
      });
    } catch (error) {
      console.error(
        "CREATE ARTICLE ERROR:",
        error
      );

      if (req.file) {
        deleteFileIfExists(
          path.join(
            articleFolder,
            req.file.filename
          )
        );
      }

      res.status(500).json({
        success: false,
        message:
          "Unable to create article",
        error:
          error.message,
      });
    }
  }
);

// UPDATE ARTICLE
app.put(
  "/api/articles/:id",
  authenticateAdmin,
  articleUpload.single(
    "image"
  ),
  async (req, res) => {
    try {
      const existing =
        await pool.query(
          `
          SELECT image_url
          FROM articles
          WHERE id = $1
          `,
          [req.params.id]
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
            "Article title is required",
        });
      }

      const oldImage =
        existing.rows[0]
          .image_url || "";

      const imageUrl =
        req.file
          ? `/uploads/articles/${req.file.filename}`
          : normalizeUploadPath(
              oldImage
            );

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
          RETURNING *
          `,
          [
            title.trim(),
            summary || "",
            content || "",
            category || "Article",
            imageUrl,
            published_date ||
              null,
            link || "",
            req.params.id,
          ]
        );

      if (
        req.file &&
        oldImage
      ) {
        deleteUploadByUrl(
          oldImage
        );
      }

      res.json({
        success: true,
        message:
          "Article updated successfully",

        data: {
          ...result.rows[0],
          image_url:
            getPublicUploadPath(
              result.rows[0]
                .image_url
            ),
        },
      });
    } catch (error) {
      console.error(
        "UPDATE ARTICLE ERROR:",
        error
      );

      if (req.file) {
        deleteFileIfExists(
          path.join(
            articleFolder,
            req.file.filename
          )
        );
      }

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
  authenticateAdmin,
  async (req, res) => {
    try {
      const result =
        await pool.query(
          `
          DELETE FROM articles
          WHERE id = $1
          RETURNING image_url
          `,
          [req.params.id]
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

      const imageUrl =
        result.rows[0]
          .image_url || "";

      if (imageUrl) {
        deleteUploadByUrl(
          imageUrl
        );
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

// ============================================================
// NEWS
// ============================================================

// GET NEWS
app.get(
  "/api/news",
  async (req, res) => {
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
          console.log("////////////////")
        console.log(result.rows[0].image_url)

      const data =
        result.rows.map(
          (row) => ({
            ...row,

            image_url:
              getPublicUploadPath(
                row.image_url
              ),
          })
        );

      res.json({
        success: true,
        data,
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

// GET NEWS BY ID
app.get(
  "/api/news/:id",
  async (req, res) => {
    try {
      const result =
        await pool.query(
          `
          SELECT *
          FROM news
          WHERE id = $1
          `,
          [req.params.id]
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

      const data = {
        ...result.rows[0],

        image_url:
          getPublicUploadPath(
            result.rows[0]
              .image_url
          ),
      };

      res.json({
        success: true,
        data,
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
      });
    }
  }
);

// ADD NEWS
app.post(
  "/api/news",
  authenticateAdmin,
  newsUpload.single(
    "image"
  ),
  async (req, res) => {
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
          `/uploads/news/${req.file.filename}`;
      }

      let orderValue;

      if (
        display_order !==
          undefined &&
        display_order !== ""
      ) {
        const parsed =
          Number(display_order);

        if (
          !Number.isFinite(parsed)
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Display order must be a valid number",
          });
        }

        orderValue = parsed;
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
          RETURNING *
          `,
          [
            title.trim(),
            description || "",
            content || "",
            category || "News",
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

        data: {
          ...result.rows[0],
          image_url:
            getPublicUploadPath(
              result.rows[0]
                .image_url
            ),
        },
      });
    } catch (error) {
      console.error(
        "ADD NEWS ERROR:",
        error
      );

      if (req.file) {
        deleteFileIfExists(
          path.join(
            newsFolder,
            req.file.filename
          )
        );
      }

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
  authenticateAdmin,
  newsUpload.single(
    "image"
  ),
  async (req, res) => {
    try {
      const { id } =
        req.params;

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

      const oldImage =
        existing.rows[0]
          .image_url || "";

      let imageUrl =
        normalizeUploadPath(
          oldImage
        );

      if (req.file) {
        imageUrl =
          `/uploads/news/${req.file.filename}`;
      }

      let orderValue =
        existing.rows[0]
          .display_order;

      if (
        display_order !==
          undefined &&
        display_order !== ""
      ) {
        const parsed =
          Number(display_order);

        if (
          !Number.isFinite(parsed)
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Display order must be a valid number",
          });
        }

        orderValue = parsed;
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
          RETURNING *
          `,
          [
            title.trim(),
            description || "",
            content || "",
            category || "News",
            imageUrl,
            published_date ||
              null,
            orderValue,
            linkValue,
            id,
          ]
        );

      if (
        req.file &&
        oldImage
      ) {
        deleteUploadByUrl(
          oldImage
        );
      }

      res.json({
        success: true,
        message:
          "News updated successfully",

        data: {
          ...result.rows[0],
          image_url:
            getPublicUploadPath(
              result.rows[0]
                .image_url
            ),
        },
      });
    } catch (error) {
      console.error(
        "UPDATE NEWS ERROR:",
        error
      );

      if (req.file) {
        deleteFileIfExists(
          path.join(
            newsFolder,
            req.file.filename
          )
        );
      }

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
  authenticateAdmin,
  async (req, res) => {
    try {
      const result =
        await pool.query(
          `
          DELETE FROM news
          WHERE id = $1
          RETURNING image_url
          `,
          [req.params.id]
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

      const imageUrl =
        result.rows[0]
          .image_url || "";

      if (imageUrl) {
        deleteUploadByUrl(
          imageUrl
        );
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

// ============================================================
// GALLERY
// ============================================================

// GET GALLERY
app.get(
  "/api/gallery",
  async (req, res) => {
    try {
      const result =
        await pool.query(`
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

      const data =
        result.rows.map(
          (row) => ({
            ...row,

            image_path:
              getPublicUploadPath(
                row.image_path
              ),
          })
        );

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      console.error(
        "GET GALLERY ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to load gallery images",
        error:
          error.message,
      });
    }
  }
);

// ADD GALLERY
app.post(
  "/api/gallery",
  authenticateAdmin,
  galleryUpload.single(
    "image"
  ),
  async (req, res) => {
    try {
      const {
        title,
        caption,
        category,
      } = req.body;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "Please select an image",
        });
      }

      const allowedCategories = [
        "Public Events",
        "Constituency",
        "Meetings",
        "Events",
      ];

      const selectedCategory =
        allowedCategories.includes(
          category
        )
          ? category
          : "Public Events";

      const imageFilename =
        req.file.filename;

      const imagePath =
        `/uploads/gallery/${imageFilename}`;

      const result =
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
          ($1,$2,$3,$4,$5)
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
        success: true,
        message:
          "Gallery image uploaded successfully",

        data: {
          ...result.rows[0],
          image_path:
            getPublicUploadPath(
              result.rows[0]
                .image_path
            ),
        },
      });
    } catch (error) {
      console.error(
        "POST GALLERY ERROR:",
        error
      );

      if (req.file) {
        deleteFileIfExists(
          path.join(
            galleryFolder,
            req.file.filename
          )
        );
      }

      res.status(500).json({
        success: false,
        message:
          "Failed to upload gallery image",
        error:
          error.message,
      });
    }
  }
);

// UPDATE GALLERY
app.put(
  "/api/gallery/:id",
  authenticateAdmin,
  galleryUpload.single(
    "image"
  ),
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const {
        title,
        caption,
        category,
      } = req.body;

      const existing =
        await pool.query(
          `
          SELECT *
          FROM gallery
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
            "Gallery image not found",
        });
      }

      const oldImage =
        existing.rows[0];

      let imageFilename =
        oldImage.image_filename;

      let imagePath =
        normalizeUploadPath(
          oldImage.image_path
        );

      if (req.file) {
        imageFilename =
          req.file.filename;

        imagePath =
          `/uploads/gallery/${req.file.filename}`;
      }

      const allowedCategories = [
        "Public Events",
        "Constituency",
        "Meetings",
        "Events",
      ];

      const selectedCategory =
        allowedCategories.includes(
          category
        )
          ? category
          : oldImage.category;

      const result =
        await pool.query(
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

      if (
        req.file &&
        oldImage.image_path
      ) {
        deleteUploadByUrl(
          oldImage.image_path
        );
      }

      res.json({
        success: true,
        message:
          "Gallery image updated successfully",

        data: {
          ...result.rows[0],
          image_path:
            getPublicUploadPath(
              result.rows[0]
                .image_path
            ),
        },
      });
    } catch (error) {
      console.error(
        "UPDATE GALLERY ERROR:",
        error
      );

      if (req.file) {
        deleteFileIfExists(
          path.join(
            galleryFolder,
            req.file.filename
          )
        );
      }

      res.status(500).json({
        success: false,
        message:
          "Failed to update gallery image",
        error:
          error.message,
      });
    }
  }
);

// DELETE GALLERY
app.delete(
  "/api/gallery/:id",
  authenticateAdmin,
  async (req, res) => {
    try {
      const result =
        await pool.query(
          `
          DELETE FROM gallery
          WHERE id = $1
          RETURNING image_filename, image_path
          `,
          [req.params.id]
        );

      if (
        result.rows.length ===
        0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Gallery image not found",
        });
      }

      const imagePath =
        result.rows[0]
          .image_path;

      if (imagePath) {
        deleteUploadByUrl(
          imagePath
        );
      } else if (
        result.rows[0]
          .image_filename
      ) {
        deleteFileIfExists(
          path.join(
            galleryFolder,
            result.rows[0]
              .image_filename
          )
        );
      }

      res.json({
        success: true,
        message:
          "Gallery image deleted successfully",
      });
    } catch (error) {
      console.error(
        "DELETE GALLERY ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to delete gallery image",
        error:
          error.message,
      });
    }
  }
);

// ============================================================
// TEST ENVIRONMENT
// ============================================================

app.get(
  "/api/test-env",
  (req, res) => {
    res.json({
      success: true,

      adminAuthentication:
        "PostgreSQL admins table",

      jwtSecretConfigured:
        Boolean(
          process.env.JWT_SECRET
        ),

      databaseConfigured:
        Boolean(
          process.env.DB_HOST &&
            process.env.DB_NAME &&
            process.env.DB_USER &&
            process.env.DB_PASSWORD
        ),

      serverPort:
        Number(PORT),
    });
  }
);

// ============================================================
// 404 API HANDLER
// ============================================================

app.use(
  (req, res) => {
    res.status(404).json({
      success: false,
      message:
        "API endpoint not found",
      path: req.originalUrl,
    });
  }
);

// ============================================================
// MULTER / GLOBAL ERROR HANDLER
// ============================================================

app.use(
  (
    error,
    req,
    res,
    next
  ) => {
    console.error(
      "GLOBAL ERROR:",
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

    if (
      error &&
      error.message
    ) {
      return res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }

    res.status(500).json({
      success: false,
      message:
        "Internal server error",
    });
  }
);

// ============================================================
// START SERVER
// ============================================================

app.listen(
  PORT,
  () => {
    console.log(
      "========================================"
    );

    console.log(
      `Server running on port ${PORT}`
    );

    console.log(
      `http://localhost:${PORT}`
    );

    console.log(
      "========================================"
    );

    console.log(
      "Admin authentication:",
      "PostgreSQL admins table"
    );

    console.log(
      "Database configured:",
      process.env.DB_HOST &&
        process.env.DB_NAME
        ? "YES"
        : "NO"
    );

    console.log(
      "JWT_SECRET configured:",
      process.env.JWT_SECRET
        ? "YES"
        : "NO"
    );

    console.log(
      "Upload folder:",
      uploadFolder
    );

    console.log(
      "Political Career folder:",
      politicalCareerFolder
    );

    console.log(
      "News folder:",
      newsFolder
    );

    console.log(
      "Gallery folder:",
      galleryFolder
    );

    console.log(
      "Video folder:",
      videoFolder
    );

    console.log(
      "Article folder:",
      articleFolder
    );

    console.log(
      "Home folder:",
      homeFolder
    );

    console.log(
      "========================================"
    );
  }
);