import axios from 'axios';
import { BASE_URL, LOCAL_BASE_URL } from './constants';
const API = axios.create({ baseURL: BASE_URL });

// SOP APIs
export const createSOP = (sopData) => API.post('/sops/create', sopData);
export const logChange = (id, change) => API.post(`/sops/log/${id}`, change);
export const getAllSOPs = () => API.get('/sops/view-sops');
export const getChangeLogs = (sopId) => API.get(`/sops/change-logs/${sopId}`);
export const getAllChangeLogs = () => API.get('/sops/change-logs');
export const getQualityScoreById = (id) => API.get(`/sops/${id}/quality`); // New endpoint for quality score
export const updateSOPContent = (id, data) => API.put(`/sops/update/${id}`, data);

// AI APIs
export const getAISuggestions = (id) => API.get(`/ai/suggestions/${id}`);
export const getAssessQuality = (id) => API.get(`/ai/assess/${id}`);
export const getChecklistItems = (id) => API.get(`/ai/checklist/${id}`);
export const getResourceLinks = (id) => API.get(`/ai/resources/${id}`);



export const getNotifications = async() => {
    try {
        const response = await API.get('/notifications'); // Use the baseURL defined in the API instance
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};