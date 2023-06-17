import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

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
    <Modal
      open={isError}
      slotProps={{
        backdrop: {
          sx: {
            pointerEvents: 'none'
          }
        }
      }}
      sx={{
        borderRadius: 3
      }}
    >
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        height="100vh"
      >
        <Box bgcolor="white" m={3} p={3} borderRadius={3} maxWidth={400}>
          <Typography variant="h6" gutterBottom>
            Something went wrong!
          </Typography>
          <Button variant="contained" color="primary" onClick={handleRefresh}>
            Refresh
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default GlobalErrorHandler;
