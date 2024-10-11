import React, { ReactNode } from "react";
import { MdClose } from "react-icons/md"; // Icon for closing the modal
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"; // Icons for buttons
import { Link } from "react-router-dom";

export interface buttonProps {
  label: string;
  icon?: ReactNode;
}

export interface buttonPropsModal {
  buttons: buttonProps[];
}

interface ConfirmationRequestProps {
  toLink: string;
  isOpen: boolean;
  handleModal: () => void;
  link?: string | undefined;
  message: string;
  paragraph?: string;
  buttonModal?: buttonPropsModal;
}

const ConfirmationRequest: React.FC<ConfirmationRequestProps> = ({
  isOpen,
  toLink,
  handleModal,
  buttonModal,
  link,
  message = "Are you sure you want to go to this link",
  paragraph = "Here you can add additional information or details about what will happen if you choose to proceed.",
}) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300"
          onClick={handleModal}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 w-full max-w-lg h-auto max-h-[80vh] overflow-auto transform transition-transform duration-300 relative"
            onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
          >
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none"
              onClick={handleModal}
              aria-label="Close modal"
            >
              <MdClose className="w-6 h-6" />
            </button>

            {/* Modal content */}
            <div className="mt-2 mb-2">
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 flex items-center">
                {buttonModal?.buttons[0].icon}
                {message}
              </h2>
              <div className="flex justify-center items-center w-full mb-2"></div>

              {paragraph && (
                <p className="text-gray-400 dark:text-gray-300 mb-2">
                  {paragraph}
                </p>
              )}

              <div className="flex justify-end space-x-4 mt-4">
                {buttonModal
                  ? buttonModal.buttons.map((button, index) => (
                      <Link
                        to={toLink} // Usando toLink en el atributo to
                        key={index}
                        className="py-2 px-6 text-base rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors duration-200 flex items-center bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-300 hover:bg-yellow-500 dark:hover:bg-yellow-500 hover:text-white dark:hover:text-white"
                        onClick={handleModal}
                      >
                        {button.icon}
                        {button.label}
                      </Link>
                    ))
                  :  <><a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleModal}
                    className="py-2 px-6 text-base rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors duration-200 flex items-center bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-300 hover:bg-yellow-500 dark:hover:bg-yellow-500 hover:text-white dark:hover:text-white"
                  >
                    <AiOutlineCheckCircle className="w-5 h-5 mr-2" />
                    Accept
                  </a><button
                    onClick={handleModal}
                    className="py-2 px-6 text-base rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors duration-200 flex items-center bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-300 hover:bg-yellow-500 dark:hover:bg-yellow-500 hover:text-white dark:hover:text-white"
                  >
                      <AiOutlineCloseCircle className="w-5 h-5 mr-2" />
                      Decline
                    </button></>}

                {/* Default Accept/Decline buttons */}
               
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationRequest;
