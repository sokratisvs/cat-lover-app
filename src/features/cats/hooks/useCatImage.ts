import { useQuery } from '@tanstack/react-query';
import { fetchCatImageById } from '../cats.api';
import type { CatImage } from '../cats.types';

export function useCatImage(imageId: string) {
  return useQuery<CatImage>({
    queryKey: ['catImage', imageId],
    queryFn: () => fetchCatImageById(imageId),
  });
}
