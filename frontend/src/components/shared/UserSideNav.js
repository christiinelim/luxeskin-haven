import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const UserSideNav = () => {
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
        <>
            <div className='user-top-nav'>
                <div className={`top-nav-items ${activePage === `/profile/details` ? 'small-active-page' : ''}`} onClick={() => handleNavigation(`/profile/details`)}>
                    <div><i className="bi bi-person side-nav-icon"></i></div>
                    <div>Details</div>
                </div>
                <div className={`top-nav-items ${activePage === `/profile/orders` ? 'small-active-page' : ''}`} onClick={() => handleNavigation(`/profile/orders`)}>
                    <div><i className="bi bi-receipt-cutoff side-nav-icon"></i></div>
                    <div>Orders</div>
                </div>
                <div className={`top-nav-items ${activePage === `/profile/reviews` ? 'small-active-page' : ''}`} onClick={() => handleNavigation(`/profile/reviews`)}>
                    <div><i className="bi bi-star side-nav-icon"></i></div>
                    <div>Reviews</div>
                </div>
            </div>
            <div className='user-side-nav'>
                <div className="side-nav-wrapper">
                    <div className={`side-nav-items ${activePage === `/profile/details` ? 'active-page' : ''}`} onClick={() => handleNavigation(`/profile/details`)}>
                        <div><i className="bi bi-person side-nav-icon"></i></div>
                        <div>Details</div>
                    </div>
                    <div className={`side-nav-items ${activePage === `/profile/orders` ? 'active-page' : ''}`} onClick={() => handleNavigation(`/profile/orders`)}>
                        <div><i className="bi bi-receipt-cutoff side-nav-icon"></i></div>
                        <div>Orders</div>
                    </div>
                    <div className={`side-nav-items ${activePage === `/profile/reviews` ? 'active-page' : ''}`} onClick={() => handleNavigation(`/profile/reviews`)}>
                        <div><i className="bi bi-star side-nav-icon"></i></div>
                        <div>Reviews</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserSideNav