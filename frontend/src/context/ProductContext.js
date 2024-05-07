import React, { createContext, useState, useEffect } from 'react';
import ProductServices from '../services/ProductServices';

export const ProductContext = createContext();

export const ProductServicesData = ({ children }) => {
    const [ pages, setPages ] = useState(null);
    const [ productPage, setProductPage ] = useState(null);
    const [ categories, setCategories ] = useState([]);
    const [ skinTypes, setSkinTypes ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const pages = await getProductsByPage(1);
            setPages(pages);

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

    const getProductsByPage = async (page) => {
        try {
            if (productPage === null || !(`page${page}` in productPage)) {
                const products = await ProductServices.getAllProducts(page);
                const productsData = products.data.products;
                setProductPage((prevProductPage) => ({
                    ...prevProductPage,
                    ['page' + page]: productsData,
                }));
                return products.data.pages
            }
        } catch (error) {
            console.error(error);
        }
    };

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
            console.log(error)
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
        deleteProduct,
        updateProduct,
        searchProducts,
        loading,
        categories,
        skinTypes,
        pages,
        productPage,
        getProductsByPage
    };

    return (
        <ProductContext.Provider value={ProductContextValue}>
            {children}
        </ProductContext.Provider>
    );
};
