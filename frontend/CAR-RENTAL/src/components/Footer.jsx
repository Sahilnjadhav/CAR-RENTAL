import React from "react";
import {
  ShieldCheck,
  Headphones,
  Zap,
  Car,
  LockKeyhole,
  BadgeCheck,
} from "lucide-react";
import "../style/Footer.css";

function Footer() {
  return (
    <footer className="velocity-footer">

      {/* ================= TOP STATUS BAR ================= */}
      <div className="footer-status-bar">

        <div className="status-item">
          <ShieldCheck size={13} />
          <span>Zero Security Deposit on Select Fleet</span>
        </div>

        <div className="status-item">
          <Headphones size={13} />
          <span>24/7 Precision Roadside Telemetry (28 Active Hubs)</span>
        </div>

        <div className="status-item">
          <Zap size={13} />
          <span>Instant Keyless Bluetooth Unlock via Mobile App</span>
        </div>

        <div className="system-status">
          <span className="status-dot"></span>
          SYSTEM 100% OPERATIONAL (LATENCY: 14ms)
        </div>

      </div>

      {/* ================= MAIN FOOTER ================= */}
      <div className="footer-main">

        {/* BRAND COLUMN */}
        <div className="footer-column footer-brand">

          <div className="footer-logo">
            <div className="logo-box">
              <Car size={18} />
            </div>

            <span>VELOCITYDRIVE</span>
          </div>

          <p className="footer-description">
            India's apex connected mobility network. Experience
            instant keyless rentals, track real-time telemetry, and
            drive precision-engineered luxury, EV, and performance
            fleets across all major metro air hubs.
          </p>

          {/* SECURITY BADGES */}
          <div className="security-badges">

            <div className="security-badge">
              <ShieldCheck size={12} />
              <span>ISO 27001</span>
            </div>

            <div className="security-badge">
              <LockKeyhole size={12} />
              <span>256-bit SSL</span>
            </div>

            <div className="security-badge">
              <BadgeCheck size={12} />
              <span>DigiLocker KYC</span>
            </div>

          </div>
        </div>

        {/* VEHICLE MATRIX */}
        <div className="footer-column">

          <h3>VEHICLE<br />MATRIX</h3>

          <ul>
            <li>Precision SUVs</li>
            <li>Executive Sedans</li>
            <li>Electric Vehicles</li>
            <li>Adventure Enduro Bikes</li>
            <li>Private Charter Vans</li>
          </ul>

        </div>

        {/* METRO HUBS */}
        <div className="footer-column">

          <h3>METRO HUBS</h3>

          <ul>
            <li>Bengaluru Airport (BLR)</li>
            <li>Mumbai BKC &amp; T2</li>
            <li>Delhi NCR (IGI T3)</li>
            <li>Hyderabad Hitec City</li>
            <li>Pune Hinjewadi Hub</li>
          </ul>

        </div>

        {/* HOST & PARTNERS */}
        <div className="footer-column">

          <h3>HOST &amp;<br />PARTNERS</h3>

          <ul>
            <li>List Commercial Vehicles</li>
            <li>Host Earnings (₹ INR)</li>
            <li>Obsidian Hardware Kit</li>
            <li>Franchise Program</li>
            <li>Comprehensive Cover</li>
          </ul>

        </div>

        {/* GOVERNANCE */}
        <div className="footer-column">

          <h3>GOVERNANCE</h3>

          <ul>
            <li>Rental Charter Agreement</li>
            <li>Deposit Refund Guarantee</li>
            <li>Telemetry &amp; GPS Privacy</li>
            <li>FASTag Automated Billing</li>
            <li>Grievance Officer (India)</li>
          </ul>

        </div>

      </div>

      {/* ================= BOTTOM FOOTER ================= */}
      <div className="footer-bottom">

        <div className="copyright">
          © 2025 VelocityDrive Mobility Technologies India Pvt. Ltd.
          All rights reserved. Precision vehicle telemetry powered
          by Obsidian Engine.
        </div>

        <div className="helpdesk">
          National Helpdesk: 1800-419-DRIVE
        </div>

        <div className="settlement">
          INR (₹) Base<br />
          Settlement
        </div>

      </div>

    </footer>
  );
}

export default Footer;