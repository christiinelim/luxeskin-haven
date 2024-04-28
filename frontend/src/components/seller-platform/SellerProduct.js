import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import DeleteWarning from '../shared/DeleteWarning';

const SellerProduct = () => {
    const [ product, setProduct ] = useState(null);
    const [ isDeleting, setIsDeleting ] = useState(false);
    const { productId } = useParams();
    const productContext = useContext(ProductContext);
    const navigate = useNavigate();

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = date.getDate().toString().padStart(2, '0'); 
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const year = date.getFullYear().toString(); 

        return `${day}-${month}-${year}`;
    };

    const getBackgroundColorForSkinType = (skinType) => {
        switch (skinType) {
            case 'Oily':
                return '#EBBC67';
            case 'Dry':
                return '#E4D6BD';
            case 'Combination':
                return '#C4C2C1';
            case 'Sensitive':
                return '#FAC2B4';
            case 'Acne-Prone':
                return '#E8A593';
        }
    };

    const handleDeleteClick = async (productId) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await productContext.deleteProduct(productId); 
            setIsDeleting(false);
            navigate('/listings')
        } catch (error) {
            console.log(error)
        }
    };

    return (
        product && 
        <div className='product-wrapper'>
            <div className='product-actions'>
                <div><i className="bi bi-ban listing-action-icon"></i></div>
                <div onClick={() => navigate('/list', { 
                    state: { 
                        mode: "Update",
                        productId: product.id 
                    }
                })}><i className="bi bi-pencil listing-action-icon"></i></div>
                <div onClick={ () => setIsDeleting(true) }><i className="bi bi-trash listing-action-icon"></i></div>
                <div onClick={() => navigate('/listings')}><i className="bi bi-box-arrow-up-right listing-action-icon"></i></div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-4 product-image-wrapper'>
                    <div><img src={ product.image } className='product-image'/></div>
                </div>
                <div className='col-12 col-md-8'>
                    <div className='product-name col-12'>{ product.name }</div>

                    <div className='skin-type-badges'>
                    {product.skin_types.map((skinType) => (
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
                        <div className='product-header col-4 col-md-3'>Available Stocks: </div>
                        <div className='col-8 col-lg-9'>{ product.stocks_on_hand }</div>
                    </div>
                    <div className='product-details row'>
                        <div className='product-header col-4 col-md-3'>Cost: </div>
                        <div className='col-8 col-lg-9'>${ product.cost }</div>
                    </div>
                    <div className='product-details row'>
                        <div className='product-header col-4 col-md-3'>Created On: </div>
                        <div className='col-8 col-lg-9'>{ formatDate(product.created_at) }</div>
                    </div>
                    <div className='product-details row'>
                        <div className='product-header col-4 col-md-3'>Active: </div>
                        <div className='col-8 col-lg-9'>{ product.active }</div>
                    </div>
                    <div className='product-details row'>
                        <div className='product-header col-4 col-md-3'>Discount: </div>
                        <div className='col-8 col-lg-9'>{ product.discount_id === null ? "No" : "Yes"}</div>
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
                </div>
            </div>
            { isDeleting && 
                <DeleteWarning  item = {product.name}
                                itemId = {product.id}
                                setIsDeleting = { setIsDeleting } 
                                handleDeleteClick = { handleDeleteClick } 
                                message = "By deleting this product, you will lose all the information about this listing"
                />
            }
        </div>
    );
}

export default SellerProduct;
