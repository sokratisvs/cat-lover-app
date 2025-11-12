import type { CatImage } from '@cats/cats.types';
import {
  API_BASE_URL,
  defaultHeaders,
  RESULTS_PER_PAGE,
} from '@shared/constants';

export async function fetchRandomCats(
  page: number,
  limit = RESULTS_PER_PAGE
): Promise<CatImage[]> {
  const res = await fetch(
    `${API_BASE_URL}/images/search?limit=${limit}&page=${page}&has_breeds=1`,
    {
      headers: defaultHeaders,
    }
  );
  if (!res.ok) throw new Error('Failed to fetch random cats');
  return res.json();
}

export async function fetchCatImageById(imageId: string): Promise<CatImage> {
  const res = await fetch(`${API_BASE_URL}/images/${imageId}`, {
    headers: defaultHeaders,
  });
  if (!res.ok) throw new Error('Failed to fetch cat image');
  return res.json();
}
