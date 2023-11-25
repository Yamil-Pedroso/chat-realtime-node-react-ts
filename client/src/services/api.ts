import axios from 'axios';

const baseURL = 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: baseURL,
});

export default api;