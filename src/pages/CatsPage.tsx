import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useRandomCats } from '@cats/hooks/useRandomeCats';
import { SkeletonLayout, Loader } from '@shared/components';

const CatsPage = () => {
  const {
    data: cats,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRandomCats();

  const navigate = useNavigate();
  const location = useLocation();

  const handleImageCatClick = (id: string) => {
    navigate(`/breeds/${id}`, { state: { backgroundLocation: location } });
  };

  const flattenedCats = (cats?.pages ?? []).flat();

  if (isLoading)
    return (
      <>
        <SkeletonLayout />
      </>
    );

  if (isError)
    return (
      <div className="col-span-full text-center text-red-500">
        Failed to load images
      </div>
    );

  return (
    <>
      {flattenedCats.map((cat) => (
        <div
          key={cat.id}
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
      ))}
      {hasNextPage && (
        <button
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className={clsx(
            'col-span-full',
            'mt-4',
            'px-4 py-2',
            'rounded-lg',
            'bg-indigo-600',
            'hover:bg-indigo-500',
            'disabled:bg-indigo-400',
            'disabled:cursor-progress',
            'text-white',
            'font-medium',
            'transition'
          )}
        >
          {isFetchingNextPage ? <Loader /> : 'Load more cats'}
        </button>
      )}
    </>
  );
};

export default CatsPage;
