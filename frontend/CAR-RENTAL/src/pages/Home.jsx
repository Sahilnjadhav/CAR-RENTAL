
import React, { useMemo, useState } from "react";

import {
  MapPin,
  Clock3,
  RotateCcw,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Zap,
  CalendarCheck,
  Star,
  CalendarDays,
  Search,
  X,
  
Router,
  Wifi,
  CheckCircle2,



} from "lucide-react";

import "../style/Home.css";


import FeatureCard from "../components/FeatureCard";
import features from "../data/features";



import VehicleList from "../components/VehicleList";
import BookingModal from "../components/BookingModal";

function Home() {
  // PICKUP HUBS
  const hubs = [
    "Bengaluru–Kempegowda Airport T2",
    "Bengaluru–MG Road Hub",
    "Bengaluru–Indiranagar Hub",
    "Mumbai–Andheri Hub",
    "Delhi–Aerocity Hub",
    "Hyderabad–Banjara Hills Hub",
  ];

  const [pickup, setPickup] = useState(
    "Bengaluru–Kempegowda Airport T2"
  );

  const [showHubDropdown, setShowHubDropdown] = useState(false);

  // DATE AND TIME HELPERS
  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getTomorrow = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [startDate, setStartDate] = useState(getToday());
  const [startTime, setStartTime] = useState("10:00");

  const [returnDate, setReturnDate] = useState(getTomorrow());
  const [returnTime, setReturnTime] = useState("20:00");

  // SEARCH STATE
  const [searchResults, setSearchResults] = useState(false);
  const [error, setError] = useState("");

  // BOOKING STATE
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleBook = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  // VEHICLE CATEGORIES
  const categories = [
    {
      icon: "🚘",
      count: "840+ CARS",
      title: "Precision SUVs",
      description:
        "Mahindra Thar, Fortuner Legender, Scorpio-N 4WD",
      price: "₹5,200",
      color: "blue",
    },
    {
      icon: "🚙",
      count: "520+ CARS",
      title: "Premium Sedans",
      description:
        "BMW 330Li, Honda City E:HEV, Audi A4 Sport",
      price: "₹4,600",
      color: "green",
    },
    {
      icon: "🏍️",
      count: "310+ BIKES",
      title: "Adventure Bikes",
      description:
        "KTM Duke 390, RE Himalayan 450, BMW G310 GS",
      price: "₹2,400",
      color: "orange",
    },
    {
      icon: "🚐",
      count: "460+ EVS",
      title: "Electric Vehicles",
      description:
        "Tata Nexon EV Max, BYD Seal AWD, Ioniq 5",
      price: "₹3,800",
      color: "blue",
    },
    {
      icon: "🏁",
      count: "56+ UNITS",
      title: "Luxury & Track",
      description:
        "Porsche Macan GTS, Mercedes-AMG C300, Defender",
      price: "₹18,500",
      color: "purple",
    },
    {
      icon: "🚌",
      count: "120+ VANS",
      title: "Group Charter",
      description:
        "Toyota Vellfire VIP, Force Urbania Lounge Edition",
      price: "₹8,500",
      color: "green",
    },
  ];

  // FORMAT DATE
  const formatDate = (dateString, timeString) => {
    if (!dateString) return "";

    const date = new Date(
      `${dateString}T${timeString || "00:00"}`
    );

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // FORMAT TIME
  const formatTime = (time) => {
    if (!time) return "";

    const [hour, minute] = time.split(":");
    const date = new Date();

    date.setHours(Number(hour), Number(minute), 0, 0);

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // CALCULATE RENTAL DAYS
  const numberOfDays = useMemo(() => {
    if (!startDate || !returnDate) return 0;

    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${returnDate}T${returnTime}`);

    const difference = end - start;

    if (difference <= 0) return 0;

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  }, [startDate, returnDate, startTime, returnTime]);

  // SEARCH VEHICLES
  const handleSearch = () => {
    setError("");

    if (!pickup) {
      setError("Please select a pick-up hub.");
      setSearchResults(false);
      return;
    }

    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${returnDate}T${returnTime}`);

    if (end <= start) {
      setError(
        "Return date and time must be after the trip start."
      );
      setSearchResults(false);
      return;
    }

    setSearchResults(true);
  };

  // RESET SEARCH
  const handleReset = () => {
    setPickup("Bengaluru–Kempegowda Airport T2");

    setStartDate(getToday());
    setStartTime("10:00");

    setReturnDate(getTomorrow());
    setReturnTime("20:00");

    setSearchResults(false);
    setError("");
  };

  // START DATE CHANGE
  const handleStartDateChange = (event) => {
    const value = event.target.value;

    setStartDate(value);

    if (returnDate && value > returnDate) {
      setReturnDate(value);
    }

    setError("");
    setSearchResults(false);
  };

  // RETURN DATE CHANGE
  const handleReturnDateChange = (event) => {
    setReturnDate(event.target.value);
    setError("");
    setSearchResults(false);
  };

  
  

  
  
  
  
  
  

  


  return (
    <div className="home-page">
      {/* BACKGROUND */}
      <div className="bg-glow bg-glow-one"></div>
      <div className="bg-glow bg-glow-two"></div>

      {/* HERO SECTION */}
      <main className="hero">
        {/* TOP BADGE */}
        <div className="top-badge">
          <span className="badge-live-dot"></span>
          <span className="badge-lightning">ϟ</span>
          <span>ZERO PHYSICAL KEYS</span>
          <span className="badge-separator">•</span>
          <span>50MS BLE UNLOCK</span>
          <span className="badge-separator">•</span>
          <span>28 METRO HUBS</span>
        </div>

        {/* TITLE */}
        <h1 className="hero-title">
          High-Precision Mobility.
          <span>{" "}Zero Physical Keys.</span>
        </h1>

        {/* DESCRIPTION */}
        <p className="hero-description">
          Rent self-drive performance SUVs, sports sedans &
          adventure bikes across BLR, BOM,
          <br className="desktop-break" />
          DEL & HYD with instant DigiLocker KYC.
        </p>

        {/* SEARCH PANEL */}
        <section className="search-panel">
          {/* PICKUP HUB */}
          <div className="search-field pickup-field">
            <div className="field-label">
              <MapPin size={14} />
              <span>PICK-UP HUB</span>
            </div>

            <button
              type="button"
              className="field-value location-value"
              onClick={() =>
                setShowHubDropdown(!showHubDropdown)
              }
            >
              <span>{pickup}</span>

              <ChevronDown
                size={16}
                className={
                  showHubDropdown ? "rotate-arrow" : ""
                }
              />
            </button>

            {showHubDropdown && (
              <div className="hub-dropdown">
                {hubs.map((hub) => (
                  <button
                    type="button"
                    key={hub}
                    className={
                      pickup === hub
                        ? "hub-option selected"
                        : "hub-option"
                    }
                    onClick={() => {
                      setPickup(hub);
                      setShowHubDropdown(false);
                      setError("");
                      setSearchResults(false);
                    }}
                  >
                    <MapPin size={14} />
                    <span>{hub}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* TRIP START */}
          <div className="search-field">
            <div className="field-label">
              <Clock3 size={14} />
              <span>TRIP START</span>
              <span className="now-badge">NOW</span>
            </div>

            <div className="date-time-controls">
              <div className="date-control">
                <CalendarDays size={14} />

                <input
                  type="date"
                  value={startDate}
                  min={getToday()}
                  onChange={handleStartDateChange}
                />
              </div>

              <div className="time-control">
                <Clock3 size={14} />

                <input
                  type="time"
                  value={startTime}
                  onChange={(event) => {
                    setStartTime(event.target.value);
                    setError("");
                    setSearchResults(false);
                  }}
                />
              </div>
            </div>
          </div>

          {/* TRIP RETURN */}
          <div className="search-field">
            <div className="field-label">
              <RotateCcw size={14} />
              <span>TRIP RETURN</span>

              {numberOfDays > 0 && (
                <span className="days-badge">
                  {numberOfDays}{" "}
                  {numberOfDays === 1 ? "DAY" : "DAYS"}
                </span>
              )}
            </div>

            <div className="date-time-controls">
              <div className="date-control">
                <CalendarDays size={14} />

                <input
                  type="date"
                  value={returnDate}
                  min={startDate}
                  onChange={handleReturnDateChange}
                />
              </div>

              <div className="time-control">
                <Clock3 size={14} />

                <input
                  type="time"
                  value={returnTime}
                  onChange={(event) => {
                    setReturnTime(event.target.value);
                    setError("");
                    setSearchResults(false);
                  }}
                />
              </div>
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <button
            type="button"
            className="search-button"
            onClick={handleSearch}
          >
            <Search size={19} />

            <span>
              Search
              <br />
              Vehicles
            </span>

            <ArrowRight size={18} />
          </button>
        </section>

        {/* SEARCH ERROR */}
        {error && (
          <div className="search-error">
            <span>{error}</span>
          </div>
        )}

        {/* SEARCH RESULTS SUMMARY */}
        {searchResults && !error && (
          <div className="search-result">
            <div className="result-icon">
              <Search size={18} />
            </div>

            <div className="result-content">
              <strong>Vehicles available</strong>

              <span>
                {pickup}
                {" • "}
                {formatDate(startDate, startTime)}
                {" "}
                {formatTime(startTime)}
                {" → "}
                {formatDate(returnDate, returnTime)}
                {" "}
                {formatTime(returnTime)}
              </span>
            </div>

            <button
              type="button"
              className="reset-search"
              onClick={handleReset}
              title="Reset search"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* BENEFITS */}
        <div className="benefits-bar">
          <div className="benefit">
            <ShieldCheck size={14} />
            <span>₹0 Security Deposit</span>
          </div>

          <span className="benefit-dot">•</span>

          <div className="benefit">
            <Zap size={14} />
            <span>5-Min Keyless BLE Unlock</span>
          </div>

          <span className="benefit-dot">•</span>

          <div className="benefit">
            <CalendarCheck size={14} />
            <span>Free Cancellation</span>
          </div>

          <span className="benefit-dot">•</span>

          <div className="benefit rating">
            <Star size={14} fill="currentColor" />
            <span>4.92 / 5.0 Rating</span>
          </div>
        </div>
      </main>

      {/* =====================================================
          VEHICLE CATEGORIES
          ===================================================== */}
      <section className="categories-section">
        <div className="section-eyebrow">
          <span>// DEPLOYMENT CLASSES</span>
        </div>

        <div className="section-heading">
          <h2>Specialized Vehicle Categories</h2>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <article
              className="category-card"
              key={category.title}
            >
              <div
                className={`category-icon ${category.color}`}
              >
                {category.icon}
              </div>

              <p
                className={`category-count ${category.color}`}
              >
                {category.count}
              </p>

              <h3>{category.title}</h3>

              <p className="category-description">
                {category.description}
              </p>

              <div className="category-price">
                <span>Daily from</span>
                <strong>{category.price}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================================
          VEHICLE AVAILABILITY
          ===================================================== */}
      <section className="availability-section">
        <div className="section-eyebrow live-eyebrow">
          <span className="status-dot"></span>
          <span>LIVE DISPATCH BAY</span>
        </div>

        <div className="availability-heading">
          <h2>Immediate Availability Near You</h2>

          <button
            className="view-all-button"
            type="button"
            onClick={() => {
              document
                .querySelector(".vehicles-grid")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
            }}
          >
            View All Vehicles (4,120)
            <span>→</span>
          </button>
        </div>

        {/* VEHICLE LIST */}
        <VehicleList onBook={handleBook} />
      </section>

      {/* =====================================================
          BOOKING MODAL
          ===================================================== */}

      {selectedVehicle && (
        <BookingModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}



      {/* FeatureCard */}

      <main className="telemetry-page">
      <section className="telemetry-container">

        <header className="telemetry-header">
          <p className="section-eyebrow">
            <span>//</span> PROPRIETARY TELEMETRY SUITE
          </p>

          <h1>
            Engineered to Eliminate Counter
            <br className="desktop-break" />
            Queues, Physical Keys, and Paperwork.
          </h1>

          <p className="header-description">
            Every vehicle in the VelocityDrive network is embedded
            with an Obsidian Core micro-ECU connected
            <br className="desktop-break" />
            over private 5G mmWave channels.
          </p>
        </header>

        <section
          className="telemetry-grid"
          aria-label="Telemetry features"
        >
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
            />
          ))}
        </section>

        <section className="gateway-status">
          <div className="gateway-icon">
            <Router size={21} />
          </div>

          <div className="gateway-information">
            <div className="gateway-heading">
              <h2>Obsidian Gateway Status: Active</h2>

              <span className="mobile-status">
                <span className="status-dot" />
                ONLINE
              </span>
            </div>

            <p>
              Connected Hub Nodes: BLR, BOM, DEL, HYD, PNQ
              <span className="separator"> • </span>
              Sub-system health: 99.98%
            </p>
          </div>

          <div className="gateway-metrics">
            <strong>14.2 ms avg ping</strong>
            <span>PACKET LOSS: 0.00%</span>
          </div>

          <div
            className="gateway-chart"
            aria-label="Network latency trend"
          >
            <svg
              viewBox="0 0 150 38"
              preserveAspectRatio="none"
              role="img"
              aria-label="Sample network latency trend"
            >
              <path
                className="chart-grid-line"
                d="M0 30 H150"
              />

              <polyline
                className="chart-line"
                points="0,20 23,16 43,23 65,9 88,19 108,5 130,16 150,10"
              />
            </svg>
          </div>

          <div className="gateway-live-indicator">
            <Wifi size={16} />
            <span>LIVE</span>
          </div>
        </section>

        <div className="telemetry-bottom-line">
          <span>
            <CheckCircle2 size={13} />
            SYSTEM 100% OPERATIONAL
          </span>

          <span>ENCRYPTION: AES-256</span>

          <span>NETWORK: PRIVATE 5G</span>
        </div>

      </section>
    </main>






    </div>
  );
}

export default Home;
