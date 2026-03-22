import api from './api';

export const buyProduct = async (data: any) => {
    const response = await api.post('/order/buy', data);
    return response.data;
};