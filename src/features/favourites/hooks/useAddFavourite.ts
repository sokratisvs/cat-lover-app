import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFavourite } from '../favourites.api';
import { favouritesKey } from './useFavourites';
import type { Favourite } from '../favourites.types';

export function useAddFavourite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (imageId: string) => addFavourite(imageId),
    onSuccess: (newFav: Favourite) => {
      // update cached list
      queryClient.setQueryData<Favourite[]>(favouritesKey, (old) =>
        old ? [...old, newFav] : [newFav]
      );
    },
    // optimistic update
    onMutate: async (_imageId: string) => {
      // Cancel any outgoing refetches to not overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: favouritesKey });

      const previousFavouritesList =
        queryClient.getQueryData<Favourite[]>(favouritesKey);

      const optimisticFavourite: Favourite = {
        id: Date.now(),
        user_id: 'optimistic-user',
        image_id: _imageId,
        created_at: new Date().toISOString(),
        image: {
          id: _imageId,
          width: 0,
          height: 0,
          url: '',
        },
      };

      queryClient.setQueryData<Favourite[]>(favouritesKey, (old) =>
        old ? [...old, optimisticFavourite] : [optimisticFavourite]
      );

      return {
        previousFavouritesList,
        optimisticFavourite,
      };
    },
    onError: (_error, _imageId, context) => {
      queryClient.setQueryData<Favourite[] | undefined>(
        favouritesKey,
        context?.previousFavouritesList
      );
    },
  });
}
