import React from "react";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  title?: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed inset-0 bg-gray-500 opacity-75"
          onClick={() => setIsOpen(false)} // Close modal on background click
        ></div>

        <div className="modal-container w-full sm:max-w-2xl sm:mx-auto sm:p-0 bg-white rounded-badge overflow-hidden z-50">
          <div className="modal-content max-h-screen sm:max-h-[80vh] overflow-y-auto p-0">
            <h1 className="justify-center text-center">{title}</h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
