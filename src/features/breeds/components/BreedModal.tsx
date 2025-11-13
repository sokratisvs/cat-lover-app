import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { Modal, Skeleton } from '@shared/components';
import { useBreedImages } from '@breeds/hooks/useBreedImages';
import { useModalNavigation } from '@shared/utils/useModalNavigation';
import type { BreedImage } from '@breeds/breeds.types';

const BreedModal = () => {
  const { id } = useParams();
  const { openModal, closeModal } = useModalNavigation();
  const { data, isLoading, isError } = useBreedImages(id ?? '');

  const firstImage: BreedImage | undefined = data?.[0];
  const [selectedImage, setSelectedImage] = useState<BreedImage | undefined>(
    firstImage
  );

  useEffect(() => {
    if (firstImage) {
      setSelectedImage(firstImage);
    }
  }, [firstImage]);

  const clickHandler = (image: BreedImage) => {
    setSelectedImage(image);
    if (image.id) {
      openModal('cats', image.id);
    }
  };

  const handleClose = () => {
    closeModal('/breeds');
  };

  let content;

  if (isLoading) {
    content = (
      <>
        <div
          className={clsx(
            'h-[250px] sm:h-[300px] md:h-[350px]',
            'flex items-center justify-center',
            'w-full flex-shrink-0'
          )}
        >
          <Skeleton className="w-full h-full" />
        </div>
        <div
          className={clsx(
            'h-[80px] sm:h-[100px]',
            'flex flex-wrap justify-center',
            'gap-2 w-full flex-shrink-0'
          )}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="w-8 h-8" />
          ))}
        </div>
      </>
    );
  } else if (isError || !data || data.length === 0) {
    content = (
      <div
        className={clsx(
          'w-full min-h-[350px]',
          'flex items-center justify-center text-center',
          'p-4'
        )}
      >
        Something went wrong. No images were returned.
      </div>
    );
  } else {
    content = (
      <>
        <div
          className={clsx(
            'h-[80px] sm:h-[100px]',
            'flex flex-wrap justify-center',
            'gap-2 w-full flex-shrink-0'
          )}
        >
          {data.map((image) => {
            const isActive = image.id === selectedImage?.id;
            return (
              <button
                key={image.id}
                type="button"
                onClick={() => clickHandler(image)}
                className={clsx(
                  'rounded',
                  'focus:outline-none',
                  'focus:ring-2',
                  'focus:ring-offset-2',
                  isActive ? 'ring-2 ring-blue-500 ring-offset-2' : 'ring-0'
                )}
              >
                <img
                  src={image.url}
                  alt={image?.id ?? 'Cat'}
                  className="w-32 h-32 rounded object-cover"
                  width={32}
                  height={32}
                />
              </button>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      hasCloseBtn
      fallbackMessage="Could not load breed images."
    >
      {content}
    </Modal>
  );
};

export default BreedModal;
