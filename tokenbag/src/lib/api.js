import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/tokens', // Tera backend URL
});

export const createBag = (data) => api.post('/create', data);
export const useAI = (data) => api.post('/use', data);