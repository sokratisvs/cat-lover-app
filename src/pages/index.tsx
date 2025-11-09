import { lazy } from 'react';

const CatsPage = lazy(() => import('./CatsPage'));
const BreedsPage = lazy(() => import('./BreedsPage'));
const FavouritesPage = lazy(() => import('./FavouritesPage'));
const NotFoundPage = lazy(() => import('./NotFoundPage'));

export { CatsPage, BreedsPage, FavouritesPage, NotFoundPage };
