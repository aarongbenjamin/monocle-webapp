import axios from 'axios';

export default function setupAxios() {
  if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:5219';
  } else {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    axios.defaults.baseURL = baseUrl;
  }
}
