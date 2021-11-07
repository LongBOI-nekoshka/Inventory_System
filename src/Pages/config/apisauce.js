import { create } from 'apisauce';

const api = create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default api;