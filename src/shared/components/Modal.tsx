import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { TriangleAlertIcon } from '@/components/icons';
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
        <ErrorBoundary
          fallback={
            <div
              className={clsx(
                'flex flex-col items-center justify-center',
                'w-full min-h-[400px]',
                'text-center p-4',
                'text-foreground'
              )}
            >
              <TriangleAlertIcon
                className={clsx(
                  'w-24 h-24',
                  'fill-muted stroke-muted-foreground'
                )}
              />
              <p className="text-lg">{fallbackMessage}</p>
            </div>
          }
        >
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
