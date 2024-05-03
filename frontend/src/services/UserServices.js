import ApiServices from "./ApiServices";

const USER_BASE_API = '/user';

const UserServices = {
    createUser: async (data) => {
        try {
            const response = await ApiServices.post(`${USER_BASE_API}/`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create user');
        }
    },
    login: async (data) => {
        try {
            const response = await ApiServices.post(`${USER_BASE_API}/login`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to login');
        }
    },
    verify: async (data) => {
        try {
            const response = await ApiServices.post(`${USER_BASE_API}/verify-account`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to verify');
        }
    },
    getUser: async (userId) => {
        try {
            const response = await ApiServices.get(`${USER_BASE_API}/` + userId);
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
            const response = await ApiServices.post(`${USER_BASE_API}/forgot-password`, email);
            return response.data;
        } catch (error) {
            throw new Error('Failed to send');
        }
    },
    updatePassword: async (data) => {
        try {
            const response = await ApiServices.post(`${USER_BASE_API}/update-password`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to reset password');
        }
    },
    refreshToken: async (data) => {
        try {
            const response = await ApiServices.post(`${USER_BASE_API}/refresh-token`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve new token');
        }
    },
    updateProfile: async (userId, data) => {
        try {
            const response = await ApiServices.put(`${USER_BASE_API}/` + userId, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to update profile');
        }
    },
    deleteUser: async (userId) => {
        try {
            const response = await ApiServices.delete(`${USER_BASE_API}/` + userId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete account');
        }
    },
    logout: async (refreshToken) => {
        try {
            const response = await ApiServices.post(`${USER_BASE_API}/logout`, refreshToken);
            return response.data;
        } catch (error) {
            throw new Error('Failed to logout');
        }
    },
    sendContactForm: async (data) => {
        try {
            await ApiServices.post(`${USER_BASE_API}/contact`, data);
        } catch (error) {
            throw new Error('Failed to send');
        }
    }
};

export default UserServices;