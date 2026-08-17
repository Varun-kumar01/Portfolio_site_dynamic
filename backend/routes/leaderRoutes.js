const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Path to frontend/src/data/leader.js
const leaderFilePath = path.join(
  __dirname,
  "../../src/data/leader.js"
);

// Update leader data
router.put("/", (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        message: "Image URL is required",
      });
    }

    const fileContent = fs.readFileSync(leaderFilePath, "utf8");

    const updatedContent = fileContent.replace(
      /image:\s*["'`](.*?)["'`]/,
      `image: "${image}"`
    );

    fs.writeFileSync(
      leaderFilePath,
      updatedContent,
      "utf8"
    );

    res.json({
      success: true,
      message: "Leader image updated successfully",
      image,
    });

  } catch (error) {
    console.error("Error updating leader:", error);

    res.status(500).json({
      message: "Failed to update leader data",
    });
  }
});

module.exports = router;