import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useModalNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const openModal = useCallback(
    (path: string, id: string) => {
      navigate(`/${path}/${id}`, {
        state: { backgroundLocation: location.pathname },
      });
    },
    [navigate, location]
  );

  const closeModal = useCallback(
    (fallback = '/cats') => {
      navigate(location.state?.backgroundLocation?.pathname || fallback, {
        replace: true,
      });
    },
    [navigate, location]
  );

  return { openModal, closeModal };
};
