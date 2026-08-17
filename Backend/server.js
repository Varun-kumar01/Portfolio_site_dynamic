const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 5000;


// =====================================
// MIDDLEWARE
// =====================================

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


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

    return `http://localhost:${PORT}/uploads/${files[fieldName][0].filename}`;

  }

  return existingImage;

};


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
        content
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
// OLD CONTACT UPDATE ROUTE
// KEPT FOR COMPATIBILITY
// =====================================

app.put(
  "/api/content/contact",
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


// =====================================
// START SERVER
// =====================================

app.listen(
  PORT,
  () => {

    console.log(
      `Server running on http://localhost:${PORT}`
    );

  }
);