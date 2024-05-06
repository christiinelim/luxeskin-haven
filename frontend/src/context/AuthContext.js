import React, { createContext, useState } from 'react';
import { setLocalStorage, removeLocalStorage } from '../utils/utils';

export const AuthContext = createContext();

export const AuthServicesData = ({ children }) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [ status, setStatus ] = useState(localStorage.getItem('status'));
 
    const login = (data, status) => {
        setLocalStorage(data, status);
        setStatus(status)
        setIsLoggedIn(true);
    };

    const logout = (status) => {
        removeLocalStorage(status);
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