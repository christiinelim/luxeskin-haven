import ApiServices from "./ApiServices";

const ProductServices = {
    createProduct: async (data) => {
        try {
            const response = await ApiServices.post('/product/', data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create product');
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
    },
    getProductByIdPublic: async (productId) => {
        try {
            const response = await ApiServices.get('/product/public/' + productId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve product');
        }
    },
    deleteProduct: async (productId) => {
        try {
            const response = await ApiServices.delete('/product/' + productId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete product');
        }
    },
    getAllCategories: async () => {
        try {
            const response = await ApiServices.get('/product/categories');
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve product categories');
        }
    },
    getAllSkinTypes: async () => {
        try {
            const response = await ApiServices.get('/product/skin-types');
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve skin types');
        }
    },
    getAllProducts: async () => {
        try {
            const response = await ApiServices.get('/product/');
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error('Failed to retrieve products');
        }
    },
    updateProduct: async (productId, data) => {
        try {
            const response = await ApiServices.put('/product/' + productId, data);
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error('Failed to update product');
        }
    }
};

export default ProductServices;