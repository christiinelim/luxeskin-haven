import React, { createContext } from 'react';
import UserServices from '../services/UserServices';

export const UserContext = createContext();

export const UserServicesData = ({ children }) => {

    const createUser = async (data) => {
        try {
            return await UserServices.createUser(data);
        } catch (error) {
            throw new Error(error);
        }
    };

    const login = async (data) => {
        try {
            return await UserServices.login(data);
        } catch (error) {
            throw new Error(error);
        }
    };

    const verify = async (data) => {
        try {
            return await UserServices.verify(data);
        } catch (error) {
            throw new Error(error);
        }
    };

    const getUser = async (userId) => {
        try {
            return await UserServices.getUser(userId);
        } catch (error) {
            if (error.response && error.response.data.error === "Unauthorized, please login") {
                return ({ error: "Unauthorized, please login" });
            }
            throw new Error(error);
        }
    };
    
    const sendResetPasswordToken = async (email) => {
        try {
            return await UserServices.sendResetPasswordToken(email);
        } catch (error) {
            throw new Error(error);
        }
    };

    const updatePassword = async (data) => {
        try {
            return await UserServices.updatePassword(data);
        } catch (error) {
            throw new Error(error);
        }
    };

    const updateProfile = async (userId, data) => {
        try {
            return await UserServices.updateProfile(userId, data);
        } catch (error) {
            throw new Error(error);
        }
    }; 

    const deleteUser = async (userId) => {
        try {
            return await UserServices.deleteUser(userId);
        } catch (error) {
            throw new Error(error);
        }
    }

    const logout = async (refreshToken) => {
        try {
            return await UserServices.logout(refreshToken);
        } catch (error) {
            throw new Error(error);
        }
    }

    const userContextValue = {
        createUser,
        login,
        verify,
        getUser,
        sendResetPasswordToken,
        updatePassword,
        updateProfile,
        deleteUser,
        logout
    };

    return (
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    );
};
