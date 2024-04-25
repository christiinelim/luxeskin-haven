import React, { useEffect, useRef } from 'react';

const UploadWidget = ({ onImageUpload }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
  
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
            styles: {
                palette: {
                    window: '#FFFFFF',
                    windowBorder: '#90A0B3',
                    tabIcon: '#0078FF',
                    menuIcons: '#5A616B',
                    textDark: '#000000',
                    textLight: '#FFFFFF',
                    link: '#0078FF',
                    action: '#0078FF',
                    inactiveTabIcon: '#90A0B3',
                    error: '#F44235',
                    inProgress: '#0078FF',
                    complete: '#20B832',
                    sourceBg: 'white',
                },
                dimensions: {
                    width: '80vw',
                    height: '60vh',
                }
            }
        }, (error, result) => {
            if (!error && result && result.event === 'success') {
                onImageUpload(result.info.secure_url);
            }
        })
    }, []);

    return (
        <div>
            <button type="button" className="upload-button" onClick={ () => { widgetRef.current.open() } }>Upload</button>
        </div>
    )
};
  
export default UploadWidget;



