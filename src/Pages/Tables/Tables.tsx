import React, { useState } from "react";
import { LuCalendarDays, LuUsers2 } from "react-icons/lu";
import { AiOutlineInfoCircle } from "react-icons/ai"; 
import { DetailsModal } from "../../components/DetailsModal/DetailsModal";
import { Searcher } from "../../components/Table/Searcher";
import { PageTitle } from "../../components/common/PageTitle";
import { Container } from "../../components/common/Container";

interface ReservaMesaProps {
  mesaNumero: number;
  fecha: string;
  hora: string;
  personas: string;
  estado: string;
  toggleEstado: () => void;
}

const ReservaMesa: React.FC<ReservaMesaProps> = ({
  mesaNumero,
  fecha,
  hora,
  personas,
  estado,
  toggleEstado,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const estadoColor = estado === "reservada" ? "bg-red-400" : "bg-green-400";
  const estadoText = estado === "reservada" ? "Reserved" : "Available";

  // Unificar fecha y hora
  const formatearFechaHora = (fecha: string, hora: string) => {
    const partes = fecha.split("-");
    return `${partes[2]}/${partes[1]} - ${hora}`; // DD/MM - HH:MM
  };

  return (
    <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-300 dark:border-gray-700 transition-all duration-300 w-full max-w-xs flex flex-col justify-between">
      {/* Círculo con ícono */}
      <div className="absolute top-4 left-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <LuUsers2 className="w-6 h-6 text-gray-600 dark:text-gray-300" /> {/* Icono dentro del círculo */}
        </div>
      </div>

      {/* Número de mesa y estado */}
      <div className="flex justify-between items-center mb-3 ml-16"> {/* Desplazar contenido hacia la derecha */}
        <span className="text-gray-800 dark:text-white font-semibold">
          Table: {mesaNumero}
        </span>
        <span onClick={toggleEstado} className={`px-2 py-1 text-xs rounded-full ${estadoColor} text-white font-medium cursor-pointer`}>
          {estadoText}
        </span>
        <AiOutlineInfoCircle
          className="w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-300"
          onClick={handleOpenModal}
        />
      </div>

      {/* Detalles de la mesa alineados horizontalmente */}
      <div className="mt-1 text-sm text-gray-700 dark:text-gray-300 flex items-center ml-16"> {/* Ajustar alineación para el ícono */}
        <div className="flex items-center mr-4">
          <LuUsers2 className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-1" />
          <span>{personas} people</span>
        </div>
        <div className="flex items-center">
          <LuCalendarDays className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-1" />
          <span>{formatearFechaHora(fecha, hora)}</span> {/* Fecha y hora unificadas */}
        </div>
      </div>

      {isModalOpen && (
        <DetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

const OpenModalButton: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const [mesas, setMesas] = useState(
    Array(14).fill(null).map((_, index) => ({
      mesaNumero: index + 1,
      fecha: "2024-09-15",
      hora: "19:00",
      personas: "4",
      estado: "reservada",
    }))
  );

  const toggleEstado = (index: number) => {
    setMesas((prevMesas) =>
      prevMesas.map((mesa, i) =>
        i === index
          ? { ...mesa, estado: mesa.estado === "reservada" ? "disponible" : "reservada" }
          : mesa
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Container isLoading={false}>
        <div className="w-full flex items-center justify-between mb-6">
          <PageTitle title="Tables" />
          <div className="w-full max-w-xs ml-12">
            <Searcher searchValue={searchValue} setSearchValue={setSearchValue} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
          {mesas.map((mesa, index) => (
            <ReservaMesa
              key={index}
              mesaNumero={mesa.mesaNumero}
              fecha={mesa.fecha}
              hora={mesa.hora}
              personas={mesa.personas}
              estado={mesa.estado}
              toggleEstado={() => toggleEstado(index)}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default OpenModalButton;
