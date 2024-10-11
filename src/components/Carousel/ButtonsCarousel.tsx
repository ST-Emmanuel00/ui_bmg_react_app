import React from "react";
import { LuNewspaper } from "react-icons/lu";

interface ButtonsCarouselProps {
  showCarousel: boolean;
  setShowCarousel: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonsCarousel: React.FC<ButtonsCarouselProps> = ({ showCarousel, setShowCarousel }) => {
  return (
    <>
      {/* Botón de Promotions & News para pantallas grandes */}
      <button
        className="fixed bottom-16 right-4 flex items-center text-sm font-medium border  
          dark:text-slate-300 dark:border-gray-600 px-2 py-1 rounded-full transition-all duration-300 ease-in-out 
          bg-white dark:bg-gray-800 text-black dark:hover:bg-gray-700 shadow-lg z-50 group 
          md:top-16 md:right-10 md:bottom-auto md:left-auto"
        onClick={() => setShowCarousel(!showCarousel)}
      >
        <LuNewspaper />
        <span className="whitespace-nowrap overflow-hidden hover:ml-2 max-w-0 group-hover:max-w-xs transition-all duration-300">
          Promotions & News
        </span>
      </button>

      {/* Botón de Promotions & News para móviles */}
      <button
        className="fixed bottom-16 right-4 flex items-center text-sm font-medium border  
          dark:text-slate-300 dark:border-gray-600 px-2 py-1 rounded-full transition-all duration-300 ease-in-out 
          bg-yellow-500 text-black shadow-lg z-50 group 
          md:hidden" // Solo visible en móviles
        onClick={() => setShowCarousel(!showCarousel)}
      >
        <LuNewspaper  />
        <span className="whitespace-nowrap overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-300">
          Promotions & News
        </span>
      </button>
    </>
  );
};

export default ButtonsCarousel;
