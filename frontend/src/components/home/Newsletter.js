import React from 'react';
import styles from './styles.module.css';

const Newsletter = () => {
    return (
        <div className={styles['newsletter-container']}>
            <div className={`${styles['newsletter-pic']} col-6`}></div>
            <div className={`${styles['newsletter-content']} col-6`}>
                <div className={styles['newsletter-content1']}>
                    JOIN OUR NEWSLETTER
                </div>
                <div className={styles['newsletter-content2']}>
                    Receive information about our exclusive promotional events!
                </div>
                <div className={styles['newsletter-content3']}>
                    <form>
                        <input placeholder="Enter email address" />
                        <div className={styles['newsletter-button-submit']}><button>Join</button></div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Newsletter;
