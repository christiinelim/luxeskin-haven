import ApiServices from "./ApiServices";

const CartServices = {
    getCartItemsByUser: async (userId) => {
        try {
            const response = await ApiServices.get('/cart/user/' + userId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve cart items');
        }
    },
    addToCart: async (data) => {
        try {
            const response = await ApiServices.post('/cart/', data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to add cart item');
        }
    },
    updateCartItem: async (cartId, data) => {
        try {
            const response = await ApiServices.put('/cart/' + cartId, data);
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error('Failed to update cart item');
        }
    },
    deleteCartItem: async (cartId) => {
        try {
            const response = await ApiServices.delete('/cart/' + cartId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete cart item');
        }
    }
};

export default CartServices;