import { useLocation, useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { Modal, Skeleton } from '@shared/components';
import { useCatImage } from '@cats/hooks/useCatImage';

const CatModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isError } = useCatImage(id ?? '');

  const handleClose = () => {
    navigate(location.state?.backgroundLocation?.pathname || '/cats', {
      replace: true,
    });
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
          'text-center p-4'
        )}
      >
        Could not load image
      </div>
    );
  } else {
    const breed = data.breeds?.[0];
    content = (
      <>
        <div
          className={clsx(
            'h-[250px] sm:h-[300px] md:h-[350px]',
            'flex items-center justify-center w-full flex-shrink-0'
          )}
        >
          <img
            src={data.url}
            alt={breed?.name ?? 'Cat'}
            className="max-h-full max-w-full rounded-xl object-contain"
          />
        </div>
        {breed && (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-1">{breed.name}</h2>
            <p className="text-sm text-gray-800 dark:text-gray-400">
              {breed.temperament}
            </p>
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
