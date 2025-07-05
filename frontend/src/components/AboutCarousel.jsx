import React from "react";
import { FaLaptop, FaRecycle, FaUserShield, FaShippingFast, FaUsers, FaHandshake } from "react-icons/fa";
import "./AboutCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const cards = [
  {
    icon: <FaLaptop className="about-icon" />, title: "Wide Selection", desc: "New & certified pre-owned laptops from top brands like Apple, Dell, HP, Lenovo, and more."
  },
  {
    icon: <FaUserShield className="about-icon" />, title: "Peace of Mind", desc: "14-day hassle-free returns and a 6-month warranty on all devices."
  },
  {
    icon: <FaShippingFast className="about-icon" />, title: "Fast Delivery", desc: "Secure online payments via PayFast and fast nationwide delivery (2-4 days)."
  },
  {
    icon: <FaUsers className="about-icon" />, title: "Expert Support", desc: "Support team available 7 days a week for all your questions."
  },
  {
    icon: <FaHandshake className="about-icon" />, title: "Sell or Trade-In", desc: "Sell your old laptop for cash or trade-in for an upgrade—get a free instant quote online."
  },
  {
    icon: <FaRecycle className="about-icon" />, title: "Eco-Friendly", desc: "We refurbish and recycle electronics responsibly."
  }
];

export default function AboutCarousel() {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={3}
      spaceBetween={32}
      loop={true}
      autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
      speed={12000}
      freeMode={true}
      freeModeMomentum={false}
      freeModeSticky={false}
      cssMode={false}
      allowTouchMove={false}
      className="about-carousel-swiper"
      breakpoints={{
        900: { slidesPerView: 3 },
        600: { slidesPerView: 2 },
        0: { slidesPerView: 1 }
      }}
    >
      {cards.map((card, idx) => (
        <SwiperSlide key={idx}>
          <div className="about-card about-carousel-card">
            {card.icon}
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
