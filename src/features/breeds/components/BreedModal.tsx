import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal } from '@shared/components';
import { useCatImage } from '@cats/hooks/useCatImage';

const BreedModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isError } = useCatImage(id ?? '');

  const handleClose = () => {
    navigate(location.state?.backgroundLocation?.pathname || '/breeds', {
      replace: true,
    });
  };

  if (isLoading) return null;
  if (isError || !data) return null;

  const breed = data.breeds?.[0];

  return (
    <Modal isOpen={true} onClose={handleClose} hasCloseBtn>
      <div className="flex flex-col items-center gap-4">
        <img
          src={data.url}
          alt={breed?.name ?? 'Cat'}
          className="max-h-[60vh] rounded-xl object-contain"
        />
        {breed && (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-1">{breed.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {breed.temperament}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BreedModal;
