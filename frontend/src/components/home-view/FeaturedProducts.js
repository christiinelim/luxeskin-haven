import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';

const FeaturedProducts = () => {
    const navigate = useNavigate();
    const productContext = useContext(ProductContext);
    const cartContext = useContext(CartContext);
    const [ products, setProducts ] = useState(null);
    const [ addedProductId, setAddedProductId ] = useState(null);
    const [ insufficient, setInsufficient ] = useState(false);

    useEffect(() => {
        
        const fetchData = async() => {
            try {
                const response = await productContext.getAllProducts();
                const data = response.data;
                setProducts(data);
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
        
    }, []);

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
        <div className='featured-wrapper'>
            <div className='page-header featured-header'>Featured Products</div>
            { products && 
                <div className='row'>
                    {products.map((product, index) => (
                        <div className='col-4 col-sm-3 col-lg-2 product-cards' key={index}>
                            <div className='home-product-card' onClick={() => navigate('/listing/' + product.id)}>
                                <div className='home-product-image'><img src={ product.image }/></div>
                                <div className='home-card-content'>
                                    <div className='home-product-header-wrapper'>
                                        <div>{ product.seller.username }</div>
                                        <div>${ (product.cost).toFixed(2) }</div>
                                    </div>
                                    <div className='home-product-name'>{ product.name }</div>
                                </div>
                            </div>
                            <div className='button-border add-to-bag-button' onClick={ () => handleAddToBag(product.id) }>
                                { addedProductId === product.id ? insufficient ? "Insufficient stock" : "Added!" : "Add to Bag" }
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default FeaturedProducts;