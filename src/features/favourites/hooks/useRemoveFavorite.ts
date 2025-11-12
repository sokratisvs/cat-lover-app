import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFavourite } from '../favourites.api';
import { favouritesKey } from './useFavourites';

export function useRemoveFavourite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => removeFavourite(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(favouritesKey, (old: any) =>
        old ? old.filter((f: any) => f.id !== id) : old
      );
    },
  });
}
