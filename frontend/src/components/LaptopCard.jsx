import React from 'react';
import { useAuthCart } from '../context/AuthCartContext';
import './LaptopCard.css';

export default function LaptopCard({ laptop }) {
  const { addToCart } = useAuthCart();

  const handleAddToCart = () => {
    addToCart(laptop);
  };

  return (
    <div className="laptop-card">
      <div className="laptop-card-img-wrapper">
        <img
          className="laptop-card-img"
          src={laptop.image}
          alt={laptop.title}
        />
      </div>
      <div className="laptop-card-body">
        <div className="laptop-card-header">
          <span
            className={`laptop-card-condition ${
              laptop.condition === 'New' ? 'new' : 'used'
            }`}
          >
            {laptop.condition}
          </span>
          <span className="laptop-card-price">
            {laptop.priceDisplay || `R ${laptop.price.toLocaleString()}`}
          </span>
        </div>
        <h3 className="laptop-card-title">{laptop.title}</h3>
        <div className="laptop-card-details">
          <span>{laptop.cpu}</span>
          <span>•</span>
          <span>{laptop.ram} RAM</span>
          <span>•</span>
          <span>{laptop.storage}</span>
        </div>
        <div className="laptop-card-footer">
          <button
            className="laptop-card-cart"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
