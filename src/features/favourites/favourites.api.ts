import { API_BASE_URL, API_KEY } from '@shared/constants';
import type { Favourite } from './favourites.types';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
};

export async function fetchFavourites(): Promise<Favourite[]> {
  const res = await fetch(`${API_BASE_URL}/favourites?order=DESC`, {
    headers: defaultHeaders,
  });
  if (!res.ok) throw new Error('Failed to fetch favourites');
  return res.json();
}

export async function addFavourite(imageId: string): Promise<Favourite> {
  const res = await fetch(`${API_BASE_URL}/favourites`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ image_id: imageId }),
  });
  if (!res.ok) throw new Error('Failed to add favourite');
  return res.json();
}

async function removeFavourite(favouriteId: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/favourites/${favouriteId}`, {
    method: 'DELETE',
    headers: defaultHeaders,
  });
  if (!res.ok) throw new Error('Failed to remove favourite');
}

export async function removeFavourites(ids: number[]): Promise<void> {
  await Promise.all(ids.map((id) => removeFavourite(id)));
}
