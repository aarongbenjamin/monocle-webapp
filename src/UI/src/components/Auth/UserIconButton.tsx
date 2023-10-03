import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SignOutButton from './SignOutButton';

const UserIconButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AccountCircleIcon />
      </IconButton>
      <Popover
        id="user-menu"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <SignOutButton />
      </Popover>
    </>
  );
};

export default UserIconButton;
