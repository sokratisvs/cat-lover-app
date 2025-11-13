import {
  CatGridSkeleton,
  CatGrid,
  Card,
  ErrorFallback,
} from '@shared/components';
import { useFavourites } from '@favourites/hooks/useFavourites';
import { useModalNavigation } from '@shared/utils/useModalNavigation';

const FavouritesPage = () => {
  const { data: favourites, isLoading, isError, error } = useFavourites();

  const { openModal } = useModalNavigation();

  const handleImageCatClick = (id: string) => {
    openModal('cats', id);
  };

  if (isLoading)
    return (
      <>
        <CatGridSkeleton />
      </>
    );

  if (isError) {
    return (
      <ErrorFallback message={error?.message || 'Failed to load favourites'} />
    );
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
