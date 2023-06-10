import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Claims from './Pages/Claims/Claims';
import Layout from './Components/Layout/Layout';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from 'react-query';
import ContextProviders from './Providers';
import ClaimForm from './Components/ClaimForm/ClaimForm';
const client = new QueryClient();
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={client}>
        <ContextProviders>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/claims" element={<Claims />} />
                <Route path="/claims/:claimNumber" element={<ClaimForm />} />
                <Route path="*" element={<h1>Page Not Found</h1>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ContextProviders>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}

export default App;
