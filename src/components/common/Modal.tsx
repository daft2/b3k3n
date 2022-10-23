import { X } from "lucide-react";
import React from "react";

type Props = {
  isOpen: boolean;
  children?: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ isOpen = false, onClose, children }: Props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(isOpen);

  React.useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  return (
    <div
      className={`relative z-[100] ${!isModalOpen && "invisible"}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-end">
                <button onClick={onClose}>
                  <X />
                </button>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
