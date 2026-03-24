import api from './api';

export const addFeedback = async (data: any) => {
    const response = await api.post('/feedback/submit', data);
    return response.data;
};

export const getFeedbacks = async () => {
    const response = await api.get('/feedback/all');
    return response.data;
};