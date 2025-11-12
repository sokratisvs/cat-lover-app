import { useCallback } from 'react';
import { toast } from 'sonner';

export interface NotificationProps {
  type: 'info' | 'error';
  description: string;
}

interface UseNotificationOptions {
  defaultDuration?: number;
}

export const useNotification = (options?: UseNotificationOptions) => {
  const { defaultDuration = 4000 } = options ?? {};

  const notify = useCallback(
    ({ type, description }: NotificationProps) => {
      const title = type === 'info' ? 'Information' : 'Error';

      toast(title, {
        description,
        duration: defaultDuration,
        action: {
          label: 'Close',
          onClick: () => {},
        },
      });
    },
    [defaultDuration]
  );

  const info = useCallback(
    (description: string) => notify({ type: 'info', description }),
    [notify]
  );

  const error = useCallback(
    (description: string) => notify({ type: 'error', description }),
    [notify]
  );

  return {
    notify,
    info,
    error,
  };
};
