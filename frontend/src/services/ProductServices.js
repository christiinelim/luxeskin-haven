import ApiServices from "./ApiServices";

const PRODUCT_BASE_API = '/product';

const ProductServices = {
    createProduct: async (data) => {
        try {
            const response = await ApiServices.post(`${PRODUCT_BASE_API}/`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create product');
        }
    },
    getProductBySeller: async (sellerId) => {
        try {
            const response = await ApiServices.get(`${PRODUCT_BASE_API}/seller/` + sellerId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve product details');
        }
    },
    getProductById: async (productId) => {
        try {
            const response = await ApiServices.get(`${PRODUCT_BASE_API}/` + productId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve product');
        }
    },
    getProductByIdPublic: async (productId) => {
        try {
            const response = await ApiServices.get(`${PRODUCT_BASE_API}/public/` + productId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve product');
        }
    },
    deleteProduct: async (productId) => {
        try {
            const response = await ApiServices.delete(`${PRODUCT_BASE_API}/` + productId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete product');
        }
    },
    getAllCategories: async () => {
        try {
            const response = await ApiServices.get(`${PRODUCT_BASE_API}/categories`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve product categories');
        }
    },
    getAllSkinTypes: async () => {
        try {
            const response = await ApiServices.get(`${PRODUCT_BASE_API}/skin-types`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve skin types');
        }
    },
    getAllProducts: async () => {
        try {
            const response = await ApiServices.get(`${PRODUCT_BASE_API}/`);
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error('Failed to retrieve products');
        }
    },
    updateProduct: async (productId, data) => {
        try {
            const response = await ApiServices.put(`${PRODUCT_BASE_API}/` + productId, data);
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error('Failed to update product');
        }
    }
};

export default ProductServices;