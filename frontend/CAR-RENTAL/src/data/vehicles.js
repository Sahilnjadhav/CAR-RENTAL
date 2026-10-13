
import Thar from "../assets/thar.jpg"
import Fortuner from "../assets/fortuner.jpg"
import Duke from "../assets/duke.jpg"
import Hondacity from "../assets/hondacity.jpg"


const vehicles = [
  {
    id: 1,
    name: "Mahindra Thar 4×4",
    image:
      Thar,
    location: "BLR Airport Hub T2",
    badge: "HARDTOP",
    badgeColor: "blue",
    rating: "4.92",
    reviews: "128",
    description: "2.2L mHawk Diesel · 4WD Manual · High Clearance",
    specs: [
      ["TRANSMISSION", "6-Spd 4x4"],
      ["CAPACITY", "57 Liters"],
      ["TELEMETRY", "Active GPS"],
    ],
    priceLabel: "Self-Drive Rate",
    price: "₹7,500",
    suffix: "/day",
  },
  {
    id: 2,
    name: "Fortuner Legender",
    image:
     Fortuner,
    location: "Mumbai BKC Dock",
    badge: "DIESEL 4X4",
    badgeColor: "green",
    rating: "4.95",
    reviews: "218",
    description: "2.8L Turbo Diesel · 500 Nm Torque · 7-Seater VIP",
    specs: [
      ["POWER", "204 BHP"],
      ["TRANSMISSION", "6-Spd AT"],
      ["CRUISE", "Radar ADAS"],
    ],
    priceLabel: "Self-Drive Rate",
    price: "₹11,000",
    suffix: "/day",
  },
  {
    id: 3,
    name: "KTM Duke 390 ABS",
    image:
      Duke,
    location: "Indiranagar Hub",
    badge: "GEN-3 APEX",
    badgeColor: "orange",
    rating: "4.92",
    reviews: "84",
    description: "399cc Liquid-Cooled · Quickshifter · Cornering ABS",
    specs: [
      ["POWER", "45 PS"],
      ["WEIGHT", "168 KG"],
      ["TECH", "TFT Screen"],
    ],
    priceLabel: "Ride Rate",
    price: "₹3,600",
    suffix: "/day",
  },
  {
    id: 4,
    name: "Honda City e:HEV",
    image:
      Hondacity,
    location: "Delhi Aerocity T3",
    badge: "ZX HYBRID",
    badgeColor: "green",
    rating: "4.79",
    reviews: "112",
    description: "Twin-Motor Hybrid Electric · Honda SENSING ADAS",
    specs: [
      ["ECONOMY", "27.1 km/L"],
      ["DRIVE MODE", "e-CVT Auto"],
      ["CABIN", "Sunroof + 8″"],
    ],
    priceLabel: "Self-Drive Rate",
    price: "₹4,600",
    suffix: "/day",
  },
];

export default vehicles;