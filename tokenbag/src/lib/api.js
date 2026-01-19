import axios from 'axios';

const api = axios.create({
  // Pura URL bina kisi mistake ke check karo
  baseURL: 'https://tokenbag-5z1s.onrender.com/api/tokens', 
  timeout: 10000, // 10 seconds ka timeout de do taaki Network Error jaldi dikhe
});

export const createBag = (data) => api.post('/create', data);
export const useAI = (data) => api.post('/use', data);

export default api;