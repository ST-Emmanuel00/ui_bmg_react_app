import React, { useEffect, useState } from "react";
import { LuCalendarClock, LuMenu } from "react-icons/lu";

interface DetailsModal {
  isOpen: boolean;
  onClose: () => void;
}

export const DetailsModal: React.FC<DetailsModal> = ({ isOpen, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      const timer = setTimeout(() => setShowModal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!showModal && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 w-full max-w-4xl h-screen max-h-screen overflow-auto transform transition-transform duration-300 ${
          isOpen
            ? "translate-x-0 animate-open"
            : "translate-x-full animate-close"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar */}
        <button
          className="absolute top-2 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6 text-gray-600 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Contenedor con botones */}
        <div className="relative mb-4">
          {/* Menú desplegable para pantallas pequeñas */}
          <div className="block md:hidden mb-4">
            <button
              className="bg-[#F5F5F7] dark:bg-[#2D2D2D] text-gray-900 dark:text-gray-300 hover:bg-[#D3D3D3] dark:hover:bg-[#3E3E3E] transition-colors duration-200 w-full h-10 rounded-md text-sm flex justify-center items-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <LuMenu size={24} />
            </button>

            {/* Menú desplegable */}
            {isMenuOpen && (
              <div className="absolute top-12 right-0 bg-white dark:bg-slate-800 shadow-lg rounded-lg w-full">
                <button
                  className="w-full py-2 px-4 text-left text-gray-900 dark:text-gray-300 hover:bg-[#D3D3D3] dark:hover:bg-[#3E3E3E] transition-colors duration-200"
                  onClick={() => {
                    console.log("Botón 1");
                    setIsMenuOpen(false);
                  }}
                >
                  Factura
                </button>
                <button
                  className="w-full py-2 px-4 text-left text-gray-900 dark:text-gray-300 hover:bg-[#D3D3D3] dark:hover:bg-[#3E3E3E] transition-colors duration-200"
                  onClick={() => {
                    console.log("Botón 2");
                    setIsMenuOpen(false);
                  }}
                >
                  Reserva
                </button>
                <button
                  className="w-full py-2 px-4 text-left text-gray-900 dark:text-gray-300 hover:bg-[#D3D3D3] dark:hover:bg-[#3E3E3E] transition-colors duration-200"
                  onClick={() => {
                    console.log("Botón 3");
                    setIsMenuOpen(false);
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="w-full py-2 px-4 text-left text-gray-900 dark:text-gray-300 hover:bg-[#D3D3D3] dark:hover:bg-[#3E3E3E] transition-colors duration-200"
                  onClick={() => {
                    console.log("Botón 4");
                    setIsMenuOpen(false);
                  }}
                >
                  Modificar
                </button>
              </div>
            )}
          </div>

          {/* Contenedor de botones para pantallas grandes */}
          <div className="hidden md:flex flex-col items-end gap-2 mb-4">
            <div className="bg-[#F2F2F2] dark:bg-[#2D2D2D] p-1 rounded-lg flex gap-2">
              <button
                className="bg-[#F5F5F7] dark:bg-[#3E3E3E] text-gray-900 dark:text-gray-300 hover:bg-[#D3D3D3] dark:hover:bg-[#4A4A4A] transition-colors duration-200 w-32 h-8 rounded-md text-sm"
                onClick={() => console.log("Botón 1")}
              >
                Factura
              </button>
              <button
                className="bg-[#F5F5F7] dark:bg-[#3E3E3E] text-gray-900 dark:text-gray-300 hover:bg-[#D3D3D3] dark:hover:bg-[#4A4A4A] transition-colors duration-200 w-32 h-8 rounded-md text-sm"
                onClick={() => console.log("Botón 2")}
              >
                Reserva
              </button>
              <button
                className="bg-[#F5F5F7] dark:bg-[#3E3E3E] text-gray-900 dark:text-gray-300 hover:bg-[#D3D3D3] dark:hover:bg-[#4A4A4A] transition-colors duration-200 w-32 h-8 rounded-md text-sm"
                onClick={() => console.log("Botón 3")}
              >
                Cancelar
              </button>
              <button
                className="bg-[#F5F5F7] dark:bg-[#3E3E3E] text-gray-900 dark:text-gray-300 hover:bg-[#D3D3D3] dark:hover:bg-[#4A4A4A] transition-colors duration-200 w-32 h-8 rounded-md text-sm"
                onClick={() => console.log("Botón 4")}
              >
                Modificar
              </button>
            </div>
            {/* Línea debajo de los botones */}
            <div className="border-t border-[#CFCFCF] dark:border-[#444444] w-full mb-4"></div>
          </div>
        </div>
        {/* Espacio para fecha */}
        <h2 className="text-lg font-extrabold text-center mb-4 text-white">
          Día, Mes y Año
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Columna izquierda (más pequeña y fondo blanco) */}
          <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
              Detalles Cliente:
            </h3>
            <div className="text-xs mb-2 text-gray-900 dark:text-gray-100">
              <div className="flex mb-1">
                <span className="w-1/2">Nombre del Cliente:</span>
                <span className="w-1/2 text-left font-bold">Johan Pérez</span>
              </div>
              <div className="flex mb-1">
                <span className="w-1/2">Número de Contacto:</span>
                <span className="w-1/2 text-left font-bold">
                  +34 123 456 789
                </span>
              </div>
              <div className="flex">
                <span className="w-1/2">Email (Opcional):</span>
                <span className="w-1/2 text-left font-bold">
                  JoHan.perez@email.com
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
              Confirmación y Estado de la Reserva:
            </h3>
            <div className="text-xs mb-2 text-gray-900 dark:text-gray-100">
              <div className="flex mb-1">
                <span className="w-1/2">Estado de la reserva:</span>
                <span className="w-1/2 text-left font-bold">Confirmada</span>
              </div>
              <div className="flex mb-1">
                <span className="w-1/2">Número de confirmación:</span>
                <span className="w-1/2 text-left font-bold">
                  789871891798798789
                </span>
              </div>
              <div className="flex">
                <span className="w-1/2">
                  Fecha y hora de la última actualización:
                </span>
                <span className="w-1/2 text-left font-bold">10/08/2024</span>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
              Detalles de la Reserva:
            </h3>
            <div className="text-xs mb-2 text-gray-900 dark:text-gray-100">
              <div className="flex mb-1">
                <span className="w-1/2">Fecha:</span>
                <span className="w-1/2 text-left font-bold">
                  15 de Agosto de 2024
                </span>
              </div>
              <div className="flex mb-1">
                <span className="w-1/2">Hora:</span>
                <span className="w-1/2 text-left font-bold">20:00</span>
              </div>
              <div className="flex mb-1">
                <span className="w-1/2">Número de personas:</span>
                <span className="w-1/2 text-left font-bold">4 personas</span>
              </div>
              <div className="flex">
                <span className="w-1/2">Tipo de mesa:</span>
                <span className="w-1/2 text-left font-bold">
                  Junto a la ventana
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
              Información BarManager:
            </h3>
            <div className="text-xs mb-2 text-gray-900 dark:text-gray-100">
              <div className="flex mb-1">
                <span className="w-1/2">Nombre del restaurante:</span>
                <span className="w-1/2 text-left font-bold">
                  [Nombre del restaurante]
                </span>
              </div>
              <div className="flex mb-1">
                <span className="w-1/2">Dirección del restaurante:</span>
                <span className="w-1/2 text-left font-bold">
                  [Dirección del restaurante]
                </span>
              </div>
              <div className="flex">
                <span className="w-1/2">
                  Número de contacto del restaurante:
                </span>
                <span className="w-1/2 text-left font-bold">
                  [Número de contacto]
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
              Detalles de Pago:
            </h3>
            <div className="text-xs mb-2 text-gray-900 dark:text-gray-100">
              <div className="flex mb-1">
                <span className="w-1/2">Método de pago seleccionado:</span>
                <span className="w-1/2 text-left font-bold">
                  Tarjeta De Crédito
                </span>
              </div>
              <div className="flex mb-1">
                <span className="w-1/2">Depósito:</span>
                <span className="w-1/2 text-left font-bold">
                  Si se requiere para confirmar la reserva
                </span>
              </div>
              <div className="flex">
                <span className="w-1/2">Políticas de cancelación:</span>
                <span className="w-1/2 text-left font-bold">
                  24 horas de antelación
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
              Términos y Condiciones:
            </h3>
            <div className="text-xs text-gray-900 dark:text-gray-100">
              <div className="flex mb-1">
                <span className="w-1/2">Términos:</span>
                <span className="w-1/2 text-left font-bold">Aceptados</span>
              </div>
              <div className="flex">
                <span className="w-1/2">Condiciones:</span>
                <span className="w-1/2 text-left font-bold">De acuerdo</span>
              </div>
            </div>
          </div>
          {/* Columna derecha (más grande y fondo gris claro) */}
          <div className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                Preferencias Especiales:
              </h3>
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md text-xs text-gray-900 dark:text-gray-100">
                <ul className="list-disc list-inside mb-2">
                  <li>Peticiónes Especiales</li>
                  <li>Notas Adicionales</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                Registro Reservación
              </h3>
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md text-xs text-gray-900 dark:text-gray-100">
                <div className="flex mb-4 items-start">
                  <div className="mr-2">
                    <LuCalendarClock
                      size={20}
                      className="text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <p className="font-bold">
                      10 de agosto de 2024, 14:00 – Reservación Solicitada:
                    </p>
                    <p>
                      Juan Pérez solicitó una reservación en La Esquina Gourmet
                      para 4 personas, el 15 de agosto de 2024 a las 20:00.
                    </p>
                  </div>
                </div>
                <div className="flex mb-4 items-start">
                  <div className="mr-2">
                    <LuCalendarClock
                      size={20}
                      className="text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <p className="font-bold">
                      10 de agosto de 2024, 14:05 – Confirmación de
                      Disponibilidad:
                    </p>
                    <p>
                      La Esquina Gourmet confirmó la disponibilidad de una mesa
                      junto a la ventana.
                    </p>
                  </div>
                </div>
                <div className="flex mb-4 items-start">
                  <div className="mr-2">
                    <LuCalendarClock
                      size={20}
                      className="text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <p className="font-bold">
                      10 de agosto de 2024, 14:10 – Pago por Adelantado
                      Realizado:
                    </p>
                    <p>
                      Juan Pérez realizó un pago de €20 como depósito para
                      asegurar la reservación.
                    </p>
                  </div>
                </div>
                <div className="flex mb-4 items-start">
                  <div className="mr-2">
                    <LuCalendarClock
                      size={20}
                      className="text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <p className="font-bold">
                      10 de agosto de 2024, 14:15 – Confirmación de la
                      Reservación:
                    </p>
                    <p>
                      La reservación fue confirmada oficialmente y se generó el
                      número de confirmación #123456789.
                    </p>
                  </div>
                </div>
                <div className="flex mb-4 items-start">
                  <div className="mr-2">
                    <LuCalendarClock
                      size={20}
                      className="text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <p className="font-bold">
                      15 de agosto de 2024, 19:45 – Recordatorio de la
                      Reservación:
                    </p>
                    <p>
                      Un recordatorio fue enviado a Juan Pérez 15 minutos antes
                      de la hora programada.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-2">
                    <LuCalendarClock
                      size={20}
                      className="text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <p className="font-bold">
                      15 de agosto de 2024, 20:00 – Llegada al Restaurante:
                    </p>
                    <p>
                      Juan Pérez y su grupo llegaron al restaurante y fueron
                      recibidos por el personal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
