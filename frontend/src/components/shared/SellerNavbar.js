import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

const SellerNavbar = () => {

    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext.isLoggedIn();

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
                                <i className="bi bi-person-circle nav-profile-icon"></i>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default SellerNavbar;