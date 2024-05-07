import React, { createContext, useState } from 'react';
import { setUserLocalStorage, removeUserLocalStorage, getUserLocalStorage } from '../utils/utils';

export const AuthContext = createContext();

export const AuthServicesData = ({ children }) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(getUserLocalStorage().isLoggedIn === 'true' || false);
    const [ status, setStatus ] = useState(getUserLocalStorage().status);
 
    const login = (data, status) => {
        setUserLocalStorage(data, status);
        setStatus(status)
        setIsLoggedIn(true);
    };

    const logout = () => {
        removeUserLocalStorage();
        setStatus('');
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