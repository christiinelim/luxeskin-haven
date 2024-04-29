import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileForm from '../shared/ProfileForm';

const SellerProfile = () => {
    const { sellerId } = useParams();
    
    return (
        <ProfileForm formType="seller" id={ sellerId } />
    )
}

export default SellerProfile;