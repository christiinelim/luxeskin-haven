import React from "react";
import { useForm } from 'react-hook-form';

const SellerSignup = () => {
    const { register, handleSubmit, setError, getValues, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log(data)
            delete data.confirm_password;
            console.log(data)
            // throw new Error();
            // need include verified no and created at
        } catch (error) {
            setError("root", {
                message: "Error signing up"
            })
        }
    }

    return (
        <div className="wrapper seller-signup-background">
            <div className="row">
                <div className="col-12 col-md-6"></div>
                <div className="col-12 col-md-6 signup-form-container">
                    <div className="signup-form">
                        <div className="form-header">Create Account</div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label>Username</label>
                                <input {...register("username", {
                                    required: "Username is required"
                                })} type="text" id="username" name="username" />
                                { errors.username && <div>{ errors.username.message }</div> }
                            </div>

                            <div>
                                <label>Email</label>
                                <input {...register("email", {
                                    required: "Email is required",
                                    maxLength: 320,
                                    validate: (value) => value.includes("@") || "Invalid format, email must include @"
                                })} type="text" id="email" name="email" />
                                { errors.email && <div>{ errors.email.message }</div> }
                            </div>

                            <div className="input-half-width">
                                <div className="input-half-width-items">
                                    <label>Password</label>
                                    <input {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}$/,
                                            message: "Password must be 8 to 32 characters, contain at least 1 uppercase, lowercase, number and special character"
                                        }
                                    })} type="password" id="password" name="password" />
                                    { errors.password && <div>{ errors.password.message }</div> }
                                </div>

                                <div className="input-half-width-items">
                                    <label>Confirm Password</label>
                                    <input {...register("confirm_password", {
                                        required: "Confirm password is required",
                                        validate: (value) => value === getValues('password') || "Passwords do not match"
                                    })} type="password" id="confirm_password" name="confirm_password" />
                                    { errors.confirm_password && <div>{ errors.confirm_password.message }</div> }
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
                                { errors.contact && <div>{ errors.contact.message }</div> }
                            </div>

                            <div className="submit-button-container">
                                <button disabled={ isSubmitting } type="submit" className="button-full submit-button">
                                    { isSubmitting ? "Submitting" : "Submit" }
                                </button>
                            </div>
                            { errors.root && <div>{ errors.root.message }</div> }
                        </form>
                        <div className="login-prompt">Already have an account? | <span className="login-action">Login</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerSignup;