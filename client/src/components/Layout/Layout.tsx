import React, { FunctionComponent, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Container, LinearProgress } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import { IsLoadingContext } from '../../providers/IsLoadingProvider';

const Layout: FunctionComponent = () => {
  const { isLoading } = useContext(IsLoadingContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      {isLoading && <LinearProgress />}

      <Container
        sx={{
          paddingTop: 2,
          caretColor: 'transparent'
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
