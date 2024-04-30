import React, { useEffect, useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useParams } from 'react-router-dom';

const UserCart = () => {
    const { userId } = useParams();
    const cartContext = useContext(CartContext);
    const [ userCart, setUserCart ] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [ subtotal, setSubtotal ] = useState(0);
    const [ productErrors, setProductErrors ] = useState({});

    useEffect(() => {
        
        const fetchData = async() => {
            try {
                const response = await cartContext.getCartItemsByUser(userId);
                const cartData = response.data;
                setUserCart(cartData);
                const initialQuantities = {};
                cartData.forEach((item) => {
                    initialQuantities[item.id] = item.quantity;
                });
                setQuantities(initialQuantities);

            } catch (error) {
               // error navigate to login
            }
        }

        fetchData();
        
    }, [userId]);

    useEffect(() => {
        if (userCart && Object.keys(quantities).length > 0) {
            const total = userCart.reduce((accumulator, cartItem) => {
                return accumulator + cartItem.product.cost * quantities[cartItem.id];
            }, 0);
            setSubtotal(total);
        }
    }, [userCart, quantities]);

    const handleIncrement = (cartId, productId) => {
        setQuantities((prevQuantities) => {
            const updatedQuantities = {
                ...prevQuantities,
                [cartId]: (prevQuantities[cartId] || 0) + 1,
            };
            handleUpdateCart(cartId, productId, updatedQuantities);
            return updatedQuantities;
        });
    };

    const handleDecrement = (cartId, productId) => {
        if (quantities[cartId] > 1) {
            setQuantities((prevQuantities) => {
                const updatedQuantities = {
                    ...prevQuantities,
                    [cartId]: prevQuantities[cartId] - 1,
                };
                handleUpdateCart(cartId, productId, updatedQuantities);
                return updatedQuantities;
            });
        }
    };

    const handleQuantityChange = (cartId, productId, e) => {
        const newQuantity = parseInt(e.target.value) || 1;
        const updatedQuantities = {
            ...quantities,
            [cartId]: newQuantity,
        };
        setQuantities(updatedQuantities);
        handleUpdateCart(cartId, productId, updatedQuantities);
        return updatedQuantities;
    };

    const handleUpdateCart = async (cartId, productId, updatedQuantities) => {
        try {
            const updatedCart = {
                product_id: productId,
                user_id: userId,
                quantity: updatedQuantities[cartId],
            };

            const response = await cartContext.updateCartItem(cartId, updatedCart);
            if (response.error) {
                const newQuantities = {
                    ...quantities,
                    [cartId]: updatedQuantities[cartId] - 1,
                };
                setQuantities(newQuantities);
                setProductErrors((prevErrors) => ({
                    ...prevErrors,
                    [cartId]: true,
                }));

                setTimeout(() => {
                    setProductErrors((prevErrors) => ({
                        ...prevErrors,
                        [cartId]: false,
                    }));
                }, 3000);
            } else {
                setProductErrors((prevErrors) => ({
                    ...prevErrors,
                    [cartId]: false,
                }));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        userCart &&
        <div className='cart-wrapper'>
            <div className='row'>
                <div className='col-12 col-sm-8 summary-wrapper'>
                    <div className='page-header'>My Cart</div>
                    <div className='cart-list'>
                        {
                            userCart.map ((cartItem) => (
                                <div key={cartItem.id} className='cart-items'>
                                    <div>
                                        <div><img src={ cartItem.product.image } className='cart-item-image' alt='product'/></div>
                                    </div>
                                    <div className='cart-description'>
                                        <div>
                                            <div className='cart-brand'>{ cartItem.product.seller.username }</div>
                                            <div className='cart-text cart-text-large'>{ cartItem.product.name }</div>
                                            <div className='cart-quantity'>
                                                <div className='cart-text'>Quantity:</div>
                                                <div className='quantity-adjust'>
                                                    <div onClick={() => handleDecrement(cartItem.id, cartItem.product_id)} className='quantity-action'><i className="bi bi-dash-circle"></i></div>
                                                    <div>
                                                        <input
                                                            type='text'
                                                            className='quantity-box-cart'
                                                            value={quantities[cartItem.id]}
                                                            onChange={(e) => handleQuantityChange(cartItem.id, cartItem.product_id, e)}
                                                        />
                                                    </div>
                                                    <div onClick={() => handleIncrement(cartItem.id, cartItem.product_id)} className='quantity-action'><i className="bi bi-plus-circle"></i></div>
                                                </div>
                                                { productErrors[cartItem.id] && <div>Insufficient stock!</div> }
                                            </div>
                                        </div>
                                        <div className='cart-text-large'>
                                            ${ (cartItem.product.cost * quantities[cartItem.id]).toFixed(2) }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className='col-12 col-sm-4 summary-wrapper'>
                    <div className='page-header summary-header'>Order Summary</div>

                    <div className='cost-wrapper'>
                        <div className='cost-items sub-total'>
                            <div>Sub-total</div>
                            <div>${ subtotal.toFixed(2) }</div>
                        </div>
                        <div className='cost-items'>
                            <div>Shipping</div>
                            <div className='shipping-cost'>+ $3.50</div>
                        </div>
                        <div className='cost-items cost-total'>
                            <div>Total</div>
                            <div>${ (parseFloat(subtotal) + 3.50).toFixed(2) }</div>
                        </div>
                        <div className='button-full checkout-button'>Proceed to Checkout</div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default UserCart