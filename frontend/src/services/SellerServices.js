import ApiServices from "./ApiServices";

const SELLER_BASE_API = '/seller';

const SellerServices = {
    createSeller: async (data) => {
        try {
            const response = await ApiServices.post(`${SELLER_BASE_API}/`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create seller');
        }
    },
    login: async (data) => {
        try {
            const response = await ApiServices.post(`${SELLER_BASE_API}/login`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to login');
        }
    },
    verify: async (data) => {
        try {
            const response = await ApiServices.post(`${SELLER_BASE_API}/verify-account`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to verify');
        }
    },
    getSeller: async (sellerId) => {
        try {
            const response = await ApiServices.get(`${SELLER_BASE_API}/` + sellerId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve seller details');
        }
    },
    sendResetPasswordToken: async (email) => {
        try {
            const response = await ApiServices.post(`${SELLER_BASE_API}/forgot-password`, email);
            return response.data;
        } catch (error) {
            throw new Error('Failed to send');
        }
    },
    updatePassword: async (data) => {
        try {
            const response = await ApiServices.post(`${SELLER_BASE_API}/update-password`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to reset password');
        }
    },
    refreshToken: async (data) => {
        try {
            const response = await ApiServices.post(`${SELLER_BASE_API}/refresh-token`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve new token');
        }
    },
    updateProfile: async (sellerId, data) => {
        try {
            const response = await ApiServices.put(`${SELLER_BASE_API}/` + sellerId, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to update profile');
        }
    },
    deleteSeller: async (sellerId) => {
        try {
            const response = await ApiServices.delete(`${SELLER_BASE_API}/` + sellerId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete account');
        }
    },
    logout: async (refreshToken) => {
        try {
            const response = await ApiServices.post(`${SELLER_BASE_API}/logout`, refreshToken);
            return response.data;
        } catch (error) {
            throw new Error('Failed to logout');
        }
    },
    getSellers: async () => {
        try {
            const response = await ApiServices.get(`${SELLER_BASE_API}/`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve sellers');
        }
    }
};

export default SellerServices;
