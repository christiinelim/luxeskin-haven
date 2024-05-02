import ApiServices from "./ApiServices";

const ORDER_BASE_API = '/order';

const OrderServices = {
    getOrderByUser: async (userId) => {
        try {
            const response = await ApiServices.get(`${ORDER_BASE_API}/user/` + userId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve orders');
        }
    },
    getOrderById: async (orderId) => {
        try {
            const response = await ApiServices.get(`${ORDER_BASE_API}/` + orderId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve order');
        }
    },
    updateOrderProduct: async (data) => {
        try {
            const response = await ApiServices.put(`${ORDER_BASE_API}/product`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to update order and product');
        }
    },
    getOrderProductPivot: async (orderId) => {
        try {
            const response = await ApiServices.get(`${ORDER_BASE_API}/product/` + orderId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve order and product');
        }
    }
};

export default OrderServices;