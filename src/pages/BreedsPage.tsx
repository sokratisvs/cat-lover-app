import { useLocation, useNavigate } from 'react-router-dom';
import { useRandomBreeds } from '@breeds/hooks/useRandomeBreeds';
import {
  CatGridSkeleton,
  LoadMoreButton,
  CatGrid,
  Card,
} from '@shared/components';
import { useNotification } from '@/shared/utils/useNotification';

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
  const { error: notifyError } = useNotification();

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

  if (isError) {
    notifyError(`${error?.message}`);
    return null;
  }

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
