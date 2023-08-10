import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import React from 'react';
const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained'
      }
    }
  }
});
const Themes = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export default Themes;
