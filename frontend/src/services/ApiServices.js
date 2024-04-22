import axios from 'axios';
import { getCSRFToken } from './CSRFService';

const ApiServices = axios.create ({
    baseURL: "http://localhost:3000/api",
});

// ApiServices.interceptors.request.use(async (config) => {
//     if (config.method === 'post' || config.method === 'POST') {
//         const csrfToken = await getCSRFToken();
//         config.headers['X-CSRF-Token'] = csrfToken;
//     }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

export default ApiServices;