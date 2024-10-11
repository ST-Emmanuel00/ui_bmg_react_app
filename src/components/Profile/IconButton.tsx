import { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, onClick }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick;
      }}
      className="ml-2 flex items-center justify-center w-10 h-10 rounded-lg hover:bg-primary/5 dark:hover:bg-white/5"
    >
      {icon}
    </button>
  );
};
