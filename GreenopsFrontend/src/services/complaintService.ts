import api from './api';

export const addComplaint = async (data: any) => {
    const response = await api.post('/complaint/register', data);
    return response.data;
};

export const getComplaints = async () => {
    const response = await api.get('/complaint/all');
    return response.data;
};