import React, { createContext } from 'react';
import SellerServices from '../services/SellerServices';

export const SellerContext = createContext();

export const SellerServicesData = ({ children }) => {

    const createSeller = async (data) => {
        try {
            return await SellerServices.createSeller(data);
        } catch (error) {
            throw new Error(error);
        }
    };

    const login = async (data) => {
        try {
            return await SellerServices.login(data);
        } catch (error) {
            throw new Error(error);
        }
    };

    const verify = async (data) => {
        try {
            return await SellerServices.verify(data);
        } catch (error) {
            throw new Error(error);
        }
    };

    const getSeller = async (sellerId) => {
        try {
            return await SellerServices.getSeller(sellerId);
        } catch (error) {
            if (error.response && error.response.data.error === "Unauthorized, please login") {
                return ({ error: "Unauthorized, please login" });
            }
            throw new Error(error);
        }
    };
    
    const sendResetPasswordToken = async (email) => {
        try {
            return await SellerServices.sendResetPasswordToken(email);
        } catch (error) {
            throw new Error(error);
        }
    };

    const updatePassword = async (data) => {
        try {
            return await SellerServices.updatePassword(data);
        } catch (error) {
            throw new Error(error);
        }
    };

    const updateProfile = async (sellerId, data) => {
        try {
            return await SellerServices.updateProfile(sellerId, data);
        } catch (error) {
            throw new Error(error);
        }
    }; 

    const deleteSeller = async (sellerId) => {
        try {
            return await SellerServices.deleteSeller(sellerId);
        } catch (error) {
            throw new Error(error);
        }
    }

    const logout = async (refreshToken) => {
        try {
            return await SellerServices.logout(refreshToken);
        } catch (error) {
            throw new Error(error);
        }
    }

    const getSellers = async () => {
        try {
            return await SellerServices.getSellers();
        } catch (error) {
            throw new Error(error);
        }
    }

    const sellerContextValue = {
        createSeller,
        login,
        verify,
        getSeller,
        sendResetPasswordToken,
        updatePassword,
        updateProfile,
        deleteSeller,
        logout,
        getSellers
    };

    return (
        <SellerContext.Provider value={sellerContextValue}>
            {children}
        </SellerContext.Provider>
    );
};
