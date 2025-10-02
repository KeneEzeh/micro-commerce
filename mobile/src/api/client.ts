import axios from 'axios';
const BACKEND = process.env.BACKEND_URL || 'http://10.0.2.2:3000';
const api = axios.create({ baseURL: BACKEND, timeout: 5000 });
export default api;
