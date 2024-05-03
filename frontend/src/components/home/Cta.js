import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const Cta = () => {
    const navigate = useNavigate();

    return (
        <div className={styles['cta-background']}>
            <div className='row'>
                <div className='col-6'></div>
                <div className={`col-6 ${styles['cta-content-wrapper']}`}>
                    <div>
                        <div className={styles['cta-header']}>Natural, Organic, Refreshing</div>
                        <div>Transform your skincare routine with our premium collection of products. Explore our exclusive range today and unlock the secret to timeless beauty.</div>
                        <div id={styles['cta-button']} className='button-full' onClick={ () => navigate('/shop') }>Shop Now</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cta;
