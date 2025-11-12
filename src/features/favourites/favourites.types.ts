import type { CatImage } from '@cats/cats.types';

export interface Favourite {
  id: number;
  user_id: string;
  image_id: string;
  created_at: string;
  image: CatImage;
}
