import axios from 'axios';

export default function setupAxios() {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  axios.defaults.baseURL = baseUrl;
}
