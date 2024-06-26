import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SellerSideNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [ activePage, setActivePage ] = useState('');

    useEffect(() => {
        setActivePage(location.pathname);
    }, [location.pathname]);

    const handleNavigation = (route) => {
        navigate(route);
        setActivePage(route);
    };

    return (
        <div className="side-nav-wrapper">
            <div className={`side-nav-items ${activePage === '/seller/listings' ? 'active-page' : ''}`} onClick={() => handleNavigation('/seller/listings')}>
                <div><i className="bi bi-view-list side-nav-icon"></i></div>
                <div>Listings</div>
            </div>
            <div className={`side-nav-items ${activePage === '/seller/orders' ? 'active-page' : ''}`} onClick={() => handleNavigation('/seller/orders')}>
                <div><i className="bi bi-receipt-cutoff side-nav-icon"></i></div>
                <div>Orders</div>
            </div>
            <div className={`side-nav-items ${activePage === '/seller/discount' ? 'active-page' : ''}`} onClick={() => handleNavigation('/seller/discount')}>
                <div><i className="bi bi-cash-coin side-nav-icon"></i></div>
                <div>Discount</div>
            </div>
        </div>
    );
}

export default SellerSideNav;


