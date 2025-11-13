import { useLocation, useNavigate } from 'react-router-dom';
import { CatGridSkeleton, CatGrid, Card } from '@shared/components';
import { useFavourites } from '@favourites/hooks/useFavourites';
import { useNotification } from '@/shared/utils/useNotification';

const FavouritesPage = () => {
  const { data: favourites, isLoading, isError, error } = useFavourites();

  const navigate = useNavigate();
  const location = useLocation();
  const { error: notifyError } = useNotification();

  const handleImageCatClick = (id: string) => {
    navigate(`/cats/${id}`, {
      state: { backgroundLocation: location.pathname },
    });
  };

  if (isLoading)
    return (
      <>
        <CatGridSkeleton />
      </>
    );

  if (isError) {
    notifyError(`${error?.message}`);
    return null;
  }

  return (
    <>
      <CatGrid>
        {favourites?.map((favourite, index) => {
          if (!favourite?.image?.url) {
            return null;
          }
          return (
            <Card
              key={`${index}-${favourite.id}`}
              catId={favourite.image.id}
              imageUrl={favourite.image.url}
              onClick={handleImageCatClick}
              alt="Cat"
            />
          );
        })}
      </CatGrid>
    </>
  );
};

export default FavouritesPage;
