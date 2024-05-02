import ApiServices from "./ApiServices";

const OrderServices = {
    getCartItemsByUser: async (userId) => {
        try {
            const response = await ApiServices.get('/cart/user/' + userId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve cart items');
        }
    }
};

export default OrderServices;