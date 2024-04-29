import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, List, ArrowRight } from 'react-bootstrap-icons';

const Navbar = () => {
    const [showSearchBar, setShowSearchBar] = useState(false);

    const toggleState = (setState) => {
        setState((prevState) => !prevState);
    };

    // useEffect(() => {
    //     const handleResize = () => {
    //         if (window.innerWidth >= 576) {
    //             setShowDropdown(false); 
    //         }
    //     };

    //     window.addEventListener('resize', handleResize);

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

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
                            <div>SHOP</div>
                            <div>COLLECTIONS</div>
                            <div>CONTACT US</div>
                        </div>
                        <div className='content-items'>
                            <div>
                                <i className="bi bi-bag cart-icon"></i>
                            </div>
                            <div>
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
                <div className='bottom-nav-items'>
                    <div><i className="bi bi-houses bottom-nav-icon"></i></div>
                    <div>Home</div>
                </div>
                <div className='bottom-nav-items'>
                    <div><i className="bi bi-cart bottom-nav-icon"></i></div>
                    <div>Shop</div>
                </div>
                <div className='bottom-nav-items'>
                    <div><i class="bi bi-collection bottom-nav-icon"></i></div>
                    <div>Collections</div>
                </div>
                <div className='bottom-nav-items'>
                    <div><i class="bi bi-bag bottom-nav-icon"></i></div>
                    <div>Cart</div>
                </div>
                <div className='bottom-nav-items'>
                    <div><i class="bi bi-person bottom-nav-icon"></i></div>
                    <div>Account</div>
                </div>
            </div>
        </>
    )
}

export default Navbar