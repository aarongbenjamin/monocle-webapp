import React from 'react';
import ClaimsProvider from './providers/ClaimsProvider';
import IsLoadingProvider from './providers/IsLoadingProvider';
import NavbarTitleProvider from './providers/NavbarTitleProvider';
import AlertDetailsProvider from './providers/AlertProvider';

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AlertDetailsProvider>
      <IsLoadingProvider>
        <ClaimsProvider>
          <NavbarTitleProvider>{children}</NavbarTitleProvider>
        </ClaimsProvider>
      </IsLoadingProvider>
    </AlertDetailsProvider>
  );
};

export default ContextProviders;
