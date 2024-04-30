import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'react-bootstrap-icons';

const Navbar = () => {
    const [ showSearchBar, setShowSearchBar ] = useState(false);
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
            navigate('/' + localStorage.getItem("userId") + '/cart')
        } else if (page === "account") {
            navigate('/' + localStorage.getItem("userId") + '/profile/details')
        }
    }

    return(
        <>
            <div className='site-nav'>
                <div className='nav-login'>
                    <div className='login-items'>
                        <div><Link to="/seller/signup" className="link-items">Start Selling</Link></div>
                        <div><Link to="/seller/login" className="link-items">Seller Login</Link></div>
                    </div>
                    <div className='login-items'>
                        <div><Link to="/signup" className="link-items">Sign Up</Link></div>
                        <div><Link to="/login" className="link-items">Login</Link></div>
                    </div>
                </div>
                <div className='nav-container'>
                    <div className='nav-content'>
                        <div id='logo' className='content-items'><Link to="/" className="link-items">LuxeSkin Haven</Link></div>
                        <div id='tabs-large' className='content-items'>
                            <div><Link to="/shop" className="link-items">SHOP</Link></div>
                            <div><Link to="/collections" className="link-items">COLLECTIONS</Link></div>
                            <div><Link to="/contact-us" className="link-items">CONTACT US</Link></div>
                        </div>
                        <div className='content-items'>
                            <div onClick={() => navigateToPage("cart")}>
                                <i className="bi bi-bag cart-icon"></i>
                            </div>
                            <div onClick={() => navigateToPage("account")}>
                                <i className="bi bi-person account-icon"></i>
                            </div>
                            <div>
                                <div className='search'>
                                    <div><Search className='search-icon' onClick={() => toggleState(setShowSearchBar)}/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='searchbar-container'>
                        <div className={`searchbar ${showSearchBar ? 'searchbar-open' : ''}`}>
                            <div className='search-prompt'>What do you like to explore?</div>
                            <div className='searchbox'>
                                <div><input type='text'/></div>
                                <div><ArrowRight /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bottom-nav'>
                <div className='bottom-nav-items' onClick={() => navigateToPage("home")}>
                    <div><i className="bi bi-houses bottom-nav-icon"></i></div>
                    <div>Home</div>
                </div>
                <div className='bottom-nav-items' onClick={() => navigateToPage("shop")}>
                    <div><i className="bi bi-cart bottom-nav-icon"></i></div>
                    <div>Shop</div>
                </div>
                <div className='bottom-nav-items' onClick={() => navigateToPage("collections")}>
                    <div><i className="bi bi-collection bottom-nav-icon"></i></div>
                    <div>Collections</div>
                </div>
                <div className='bottom-nav-items' onClick={() => navigateToPage("cart")}>
                    <div><i className="bi bi-bag bottom-nav-icon"></i></div>
                    <div>Cart</div>
                </div>
                <div className='bottom-nav-items' onClick={() => navigateToPage("account")}>
                    <div><i className="bi bi-person bottom-nav-icon"></i></div>
                    <div>Account</div>
                </div>
            </div>
        </>
    )
}

export default Navbar