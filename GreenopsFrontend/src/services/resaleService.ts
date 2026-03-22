import api from './api';

export const getResaleItems = async () => {
  const response = await api.get('/resale/items'); // ✅ fixed
  return response.data;
};

export const addResaleItem = async (data: any) => {
  const response = await api.post('/resale/add', data); // ✅ JSON
  return response.data;
};