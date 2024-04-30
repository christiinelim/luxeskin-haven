import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';

const FeaturedProducts = () => {
    const navigate = useNavigate();
    const productContext = useContext(ProductContext);
    const [ products, setProducts ] = useState(null);

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
                            <div className='button-border add-to-bag-button'>Add to Bag</div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default FeaturedProducts;