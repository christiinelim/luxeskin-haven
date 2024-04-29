import React from "react";
import SignupForm from "../shared/SignupForm";

const SellerSignup = () => {

    return (
        <div className="wrapper signup-background seller-signup-background">
            <div className="row">
                <div className="col-12 col-md-5"></div>
                <div className="col-12 col-md-7 signup-form-container">
                    <SignupForm formType="seller" />
                </div>
            </div>
        </div>
    )
}

export default SellerSignup;