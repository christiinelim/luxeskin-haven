import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorBoundary = ({ header, text }) => {
    const navigate = useNavigate();

    return (
        <div className='error-wrapper'>
            <div>
                <i className='bi bi-exclamation-triangle-fill error-icon'></i>
            </div>
            <div className='error-header'>{ header }</div>
            <div className='error-text'>{ text }</div>
            <div className='button-border' onClick={() => navigate('/')}>Retry</div>
        </div>
    );
};

export default ErrorBoundary;