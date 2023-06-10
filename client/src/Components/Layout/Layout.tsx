import React, { FunctionComponent, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../Navbar/Navbar';

const Layout: FunctionComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/claims');
  }, [navigate]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />

      <Outlet />
    </Box>
  );
};

export default Layout;
