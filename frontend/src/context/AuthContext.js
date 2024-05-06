import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthServicesData = ({ children }) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [ status, setStatus ] = useState(localStorage.getItem('status'));
 
    const login = (data, status) => {
        if (status === "seller") {
            localStorage.setItem("sellerId", data.id);
            localStorage.setItem("activePage", '/seller/listings');
            localStorage.setItem("status", status);
            setStatus(status)
        } else {
            localStorage.setItem("userId", data.id);
            localStorage.setItem("status", status);
            setStatus(status)
        }
        localStorage.setItem("email", data.email);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("isLoggedIn", 'true');
        setIsLoggedIn(true);
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
        localStorage.removeItem("status");
        setIsLoggedIn(false);
    };

    const authContextValue = {
        login,
        logout,
        isLoggedIn,
        status
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};