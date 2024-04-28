import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer>
            <div className="footer-wrapper row">
                <div className="col-5 col-md-4">
                    <div className="footer-head">
                        Contact Us
                    </div>
                    <div className="footer-details">
                        <div className="col-12 footer-details-list">+65 6754 8765</div>
                        <div className="col-12 footer-details-list">bizorder@gmail.com</div>
                    </div>
                </div>
        
                <div className="col-3 col-md-4">
                    <div className="footer-head">
                        Navigate
                    </div>
                    <div className="footer-details">
                        <div className="col-12 footer-details-list" onClick={ () => navigate('/') }>Home</div>
                        <div className="col-12 footer-details-list" onClick={ () => navigate('/') }>Collections</div>
                        <div className="col-12 footer-details-list" onClick={ () => navigate('/') }>Tips</div>
                        <div className="col-12 footer-details-list" onClick={ () => navigate('/') }>About Us</div>
                    </div>
                </div>
        
                <div className="col-4">
                    <div className="footer-head">
                        Quick Start
                    </div>
                    <div className="footer-details">
                        <div className="col-12 footer-details-list" onClick={ () => navigate('/seller/signup') }>Seller Sign Up</div>
                        <div className="col-12 footer-details-list" onClick={ () => navigate('/seller/login') }>Seller Login</div>
                        <div className="col-12 footer-details-list" onClick={ () => navigate('/signup') }>Consumer Sign Up</div>
                        <div className="col-12 footer-details-list" onClick={ () => navigate('/login') }>Consumer Login</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer