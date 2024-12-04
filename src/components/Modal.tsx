interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop:blur-2xl" onClick={onClose}>
      <div className="relative bg-black rounded-lg border border-gray-500 p-6 w-3/4 max-w-md">
        <button
          className="absolute top-2 right-2 w-10 bg-red-50 rounded-md text-5xl cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
