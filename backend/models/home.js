const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
  {
    eyebrow: {
      type: String,
      default: "",
    },

    name: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    electionYear: {
      type: String,
      default: "",
    },

    constituency: {
      type: String,
      default: "",
    },

    publicServiceYears: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    buttonOneText: {
      type: String,
      default: "Explore Journey",
    },

    buttonTwoText: {
      type: String,
      default: "Development Works",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Home", homeSchema);