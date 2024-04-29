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
        <div className='user-side-nav'>
            <div className="side-nav-wrapper">
                <div className={`side-nav-items ${activePage === `/${localStorage.getItem("userId")}/profile/details` ? 'active-page' : ''}`} onClick={() => handleNavigation(`/${localStorage.getItem("userId")}/profile/details`)}>
                    <div><i className="bi bi-person side-nav-icon"></i></div>
                    <div>Details</div>
                </div>
                <div className={`side-nav-items ${activePage === `/${localStorage.getItem("userId")}/profile/orders` ? 'active-page' : ''}`} onClick={() => handleNavigation(`/${localStorage.getItem("userId")}/profile/orders`)}>
                    <div><i className="bi bi-receipt-cutoff side-nav-icon"></i></div>
                    <div>Orders</div>
                </div>
                <div className={`side-nav-items ${activePage === `/${localStorage.getItem("userId")}/profile/reviews` ? 'active-page' : ''}`} onClick={() => handleNavigation(`/${localStorage.getItem("userId")}/profile/reviews`)}>
                    <div><i className="bi bi-star side-nav-icon"></i></div>
                    <div>Reviews</div>
                </div>
            </div>
        </div>
    );
}

export default UserSideNav