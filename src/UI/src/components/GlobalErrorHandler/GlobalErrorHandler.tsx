import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import StyledModal from '../General/Modal/StyledModal';

const GlobalErrorHandler = () => {
  const [isError, setIsError] = useState(false);

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    const handleUnhandledError = (event: ErrorEvent) => {
      event.preventDefault();
      setIsError(true);
    };
    const uncaughtrejectionHandler = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      setIsError(true);
    };

    window.addEventListener('error', handleUnhandledError);
    window.addEventListener('unhandledrejection', uncaughtrejectionHandler);

    return () => {
      window.removeEventListener('error', handleUnhandledError);
      window.removeEventListener(
        'unhandledrejection',
        uncaughtrejectionHandler
      );
    };
  }, [isError]);

  return (
    <StyledModal open={isError}>
      <Typography variant="h6" gutterBottom>
        Something went wrong!
      </Typography>
      <Button variant="contained" color="primary" onClick={handleRefresh}>
        Refresh
      </Button>
    </StyledModal>
  );
};

export default GlobalErrorHandler;
