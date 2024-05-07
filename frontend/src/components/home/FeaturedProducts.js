import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';

const FeaturedProducts = () => {
    const navigate = useNavigate();
    const productContext = useContext(ProductContext);
    const cartContext = useContext(CartContext);
    const [ addedProductId, setAddedProductId ] = useState(null);
    const [ insufficient, setInsufficient ] = useState(false);

    const handleAddToBag = async (productId) => {
        try {
            const data = {
                product_id: productId,
                user_id: localStorage.getItem('userId'),
                quantity: 1
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
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='shop-wrapper'>
            <div className='page-header shop-header'>Featured Products</div>
            { productContext.productPage && (
                <div className='row'>
                    { productContext.productPage['page1'].map((product, index) => (
                        <div className='col-4 col-sm-3 col-lg-2 product-cards' key={index}>
                            <div className='shop-product-card' onClick={ () => navigate('/listing/' + product.id) }>
                                <div className='shop-product-image'><img src={ product.image } alt={product.name} /></div>
                                <div>
                                    <div className='shop-product-header-wrapper'>
                                        <div>{ product.seller.username }</div>
                                        <div>${ (product.cost).toFixed(2) }</div>
                                    </div>
                                    <div className='shop-product-name'>{ product.name }</div>
                                </div>
                            </div>
                            <div className='button-border add-to-bag-button' onClick={ () => handleAddToBag(product.id) }>
                                { addedProductId === product.id ? (insufficient ? "Insufficient stock" : "Added!") : "Add to Bag" }
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default FeaturedProducts;