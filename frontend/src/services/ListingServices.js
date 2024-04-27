import ApiServices from "./ApiServices";

const ListingServices = {
    createListing: async (data) => {
        try {
            const response = await ApiServices.post('/product/', data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create product listing');
        }
    },
    getListings: async (sellerId) => {
        try {
            const response = await ApiServices.get('/product/seller/' + sellerId);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve listing details');
        }
    }
};

export default ListingServices;