import React, { useRef, useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal = ({
  isOpen,
  hasCloseBtn = true,
  onClose,
  children,
}: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (isOpen && !modal.open) {
      modal.showModal();
    } else if (!isOpen && modal.open) {
      modal.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose?.();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = modalRef.current;
    if (dialog && event.target === dialog) {
      handleClose();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') handleClose();
  };

  return (
    <dialog
      ref={modalRef}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      className={`
        backdrop:bg-black/50
        backdrop:backdrop-blur-sm
        p-0 m-0 bg-transparent border-none
        [&[open]]:flex 
        [&[open]]:items-center 
        [&[open]]:justify-center
        [&[open]]:w-full
        [&[open]]:h-full
      `}
    >
      <div
        className={`
          relative bg-white dark:bg-neutral-900
          rounded-2xl shadow-2xl
          max-w-lg w-[90%] mx-auto p-6
          animate-in fade-in duration-200
        `}
      >
        {hasCloseBtn && (
          <button
            type="button"
            onClick={handleClose}
            className={`
              absolute top-3 right-3
              text-gray-500 hover:text-gray-700
              dark:text-gray-400 dark:hover:text-gray-200
              transition-colors text-sm font-medium
            `}
          >
            ✕
          </button>
        )}
        <div className="text-gray-800 dark:text-gray-100">{children}</div>
      </div>
    </dialog>
  );
};

export default Modal;
