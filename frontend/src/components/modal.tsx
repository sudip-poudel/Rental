import { ReactNode, useEffect, useRef } from "react";
import { Button } from "./ui/button";

interface ModalProps {
  children: ReactNode;
  setShowModal: (show: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ children, setShowModal }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowModal]);

  return (
    <div className="bg-slate-700 absolute top-0 left-0 z-30 w-full h-screen bg-opacity-40">
      <div
        className="modal-content w-3/4 h-[65%] mx-auto bg-white rounded"
        ref={modalRef}
      >
        {children}
        <Button
          onClick={() => setShowModal(false)}
          className="block mx-auto -mt-2 mb-3"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default Modal;
