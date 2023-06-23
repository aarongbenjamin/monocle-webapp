import React, { createContext, useState } from 'react';

export const IsLoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsLoading: () => {}
});

const IsLoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </IsLoadingContext.Provider>
  );
};

export default IsLoadingProvider;
