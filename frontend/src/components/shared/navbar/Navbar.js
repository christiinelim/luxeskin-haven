import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'react-bootstrap-icons';
import { AuthContext } from "../../../context/AuthContext";
import { LogoutHandler } from '../../../utils/authUtils';
import NavSearchForm from './NavSearchForm';
import styles from './styles.module.css';

const Navbar = () => {
    const { handleUserLogout } = LogoutHandler();
    const [ showSearchBar, setShowSearchBar ] = useState(false);
    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext.isLoggedIn;
    const userStatus = authContext.status === "user" ? true : false;
    const navigate = useNavigate();

    const toggleState = (setState) => {
        setState((prevState) => !prevState);
    };

    const navigateToPage = (page) => {
        if (page === "home") {
            navigate('/')
        } else if (page === "shop") {
            navigate('/shop')
        } else if (page === "collections") {
            navigate('/collections')
        } else if (page === "cart") {
            navigate('/cart')
        } else if (page === "account") {
            navigate('/profile/details')
        }
    }

    const handleLogoutClick = async () => {
        await handleUserLogout("You have logged out");
    };

    return (
        <>
            <div className={styles['site-nav']}>
                <div className='nav-login'>
                    <div className='login-items'>
                        <div><Link to="/seller/signup" className="link-items">Start Selling</Link></div>
                        <div><Link to="/seller/login" className="link-items">Seller Login</Link></div>
                    </div>
                    { (!isLoggedIn || !userStatus) &&
                        <div className='login-items'>
                            <div><Link to="/signup" className="link-items">Sign Up</Link></div>
                            <div><Link to="/login" className="link-items">Login</Link></div>
                        </div>
                    }
                    { isLoggedIn && userStatus &&
                        <div className='login-items'>
                            <div className="link-items" onClick={ handleLogoutClick }>Logout</div>
                        </div>
                    }
                </div>
                <div className={styles['nav-container']}>
                    <div className={styles['nav-content']}>
                        <div id='logo' className='content-items'><Link to="/" className="link-items">LuxeSkin Haven</Link></div>
                        <div id='tabs-large' className='content-items'>
                            <div><Link to="/shop" className="link-items">SHOP</Link></div>
                            <div><Link to="/collections" className="link-items">COLLECTIONS</Link></div>
                            <div><Link to="/contact-us" className="link-items">CONTACT US</Link></div>
                        </div>
                        <div className='content-items'>
                            <div onClick={() => navigateToPage("cart")}>
                                <i className={`bi bi-bag ${styles['cart-icon']}`}></i>
                            </div>
                            <div onClick={() => navigateToPage("account")}>
                                <i className={`bi bi-person ${styles['account-icon']}`}></i>
                            </div>
                            <div>
                                <div className={styles['search']}>
                                    <div><Search className={styles['search-icon']} onClick={() => toggleState(setShowSearchBar)}/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['searchbar-container']}>
                        <NavSearchForm showSearchBar={ showSearchBar }/>
                    </div>
                </div>
            </div>
            <div className={styles['bottom-nav']}>
                <div className={styles['bottom-nav-items']} onClick={() => navigateToPage("home")}>
                    <div><i className={`bi bi-houses ${styles['bottom-nav-icon']}`}></i></div>
                    <div>Home</div>
                </div>
                <div className={styles['bottom-nav-items']} onClick={() => navigateToPage("shop")}>
                    <div><i className={`bi bi-cart ${styles['bottom-nav-icon']}`}></i></div>
                    <div>Shop</div>
                </div>
                <div className={styles['bottom-nav-items']} onClick={() => navigateToPage("collections")}>
                    <div><i className={`bi bi-collection ${styles['bottom-nav-icon']}`}></i></div>
                    <div>Collections</div>
                </div>
                <div className={styles['bottom-nav-items']} onClick={() => navigateToPage("cart")}>
                    <div><i className={`bi bi-bag ${styles['bottom-nav-icon']}`}></i></div>
                    <div>Cart</div>
                </div>
                <div className={styles['bottom-nav-items']} onClick={() => navigateToPage("account")}>
                    <div><i className={`bi bi-person ${styles['bottom-nav-icon']}`}></i></div>
                    <div>Account</div>
                </div>
            </div>
        </>
    )
}

export default Navbar