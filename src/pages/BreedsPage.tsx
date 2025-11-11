import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useRandomBreeds } from '@breeds/hooks/useRandomeBreeds';
import {
  SkeletonLayout,
  Notification,
  LoadMoreButton,
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
    navigate(`/breeds/${id}`, { state: { backgroundLocation: location } });
  };

  const flattenedBreeds = (breeds?.pages ?? []).flat();

  if (isLoading)
    return (
      <div className="flex flex-col h-full">
        <SkeletonLayout />
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
      <div
        className={clsx(
          'grid',
          'grid-cols-1',
          'sm:grid-cols-2',
          'md:grid-cols-3',
          'lg:grid-cols-4',
          'xl:grid-cols-5',
          'gap-6',
          'justify-items-center',
          'items-start',
          'flex-1',
          'min-h-full'
        )}
      >
        {flattenedBreeds.map((breed) => {
          if (!breed.image?.url) {
            return null;
          }
          return (
            <div
              key={breed.id}
              onClick={() => handleImageBreedClick(breed.id)}
              className={clsx(
                'cursor-pointer',
                'rounded-lg',
                'overflow-hidden',
                'bg-gray-800',
                'hover:bg-gray-700',
                'transition',
                'shadow-md'
              )}
            >
              <img
                src={breed.image.url}
                alt="Cat"
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
          );
        })}
      </div>
      {hasNextPage && (
        <LoadMoreButton
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          label="Load more breeds"
        />
      )}
    </>
  );
};

export default BreedsPage;
