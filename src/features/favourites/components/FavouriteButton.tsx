import { useOptimistic, useTransition } from 'react';
import { useFavourites, useAddFavourite, useRemoveFavourite } from '../hooks';
import { Button } from '@/components/ui/button';
import { HeartIcon } from '@/components/icons';

interface Props {
  imageId: string;
}

export function FavouriteButton({ imageId }: Props) {
  const { data: favourites } = useFavourites();
  const addFavourite = useAddFavourite();
  const removeFavourite = useRemoveFavourite();
  const [isPending, startTransition] = useTransition();

  const allFavourites = favourites ?? [];

  const isInitiallyFav = !!allFavourites.some((f) => f.image_id === imageId);

  const [optimisticIsFav, setOptimisticIsFav] = useOptimistic(
    isInitiallyFav,
    (_current, next: boolean) => next
  );

  async function toggle() {
    const next = !optimisticIsFav;

    startTransition(async () => {
      // instant UI change
      setOptimisticIsFav(next);

      try {
        if (next) {
          await addFavourite.mutateAsync(imageId);
        } else {
          const fav = allFavourites.find((f) => f.image_id === imageId);
          if (fav) {
            await removeFavourite.mutateAsync(fav.id);
          }
        }
      } catch (error) {
        // rollback
        setOptimisticIsFav(!next);
      }
      console.log('optimisticIsFav', optimisticIsFav);
    });
  }

  const label = optimisticIsFav
    ? 'Remove from favourites'
    : 'Add to favourites';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className="w-10 h-10"
      disabled={
        isPending || addFavourite.isPending || removeFavourite.isPending
      }
    >
      <HeartIcon
        className={`w-5 h-5 ${
          optimisticIsFav
            ? 'fill-primary text-primary'
            : 'fill-transparent stroke-foreground'
        }`}
      />
      <span className="sr-only">{label}</span>
    </Button>
  );
}
