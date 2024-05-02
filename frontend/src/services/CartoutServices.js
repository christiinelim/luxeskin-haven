import ApiServices from "./ApiServices";

const CARTOUT_BASE_API = '/cartout';

const CartoutServices = {
    createPayment: async (data) => {
        try {
            const response = await ApiServices.post(`${CARTOUT_BASE_API}/`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create payment');
        }
    }
};

export default CartoutServices;