import api from '../../../api/axios.js';

export const getAllItems = async () => {
  const response = await api.get('/items/');
  return response.data;
};

export const createItem = async (formData) => {
  const response = await api.post('/items/', formData);
  return response.data;
};

export const getItemById = async (itemId) => {
  const response = await api.get(`/items/${itemId}`);
  return response.data;
};
