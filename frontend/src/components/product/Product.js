import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';
import { getBackgroundColorForSkinType } from '../../utils/utils';
import { addToCartGuest } from '../../utils/cartUtils';
import { getUserLocalStorage } from '../../utils/utils';
import styles from './styles.module.css';

const Product = () => {
    const { productId } = useParams();
    const [ product, setProduct ] = useState(null);
    const [ quantity, setQuantity ] = useState(1);
    const [ addedProductId, setAddedProductId ] = useState(null);
    const [ insufficient, setInsufficient ] = useState(false);
    const productContext = useContext(ProductContext);
    const cartContext = useContext(CartContext);
    const isLoggedIn = getUserLocalStorage().isLoggedIn;

    useEffect(() => {
        
        const fetchData = async() => {
            try {
                const response = await productContext.getProductById(productId);
                const data = response.data;
                setProduct(data);
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
        
    }, []);

    const handleAddToBag = async (productId) => {
        try {
            if (isLoggedIn) {
                const data = {
                    product_id: productId,
                    user_id: getUserLocalStorage().userId,
                    quantity: quantity
                }
                const response = await cartContext.addToCart(data);
                if (response.error) {
                    setInsufficient(true)
                }
    
                setAddedProductId(productId);
                setTimeout(() => {
                    setAddedProductId(null);
                    setInsufficient(false)
                }, 2500);
            } else {
                addToCartGuest(productId, quantity);
                setAddedProductId(productId);
            }
            
        } catch (error) {
            console.log(error)
        }
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        product && 
        <div className='product-wrapper'>
            <div className='row'>
                <div className='col-12 col-md-4 product-image-wrapper'>
                    <div><img src={ product.image } className='product-image' alt="product"/></div>
                </div>
                <div className='col-12 col-md-8'>
                    <div className='product-name col-12'>{ product.name }</div>

                    <div className='skin-type-badges'>
                    { product.skin_types.map((skinType) => (
                        <div
                            key={skinType.id}
                            className='skin-type-badge'
                            style={{ backgroundColor: getBackgroundColorForSkinType(skinType.skin_type) }}
                        >
                            {skinType.skin_type}
                        </div>
                    ))}
                    </div>

                    <div className='product-details row'>
                        <div className='product-header col-4 col-md-3'>Category: </div>
                        <div className='col-8 col-lg-9'>{ product.category.category }</div>
                    </div>
                    <div className='product-details row'>
                        <div className='product-header col-4 col-md-3'>Cost: </div>
                        <div className='col-8 col-lg-9'>${ parseFloat(product.cost).toFixed(2) }</div>
                    </div>
                    <div className='product-details row'>
                        <div className='product-header col-4 col-md-3'>Description: </div>
                        <div className='col-8 col-lg-9'>{ product.description }</div>
                    </div>
                    <div className='product-details row'>
                        <div className='product-header col-4 col-md-3'>Ingredients: </div>
                        <div className='col-8 col-lg-9'>{ product.ingredients }</div>
                    </div>
                    <div className='product-details row'>
                        <div className='product-header col-4 col-md-3'>Refund Policy: </div>
                        <div className='col-8 col-lg-9'>{ product.refund_policy }</div>
                    </div>
                    <div className='product-details row'>
                        <div className='product-header col-4 col-md-3'>Quantity</div>
                        <div className={`col-8 col-lg-9 ${styles['quantity-prompt']}`}>
                        <div className='quantity-adjust'>
                            <div onClick={ handleDecrement } className='quantity-action'><i className="bi bi-dash-circle"></i></div>
                                <div>
                                    <input
                                        type='text'
                                        className='quantity-box'
                                        value={ quantity }
                                        onChange={ (e) => setQuantity(parseInt(e.target.value) || 1) }
                                    />
                                </div>
                                <div onClick={ handleIncrement } className='quantity-action'><i className="bi bi-plus-circle"></i></div>
                            </div>
                            <div id={styles['product-add-button']} className='button-full' onClick={ () => handleAddToBag(product.id) }>
                                { addedProductId === product.id ? insufficient ? "Insufficient stock" : "Added!" : "Add to Bag" }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product