import ApiServices from "./ApiServices";

const ProductServices = {
    createProduct: async (data) => {
        try {
            const response = await ApiServices.post('/product/', data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create product product');
        }
    },
    getProductBySeller: async (sellerId) => {
        try {
            const response = await ApiServices.get('/product/seller/' + sellerId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve product details');
        }
    },
    getProductById: async (productId) => {
        try {
            const response = await ApiServices.get('/product/' + productId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve product');
        }
    }
};

export default ProductServices;