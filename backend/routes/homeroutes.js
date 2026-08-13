const express = require("express");

const {
  getHome,
  updateHome,
} = require("../controllers/homeController");

const router = express.Router();

// Get public home information
router.get("/", getHome);

// Update home information
router.put("/", updateHome);

module.exports = router;