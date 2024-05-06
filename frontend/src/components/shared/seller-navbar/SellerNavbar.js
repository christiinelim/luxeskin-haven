import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";
import { SellerContext } from '../../../context/SellerContext';
import styles from './styles.module.css';

const SellerNavbar = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const sellerContext = useContext(SellerContext);
    const isLoggedIn = authContext.isLoggedIn;
    const sellerStatus = authContext.status === "seller" ? true : false;
    const [ showDropdown, setShowDropdown ] = useState(false);

    useEffect(() => {
        setShowDropdown(false); 
    }, [isLoggedIn]); 

    const handleProfileIconClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleProfileClick = () => {
        navigate('/seller/' + localStorage.getItem("sellerId") + '/profile');
        setShowDropdown(!showDropdown);
    }

    const handleLogoutClick = async () => {
        await sellerContext.logout({ refreshToken: localStorage.getItem("refreshToken") });
        navigate('/seller/login', { 
            state: { 
                success_message: "You have logged out"
            }
        });
        authContext.logout("seller");
    }

    return(
        <>
            <div className='nav-login'>
                <div className='login-items'>
                    <div id='logo' className='content-items'>
                        <Link to="/" className='link-items'>LuxeSkin Haven</Link>
                    </div>
                    <div id={styles['seller-platform-logo']} className='content-items'>Seller Platform</div>
                </div>
                <div className='login-items'>
                    { (!isLoggedIn || !sellerStatus) &&
                        <>
                            <div className='button-border'>
                                <Link to="/seller/signup" className='link-items'>Sign Up</Link>
                            </div>
                        
                            <div className='button-full'>
                                <Link to="/seller/login" className='link-items'>Login</Link>
                            </div>
                        </>
                    }
                    { isLoggedIn && sellerStatus &&
                        <>
                            <div>
                                <i className={`bi bi-person-circle ${styles['nav-profile-icon']}`} onClick={ handleProfileIconClick }></i>
                            </div>
                            { showDropdown && (
                                <div className={styles['nav-dropdown-content']}>
                                    <div className={styles['dropdown-item']} onClick={ handleProfileClick }>Profile</div>
                                    <div className={styles['dropdown-item']} onClick={ handleLogoutClick }>Logout</div>
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