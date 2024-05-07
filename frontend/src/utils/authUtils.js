import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import { SellerContext } from '../context/SellerContext';
import { getUserLocalStorage } from './utils';

export const LogoutHandler = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);
    const sellerContext = useContext(SellerContext);

    const handleUserLogout = async (message) => {
        try {
            await userContext.logout({ refreshToken: getUserLocalStorage().refreshToken });
            navigate('/login', { 
                state: { 
                    success_message: message
                }
            });
            authContext.logout();
            return Promise.resolve();
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        } 
    };

    const handleSellerLogout = async (message) => {
        try {
            await sellerContext.logout({ refreshToken: getUserLocalStorage().refreshToken });
            navigate('/seller/login', { 
                state: { 
                    success_message: message
                }
            });
            authContext.logout();
            return Promise.resolve();
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        } 
    };

    return { handleUserLogout, handleSellerLogout };
};
