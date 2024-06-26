import React, { useContext } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { SellerContext } from '../../../context/SellerContext';
import { UserContext } from '../../../context/UserContext';
import { AuthContext } from "../../../context/AuthContext";
import styles from './styles.module.css';

const LoginForm = ({ formType }) => {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const sellerContext = useContext(SellerContext);
    const userContext = useContext(UserContext);
    const authContext = useContext(AuthContext);

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            let response;

            if (formType === "seller") {
                response = await sellerContext.login(data); 
            } else {
                response = await userContext.login(data); 
            }

            if (response.error) {
                if (response.error === "Account not verified") {
                    setError("root", {
                        message: "Please verify account to login"
                    });

                    if (formType === "seller") {
                        setTimeout(() => {
                            navigate('/seller/verify-account', { 
                                state: { 
                                    email: data.email, 
                                    id: response.data.id 
                                }
                            });
                        }, 3000);
                    } else {
                        setTimeout(() => {
                            navigate('/verify-account', { 
                                state: { 
                                    email: data.email, 
                                    id: response.data.id 
                                }
                            });
                        }, 3000);
                    }
                } else {
                    setError("root", {
                        message: response.error
                    })
                }
            } else {
                authContext.login(response.data, formType);
                if (formType === "seller") {
                    navigate('/seller/listings');
                } else {
                    navigate('/profile/details');
                }   
            }
        } catch (error) {
            setError("root", {
                message: "Error logging in"
            })
        }
    }

    return (
        <div className="login-form">
            <div className="form-header">Login</div>

            <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                <div>
                    <label>Email</label>
                    <input {...register("email", {
                        required: "Email is required"
                    })} type="text" id="email" name="email" />
                    { errors.email && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.email.message }</div> }
                </div>

                <div>
                    <label>Password</label>
                    <input {...register("password", {
                        required: "Password is required",
                    })} type="password" id="password" name="password" />
                    { errors.password && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.password.message }</div> }
                </div>

                <div className="submit-button-container">
                    <button disabled={ isSubmitting } type="submit" className="button-full submit-button">
                        { isSubmitting ? "Logging In" : "Login" }
                    </button>
                </div>
                { errors.root && <div className="form-message form-error-box"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.root.message }</div> }
                {location.state && location.state.success_message && (
                    <div className="form-message form-success-box">
                        <i className="bi bi-check-circle form-icon"></i>{location.state.success_message}
                    </div>
                )}
                {location.state && location.state.error_message && (
                    <div className="form-message form-error-box">
                        <i className="bi bi-exclamation-circle form-icon"></i>{location.state.error_message}
                    </div>
                )}
            </form>
            <div className="form-prompt">
                {
                    (formType === "seller") ? 
                    <Link to="/seller/forgot-password" className={styles['forgot-password']}>Forgot Password</Link> : 
                    <Link to="/forgot-password" className={styles['forgot-password']}>Forgot Password</Link>
                }
            </div>
            <div>Do not have an account? | 
                {
                    (formType === "seller") ? 
                    <Link to="/seller/signup" className="form-action"> Sign Up</Link> : 
                    <Link to="/signup" className="form-action"> Sign Up</Link>
                }
            </div>
        </div>
    )
}

export default LoginForm;