import React, { createContext } from 'react';
import CartServices from '../services/CartServices';

export const CartContext = createContext();

export const CartServicesData = ({ children }) => {

    const getCartItemsByUser = async (userId) => {
        try {
            return await CartServices.getCartItemsByUser(userId);
        } catch (error) {
            throw new Error(error);
        }
    };

    const addToCart = async (data) => {
        try {
            return await CartServices.addToCart(data);
        } catch (error) {
            throw new Error(error);
        }
    };

    const updateCartItem = async (cartId, data) => {
        try {
            return await CartServices.updateCartItem(cartId, data);
        } catch (error) {
            throw new Error(error);
        }
    };

    const deleteCartItem = async (cartId) => {
        try {
            return await CartServices.deleteCartItem(cartId);
        } catch (error) {
            throw new Error(error);
        }
    };

    const CartContextValue = {
        getCartItemsByUser,
        addToCart,
        updateCartItem,
        deleteCartItem
    };

    return (
        <CartContext.Provider value={CartContextValue}>
            {children}
        </CartContext.Provider>
    );
};
