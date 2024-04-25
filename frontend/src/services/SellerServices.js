import ApiServices from "./ApiServices";

const SellerServices = {
    createSeller: async (data) => {
        try {
            const response = await ApiServices.post('/seller/create', data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create seller');
        }
    },
    login: async (data) => {
        try {
            const response = await ApiServices.post('/seller/login', data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to login');
        }
    },
    verify: async (data) => {
        try {
            const response = await ApiServices.post('/seller/verify-account', data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to verify');
        }
    },
    getSeller: async (sellerId) => {
        try {
            const response = await ApiServices.get('/seller/profile/' + sellerId);
            return response.data;
        } catch (error) {
            if (error.response.data.error === "Unauthorized, please login") {
                return ({error: "Unauthorized, please login"})
            }
            throw new Error('Failed to retrieve seller details');
        }
    },
    sendResetPasswordToken: async (email) => {
        try {
            const response = await ApiServices.post('/seller/forgot-password', email);
            return response.data;
        } catch (error) {
            throw new Error('Failed to send');
        }
    },
    updatePassword: async (data) => {
        try {
            const response = await ApiServices.post('/seller/update-password', data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to reset password');
        }
    },
    refreshToken: async (data) => {
        try {
            const response = await ApiServices.post('/seller/refresh-token', data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve new token');
        }
    },
    updateProfile: async (sellerId, data) => {
        try {
            const response = await ApiServices.put('/seller/update-profile/' + sellerId, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to update profile');
        }
    },
    deleteSeller: async (sellerId) => {
        try {
            const response = await ApiServices.delete('/seller/delete/' + sellerId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete account');
        }
    }
};

export default SellerServices;
