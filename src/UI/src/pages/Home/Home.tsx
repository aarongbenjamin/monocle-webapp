import { Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { NavBarTitleContext } from '../../providers/NavbarTitleProvider';

const Home = () => {
  var { setNavbarTitle } = useContext(NavBarTitleContext);
  useEffect(() => {
    setNavbarTitle('Home');
  });
  return <Typography variant="h1">Home</Typography>;
};

export default Home;
