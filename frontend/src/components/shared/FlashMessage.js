import React, { useEffect, useState } from 'react';

const FlashMessage = ({ message, type, duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    return (
        <>
            { isVisible ? <div className={`flash-message ${type}`}>{message}</div> : null };
        </>
    )
    
};

export default FlashMessage;