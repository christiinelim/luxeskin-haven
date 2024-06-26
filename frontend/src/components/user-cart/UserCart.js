import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { ProductContext } from '../../context/ProductContext';
import { getUserLocalStorage } from '../../utils/utils';
import { updateCartItemGuest, deleteCartItemGuest, getGuestCart, clearGuestCart } from '../../utils/cartUtils';
import UserCartoutForm from './UserCartoutForm';
import styles from './styles.module.css';

const UserCart = () => {
    const userId = getUserLocalStorage().userId;
    const navigate = useNavigate();
    const cartContext = useContext(CartContext);
    const productContext = useContext(ProductContext);
    const [ userCart, setUserCart ] = useState(null);
    const [ quantities, setQuantities ] = useState({});
    const [ subtotal, setSubtotal ] = useState(0);
    const [ productErrors, setProductErrors ] = useState({});
    const [ checkedItems, setCheckedItems ] = useState([]);
    const [ cartout, setCartout ] = useState(false);
    const [ emptyCartError, SetEmptyCartError ] = useState(false);

    useEffect(() => {
        
        const fetchData = async() => {
            try {
                let cartData;
                let initialQuantities = {};
                cartData = getGuestCart();

                if (userId) {
                    if (cartData.length > 0) {
                        for (const item of cartData) {
                            const data = {
                                product_id: item.product_id,
                                user_id: userId,
                                quantity: item.quantity
                            }
                            await cartContext.addToCart(data);
                        }
                        clearGuestCart();
                    }
                    const response = await cartContext.getCartItemsByUser(userId);
                    cartData = response.data;
                    cartData.forEach((item) => {
                        initialQuantities[item.id] = item.quantity;
                    });
                } else {
                    let i = 0;
                    for (const item of cartData) {
                        const product = await productContext.getProductById(item.product_id);
                        item.product = product.data;
                        item.id = i;
                        initialQuantities[i] = item.quantity;
                        i++;
                    }
                }

                setUserCart(cartData);
                setQuantities(initialQuantities);
            } catch (error) {
               console.log(error)
            }
        }

        fetchData();
        
    }, [userId]);

    useEffect(() => {
        if (userCart && Object.keys(quantities).length > 0 && checkedItems.length > 0) {
            const total = calculateSubtotal(checkedItems, quantities);
            setSubtotal(total);
        } else {
            setSubtotal(0);
        }
    }, [userCart, quantities, checkedItems]);

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
            if (userId) {
                const updatedCart = {
                    product_id: productId,
                    user_id: userId,
                    quantity: updatedQuantities[cartId],
                };

                const response = await cartContext.updateCartItem(cartId, updatedCart);
                if (response.error) {
                    const newQuantities = {
                        ...quantities,
                        [cartId]: response.stocks_on_hand,
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
                    }, 2500);
                } else {
                    setProductErrors((prevErrors) => ({
                        ...prevErrors,
                        [cartId]: false,
                    }));
                }
            } else {
                updateCartItemGuest(productId, updatedQuantities[cartId])
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleItemClick = (productId) => {
        navigate('/listing/' + productId);
    };

    const handleCheckboxChange = (cartItem) => {
        setCheckedItems((prevCheckedItems) => {
            if (prevCheckedItems.some((item) => item.id === cartItem.id)) {
                return prevCheckedItems.filter((item) => item.id !== cartItem.id);
            } else {
                return [...prevCheckedItems, cartItem];
            }
        });
    };

    const handleDeleteCartItem = async (cartId, productId) => {
        try {
            if (userId) {
                await cartContext.deleteCartItem(cartId);
            } else {
                deleteCartItemGuest(productId)
            }
            setUserCart(userCart.filter((item) => item.id !== cartId))
        } catch (error) {
            console.log(error)
        }
    };

    const handleCancel = () => {
        setCartout(false);
    };

    const handleCartout = () => {
        if (userId) {
            if (checkedItems.length !== 0) {
                setCartout(true);
            } else {
                SetEmptyCartError(true);
                setTimeout(() => {
                    SetEmptyCartError(false);
                }, 2500);
            }
        } else {
            navigate('/login', {
                state: {
                    'error_message': 'Please login to cartout'
                }
            })
        }
    };

    const calculateSubtotal = (checkedItems, quantities) => {
        return checkedItems.reduce((total, cartItem) => {
            return total + cartItem.product.cost * quantities[cartItem.id];
        }, 0);
    };

    return (
        userCart &&
        <div className={styles['cart-wrapper']}>
            <div className='row'>
                <div className={`col-12 col-md-8 ${styles['summary-wrapper']}`}>
                    <div className='page-header'>My Cart</div>
                    {
                        userCart.length !== 0 ? (
                            <div className={styles['cart-list']}>
                                {   userCart &&
                                    userCart.map((cartItem, index) => (
                                        <div key={index} className={styles['cart-items']}>
                                            <div className={styles['checkbox-wrapper']}>
                                                <input
                                                    type='checkbox'
                                                    className={styles['cart-checkbox']}
                                                    checked={checkedItems.some((item) => item.id === cartItem.id)}
                                                    onChange={() => handleCheckboxChange(cartItem)}
                                                />
                                            </div>
                                            <div>
                                                <div><img src={cartItem.product.image} className={styles['cart-item-image']} alt='product' /></div>
                                            </div>
                                            <div className={styles['cart-description']}>
                                                <div>
                                                    <div className={styles['cart-brand']}>{cartItem.product.seller.username}</div>
                                                    <div className={`${styles['cart-text']} ${styles['cart-text-large']} ${styles['view-cart-item']}`} onClick={() => handleItemClick(cartItem.product_id)}>{cartItem.product.name}</div>
                                                    <div className={styles['cart-quantity']}>
                                                        <div className={styles['cart-text']}>Quantity:</div>
                                                        <div className='quantity-adjust'>
                                                            <div onClick={() => handleDecrement(cartItem.id, cartItem.product_id)} className='quantity-action'><i className="bi bi-dash-circle"></i></div>
                                                            <div>
                                                                <input
                                                                    type='text'
                                                                    className={styles['quantity-box-cart']}
                                                                    value={quantities[cartItem.id]}
                                                                    onChange={(e) => handleQuantityChange(cartItem.id, cartItem.product_id, e)}
                                                                />
                                                            </div>
                                                            <div onClick={() => handleIncrement(cartItem.id, cartItem.product_id)} className='quantity-action'><i className="bi bi-plus-circle"></i></div>
                                                        </div>
                                                    </div>
                                                    {productErrors[cartItem.id] && <div className={styles['insufficient']}>Insufficient stock!</div>}
                                                </div>
                                                <div className={styles['cart-cost']}>
                                                    <div className={styles['cart-text-large']}>${(parseFloat(cartItem.product.cost) * quantities[cartItem.id]).toFixed(2)}</div>
                                                    <div>
                                                        <i className={`bi bi-x ${styles['delete-cart-icon']}`} onClick={() => handleDeleteCartItem(cartItem.id, cartItem.product_id)}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ) :
                        <div className={`${styles['cart-list']} ${styles['empty-cart']}`}>
                            <div>Your cart is empty, start shopping!</div>
                        </div>
                    }
                </div>

                <div className={`col-12 col-md-4 ${styles['summary-wrapper']}`}>
                    <div className='page-header'>Order Summary</div>

                    <div className={styles['cost-wrapper']}>
                        <div className={`${styles['cost-items']} ${styles['sub-total']}`}>
                            <div>Sub-total</div>
                            <div>${subtotal.toFixed(2)}</div>
                        </div>
                        <div className={styles['cost-items']}>
                            <div>Shipping</div>
                            <div className={styles['shipping-cost']}>+ $3.50</div>
                        </div>
                        <div className={`${styles['cost-items']} ${styles['cost-total']}`}>
                            <div>Total</div>
                            <div>${(parseFloat(subtotal) + 3.50).toFixed(2)}</div>
                        </div>
                        {cartout &&
                            <div>
                                <UserCartoutForm userId={userId} checkedItems={checkedItems} onCancel={handleCancel} />
                            </div>
                        }
                        {!cartout &&
                            <div id={styles['checkout-button']} className='button-full' onClick={handleCartout}>Proceed to Cart Out</div>
                        }
                        {emptyCartError &&
                            <div id={styles['checkout-error']} className="form-message form-error-box"><i className="bi bi-exclamation-circle form-icon"></i>Select items to checkout!</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCart