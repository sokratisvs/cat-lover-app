import clsx from 'clsx';

interface CardProps {
  catId: string;
  imageUrl: string;
  onClick: (id: string) => void;
  alt?: string;
}

const Card = ({ catId, imageUrl, onClick, alt }: CardProps) => {
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
        'shadow-md'
      )}
    >
      <img
        src={imageUrl}
        alt={alt || `${catId}`}
        className="w-full h-48 object-cover rounded-md"
      />
    </div>
  );
};

export default Card;
