import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { Modal, Skeleton } from '@shared/components';
import { useBreedImages } from '@breeds/hooks/useBreedImages';
import type { BreedImage } from '@breeds/breeds.types';

const BreedModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleClose = () => {
    navigate(location.state?.backgroundLocation?.pathname || '/breeds', {
      replace: true,
    });
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
        {selectedImage && (
          <div
            className={clsx(
              'h-[250px] sm:h-[300px] md:h-[350px]',
              'flex items-center justify-center',
              'w-full flex-shrink-0'
            )}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage?.id ?? 'Cat'}
              className="max-h-full max-w-full rounded-xl object-contain"
            />
          </div>
        )}

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
                onClick={() => setSelectedImage(image)}
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
                  className="w-16 h-16 rounded object-cover"
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
