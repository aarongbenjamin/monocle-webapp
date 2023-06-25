import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import './App.css';
import ClaimSearch from './pages/ClaimSearch/ClaimSearch';
import Layout from './components/Layout/Layout';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from 'react-query';
import ContextProviders from './Providers';
import ClaimDetails from './pages/ClaimDetails/ClaimDetails';
const client = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="/claims" />} />
      <Route path="/claims/:id" element={<ClaimDetails />} />
      <Route path="/claims" element={<ClaimSearch />} />
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Route>
  )
);

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en'}>
      <QueryClientProvider client={client}>
        <ContextProviders>
          <RouterProvider router={router} />
        </ContextProviders>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}

export default App;
