import React, { createContext } from 'react';
import ProductServices from '../services/ProductServices';

export const ProductContext = createContext();

export const ProductServicesData = ({ children }) => {

    const createProduct = async (data) => {
        try {
            return await ProductServices.createProduct(data);
        } catch (error) {
            throw new Error('Failed to create product');
        }
    };

    const getProductBySeller = async (sellerId) => {
        try {
            return await ProductServices.getProductBySeller(sellerId);
        } catch (error) {
            throw new Error('Failed to retrieve product details');
        }
    };

    const getProductById = async (productId) => {
        try {
            return await ProductServices.getProductById(productId);
        } catch (error) {
            throw new Error('Failed to retrieve product');
        }
    };

    const ProductContextValue = {
        createProduct,
        getProductBySeller,
        getProductById
    };

    return (
        <ProductContext.Provider value={ProductContextValue}>
            {children}
        </ProductContext.Provider>
    );
};
