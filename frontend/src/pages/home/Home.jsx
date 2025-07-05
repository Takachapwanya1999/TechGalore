import pcImg from '../../assets/pc.png';
import pcImg2 from '../../assets/pc2.png';
import useImageSwitcher from '../../hooks/useImageSwitcher';

import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import './HomeTransition.css';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Use the custom hook for image switching
  const { imgSrc, isFading, handleMouseEnter, handleMouseLeave } = useImageSwitcher(pcImg, pcImg2, 200);

  const handleAnimatedNavigate = (to) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    if (rootRef.current) {
      rootRef.current.classList.add('fade-exit');
      setTimeout(() => {
        rootRef.current.classList.add('fade-exit-active');
      }, 10);
      setTimeout(() => {
        navigate(to);
      }, 410);
    } else {
      navigate(to);
    }
  };

  return (
    <div ref={rootRef} className="home-root">
      <div className="home-content">
        <h1 className="home-hero-heading">CLICK YOUR NEXT</h1>
        <p className="home-hero-desc">
          Quick. Easy. Simple. Buy or sell your laptop today with immediate payment.
        </p>
        <div className="home-btn-row">
          <button
            className="cta-btn sell-btn"
            onClick={() => handleAnimatedNavigate('/sell')}
            disabled={isTransitioning}
          >
            SELL MY LAPTOP &rsaquo;
          </button>
          <button
            className="cta-btn buy-btn"
            onClick={() => handleAnimatedNavigate('/buy')}
            disabled={isTransitioning}
          >
            BUY A LAPTOP &rsaquo;
          </button>
        </div>
      </div>
      <div className="home-img-container">
        <div className="image-hover-container">
          <img
            src={imgSrc}
            alt="Laptop"
            className={`home-hero-img fade-img${isFading ? ' fading' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
