import api from './api';

export const addReport = async (data: any) => {
    const response = await api.post('/WasteReport/report', data);
    return response.data;
};

export const getReports = async () => {
    const response = await api.get('/WasteReport/all');
    return response.data;
};
