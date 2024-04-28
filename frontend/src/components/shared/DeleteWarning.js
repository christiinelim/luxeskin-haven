import React from 'react';

const DeleteWarning = ({ item, itemId, setIsDeleting, handleDeleteClick, message }) => {
    return (
        <div className='overlay delete-account-up'>
            <div className='delete-account-content'>
                <div className='delete-header'>Delete Account</div>
                <div>Are you sure you want to delete <span className='delete-item'>{item}</span>?</div>
                <div className='warning-content-container'>
                    <div className="warning-side"></div>
                    <div className='warning-content'>
                        <div className='warning-header-content'>
                            <div><i className="bi bi-exclamation-triangle-fill warning-icon"></i></div>
                            <div className='warning-header'>Warning</div>
                        </div>
                        <div className='warning-description'>{ message }</div>
                    </div>
                </div>
                <div className='warning-action'>
                    <button type="button" className="button-border warning-action-cancel" onClick={() => setIsDeleting(false)}>Cancel</button>
                    <button type="button" className="button-full" onClick={() => handleDeleteClick(itemId)}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteWarning;