import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StartClaimModal from '../StartClaimModal/StartClaimModal';

const Navbar = () => {
  const [openStartClaimModal, setOpenStartClaimModal] = useState(false);
  const handleStartClaimClick = () => {
    setOpenStartClaimModal(true);
  };
  const handleStartClaimClickClose = () => {
    setOpenStartClaimModal(false);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Claims
          </Typography>
          <Button color="inherit" onClick={handleStartClaimClick}>
            Start Claim
          </Button>
          <StartClaimModal
            open={openStartClaimModal}
            closeModal={handleStartClaimClickClose}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
