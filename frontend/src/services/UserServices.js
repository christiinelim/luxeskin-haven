import ApiServices from "./ApiServices";

const UserServices = {
    createUser: async (data) => {
        try {
            const response = await ApiServices.post('/user/', data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create user');
        }
    },
    login: async (data) => {
        try {
            const response = await ApiServices.post('/user/login', data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to login');
        }
    },
    verify: async (data) => {
        try {
            const response = await ApiServices.post('/user/verify-account', data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to verify');
        }
    },
    getUser: async (userId) => {
        try {
            const response = await ApiServices.get('/user/' + userId);
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
            const response = await ApiServices.post('/user/forgot-password', email);
            return response.data;
        } catch (error) {
            throw new Error('Failed to send');
        }
    },
    updatePassword: async (data) => {
        try {
            const response = await ApiServices.post('/user/update-password', data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to reset password');
        }
    },
    refreshToken: async (data) => {
        try {
            const response = await ApiServices.post('/user/refresh-token', data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve new token');
        }
    },
    updateProfile: async (userId, data) => {
        try {
            const response = await ApiServices.put('/user/' + userId, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to update profile');
        }
    },
    deleteUser: async (userId) => {
        try {
            const response = await ApiServices.delete('/user/' + userId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete account');
        }
    },
    logout: async (refreshToken) => {
        try {
            const response = await ApiServices.post('/user/logout', refreshToken);
            return response.data;
        } catch (error) {
            throw new Error('Failed to logout');
        }
    }
};

export default UserServices;