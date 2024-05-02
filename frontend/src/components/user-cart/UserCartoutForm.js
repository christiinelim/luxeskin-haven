import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { CartoutContext } from '../../context/CartoutContext';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
import styles from './styles.module.css';

const UserCartoutForm = ({ userId, checkedItems, onCancel }) => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const cartoutContext = useContext(CartoutContext);
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();
    
    useEffect(() => { 
        const fetchData = async() => {
            try {
                const response = await userContext.getUser(userId);
                
                if (response.error === "Unauthorized, please login") {
                    navigate('/login', {
                        state: { 
                            error_message: "Unauthorized, please login to access"
                        }
                    })
                } else {
                    const userAddress = response.data.address;
                    if (userAddress!== "") {
                        setValue("address", userAddress);
                    }
                }
            } catch (error) {
                navigate('/login', {
                    state: {
                        error_message: "Unauthorized, please login to access"
                    }
                })
            }
        }

        fetchData();
        
    }, [userId]);

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await userContext.updateProfile(userId, data); 
            handleCheckOut();
        } catch (error) {
            console.log(error)
        }
    };

    const handleCancelClick = () => {
        onCancel();
    };

    const handleCheckOut = async () => {
        try {
            const data = {
                items: checkedItems,
                user_id: userId
            }
            const response = await cartoutContext.createPayment(data);
            const { sessionId } = response;
            console.log(sessionId)

            const stripe = await stripePromise;
            await stripe.redirectToCheckout({
                sessionId: sessionId,
            });
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className={styles['cart-address-header']}>Address</div>
                <input {...register("address", {
                    required: "Address is required"
                })} type="text" id="address" name="address" /> 
                { errors.address && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.address.message }</div> }
            </div>    
            <div id={styles['payment-cancel']} className="button-border" onClick={ handleCancelClick }>Cancel</div> 
            <button disabled={ isSubmitting } type="submit" id={styles['payment-proceed']} className="button-full">
                { isSubmitting ? "Processing" : "Proceed to Payment" }
            </button>             
        </form>
    )
}

export default UserCartoutForm;