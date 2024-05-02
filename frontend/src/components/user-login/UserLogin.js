import React from "react";
import LoginForm from "../shared/login-form/LoginForm";

const UserLogin = () => {

    return (
        <div className="wrapper login-background user-login-background">
            <div className="row">
                <div className="col-12 col-md-6"></div>
                <div className="col-12 col-md-6 login-form-container">
                    <LoginForm formType="user" />
                </div>
            </div>
        </div>
    )
}

export default UserLogin;