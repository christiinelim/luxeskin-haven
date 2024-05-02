import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../../context/ProductContext';
import DeleteWarning from '../../shared/delete-warning/DeleteWarning';
import styles from './styles.module.css';

const SellerListings = () => {
    const [ activeTab, setActiveTab ] = useState('active');
    const [ listings, setListings ] = useState(null);
    const [ isDeleting, setIsDeleting ] = useState(false);
    const productContext = useContext(ProductContext);
    const navigate = useNavigate();

    useEffect(() => {
        
        const fetchData = async() => {
            try {
                const response = await productContext.getProductBySeller(localStorage.getItem('sellerId'));
                const data = response.data;
                setListings(data);
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
        
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleDeleteClick = async (productId) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await productContext.deleteProduct(productId); 
            const updatedListings = listings.filter(item => item.id !== productId);
            setListings(updatedListings);
            setIsDeleting(false);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        listings && listings.length !== 0 ? (
            <div className={styles['listings-wrapper']}>
                <div className='page-header'>Listings</div>
                <div className={styles['listings-actions']}>
                    <div className={styles['listings-tabs']}>
                        <div
                            className={`${styles['listing-tab']} ${activeTab === 'active' ? styles['active-listing-tab'] : ''}`}
                            onClick={() => handleTabClick('active')}
                        >
                            Active
                        </div>
                        <div
                            className={`${styles['listing-tab']} ${activeTab === 'inactive' ? styles['active-listing-tab'] : ''}`}
                            onClick={() => handleTabClick('inactive')}
                        >
                            Inactive
                        </div>
                    </div>
                    <div onClick={() => navigate('/list', { 
                        state: { 
                            mode: "Add", 
                        }
                    })}><i className={`bi bi-plus-circle-fill ${styles['add-listing-icon']}`}></i></div>
                </div>
                <div className='row'>
                    {listings.map((listing, index) => (
                        <div className='col-4 col-sm-6 col-md-4 col-lg-3 product-cards' key={index}>
                            <div className='product-card'>
                                <div className={styles['listing-image']}><img src={ listing.image }/></div>
                                <div className={styles['card-content']}>
                                    <div className={styles['listing-name']}>{ listing.name }</div>
                                    <div className={styles['listing-detail']}>Cost: ${ (listing.cost).toFixed(2) }</div>
                                    <div className={styles['listing-detail']}>Available Stocks: { listing.stocks_on_hand }</div>
                                </div>
                                <div className='listing-action'>
                                    <div><i className="bi bi-ban listing-action-icon"></i></div>
                                    <div onClick={() => navigate('/list', { 
                                        state: { 
                                            mode: "Update",
                                            productId: listing.id 
                                        }
                                    })}><i className="bi bi-pencil listing-action-icon"></i></div>
                                    <div onClick={ () => setIsDeleting({ id: listing.id, name: listing.name }) }><i className="bi bi-trash listing-action-icon"></i></div>
                                    <div onClick={ () => navigate('/listings/' + listing.id) }><i className="bi bi-arrows-angle-expand listing-action-icon"></i></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                { isDeleting && 
                    <DeleteWarning  item = {isDeleting.name}
                                    itemId = {isDeleting.id}
                                    setIsDeleting = { setIsDeleting } 
                                    handleDeleteClick = { handleDeleteClick } 
                                    message = "By deleting this product, you will lose all the information about this listing"
                    />
                }
            </div>
        ) :
        <div className={styles['listings-wrapper']}>
            <div className='page-header'>Listings</div>
            <div className={styles['no-listing']}>You have no active listings</div>
        </div>
    );
}

export default SellerListings;
