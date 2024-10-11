import { ReactNode } from "react";
import { FiPlusCircle } from "react-icons/fi";

interface ClickableButtonProps {
  value: string;
  icon?: ReactNode;
  onClick: () => void;
}

export const ClickableButton: React.FC<ClickableButtonProps> = ({
  value,
  icon = <FiPlusCircle size={20} />,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center whitespace-nowrap rounded dark:bg-[#EAB308] bg-gray-900 mr-8 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 sm:px-5"
    >
      {value}
      <span className="pl-2">{icon}</span>
    </button>
  );
};
