import React, { FunctionComponent, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Container, LinearProgress } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import { IsLoadingContext } from '../../providers/IsLoadingProvider';

const Layout: FunctionComponent = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />

      <Container
        component="div"
        sx={{
          paddingTop: 2,
          caretColor: 'transparent'
        }}
      >
        <div
          style={{
            caretColor: 'black'
          }}
        >
          <Outlet />
        </div>
      </Container>
    </Box>
  );
};

export default Layout;
