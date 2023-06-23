import React, { useContext, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StartClaimModal, {
  CloseAction
} from '../StartClaimModal/StartClaimModal';
import { NavBarTitleContext } from '../../providers/NavbarTitleProvider';
import { useNavigate } from 'react-router-dom';
import { IsLoadingContext } from '../../providers/IsLoadingProvider';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (navigatePath?: string) => {
    setAnchorEl(null);
    if (navigatePath) {
      navigate(navigatePath);
    }
  };
  const [openStartClaimModal, setOpenStartClaimModal] = useState(false);
  const { isLoading } = useContext(IsLoadingContext);
  const { title } = useContext(NavBarTitleContext);

  const handleStartClaimClick = () => {
    setOpenStartClaimModal(true);
  };
  const handleStartClaimClickClose = (
    action: CloseAction,
    newClaimId: string | undefined
  ) => {
    setOpenStartClaimModal(false);
    if (action === CloseAction.Save) {
      navigate(`/claims/${newClaimId}`);
    }
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
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={() => handleMenuClose()}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem onClick={() => handleMenuClose('/claims')}>
              Claims
            </MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
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
      {isLoading && <LinearProgress />}
    </Box>
  );
};

export default Navbar;
