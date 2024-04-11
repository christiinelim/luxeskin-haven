import React, { useState, useEffect } from 'react';
import { Cart4, Search, List } from 'react-bootstrap-icons';

import './Navbar.css'

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
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
            {showDropdown && <div className="overlay" onClick={toggleDropdown}></div>}
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
                            <div><Search className='search-icon'/></div>
                        </div>
                    </div>
                    <div className='nav-menu'>
                        <div><List className='menu-icon' onClick={toggleDropdown}/></div>
                    </div>
                </div>
                <div id='tabs-small' className={`content-tabs ${showDropdown ? 'dropdown-open' : ''}`}>
                    <div className='nav-exit'>
                        <div className='nav-exit-icon' onClick={toggleDropdown}>X</div>
                    </div>
                    <div className='tab-items'>SHOP</div>
                    <div className='tab-items'>COLLECTIONS</div>
                    <div className='tab-items'>TIPS</div>
                    <div className='tab-items'>ABOUT US</div>
                    <div className='tab-items'>CONTACT US</div>
                </div>
            </div>
        </>
    )
}

export default Navbar