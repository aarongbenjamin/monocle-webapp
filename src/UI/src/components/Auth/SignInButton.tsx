import React from 'react';
import { useMsal } from '@azure/msal-react';
import Button from '@mui/material/Button';
import { loginRequest } from '../../setup/auth-config';

/**
 * Renders a drop-down button with child buttons for logging in with a popup or redirect
 */
const SignInButton: React.FC = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log(e);
    });
  };
  return (
    <div>
      <Button variant="contained" onClick={handleLogin}>
        Sign In
      </Button>
    </div>
  );
};

export default SignInButton;
