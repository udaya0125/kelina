import React, { useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductImageZoom = ({ images, initialIndex = 0 }) => {
  const apiUrl = import.meta.env.VITE_APP_URL

  const [displayImageIndex, setDisplayImageIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomPosition({ x, y });
    }
  };

  const nextImage = () => {
    setDisplayImageIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };

  const prevImage = () => {
    setDisplayImageIndex((prevIndex) => 
      (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className='sm:w-[50%] w-full p-10 relative'>
      <div className='relative w-full h-[300px] flex justify-center items-center'>
        <div 
          className='relative w-[75%] h-[300px] overflow-hidden'
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            ref={imageRef}
            src={`${apiUrl}/${images[displayImageIndex]?.image_path}`}
            className='w-full h-full object-contain'
            alt={`Product image ${displayImageIndex + 1}`}
            onError={(e)=>{e.target.onerror = null; e.target.src='https://placehold.co/600x600'}}
          />
          {isZoomed && images[displayImageIndex]?.image_path && (
            <div 
              className='absolute inset-0'
              style={{
                backgroundImage: `url(${apiUrl}/${images[displayImageIndex].image_path})`,
                backgroundPosition: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '250%',
              }}
            />
          )}
        </div>
        <div className='flex justify-between absolute w-full top-[50%] px-2'>
          <button onClick={prevImage} className='hover:scale-110 transition duration-300'>
            <FaChevronLeft className='text-tertiary text-xl'/>
          </button>
          <button onClick={nextImage} className='hover:scale-110 transition duration-300'>
            <FaChevronRight className='text-tertiary text-xl'/>
          </button>
        </div>
      </div>
      <div className='flex gap-3 overflow-x-scroll mt-6'>
        {images.map((item, index) => (
          <div 
            key={index} 
            className={`w-[33%] cursor-pointer border-2 rounded-md overflow-hidden flex justify-center items-center ${
              displayImageIndex === index ? 'border-tertiary' : 'border-transparent'
            }`} 
            onClick={() => setDisplayImageIndex(index)}
          >
            <img 
              src={`${apiUrl}/${item.image_path}`}
              alt={`Thumbnail ${index + 1}`}
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://placehold.co/200x200';
              }}
            />
          </div> 
        ))}
      </div>
    </div>
  );
};

export default ProductImageZoom;