import React from 'react';
import styles from './styles.module.css';

const DeleteWarning = ({ item, itemId, setIsDeleting, handleDeleteClick, message }) => {
    return (
        <div className={`${styles.overlay} ${styles['delete-up']}`}>
            <div className={styles['delete-content']}>
                <div className={styles['delete-header']}>Delete Account</div>
                <div>Are you sure you want to delete <span className={styles['delete-item']}>{item}</span>?</div>
                <div className={styles['warning-content-container']}>
                    <div className={styles['warning-side']}></div>
                    <div className={styles['warning-content']}>
                        <div className={styles['warning-header-content']}>
                            <div><i className={"bi bi-exclamation-triangle-fill " + styles['warning-icon']}></i></div>
                            <div className={styles['warning-header']}>Warning</div>
                        </div>
                        <div className={styles['warning-description']}>{message}</div>
                    </div>
                </div>
                <div className={styles['warning-action']}>
                    <button type="button" id={styles['warning-action-cancel']} className='button-border' onClick={() => setIsDeleting(false)}>Cancel</button>
                    <button type="button" className='button-full' onClick={() => handleDeleteClick(itemId)}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteWarning;