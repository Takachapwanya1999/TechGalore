import React from "react";
import "./OurStory.css";

export default function OurStory() {
  return (
    <div className="ourstory-container">
      <h2 className="ourstory-title">Our Story</h2>
      <p className="ourstory-p1">
        Technology Galore began with a simple idea: to make quality laptops accessible to everyone in South Africa. In 2022, a group of tech enthusiasts and entrepreneurs saw the need for a trusted, customer-focused platform where people could buy, sell, and upgrade laptops with confidence.
      </p>
      <p className="ourstory-p2">
        From our humble beginnings in a small office, we have grown into a nationwide marketplace, serving thousands of happy customers. Our journey has been driven by a passion for technology, a commitment to transparency, and a belief that everyone deserves reliable, affordable devices.
      </p>
      <h3 className="ourstory-milestones-title">Milestones</h3>
      <ul className="ourstory-milestones-list">
        <li>2022: Technology Galore is founded and launches its online store.</li>
        <li>2023: Introduced certified pre-owned laptops and a 30-point quality check process.</li>
        <li>2024: Expanded to offer trade-ins, student discounts, and eco-friendly recycling.</li>
        <li>2025: Reached 10,000+ customers and launched our mobile-friendly platform.</li>
      </ul>
      <h3 className="ourstory-lookingahead-title">Looking Ahead</h3>
      <p className="ourstory-lookingahead-p">
        As we continue to grow, our focus remains on delivering exceptional value, service, and innovation. Thank you for being part of our story!
      </p>
    </div>
  );
}
