import React, { useState, useEffect } from 'react';
import { PageTitle } from '../common/PageTitle';

interface Slide {
  id: number;
  text: string;
}
const CarouselSlide: React.FC<{ slide: Slide; isActive: boolean }> = ({ slide, isActive }) => (
  <div
    className={`rounded-3xl bg-slate-200 flex justify-center items-center h-40 min-w-full flex-shrink-0 p-4 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}
  >
    <h2 className="text-lg font-semibold text-center">{slide.text}</h2>
  </div>
);


const Carousel: React.FC = () => {
  const slides: Slide[] = [
    { id: 1, text: 'Current Promotions and Updates' },
    { id: 2, text: 'Current Promotions and Updates' },
    { id: 3, text: 'Current Promotions and Updates' },
    { id: 4, text: 'Current Promotions and Updates' },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);
    return () => clearInterval(intervalId);
  }, [slides.length]);

  const goToNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  const goToPrevious = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => setTouchStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => setTouchEnd(e.touches[0].clientX);

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      goToNext();
    } else if (touchStart - touchEnd < -50) {
      goToPrevious();
    }
  };

  return (
    <>
      {/* Título de la página */}
      <PageTitle title="For You" />
      <div
        className="relative w-full overflow-hidden px-4 mb-4 rounded-3xl "
      >

        {/* Contenedor del carrusel */}
        <div
          className="flex transition-transform duration-[3000ms] ease-in-out rounded-3xl"
          style={{ transform: `translateX(calc(-${currentIndex * 100}%))` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide) => (
            <CarouselSlide key={slide.id} slide={slide} isActive={currentIndex === slide.id - 1} />
          ))}
        </div>

        {/* Flechas de navegación */}
        {/* <button onClick={goToPrevious} className="absolute left-4 top-[60%] transform -translate-y-1/2 p-2 text-white hover:text-gray-300">
          <FaArrowLeft size={24} />
        </button>
        <button onClick={goToNext} className="absolute right-4 top-[60%] transform -translate-y-1/2 p-2 text-white hover:text-gray-300">
          <FaArrowRight size={24} />
        </button> */}

        {/* Paginación */}
        <div className="absolute bottom-6 right-14 flex space-x-2 mb-2"> {/* Ajuste del margen a la derecha */}
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full border border-gray-300 transition-all duration-300 ${currentIndex === index ? 'bg-white transform scale-125' : 'bg-gray-200 hover:bg-gray-300'}`}
            ></button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;
