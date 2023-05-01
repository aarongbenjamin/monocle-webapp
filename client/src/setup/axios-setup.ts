import axios from "axios";

export default function setupAxios() {
    axios.defaults.baseURL = process.env.BACKEND_URL ?? 'http://localhost:5000'
}