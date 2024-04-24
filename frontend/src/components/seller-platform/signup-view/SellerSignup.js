import React, { useContext } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { SellerServicesContext } from '../../../context/SellerServicesContext';

const SellerSignup = () => {
    const sellerContext = useContext(SellerServicesContext);
    const { register, handleSubmit, setError, getValues, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            delete data.confirm_password;

            const response = await sellerContext.createSeller(data); 

            if (response.error) {
                setError("root", {
                    message: "Email is already registered with an account"
                })
            } else {
                navigate('/seller/verify-account', { 
                    state: { 
                        email: data.email, 
                        id: response.data.id 
                    }
                });
            }
        } catch (error) {
            setError("root", {
                message: "Error signing up"
            })
        }
    }

    return (
        <div className="wrapper seller-signup-background">
            <div className="row">
                <div className="col-12 col-md-5"></div>
                <div className="col-12 col-md-7 signup-form-container">
                    <div className="signup-form">
                        <div className="form-header">Create Account</div>

                        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                            <div>
                                <label>Username</label>
                                <input {...register("username", {
                                    required: "Username is required"
                                })} type="text" id="username" name="username" />
                                { errors.username && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.username.message }</div> }
                            </div>

                            <div>
                                <label>Email</label>
                                <input {...register("email", {
                                    required: "Email is required",
                                    maxLength: 320,
                                    validate: (value) => value.includes("@") || "Invalid format, email must include @"
                                })} type="text" id="email" name="email" />
                                { errors.email && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.email.message }</div> }
                            </div>

                            <div className="input-half-width">
                                <div className="input-half-width-items">
                                    <label>Password</label>
                                    <input {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}$/,
                                            message: "Password must be 8-32 characters, contain 1 uppercase, lowercase, number and special character"
                                        }
                                    })} type="password" id="password" name="password" />
                                    { errors.password && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.password.message }</div> }
                                </div>

                                <div className="input-half-width-items">
                                    <label>Confirm Password</label>
                                    <input {...register("confirm_password", {
                                        required: "Input is required",
                                        validate: (value) => value === getValues('password') || "Passwords do not match"
                                    })} type="password" id="confirm_password" name="confirm_password" />
                                    { errors.confirm_password && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.confirm_password.message }</div> }
                                </div>
                            </div>

                            <div>
                                <label>Contact</label>
                                <input {...register("contact", {
                                    required: "Contact is required",
                                    pattern: {
                                        value: /^[689]\d{7}$/,
                                        message: "Contact must be 8 numbers, starting with 6, 8 or 9"
                                    }
                                })} type="number" id="contact" name="contact" />
                                { errors.contact && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.contact.message }</div> }
                            </div>

                            <div className="submit-button-container">
                                <button disabled={ isSubmitting } type="submit" className="button-full submit-button">
                                    { isSubmitting ? "Submitting" : "Submit" }
                                </button>
                            </div>
                            { errors.root && <div className="form-message form-error-box"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.root.message }</div> }
                        </form>
                        <div className="form-prompt">Already have an account? | <Link to="/seller/login" className="form-action">Login</Link></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerSignup;