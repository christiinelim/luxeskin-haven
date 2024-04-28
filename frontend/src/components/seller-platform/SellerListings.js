import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';

const SellerListings = () => {
    const [ activeTab, setActiveTab ] = useState('active');
    const [ listings, setListings ] = useState(null);
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

    console.log(listings)

    return (
        listings && listings.length !== 0 ? (
            <div className='listings-wrapper'>
                <div className='page-header'>Listings</div>
                <div className='listings-actions'>
                    <div className='listings-tabs'>
                        <div
                            className={`listing-tab ${activeTab === 'active' ? 'active-listing-tab' : ''}`}
                            onClick={() => handleTabClick('active')}
                        >
                            Active
                        </div>
                        <div
                            className={`listing-tab ${activeTab === 'inactive' ? 'active-listing-tab' : ''}`}
                            onClick={() => handleTabClick('inactive')}
                        >
                            Inactive
                        </div>
                    </div>
                    <div><i className="bi bi-plus-circle-fill add-listing-icon"></i></div>
                </div>
                <div className='row'>
                    {listings.map((listing, index) => (
                        <div className='col-4 col-sm-6 col-md-4 col-lg-3 product-cards' key={index}>
                            <div className='product-card'>
                                <div className='listing-image'><img src={ listing.image }/></div>
                                <div className='card-content'>
                                    <div className='listing-name'>{ listing.name }</div>
                                    <div className='listing-detail'>Cost: ${ listing.cost }</div>
                                    <div className='listing-detail'>Available Stocks: { listing.stocks_on_hand }</div>
                                </div>
                                <div className='listing-action'>
                                    <div><i className="bi bi-ban listing-action-icon"></i></div>
                                    <div><i className="bi bi-pencil listing-action-icon"></i></div>
                                    <div><i className="bi bi-trash listing-action-icon"></i></div>
                                    <div onClick={() => navigate('/listings/' + listing.id)}><i className="bi bi-arrows-angle-expand listing-action-icon"></i></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ) :
        <div className='listings-wrapper'>
            <div className='page-header'>Listings</div>
            <div>You have no active listings</div>
        </div>
    );
}

export default SellerListings;
