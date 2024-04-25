import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

const SellerNavbar = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext.isLoggedIn();
    const [ showDropdown, setShowDropdown ] = useState(false);

    useEffect(() => {
        setShowDropdown(false); 
    }, [isLoggedIn]); 

    const handleProfileIconClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleProfileClick = () => {
        navigate('/seller/profile/' + localStorage.getItem("sellerId"));
        setShowDropdown(!showDropdown);
    }

    const handleLogoutClick = () => {
        navigate('/seller/login', { 
            state: { 
                success_message: "You have logged out"
            }
        });
        authContext.logout();
    }

    return(
        <>
            <div className='nav-login'>
                <div className='login-items'>
                    <div id='logo' className='content-items'>
                        <Link to="/" className='link-items'>LuxeSkin Haven</Link>
                    </div>
                    <div id='seller-platform-logo' className='content-items'>Seller Platform</div>
                </div>
                <div className='login-items'>
                    { !isLoggedIn && 
                        <>
                            <div className='button-border'>
                                <Link to="/seller/signup" className='link-items'>Sign Up</Link>
                            </div>
                        
                            <div className='button-full'>
                                <Link to="/seller/login" className='link-items'>Login</Link>
                            </div>
                        </>
                    }
                    { isLoggedIn &&
                        <>
                            <div>
                                <i className="bi bi-person-circle nav-profile-icon" onClick={ handleProfileIconClick }></i>
                            </div>
                            { showDropdown && (
                                <div className="nav-dropdown-content">
                                    <button className="dropdown-item" onClick={ handleProfileClick }>Profile</button>
                                    <button className="dropdown-item" onClick={ handleLogoutClick }>Logout</button>
                                </div>
                            )}
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default SellerNavbar;