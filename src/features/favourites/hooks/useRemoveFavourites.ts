import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFavourites } from '../favourites.api';
import { favouritesKey } from './useFavourites';
import type { Favourite } from '../favourites.types';
import { useNotification } from '@/shared/utils/useNotification';

export function useRemoveFavourites() {
  const queryClient = useQueryClient();
  const { error: notifyError } = useNotification();

  return useMutation({
    mutationFn: (ids: number[]) => removeFavourites(ids),
    onSuccess: (_, ids) => {
      queryClient.setQueryData<Favourite[]>(favouritesKey, (old) => {
        if (!old || !Array.isArray(old)) return [];
        return old.filter((f) => !ids.includes(f.id));
      });
    },
    onError: (error: Error) => {
      notifyError(error.message || 'Failed to remove favourites');
    },
  });
}
