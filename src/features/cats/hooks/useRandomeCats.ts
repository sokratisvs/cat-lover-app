import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRandomCats } from '../cats.api';
import type { CatImage } from '../cats.types';

export function useRandomCats() {
  return useInfiniteQuery<CatImage[]>({
    queryKey: ['randomCats'],
    queryFn: ({ pageParam }) => fetchRandomCats(pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) return undefined;
      return allPages.length;
    },
  });
}
