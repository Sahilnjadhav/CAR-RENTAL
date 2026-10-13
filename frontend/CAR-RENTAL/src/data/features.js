
import {
  Smartphone,
  Gauge,
  BadgePercent,
  ContactRound,
} from "lucide-react";

const features = [
  {
    id: 1,
    category: "LATENCY < 50MS",
    title: "Sub-50ms BLE Smart Key",
    description:
      "Direct cryptographic door unlock and engine immobilizer bypass right from your smartphone. Never interact with counter agents or queue at car rental booths.",
    footer: "Hardware Encrypted Handshake",
    icon: Smartphone,
    color: "blue",
  },
  {
    id: 2,
    category: "100 HZ REFRESH RATE",
    title: "Real-Time Live Telemetry",
    description:
      "Continuously monitors tire pressure, oil condition, and battery diagnostics. Pre-cool your cabin temperature before walking up to your bay.",
    footer: "Remote Dual-Zone Climate",
    icon: Gauge,
    color: "green",
  },
  {
    id: 3,
    category: "ZERO HIDDEN CHARGES",
    title: "Dynamic Fair Pricing",
    description:
      "Algorithmic calculations based on route length, regional demand, and safe pilot scores. Enjoy multi-day automated rebates up to 30% without vouchers.",
    footer: "Earn Safe Driver Bonus Credits",
    icon: BadgePercent,
    color: "orange",
  },
  {
    id: 4,
    category: "DIGILOCKER & PARIVAHAN API",
    title: "DigiLocker 90s KYC",
    description:
      "Skip xerox copies and manual scrutiny. Authenticate your driving license via DigiLocker and get instant zero-deposit access in under 90 seconds.",
    footer: "RBI / MeitY Compliant",
    icon: ContactRound,
    color: "blue",
  },
];

export default features;
