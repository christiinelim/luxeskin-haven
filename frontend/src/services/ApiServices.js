import axios from 'axios';
import SellerServices from "./SellerServices";

const ApiServices = axios.create ({
    baseURL: "http://localhost:3000/api",
});

ApiServices.interceptors.request.use(async (config) => {
    const jwtToken = localStorage.getItem('accessToken');
    if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
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