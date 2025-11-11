import type { CatImage } from '@cats/cats.types';
import { API_BASE_URL } from '@shared/constants';

export async function fetchCatImageById(imageId: string): Promise<CatImage> {
  const res = await fetch(`${API_BASE_URL}/images/${imageId}`);
  if (!res.ok) throw new Error('Failed to fetch cat image');
  return res.json();
}
