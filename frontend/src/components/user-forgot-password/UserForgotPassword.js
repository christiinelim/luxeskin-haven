import React from "react";
import ForgotPasswordForm from "../shared/forgot-password-form/ForgotPasswordForm";

const UserForgotPassword = () => {

    return (
        <div className="wrapper login-background user-login-background">
            <div className="row">
                <div className="col-12 col-md-6"></div>
                <div className="col-12 col-md-6 signup-form-container">
                    <ForgotPasswordForm formType="user" />
                </div>
            </div>
        </div>
    )
}

export default UserForgotPassword;