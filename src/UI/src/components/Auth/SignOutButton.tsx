import React, { useState } from 'react';
import { useMsal } from '@azure/msal-react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

/**
 * Renders a sign-out button
 */
const SignOutButton: React.FC = () => {
  const { instance } = useMsal();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = (logoutType: 'popup' | 'redirect') => {
    setAnchorEl(null); // Close the menu
    if (logoutType === 'popup') {
      instance.logoutPopup({
        postLogoutRedirectUri: '/',
        mainWindowRedirectUri: '/'
      });
    } else if (logoutType === 'redirect') {
      instance.logoutRedirect({
        postLogoutRedirectUri: '/'
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
        aria-controls="signout-menu"
        aria-haspopup="true"
      >
        Sign Out
      </Button>
      <Menu
        id="signout-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleLogout('popup')}>
          Sign out using Popup
        </MenuItem>
        <MenuItem onClick={() => handleLogout('redirect')}>
          Sign out using Redirect
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SignOutButton;
