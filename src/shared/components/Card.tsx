import { CheckIcon } from '@/components/icons';
import clsx from 'clsx';

interface CardProps {
  catId: string;
  imageUrl: string;
  onClick: (id: string) => void;
  alt?: string;
  isSelectable?: boolean;
  isSelected?: boolean;
}

const Card = ({
  catId,
  imageUrl,
  onClick,
  alt,
  isSelectable,
  isSelected,
}: CardProps) => {
  return (
    <div
      onClick={() => onClick(catId)}
      className={clsx(
        'cursor-pointer',
        'rounded-lg',
        'overflow-hidden',
        'bg-gray-800',
        'hover:bg-gray-700',
        'transition',
        'shadow-md',
        'relative',
        isSelected && 'ring-2 ring-indigo-600'
      )}
    >
      {isSelectable && (
        <div
          className={clsx(
            'absolute top-2 right-2 w-6 h-6',
            'rounded-full border border-white',
            'flex items-center justify-center text-xs',
            isSelected ? 'bg-indigo-600' : 'bg-black/60'
          )}
        >
          {isSelected ? <CheckIcon className="w-4 h-4 text-white" /> : ''}
        </div>
      )}
      <img
        src={imageUrl}
        alt={alt || `${catId}`}
        className="w-full h-48 object-cover rounded-md"
      />
    </div>
  );
};

export default Card;
