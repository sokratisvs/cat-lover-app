import CatGrid from './CatGrid';
import Skeleton from './Skeleton';

export interface CatGridSkeletonProps {
  count?: number;
}

const CatGridSkeleton = ({ count = 10 }: CatGridSkeletonProps) => {
  return (
    <CatGrid>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          size="lg"
          className="w-full h-48 bg-gray-700 rounded-lg shadow-md"
        />
      ))}
    </CatGrid>
  );
};

export default CatGridSkeleton;
