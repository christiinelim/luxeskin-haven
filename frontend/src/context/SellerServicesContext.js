import React, { createContext } from 'react';
import SellerServices from '../services/SellerServices';

export const SellerServicesContext = createContext();

export const SellerServicesData = ({ children }) => {
    return (
        <SellerServicesContext.Provider value={SellerServices}>
            {children}
        </SellerServicesContext.Provider>
    );
};
