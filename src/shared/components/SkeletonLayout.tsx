import { Skeleton } from '@shared/components';

const SkeletonLayout = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} />
      ))}
    </>
  );
};
export default SkeletonLayout;
