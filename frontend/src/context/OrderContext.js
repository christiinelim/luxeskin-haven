import React, { createContext } from 'react';
import OrderServices from '../services/OrderServices';

export const OrderContext = createContext();

export const OrderServicesData = ({ children }) => {

    const getOrderByUser = async (userId) => {
        try {
            return await OrderServices.getOrderByUser(userId);
        } catch (error) {
            throw new Error(error);
        }
    };

    const getOrderBySeller = async (sellerId) => {
        try {
            return await OrderServices.getOrderBySeller(sellerId);
        } catch (error) {
            throw new Error(error);
        }
    };

    const getOrderById = async (orderId) => {
        try {
            return await OrderServices.getOrderById(orderId);
        } catch (error) {
            throw new Error(error);
        }
    };

    const updateOrderProduct = async (data) => {
        try {
            return await OrderServices.updateOrderProduct(data);
        } catch (error) {
            throw new Error(error);
        }
    };

    const getOrderProductPivot = async (orderId) => {
        try {
            return await OrderServices.getOrderProductPivot(orderId);
        } catch (error) {
            throw new Error(error);
        }
    };

    const OrderContextValue = {
        getOrderByUser,
        getOrderBySeller,
        getOrderById,
        updateOrderProduct,
        getOrderProductPivot
    };

    return (
        <OrderContext.Provider value={OrderContextValue}>
            {children}
        </OrderContext.Provider>
    );
};
