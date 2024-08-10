import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// SOP APIs
export const createSOP = (sopData) => API.post('/sops/create', sopData);
export const getAssessQuality = (id) => API.get(`/sops/assess/${id}`);
export const validateCompliance = (id) => API.get(`/sops/validate/${id}`);
export const logChange = (id, change) => API.post(`/sops/log/${id}`, change);
export const performGapAnalysis = (id) => API.get(`/sops/gap-analysis/${id}`);
export const addControl = (id, control) => API.post(`/sops/control/${id}`, control);
export const verifyControl = (id, controlId) => API.put(`/sops/control/${id}/${controlId}`);
export const getAllSOPs = () => API.get('/sops/view-sops');
export const getChangeLogs = (id) => API.get(`/sops/change-logs/${id}`); // Endpoint for specific SOP
export const getAllChangeLogs = () => API.get('/sops/change-logs'); // New endpoint for all SOPs

// AI APIs
export const getAISuggestions = (content) => API.post('/ai/suggestions', { content });