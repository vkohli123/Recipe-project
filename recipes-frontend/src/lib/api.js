import axios from 'axios';
import config from '../config';

const client = axios.create({
  baseURL: config.API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Simple request/response interceptors to centralize error handling
client.interceptors.request.use((cfg) => {
  // Add auth headers or request id here if needed
  return cfg;
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    // Normalize error shape for consumers
    const error = err?.response?.data?.message || err.message || 'Network error';
    // Optional: send to external monitoring here
    // window.__MONITOR__?.captureException(err);
    return Promise.reject(new Error(error));
  }
);

export default client;
