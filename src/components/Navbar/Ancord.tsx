import { ReactNode, useState } from "react";
import ConfimationRequest, { buttonPropsModal } from "../DetailsModal/ConfimationRequest";

interface AncordProps {
  handleClick?: () => void;
  children?: ReactNode;
  link: string;
  message: string;
  paragraph?: string;
}

const Ancord: React.FC<AncordProps> = ({  children,  link, message, paragraph }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    // handleClick();
  };


  return (
    <>
      <ConfimationRequest
        toLink=""
        isOpen={isModalOpen}
        handleModal={toggleModal}
        link={link}
        message={message}
        paragraph={paragraph}
      />
      <button
        onClick={toggleModal}
        className="flex items-center justify-center px-2 py-2 text-slate-600 rounded-full dark:hover:bg-slate-800 hover:bg-white transition duration-200"
      >
        {children}
      </button>
    </>
  );
};

export default Ancord;
