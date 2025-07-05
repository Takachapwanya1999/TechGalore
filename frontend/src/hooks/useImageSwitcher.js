import { useState } from 'react';

export default function useImageSwitcher(defaultImg, hoverImg, fadeDuration = 300) {
  const [imgSrc, setImgSrc] = useState(defaultImg);
  const [isFading, setIsFading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const switchToHover = () => {
    if (isHovered) return; // Prevent multiple calls
    setIsHovered(true);
    setIsFading(true);
    
    setTimeout(() => {
      setImgSrc(hoverImg);
      setTimeout(() => {
        setIsFading(false);
      }, 50); // Small delay to ensure smooth transition
    }, fadeDuration / 2);
  };

  const switchToDefault = () => {
    if (!isHovered) return; // Prevent multiple calls
    setIsHovered(false);
    setIsFading(true);
    
    setTimeout(() => {
      setImgSrc(defaultImg);
      setTimeout(() => {
        setIsFading(false);
      }, 50); // Small delay to ensure smooth transition
    }, fadeDuration / 2);
  };

  return {
    imgSrc,
    isFading,
    handleMouseEnter: switchToHover,
    handleMouseLeave: switchToDefault,
  };
} 