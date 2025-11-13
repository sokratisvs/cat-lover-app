import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { Modal, Skeleton } from '@shared/components';
import { FavouriteButton } from '@/features/favourites/components/FavouriteButton';
import { useCatImage } from '@cats/hooks/useCatImage';
import { useModalNavigation } from '@shared/utils/useModalNavigation';

const CatModal = () => {
  const { id } = useParams();
  const { closeModal } = useModalNavigation();

  const { data, isLoading, isError } = useCatImage(id ?? '');

  const handleClose = () => {
    closeModal('/cats');
  };

  let content;

  if (isLoading) {
    content = (
      <div
        className={clsx(
          'h-[250px] sm:h-[300px] md:h-[350px]',
          'flex items-center justify-center',
          'w-full flex-shrink-0'
        )}
      >
        <Skeleton className="w-full h-full" />
      </div>
    );
  } else if (isError || !data) {
    content = (
      <div
        className={clsx(
          'w-full min-h-[350px]',
          'flex items-center justify-center',
          'text-center p-4',
          'text-foreground'
        )}
      >
        <p className="text-lg">Could not load image</p>
      </div>
    );
  } else {
    const breed = data.breeds?.[0];
    content = (
      <>
        <div
          className={clsx(
            'h-[250px] sm:h-[300px] md:h-[350px]',
            'flex items-center justify-center w-full flex-shrink-0',
            'relative'
          )}
        >
          <img
            src={data.url}
            alt={breed?.name ?? 'Cat'}
            className="max-h-full max-w-full rounded-xl object-contain"
          />
          <div
            className={clsx(
              'absolute bottom-0 right-4 z-10',
              'bg-background/80 backdrop-blur-sm',
              'rounded-md shadow-lg'
            )}
          >
            <FavouriteButton imageId={data.id} />
          </div>
        </div>
        {breed && (
          <div className="text-center text-gray-800 dark:text-gray-400">
            <h2 className="text-xl font-semibold mb-1">{breed.name}</h2>
            <p className="text-sm">{breed.temperament}</p>
          </div>
        )}
      </>
    );
  }

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      hasCloseBtn
      fallbackMessage="Failed to load cat details."
    >
      {content}
    </Modal>
  );
};

export default CatModal;
