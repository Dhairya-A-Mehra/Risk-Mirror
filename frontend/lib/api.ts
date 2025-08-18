import axios from 'axios';

// For local development, this points to our auth_service container
const AUTH_API_URL = 'http://localhost:8001'; 

const api = axios.create({
  baseURL: AUTH_API_URL,
});

// We'll add JWT interceptors here later
export default api;