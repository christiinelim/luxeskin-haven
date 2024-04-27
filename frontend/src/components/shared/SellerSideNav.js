import React from 'react';
import { useNavigate } from 'react-router-dom';

const SellerSideNav = () => {
    const navigate = useNavigate();

    return (
        <div className="side-nav-wrapper">
            <div className="side-nav-items" onClick={() => navigate('/listings')}>
                <div><i className="bi bi-view-list side-nav-icon"></i></div>
                <div>Listings</div>
            </div>
            <div className="side-nav-items" onClick={() => navigate('/orders')}>
                <div><i class="bi bi-receipt-cutoff side-nav-icon"></i></div>
                <div>Orders</div>
            </div>
            <div className="side-nav-items" onClick={() => navigate('/discount')}>
                <div><i class="bi bi-cash-coin side-nav-icon"></i></div>
                <div>Discount</div>
            </div>
        </div>
    )
}

export default SellerSideNav;