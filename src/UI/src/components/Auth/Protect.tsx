import { InteractionType } from '@azure/msal-browser';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import React, { ReactNode } from 'react';
import { loginRequest } from '../../setup/auth-config';
const Protect = ({ children }: { children: ReactNode }) => {
  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={loginRequest}
    >
      {children}
    </MsalAuthenticationTemplate>
  );
};

export default Protect;
