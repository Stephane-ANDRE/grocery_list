import { IoClose } from "react-icons/io5";
import { useEffect, useRef } from "react";

interface ModalProps {
  onClose: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, message }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Fonction pour fermer la modal lorsque l'utilisateur clique à l'extérieur
  const handleCloseModalOutside = (event: MouseEvent | TouchEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    // Ajouter des écouteurs d'événements pour détecter les clics/tap à l'extérieur de la modal
    document.addEventListener("mousedown", handleCloseModalOutside);
    document.addEventListener("touchstart", handleCloseModalOutside);

    return () => {
      // Nettoyer les écouteurs d'événements lors du démontage du composant
      document.removeEventListener("mousedown", handleCloseModalOutside);
      document.removeEventListener("touchstart", handleCloseModalOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
      <div ref={modalRef} className="bg-orange-400 hover:bg-orange-500 transition px-4 py-2 rounded-lg max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-white">
          <IoClose size={24} />
        </button>
        <div className="p-8">
          <p className="text-xl text-white mb-4">{message}</p>
          {/* Vous pouvez ajouter d'autres éléments de contenu de la modal ici */}
        </div>
      </div>
    </div>
  );
  
};

export default Modal;
