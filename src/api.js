// src/api/config.js
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// src/api/data.js
import { apiClient } from './config';

export const dataApi = {
    getData: () => apiClient.get('/data'),
    // 추가 API 메서드들...
};