import React, { FunctionComponent, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from '../Navbar/Navbar';

const Layout: FunctionComponent = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />

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
