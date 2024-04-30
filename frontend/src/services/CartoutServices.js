import ApiServices from "./ApiServices";

const CartoutServices = {
    createPayment: async (data) => {
        try {
            const response = await ApiServices.post('/cartout/', data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create payment');
        }
    }
};

export default CartoutServices;