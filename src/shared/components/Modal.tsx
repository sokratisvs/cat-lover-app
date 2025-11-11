import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { ErrorBoundary } from './ErrorBoundary';
import clsx from 'clsx';

export interface ModalProps {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  fallbackMessage: string;
}

const Modal = ({
  isOpen,
  hasCloseBtn = true,
  onClose,
  children,
  fallbackMessage,
}: ModalProps) => {
  const handleClose = () => {
    onClose?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <VisuallyHidden.Root>
          <DialogTitle>Modal Title</DialogTitle>
        </VisuallyHidden.Root>
        {hasCloseBtn && <DialogClose onClick={handleClose}></DialogClose>}
        <ErrorBoundary fallback={<div>{fallbackMessage}</div>}>
          <div
            className={clsx(
              'flex flex-col items-center',
              'gap-4 w-full min-h-[400px]',
              'overflow-auto p-4'
            )}
          >
            {children}
          </div>
        </ErrorBoundary>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
