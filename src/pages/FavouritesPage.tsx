import { useLocation, useNavigate } from 'react-router-dom';
import {
  Notification,
  CatGridSkeleton,
  LoadMoreButton,
  CatGrid,
  Card,
} from '@shared/components';
import { useFavourites } from '@favourites/hooks/useFavourites';
import React from 'react';

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

  if (isError)
    return (
      <>
        <Notification
          type="error"
          description={error?.message || 'An error occured'}
        />
      </>
    );

  return (
    <>
      <CatGrid>
        {favourites?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
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
          </React.Fragment>
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
