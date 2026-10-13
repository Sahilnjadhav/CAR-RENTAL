import React, { useEffect, useState } from "react";

import {
  MapPin,
  CalendarDays,
  ShieldCheck,
  Pencil,
  Share2,
  ArrowRightLeft,
  Car,
  Star,
  Shield,
  WalletCards,
  UserRound,
  FileCheck2,
  Wallet,
  Fingerprint,
  Smartphone,
  ArrowDownToLine,
  ArrowUpFromLine,
  RefreshCw,
  Zap,
  Clock3,
  Navigation,
  Radio,
  Settings2,
  RotateCcw,
  ExternalLink,
} from "lucide-react";

import "../style/Profile.css";


// =====================================================
// API
// =====================================================

const API_URL = "http://localhost:5000";


// =====================================================
// PROFILE COMPONENT
// =====================================================

function Profile() {

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [activeTab, setActiveTab] =
    useState("overview");

  const [autoReload, setAutoReload] =
    useState(false);

  const [bookingMessage, setBookingMessage] =
    useState("");


  // ===================================================
  // FETCH PROFILE
  // ===================================================

  const fetchProfile = async () => {

    try {

      setLoading(true);
      setError("");

      // -----------------------------------------------
      // GET SAVED USER
      // -----------------------------------------------

      const savedUser = sessionStorage.getItem("user");

      if (!savedUser) {
        window.location.replace("/login");
        return;
      }

      if (!savedUser) {

        setError(
          "Please login first."
        );

        setLoading(false);

        return;
      }


      // -----------------------------------------------
      // PARSE USER
      // -----------------------------------------------

      let userData;

      try {

        userData = JSON.parse(savedUser);

      } catch (parseError) {

        console.error(
          "USER JSON ERROR:",
          parseError
        );

        setError(
          "Invalid saved user data. Please login again."
        );

        setLoading(false);

        return;
      }


      // -----------------------------------------------
      // GET USER ID
      // -----------------------------------------------

      const userId = userData?.id;


      console.log(
        "FRONTEND USER ID:",
        userId
      );


      if (!userId) {

        setError(
          "User ID not found. Please logout and login again."
        );

        setLoading(false);

        return;
      }


      // -----------------------------------------------
      // CALL PROFILE API
      // -----------------------------------------------

      const response = await fetch(
        `${API_URL}/api/auth/profile?userId=${encodeURIComponent(
          userId
        )}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      const data =
        await response.json();


      console.log(
        "PROFILE RESPONSE:",
        data
      );


      // -----------------------------------------------
      // API ERROR
      // -----------------------------------------------

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Unable to load profile"
        );
      }


      // -----------------------------------------------
      // SAVE PROFILE
      // -----------------------------------------------

      setProfile(data.user);


      // -----------------------------------------------
      // UPDATE STORED USER
      // -----------------------------------------------

      // Update user information for this tab only
      const updatedUser = {
        ...userData,
        ...data.user,
      };

      sessionStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

    } catch (error) {

      console.error(
        "PROFILE FETCH ERROR:",
        error
      );

      setError(
        error.message ||
        "Unable to load profile"
      );

    } finally {

      setLoading(false);
    }
  };


  // ===================================================
  // LOAD PROFILE
  // ===================================================

  useEffect(() => {

    fetchProfile();


    const handleLogin = () => {
      fetchProfile();
    };


    window.addEventListener(
      "userLoggedIn",
      handleLogin
    );


    return () => {

      window.removeEventListener(
        "userLoggedIn",
        handleLogin
      );

    };

  }, []);


  // ===================================================
  // SHOW MESSAGE
  // ===================================================

  const showMessage = (message) => {

    setBookingMessage(message);

    setTimeout(() => {
      setBookingMessage("");
    }, 3000);

  };


  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {

    return (
      <div className="profile-page">

        <div className="profile-loading">

          <RefreshCw
            size={42}
            className="loading-spin"
          />

          <h2>
            Loading Profile...
          </h2>

          <p>
            Please wait while we load your account.
          </p>

        </div>

      </div>
    );
  }


  // ===================================================
  // ERROR
  // ===================================================

  if (error) {

    return (
      <div className="profile-page">

        <div className="profile-error">

          <Shield
            size={48}
          />

          <h2>
            Unable to Load Profile
          </h2>

          <p>
            {error}
          </p>

          <button
            className="retry-button"
            onClick={fetchProfile}
          >
            <RefreshCw size={18} />
            Try Again
          </button>

        </div>

      </div>
    );
  }


  // ===================================================
  // PROFILE DATA
  // ===================================================

  const fullName =
    profile?.name ||
    `${profile?.firstName || ""} ${profile?.lastName || ""
      }`.trim() ||
    "User";


  const initials =
    fullName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(
        (word) =>
          word.charAt(0).toUpperCase()
      )
      .join("") || "U";


  const email =
    profile?.email || "Not available";


  const mobile =
    profile?.mobile || "Not available";


  const license =
    profile?.license || "Not added";


  const role =
    profile?.role || "Renter";


  // ===================================================
  // ACTIONS
  // ===================================================

  const handleEdit = () => {

    showMessage(
      "Profile editing will be available soon."
    );

  };


  const handleShare = async () => {

    try {

      if (
        navigator.share
      ) {

        await navigator.share({
          title: "My Sphere Profile",
          text: `Check out ${fullName}'s Sphere profile.`,
        });

      } else {

        showMessage(
          "Profile link copied."
        );

      }

    } catch (error) {

      console.log(
        "Share cancelled"
      );

    }

  };


  const handleSwitchHost = () => {

    showMessage(
      "Host mode switching will be available soon."
    );

  };


  // ===================================================
  // JSX
  // ===================================================

  return (

    <div className="profile-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="profile-header">

        <div className="profile-header-glow glow-one" />
        <div className="profile-header-glow glow-two" />

        <div className="profile-header-inner">

          <div className="profile-main">

            {/* AVATAR */}

            <div className="profile-avatar-wrap">

              <div className="profile-avatar">

                {initials}

              </div>

              <span className="avatar-status" />

            </div>


            {/* PROFILE INFO */}

            <div className="profile-info">

              <div className="profile-name-row">

                <h1>
                  {fullName}
                </h1>

                <span className="tier-badge">
                  <Zap size={14} />
                  Premium
                </span>

                <span className="kyc-badge">
                  <ShieldCheck size={15} />
                  Verified
                </span>

              </div>


              <div className="profile-meta">

                <span>
                  <UserRound size={17} />
                  {role}
                </span>

                <span>
                  <MapPin size={17} />
                  India
                </span>

                <span>
                  <CalendarDays size={17} />
                  Member
                </span>

                <span className="online-status">
                  <span />
                  Online
                </span>

              </div>

            </div>


            {/* ACTIONS */}

            <div className="profile-actions">

              <div className="top-actions">

                <button
                  className="profile-action-btn"
                  onClick={handleEdit}
                >
                  <Pencil size={18} />
                  Edit
                </button>

                <button
                  className="profile-action-btn"
                  onClick={handleShare}
                >
                  <Share2 size={18} />
                  Share
                </button>

                <button
                  className="host-btn"
                  onClick={handleSwitchHost}
                >
                  <ArrowRightLeft size={18} />
                  Switch to Host
                </button>

              </div>

            </div>

          </div>


          {/* STATS */}

          <div className="profile-stats">

            <div className="stat-card">

              <div className="stat-icon">
                <Car size={24} />
              </div>

              <div className="stat-content">

                <span>
                  Trips
                </span>

                <strong>
                  12
                </strong>

              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon">
                <Star size={24} />
              </div>

              <div className="stat-content">

                <span>
                  Rating
                </span>

                <strong>
                  4.9
                </strong>

              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon">
                <ShieldCheck size={24} />
              </div>

              <div className="stat-content">

                <span>
                  Verification
                </span>

                <strong>
                  100%
                </strong>

              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon">
                <WalletCards size={24} />
              </div>

              <div className="stat-content">

                <span>
                  Wallet
                </span>

                <strong>
                  ₹8,450
                </strong>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          TABS
      ================================================= */}

      <div className="account-tabs">

        <div className="account-tabs-inner">

          <button
            className={
              activeTab === "overview"
                ? "account-tab active"
                : "account-tab"
            }
            onClick={() =>
              setActiveTab("overview")
            }
          >
            <UserRound size={18} />
            Overview
          </button>


          <button
            className={
              activeTab === "bookings"
                ? "account-tab active"
                : "account-tab"
            }
            onClick={() =>
              setActiveTab("bookings")
            }
          >
            <Car size={18} />
            Bookings
          </button>


          <button
            className={
              activeTab === "wallet"
                ? "account-tab active"
                : "account-tab"
            }
            onClick={() =>
              setActiveTab("wallet")
            }
          >
            <Wallet size={18} />
            Wallet
          </button>


          <button
            className={
              activeTab === "security"
                ? "account-tab active"
                : "account-tab"
            }
            onClick={() =>
              setActiveTab("security")
            }
          >
            <Shield size={18} />
            Security
          </button>

        </div>

      </div>


      {/* =================================================
          CONTENT
      ================================================= */}

      <main className="account-content">

        {/* =================================================
            OVERVIEW
        ================================================= */}

        {activeTab === "overview" && (

          <div className="account-grid">

            {/* LEFT */}

            <div className="account-left">

              <div className="dashboard-card personal-card">

                <div className="card-heading">

                  <div>

                    <span className="card-kicker">
                      ACCOUNT
                    </span>

                    <h2>
                      Personal Information
                    </h2>

                  </div>

                  <button
                    className="update-button"
                    onClick={handleEdit}
                  >
                    <Pencil size={17} />
                    Update
                  </button>

                </div>


                <div className="personal-grid">

                  <div className="personal-item">

                    <div className="item-title-row">
                      <UserRound size={18} />
                      <span>
                        Full Name
                      </span>
                    </div>

                    <strong>
                      {fullName}
                    </strong>

                  </div>


                  <div className="personal-item">

                    <div className="item-title-row">
                      <Smartphone size={18} />
                      <span>
                        Mobile
                      </span>
                    </div>

                    <strong>
                      {mobile}
                    </strong>

                    <span className="verified-badge">
                      <ShieldCheck size={13} />
                      Verified
                    </span>

                  </div>


                  <div className="personal-item">

                    <div className="item-title-row">
                      <FileCheck2 size={18} />
                      <span>
                        Email
                      </span>
                    </div>

                    <strong>
                      {email}
                    </strong>

                    <span className="verified-badge">
                      <ShieldCheck size={13} />
                      Verified
                    </span>

                  </div>


                  <div className="personal-item">

                    <div className="item-title-row">
                      <Fingerprint size={18} />
                      <span>
                        Driving License
                      </span>
                    </div>

                    <strong>
                      {license}
                    </strong>

                  </div>

                </div>

              </div>


              {/* VERIFICATION */}

              <div className="dashboard-card">

                <div className="card-heading">

                  <div>

                    <span className="card-kicker">
                      TRUST
                    </span>

                    <h2>
                      Verification Status
                    </h2>

                  </div>

                  <ShieldCheck
                    size={30}
                  />

                </div>


                <div className="verification-list">

                  <div className="verification-item">

                    <div className="verification-icon">
                      <MailIcon />
                    </div>

                    <div className="verification-info">

                      <strong>
                        Email Address
                      </strong>

                      <span>
                        {email}
                      </span>

                    </div>

                    <span className="active-label">
                      Verified
                    </span>

                  </div>


                  <div className="verification-item">

                    <div className="verification-icon">
                      <Smartphone size={20} />
                    </div>

                    <div className="verification-info">

                      <strong>
                        Phone Number
                      </strong>

                      <span>
                        {mobile}
                      </span>

                    </div>

                    <span className="active-label">
                      Verified
                    </span>

                  </div>


                  <div className="verification-item">

                    <div className="verification-icon">
                      <FileCheck2 size={20} />
                    </div>

                    <div className="verification-info">

                      <strong>
                        Driving License
                      </strong>

                      <span>
                        {license}
                      </span>

                    </div>

                    <span className="active-label">
                      Verified
                    </span>

                  </div>

                </div>

              </div>

            </div>


            {/* RIGHT */}

            <div className="account-right">

              {/* WALLET */}

              <div className="dashboard-card wallet-card">

                <div className="wallet-top">

                  <div>

                    <span className="card-kicker">
                      DIGITAL WALLET
                    </span>

                    <h2>
                      ₹8,450.00
                    </h2>

                    <p>
                      Available balance
                    </p>

                  </div>

                  <div className="wallet-icon">
                    <WalletCards size={28} />
                  </div>

                </div>


                <div className="secure-node">

                  <ShieldCheck size={16} />

                  Secure Wallet

                </div>


                <div className="wallet-actions">

                  <button
                    className="wallet-button"
                    onClick={() =>
                      showMessage(
                        "Add money feature coming soon."
                      )
                    }
                  >
                    <ArrowDownToLine size={18} />
                    Add Money
                  </button>

                  <button
                    className="wallet-button"
                    onClick={() =>
                      showMessage(
                        "Withdraw feature coming soon."
                      )
                    }
                  >
                    <ArrowUpFromLine size={18} />
                    Withdraw
                  </button>

                </div>


                <div className="reload-row">

                  <div className="reload-icon">
                    <RefreshCw size={18} />
                  </div>

                  <div className="reload-text">

                    <strong>
                      Auto Reload
                    </strong>

                    <span>
                      Keep your wallet funded
                    </span>

                  </div>


                  <button
                    className={
                      autoReload
                        ? "toggle active"
                        : "toggle"
                    }
                    onClick={() =>
                      setAutoReload(
                        !autoReload
                      )
                    }
                  >

                    <span />

                  </button>

                </div>

              </div>


              {/* RESERVATION */}

              <div className="dashboard-card reservation-card">

                <div className="reservation-heading">

                  <div>

                    <span className="card-kicker">
                      ACTIVE RESERVATION
                    </span>

                    <h2>
                      Your Current Ride
                    </h2>

                  </div>

                  <span className="reservation-status">
                    Active
                  </span>

                </div>


                <div className="vehicle-banner">

                  <div className="vehicle-overlay">

                    <div>

                      <span className="vehicle-label">
                        Premium Sedan
                      </span>

                      <h3>
                        BMW 3 Series
                      </h3>

                    </div>

                    <strong className="reservation-price">
                      ₹3,850
                    </strong>

                  </div>

                </div>


                <div className="reservation-details">

                  <div className="reservation-detail">

                    <CalendarDays size={18} />

                    <div>
                      <span>
                        Return
                      </span>

                      <strong>
                        18 Oct 2026
                      </strong>
                    </div>

                  </div>


                  <div className="reservation-detail">

                    <Clock3 size={18} />

                    <div>
                      <span>
                        Time
                      </span>

                      <strong>
                        10:00 AM
                      </strong>
                    </div>

                  </div>


                  <div className="reservation-detail">

                    <Navigation size={18} />

                    <div>
                      <span>
                        Location
                      </span>

                      <strong>
                        Mumbai
                      </strong>
                    </div>

                  </div>

                </div>


                <div className="reservation-actions">

                  <button
                    className="reservation-primary"
                    onClick={() =>
                      showMessage(
                        "Opening reservation..."
                      )
                    }
                  >
                    Manage Reservation
                    <ArrowRightLeft size={17} />
                  </button>

                  <button
                    onClick={() =>
                      showMessage(
                        "Vehicle location feature coming soon."
                      )
                    }
                  >
                    <Radio size={17} />
                    Track
                  </button>

                </div>

              </div>

            </div>

          </div>

        )}


        {/* =================================================
            BOOKINGS
        ================================================= */}

        {activeTab === "bookings" && (

          <div className="dashboard-card history-card">

            <div className="card-heading">

              <div>

                <span className="card-kicker">
                  ACTIVITY
                </span>

                <h2>
                  Booking History
                </h2>

              </div>

              <button className="view-all">
                View All
                <ExternalLink size={16} />
              </button>

            </div>


            <div className="history-list">

              <div className="history-item">

                <div className="history-car-icon">
                  <Car size={23} />
                </div>

                <div className="history-car">

                  <strong>
                    BMW 3 Series
                  </strong>

                  <span>
                    12 Oct 2026 • Mumbai
                  </span>

                </div>

                <strong className="history-price">
                  ₹3,850
                </strong>

                <span className="active-label">
                  Completed
                </span>

              </div>


              <div className="history-item">

                <div className="history-car-icon">
                  <Car size={23} />
                </div>

                <div className="history-car">

                  <strong>
                    Mercedes C-Class
                  </strong>

                  <span>
                    04 Oct 2026 • Pune
                  </span>

                </div>

                <strong className="history-price">
                  ₹4,200
                </strong>

                <span className="active-label">
                  Completed
                </span>

              </div>


              <div className="history-item">

                <div className="history-car-icon">
                  <Car size={23} />
                </div>

                <div className="history-car">

                  <strong>
                    Audi A4
                  </strong>

                  <span>
                    25 Sep 2026 • Nashik
                  </span>

                </div>

                <strong className="history-price">
                  ₹3,600
                </strong>

                <span className="active-label">
                  Completed
                </span>

              </div>

            </div>

          </div>

        )}


        {/* =================================================
            WALLET
        ================================================= */}

        {activeTab === "wallet" && (

          <div className="dashboard-card wallet-page-card">

            <div className="card-heading">

              <div>

                <span className="card-kicker">
                  WALLET
                </span>

                <h2>
                  Wallet & Payments
                </h2>

              </div>

              <WalletCards size={32} />

            </div>


            <div className="large-wallet-balance">

              <span>
                Available Balance
              </span>

              <strong>
                ₹8,450.00
              </strong>

            </div>


            <div className="wallet-actions">

              <button
                className="wallet-button"
                onClick={() =>
                  showMessage(
                    "Add money feature coming soon."
                  )
                }
              >
                <ArrowDownToLine size={19} />
                Add Money
              </button>

              <button
                className="wallet-button"
                onClick={() =>
                  showMessage(
                    "Withdraw feature coming soon."
                  )
                }
              >
                <ArrowUpFromLine size={19} />
                Withdraw
              </button>

            </div>

          </div>

        )}


        {/* =================================================
            SECURITY
        ================================================= */}

        {activeTab === "security" && (

          <div className="dashboard-card security-page-card">

            <div className="card-heading">

              <div>

                <span className="card-kicker">
                  SECURITY
                </span>

                <h2>
                  Account Security
                </h2>

              </div>

              <ShieldCheck size={32} />

            </div>


            <div className="security-item">

              <div className="security-item-icon">
                <Fingerprint size={24} />
              </div>

              <div>

                <strong>
                  Account Verification
                </strong>

                <p>
                  Your account verification is active.
                </p>

              </div>

              <span className="active-label">
                Active
              </span>

            </div>


            <div className="security-item">

              <div className="security-item-icon">
                <Smartphone size={24} />
              </div>

              <div>

                <strong>
                  Mobile Number
                </strong>

                <p>
                  {mobile}
                </p>

              </div>

              <span className="active-label">
                Verified
              </span>

            </div>


            <div className="security-item">

              <div className="security-item-icon">
                <FileCheck2 size={24} />
              </div>

              <div>

                <strong>
                  Email Address
                </strong>

                <p>
                  {email}
                </p>

              </div>

              <span className="active-label">
                Verified
              </span>

            </div>

          </div>

        )}

      </main>


      {/* =================================================
          TOAST
      ================================================= */}

      {bookingMessage && (

        <div className="account-toast">

          <ShieldCheck size={19} />

          {bookingMessage}

        </div>

      )}

    </div>
  );
}


// =====================================================
// SMALL EMAIL ICON
// =====================================================

function MailIcon() {

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
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


export default Profile;