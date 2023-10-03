import React from 'react';
import { useMsal } from '@azure/msal-react';
import Button from '@mui/material/Button';
import { msalConfig } from '../../setup/auth-config';

/**
 * Renders a sign-out button
 */
const SignOutButton: React.FC = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: msalConfig.auth.redirectUri
    });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleLogout}>
        Sign Out
      </Button>
    </div>
  );
};

export default SignOutButton;
