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

// AI APIs
export const getAISuggestions = (content) => API.post('/ai/suggestions', { content });

// Collaboration APIs
export const addCollaboration = (collabData) => API.post('/collaborations/add', collabData);

// Knowledge Session APIs
export const scheduleSession = (sessionData) => API.post('/knowledge-sessions/schedule', sessionData);

// Macro APIs
export const createMacro = (macroData) => API.post('/macros/create', macroData);

// Alert APIs
export const createAlert = (alertData) => API.post('/alerts/create', alertData);
export const getAlerts = () => API.get('/alerts/all');
