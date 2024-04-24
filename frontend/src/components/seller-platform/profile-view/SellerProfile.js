import React, { useState, useContext, useEffect } from 'react';
import { SellerServicesContext } from '../../../context/SellerServicesContext';
import { useParams, useNavigate } from 'react-router-dom';

const SellerProfile = () => {
    const [ seller, setSeller ] = useState({});
    const sellerContext = useContext(SellerServicesContext);
    const { sellerId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        
        const fetchData = async() => {
            const response = await sellerContext.getSeller(sellerId);

            if (response.error === "Unauthorized, please login") {
                navigate('/seller/login', { 
                    state: { 
                        error_message: "Unauthorized, please login to access"
                    }
                });
            }
            // setSeller(response.data)
        }

        fetchData();
        
    }, []);

    return (
        <>
        </>
    )
}

export default SellerProfile;