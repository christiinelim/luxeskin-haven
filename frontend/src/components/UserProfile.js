import React from "react";
import { useParams } from 'react-router-dom';
import ProfileForm from "./shared/ProfileForm";


const UserProfile = () => {
    const { userId } = useParams();

    return (
        <ProfileForm formType="user" id={ userId } />
    )
}

export default UserProfile;