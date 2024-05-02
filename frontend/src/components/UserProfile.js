import React from "react";
import ProfileForm from "./shared/ProfileForm";


const UserProfile = () => {
    const userId = localStorage.getItem("userId");

    return (
        <ProfileForm formType="user" id={ userId } />
    )
}

export default UserProfile;