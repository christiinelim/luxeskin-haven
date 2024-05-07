import React, { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import ProductCards from '../shared/product-cards/ProductCards';

const FeaturedProducts = () => {
    const productContext = useContext(ProductContext);

    return (
        <div className='shop-wrapper'>
            <div className='page-header shop-header'>Featured Products</div>
            { productContext.productPage && (
                <div className='row'>
                    <ProductCards products={ productContext.productPage['page1'] }/>
                </div>
            )}
        </div>
    )
}

export default FeaturedProducts;