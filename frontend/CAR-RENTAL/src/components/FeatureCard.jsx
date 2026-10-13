

import React from "react";
import {
  Fingerprint,
  Activity,
  Zap,
  LockKeyhole,
} from "lucide-react";
import "./FeatureCard.css"

function FeatureCard({ feature }) {
  const Icon = feature.icon;

  const footerIcons = {
    1: Fingerprint,
    2: Activity,
    3: Zap,
    4: LockKeyhole,
  };

  const FooterIcon = footerIcons[feature.id];

  return (
    <article className={`telemetry-card ${feature.color}`}>
      <div className="feature-icon">
        <Icon size={22} strokeWidth={2.2} />
      </div>

      <p className="feature-category">{feature.category}</p>

      <h3>{feature.title}</h3>

      <p className="feature-description">
        {feature.description}
      </p>

      <div className="feature-footer">
        {FooterIcon && <FooterIcon size={13} />}

        <span>{feature.footer}</span>
      </div>
    </article>
  );
}

export default FeatureCard;
