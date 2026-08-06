const API_URL = process.env.NODE_ENV === 'production' 
  ? "https://mpr-medicos-backend.onrender.com"
  : `http://${window.location.hostname}:8000`;

export default API_URL;
