import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import {
  SkeletonLayout,
  Loader,
  ErrorBoundary,
  Notification,
} from '@shared/components';
import { useRandomCats } from '@cats/hooks/useRandomeCats';
import React from 'react';

const CatsPage = () => {
  const {
    data: cats,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRandomCats();

  const navigate = useNavigate();
  const location = useLocation();

  const handleImageCatClick = (id: string) => {
    navigate(`/cats/${id}`, { state: { backgroundLocation: location } });
  };

  if (isLoading)
    return (
      <>
        <SkeletonLayout />
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
    <ErrorBoundary
      fallback={
        <Notification type="error" description="Failed to load cat content." />
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
          {cats?.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.map((cat) => {
                if (!cat?.url) {
                  return null; // Skip rendering if no image URL
                }
                return (
                  <div
                    key={`${pageIndex}-${cat.id}`}
                    onClick={() => handleImageCatClick(cat.id)}
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
                      src={cat.url}
                      alt="Cat"
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>
                );
              })}
            </React.Fragment>
          ))}
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
              {isFetchingNextPage ? <Loader /> : 'Load more cats'}
            </button>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default CatsPage;
