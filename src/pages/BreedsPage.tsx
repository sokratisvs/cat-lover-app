import { useLocation, useNavigate } from 'react-router-dom';
import { useRandomBreeds } from '@breeds/hooks/useRandomeBreeds';
import {
  Notification,
  CatGridSkeleton,
  LoadMoreButton,
  CatGrid,
  Card,
} from '@shared/components';

const BreedsPage = () => {
  const {
    data: breeds,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRandomBreeds();

  const navigate = useNavigate();
  const location = useLocation();

  const handleImageBreedClick = (id: string) => {
    navigate(`/breeds/${id}`, {
      state: { backgroundLocation: location.pathname },
    });
  };

  const flattenedBreeds = (breeds?.pages ?? []).flat();

  if (isLoading)
    return (
      <div className="flex flex-col h-full">
        <CatGridSkeleton />
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col h-full justify-center items-center">
        <Notification
          type="error"
          description={error?.message || 'An error occurred'}
        />
      </div>
    );

  return (
    <>
      <CatGrid>
        {flattenedBreeds.map((breed) => {
          if (!breed.image?.url) {
            return null;
          }
          return (
            <Card
              key={`${breed.id}`}
              catId={breed.id}
              imageUrl={breed.image.url}
              onClick={handleImageBreedClick}
              alt="breed"
            />
          );
        })}
      </CatGrid>
      <LoadMoreButton
        onClick={() => fetchNextPage()}
        isLoading={isFetchingNextPage}
        label="Load more breeds"
        disabled={!hasNextPage}
      />
    </>
  );
};

export default BreedsPage;
