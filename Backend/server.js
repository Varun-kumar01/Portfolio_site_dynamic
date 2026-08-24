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
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/ContactRoutes");
// =====================================
// MIDDLEWARE
// =====================================

app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

app.use(
  express.urlencoded({
    extended: true,
  })
);
// =====================================
// ADMIN JWT AUTHENTICATION
// =====================================

const authenticateAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    req.admin = decoded;

    next();

  } catch (error) {
    console.error("JWT AUTH ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};


// =====================================
// PATHS
// =====================================

const dataFolder = path.join(
  __dirname,
  "data"
);

const dataFile = path.join(
  dataFolder,
  "leader.json"
);

const uploadsFolder = path.join(
  __dirname,
  "uploads"
);

// const dataFolder = path.join(
//   __dirname,
//   "data"
// );

const uploadFolder = path.join(
  __dirname,
  "uploads"
);

const videoFolder = path.join(
  uploadFolder,
  "videos"
);

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


// =====================================
// CREATE REQUIRED FOLDERS
// =====================================

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder, {
    recursive: true,
  });
}

if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder, {
    recursive: true,
  });
}


// =====================================
// SERVE UPLOADED IMAGES
// =====================================

app.use(
  "/uploads",
  express.static(uploadsFolder)
);


// =====================================
// MULTER CONFIGURATION
// =====================================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(
      null,
      uploadsFolder
    );
  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(
      null,
      uniqueName
    );

  },

});


const upload = multer({
  storage: storage,
});


// =====================================
// READ CONTENT
// =====================================

const readContent = () => {

  try {

    if (!fs.existsSync(dataFile)) {

      return {
        profile: {},
        contact: {},
        social: {},
        home: {},
      };

    }

    const data = fs.readFileSync(
      dataFile,
      "utf8"
    );

    return JSON.parse(data);

  } catch (error) {

    console.error(
      "Error reading content:",
      error
    );

    return {
      profile: {},
      contact: {},
      social: {},
      home: {},
    };

  }

};


// =====================================
// SAVE CONTENT
// =====================================

const saveContent = (
  content
) => {

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


const resolveContentUrls = (value, req) => {
  if (Array.isArray(value)) {
    return value.map((item) =>
      resolveContentUrls(item, req)
    );
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        resolveContentUrls(item, req),
      ])
    );
  }

  if (
    typeof value === "string" &&
    value.startsWith("/uploads/")
  ) {
    return `${req.protocol}://${req.get("host")}${value}`;
  }

  return value;
};


// =====================================
// HELPER FUNCTION
// =====================================

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

  return existingImage;

};
// =====================================
// ADMIN LOGIN
// =====================================

app.post("/api/secure/admin/login", async (req, res) => {
  try {
    console.log("========== ADMIN LOGIN REQUEST ==========");

    const username = String(
      req.body.username || ""
    ).trim();

    const password = String(
      req.body.password || ""
    );

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Find admin in PostgreSQL
    const result = await pool.query(
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

    if (result.rows.length === 0) {
      console.log("LOGIN FAILED: Admin not found");

      return res.status(401).json({
        success: false,
        message: "Invalid username",
      });
    }

    const admin = result.rows[0];

    // Check whether account is active
    if (!admin.is_active) {
      return res.status(403).json({
        success: false,
        message: "Admin account is inactive",
      });
    }

    // Compare entered password with bcrypt hash
    const passwordValid = await bcrypt.compare(
      password,
      admin.password_hash
    );

    if (!passwordValid) {
      console.log("LOGIN FAILED: Invalid password");

      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Make sure JWT secret exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing");

      return res.status(500).json({
        success: false,
        message: "JWT_SECRET is not configured",
      });
    }

    // Create JWT
    const token = jwt.sign(
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

    console.log("LOGIN SUCCESSFUL");

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to login",
    });
  }
});
// =====================================
// TEST ROUTE
// =====================================

app.get(
  "/",
  (req, res) => {

    res.json({
      message:
        "Server is running successfully",
    });

  }
);


// =====================================
// GET ALL WEBSITE CONTENT
// =====================================

app.get(
  "/api/content",
  (req, res) => {

    try {

      const content =
        readContent();

      res.status(200).json(
        resolveContentUrls(content, req)
      );

    } catch (error) {

      console.error(
        "Error getting content:",
        error
      );

      res.status(500).json({
        message:
          "Failed to load website content",
      });

    }

  }
);


// =====================================
// GET CONTACT DETAILS
// =====================================

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

      res.status(200).json({

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
        "Error getting contact details:",
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


// =====================================
// UPDATE CONTACT DETAILS
// =====================================

app.put(
  "/api/contacts/details",
  authenticateAdmin,
  (req, res) => {

    try {

      const content =
        readContent();


      // Create objects if they don't exist

      if (!content.contact) {
        content.contact = {};
      }

      if (!content.social) {
        content.social = {};
      }


      // =====================================
      // UPDATE CONTACT
      // =====================================

      content.contact.email =
        req.body.email || "";

      content.contact.phone =
        req.body.phone || "";

      content.contact.address =
        req.body.office_address || "";

      content.contact.officeHours =
        req.body.office_timings || "";


      // =====================================
      // UPDATE SOCIAL MEDIA
      // =====================================

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


      // =====================================
      // SAVE CONTENT
      // =====================================

      saveContent(
        content
      );


      // =====================================
      // SEND RESPONSE
      // =====================================

      res.status(200).json({

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
        "Error updating contact details:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Failed to update contact information",

        error:
          error.message,

      });

    }

  }
);


// =====================================
// UPDATE HOME PAGE
// =====================================

app.put(

  "/api/content/home",
  authenticateAdmin,

  upload.fields([

    { name: "heroImage", maxCount: 1 },

    { name: "aboutImage", maxCount: 1 },

    { name: "development1Image", maxCount: 1 },

    { name: "development2Image", maxCount: 1 },

    { name: "development3Image", maxCount: 1 },

    { name: "development4Image", maxCount: 1 },

    { name: "galleryImage1", maxCount: 1 },

    { name: "galleryImage2", maxCount: 1 },

    { name: "galleryImage3", maxCount: 1 },

    { name: "galleryImage4", maxCount: 1 },

    { name: "galleryImage5", maxCount: 1 },

    { name: "newsFeaturedImage", maxCount: 1 },

    { name: "newsImage1", maxCount: 1 },

    { name: "newsImage2", maxCount: 1 },

  ]),

  (req, res) => {

    try {

      const content =
        readContent();

      if (!content.home) {
        content.home = {};
      }


      // =====================================
      // HERO
      // =====================================

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


      // =====================================
      // ABOUT
      // =====================================

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


      // =====================================
      // FEATURES
      // =====================================

      content.home.features = [

        req.body.feature1 || "",

        req.body.feature2 || "",

        req.body.feature3 || "",

        req.body.feature4 || "",

      ];


      // =====================================
      // STATISTICS
      // =====================================

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


      // =====================================
      // FOCUS AREAS
      // =====================================

      content.home.focusAreas = {

        label:
          req.body.focusLabel || "",

        heading:
          req.body.focusHeading || "",

        description:
          req.body.focusDescription || "",

        items: [

          {
            title:
              req.body.focus1Title || "",

            description:
              req.body.focus1Description || "",
          },

          {
            title:
              req.body.focus2Title || "",

            description:
              req.body.focus2Description || "",
          },

          {
            title:
              req.body.focus3Title || "",

            description:
              req.body.focus3Description || "",
          },

          {
            title:
              req.body.focus4Title || "",

            description:
              req.body.focus4Description || "",
          },

        ],

      };


      // =====================================
      // DEVELOPMENT HIGHLIGHTS
      // =====================================

      const existingDevelopments =
        content.home.developmentHighlights
          ?.items || [];


      content.home.developmentHighlights = {

        label:
          req.body.developmentLabel || "",

        heading:
          req.body.developmentHeading || "",

        description:
          req.body.developmentDescription || "",

        items: [

          {
            title:
              req.body.development1Title || "",

            description:
              req.body.development1Description || "",

            image:
              getUploadedImage(
                req.files,
                "development1Image",
                existingDevelopments[0]?.image || ""
              ),
          },

          {
            title:
              req.body.development2Title || "",

            description:
              req.body.development2Description || "",

            image:
              getUploadedImage(
                req.files,
                "development2Image",
                existingDevelopments[1]?.image || ""
              ),
          },

          {
            title:
              req.body.development3Title || "",

            description:
              req.body.development3Description || "",

            image:
              getUploadedImage(
                req.files,
                "development3Image",
                existingDevelopments[2]?.image || ""
              ),
          },

          {
            title:
              req.body.development4Title || "",

            description:
              req.body.development4Description || "",

            image:
              getUploadedImage(
                req.files,
                "development4Image",
                existingDevelopments[3]?.image || ""
              ),
          },

        ],

      };


      // =====================================
      // GALLERY PREVIEW
      // =====================================

      const existingGalleryImages =
        content.home.galleryPreview
          ?.images || [];


      content.home.galleryPreview = {

        label:
          req.body.galleryLabel || "",

        heading:
          req.body.galleryHeading || "",

        description:
          req.body.galleryDescription || "",

        mainTitle:
          req.body.galleryMainTitle || "",

        momentsNumber:
          req.body.galleryMomentsNumber || "",

        momentsText:
          req.body.galleryMomentsText || "",

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


      // =====================================
      // NEWS PREVIEW
      // =====================================

      const existingNews =
        content.home.newsPreview || {};

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
              existingNews.featured?.image || ""
            ),

          date:
            req.body.newsFeaturedDate ||
            existingNews.featured?.date ||
            "",

          title:
            req.body.newsFeaturedTitle ||
            existingNews.featured?.title ||
            "",

          description:
            req.body.newsFeaturedDescription ||
            existingNews.featured?.description ||
            "",

        },

        news: [

          {

            image:
              getUploadedImage(
                req.files,
                "newsImage1",
                existingNewsItems[0]?.image || ""
              ),

            date:
              req.body.news1Date ||
              existingNewsItems[0]?.date ||
              "",

            title:
              req.body.news1Title ||
              existingNewsItems[0]?.title ||
              "",

          },

          {

            image:
              getUploadedImage(
                req.files,
                "newsImage2",
                existingNewsItems[1]?.image || ""
              ),

            date:
              req.body.news2Date ||
              existingNewsItems[1]?.date ||
              "",

            title:
              req.body.news2Title ||
              existingNewsItems[1]?.title ||
              "",

          },

        ],

      };


      // =====================================
      // CONTACT CTA
      // =====================================

      content.home.contactCTA = {

        label:
          req.body.contactCTALabel ||
          content.home.contactCTA?.label ||
          "Get In Touch",

        heading:
          req.body.contactCTAHeading ||
          content.home.contactCTA?.heading ||
          "",

        description:
          req.body.contactCTADescription ||
          content.home.contactCTA?.description ||
          "",

        buttonText:
          req.body.contactCTAButtonText ||
          content.home.contactCTA?.buttonText ||
          "Contact Office",

      };


      // =====================================
      // SAVE
      // =====================================

      saveContent(
        content
      );


      res.status(200).json({

        message:
          "Home content updated successfully!",

        home:
          content.home,

      });

    } catch (error) {

      console.error(
        "Error updating Home content:",
        error
      );

      res.status(500).json({

        message:
          "Failed to update Home content",

        error:
          error.message,

      });

    }

  }

);


// =====================================
// UPDATE ABOUT CONTENT
// =====================================

app.put(
  "/api/content/about",
  authenticateAdmin,
  (req, res) => {
    try {
      const content = readContent();

      content.about = {
        ...(content.about || {}),
        aboutName: req.body.aboutName || "",
        aboutPosition: req.body.aboutPosition || "",
        aboutDescription: req.body.aboutDescription || "",
      };

      saveContent(content);

      res.status(200).json({
        success: true,
        message: "About content updated successfully!",
        about: content.about,
      });
    } catch (error) {
      console.error("Error updating About content:", error);

      res.status(500).json({
        success: false,
        message: "Failed to update About content",
      });
    }
  }
);


// =====================================
// UPDATE BIOGRAPHY CONTENT
// =====================================

app.put(
  "/api/content/biography",
  authenticateAdmin,
  (req, res) => {
    try {
      const content = readContent();

      content.biography = {
        ...(content.biography || {}),
        biographyContent: req.body.biographyContent || "",
      };

      saveContent(content);

      res.status(200).json({
        success: true,
        message: "Biography updated successfully!",
        biography: content.biography,
      });
    } catch (error) {
      console.error("Error updating biography:", error);

      res.status(500).json({
        success: false,
        message: "Failed to update biography",
      });
    }
  }
);


// =====================================
// UPDATE DEVELOPMENT CONTENT
// =====================================

app.put(
  "/api/content/development",
  authenticateAdmin,
  (req, res) => {
    try {
      const content = readContent();

      content.development = {
        ...(content.development || {}),
        title: req.body.developmentTitle || "",
        description: req.body.developmentDescription || "",
      };

      saveContent(content);

      res.status(200).json({
        success: true,
        message: "Development content updated successfully!",
        development: content.development,
      });
    } catch (error) {
      console.error("Error updating development content:", error);

      res.status(500).json({
        success: false,
        message: "Failed to update development content",
      });
    }
  }
);


// =====================================
// OLD CONTACT UPDATE ROUTE
// KEPT FOR COMPATIBILITY
// =====================================

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

      saveContent(
        content
      );

      res.status(200).json({

        message:
          "Contact information updated successfully!",

        contact:
          content.contact,

        social:
          content.social,

      });

    } catch (error) {

      console.error(
        "Error updating contact:",
        error
      );

      res.status(500).json({

        message:
          "Failed to update contact information",

        error:
          error.message,

      });

    }

  }
);


//secure/admin political_journey
app.get(
  "/api/political-career",
  async (
    req,
    res
  ) => {
    try {
      console.log("triggered ////////////")
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
          console.log("\\\\\\\\\\")
        console.log("GET POLITICAL CAREER RESULT:");
        console.log(result);
      res.json({
        success: true,
        data:
          result.rows,
      });
    } catch (error) {
      console.error(
        "GET POLITICAL CAREER ERROR 12334434:",
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

app.post(
  "/api/political-career",
  authenticateAdmin,
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

app.put(
  "/api/political-career/:id",
  authenticateAdmin,
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


//Gallery---Videos

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

app.post(
  "/api/videos",
  authenticateAdmin,
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

app.put(
  "/api/videos/:id",
  authenticateAdmin,
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

app.delete(
  "/api/videos/:id",
  authenticateAdmin,
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
// =====================================
// ARTICLES API
// =====================================

app.get(
  "/api/articles",
  async (req, res) => {
    try {
      const result = await pool.query(`
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
        ORDER BY published_date DESC NULLS LAST, id DESC
      `);

      res.json({
        success: true,
        data: result.rows,
      });
    } catch (error) {
      console.error("GET ARTICLES ERROR:", error);

      res.status(500).json({
        success: false,
        message: "Unable to load articles",
      });
    }
  }
);

app.post(
  "/api/articles",
  authenticateAdmin,
  upload.single("image"),
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

      if (!title || !title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Article title is required",
        });
      }

      const imageUrl = req.file
        ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        : "";

      const result = await pool.query(
        `
        INSERT INTO articles
          (title, summary, content, category, image_url, published_date, link)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `,
        [
          title.trim(),
          summary || "",
          content || "",
          category || "Article",
          imageUrl,
          published_date || null,
          link || "",
        ]
      );

      res.status(201).json({
        success: true,
        message: "Article added successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("CREATE ARTICLE ERROR:", error);

      res.status(500).json({
        success: false,
        message: "Unable to create article",
      });
    }
  }
);

app.put(
  "/api/articles/:id",
  authenticateAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const existing = await pool.query(
        "SELECT image_url FROM articles WHERE id = $1",
        [req.params.id]
      );

      if (existing.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Article not found",
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

      if (!title || !title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Article title is required",
        });
      }

      const imageUrl = req.file
        ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        : existing.rows[0].image_url || "";

      const result = await pool.query(
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
          published_date || null,
          link || "",
          req.params.id,
        ]
      );

      res.json({
        success: true,
        message: "Article updated successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("UPDATE ARTICLE ERROR:", error);

      res.status(500).json({
        success: false,
        message: "Unable to update article",
      });
    }
  }
);

app.delete(
  "/api/articles/:id",
  authenticateAdmin,
  async (req, res) => {
    try {
      const result = await pool.query(
        "DELETE FROM articles WHERE id = $1 RETURNING id",
        [req.params.id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Article not found",
        });
      }

      res.json({
        success: true,
        message: "Article deleted successfully",
      });
    } catch (error) {
      console.error("DELETE ARTICLE ERROR:", error);

      res.status(500).json({
        success: false,
        message: "Unable to delete article",
      });
    }
  }
);

//NEW API
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
app.post(
  "/api/news",
  authenticateAdmin,
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
app.put(
  "/api/news/:id",
  authenticateAdmin,
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
app.delete(
  "/api/news/:id",
  authenticateAdmin,
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
//gallery
// =====================================
// GALLERY
// =====================================

// GET ALL GALLERY IMAGES
app.get("/api/gallery", async (req, res) => {
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

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("GET GALLERY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load gallery images",
      error: error.message,
    });
  }
});


// ADD NEW GALLERY IMAGE
app.post(
  "/api/gallery",
  authenticateAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, caption, category } = req.body;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please select an image",
        });
      }

      const imageFilename = req.file.filename;

      const imagePath =
        `${req.protocol}://${req.get("host")}/uploads/${imageFilename}`;

      const allowedCategories = [
        "Public Events",
        "Constituency",
        "Meetings",
        "Events",
      ];

      const selectedCategory =
        allowedCategories.includes(category)
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
        VALUES ($1,$2,$3,$4,$5)
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
        message: "Gallery image uploaded successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("POST GALLERY ERROR:", error);

      if (req.file) {
        try {
          const filePath = path.join(
            uploadFolder,
            req.file.filename
          );

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (fileError) {
          console.error(
            "IMAGE CLEANUP ERROR:",
            fileError.message
          );
        }
      }

      res.status(500).json({
        success: false,
        message: "Failed to upload gallery image",
        error: error.message,
      });
    }
  }
);


// UPDATE GALLERY IMAGE
app.put(
  "/api/gallery/:id",
  authenticateAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, caption, category } = req.body;

      const existing = await pool.query(
        `
        SELECT *
        FROM gallery
        WHERE id = $1
        `,
        [id]
      );

      if (existing.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Gallery image not found",
        });
      }

      const oldImage = existing.rows[0];

      let imageFilename =
        oldImage.image_filename;

      let imagePath =
        oldImage.image_path;

      if (req.file) {
        imageFilename =
          req.file.filename;

        imagePath =
          `${req.protocol}://${req.get("host")}/uploads/${imageFilename}`;
      }

      const allowedCategories = [
        "Public Events",
        "Constituency",
        "Meetings",
        "Events",
      ];

      const selectedCategory =
        allowedCategories.includes(category)
          ? category
          : oldImage.category;

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

      if (req.file && oldImage.image_filename) {
        try {
          const oldFilePath = path.join(
            uploadFolder,
            oldImage.image_filename
          );

          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        } catch (fileError) {
          console.error(
            "OLD IMAGE DELETE WARNING:",
            fileError.message
          );
        }
      }

      res.status(200).json({
        success: true,
        message: "Gallery image updated successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("UPDATE GALLERY ERROR:", error);

      if (req.file) {
        try {
          const newFilePath = path.join(
            uploadFolder,
            req.file.filename
          );

          if (fs.existsSync(newFilePath)) {
            fs.unlinkSync(newFilePath);
          }
        } catch (fileError) {
          console.error(
            "NEW IMAGE CLEANUP ERROR:",
            fileError.message
          );
        }
      }

      res.status(500).json({
        success: false,
        message: "Failed to update gallery image",
        error: error.message,
      });
    }
  }
);


// DELETE GALLERY IMAGE
app.delete(
  "/api/gallery/:id",
  authenticateAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      const existing = await pool.query(
        `
        SELECT *
        FROM gallery
        WHERE id = $1
        `,
        [id]
      );

      if (existing.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Gallery image not found",
        });
      }

      const image = existing.rows[0];

      await pool.query(
        `
        DELETE FROM gallery
        WHERE id = $1
        `,
        [id]
      );

      if (image.image_filename) {
        try {
          const imageFilePath = path.join(
            uploadFolder,
            image.image_filename
          );

          if (fs.existsSync(imageFilePath)) {
            fs.unlinkSync(imageFilePath);
          }
        } catch (fileError) {
          console.error(
            "IMAGE DELETE WARNING:",
            fileError.message
          );
        }
      }

      res.status(200).json({
        success: true,
        message: "Gallery image deleted successfully",
      });
    } catch (error) {
      console.error("DELETE GALLERY ERROR:", error);

      res.status(500).json({
        success: false,
        message: "Failed to delete gallery image",
        error: error.message,
      });
    }
  }
);
// =====================================
// TEST ENVIRONMENT
// =====================================

app.get("/api/test-env", (req, res) => {
  res.json({
    success: true,
    adminAuthentication: "PostgreSQL admins table",
    jwtSecretConfigured:
      !!process.env.JWT_SECRET,

    dbHost:
      process.env.DB_HOST || "NOT FOUND",

    dbName:
      process.env.DB_NAME || "NOT FOUND",
  });
});

// =====================================
// START SERVER
// =====================================

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );

  console.log(
    "Admin authentication: PostgreSQL admins table"
  );

  console.log(
    "Database configured:",
    process.env.DB_HOST && process.env.DB_NAME ? "YES" : "NO"
  );

  console.log(
    "JWT_SECRET configured:",
    process.env.JWT_SECRET ? "YES" : "NO"
  );
});