import { Button } from '@/components/ui/button';
import { Loader } from '@shared/components';
import clsx from 'clsx';

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled: boolean;
  label: string;
}

const LoadMoreButton = ({
  onClick,
  isLoading = false,
  disabled = true,
  label,
}: LoadMoreButtonProps) => {
  return (
    <div
      className={clsx(
        'fixed bottom-0 left-0 right-0 z-10',
        'bg-gray-700 dark:bg-neutral-900',
        'p-4 w-full flex justify-center'
      )}
    >
      <Button
        type="button"
        onClick={onClick}
        disabled={isLoading || disabled}
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
        {isLoading ? <Loader /> : label}
      </Button>
    </div>
  );
};

export default LoadMoreButton;
