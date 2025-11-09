import { lazy, Suspense, type ComponentType } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CatsPage, BreedsPage, FavouritesPage, NotFoundPage } from './pages';
import Layout from '@shared/components/Layout';
import SkeletonLayout from '@shared/components/SkeletonLayout';
import Loader from '@shared/components/Loader';

const LazyBreedModal = lazy(() => import('@breeds/components/BreedModal'));

const withSuspense = (
  Component: ComponentType,
  Fallback: ComponentType = Loader
) => (
  <Suspense fallback={<Fallback />}>
    <Component />
  </Suspense>
);

interface AppRoute {
  path?: string;
  element: React.ReactNode;
  index?: boolean;
}

const mainRoutes: AppRoute[] = [
  {
    index: true,
    element: withSuspense(CatsPage, SkeletonLayout),
  },
  {
    path: 'cats',
    element: withSuspense(CatsPage, SkeletonLayout),
  },
  {
    path: 'breeds',
    element: withSuspense(BreedsPage, SkeletonLayout),
  },
  {
    path: 'favourites',
    element: withSuspense(FavouritesPage, SkeletonLayout),
  },
  {
    path: '*',
    element: withSuspense(NotFoundPage, SkeletonLayout),
  },
];

export const AppRoutes = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          {mainRoutes.map((route) => (
            <Route
              key={route.path || 'index'}
              path={route.path}
              element={route.element}
              index={route.index}
            />
          ))}
        </Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            key={'/breeds/:id'}
            path={'/breeds/:id'}
            element={withSuspense(LazyBreedModal)}
          />
        </Routes>
      )}
    </>
  );
};
