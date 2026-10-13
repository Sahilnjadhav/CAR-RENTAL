
import React, { useState } from "react";

function BookingModal({ vehicle, onClose }) {
  const [pickupDate, setPickupDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState(
    vehicle.location
  );
  const [message, setMessage] = useState("");

  if (!vehicle) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!pickupDate) {
      setMessage("Please select a pickup date.");
      return;
    }

    setMessage(
      `Selected ${vehicle.name} for ${pickupDate} at ${pickupLocation}. Connect your booking API to confirm.`
    );
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <span className="modal-eyebrow">
          VELOCITYDRIVE RESERVATION
        </span>

        <h2 id="booking-title">Reserve your vehicle</h2>
        <p className="modal-vehicle-name">{vehicle.name}</p>

        <div className="modal-price">
          <span>{vehicle.priceLabel}</span>
          <strong>{vehicle.price}</strong>
          <small>{vehicle.suffix}</small>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="pickup-date">Pickup date</label>
          <input
            id="pickup-date"
            type="date"
            min={new Date().toLocaleDateString("en-CA")}
            value={pickupDate}
            onChange={(event) => setPickupDate(event.target.value)}
            required
          />

          <label htmlFor="pickup-location">Pickup location</label>
          <select
            id="pickup-location"
            value={pickupLocation}
            onChange={(event) => setPickupLocation(event.target.value)}
          >
            <option>{vehicle.location}</option>
            <option>Bengaluru Airport</option>
            <option>Mumbai BKC</option>
            <option>Delhi Aerocity</option>
            <option>Indiranagar</option>
          </select>

          {message && (
            <p className="booking-message">{message}</p>
          )}

          <button className="confirm-button" type="submit">
            Continue Reservation →
          </button>
        </form>

        <p className="modal-note">
          Demo only — connect your backend for actual bookings.
        </p>
      </div>
    </div>
  );
}

export default BookingModal;