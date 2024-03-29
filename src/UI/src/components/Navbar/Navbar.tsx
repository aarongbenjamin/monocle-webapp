import React, { useContext } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from '../SearchBar/SearchBar';
import { NavBarTitleContext } from '../../providers/NavbarTitleProvider';
import { useNavigate } from 'react-router-dom';
import { IsLoadingContext } from '../../providers/IsLoadingProvider';
import UserIconButton from '../Auth/UserIconButton';
import { useIsAuthenticated } from '@azure/msal-react';
import SignInButton from '../Auth/SignInButton';

const Navbar = () => {
  const isAuthenticated = useIsAuthenticated();
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
  const { isLoading } = useContext(IsLoadingContext);
  const { title } = useContext(NavBarTitleContext);

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
              Claim Search
            </MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <SearchBar />
          {isAuthenticated ? <UserIconButton /> : <SignInButton />}
        </Toolbar>
      </AppBar>
      {isLoading && <LinearProgress />}
    </Box>
  );
};

export default Navbar;
