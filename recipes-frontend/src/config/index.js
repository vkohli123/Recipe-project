// Prefer VITE_API_BASE_URL, fall back to VITE_API_URL, then sensible dev default
const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:8080/api';

const config = {
  API_BASE,
};

export default config;
