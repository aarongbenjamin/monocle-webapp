import React from 'react';
import ClaimsProvider from './providers/ClaimsProvider';
import IsLoadingProvider from './providers/IsLoadingProvider';
import NavbarTitleProvider from './providers/NavbarTitleProvider';
import NotificationProvider from './providers/NotificationProvider';

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <IsLoadingProvider>
      <NotificationProvider>
        <ClaimsProvider>
          <NavbarTitleProvider>{children}</NavbarTitleProvider>
        </ClaimsProvider>
      </NotificationProvider>
    </IsLoadingProvider>
  );
};

export default ContextProviders;
