import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthData = ({ children }) => {

    const login = (data, status) => {
        if (status === "seller") {
            localStorage.setItem("sellerId", data.id);
            localStorage.setItem("activePage", '/listings');
        } else {
            localStorage.setItem("userId", data.id);
        }
        localStorage.setItem("email", data.email);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("isLoggedIn", 'true');
        
    };

    const logout = (status) => {
        if (status === "seller") {
            localStorage.removeItem("sellerId");
            localStorage.removeItem("activePage");
        } else {
            localStorage.removeItem("userId");
        }
        localStorage.removeItem("email");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("isLoggedIn");
    };

    const isLoggedIn = () => {
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    const authContextValue = {
        login,
        logout,
        isLoggedIn
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};