import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import './App.css';
import Claims from './pages/Claims/Claims';
import Layout from './components/Layout/Layout';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from 'react-query';
import ContextProviders from './Providers';
import ClaimDetails from './pages/ClaimDetails/ClaimDetails';
import Themes from './Themes';
const client = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="/claims" />} />
      <Route path="/claims/:id" element={<ClaimDetails />} />
      <Route path="/claims" element={<Claims />} />
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Route>
  )
);

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en'}>
      <QueryClientProvider client={client}>
        <ContextProviders>
          <Themes>
            <RouterProvider router={router} />
          </Themes>
        </ContextProviders>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}

export default App;
