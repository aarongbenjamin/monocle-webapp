import React from 'react';
import ClaimsProvider from './providers/ClaimsProvider';
import IsLoadingProvider from './providers/IsLoadingProvider';
import NavbarTitleProvider from './providers/NavbarTitleProvider';

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <IsLoadingProvider>
      <ClaimsProvider>
        <NavbarTitleProvider>{children}</NavbarTitleProvider>
      </ClaimsProvider>
    </IsLoadingProvider>
  );
};

export default ContextProviders;
