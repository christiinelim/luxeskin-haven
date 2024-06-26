import axios from 'axios';
import SellerServices from "./SellerServices";
import { removeUserLocalStorage, getUserLocalStorage } from '../utils/utils';

const ApiServices = axios.create ({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

ApiServices.interceptors.request.use(async (config) => {
    const jwtToken = getUserLocalStorage().accessToken;
    if (config.url === '/seller/' || 
        config.url === '/seller/verify-account' ||
        config.url === '/seller/login' ||
        config.url === '/seller/forgot-password' ||
        config.url === '/seller/update-password' ||
        /^\/product\/page\/\d+$/.test(config.url) ||
        config.url === '/product/categories' ||
        config.url === '/product/skin-types' ||
        config.url === '/product/search' ||
        /^\/product\/\d+$/.test(config.url) ||
        config.url === '/user/' ||
        config.url === '/user/verify-account' ||
        config.url === '/user/login' ||
        config.url === '/user/forgot-password' ||
        config.url === '/user/update-password' ||
        config.url === '/user/contact'
    ) {
        return config;
    }

    if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
        return config;
    } 
    return Promise.reject("Unauthorized, please login");
}, (error) => {
    console.log(error)
    return Promise.reject(error);
});

ApiServices.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry && error.response.data.error === "Unauthorized, invalid access token") {
            originalRequest._retry = true;

            try {
                const email = getUserLocalStorage().email;
                const id = getUserLocalStorage().sellerId || getUserLocalStorage().userId;
                const refreshToken = getUserLocalStorage().refreshToken;
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
                console.log("refresh expired catch")
                return Promise.reject(refreshError);
            }
        } else if (error.response.status === 401 && !originalRequest._retry) {
             const status = getUserLocalStorage().status;

            if (status === "seller") {
                window.location.href = "/seller/login"
            } else {
                window.location.href = "/login"
            }

            removeUserLocalStorage()

            return Promise.reject("Refresh token expired");
        }

        return Promise.reject(error);
    }
);

export default ApiServices;