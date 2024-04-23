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
    }
};

export default SellerServices;
