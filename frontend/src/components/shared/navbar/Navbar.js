import React, { useState, useEffect } from 'react';
import { Cart4, Search, List, ArrowRight } from 'react-bootstrap-icons';

import './Navbar.css'

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);

    const toggleState = (setState) => {
        setState((prevState) => !prevState);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 576) {
                setShowDropdown(false); 
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return(
        <>
            {showDropdown && <div className="overlay" onClick={() => toggleState(setShowDropdown)}></div>}
            <div className='nav-login'>
                <div className='login-items'>
                    <div>Start Selling</div>
                    <div>Seller Platform</div>
                </div>
                <div className='login-items'>
                    <div>Sign Up</div>
                    <div>Login</div>
                </div>
            </div>
            <div className='nav-container'>
                <div className='nav-content'>
                    <div id='logo' className='content-items'>LuxeSkin Haven</div>
                    <div id='tabs-large' className='content-items'>
                        <div>SHOP</div>
                        <div>COLLECTIONS</div>
                        <div>TIPS</div>
                        <div>ABOUT US</div>
                        <div>CONTACT US</div>
                    </div>
                    <div className='content-items'>
                        <div>
                            <Cart4 className='cart-icon'/>
                        </div>
                        <div>
                            <div className='search'>
                                <div><Search className='search-icon' onClick={() => toggleState(setShowSearchBar)}/></div>
                            </div>
                        </div>
                        <div className='nav-menu'>
                            <div><List className='menu-icon' onClick={() => toggleState(setShowDropdown)}/></div>
                        </div>
                    </div>
                    <div id='tabs-small' className={`content-tabs ${showDropdown ? 'dropdown-open' : ''}`}>
                        <div className='nav-exit'>
                            <div className='nav-exit-icon' onClick={() => toggleState(setShowDropdown)}>X</div>
                        </div>
                        <div className='tab-items'>SHOP</div>
                        <div className='tab-items'>COLLECTIONS</div>
                        <div className='tab-items'>TIPS</div>
                        <div className='tab-items'>ABOUT US</div>
                        <div className='tab-items'>CONTACT US</div>
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
        </>
    )
}

export default Navbar