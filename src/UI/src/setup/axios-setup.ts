import axios from 'axios';

export default function setupAxios() {
  if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:5219';
  }
}
