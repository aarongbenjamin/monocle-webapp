import React, { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../Navbar/Navbar';

const Layout: FunctionComponent = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />

      <Outlet />
    </Box>
  );
};

export default Layout;
