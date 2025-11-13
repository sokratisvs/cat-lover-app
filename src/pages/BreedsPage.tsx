import { useRandomBreeds } from '@breeds/hooks/useRandomeBreeds';
import {
  CatGridSkeleton,
  ActionButton,
  CatGrid,
  Card,
  ErrorFallback,
} from '@shared/components';
import { useModalNavigation } from '@shared/utils/useModalNavigation';

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

  const { openModal } = useModalNavigation();

  const handleImageBreedClick = (id: string) => {
    openModal('breeds', id);
  };

  const flattenedBreeds = (breeds?.pages ?? []).flat();

  if (isLoading)
    return (
      <div className="flex flex-col h-full">
        <CatGridSkeleton />
      </div>
    );

  if (isError) {
    return (
      <ErrorFallback message={error?.message || 'Failed to load breeds'} />
    );
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
              onClick={() => handleImageBreedClick(breed.id)}
              alt="breed"
            />
          );
        })}
      </CatGrid>
      <ActionButton
        onClick={() => fetchNextPage()}
        isLoading={isFetchingNextPage}
        label="Load more breeds"
        disabled={!hasNextPage}
      />
    </>
  );
};

export default BreedsPage;
