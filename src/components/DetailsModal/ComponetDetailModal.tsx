import React, { useEffect, useState } from "react";

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DetailsModal: React.FC<DetailsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    isOpen ? setShowModal(true) : setTimeout(() => setShowModal(false), 300);
  }, [isOpen]);

  if (!showModal && !isOpen) return null;

  const buttonClasses =
    "w-32 h-8 rounded-md text-sm bg-[#F5F5F7] dark:bg-[#3E3E3E] text-gray-900 dark:text-gray-300 hover:bg-[#D3D3D3] dark:hover:bg-[#4A4A4A] transition-colors duration-200";

  const menuButtons = ["Factura", "Reserva", "Cancelar", "Modificar"];

  return (
    <div
      className={`fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 w-full max-w-4xl h-screen max-h-screen overflow-auto transition-transform duration-300 ${
          isOpen
            ? "translate-x-0 animate-open"
            : "translate-x-full animate-close"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="relative mb-4">
          {/* Mobile Menu */}
          <div className="block md:hidden mb-4">
            <button
              className="w-full h-10 flex justify-center items-center rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Menu
            </button>
            {isMenuOpen && (
              <div className="absolute top-12 right-0 bg-white dark:bg-slate-800 shadow-lg rounded-lg w-full">
                {menuButtons.map((label) => (
                  <button
                    key={label}
                    className="w-full py-2 px-4 text-left hover:bg-gray-200 dark:hover:bg-[#3E3E3E]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-col items-end gap-2 mb-4">
            <div className="bg-[#F2F2F2] dark:bg-[#2D2D2D] p-1 rounded-lg flex gap-2">
              {menuButtons.map((label, index) => (
                <button
                  key={index}
                  className={buttonClasses}
                  onClick={() => console.log(`Botón ${index + 1}`)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="border-t w-full mb-4"></div>
          </div>
        </div>

        <h2 className="text-lg font-extrabold text-center mb-4 text-white">
          Day, Month and Year
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          {[
            {
              title: "Details",
              details: [["Client Name", "Johan Pérez"]],
            },
            {
              title: "Booking Confirmation and Status",
              details: [["Booking status", "Confirmed"]],
            },
          ].map((section, idx) => (
            <div
              key={idx}
              className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-4 rounded-lg"
            >
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                {section.title}:
              </h3>
              <div className="text-xs mb-2 text-gray-900 dark:text-gray-100">
                {section.details.map(([label, value]) => (
                  <div key={label} className="flex mb-1">
                    <span className="w-1/2">{label}:</span>
                    <span className="w-1/2 text-left font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
