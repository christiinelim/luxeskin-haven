import axios from 'axios';
import SellerServices from "./SellerServices";

const ApiServices = axios.create ({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

ApiServices.interceptors.request.use(async (config) => {
    const jwtToken = localStorage.getItem('accessToken');
    if (config.url === '/seller/' || 
        config.url === '/seller/verify-account' ||
        config.url === '/seller/login' ||
        config.url === '/seller/forgot-password' ||
        config.url === '/seller/update-password'
    ) {
        return config;
    }

    if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
        return config;
    } 
    return Promise.reject("Unauthorized, please login");
}, (error) => {
    return Promise.reject(error);
});

ApiServices.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const email = localStorage.getItem('email');
                const id = localStorage.getItem('sellerId');
                const refreshToken = localStorage.getItem('refreshToken');
                const data = { email, id, refreshToken }
                
                const response = await SellerServices.refreshToken(data);
                const newAccessToken = response.accessToken;

                if (newAccessToken) {
                    localStorage.setItem("accessToken", newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return ApiServices(originalRequest);
                } else {
                    throw new Error('Failed to obtain new access token');
                }
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

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