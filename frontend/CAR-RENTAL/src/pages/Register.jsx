import React, { useState } from "react";

import {
  UserRound,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Car,
  Wallet,
  CheckCircle2,
  Apple,
  ArrowRight,
  RotateCcw,
  Smartphone,
  FileCheck2,
} from "lucide-react";

import "../style/Register.css";

function Register() {
  // ==============================
  // ACCOUNT MODE
  // ==============================

  const [mode, setMode] = useState("rental");

  // ==============================
  // PASSWORD VISIBILITY
  // ==============================

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ==============================
  // FORM DATA
  // ==============================

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    license: "",
    password: "",
    confirmPassword: "",
  });

  // ==============================
  // CHECKBOXES
  // ==============================

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [telemetry, setTelemetry] = useState(true);

  // ==============================
  // PASSWORD STRENGTH
  // ==============================

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "AWAITING ENTRY",
    percentage: 0,
  });

  // ==============================
  // PASSWORD STRENGTH CALCULATOR
  // ==============================

  const calculatePasswordStrength = (password) => {
    if (!password) {
      return {
        score: 0,
        label: "AWAITING ENTRY",
        percentage: 0,
      };
    }

    let score = 0;

    // 8+ characters
    if (password.length >= 8) {
      score++;
    }

    // Number
    if (/\d/.test(password)) {
      score++;
    }

    // Special character
    if (/[^A-Za-z0-9]/.test(password)) {
      score++;
    }

    // 12+ characters
    if (password.length >= 12) {
      score++;
    }

    const strength = {
      0: {
        label: "VERY WEAK",
        percentage: 10,
      },

      1: {
        label: "WEAK",
        percentage: 25,
      },

      2: {
        label: "MEDIUM",
        percentage: 50,
      },

      3: {
        label: "STRONG",
        percentage: 75,
      },

      4: {
        label: "VERY STRONG",
        percentage: 100,
      },
    };

    return {
      score,
      ...strength[score],
    };
  };

  // ==============================
  // HANDLE INPUT
  // ==============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update password strength
    if (name === "password") {
      const result = calculatePasswordStrength(value);

      setPasswordStrength(result);
    }
  };

  // ==============================
  // HANDLE REGISTER
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ==============================
    // FRONTEND VALIDATION
    // ==============================

    if (!formData.firstName.trim()) {
      alert("Please enter your first name.");
      return;
    }

    if (!formData.lastName.trim()) {
      alert("Please enter your last name.");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please enter your email.");
      return;
    }

    // Email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!formData.mobile.trim()) {
      alert("Please enter your mobile number.");
      return;
    }

    // Mobile validation
    const mobileRegex = /^[0-9]{10}$/;

    const cleanMobile =
      formData.mobile.replace(/\s+/g, "");

    if (!mobileRegex.test(cleanMobile)) {
      alert("Mobile number must contain exactly 10 digits.");
      return;
    }

    if (!formData.license.trim()) {
      alert("Please enter your driving license number.");
      return;
    }

    if (!formData.password) {
      alert("Please create a password.");
      return;
    }

    if (formData.password.length < 8) {
      alert(
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (!formData.confirmPassword) {
      alert("Please confirm your password.");
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      alert(
        "Please agree to the Terms of Service."
      );
      return;
    }

    // ==============================
    // ROLE
    // ==============================

    const selectedRole =
      mode === "rental"
        ? "Renter"
        : "Vehicle Partner";

    // ==============================
    // SEND TO BACKEND
    // ==============================

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            firstName:
              formData.firstName.trim(),

            lastName:
              formData.lastName.trim(),

            email:
              formData.email
                .trim()
                .toLowerCase(),

            mobile: cleanMobile,

            license:
              formData.license.trim(),

            password:
              formData.password,

            // Backend uses this only
            // for password confirmation.
            // It will NOT be stored.
            confirmPassword:
              formData.confirmPassword,

            role: selectedRole,

            telemetry: telemetry,
          }),
        }
      );

      const data = await response.json();

      // ==============================
      // BACKEND ERROR
      // ==============================

      if (!response.ok) {
        alert(
          data.message ||
            "Registration failed."
        );

        return;
      }

      // ==============================
      // SAVE USER
      // ==============================

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      // ==============================
      // NOTIFY NAVBAR
      // ==============================

      window.dispatchEvent(
        new Event("userLoggedIn")
      );

      // ==============================
      // SUCCESS
      // ==============================

      alert(
        "VelocityDrive account created successfully!"
      );

      // ==============================
      // GO TO LOGIN
      // ==============================

      window.location.href = "/login";

    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      alert(
        "Unable to connect to server. Please make sure the backend is running on port 5000."
      );
    }
  };

  // ==============================
  // PASSWORD BAR COLOR
  // ==============================

  const getStrengthColor = () => {
    switch (passwordStrength.score) {
      case 1:
        return "#ff5c5c";

      case 2:
        return "#f5b942";

      case 3:
        return "#4f9cff";

      case 4:
        return "#25d99b";

      default:
        return "#2865e9";
    }
  };

  // ==============================
  // RETURN
  // ==============================

  return (
    <div className="register-page">

      <div className="register-shell">

        {/* ==================================================
            LEFT SIDE
        ================================================== */}

        <section className="register-left">

          {/* Protocol Label */}

          <div className="protocol-label">

            <span className="protocol-dot"></span>

            VELOCITY PROTOCOL ONBOARDING

            <small>
              V4.8.2
            </small>

          </div>

          {/* Heading */}

          <h1>
            High-Performance
            <span>
              Mobility Engine.
            </span>
          </h1>

          <p className="intro-text">
            Connect directly to an elite
            decentralized vehicle network
            across Bangalore, Mumbai,
            Delhi-NCR, and Hyderabad.
            Zero lag, algorithmic pricing,
            zero physical keys.
          </p>

          {/* ==================================================
              WELCOME CARD
          ================================================== */}

          <div className="welcome-card">

            <div className="welcome-top">

              <span>

                <span className="green-symbol">
                  ◉
                </span>

                RENTER WELCOME TELEMETRY

              </span>

              <span>
                TIER-1 PASS
              </span>

            </div>

            <h3>
              Instant ₹1,000 Trip Credits
            </h3>

            <p>
              Credit directly to your cloud
              wallet immediately following
              DigiLocker driver credential
              verification.
            </p>

          </div>

          {/* ==================================================
              FEATURE 1
          ================================================== */}

          <div className="feature-card">

            <div className="feature-icon blue">
              <Smartphone size={17} />
            </div>

            <div>

              <h3>
                Instant Keyless Remote Entry
              </h3>

              <p>
                Unlock calibrated performance
                sports sedans and dual-motor
                electric SUVs securely via
                encrypted Bluetooth Low Energy
                beacons.
              </p>

            </div>

          </div>

          {/* ==================================================
              FEATURE 2
          ================================================== */}

          <div className="feature-card">

            <div className="feature-icon green">
              <ShieldCheck size={17} />
            </div>

            <div>

              <h3>
                ₹0 Deductible Roadside Shield
              </h3>

              <p>
                Complete comprehensive roadside
                care 24/7, autonomous emergency
                incident dispatch units within
                28 metro-zone.
              </p>

            </div>

          </div>

          {/* ==================================================
              FEATURE 3
          ================================================== */}

          <div className="feature-card">

            <div className="feature-icon orange">
              <Wallet size={17} />
            </div>

            <div>

              <h3>
                Vehicle Partners: Up to
                ₹1,75,000+/mo
              </h3>

              <p>
                Turn your luxury EV or assets
                into consistent daily yields
                with automated telemetry trip
                logging and weekly NFT settlements.
              </p>

            </div>

          </div>

          {/* ==================================================
              RATING
          ================================================== */}

          <div className="rating-card">

            <div className="rating-avatars">

              <span>
                VD
              </span>

              <span>
                U
              </span>

              <span>
                +
              </span>

            </div>

            <div className="rating-main">

              <div className="rating-title">

                <strong>
                  4.9
                </strong>

                <span className="stars">
                  ★★★★★
                </span>

                <small>
                  (14, 880+ Drivers)
                </small>

              </div>

              <p>
                Verified active pilots
                across India
              </p>

            </div>

            <div className="growth">
              +23.8% MoM Growth
            </div>

          </div>

        </section>

        {/* ==================================================
            RIGHT SIDE
        ================================================== */}

        <section className="register-right">

          <div className="form-card">

            <div className="telemetry-label">
              ACCOUNT TELEMETRY CLASS
            </div>

            {/* ==================================================
                RENTAL / PARTNER
            ================================================== */}

            <div className="account-tabs">

              <button
                type="button"
                className={
                  mode === "rental"
                    ? "account-tab active"
                    : "account-tab"
                }
                onClick={() =>
                  setMode("rental")
                }
              >

                <Car size={13} />

                <span>
                  Rent a Vehicle
                </span>

                <small>
                  Renter
                </small>

              </button>

              <button
                type="button"
                className={
                  mode === "partner"
                    ? "account-tab active"
                    : "account-tab"
                }
                onClick={() =>
                  setMode("partner")
                }
              >

                <Wallet size={13} />

                <span>
                  List Your Vehicles
                </span>

                <small>
                  0% Fee
                </small>

              </button>

            </div>

            {/* ==================================================
                SOCIAL LOGIN
            ================================================== */}

            <div className="social-login">

              <button type="button">
                <span className="google-icon">
                  G
                </span>

                Continue with Google
              </button>

              <button type="button">

                <Apple size={14} />

                Continue with Apple

              </button>

            </div>

            {/* ==================================================
                DIVIDER
            ================================================== */}

            <div className="form-divider">

              <span></span>

              <p>
                OR REGISTER WITH PROTOCOL ID
              </p>

              <span></span>

            </div>

            {/* ==================================================
                FORM
            ================================================== */}

            <form onSubmit={handleSubmit}>

              {/* ==================================================
                  FIRST + LAST NAME
              ================================================== */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    FIRST NAME
                    <span>*</span>
                  </label>

                  <div className="input-container">

                    <UserRound size={13} />

                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Dev"
                    />

                  </div>

                </div>

                <div className="form-group">

                  <label>
                    LAST NAME
                    <span>*</span>
                  </label>

                  <div className="input-container">

                    <UserRound size={13} />

                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Sharma"
                    />

                  </div>

                </div>

              </div>

              {/* ==================================================
                  EMAIL
              ================================================== */}

              <div className="form-group">

                <label>
                  WORK OR PERSONAL EMAIL
                  <span>*</span>
                </label>

                <div className="input-container">

                  <Mail size={13} />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="dev.sharma@domain.in"
                  />

                </div>

              </div>

              {/* ==================================================
                  MOBILE
              ================================================== */}

              <div className="form-group">

                <label>
                  MOBILE DISPATCH CONTACT
                  <span>*</span>
                </label>

                <div className="phone-input">

                  <div className="country-code">
                    🇮🇳 +91
                  </div>

                  <div className="input-container phone-field">

                    <Phone size={13} />

                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="98765 43210"
                    />

                  </div>

                </div>

              </div>

              {/* ==================================================
                  LICENSE
              ================================================== */}

              <div className="form-group">

                <div className="label-with-badge">

                  <label>
                    DRIVING LICENSE
                    {" "}
                    (OR AADHAAR NUM)
                  </label>

                  <span className="kyc-badge">

                    <CheckCircle2 size={10} />

                    Instant DigiLocker KYC

                  </span>

                </div>

                <div className="license-input">

                  <div className="input-container">

                    <FileCheck2 size={13} />

                    <input
                      type="text"
                      name="license"
                      value={formData.license}
                      onChange={handleChange}
                      placeholder="DL-1420110012345 or 12-Digit UIDAI"
                    />

                  </div>

                  <button
                    type="button"
                    className="verify-button"
                    onClick={() =>
                      alert(
                        "Verification started"
                      )
                    }
                  >
                    Verify
                  </button>

                </div>

                <p className="field-hint">
                  Accelerates physical vehicle
                  unlock authorization by skipping
                  kiosk queues.
                </p>

              </div>

              {/* ==================================================
                  PASSWORD + CONFIRM PASSWORD
              ================================================== */}

              <div className="form-row">

                {/* PASSWORD */}

                <div className="form-group">

                  <label>
                    SECURITY PASSWORD
                    <span>*</span>
                  </label>

                  <div className="input-container">

                    <Lock size={13} />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••••"
                    />

                    <button
                      type="button"
                      className="eye-button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >

                      {showPassword ? (
                        <EyeOff size={14} />
                      ) : (
                        <Eye size={14} />
                      )}

                    </button>

                  </div>

                </div>

                {/* CONFIRM PASSWORD */}

                <div className="form-group">

                  <label>
                    CONFIRM PASSWORD
                    <span>*</span>
                  </label>

                  <div className="input-container">

                    <RotateCcw size={13} />

                    <input
                      type={
                        showConfirm
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      value={
                        formData.confirmPassword
                      }
                      onChange={handleChange}
                      placeholder="••••••••••"
                    />

                    <button
                      type="button"
                      className="eye-button"
                      onClick={() =>
                        setShowConfirm(
                          !showConfirm
                        )
                      }
                    >

                      {showConfirm ? (
                        <EyeOff size={14} />
                      ) : (
                        <Eye size={14} />
                      )}

                    </button>

                  </div>

                </div>

              </div>

              {/* ==================================================
                  PASSWORD STRENGTH
              ================================================== */}

              <div className="password-strength">

                <div className="strength-header">

                  <span>
                    CRYPTOGRAPHIC INTEGRITY:
                  </span>

                  <span
                    className={`strength-label strength-${passwordStrength.score}`}
                  >
                    {passwordStrength.label}
                  </span>

                </div>

                <div className="strength-bar">

                  <span
                    style={{
                      width: `${passwordStrength.percentage}%`,
                      backgroundColor:
                        getStrengthColor(),
                    }}
                  ></span>

                </div>

                <div className="strength-rules">

                  <span
                    className={
                      formData.password.length >= 8
                        ? "rule-valid"
                        : ""
                    }
                  >
                    • 8+ chars
                  </span>

                  <span
                    className={
                      /\d/.test(
                        formData.password
                      )
                        ? "rule-valid"
                        : ""
                    }
                  >
                    • 1 number
                  </span>

                  <span
                    className={
                      /[^A-Za-z0-9]/.test(
                        formData.password
                      )
                        ? "rule-valid"
                        : ""
                    }
                  >
                    • 1 symbol
                  </span>

                </div>

              </div>

              {/* ==================================================
                  TERMS
              ================================================== */}

              <label className="checkbox-row">

                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) =>
                    setAgreeTerms(
                      e.target.checked
                    )
                  }
                />

                <span>
                  I agree to the Terms of Service,
                  Rental Charter Policies, and
                  Automated Privacy Protocol.
                </span>

              </label>

              {/* ==================================================
                  TELEMETRY
              ================================================== */}

              <label className="checkbox-row">

                <input
                  type="checkbox"
                  checked={telemetry}
                  onChange={(e) =>
                    setTelemetry(
                      e.target.checked
                    )
                  }
                />

                <span>
                  Receive live trip dispatch
                  telemetry, PIN access keys,
                  and booking receipts via
                  WhatsApp & SMS.
                </span>

              </label>

              {/* ==================================================
                  SUBMIT
              ================================================== */}

              <button
                type="submit"
                className="create-account-button"
              >

                <span>
                  Create VelocityDrive Account
                </span>

                <ArrowRight size={16} />

              </button>

            </form>

            {/* ==================================================
                SIGN IN
            ================================================== */}

            <div className="signin-footer">

              Already verified driver or host?

              <button
                type="button"
                onClick={() =>
                  (window.location.href =
                    "/login")
                }
              >

                Sign In here

                <ArrowRight size={13} />

              </button>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default Register;