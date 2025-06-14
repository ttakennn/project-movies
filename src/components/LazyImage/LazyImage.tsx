import './LazyImage.scss';

import { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage = ({ src, alt, className = '' }: LazyImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className={`lazy-image-wrapper ${imageLoaded ? 'loaded' : ''} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleImageLoad}
        className="lazy-image"
      />
      {!imageLoaded && (
        <div className="lazy-image-skeleton" />
      )}
    </div>
  );
};

export default LazyImage; 