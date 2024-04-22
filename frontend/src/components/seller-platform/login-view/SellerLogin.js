import React from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import SellerServices from '../../../services/SellerServices'

const SellerLogin = () => {
    const { register, handleSubmit, setError, getValues, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const response = await SellerServices.login(data); 

            if (response.error) {
                if (response.error === "Account not verified") {
                    setError("root", {
                        message: "Please verify account to login"
                    })
                } else {
                    setError("root", {
                        message: response.error
                    })
                }
            } else {
                // SET IN LOCAL STORAGE JWT 
                console.log(response)
                navigate('/seller/signup');
            }
        } catch (error) {
            console.log(error)
            setError("root", {
                message: "Error logging in"
            })
        }
    }

    return (
        <div className="wrapper seller-login-background">
            <div className="row">
                <div className="col-12 col-md-6"></div>
                <div className="col-12 col-md-6 signup-form-container">
                    <div className="login-form">
                        <div className="form-header">Login</div>

                        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                            <div>
                                <label>Email</label>
                                <input {...register("email", {
                                    required: "Email is required"
                                })} type="text" id="email" name="email" />
                                { errors.email && <div className="form-error-message"><i class="bi bi-exclamation-circle form-error-icon"></i>{ errors.email.message }</div> }
                            </div>

                            <div>
                                <label>Password</label>
                                <input {...register("password", {
                                    required: "Password is required",
                                })} type="password" id="password" name="password" />
                                { errors.password && <div className="form-error-message"><i class="bi bi-exclamation-circle form-error-icon"></i>{ errors.password.message }</div> }
                            </div>

                            <div className="submit-button-container">
                                <button disabled={ isSubmitting } type="submit" className="button-full submit-button">
                                    { isSubmitting ? "Logging In" : "Login" }
                                </button>
                            </div>
                            { errors.root && <div className="form-error-message form-error-box"><i class="bi bi-exclamation-circle form-error-icon"></i>{ errors.root.message }</div> }
                        </form>
                        <div className="form-prompt"><Link to="/seller/forgot-password" className="forgot-password">Forgot Password</Link></div>
                        <div>Do not have an account? | <Link to="/seller/signup" className="form-action">Sign Up</Link></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerLogin;