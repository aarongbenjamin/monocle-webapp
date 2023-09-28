import React, { createContext, useEffect, useState } from 'react';
import { Alert, Snackbar, SnackbarOrigin, Stack } from '@mui/material';
export enum Severities {
  error = 'error',
  success = 'success',
  warning = 'warning',
  info = 'info'
}

export interface AlertDetails {
  autoHideDuration?: number;
  onClose?: () => void;
  anchorOrigin?: SnackbarOrigin;
  severity: Severities;
  description: string;
}

export const AlertDetailsContext = createContext<{
  alertDetails: AlertDetails | null;
  setAlertDetails: (alertDetails: AlertDetails) => void;
}>({
  alertDetails: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAlertDetails: () => {}
});

const AlertDetailsProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [alertDetails, setAlertDetails] = useState<AlertDetails | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (alertDetails) {
      setOpen(true);
    }
  }, [alertDetails]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack sx={{ width: '100%' }}>
      <Snackbar
        disableWindowBlurListener
        open={open}
        autoHideDuration={alertDetails?.autoHideDuration ?? 1000}
        onClose={handleClose}
        anchorOrigin={
          alertDetails?.anchorOrigin ?? {
            vertical: 'top',
            horizontal: 'center'
          }
        }
      >
        <Alert
          onClose={alertDetails?.onClose}
          severity={alertDetails?.severity}
          sx={{ width: '100%' }}
        >
          {alertDetails?.description}
        </Alert>
      </Snackbar>
      <AlertDetailsContext.Provider
        value={{
          alertDetails: alertDetails,
          setAlertDetails: setAlertDetails
        }}
      >
        {children}
      </AlertDetailsContext.Provider>
    </Stack>
  );
};

export default AlertDetailsProvider;
