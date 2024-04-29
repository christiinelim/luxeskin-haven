import React from "react";
import SignupForm from "../components/shared/SignupForm";

const UserSignup = () => {

    return (
        <div className="wrapper signup-background user-signup-background">
            <div className="row">
                <div className="col-12 col-md-5"></div>
                <div className="col-12 col-md-7 signup-form-container">
                    <SignupForm formType="user" />
                </div>
            </div>
        </div>
    )
}

export default UserSignup;