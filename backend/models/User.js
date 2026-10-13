const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // =========================
    // PERSONAL INFORMATION
    // =========================

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    // Full name used by Navbar/Profile
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // =========================
    // CONTACT INFORMATION
    // =========================

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // =========================
    // KYC / LICENSE
    // =========================

    license: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // =========================
    // PASSWORD
    // =========================

    password: {
      type: String,
      required: true,
    },

    // =========================
    // ACCOUNT TYPE
    // =========================

    role: {
      type: String,
      enum: ["Renter", "Vehicle Partner"],
      default: "Renter",
    },

    // =========================
    // TELEMETRY / NOTIFICATION
    // =========================

    telemetry: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);