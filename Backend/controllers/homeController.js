const fs = require("fs");
const path = require("path");

const homeFile = path.join(
  __dirname,
  "../data/home.json"
);

// ===============================
// GET HOME DATA
// ===============================

const getHome = (req, res) => {
  try {
    const data = JSON.parse(
      fs.readFileSync(homeFile, "utf8")
    );

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Get home error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load home information",
    });
  }
};

// ===============================
// UPDATE HOME DATA
// ===============================

const updateHome = (req, res) => {
  try {
    const oldData = JSON.parse(
      fs.readFileSync(homeFile, "utf8")
    );

    const updatedData = {
      ...oldData,
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(
      homeFile,
      JSON.stringify(updatedData, null, 2)
    );

    res.status(200).json({
      success: true,
      message: "Home information updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Update home error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update home information",
    });
  }
};

module.exports = {
  getHome,
  updateHome,
};