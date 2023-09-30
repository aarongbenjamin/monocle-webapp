import React from 'react';
import { useMsal } from '@azure/msal-react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { loginRequest } from '../../setup/auth-config';

/**
 * Renders a drop-down button with child buttons for logging in with a popup or redirect
 */
const SignInButton: React.FC = () => {
  const { instance } = useMsal();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLogin = (loginType: 'popup' | 'redirect') => {
    setAnchorEl(null); // Close the menu
    if (loginType === 'popup') {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    } else if (loginType === 'redirect') {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleMenuOpen}
        aria-controls="signin-menu"
        aria-haspopup="true"
      >
        Sign In
      </Button>
      <Menu
        id="signin-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleLogin('popup')}>
          Sign in using Popup
        </MenuItem>
        <MenuItem onClick={() => handleLogin('redirect')}>
          Sign in using Redirect
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SignInButton;
