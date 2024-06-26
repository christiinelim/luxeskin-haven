import React, { useRef, useContext } from "react";
import verificationImage from "../../../assets/images/verification/verification.gif";
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { SellerContext } from '../../../context/SellerContext';
import { UserContext } from '../../../context/UserContext';
import styles from './styles.module.css';

const VerifyAccount = ({ formType }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const sellerContext = useContext(SellerContext);
    const userContext = useContext(UserContext);
    const { email, id } = location.state;
    const { handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();
    const inputRefs = useRef([null, null, null, null, null, null]);

    const handleKeyUp = (e, index) => {
        const { key } = e;

        if (key === "Backspace" && index > 0) {
            inputRefs.current[index - 1].focus();
        } else if (key !== "Backspace" && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const onSubmit = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const token = inputRefs.current.map((ref) => ref.value).join("");
            let response;

            if (formType === "seller") {
                const verificationData = {
                    "type": "Verification",
                    "seller_id": id,
                    "token": parseInt(token),
                    "email": email,
                    "profile": "Seller"
                };
                response = await sellerContext.verify(verificationData); 
            } else {
                const verificationData = {
                    "type": "Verification",
                    "user_id": id,
                    "token": parseInt(token),
                    "email": email,
                    "profile": "User"
                };
                response = await userContext.verify(verificationData); 
            }
            
            if (response.error) {
                if (response.error === "Invalid token") {
                    setError("root", {
                        message: response.error
                    })
                } else if (response.error === "Token has expired") {
                    setError("root", {
                        message: "Token has expired, a new token has been sent to your email"
                    })
                }
            } else {
                if (formType === "seller") {
                    navigate('/seller/login', { 
                        state: { 
                            success_message: "Account has been successfully verified"
                        }
                    });
                } else {
                    navigate('/login', { 
                        state: { 
                            success_message: "Account has been successfully verified"
                        }
                    });
                }
            }
        } catch (error) {
            setError("root", {
                message: "Error verifying"
            })
        }
    };

    return (
        <div className={styles['verify-wrapper']}>
            <div>
                <img src={verificationImage} alt="verification image"/>
            </div>
            <div>
                <div className={styles['verify-header']}>Please verify your email</div>
            </div>
            <div className={styles['verify-content']}>
                <div>A verification code has been sent to</div>
                <div className={styles['verify-email']}>{ email }</div>
                <div>If you don't see it, you may have to check the spam folder. Please enter the code below to verify your email. The code will expire in 10 minutes.</div>
                <form onSubmit={handleSubmit(onSubmit)} className={styles['verify-form']}>
                    <div className={styles['verify-digit-input']}>
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <div>
                                <input
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    className=""
                                    maxLength={1}
                                    onKeyUp={(e) => handleKeyUp(e, index)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={styles['verify-button']}>
                        <button disabled={ isSubmitting } type="submit" className="button-full">
                            { isSubmitting ? "Loading" : "Verify" }
                        </button>
                    </div>
                    <div>
                        { errors.root && <div className="form-message form-error-box"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.root.message }</div> }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyAccount;
