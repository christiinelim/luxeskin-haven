import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './styles.module.css';

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
            <div className={styles['user-top-nav']}>
                <div className={`${styles['top-nav-items']} ${activePage === `/profile/details` ? styles['small-active-page'] : ''}`} onClick={() => handleNavigation(`/profile/details`)}>
                    <div><i className="bi bi-person side-nav-icon"></i></div>
                    <div>Details</div>
                </div>
                <div className={`${styles['top-nav-items']} ${activePage === `/profile/orders` ? styles['small-active-page'] : ''}`} onClick={() => handleNavigation(`/profile/orders`)}>
                    <div><i className="bi bi-receipt-cutoff side-nav-icon"></i></div>
                    <div>Orders</div>
                </div>
                <div className={`${styles['top-nav-items']} ${activePage === `/profile/reviews` ? styles['small-active-page'] : ''}`} onClick={() => handleNavigation(`/profile/reviews`)}>
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