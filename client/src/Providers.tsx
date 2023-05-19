import React from 'react';
import ClaimsProvider from './Providers/ClaimsProvider';

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return <ClaimsProvider>{children}</ClaimsProvider>;
};

export default ContextProviders;
