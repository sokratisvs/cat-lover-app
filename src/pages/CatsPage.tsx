import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import {
  SkeletonLayout,
  Notification,
  LoadMoreButton,
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
        {cats?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.map((cat) => {
              if (!cat?.url) {
                return null;
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
        <LoadMoreButton
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          label="Load more cats"
        />
      )}
    </>
  );
};

export default CatsPage;
