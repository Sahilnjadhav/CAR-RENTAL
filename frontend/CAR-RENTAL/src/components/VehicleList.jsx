
import React from "react";
import vehicles from "../data/vehicles";
import VehicleCard from "./VehicleCard";

function VehicleList({ onBook }) {
  return (
    <div className="vehicles-grid">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onBook={onBook}
        />
      ))}
    </div>
  );
}

export default VehicleList;