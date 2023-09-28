import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { NotificationContext } from '../../providers/NotificationProvider';

export enum Severities {
  error = 'error',
  success = 'success',
  warning = 'warning',
  info = 'info'
}

export interface NotificationProps {
  open: boolean;
  autoHideDuration: number;
  onClose?: () => void;
  anchorOrigin: SnackbarOrigin;
  severity: Severities;
  description: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

export default function Notification() {
  const { notification, setNotification } = useContext(NotificationContext);

  const { 
    open, 
    autoHideDuration,
    anchorOrigin,
    severity,
    onClose,
    description 
  } = notification;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotification(prevNotification => {
      return { ...prevNotification, open: false }
    });
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
      >
        <Alert
          onClose={onClose}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {description}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
