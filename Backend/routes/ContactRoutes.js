const express = require("express");

const router = express.Router();

const {
    getContactDetails,
    updateContactDetails
} = require("../controllers/contactcontrollers");


// Get contact details
router.get("/details", getContactDetails);


// Update contact details
router.put("/details", updateContactDetails);


module.exports = router;