import axios from 'axios';

const AUTH_API_URL = 'http://localhost:8001'; 

const api = axios.create({
  baseURL: AUTH_API_URL,
});

export default api;
