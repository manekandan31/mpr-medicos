const API_URL = process.env.NODE_ENV === 'production' 
  ?"https://mpr-medicos-production.up.railway.app"  // Replace this after deployment
  : 'http://127.0.0.1:8000';

export default API_URL;
