const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// =====================================================
// REGEX
// =====================================================

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const mobileRegex = /^[0-9]{10}$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;


// =====================================================
// REGISTER USER
// =====================================================

const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      name,
      email,
      mobile,
      password,
      confirmPassword,
      role,
      license,
    } = req.body;

    // -----------------------------------------------
    // REQUIRED FIELDS
    // -----------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // -----------------------------------------------
    // CLEAN DATA
    // -----------------------------------------------

    const cleanEmail = email.toLowerCase().trim();

    const cleanFirstName = firstName
      ? firstName.trim()
      : "";

    const cleanLastName = lastName
      ? lastName.trim()
      : "";

    const cleanName =
      name && name.trim()
        ? name.trim()
        : `${cleanFirstName} ${cleanLastName}`.trim();

    const cleanMobile = mobile
      ? mobile.toString().trim()
      : "";

    // -----------------------------------------------
    // EMAIL VALIDATION
    // -----------------------------------------------

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    // -----------------------------------------------
    // MOBILE VALIDATION
    // -----------------------------------------------

    if (cleanMobile && !mobileRegex.test(cleanMobile)) {
      return res.status(400).json({
        message: "Mobile number must contain exactly 10 digits",
      });
    }

    // -----------------------------------------------
    // PASSWORD VALIDATION
    // -----------------------------------------------

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
      });
    }

    // -----------------------------------------------
    // CONFIRM PASSWORD
    // -----------------------------------------------

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // -----------------------------------------------
    // CHECK EXISTING USER
    // -----------------------------------------------

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email is already registered",
      });
    }

    // -----------------------------------------------
    // HASH PASSWORD
    // -----------------------------------------------

    const hashedPassword = await bcrypt.hash(password, 10);

    // -----------------------------------------------
    // CREATE USER
    // -----------------------------------------------

    const user = await User.create({
      name: cleanName,
      firstName: cleanFirstName,
      lastName: cleanLastName,
      email: cleanEmail,
      mobile: cleanMobile,
      password: hashedPassword,
      role: role || "Renter",
      license: license || "",
    });

    // -----------------------------------------------
    // RESPONSE
    // -----------------------------------------------

    return res.status(201).json({
      message: "Registration successful",

      user: {
        id: user._id,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        license: user.license,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// =====================================================
// LOGIN USER
// =====================================================

const loginUser = async (req, res) => {
  try {
    const {
      email,
      password,
      role,
      rememberDevice,
    } = req.body;

    // -----------------------------------------------
    // REQUIRED FIELDS
    // -----------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // -----------------------------------------------
    // CLEAN EMAIL
    // -----------------------------------------------

    const cleanEmail = email.toLowerCase().trim();

    // -----------------------------------------------
    // EMAIL VALIDATION
    // -----------------------------------------------

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    // -----------------------------------------------
    // FIND USER
    // -----------------------------------------------

    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // -----------------------------------------------
    // ROLE CHECK
    // -----------------------------------------------

    if (role === "renter" && user.role !== "Renter") {
      return res.status(403).json({
        message: "This account is not registered as a Renter",
      });
    }

    if (
      role === "owner" &&
      user.role !== "Vehicle Partner"
    ) {
      return res.status(403).json({
        message:
          "This account is not registered as a Vehicle Owner",
      });
    }

    if (role === "admin") {
      return res.status(403).json({
        message:
          "Platform Admin login is not enabled for this account",
      });
    }

    // -----------------------------------------------
    // CHECK PASSWORD
    // -----------------------------------------------

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // -----------------------------------------------
    // CREATE JWT TOKEN
    // -----------------------------------------------

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: rememberDevice
          ? "30d"
          : "1d",
      }
    );

    // -----------------------------------------------
    // LOGIN RESPONSE
    // IMPORTANT: id is included
    // -----------------------------------------------

    return res.status(200).json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        license: user.license,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// =====================================================
// GET PROFILE
// NO MIDDLEWARE
// =====================================================

const getProfile = async (req, res) => {
  try {
    // Get user ID from URL query
    const { userId } = req.query;

    console.log("PROFILE USER ID:", userId);

    // -----------------------------------------------
    // CHECK USER ID
    // -----------------------------------------------

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    // -----------------------------------------------
    // FIND USER
    // -----------------------------------------------

    const user = await User.findById(userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // -----------------------------------------------
    // RETURN PROFILE
    // -----------------------------------------------

    return res.status(200).json({
      message: "Profile fetched successfully",

      user: {
        id: user._id,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        license: user.license,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("PROFILE ERROR:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};