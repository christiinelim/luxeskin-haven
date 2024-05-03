import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer>
            <div className='row'>
                <div className="col-5 col-md-4">
                    <div className={styles['footer-head']}>
                        Contact Us
                    </div>
                    <div className={styles['footer-details']}>
                        <div className={`col-12 ${styles['footer-details-list']}`}>+65 6754 8765</div>
                        <div className={`col-12 ${styles['footer-details-list']}`}>bizorder@gmail.com</div>
                    </div>
                </div>
        
                <div className="col-3 col-md-4">
                    <div className={styles['footer-head']}>
                        Navigate
                    </div>
                    <div className={styles['footer-details']}>
                        <div className={`col-12 ${styles['footer-details-list']}`} onClick={ () => navigate('/') }>Home</div>
                        <div className={`col-12 ${styles['footer-details-list']}`} onClick={ () => navigate('/collections') }>Collections</div>
                        <div className={`col-12 ${styles['footer-details-list']}`} onClick={ () => navigate('/contact-us') }>Contact Us</div>
                    </div>
                </div>
        
                <div className="col-4">
                    <div className={styles['footer-head']}>
                        Quick Start
                    </div>
                    <div className={styles['footer-details']}>
                        <div className={`col-12 ${styles['footer-details-list']}`} onClick={ () => navigate('/seller/signup') }>Seller Sign Up</div>
                        <div className={`col-12 ${styles['footer-details-list']}`} onClick={ () => navigate('/seller/login') }>Seller Login</div>
                        <div className={`col-12 ${styles['footer-details-list']}`} onClick={ () => navigate('/signup') }>Consumer Sign Up</div>
                        <div className={`col-12 ${styles['footer-details-list']}`} onClick={ () => navigate('/login') }>Consumer Login</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer