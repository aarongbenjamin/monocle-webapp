import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import setupAxios from './setup/axios-setup';
import GlobalErrorHandler from './components/GlobalErrorHandler/GlobalErrorHandler';
import '@mui/material';
import '@mui/material/styles';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './setup/auth-config';
import { MsalProvider } from '@azure/msal-react';

setupAxios();
const config = msalConfig;
const msalInstance = new PublicClientApplication(config);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalErrorHandler />
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
