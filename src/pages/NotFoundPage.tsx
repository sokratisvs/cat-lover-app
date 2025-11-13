import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { CatIcon } from '@/components/icons';

const NotFoundPage = () => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center',
        'min-h-[70vh] text-center px-4'
      )}
    >
      <div className="text-6xl mb-4">
        <CatIcon className="h-7 w-7" />
      </div>

      <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>

      <p className="text-gray-500 max-w-md mb-6">
        Looks like the page wandered off… just like a curious cat.
      </p>

      <Link
        to="/cats"
        className={clsx(
          'px-6 py-2 rounded-lg',
          'bg-blue-600 text-white',
          'hover:bg-blue-700 transition-colors'
        )}
      >
        Back to Cats
      </Link>
    </div>
  );
};

export default NotFoundPage;
