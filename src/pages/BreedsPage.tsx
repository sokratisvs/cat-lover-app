import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useRandomBreeds } from '@breeds/hooks/useRandomeBreeds';
import {
  SkeletonLayout,
  Loader,
  ErrorBoundary,
  Notification,
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
    <ErrorBoundary
      fallback={
        <Notification
          type="error"
          description="Failed to load breed content."
        />
      }
    >
      <div className="flex flex-col h-full">
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
          <div
            className={clsx(
              'fixed bottom-0 left-0 right-0 z-10',
              'bg-white dark:bg-neutral-900',
              'p-4 w-full flex justify-center'
            )}
          >
            <button
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className={clsx(
                'px-4 py-2',
                'rounded-lg',
                'bg-indigo-600',
                'hover:bg-indigo-500',
                'disabled:bg-indigo-400',
                'disabled:cursor-progress',
                'text-white',
                'font-medium',
                'transition',
                'w-full',
                'max-w-xs',
                'flex items-center justify-center'
              )}
            >
              {isFetchingNextPage ? <Loader /> : 'Load more breeds'}
            </button>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default BreedsPage;
