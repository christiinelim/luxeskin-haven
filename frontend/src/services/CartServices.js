import ApiServices from "./ApiServices";

const CART_BASE_API = '/cart';

const CartServices = {
    getCartItemsByUser: async (userId) => {
        try {
            const response = await ApiServices.get(`${CART_BASE_API}/user/` + userId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve cart items');
        }
    },
    addToCart: async (data) => {
        try {
            const response = await ApiServices.post(`${CART_BASE_API}/`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to add cart item');
        }
    },
    updateCartItem: async (cartId, data) => {
        try {
            const response = await ApiServices.put(`${CART_BASE_API}/` + cartId, data);
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error('Failed to update cart item');
        }
    },
    deleteCartItem: async (cartId) => {
        try {
            const response = await ApiServices.delete(`${CART_BASE_API}/` + cartId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete cart item');
        }
    }
};

export default CartServices;