import React, { useState } from 'react';
import axios from 'axios';
import UploadWidget from '../shared/UploadWidget';

const Cloudinary = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!file) {
            console.error('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:3000/api/cloudinary/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                console.log('Uploaded image URL:', response.data.imageUrl);
            } else {
                console.error('Failed to upload file:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        // <div>
        //     <input type="file" onChange={handleFileChange} />
        //     <button type="button" onClick={handleFileUpload}>Upload Image</button>
        // </div>
        <>
            <UploadWidget></UploadWidget>
        </>
    );
};

export default Cloudinary;