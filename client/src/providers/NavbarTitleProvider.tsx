import React, { createContext, useState } from 'react';

export const NavBarTitleContext = createContext<{
  title: string;
  setNavbarTitle: React.Dispatch<React.SetStateAction<string>>;
}>({
  title: 'Home',
  setNavbarTitle: () => {}
});

const NavbarTitleProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState('Home');
  return (
    <NavBarTitleContext.Provider value={{ title, setNavbarTitle: setTitle }}>
      {children}
    </NavBarTitleContext.Provider>
  );
};

export default NavbarTitleProvider;
