import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useModalNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const openModal = useCallback(
    (path: string, id: string) => {
      // Preserve existing backgroundLocation or use current location
      const bgLocation = location.state?.backgroundLocation || {
        pathname: location.pathname,
        search: location.search,
        hash: location.hash,
      };

      navigate(`/${path}/${id}`, {
        state: {
          backgroundLocation: bgLocation,
        },
      });
    },
    [navigate, location]
  );

  const closeModal = useCallback(
    (fallback = '/cats') => {
      const backgroundLocation = location.state?.backgroundLocation;
      const backgroundPath =
        typeof backgroundLocation === 'string'
          ? backgroundLocation
          : backgroundLocation?.pathname || fallback;

      navigate(backgroundPath, {
        replace: true,
      });
    },
    [navigate, location]
  );

  return { openModal, closeModal };
};
