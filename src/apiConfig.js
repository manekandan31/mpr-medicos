const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-app.herokuapp.com' // Replace this after deployment
  : 'http://127.0.0.1:8000';

export default API_URL;
