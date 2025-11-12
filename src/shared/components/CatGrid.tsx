import type { ReactNode } from 'react';
import clsx from 'clsx';

interface CatGridProps {
  children: ReactNode;
}

const CatGrid = ({ children }: CatGridProps) => {
  return (
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
      {children}
    </div>
  );
};
export default CatGrid;
