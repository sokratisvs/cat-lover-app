import { useEffect } from 'react';
import { useNotification } from '@/shared/utils/useNotification';

export const ErrorFallback = () => {
  const { error: notifyError } = useNotification();

  useEffect(() => {
    notifyError('Failed to load content.');
  }, [notifyError]);

  return (
    <div className="p-4 text-center text-red-500">Failed to load content.</div>
  );
};
