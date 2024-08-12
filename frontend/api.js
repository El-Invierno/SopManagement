import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// SOP APIs
export const createSOP = (sopData) => API.post('/sops/create', sopData);
export const logChange = (id, change) => API.post(`/sops/log/${id}`, change);
export const getAllSOPs = () => API.get('/sops/view-sops');
export const getChangeLogs = (sopId) => API.get(`/sops/change-logs/${sopId}`);
export const getAllChangeLogs = () => API.get('/sops/change-logs');
export const getQualityScoreById = (id) => API.get(`/sops/${id}/quality`); // New endpoint for quality score

// AI APIs
export const getAISuggestions = (id) => API.get(`/ai/suggestions/${id}`);
export const getAssessQuality = (id) => API.get(`/ai/assess/${id}`);
export const updateSOPContent = (id, data) => API.put(`/sops/update/${id}`, data);

