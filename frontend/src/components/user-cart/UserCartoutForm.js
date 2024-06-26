import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../context/UserContext';
import { CartoutContext } from '../../context/CartoutContext';
import { loadStripe } from '@stripe/stripe-js';
import styles from './styles.module.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const UserCartoutForm = ({ userId, checkedItems, onCancel }) => {
    const userContext = useContext(UserContext);
    const cartoutContext = useContext(CartoutContext);
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();
    
    useEffect(() => { 
        const fetchData = async() => {
            try {
                const response = await userContext.getUser(userId);
                const userAddress = response.data.address;
                if (userAddress!== "") {
                    setValue("address", userAddress);
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
        
    }, [userId]);

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await userContext.updateProfile(userId, {address: data.address}); 
            handleCheckOut(data);
        } catch (error) {
            console.log(error)
        }
    };

    const handleCancelClick = () => {
        onCancel();
    };

    const handleCheckOut = async (formData) => {
        try {
            const data = {
                items: checkedItems,
                user_id: userId,
                name: formData.name,
                address: formData.address
            }
            const response = await cartoutContext.createPayment(data);
            const { sessionId } = response;

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
            <div className={styles['name-header']}>
                <div className={styles['cart-header']}>Name</div>
                <input {...register("name", {
                    required: "Name is required"
                })} type="text" id="name" name="name" /> 
                { errors.name && <div className="form-message"><i className="bi bi-exclamation-circle form-icon"></i>{ errors.name.message }</div> }
            </div> 
            <div className={styles['address-header']}>
                <div className={styles['cart-header']}>Address</div>
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