import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from '../Navbar/Navbar';

const Layout: FunctionComponent = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />

      <Container
        component="div"
        sx={{
          paddingTop: 2
        }}
      >
        <div>
          <Outlet />
        </div>
      </Container>
    </Box>
  );
};

export default Layout;
