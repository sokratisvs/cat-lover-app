import { useQuery } from '@tanstack/react-query';
import { fetchFavourites } from '../favourites.api';
import type { Favourite } from '../favourites.types';

export const favouritesKey = ['favourites'];

export function useFavourites() {
  return useQuery<Favourite[]>({
    queryKey: favouritesKey,
    queryFn: fetchFavourites,
    refetchOnMount: 'always',
    staleTime: 0,
  });
}
