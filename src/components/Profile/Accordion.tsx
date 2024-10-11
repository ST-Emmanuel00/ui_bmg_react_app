import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IconButton } from "./IconButton";
import { Children } from "../../types";
import { Container } from "../common/Container";

interface AccordionProps extends Children {
  title: string;
  isLoading: boolean
  onClick?: () => void;
}

export const Accordion: React.FC<AccordionProps> = ({
  title = "Espacio para información personal",
  children,
  isLoading,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container isLoading={isLoading}>
      <div className="w-full p-4 sm:pl-12 sm:mx-2 rounded-lg">
        <button
          className="faq-btn flex w-full text-left items-center justify-between"
          onClick={toggleAccordion}
        >
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
              {title}
            </h4>
          </div>
          {onClick && <IconButton icon={<FiEdit onClick={onClick} />} />}
          <div className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-primary/5 dark:hover:bg-white/5">
            <FaAngleDown
              className={`transform transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              size={15}
            />
          </div>
        </button>
        {isOpen && (
            <div className="space-y-2">{children}</div>
        )}
      </div>
    </Container>
  );
};
