import { lazy, Suspense, type ComponentType } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CatsPage, BreedsPage, FavouritesPage, NotFoundPage } from './pages';
import Layout from '@shared/components/Layout';
import CatGridSkeleton from '@shared/components/CatGridSkeleton';
import Loader from '@shared/components/Loader';

const LazyCatModal = lazy(() => import('@cats/components/CatModal'));
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
    element: <Navigate to="/cats" replace />,
  },
  {
    path: 'cats',
    element: withSuspense(CatsPage, CatGridSkeleton),
  },
  {
    path: 'breeds',
    element: withSuspense(BreedsPage, CatGridSkeleton),
  },
  {
    path: 'favourites',
    element: withSuspense(FavouritesPage, CatGridSkeleton),
  },
  {
    path: '*',
    element: withSuspense(NotFoundPage, CatGridSkeleton),
  },
];

export const AppRoutes = () => {
  const location = useLocation();
  const background = location.state?.backgroundLocation;

  const getBackgroundLocation = () => {
    if (background) {
      return typeof background === 'string'
        ? { ...location, pathname: background }
        : background;
    }
    if (location.pathname.startsWith('/cats/')) {
      return { ...location, pathname: '/cats' };
    }
    if (location.pathname.startsWith('/breeds/')) {
      return { ...location, pathname: '/breeds' };
    }
    return location;
  };

  const isModalRoute =
    location.pathname.startsWith('/cats/') ||
    location.pathname.startsWith('/breeds/');

  return (
    <>
      <Routes location={getBackgroundLocation()}>
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

      {isModalRoute && (
        <Routes>
          <Route path="/cats/:id" element={withSuspense(LazyCatModal)} />
          <Route path="/breeds/:id" element={withSuspense(LazyBreedModal)} />
        </Routes>
      )}
    </>
  );
};
