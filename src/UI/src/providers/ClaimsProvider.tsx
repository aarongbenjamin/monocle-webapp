import React, { createContext } from 'react';
import { IClaim } from '../models/claim';
import { useState } from 'react';

export const ClaimsContext = createContext<{
  claims: IClaim[];
  setClaims: React.Dispatch<React.SetStateAction<IClaim[]>>;
}>({
  claims: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setClaims: () => {}
});
export const SelectedClaimContext = createContext<{
  setSelectedClaim: React.Dispatch<React.SetStateAction<IClaim | null>>;
  selectedClaim: IClaim | null;
}>({
  selectedClaim: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedClaim: () => {}
});

const ClaimsProvider = ({ children }: { children: React.ReactNode }) => {
  const [claims, setClaims] = useState<IClaim[]>([]);
  const [selectedClaim, setSelectedClaim] = useState<IClaim | null>(null);
  return (
    <ClaimsContext.Provider value={{ claims, setClaims }}>
      <SelectedClaimContext.Provider
        value={{ selectedClaim, setSelectedClaim }}
      >
        {children}
      </SelectedClaimContext.Provider>
    </ClaimsContext.Provider>
  );
};

export default ClaimsProvider;
