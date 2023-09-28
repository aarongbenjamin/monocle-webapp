import React, { createContext, useState } from 'react';
import { Alert, Snackbar, SnackbarOrigin, Stack } from '@mui/material';
export enum Severities {
  error = 'error',
  success = 'success',
  warning = 'warning',
  info = 'info'
}

export interface NotificationProps {
  autoHideDuration?: number;
  onClose?: () => void;
  anchorOrigin?: SnackbarOrigin;
  severity: Severities;
  description: string;
}

export const NotificationContext = createContext<{
  notification: NotificationProps | null;
  setNotification: (notification: NotificationProps) => void;
}>({
  notification: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setNotification: () => {}
});

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotification(null);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={!!notification}
        autoHideDuration={notification?.autoHideDuration ?? 1000}
        onClose={handleClose}
        anchorOrigin={
          notification?.anchorOrigin ?? {
            vertical: 'top',
            horizontal: 'center'
          }
        }
      >
        <Alert
          onClose={notification?.onClose}
          severity={notification?.severity}
          sx={{ width: '100%' }}
        >
          {notification?.description}
        </Alert>
      </Snackbar>
      <NotificationContext.Provider
        value={{
          notification,
          setNotification
        }}
      >
        {children}
      </NotificationContext.Provider>
    </Stack>
  );
};

export default NotificationProvider;
