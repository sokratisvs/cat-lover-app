import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_MAP = {
  sm: 'w-24 h-24',
  md: 'w-32 h-32',
  lg: 'w-48 h-48',
};

const Skeleton = ({ size = 'lg', className = '' }: SkeletonProps) => {
  return (
    <div
      className={`bg-gray-500 rounded animate-pulse ${SIZE_MAP[size]} ${className}`}
    />
  );
};
export default Skeleton;
