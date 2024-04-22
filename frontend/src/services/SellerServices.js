import ApiServices from "./ApiServices";

const SellerServices = {
    createSeller: async (sellerData) => {
        try {
            const response = await ApiServices.post('/seller/create', sellerData);
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error('Failed to create seller');
        }
    },
    // updateSeller: async (sellerId, updatedData) => {
    //     try {
    //         const response = await ApiServices.put(`/seller/${sellerId}`, updatedData);
    //         return response.data;
    //     } catch (error) {
    //         throw new Error('Failed to update seller');
    //     }
    // },
    // deleteSeller: async (sellerId) => {
    //     try {
    //         const response = await ApiServices.delete(`/seller/${sellerId}`);
    //         return response.data;
    //     } catch (error) {
    //         throw new Error('Failed to delete seller');
    //     }
    // }
};

export default SellerServices;
