import { MouseEvent, ElementType } from 'react';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../../Utils';

interface LinkButtonProps {
  to?: string;
  label: string;
  className?: string;
  isSelected?: boolean;
  icon?: ElementType;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'basic' | 'yellow' | 'black'; // Cambiado a 'type' con las opciones correspondientes
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  to,
  label,
  className = '',
  icon: Icon,
  isSelected = false,
  onClick,
  type = 'basic' // El tipo por defecto es 'basic'
}) => {
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    } else if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  const typeClass = type === 'yellow'
    ? 'bg-yellow-500 text-white hover:bg-yellow-600 border-yellow-500 dark:text-white'
    : type === 'black'
    ? 'bg-black text-white dark:text-black dark:bg-[#EAB308] border-[#EAB308] dark:text-white ' 
    : 'bg-transparent text-black hover:bg-slate-100 dark:hover:bg-gray-700 dark:text-slate-300';

  return (
    <button
      onClick={handleClick}
      className={`ml-2 flex items-center text-sm font-medium border border-slate-300  dark:border-gray-600 px-3 py-1 rounded-full 
                  transition-colors duration-300 ease-in-out ${isSelected ? "text-[#EAB308] " : ""} ${typeClass} ${className}`}
    >
      {Icon && <Icon className="mr-2" />}
      <span className="text-sm font-semibold">{capitalizeFirstLetter(label)}</span>
    </button>
  );
};
