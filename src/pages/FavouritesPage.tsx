import { useLocation, useNavigate } from 'react-router-dom';
import {
  CatGridSkeleton,
  LoadMoreButton,
  CatGrid,
  Card,
} from '@shared/components';
import { useFavourites } from '@favourites/hooks/useFavourites';
import { useNotification } from '@/shared/utils/useNotification';
import { Fragment } from 'react';

const FavouritesPage = () => {
  const {
    data: favourites,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFavourites();

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
        {favourites?.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.map((favourite) => {
              if (!favourite?.image?.url) {
                return null;
              }
              return (
                <Card
                  key={`${pageIndex}-${favourite.id}`}
                  catId={favourite.image.id}
                  imageUrl={favourite.image.url}
                  onClick={handleImageCatClick}
                  alt="Cat"
                />
              );
            })}
          </Fragment>
        ))}
      </CatGrid>
      <LoadMoreButton
        onClick={() => fetchNextPage()}
        isLoading={isFetchingNextPage}
        disabled={!hasNextPage}
        label="Load more favourites"
      />
    </>
  );
};

export default FavouritesPage;
