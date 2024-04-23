import React, { createContext } from 'react';
import SellerServices from '../services/SellerServices';

export const SellerServicesContext = createContext();

export const SellerServicesData = ({ children }) => {
    const createSeller = async (data) => {
        try {
            return await SellerServices.createSeller(data);
        } catch (error) {
            throw new Error('Failed to create seller');
        }
    };

    const login = async (data) => {
        try {
            return await SellerServices.login(data);
        } catch (error) {
            throw new Error('Failed to login');
        }
    };

    const verify = async (data) => {
        try {
            return await SellerServices.verify(data);
        } catch (error) {
            throw new Error('Failed to verify');
        }
    };

    const getSeller = async (sellerId) => {
        try {
            return await SellerServices.getSeller(sellerId);
        } catch (error) {
            if (error.response && error.response.data.error === "Unauthorized, please login") {
                return ({ error: "Unauthorized, please login" });
            }
            throw new Error('Failed to retrieve seller details');
        }
    };
    
    const sendResetPasswordToken = async (email) => {
        try {
            return await SellerServices.sendResetPasswordToken(email);
        } catch (error) {
            throw new Error('Failed to send');
        }
    }

    const sellerContextValue = {
        createSeller,
        login,
        verify,
        getSeller,
        sendResetPasswordToken
    };

    return (
        <SellerServicesContext.Provider value={sellerContextValue}>
            {children}
        </SellerServicesContext.Provider>
    );
};
