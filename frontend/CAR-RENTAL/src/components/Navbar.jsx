
import React, { useEffect, useState } from "react";
import {
  CarFront,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import "../style/Navbar.css";

// Read the logged-in user from browser storage
function getStoredUser() {
  try {
    const storedUser =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    if (!storedUser) return null;

    const parsedUser = JSON.parse(storedUser);

    // Support APIs that return { user: {...} }
    const userData = parsedUser.user || parsedUser;

    const name =
      userData.name ||
      userData.fullName ||
      userData.fullname ||
      userData.username;

    if (!name) return null;

    return {
      ...userData,
      name,
    };
  } catch (error) {
    console.error("Unable to read user information:", error);
    return null;
  }
}

// Generate initials from the user's name
function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function Navbar() {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [user, setUser] = useState(() => getStoredUser());

  // Keep navbar authentication information synchronized
  useEffect(() => {
    const syncUser = () => {
      setUser(getStoredUser());
    };

    // Changes from other browser tabs
    window.addEventListener("storage", syncUser);

    // Changes made by Login/Register in the same tab
    window.addEventListener("authChanged", syncUser);

    // Recheck when the user returns to this tab
    window.addEventListener("focus", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("authChanged", syncUser);
      window.removeEventListener("focus", syncUser);
    };
  }, []);

  const handleLogin = () => {
    setMobileMenu(false);
    navigate("/login");
  };

  const handleProfile = () => {
    setMobileMenu(false);
    navigate("/profile");
  };

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="navbar">

        {/* LEFT: BRAND */}
        <div className="navbar-left">
          <NavLink
            to="/"
            className="brand"
            onClick={closeMobileMenu}
          >
            <div className="logo-box">
              <CarFront size={23} strokeWidth={1.8} />
            </div>

            <div className="brand-text">
              <div className="brand-name">
                VELOCITY<span>DRIVE</span>
              </div>

              <div className="brand-subtitle">
                OBSIDIAN ENGINE
              </div>
            </div>
          </NavLink>

          {/* LIVE STATUS */}
          <div className="live-status">
            <span className="live-dot"></span>
            <span>4.1K</span>
            <span>LIVE</span>
          </div>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="desktop-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/explore-vehicles"
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            Explore Vehicles
          </NavLink>

          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            How It Works
          </NavLink>

          <NavLink
            to="/host-earn"
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            Host & Earn
          </NavLink>

          <NavLink
            to="/safety"
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            Safety
          </NavLink>
        </nav>

        {/* RIGHT: AUTHENTICATION */}
        <div className="navbar-right">

          {/* CURRENCY */}
          <button
            type="button"
            className="currency-btn"
            aria-label="Currency: Indian Rupees"
          >
            <span>₹</span>
            <span>INR</span>
            <ChevronDown size={11} />
          </button>

          {/* LOGGED-IN / LOGGED-OUT */}
          {user ? (
            <button
              type="button"
              className="avatar"
              title={user.name}
              aria-label={`Open profile for ${user.name}`}
              onClick={handleProfile}
            >
              {getInitials(user.name) || "U"}
            </button>
          ) : (
            <button
              type="button"
              className="nav-button"
              onClick={handleLogin}
            >
              Login
            </button>
          )}

          {/* MOBILE MENU TOGGLE */}
          <button
            type="button"
            className="menu-btn"
            aria-label={
              mobileMenu ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenu}
            onClick={() => setMobileMenu((previous) => !previous)}
          >
            {mobileMenu ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenu && (
        <div className="mobile-menu">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `mobile-nav-item ${isActive ? "active" : ""}`
            }
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/explore-vehicles"
            className={({ isActive }) =>
              `mobile-nav-item ${isActive ? "active" : ""}`
            }
            onClick={closeMobileMenu}
          >
            Explore Vehicles
          </NavLink>

          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              `mobile-nav-item ${isActive ? "active" : ""}`
            }
            onClick={closeMobileMenu}
          >
            How It Works
          </NavLink>

          <NavLink
            to="/host-earn"
            className={({ isActive }) =>
              `mobile-nav-item ${isActive ? "active" : ""}`
            }
            onClick={closeMobileMenu}
          >
            Host & Earn
          </NavLink>

          <NavLink
            to="/safety"
            className={({ isActive }) =>
              `mobile-nav-item ${isActive ? "active" : ""}`
            }
            onClick={closeMobileMenu}
          >
            Safety
          </NavLink>

          <div className="mobile-divider"></div>

          {user ? (
            <button
              type="button"
              className="mobile-auth-button"
              onClick={handleProfile}
            >
              <span className="mobile-avatar">
                {getInitials(user.name) || "U"}
              </span>
              <span>
                My Profile
                <small>{user.name}</small>
              </span>
            </button>
          ) : (
            <button
              type="button"
              className="mobile-auth-button mobile-login"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
