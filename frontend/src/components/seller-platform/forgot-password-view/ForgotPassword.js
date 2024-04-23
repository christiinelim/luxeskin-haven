import React, { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import { SellerServicesContext } from '../../../context/SellerServicesContext'


const ForgotPassword = () => {
    const [ tokenSent, setTokenSent ] = useState(false);
    const { register, handleSubmit, setError, getValues, formState: { errors, isSubmitting } } = useForm();
    const sellerContext = useContext(SellerServicesContext);

    // email then token and password/confirm password
   
    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            if (!tokenSent) {
                // send reset token
                const response = await sellerContext.sendResetPasswordToken(data);
                console.log(response)

                setTokenSent(true);
            } else {
                // update password
            }

        } catch (error) {
            console.log(error)
            setError("root", {
                message: "Error sending reset token"
            })
        }
    }

    return (
        <div className="wrapper seller-login-background">
            <div className="row">
                <div className="col-12 col-md-6"></div>
                <div className="col-12 col-md-6 signup-form-container">
                    <div className="login-form">
                        <div className="form-header">Reset Password</div>

                        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                            <div>
                                <label>Email</label>
                                <input {...register("email", {
                                    required: "Email is required"
                                })} type="text" id="email" name="email" disabled={ tokenSent } />
                                { errors.email && <div className="form-message"><i class="bi bi-exclamation-circle form-icon"></i>{ errors.email.message }</div> }
                            </div>

                            { tokenSent &&
                                <div>
                                    <label>Reset Token</label>
                                    <input {...register("token", {
                                        required: !tokenSent ? false : "Reset Token is required"
                                    })} type="text" id="token" name="token" />
                                    { errors.token && <div className="form-message"><i class="bi bi-exclamation-circle form-icon"></i>{ errors.token.message }</div> }
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
                                    { errors.password && <div className="form-message"><i class="bi bi-exclamation-circle form-icon"></i>{ errors.password.message }</div> }
                                </div>
                            }

                            { tokenSent &&

                                <div>
                                    <label>Confirm Password</label>
                                    <input {...register("confirm_password", {
                                        required: !tokenSent ? false : "Input is required",
                                        validate: (value) => value === getValues('password') || "Passwords do not match"
                                    })} type="password" id="confirm_password" name="confirm_password" />
                                    { errors.confirm_password && <div className="form-message"><i class="bi bi-exclamation-circle form-icon"></i>{ errors.confirm_password.message }</div> }
                                </div>
                            }

                            <div className="submit-button-container">
                                <button disabled={ isSubmitting } type="submit" className="button-full submit-button">
                                    { isSubmitting ? "Loading" : !tokenSent ? "Send Reset Token" : "Update Password" }
                                </button>
                            </div>
                            { errors.root && <div className="form-message form-error-box"><i class="bi bi-exclamation-circle form-icon"></i>{ errors.root.message }</div> }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;