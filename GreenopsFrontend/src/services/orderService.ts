import api from './api';

export const buyProduct = async (data: any) => {
    const response = await api.post('/order/buy', data);
    return response.data;
};
export const getUserOrders = async (userId: number) => {
    const response = await api.get(`/order/user/${userId}`);
    return response.data;
};