import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import LoginForm from "../../shared/login-form/LoginForm";

const SellerLogin = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (authContext.isLoggedIn && authContext.status === 'seller') {
            navigate('/seller/listings');
        }
    }, [authContext.isLoggedIn, authContext.status]);

    return (
        <div className="wrapper login-background seller-login-background">
            <div className="row">
                <div className="col-12 col-md-6"></div>
                <div className="col-12 col-md-6 login-form-container">
                    <LoginForm formType="seller" />
                </div>
            </div>
        </div>
    )
}

export default SellerLogin;