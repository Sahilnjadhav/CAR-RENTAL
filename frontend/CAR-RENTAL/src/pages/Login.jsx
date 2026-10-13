import React, { useState } from "react";

import {
  ShieldCheck,
  LockKeyhole,
  Eye,
  EyeOff,
  UserRound,
  Building2,
  KeyRound,
  Smartphone,
  Zap,
  Shield,
  Car,
  MapPin,
  ArrowRight,
  Radio,
} from "lucide-react";

import "../style/Login.css";

function Login() {
  const [selectedRole, setSelectedRole] =
    useState("renter");

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberDevice, setRememberDevice] =
    useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  // =========================================
  // HANDLE INPUT
  // =========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
  };

  // =========================================
  // LOGIN
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    // -----------------------------------------
    // FRONTEND VALIDATION
    // -----------------------------------------

    if (!formData.email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    if (!formData.password) {
      setMessage("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      // -----------------------------------------
      // BACKEND LOGIN API
      // -----------------------------------------

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: formData.email
              .trim()
              .toLowerCase(),

            password: formData.password,

            role: selectedRole,

            rememberDevice: rememberDevice,
          }),
        }
      );

      const data = await response.json();

      console.log(
        "LOGIN BACKEND RESPONSE:",
        data
      );

      // -----------------------------------------
      // BACKEND ERROR
      // -----------------------------------------

      if (!response.ok) {
        setMessage(
          data.message ||
            "Invalid email or password."
        );

        return;
      }

      // -----------------------------------------
      // CHECK TOKEN
      // -----------------------------------------

      if (!data.token) {
        setMessage(
          "Login failed. Token was not received."
        );

        return;
      }

      // -----------------------------------------
      // CHECK USER
      // -----------------------------------------

      if (!data.user) {
        setMessage(
          "Login failed. User information was not received."
        );

        return;
      }

      // -----------------------------------------
      // CLEAR OLD LOGIN DATA
      // -----------------------------------------

      // Clear any old persistent login data
localStorage.removeItem("token");
localStorage.removeItem("user");

// Always keep the login session only for this tab
sessionStorage.setItem("token", data.token);
sessionStorage.setItem("user", JSON.stringify(data.user));

window.dispatchEvent(new Event("userLoggedIn"));

      // -----------------------------------------
      // SAVE LOGIN INFORMATION
      // -----------------------------------------

      if (rememberDevice) {
        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      } else {
        sessionStorage.setItem(
          "token",
          data.token
        );

        sessionStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      // -----------------------------------------
      // UPDATE NAVBAR
      // -----------------------------------------

      window.dispatchEvent(
        new Event("userLoggedIn")
      );

      // -----------------------------------------
      // SUCCESS MESSAGE
      // -----------------------------------------

      setMessage("Login successful.");

      // -----------------------------------------
      // REDIRECT HOME
      // -----------------------------------------

      setTimeout(() => {
        window.location.href = "/";
      }, 700);

    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      setMessage(
        "Unable to connect to the server. Please make sure your backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // ROLE DATA
  // =========================================

  const roles = [
    {
      id: "renter",
      title: "Renter",
      subtitle: "Luxury Vehicle Access",
      icon: UserRound,
    },
    {
      id: "owner",
      title: "Vehicle Owner",
      subtitle: "Manage & $ Payouts",
      icon: Building2,
    },
    {
      id: "admin",
      title: "Platform Admin",
      subtitle: "Ops & KYC Audits",
      icon: KeyRound,
    },
  ];

  // =========================================
  // GO TO REGISTER
  // =========================================

  const handleRegister = () => {
    window.location.href = "/register";
  };

  return (
    <div className="login-page">

      {/* =========================================
          TOP STATUS BAR
      ========================================= */}

      <div className="top-status">

        <div className="cluster-status">

          <span className="status-live-dot"></span>

          <span>
            AUTH CLUSTER NODE // BLR-01
          </span>

          <span className="status-separator">
            |
          </span>

          <span>
            LATENCY 14ms (OPTIMAL)
          </span>

        </div>

        <div className="security-status">

          <ShieldCheck size={11} />

          ISO 27001 & SOC-2 TYPE II ENFORCED

        </div>

      </div>

      {/* =========================================
          MAIN LOGIN SHELL
      ========================================= */}

      <main className="login-shell">

        {/* =======================================
            LEFT TELEMETRY PANEL
        ======================================= */}

        <section className="telemetry-panel">

          <div className="telemetry-content">

            <div className="console-label">
              TELEMETRY CONSOLE
            </div>

            <h1>
              Obsidian Access Node
            </h1>

            <p className="telemetry-description">
              Connect directly into high-precision
              vehicle telemetry, digital
              micro-reservations, and instant
              smart-key distribution across India.
            </p>

            {/* VEHICLE IMAGE */}

            <div className="vehicle-image">

              <div className="vehicle-image-overlay">

                <div className="nfc-label">

                  <Radio size={11} />

                  NFC SMART ENGINE LINK

                </div>

                <div className="ready-label">
                  READY
                </div>

              </div>

            </div>

            {/* TELEMETRY CARDS */}

            <div className="telemetry-cards">

              <div className="telemetry-card">

                <div className="telemetry-icon blue">
                  <Shield size={14} />
                </div>

                <div>
                  <strong>
                    End-to-End JWT 256-bit Encrypted
                  </strong>

                  <span>
                    Zero-trust cryptographic
                    handshakes on all vehicle
                    command signals.
                  </span>
                </div>

              </div>

              <div className="telemetry-card">

                <div className="telemetry-icon green">
                  <Smartphone size={14} />
                </div>

                <div>
                  <strong>
                    Instant Smart Key Mobile Unlock
                  </strong>

                  <span>
                    Sub-50ms BLE door authorization
                    and immobilizer bypass.
                  </span>
                </div>

              </div>

              <div className="telemetry-card">

                <div className="telemetry-icon orange">
                  <ShieldCheck size={14} />
                </div>

                <div>
                  <strong>
                    24/7 Roadside Telemetry Linked
                  </strong>

                  <span>
                    Continuous crash detection,
                    battery health monitors, and
                    rapid dispatch.
                  </span>
                </div>

              </div>

            </div>

            {/* REVENUE */}

            <div className="revenue-row">

              <span>
                VEHICLE REVENUE DISBURSED
              </span>

              <strong>
                ₹6,82,48,000+ MTD
              </strong>

            </div>

          </div>

        </section>

        {/* =======================================
            RIGHT LOGIN PANEL
        ======================================= */}

        <section className="login-panel">

          <div className="login-content">

            {/* HEADER */}

            <div className="login-header">

              <div>

                <span className="secure-label">
                  SECURE PORTAL
                </span>

                <h2>
                  Sign In
                </h2>

              </div>

              <div className="passkey-badge">

                <LockKeyhole size={11} />

                TLS 1.3 PASSKEY READY

              </div>

            </div>

            {/* ===================================
                ROLE SELECTOR
            =================================== */}

            <div className="field-section">

              <label className="field-title">
                SELECT OPERATIONAL ROLE
              </label>

              <div className="role-selector">

                {roles.map((role) => {

                  const Icon = role.icon;

                  return (
                    <button
                      key={role.id}
                      type="button"
                      className={
                        selectedRole === role.id
                          ? "role-option active"
                          : "role-option"
                      }
                      onClick={() =>
                        setSelectedRole(
                          role.id
                        )
                      }
                    >

                      <Icon size={13} />

                      <div>

                        <strong>
                          {role.title}
                        </strong>

                        <span>
                          {role.subtitle}
                        </span>

                      </div>

                    </button>
                  );

                })}

              </div>

            </div>

            {/* ===================================
                LOGIN FORM
            =================================== */}

            <form
              className="login-form"
              onSubmit={handleSubmit}
            >

              {/* EMAIL */}

              <div className="form-group">

                <label>
                  EMAIL ADDRESS
                </label>

                <div className="login-input">

                  <MailIcon />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex.morgan@velocitydrive.com"
                    autoComplete="email"
                  />

                </div>

              </div>

              {/* PASSWORD */}

              <div className="form-group">

                <div className="password-label-row">

                  <label>
                    PASSWORD / MASTER PASSKEY
                  </label>

                  <button
                    type="button"
                    className="forgot-button"
                    onClick={() =>
                      alert(
                        "Password reset system coming soon."
                      )
                    }
                  >
                    Forgot Password / Reset PIN?
                  </button>

                </div>

                <div className="login-input">

                  <LockKeyhole size={14} />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
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

              {/* REMEMBER */}

              <div className="login-options">

                <label className="remember-option">

                  <input
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) =>
                      setRememberDevice(
                        e.target.checked
                      )
                    }
                  />

                  <span>
                    Remember device for 30 days
                  </span>

                </label>

                <span className="hardware-bound">
                  ◯ HARDWARE BOUND
                </span>

              </div>

              {/* MESSAGE */}

              {message && (
                <div
                  className={
                    message
                      .toLowerCase()
                      .includes("successful")
                      ? "login-message success"
                      : "login-message error"
                  }
                >
                  {message}
                </div>
              )}

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="signin-button"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="spinner"></span>

                    Authenticating...
                  </>
                ) : (
                  <>
                    <span>
                      Sign In to VelocityDrive
                    </span>

                    <ArrowRight size={16} />
                  </>
                )}

              </button>

            </form>

            {/* ===================================
                DIVIDER
            =================================== */}

            <div className="continue-divider">

              <span></span>

              <small>
                OR CONTINUE WITH
              </small>

              <span></span>

            </div>

            {/* ===================================
                SOCIAL LOGIN
            =================================== */}

            <div className="social-buttons">

              <button
                type="button"
                onClick={() =>
                  alert(
                    "Google authentication coming soon."
                  )
                }
              >

                <span className="google-letter">
                  G
                </span>

                Google

              </button>

              <button
                type="button"
                onClick={() =>
                  alert(
                    "Apple authentication coming soon."
                  )
                }
              >

                <span className="apple-symbol">
                  
                </span>

                Apple ID

              </button>

              <button
                type="button"
                onClick={() =>
                  alert(
                    "Corporate SSO coming soon."
                  )
                }
              >

                <Building2 size={12} />

                Corp SSO

              </button>

            </div>

          </div>

          {/* =====================================
              REGISTER FOOTER
          ===================================== */}

          <div className="register-footer">

            <span>
              New to VelocityDrive?
            </span>

            <button
              type="button"
              onClick={handleRegister}
            >
              Create an Account / Register as
              Host or Renter →
            </button>

          </div>

        </section>

      </main>

      {/* =========================================
          BOTTOM STATUS BAR
      ========================================= */}

      <div className="bottom-status">

        <div className="bottom-status-item">

          <Car size={12} />

          <span>
            VEHICLE TELEMETRY:
          </span>

          <strong>
            4,120 CARS ONLINE
          </strong>

        </div>

        <div className="bottom-status-item green">

          <Zap size={12} />

          <span>
            SMART DEPOSIT HOLD:
          </span>

          <strong>
            ₹0 IMMEDIATE
          </strong>

        </div>

        <div className="bottom-status-item orange">

          <ShieldCheck size={12} />

          <span>
            KYC VERIFICATION:
          </span>

          <strong>
            &lt; 90 SECONDS
          </strong>

        </div>

        <div className="bottom-status-item">

          <MapPin size={12} />

          <strong>
            28 AIRPORT HUBS INDIA
          </strong>

        </div>

      </div>

    </div>
  );
}

// =========================================
// MAIL ICON
// =========================================

function MailIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />

      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export default Login;