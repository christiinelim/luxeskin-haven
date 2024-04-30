import React, { createContext } from 'react';
import CartoutServices from '../services/CartoutServices';

export const CartoutContext = createContext();

export const CartoutServicesData = ({ children }) => {

    const createPayment = async (data) => {
        try {
            return await CartoutServices.createPayment(data);
        } catch (error) {
            throw new Error(error);
        }
    };

    const CartoutContextValue = {
        createPayment
    };

    return (
        <CartoutContext.Provider value={CartoutContextValue}>
            {children}
        </CartoutContext.Provider>
    );
};
