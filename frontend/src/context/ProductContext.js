import React, { createContext } from 'react';
import ProductServices from '../services/ProductServices';

export const ProductContext = createContext();

export const ProductServicesData = ({ children }) => {

    const createProduct = async (data) => {
        try {
            return await ProductServices.createProduct(data);
        } catch (error) {
            throw new Error(error);
        }
    };

    const getProductBySeller = async (sellerId) => {
        try {
            return await ProductServices.getProductBySeller(sellerId);
        } catch (error) {
            throw new Error(error);
        }
    };

    const getProductById = async (productId) => {
        try {
            return await ProductServices.getProductById(productId);
        } catch (error) {
            throw new Error(error);
        }
    };

    const getProductByIdPublic = async (productId) => {
        try {
            return await ProductServices.getProductById(productId);
        } catch (error) {
            throw new Error(error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            return await ProductServices.deleteProduct(productId);
        } catch (error) {
            throw new Error(error);
        }
    };

    const getAllCategories = async () => {
        try {
            return await ProductServices.getAllCategories();
        } catch (error) {
            throw new Error(error);
        }
    };

    const getAllSkinTypes = async () => {
        try {
            return await ProductServices.getAllSkinTypes();
        } catch (error) {
            throw new Error(error);
        }
    };

    const getAllProducts = async () => {
        try {
            return await ProductServices.getAllProducts();
        } catch (error) {
            throw new Error(error);
        }
    };

    const updateProduct = async (productId, data) => {
        try {
            return await ProductServices.updateProduct(productId, data);
        } catch (error) {
            throw new Error(error);
        }
    };

    const ProductContextValue = {
        createProduct,
        getProductBySeller,
        getProductById,
        getProductByIdPublic,
        deleteProduct,
        getAllCategories,
        getAllSkinTypes,
        getAllProducts,
        updateProduct
    };

    return (
        <ProductContext.Provider value={ProductContextValue}>
            {children}
        </ProductContext.Provider>
    );
};
