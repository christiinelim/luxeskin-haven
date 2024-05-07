import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import { SellerContext } from '../context/SellerContext';

export const LogoutHandler = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);
    const sellerContext = useContext(SellerContext);

    const handleUserLogout = async (message) => {
        try {
            await userContext.logout({ refreshToken: localStorage.getItem("refreshToken") });
            navigate('/login', { 
                state: { 
                    success_message: message
                }
            });
            authContext.logout("user");
            return Promise.resolve();
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        } 
    };

    const handleSellerLogout = async (message) => {
        try {
            await sellerContext.logout({ refreshToken: localStorage.getItem("refreshToken") });
            navigate('/seller/login', { 
                state: { 
                    success_message: message
                }
            });
            authContext.logout("seller");
            return Promise.resolve();
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        } 
    };

    return { handleUserLogout, handleSellerLogout };
};
