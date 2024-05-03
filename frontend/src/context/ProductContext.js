import React, { createContext, useState, useEffect } from 'react';
import ProductServices from '../services/ProductServices';

export const ProductContext = createContext();

export const ProductServicesData = ({ children }) => {
    const [ products, setProducts ] = useState([]);
    const [ categories, setCategories ] = useState([]);
    const [ skinTypes, setSkinTypes ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const allProducts = await ProductServices.getAllProducts();
            const productsData = allProducts.data;
            setProducts(productsData);

            const allCategories = await ProductServices.getAllCategories();
            const categoriesData = allCategories.data;
            setCategories(categoriesData);

            const allSkinTypes = await ProductServices.getAllSkinTypes();
            const skinTypesData = allSkinTypes.data;
            setSkinTypes(skinTypesData);

            setLoading(false);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
    }, []);

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

    const updateProduct = async (productId, data) => {
        try {
            return await ProductServices.updateProduct(productId, data);
        } catch (error) {
            throw new Error(error);
        }
    };

    const searchProducts = async (data) => {
        try {
            return await ProductServices.searchProducts(data);
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
        updateProduct,
        searchProducts,
        products,
        loading,
        categories,
        skinTypes
    };

    return (
        <ProductContext.Provider value={ProductContextValue}>
            {children}
        </ProductContext.Provider>
    );
};
