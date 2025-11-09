import type { CatImage } from '../cats/cats.types';
import { API_BASE_URL, API_KEY } from '@shared/constants';

export async function fetchRandomCats(
  page: number,
  limit = 10
): Promise<CatImage[]> {
  const res = await fetch(
    `${API_BASE_URL}/images/search?limit=${limit}&page=${page}&has_breeds=1&api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error('Failed to fetch random cats');
  return res.json();
}

export async function fetchCatImageById(imageId: string): Promise<CatImage> {
  const res = await fetch(`${API_BASE_URL}/images/${imageId}`);
  if (!res.ok) throw new Error('Failed to fetch cat image');
  return res.json();
}
