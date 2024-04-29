import React, { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SellerContext } from '../../context/SellerContext';
import { UserContext } from '../../context/UserContext';


const ForgotPasswordForm = ({ formType }) => {
    const navigate = useNavigate();
    const [ tokenSent, setTokenSent ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState(false);
    const [ formData, setFormData ] = useState({});
    const { register, handleSubmit, setError, getValues, formState: { errors, isSubmitting } } = useForm();
    const sellerContext = useContext(SellerContext);
    const userContext = useContext(UserContext);
   
    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            if (!tokenSent) {
                // send reset token
                let response;
                if (formType === "seller") {
                    response = await sellerContext.sendResetPasswordToken(data);
                } else {
                    response = await userContext.sendResetPasswordToken(data);
                }
                
                if (response.error) {
                    setError("root", {
                        message: "Account does not exist"
                    });
                } else {
                    setFormData(response.data);
                    setTokenSent(true);
                    setSuccessMessage(true);
                }
            } else {
                // update password
                setSuccessMessage(false);
                delete data.confirm_password;
                let response;

                if (formType === "seller") {
                    const updatedData = {
                        ...data,
                        seller_id: formData.id,
                        profile: "Seller",
                        type: "Reset"
                    };

                    response = await sellerContext.updatePassword(updatedData);
                } else {
                    const updatedData = {
                        ...data,
                        user_id: formData.id,
                        profile: "User",
                        type: "Reset"
                    };

                    response = await userContext.updatePassword(updatedData);
                }
                
                if (response.error) {
                    if (response.error === "Token has expired") {
                        setError("root", {
                            message: "Token has expired, a new one has been sent to your email"
                        });
                    } else {
                        setError("root", {
                            message: response.error
                        });
                    }
                } else {
                    if (formType === "seller") {
                        navigate('/seller/login', { 
                            state: { 
                                success_message: "Password has been reset successfully"
                            }
                        });
                    } else {
                        navigate('/login', { 
                            state: { 
                                success_message: "Password has been reset successfully"
                            }
                        });
                    }
                    
                } 
            }

        } catch (error) {
            setError("root", {
                message: error.message
            })
        }
    }

    return (
        <div className="login-form">
            <div className="form-header">Reset Password</div>

            <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                <div>
                    <label>Email</label>
                    <input {...register("email", {
                        required: "Email is required"
                    })} type="text" id="email" name="email" disabled={ tokenSent } />
                    { errors.email && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.email.message }</div> }
                </div>

                { tokenSent &&
                    <div>
                        <label>Reset Token</label>
                        <input {...register("token", {
                            required: !tokenSent ? false : "Reset Token is required"
                        })} type="text" id="token" name="token" />
                        { errors.token && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.token.message }</div> }
                    </div>
                }

                { tokenSent &&
                    <div>
                        <label>New Password</label>
                        <input {...register("password", {
                            required: !tokenSent ? false : "Password is required",
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}$/,
                                message: "Password must be 8-32 characters, contain 1 uppercase, lowercase, number and special character"
                            }
                        })} type="password" id="password" name="password" />
                        { errors.password && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.password.message }</div> }
                    </div>
                }

                { tokenSent &&

                    <div>
                        <label>Confirm Password</label>
                        <input {...register("confirm_password", {
                            required: !tokenSent ? false : "Input is required",
                            validate: (value) => value === getValues('password') || "Passwords do not match"
                        })} type="password" id="confirm_password" name="confirm_password" />
                        { errors.confirm_password && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.confirm_password.message }</div> }
                    </div>
                }

                <div className="submit-button-container">
                    <button disabled={ isSubmitting } type="submit" className="button-full submit-button">
                        { isSubmitting ? "Loading" : !tokenSent ? "Send Reset Token" : "Update Password" }
                    </button>
                </div>
                { errors.root && <div className="form-message form-error-box"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.root.message }</div> }
                { successMessage && <div className="form-message form-success-box"><i className="bi bi-check-circle form-icon"></i>Reset token has been sent to your email</div> }
            </form>
        </div>
    )
}

export default ForgotPasswordForm;