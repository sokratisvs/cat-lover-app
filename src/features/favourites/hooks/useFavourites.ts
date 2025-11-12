import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFavourites } from '../favourites.api';
import type { Favourite } from '../favourites.types';
import { RESULTS_PER_PAGE } from '@/shared/constants';

export const favouritesKey = ['favourites'];

export function useFavourites() {
  return useInfiniteQuery<Favourite[]>({
    queryKey: favouritesKey,
    queryFn: ({ pageParam }) => fetchFavourites(pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < RESULTS_PER_PAGE) return null;
      return allPages.length;
    },
  });
}
