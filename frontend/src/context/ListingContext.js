import React, { createContext } from 'react';
import ListingServices from '../services/ListingServices';

export const ListingContext = createContext();

export const ListingServicesData = ({ children }) => {

    const createListing = async (data) => {
        try {
            return await ListingServices.createListing(data);
        } catch (error) {
            throw new Error('Failed to create product listing');
        }
    };

    const getListings = async (sellerId) => {
        try {
            return await ListingServices.getListings(sellerId);
        } catch (error) {
            throw new Error('Failed to retrieve listing details');
        }
    };

    const listingContextValue = {
        createListing,
        getListings
    };

    return (
        <ListingContext.Provider value={listingContextValue}>
            {children}
        </ListingContext.Provider>
    );
};
