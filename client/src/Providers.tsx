import React from 'react';
import ClaimsProvider from './providers/ClaimsProvider';
import NavbarTitleProvider from './providers/NavbarTitleProvider';

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClaimsProvider>
      <NavbarTitleProvider>{children}</NavbarTitleProvider>
    </ClaimsProvider>
  );
};

export default ContextProviders;
