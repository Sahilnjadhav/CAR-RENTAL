
import React from "react";
import "./VehicleCard.css"

function VehicleCard({ vehicle, onBook }) {
  return (
    <article className="vehicle-card">
      <div className="vehicle-image-wrap">
        <img
          className="vehicle-image"
          src={vehicle.image}
          alt={vehicle.name}
          loading="lazy"
        />

        <div className="image-overlay" />

        <span className="instant-badge">
          ⚡ INSTANT UNLOCK
        </span>

        <span className="rating">
          ★ {vehicle.rating}{" "}
          <small>({vehicle.reviews})</small>
        </span>

        <span
          className={`vehicle-location ${vehicle.badgeColor}`}
        >
          ⌖ {vehicle.location}
        </span>
      </div>

      <div className="vehicle-content">
        <div className="vehicle-title-row">
          <h3>{vehicle.name}</h3>

          <span
            className={`vehicle-badge ${vehicle.badgeColor}`}
          >
            {vehicle.badge}
          </span>
        </div>

        <p className="vehicle-description">
          {vehicle.description}
        </p>

        <div className="vehicle-specs">
          {vehicle.specs.map(([label, value]) => (
            <div className="spec" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <div className="vehicle-booking">
          <div className="vehicle-price">
            <span>{vehicle.priceLabel}</span>
            <strong>{vehicle.price}</strong>
            <small>{vehicle.suffix}</small>
          </div>

          <button
            className="book-button"
            type="button"
            onClick={() => onBook(vehicle)}
          >
            Book Now <span>→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default VehicleCard;