import React from "react";
import ProfileForm from "../shared/profile-form/ProfileForm";
import { getUserLocalStorage } from "../../utils/utils";

const UserProfile = () => {
    const userId = getUserLocalStorage().userId;

    return (
        <ProfileForm formType="user" id={ userId } />
    )
}

export default UserProfile;